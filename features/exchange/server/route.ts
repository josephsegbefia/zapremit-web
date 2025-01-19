import {
  CONVERTER_BASE_URL,
  CONVERTER_KEY,
  DATABASE_ID,
  EXCHANGE_RATES_ID,
} from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";
import { ExchangeRate } from "../types";
import { calcRateAdjustment } from "@/lib/utils";
import { getRateAdjustment } from "@/features/transfers/queries";

const app = new Hono()
  .get(
    "get-actual-rate/:base/:target",
    sessionMiddleware,
    zValidator(
      "param",
      z.object({
        base: z.string().regex(/^[A-Z]{3}$/),
        target: z.string().regex(/^[A-Z]{3}$/),
      })
    ),
    async (c) => {
      try {
        const { base, target } = c.req.param();
        const databases = c.get("databases");
        const exchange_key = `${base}_${target}`;

        const actualRates = await databases.listDocuments(
          DATABASE_ID,
          EXCHANGE_RATES_ID,
          [Query.equal("key", exchange_key)]
        );

        const actualRate = actualRates.documents[0];
        console.log(actualRate);
        return c.json({ conversion_rate: actualRate.rate });
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return c.json(
          { error: "Failed to fetch and update exchange rate" },
          500
        );
      }
    }
  )
  .get(
    "/get-adjusted-exchange-rate/:base/:target",
    sessionMiddleware,
    zValidator(
      "param",
      z.object({
        base: z.string().regex(/^[A-Z]{3}$/),
        target: z.string().regex(/^[A-Z]{3}$/),
      })
    ),
    async (c) => {
      try {
        const { base, target } = c.req.param();
        const databases = c.get("databases");
        const exchange_key = `${base}_${target}`;
        const now = new Date();

        // Step 1: Fetch existing exchange rate from the database
        const storedRate = await databases.listDocuments<ExchangeRate>(
          DATABASE_ID,
          EXCHANGE_RATES_ID,
          [Query.equal("key", exchange_key)]
        );

        if (storedRate.total > 0) {
          const rate = storedRate.documents[0];

          // Step 2: Check if rate is expired or locked
          if (new Date(rate.expires_at) > now) {
            if (!rate.is_locked) {
              // If not locked and not expired, return the rate
              return c.json({ conversion_rate: parseFloat(rate.adjRate) });
            } else {
              // If locked, return a message
              return c.json({
                error: "Rate update in progress, try again later",
              });
            }
          }

          // Step 3: Lock the record for update
          if (!rate.is_locked) {
            await databases.updateDocument(
              DATABASE_ID,
              EXCHANGE_RATES_ID,
              rate.$id,
              { is_locked: true }
            );
          } else {
            return c.json({
              error: "Rate update in progress, try again later",
            });
          }
        }

        // Step 4: Fetch new exchange rate from API
        const response = await fetch(
          `${CONVERTER_BASE_URL}/${CONVERTER_KEY}/pair/${base}/${target}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rate from API");
        }
        const apiData = await response.json();
        const newRate = apiData.conversion_rate;

        // Await the rate adjustment
        const rateAdjPercent = await getRateAdjustment();

        // Handle the case where "Not found" is returned
        if (rateAdjPercent === "Not found") {
          throw new Error("Rate adjustment not found");
        }

        const adjustedRate = calcRateAdjustment(newRate, rateAdjPercent);
        const roundedAdjustedRate = Number(adjustedRate.toFixed(2));

        // Step 5: Update or insert new rate in the database
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + 2);
        if (storedRate.total > 0) {
          // Update existing rate
          await databases.updateDocument(
            DATABASE_ID,
            EXCHANGE_RATES_ID,
            storedRate.documents[0].$id,
            {
              rate: newRate.toString(),
              adjRate: roundedAdjustedRate.toString(), // Added later by me
              expires_at: expiryTime.toISOString(),
              is_locked: false,
            }
          );
        } else {
          // Insert new rate
          await databases.createDocument(
            DATABASE_ID,
            EXCHANGE_RATES_ID,
            ID.unique(),
            {
              key: exchange_key,
              rate: newRate.toString(),
              adjRate: roundedAdjustedRate.toString(), // Added later by me
              expires_at: expiryTime.toISOString(),
              is_locked: false,
            }
          );
        }

        return c.json({ conversion_rate: roundedAdjustedRate });
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return c.json(
          { error: "Failed to fetch and update exchange rate" },
          500
        );
      }
    }
  );

export default app;

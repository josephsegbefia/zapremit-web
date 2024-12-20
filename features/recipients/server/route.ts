import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createRecipientSchema } from "../schemas";
import { CUSTOMERS_ID, DATABASE_ID, RECIPIENTS_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { Recipient } from "../types";
import { z } from "zod";

const app = new Hono()
  .post(
    "/recipients",
    zValidator("json", createRecipientSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      // const user = c.get("user");

      const {
        customerId,
        name,
        email,
        street_address,
        city,
        callingCode,
        phone,
        country,
      } = c.req.valid("json");

      try {
        const foundExistingRecipient = await databases.listDocuments<Recipient>(
          DATABASE_ID,
          RECIPIENTS_ID,
          [Query.equal("phone", phone)]
        );

        if (foundExistingRecipient.documents[0]) {
          return c.json(
            {
              error: "A recipient with the same number already exists",
            },
            409
          );
        }

        const recipient = await databases.createDocument(
          DATABASE_ID,
          RECIPIENTS_ID,
          ID.unique(),
          {
            customerId,
            name,
            email,
            street_address,
            city,
            callingCode,
            phone,
            country,
          }
        );

        return c.json({ data: recipient });
      } catch (error) {
        console.error("Error creating recipient:", error);
        return c.json({ error: "Internal server error" }, 500);
      }
    }
  )
  .get(
    "/recipients",
    sessionMiddleware,
    zValidator("query", z.object({ customerId: z.string() })),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");

      const { customerId } = c.req.valid("query");

      if (!customerId) {
        return c.json({ error: "Missing customer Id" }, 400);
      }

      const customers = await databases.listDocuments(
        DATABASE_ID,
        CUSTOMERS_ID,
        [Query.equal("customerId", customerId), Query.orderDesc("$createdAt")]
      );

      return c.json({ data: customers });
    }
  );

export default app;

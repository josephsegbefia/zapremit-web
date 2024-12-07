import { CUSTOMERS_ID, DATABASE_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";

const app = new Hono()
  .post(
    "/create-customer-profile",
    zValidator(
      "json",
      z.object({
        accountId: z.string(),
      })
    ),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      // const { accountId } = c.req.valid("json");

      const customer = await databases.createDocument(
        DATABASE_ID,
        CUSTOMERS_ID,
        ID.unique(),
        {
          accountId: user.$id,
        }
      );

      return c.json({ data: customer });
    }
  )
  .patch(
    "/update-customer-beneficiary-country",
    zValidator(
      "json",
      z.object({
        countryId: z.string(),
      })
    ),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      const { countryId } = c.req.valid("json");

      const customerList = await databases.listDocuments(
        DATABASE_ID,
        CUSTOMERS_ID,
        [Query.equal("accountId", user.$id)]
      );

      if (customerList.total === 0) {
        return c.json({ error: "No customer found" }, 404);
      }

      const customer = customerList.documents[0];
      const updatedCustomer = await databases.updateDocument(
        DATABASE_ID,
        CUSTOMERS_ID,
        customer.$id,
        {
          beneficiaryCountryId: countryId,
        }
      );

      return c.json({ data: updatedCustomer });
    }
  );

export default app;

import { COUNTRIES_ID, CUSTOMERS_ID, DATABASE_ID } from "@/config";
import { Country } from "@/features/onboarding/types";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";
import { Customer } from "../types";

const app = new Hono()
  .get("/customer", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const customerList = await databases.listDocuments<Customer>(
      DATABASE_ID,
      CUSTOMERS_ID,
      [Query.equal("accountId", user.$id)]
    );

    const customer = customerList.documents[0];
    // const accountId = customer.accountId;

    return c.json({ data: customer });
  })
  .get("/customer-origin-country", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { documents } = await databases.listDocuments<Customer>(
      DATABASE_ID,
      CUSTOMERS_ID,
      [Query.equal("accountId", user.$id)]
    );

    // if (documents.length === 0) {
    //   return c.json({ error: "No destination countries found" });
    // }

    // Assuming there is only one customer document for the user
    const customer = documents[0];

    // Extract the required country ID based on the countryType parameter
    const countryId = customer.originCountryId;

    // if (!countryId) {
    //   return c.json({ error: "No country found" });
    // }

    // Query the countries collection to get the country info
    const countryDocument = await databases.getDocument<Country>(
      DATABASE_ID,
      COUNTRIES_ID,
      countryId
    );

    return c.json({ data: countryDocument }); // Return the country document or null if not found
  })
  .get("/customer-beneficiary-country", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { documents } = await databases.listDocuments<Customer>(
      DATABASE_ID,
      CUSTOMERS_ID,
      [Query.equal("accountId", user.$id)]
    );

    // if (documents.length === 0) {
    //   console.warn("No customer record found for the current user.");
    //   return c.json({ error: "Empty country documents list" });
    // }

    // Assuming there is only one customer document for the user
    const customer = documents[0];

    // Extract the required country ID based on the countryType parameter
    const countryId = customer.beneficiaryCountryId;

    // if (!countryId) {
    //   console.log("CountryId not found");
    //   return c.json({ error: "No country with that Id found" });
    // }

    // Query the countries collection to get the country info
    const countryDocument = await databases.getDocument<Country>(
      DATABASE_ID,
      COUNTRIES_ID,
      countryId
    );

    return c.json({ data: countryDocument }); // R
  })
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

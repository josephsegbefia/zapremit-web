import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, CUSTOMERS_ID } from "@/config";
import {
  updateCustomerCountriesInfoSchema,
  updateCustomerPersonalDetailsSchema,
} from "../schemas";

const app = new Hono()
  .patch(
    "update-customer-personal-information/:customerId",
    sessionMiddleware,
    zValidator("json", updateCustomerPersonalDetailsSchema),
    async (c) => {
      const databases = c.get("databases");
      // const user = c.get("user");

      const { customerId } = c.req.param();
      const { phone, street, postcode, city, dateOfBirth, callingCode } =
        c.req.valid("json");

      const updatedCustomer = await databases.updateDocument(
        DATABASE_ID,
        CUSTOMERS_ID,
        customerId,
        { phone, street, postcode, city, dateOfBirth, callingCode }
      );
      return c.json({ data: updatedCustomer });
    }
  )
  .patch(
    "/update-customer-countries-info/:customerId",
    sessionMiddleware,
    zValidator("json", updateCustomerCountriesInfoSchema),
    async (c) => {
      const databases = c.get("databases");

      const { customerId } = c.req.param();
      const { originCountryId, beneficiaryCountryId } = c.req.valid("json");

      const updatedCustomer = await databases.updateDocument(
        DATABASE_ID,
        CUSTOMERS_ID,
        customerId,
        { originCountryId, beneficiaryCountryId }
      );

      return c.json({ data: updatedCustomer });
    }
  );

export default app;

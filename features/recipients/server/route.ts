import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createRecipientSchema } from "../schemas";
import { DATABASE_ID, RECIPIENTS_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { Recipient } from "../types";

const app = new Hono().post(
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
);

export default app;

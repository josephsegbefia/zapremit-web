import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createRecipientSchema } from "../schemas";
import { DATABASE_ID, RECIPIENTS_ID } from "@/config";
import { ID } from "node-appwrite";

const app = new Hono().post(
  "/recipients",
  zValidator("json", createRecipientSchema),
  sessionMiddleware,
  async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const {
      customerId,
      name,
      email,
      street_address,
      city,
      callingCode,
      phone,
    } = c.req.valid("json");

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
      }
    );

    return c.json({ data: recipient });
  }
);

export default app;

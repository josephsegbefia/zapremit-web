import { CUSTOMERS_ID, DATABASE_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID } from "node-appwrite";
import { z } from "zod";

const app = new Hono().post(
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

    const { accountId } = c.req.valid("json");

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
);

export default app;

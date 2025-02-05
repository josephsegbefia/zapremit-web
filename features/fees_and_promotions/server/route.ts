import { sessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";
import { DATABASE_ID, FEES_AND_PROMOTIONS_ID } from "@/config";
import { Query } from "node-appwrite";

const app = new Hono().get("/transfer-fee", sessionMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const databases = c.get("databases");

    if (!user) {
      return c.json({ error: "User not found" }, 400);
    }

    const transferFees = await databases.listDocuments(
      DATABASE_ID,
      FEES_AND_PROMOTIONS_ID,
      [
        Query.equal("type", "fee"),
        Query.equal("name", "transactionfee"),
        Query.equal("applies_to", "transfers"),
        Query.equal("is_active", true),
      ]
    );

    const fee = transferFees.documents[0];
    return fee.value;
  } catch (error) {
    console.log(error);
  }
});

export default app;

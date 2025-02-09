import { DATABASE_ID, TRANSFER_DETAILS_STORAGE_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { TransferConfirm } from "../types";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";
import { createTransferSchema } from "@/features/transfers/schema";

const app = new Hono()
  .get("/temp-store", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { confirmationId } = c.req.query();

    if (!confirmationId) {
      return c.json({ error: "Confirmation id is required" }, 400);
    }

    const confirmations = await databases.listDocuments<TransferConfirm>(
      DATABASE_ID,
      TRANSFER_DETAILS_STORAGE_ID,
      [Query.equal("$id", confirmationId)]
    );

    const confirmation = confirmations.documents[0];
    return c.json({ data: confirmation });
  })
  .post(
    "/",
    zValidator("json", createTransferSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      if (!user) {
        return c.json({ error: "No user found" }, 400);
      }

      try {
        const {
          recipientId,
          sentAmount,
          receivedAmount,
          adjustedExchangeRate,
          transferReason,
        } = c.req.valid("json");

        const sentAmountString = sentAmount.toString();
        const receivedAmountString = receivedAmount.toString();
        const adjustedExchangeRateString = adjustedExchangeRate.toString();

        const confirmation = await databases.createDocument(
          DATABASE_ID,
          TRANSFER_DETAILS_STORAGE_ID,
          ID.unique(),
          {
            recipientId,
            sentAmount: sentAmountString,
            receivedAmount: receivedAmountString,
            adjustedExchangeRate: adjustedExchangeRateString,
            transferReason,
          }
        );

        return c.json({ data: confirmation });
      } catch (error) {
        console.error("Error creating transfer confirmation:", error);
        return c.json(
          { error: "An error occurred while processing your request" },
          500
        );
      }
    }
  );

export default app;

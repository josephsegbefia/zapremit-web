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
        return c.json({ erorr: "No user found" }, 400);
      }

      const {
        recipientId,
        sentAmount,
        receivedAmount,
        adjustedExchangeRate,
        transferReason,
      } = c.req.valid("json");

      const confirmation = await databases.createDocument(
        DATABASE_ID,
        TRANSFER_DETAILS_STORAGE_ID,
        ID.unique(),
        {
          recipientId,
          sentAmount,
          receivedAmount,
          adjustedExchangeRate,
          transferReason,
        }
      );
      return c.json({ data: confirmation });
    }
  );

export default app;

import { Hono } from "hono";
import { DATABASE_ID, TRANSFERS_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { ID, Query } from "node-appwrite";
import { createTransferSchema } from "../schemas";
import { getTransferFee } from "../queries";
import { calcRateDifference } from "@/lib/utils";

const app = new Hono()
  .post(
    "/",
    zValidator("json", createTransferSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      const transferFee = await getTransferFee();
      let transferProfit;

      const {
        customerId,
        recipientId,
        sentAmount,
        destinationCurrency,
        originCurrency,
        exchangeRate,
        adjustedExchangeRate,
        receivedAmount,
        originCountry,
        destinationCountry,
      } = c.req.valid("json");

      const exchangeRateDifference = calcRateDifference(
        exchangeRate,
        adjustedExchangeRate
      );

      if (transferFee) {
        transferProfit = transferFee + exchangeRateDifference;
      }

      const transfer = await databases.createDocument(
        DATABASE_ID,
        TRANSFERS_ID,
        ID.unique(),
        {
          customerId,
          recipientId,
          sentAmount,
          destinationCurrency,
          originCurrency,
          exchangeRate,
          adjustedExchangeRate,
          receivedAmount,
          fee: transferFee?.toString(),
          profit: transferProfit?.toString(),
          originCountry,
          destinationCountry,
          userId: user.$id,
        }
      );

      // Here remember to make the call to zeepay APIs to make the transfer, if the transfer goes through, retrieve the transfer from the db and update its status, if not update the status to match what is returned from zeepay
      return c.json({ data: transfer });
    }
  )
  .get("/transfers/:recipientId", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    if (!user) {
      return c.json("User not found");
    }

    const { recipientId } = c.req.param();

    try {
      const transfers = await databases.listDocuments(
        DATABASE_ID,
        TRANSFERS_ID,
        [Query.equal("recipientId", recipientId)]
      );

      return c.json({ data: transfers });

      return c.json({ data: transfers });
    } catch (error) {
      console.log("Error fetching Recipient", error);
      return c.json({ error: "Recipient not found or invalid ID" }, 404);
    }
  });

export default app;

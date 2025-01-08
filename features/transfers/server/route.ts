import { Hono } from "hono";
import { DATABASE_ID, TRANSFERS_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";
import { createTransferSchema } from "../schemas";
import { getTransferFee } from "../queries";
import { calcRateDifference } from "@/lib/utils";

const app = new Hono().post(
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
      profit,
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
        fee: transferFee,
        profit: transferProfit,
        originCountry,
        destinationCountry,
        userId: user.$id,
      }
    );

    // Here remember to make the call to zeepay APIs to make the transfer, if the transfer goes through, retrieve the transfer from the db and update its status, if not update the status to match what is returned from zeepay
    return c.json({ data: transfer });
  }
);

export default app;

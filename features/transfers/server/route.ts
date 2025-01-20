import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createTransferSchema } from "../schema";
import { calculateTransferProfit, getTransferFee } from "../queries";
import { DATABASE_ID, TRANSFERS_ID } from "@/config";
import { ID } from "node-appwrite";
import {
  getCustomer,
  getCustomerBeneficiaryCountry,
  getCustomerOriginCountry,
} from "@/features/customers/queries";

const app = new Hono().post(
  "/transfers",
  zValidator("json", createTransferSchema),
  sessionMiddleware,
  async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const userId = user.$id;
    const custmer = await getCustomer();
    const originCountry = await getCustomerOriginCountry();
    const beneficiaryCountry = await getCustomerBeneficiaryCountry();

    const cusotmerId = custmer?.$id;
    const originCountryName = originCountry?.name;
    const beneficiaryCountryName = beneficiaryCountry?.name;
    const originCountryCurrency = originCountry?.currency;
    const beneficiaryCountryCurrency = beneficiaryCountry?.currency;

    const transferFee = await getTransferFee();

    const {
      recipientId,
      receivedAmount,
      sentAmount,
      adjustedExchangeRate,
      exchangeRate,
      transferReason,
    } = c.req.valid("json");

    const profit = calculateTransferProfit(
      exchangeRate,
      transferFee,
      sentAmount,
      receivedAmount
    );

    const transfer = await databases.createDocument(
      DATABASE_ID,
      TRANSFERS_ID,
      ID.unique(),
      {
        recipientId,
        receivedAmount,
        sentAmount,
        adjustedExchangeRate,
        exchangeRate,
        transferReason,
        userId: userId,
        customerId: cusotmerId,
        originCountry: originCountryName,
        destinationCountry: beneficiaryCountryName,
        originCurrency: originCountryCurrency,
        destinationCurrency: beneficiaryCountryCurrency,
        profit: profit,
        status: "PENDING",
      }
    );

    return c.json({ data: transfer });
  }
);

export default app;

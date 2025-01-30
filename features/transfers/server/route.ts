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
import { getActualExRate } from "@/features/exchange/queries";

const app = new Hono().post(
  "/",
  zValidator("json", createTransferSchema),
  sessionMiddleware,
  async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const userId = user.$id;
    const customer = await getCustomer();
    const originCountry = await getCustomerOriginCountry();
    const beneficiaryCountry = await getCustomerBeneficiaryCountry();

    const customerId = customer?.$id;
    const originCountryName = originCountry?.name;
    const beneficiaryCountryName = beneficiaryCountry?.name;
    const originCountryCurrency = originCountry?.currency;
    const base = originCountry?.currencyCode;
    const target = beneficiaryCountry?.currencyCode;
    const beneficiaryCountryCurrency = beneficiaryCountry?.currency;

    const transferFee = await getTransferFee();
    const actualRate = await getActualExRate(base, target);

    const {
      recipientId,
      receivedAmount,
      sentAmount,
      adjustedExchangeRate,
      // exchangeRate,
      transferReason,
    } = c.req.valid("json");

    // const sentAmountFloat = parseFloat(sentAmount);
    // const receivedAmountFloat = parseFloat(receivedAmount);
    const transferFeeFloat = parseFloat(transferFee);
    const profit = calculateTransferProfit(
      actualRate,
      transferFeeFloat,
      sentAmount,
      receivedAmount
    );

    const sentAmtString = sentAmount.toString();
    const receivedAmtString = receivedAmount.toString();
    const transfer = await databases.createDocument(
      DATABASE_ID,
      TRANSFERS_ID,
      ID.unique(),
      {
        recipientId,
        receivedAmount: receivedAmtString,
        sentAmount: sentAmtString,
        adjustedExchangeRate,
        exchangeRate: actualRate,
        transferReason,
        userId: userId,
        customerId: customerId,
        originCountry: originCountryName,
        destinationCountry: beneficiaryCountryName,
        originCurrency: originCountryCurrency,
        destinationCurrency: beneficiaryCountryCurrency,
        profit: profit,
        status: "PENDING",
        transferFee: parseFloat(transferFee),
      }
    );

    return c.json({ data: transfer });
  }
);

export default app;

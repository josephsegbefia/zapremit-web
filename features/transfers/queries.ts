import { DATABASE_ID, FEES_AND_PROMOTIONS_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";

export const getTransferFee = async () => {
  try {
    const { databases } = await createSessionClient();

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
};

export const getRateAdjustment = async () => {
  try {
    const { databases } = await createSessionClient();

    const adjustments = await databases.listDocuments(
      DATABASE_ID,
      FEES_AND_PROMOTIONS_ID,
      [
        Query.equal("type", "rateAdjustment"),
        Query.equal("name", "adjustment"),
        Query.equal("applies_to", "transfers"),
        Query.equal("is_active", true),
      ]
    );

    if (adjustments.total === 0) {
      return "Not found";
    }

    const percent = adjustments.documents[0];
    return percent.value;
  } catch (error) {
    console.log(error);
    return "Not Found";
  }
};

export const calculateTransferProfit = (
  actualRate: number, // Market exchange rate (e.g., 15 GHS/USD)
  // adjustedRate: number, // Offered exchange rate (e.g., 14.50 GHS/USD)
  fee: number, // Transfer fee in USD (e.g., 0.99)
  sentAmount: number, // Amount sent in USD (e.g., 100)
  receivedAmount: number // Amount received in GHS (e.g., 1450)
): number => {
  // Calculate the expected amount in GHS using the actual market rate
  const expectedAmountGHS = sentAmount * actualRate;

  // Calculate the exchange rate profit in GHS
  const exchangeRateProfitGHS = expectedAmountGHS - receivedAmount;

  // Convert the exchange rate profit from GHS to USD using the actual rate
  const exchangeRateProfitUSD = exchangeRateProfitGHS / actualRate;

  // Calculate total profit (exchange profit + transfer fee)
  const totalProfit = exchangeRateProfitUSD + fee;

  return parseFloat(totalProfit.toFixed(2)); // Return profit rounded to 2 decimal places
};

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
    if (transferFees.total === 0) {
      return { documents: [], total: 0 };
    }
    return transferFees.documents;
  } catch (error) {
    console.log(error);
    return { documents: [], total: 0 };
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
    return parseFloat(percent.value);
  } catch (error) {
    console.log(error);
    return "Not found";
  }
};

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

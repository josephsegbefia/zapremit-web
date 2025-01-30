import { DATABASE_ID, EXCHANGE_RATES_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";

export const getActualExRate = async (base: string, target: string) => {
  try {
    const exchange_key = `${base}_${target}`;
    const { databases } = await createSessionClient();
    const actualRates = await databases.listDocuments(
      DATABASE_ID,
      EXCHANGE_RATES_ID,
      [Query.equal("key", exchange_key)]
    );

    const actualRate = actualRates.documents[0];
    return parseFloat(actualRate.rate);
  } catch (error) {
    console.log(error);
  }
};

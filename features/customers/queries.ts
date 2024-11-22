import { createSessionClient } from "@/lib/appwrite";
import { Customer } from "./types";
import { CUSTOMERS_ID, DATABASE_ID } from "@/config";
import { Query } from "node-appwrite";

export const getCustomer = async (): Promise<Customer | null> => {
  try {
    const { databases, account } = await createSessionClient();
    const user = await account.get();
    // console.log(user.$id);

    const foundCustomer = await databases.listDocuments<Customer>(
      DATABASE_ID,
      CUSTOMERS_ID,
      [Query.equal("accountId", user.$id)]
    );

    if (foundCustomer.total === 0) {
      return null;
    }

    // Extract the first customer document
    const customer = foundCustomer.documents[0];
    return customer;
  } catch (error) {
    console.log(error);
    return null;
  }
};

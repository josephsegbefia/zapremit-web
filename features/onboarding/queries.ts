import { createSessionClient } from "@/lib/appwrite";
import { Customer } from "./types";
import { CUSTOMERS_ID, DATABASE_ID } from "@/config";

interface GetCustomerProps {
  customerId: string;
}

export const getCustomer = async ({ customerId }: GetCustomerProps) => {
  try {
    const { databases, account } = await createSessionClient();
    const user = await account.get();

    const customer = await databases.getDocument<Customer>(
      DATABASE_ID,
      CUSTOMERS_ID,
      customerId
    );

    if (!customer) {
      return null;
    }
    return {
      user,
      customer,
    };
  } catch (error) {
    console.error("Error retrieving customer data:", error);
    throw new Error(
      "Failed to retrieve customer data. Please try again later."
    );
  }
};

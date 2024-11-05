import { DATABASE_ID, CUSTOMERS_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";

interface CheckCompleteCustomerProfileProps {
  accountId: string;
}

export const checkCompleteCustomerProfile = async ({
  accountId,
}: CheckCompleteCustomerProfileProps) => {
  const { databases, account } = await createSessionClient();
  const user = await account.get();
};

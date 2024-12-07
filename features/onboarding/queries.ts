import { createSessionClient } from "@/lib/appwrite";
import { Country } from "./types";
import { COUNTRIES_ID, CUSTOMERS_ID, DATABASE_ID } from "@/config";
import { Query } from "node-appwrite";

export const getOriginCountries = async () => {
  try {
    const { databases } = await createSessionClient();

    const originCountries = await databases.listDocuments(
      DATABASE_ID,
      COUNTRIES_ID,
      [Query.equal("countryType", "ORIGIN")]
    );

    if (originCountries.total === 0) {
      return { documents: [], total: 0 };
    }

    return originCountries.documents;
  } catch (error) {
    console.log(error);
    return { documents: [], total: 0 };
  }
};

export const getBeneficiaryCountries = async (): Promise<Country[] | null> => {
  try {
    const { databases } = await createSessionClient();

    const beneficiaryCountries = await databases.listDocuments(
      DATABASE_ID,
      COUNTRIES_ID,
      [Query.equal("countryType", "BENEFICIARY")]
    );

    if (beneficiaryCountries.total === 0) {
      return null;
    }

    const countries: Country[] = beneficiaryCountries.documents.map(
      (doc) =>
        ({
          $id: doc.$id,
          $collectionId: doc.$collectionId,
          $databaseId: doc.$databaseId,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          name: doc["name"],
          ISOCode: doc["ISOCode"],
          currency: doc["currency"],
          countryType: doc["countryType"],
          paymentMethods: doc["paymentMethods"],
          language: doc["language"],
          flagImageUrl: doc["flagImageUrl"],
          callingCode: doc["callingCode"],
          currencyCode: doc["currencyCode"],
          currencySymbol: doc["currencySymbol"],
          region: doc["region"],
        } as Country) // Use Type Assertion
    );

    return countries;
  } catch (error) {
    console.log(error);
    return null;
  }
};

interface UpdateCustomerBeneficiaryCountryProps {
  countryId: string;
}

export const updateCustomerBeneficiaryCountry = async ({
  countryId,
}: UpdateCustomerBeneficiaryCountryProps) => {
  const { databases, account } = await createSessionClient();
  const user = await account.get();

  const customer = await databases.listDocuments(DATABASE_ID, CUSTOMERS_ID, [
    Query.equal("accountId", user.$id),
  ]);

  if (customer.total === 0) {
    return { documents: [], total: 0 };
  }

  const returnedCustomer = customer.documents[0];
  const updatedCustomer = await databases.updateDocument(
    DATABASE_ID,
    CUSTOMERS_ID,
    returnedCustomer.$id,
    {
      beneficiaryId: countryId,
    }
  );

  return updatedCustomer;
};

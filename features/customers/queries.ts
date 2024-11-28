import { createSessionClient } from "@/lib/appwrite";
import { Customer } from "./types";
import { COUNTRIES_ID, CUSTOMERS_ID, DATABASE_ID } from "@/config";
import { Query } from "node-appwrite";
import { Country } from "../onboarding/types";

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

export const getCustomerOriginCountry = async () => {
  try {
    // Create session client and retrieve account information
    const { databases, account } = await createSessionClient();
    const user = await account.get();

    // Query the customer document associated with the current user's account
    const { documents } = await databases.listDocuments<Customer>(
      DATABASE_ID,
      CUSTOMERS_ID,
      [Query.equal("accountId", user.$id)]
    );

    if (documents.length === 0) {
      console.warn("No customer record found for the current user.");
      return null;
    }

    // Assuming there is only one customer document for the user
    const customer = documents[0];

    // Extract the required country ID based on the countryType parameter
    const countryId = customer.originCountryId;

    if (!countryId) {
      console.log("CountryId not found");
      return null;
    }

    // Query the countries collection to get the country info
    const countryDocument = await databases.getDocument<Country>(
      DATABASE_ID,
      COUNTRIES_ID,
      countryId
    );

    return countryDocument || null; // Return the country document or null if not found
  } catch (error) {
    console.error("Error fetching customer country info:", error);
    return null;
  }
};

export const getCustomerBeneficiaryCountry = async () => {
  try {
    // Create session client and retrieve account information
    const { databases, account } = await createSessionClient();
    const user = await account.get();

    // Query the customer document associated with the current user's account
    const { documents } = await databases.listDocuments<Customer>(
      DATABASE_ID,
      CUSTOMERS_ID,
      [Query.equal("accountId", user.$id)]
    );

    if (documents.length === 0) {
      console.warn("No customer record found for the current user.");
      return null;
    }

    // Assuming there is only one customer document for the user
    const customer = documents[0];

    // Extract the required country ID based on the countryType parameter
    const countryId = customer.beneficiaryCountryId;

    if (!countryId) {
      console.log("CountryId not found");
      return null;
    }

    // Query the countries collection to get the country info
    const countryDocument = await databases.getDocument<Country>(
      DATABASE_ID,
      COUNTRIES_ID,
      countryId
    );

    return countryDocument || null; // Return the country document or null if not found
  } catch (error) {
    console.error("Error fetching customer country info:", error);
    return null;
  }
};

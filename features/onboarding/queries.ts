import { createSessionClient } from "@/lib/appwrite";
import { Country } from "./types";
import { COUNTRIES_ID, DATABASE_ID } from "@/config";
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

export const getBeneficiaryCountries = async () => {
  try {
    const { databases } = await createSessionClient();

    const beneficiaryCountries = await databases.listDocuments(
      DATABASE_ID,
      COUNTRIES_ID,
      [Query.equal("countryType", "BENEFICIARY")]
    );

    if (beneficiaryCountries.total === 0) {
      return { documents: [], total: 0 };
    }

    return beneficiaryCountries.documents;
  } catch (error) {
    console.log(error);
    return { documents: [], total: 0 };
  }
};

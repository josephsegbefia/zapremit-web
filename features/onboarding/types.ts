import { Models } from "node-appwrite";

export enum CountryType {
  ORIGIN = "ORIGIN",
  BENEFICIARY = "BENEFICIARY",
}

export enum RegionType {
  AFRICA = "AFRICA",
  EUROPE = "EUROPE",
  OCEANIA = "OCEANIA",
  AMERICAS = "AMERICAS",
  ASIA = "ASIA",
}

export type Country = Models.Document & {
  name: string;
  ISOCode: string;
  currency: string;
  countryType: CountryType;
  paymentMethods: string[];
  language: string;
  flagImageUrl: string;
  callingCode: string;
  currencyCode: string;
  currencySymbol: string;
  region: RegionType;
};

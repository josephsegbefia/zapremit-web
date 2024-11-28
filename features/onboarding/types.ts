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

export interface Country extends Models.Document {
  // Inherits Document properties like $id
  name: string;
  ISOCode: string;
  currency: string;
  countryType: string; // or an enum
  paymentMethods: string[];
  language: string;
  flagImageUrl: string;
  callingCode: string;
  currencyCode: string;
  currencySymbol: string;
  region: RegionType; // or an enum
}

import { Models } from "node-appwrite";

export type Customer = Models.Document & {
  accountId: string;
  phone: string;
  street: string;
  postcode: string;
  city: string;
  originCountry: string;
  beneficiaryCountry: string;
  dateofBirth: string;
};

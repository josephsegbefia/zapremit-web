import { Models } from "node-appwrite";

export type Recipient = Models.Document & {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  callingCode: string;
  street_address: string;
  city: string;
  country: string;
  // send_transfer_update: boolean;
};

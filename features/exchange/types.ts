import { Models } from "node-appwrite";

export type ExchangeRate = Models.Document & {
  key: string;
  rate: string;
  expires_at: Date;
  is_locked: boolean;
};
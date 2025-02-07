import { Models } from "node-appwrite";

export type TransferConfirm = Models.Document & {
  recipientId: string;
  sentAmount: string;
  receivedAmount: string;
  adjustedExchangeRate: string;
  transferReason: string;
};

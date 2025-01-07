import { z } from "zod";

export const createTransferSchema = z.object({
  customerId: z.string(),
  recipientId: z.string(),
  sentAmount: z.string().trim().min(1, "Required"),
  originCountry: z.string(),
  destinationCountry: z.string(),
  destinationCurrency: z.string().trim().min(1, "Required"),
  originCurrency: z.string().trim().min(1, "Required"),
  exchangeRate: z.string(),
  receivedAmount: z.string().trim(),
  fee: z.string(),
  profit: z.string(),
});

export const updateTransferSchema = z.object({});

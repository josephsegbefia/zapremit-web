import { z } from "zod";

export const createTransferSchema = z.object({
  customerId: z.string(),
  recipientId: z.string(),
  sentAmount: z.string(),
  // sentAmount: z
  //   .union([z.string().trim(), z.number()])
  //   .refine((value) => value !== "" && value !== 0, "Required"),
  originCountry: z.string(),
  destinationCountry: z.string(),
  destinationCurrency: z.string(),
  originCurrency: z.string().trim(),
  exchangeRate: z.string(),
  adjustedExchangeRate: z.string(),
  receivedAmount: z.string(),
  // receivedAmount: z
  //   .union([z.string().trim(), z.number()])
  //   .refine((value) => value !== "" && value !== 0, "Required"),
  // profit: z.string(),
});

export const updateTransferSchema = z.object({});

import { z } from "zod";

export const createTransferSchema = z.object({
  recipientId: z.string(),
  // sentAmount: z.string(),
  // receivedAmount: z.string(),
  sentAmount: z.number().min(1, "Amount must be greater than 0"),
  receivedAmount: z.coerce.number(),
  adjustedExchangeRate: z.coerce.number().positive(),
  // exchangeRate: z.coerce.number().positive(),
  transferReason: z.enum([
    "FAMILY_AND_FRIENDS_SUPPORT",
    "PAYMENT_FOR_GOODS_AND_SERVICES",
    "DONATIONS",
    "SAVINGS",
  ]),
});

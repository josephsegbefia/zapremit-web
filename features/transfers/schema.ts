import { z } from "zod";

export const createTransferSchema = z.object({
  recipientId: z.string().min(1, "Recipient Id is required"),
  customerId: z.string().min(1, "Required"),
  sentAmount: z.number().positive("Amount to send must be greater than zero"),
  receivedAmount: z.number().positive(),
  adjustedExchangeRate: z.number().positive(),
  exchangeRate: z.number().positive(),
  transferReason: z.enum([
    "FAMILY_AND_FRIENDS_SUPPORT",
    "PAYMENT_FOR_GOODS_AND_SERVICES",
    "DONATIONS",
    "SAVINGS",
  ]),
});

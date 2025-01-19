import { z } from "zod";

export const createTransferSchema = z.object({
  recipientId: z.string().min(1, "Recipient Id is required"),
  sentAmount: z.number().positive("Amount to send must be greater than zero"),
  receivedAmount: z.number().positive(),
  exchangeRate: z.number().positive("Exchange rate must be a positive integer"),
  adjustedExchangeRate: z.number().positive(),
  status: z
    .enum(["PENDING", "SUCCESSFUL", "FAILED", "CANCELED", "IN_REVIEW"])
    .default("PENDING"),
});

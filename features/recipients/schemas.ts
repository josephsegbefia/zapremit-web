import { z } from "zod";

export const createRecipientSchema = z.object({
  name: z.string().trim().min(1, "Name is required"), // Name must be a non-empty string
  phone: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"), // Basic E.164 validation
  customerId: z.string(),
  email: z.string().trim().email().optional(), // Ensure valid email format
  street_address: z.string().trim().optional(),
  city: z.string().optional(),
  callingCode: z.string().optional(),
  send_transfer_update: z.boolean().optional(),
  country: z.string(),
});

export const updateRecipientSchema = z.object({
  name: z.string().trim().min(1, "This field cannot be empty").optional(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),
  // customerId: z.string(),
  email: z.string().trim().email().optional(),
  street_address: z.string().trim().optional(),
  city: z.string().trim().optional(),
  callingCode: z.string().optional(),
  send_transfer_update: z.boolean().optional(),
  country: z.string(),
});

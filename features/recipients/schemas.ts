import { z } from "zod";

export const createRecipientSchema = z.object({
  name: z.string().min(1, "Name is required"), // Name must be a non-empty string
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"), // Basic E.164 validation
  customerId: z.string(),
  email: z.string().email("Invalid email address"), // Ensure valid email format
  street_address: z.string().optional(),
  city: z.string().optional(),
  callingCode: z.string().optional(),
  send_transfer_update: z.boolean().optional(),
});

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email(),
  password: z.string().min(1, "Password required"),
});

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().min(1, "Email is required").email(),
  password: z.string().min(8, "Minimum 8 characters"),
});

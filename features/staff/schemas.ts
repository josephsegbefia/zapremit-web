import { z } from "zod";
export const createStaffSchema = z.object({
  name: z.string().trim().min(5, "Required"),
  email: z.string().trim().min(1, "Email is required").email(),
  password: z.string().min(8, "Minimum 8 characters"),
  roleId: z.string(),
  createdBy: z.string(),
  status: z.string(),
  userId: z.string(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export const staffLoginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email(),
  password: z.string().min(1, "Password required"),
});

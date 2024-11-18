import { z } from "zod";

export const updateCustomerPersonalDetailsSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().min(1, "Email is required").email(),
  phone: z.string().regex(/^\d{7,10}$/, {
    message: "Phone number must be between 7 and 10 digits.",
  }),
  street: z.string().min(1, { message: "Street cannot be empty." }),
  postcode: z.string().regex(/^[A-Z0-9]{3,10}$/, {
    message: "Invalid postcode format.",
  }),
  city: z.string().min(1, { message: "City cannot be empty." }),
  isIdentified: z.boolean().refine((val) => val === true, {
    message: "Customer must pass KYC tests.",
  }),
  dateOfBirth: z.string().refine(
    (date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) && parsedDate < new Date();
    },
    {
      message: "Date of birth must be a valid date in the past.",
    }
  ),
});

export const updateCustomerCountriesInfo = z.object({
  originCountry: z.string().trim().min(1, "Your country is required"),
  beneficiaryCountry: z
    .string()
    .trim()
    .min(1, "Your beneficiary country is required"),
});

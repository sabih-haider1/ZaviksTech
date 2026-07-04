import { z } from "zod";

const leadStatusValues = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED"] as const;

export const adminLoginSchema = z.object({
  email: z.string().trim().email("Enter a valid admin email address."),
  password: z.string().min(8, "Enter a valid password."),
});

export type AdminLoginValues = z.infer<typeof adminLoginSchema>;

export const leadUpdateSchema = z.object({
  leadId: z.string().trim().min(1, "Lead id is required."),
  status: z.enum(leadStatusValues),
  notes: z
    .string()
    .trim()
    .max(2000, "Notes are too long.")
    .optional()
    .or(z.literal("")),
});

export type LeadUpdateValues = z.infer<typeof leadUpdateSchema>;
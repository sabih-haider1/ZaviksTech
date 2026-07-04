import { z } from "zod";

import { services } from "@/lib/services";

const serviceNames = services.map((s) => s.name);
/** Allowed values for the "Service Required" field, plus a general option. */
export const serviceOptions = [...serviceNames, "General Enquiry"] as const;

const leadSourceValues = [
  "HOMEPAGE_POPUP",
  "CONTACT_PAGE",
  "SERVICE_PAGE",
] as const;

/**
 * Full contact form schema (used by the contact page and service pages).
 * Shared between client (React Hook Form) and server (Server Action).
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .max(150, "Email is too long."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(30, "Phone number is too long.")
    .regex(/^[+()\-\s\d]+$/, "Please enter a valid phone number."),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long.")
    .optional()
    .or(z.literal("")),
  service: z
    .string()
    .refine((value) => serviceOptions.includes(value as never), {
      message: "Please select a service.",
    }),
  message: z
    .string()
    .trim()
    .max(2000, "Message is too long.")
    .optional()
    .or(z.literal("")),
  source: z.enum(leadSourceValues).default("CONTACT_PAGE"),
  /** Honeypot — must stay empty. Bots tend to fill every field. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Popup lead schema — a lighter form. Company is dropped; message optional.
 */
export const popupLeadSchema = contactFormSchema.pick({
  name: true,
  email: true,
  phone: true,
  service: true,
  message: true,
  source: true,
  website: true,
});

export type PopupLeadValues = z.infer<typeof popupLeadSchema>;

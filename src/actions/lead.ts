"use server";

import { headers } from "next/headers";

import { prisma } from "@/lib/prisma";
import { sendLeadEmails } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/validations/lead";
import type { LeadSource } from "@prisma/client";

export interface LeadActionResult {
  success: boolean;
  message: string;
  /** Field-level errors keyed by field name. */
  fieldErrors?: Record<string, string[]>;
}

/**
 * Server Action: validate, persist and notify for a new lead.
 * Shared by the contact form, service-page forms and the homepage popup.
 */
export async function submitLead(
  input: unknown,
): Promise<LeadActionResult> {
  // Basic abuse protection keyed on client IP.
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  const { success: withinLimit } = rateLimit(`lead:${ip}`, 5, 60_000);
  if (!withinLimit) {
    return {
      success: false,
      message:
        "You've submitted a few requests already. Please wait a moment and try again.",
    };
  }

  const parsed = contactFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  // Honeypot: silently accept but discard obvious bots.
  if (data.website && data.website.length > 0) {
    return {
      success: true,
      message: "Thank you. We'll be in touch shortly.",
    };
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company?.trim() ? data.company.trim() : null,
        service: data.service,
        message: data.message?.trim() ? data.message.trim() : null,
        source: data.source as LeadSource,
      },
    });

    // Fire-and-forget emails; never block the user's success response on them.
    await sendLeadEmails({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      service: lead.service,
      message: lead.message,
      source: lead.source,
      createdAt: lead.createdAt,
    });

    return {
      success: true,
      message:
        "Thank you! Your enquiry has been received. We'll get back to you shortly.",
    };
  } catch (error) {
    console.error("[submitLead] Failed to create lead:", error);
    return {
      success: false,
      message:
        "Something went wrong on our end. Please try again, or contact us directly.",
    };
  }
}

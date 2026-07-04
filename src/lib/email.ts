import { Resend } from "resend";

import { siteConfig } from "@/lib/site";
import {
  adminLeadEmail,
  customerConfirmationEmail,
} from "@/emails/templates";
import type { ContactFormValues } from "@/lib/validations/lead";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM ?? `ZaviksTech <no-reply@zavikstech.com>`;
const notifyTo =
  process.env.LEAD_NOTIFICATION_EMAIL ?? siteConfig.email;

// Instantiate lazily so a missing key doesn't crash the build.
const resend = apiKey ? new Resend(apiKey) : null;

type LeadEmailPayload = Omit<ContactFormValues, "website" | "company" | "message"> & {
  id: string;
  createdAt: Date;
  company?: string | null;
  message?: string | null;
};

/**
 * Send the internal notification and the customer confirmation.
 * Email failures never block lead capture — the lead is already persisted —
 * so errors are logged and swallowed.
 */
export async function sendLeadEmails(lead: LeadEmailPayload): Promise<void> {
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY not configured — skipping lead emails.",
    );
    return;
  }

  const results = await Promise.allSettled([
    resend.emails.send({
      from,
      to: notifyTo,
      replyTo: lead.email,
      subject: `New Website Lead - ${lead.service}`,
      html: adminLeadEmail(lead),
    }),
    resend.emails.send({
      from,
      to: lead.email,
      subject: "Thank You for Contacting ZaviksTech",
      html: customerConfirmationEmail(lead),
    }),
  ]);

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("[email] Failed to send lead email:", result.reason);
    }
  });
}

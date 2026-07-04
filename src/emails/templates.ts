import { siteConfig } from "@/lib/site";

interface LeadEmailData {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  service: string;
  message?: string | null;
  source: string;
  createdAt: Date;
}

/* "Practice Ledger" palette — pine, ink, copper on paper. */
const brand = {
  primary: "#C3571D",
  secondary: "#192E2A",
  accent: "#DF733A",
  bg: "#F8F6F2",
  border: "#E4DFD7",
  muted: "#6B625B",
};

const sourceLabels: Record<string, string> = {
  HOMEPAGE_POPUP: "Homepage Popup",
  CONTACT_PAGE: "Contact Page",
  SERVICE_PAGE: "Service Page",
};

function layout(title: string, inner: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:${brand.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${brand.secondary};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid ${brand.border};border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:${brand.secondary};padding:24px 32px;">
                <span style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">Zaviks<span style="color:${brand.accent};">Tech</span></span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${inner}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:${brand.bg};border-top:1px solid ${brand.border};font-size:12px;color:${brand.muted};">
                ${siteConfig.name} &middot; ${siteConfig.phone} &middot; ${siteConfig.email}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${brand.border};font-size:13px;color:${brand.muted};width:130px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${brand.border};font-size:14px;color:${brand.secondary};font-weight:500;">${value}</td>
  </tr>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Internal notification sent to the ZaviksTech inbox. */
export function adminLeadEmail(lead: LeadEmailData): string {
  const inner = `
    <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:${brand.secondary};">New website lead</h1>
    <p style="margin:0 0 24px;font-size:14px;color:${brand.muted};">
      A new enquiry was submitted for <strong style="color:${brand.primary};">${escapeHtml(lead.service)}</strong>.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", escapeHtml(lead.name))}
      ${row("Email", `<a href="mailto:${escapeHtml(lead.email)}" style="color:${brand.primary};text-decoration:none;">${escapeHtml(lead.email)}</a>`)}
      ${row("Phone", `<a href="tel:${escapeHtml(lead.phone)}" style="color:${brand.primary};text-decoration:none;">${escapeHtml(lead.phone)}</a>`)}
      ${lead.company ? row("Company", escapeHtml(lead.company)) : ""}
      ${row("Service", escapeHtml(lead.service))}
      ${row("Source", sourceLabels[lead.source] ?? escapeHtml(lead.source))}
      ${lead.message ? row("Message", escapeHtml(lead.message).replace(/\n/g, "<br />")) : ""}
    </table>
    <div style="margin-top:28px;">
      <a href="${siteConfig.url}/admin/leads/${lead.id}" style="display:inline-block;background:${brand.primary};color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:10px;">View lead in dashboard</a>
    </div>`;

  return layout(`New Website Lead - ${lead.service}`, inner);
}

/** Confirmation sent to the customer. */
export function customerConfirmationEmail(lead: LeadEmailData): string {
  const inner = `
    <h1 style="margin:0 0 12px;font-size:20px;font-weight:700;color:${brand.secondary};">Thank you, ${escapeHtml(lead.name.split(" ")[0] ?? lead.name)}!</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${brand.secondary};">
      Thank you for contacting ${siteConfig.name}. We&rsquo;ve received your enquiry about
      <strong>${escapeHtml(lead.service)}</strong> and a member of our team will get back to you
      as soon as possible.
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${brand.secondary};">
      If your enquiry is urgent, you can reach us directly:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr><td style="padding:4px 0;font-size:14px;">📞 <a href="tel:${siteConfig.phone.replace(/\s+/g, "")}" style="color:${brand.primary};text-decoration:none;">${siteConfig.phone}</a></td></tr>
      <tr><td style="padding:4px 0;font-size:14px;">✉️ <a href="mailto:${siteConfig.email}" style="color:${brand.primary};text-decoration:none;">${siteConfig.email}</a></td></tr>
    </table>
    <p style="margin:0;font-size:14px;line-height:1.6;color:${brand.muted};">
      Warm regards,<br />The ${siteConfig.name} Team
    </p>`;

  return layout("Thank You for Contacting ZaviksTech", inner);
}

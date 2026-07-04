/**
 * Central site configuration. Public contact details fall back to the
 * bundled defaults but are overridable via environment variables so the
 * same build can be re-pointed without code changes.
 */

export const siteConfig = {
  name: "ZaviksTech",
  legalName: "ZaviksTech",
  description:
    "Professional IT services, web development, cybersecurity, automation, managed services, and digital solutions designed to help businesses grow.",
  tagline: "Reliable IT & Digital Solutions For Growing Businesses",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zavikstech.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+44 7862 714552",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "447862714552",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@zavikstech.com",
  address: {
    street: "878A Eastern Avenue",
    locality: "Newbury Park",
    region: "London",
    postalCode: "IG2 7HY",
    country: "United Kingdom",
    countryCode: "GB",
  },
  locale: "en_GB",
} as const;

/** Single-line postal address for display and map queries. */
export const formattedAddress = `${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.postalCode}`;

/** Full map query string (address + country), URL-encoded. */
function mapQuery(): string {
  return encodeURIComponent(`${formattedAddress}, ${siteConfig.address.country}`);
}

/** Google Maps embed URL — no API key required; drops a pin on the office. */
export function mapEmbedSrc(): string {
  return `https://www.google.com/maps?q=${mapQuery()}&z=16&output=embed`;
}

/** Deep link that opens turn-by-turn directions to the office. */
export function mapDirectionsLink(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${mapQuery()}`;
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Reasons clients choose ZaviksTech — used across Home / About. */
export const trustPoints = [
  "Professional Support",
  "Tailored Solutions",
  "Secure Infrastructure",
  "Modern Technologies",
  "Responsive Communication",
  "Business Focused Results",
] as const;

/** WhatsApp click-to-chat deep link with a pre-filled enquiry. */
export function whatsappLink(
  message = "Hello ZaviksTech, I'd like to discuss a project.",
): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
}

/** Digits-only phone for tel: links. */
export function telLink(): string {
  return `tel:${siteConfig.phone.replace(/\s+/g, "")}`;
}

import type { LucideIcon } from "lucide-react";

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  /** URL slug, e.g. "web-development" */
  slug: string;
  /** Display name */
  name: string;
  /** One-line summary for cards & meta descriptions */
  summary: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Hero headline shown on the detail page */
  heroHeadline: string;
  /** Longer overview paragraph(s) */
  overview: string[];
  /** Key benefits */
  benefits: ServiceBenefit[];
  /** Delivery process */
  process: ProcessStep[];
  /** Frequently asked questions */
  faqs: FaqItem[];
  /** SEO keywords */
  keywords: string[];
}

export type LeadSource = "HOMEPAGE_POPUP" | "CONTACT_PAGE" | "SERVICE_PAGE";
export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED";

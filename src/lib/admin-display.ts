import type { LeadSource, LeadStatus } from "@/types";

export function leadStatusLabel(status: LeadStatus): string {
  switch (status) {
    case "NEW":
      return "New";
    case "CONTACTED":
      return "Contacted";
    case "QUALIFIED":
      return "Qualified";
    case "CLOSED":
      return "Closed";
  }
}

export function leadStatusBadgeVariant(status: LeadStatus) {
  switch (status) {
    case "NEW":
      return "default";
    case "CONTACTED":
      return "secondary";
    case "QUALIFIED":
      return "accent";
    case "CLOSED":
      return "success";
  }
}

export function leadSourceLabel(source: LeadSource): string {
  switch (source) {
    case "HOMEPAGE_POPUP":
      return "Homepage Popup";
    case "CONTACT_PAGE":
      return "Contact Page";
    case "SERVICE_PAGE":
      return "Service Page";
  }
}
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/lib/services";
import { siteConfig, telLink, whatsappLink } from "@/lib/site";
import { Logo } from "@/components/layout/logo";

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

/**
 * Footer as the final conversion surface, not a sitemap dump: a pine plate
 * that opens with the invitation, then a contact ledger and the numbered
 * service index.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-pine text-primary-foreground">
      <div
        aria-hidden="true"
        className="blueprint-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_90%_at_85%_0%,black,transparent_72%)]"
      />
      {/* The invitation. */}
      <div className="container relative pb-14 pt-16 sm:pt-20 lg:pb-16 lg:pt-24">
        <p className="meta-dark">One conversation to start</p>
        <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl font-display text-4xl font-medium tracking-[-0.015em] text-primary-foreground sm:text-5xl lg:text-6xl">
            Have a project in&nbsp;mind?
          </h2>
          <Link
            href="/contact"
            className="group inline-flex h-14 w-fit shrink-0 items-center gap-3 bg-accent px-8 text-[13px] font-semibold uppercase tracking-button text-accent-foreground transition-colors hover:bg-copper-soft active:translate-y-px"
          >
            Start the conversation
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>

      {/* Ledger: direct lines + the service index. */}
      <div className="relative border-t border-primary-foreground/15">
        <div className="container grid gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-16">
          <div>
            <h3 className="meta-dark">Direct lines</h3>
            <ul className="mt-6 space-y-5">
              <li>
                <a
                  href={telLink()}
                  className="group flex items-baseline justify-between gap-4 border-b border-primary-foreground/15 pb-4"
                >
                  <span className="meta-dark">Phone</span>
                  <span className="font-display text-xl text-primary-foreground transition-colors group-hover:text-accent sm:text-2xl">
                    {siteConfig.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-baseline justify-between gap-4 border-b border-primary-foreground/15 pb-4"
                >
                  <span className="meta-dark">Email</span>
                  <span className="break-all font-display text-xl text-primary-foreground transition-colors group-hover:text-accent sm:text-2xl">
                    {siteConfig.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 border-b border-primary-foreground/15 pb-4"
                >
                  <span className="meta-dark">WhatsApp</span>
                  <span className="font-display text-xl text-primary-foreground transition-colors group-hover:text-accent sm:text-2xl">
                    Message the practice
                  </span>
                </a>
              </li>
            </ul>

            <nav aria-label="Company" className="mt-10">
              <ul className="flex flex-wrap gap-x-8 gap-y-2">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <nav aria-label="Services">
            <h3 className="meta-dark">Service index</h3>
            <ul className="mt-6">
              {services.map((service, index) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-baseline gap-5 border-b border-primary-foreground/15 py-3.5"
                  >
                    <span className="font-mono text-xs text-primary-foreground/50 transition-colors group-hover:text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base text-primary-foreground/85 transition-colors group-hover:text-primary-foreground">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Imprint. */}
      <div className="relative border-t border-primary-foreground/15">
        <div className="container flex flex-col items-start justify-between gap-4 py-7 sm:flex-row sm:items-center">
          <div className="flex items-center gap-6">
            <Logo inverted />
            <p className="text-sm text-primary-foreground/55">
              &copy; {year} {siteConfig.legalName}. All rights reserved.
            </p>
          </div>
          <nav aria-label="Legal">
            <ul className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-primary-foreground/55 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

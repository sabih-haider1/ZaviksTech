import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import {
  formattedAddress,
  mapDirectionsLink,
  mapEmbedSrc,
  siteConfig,
  telLink,
  whatsappLink,
} from "@/lib/site";
import { LeadForm } from "@/components/forms/lead-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata = buildMetadata({ title: "Contact" });

/**
 * Contact as a premium split: a person to speak to on the left — direct
 * channels set as a large-type ledger — and a framed enquiry form on the
 * right. The form is the page's focus; a framed map with a pin on the office
 * closes the page.
 */
export default function ContactPage() {
  return (
    <>
      <section className="container grid gap-14 pb-16 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-28">
        <div className="lg:col-span-5">
          <p className="meta flex items-center gap-4 text-accent">
            <span aria-hidden="true" className="h-px w-10 bg-accent" />
            Contact
          </p>
          <h1 className="mt-8 text-balance font-display text-4xl font-medium leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            Speak to a person.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Tell us about your project or problem and we&apos;ll respond with a
            clear, practical next step — no obligation, no jargon.
          </p>

          {/* Direct channels — large-type ledger */}
          <ul className="mt-12 space-y-6">
            <li>
              <a
                href={telLink()}
                className="group block border-b border-border pb-5"
              >
                <span className="meta flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  Phone
                </span>
                <span className="mt-1 block font-display text-2xl text-secondary transition-colors group-hover:text-accent sm:text-3xl">
                  {siteConfig.phone}
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group block border-b border-border pb-5"
              >
                <span className="meta flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  Email
                </span>
                <span className="mt-1 block break-all font-display text-2xl text-secondary transition-colors group-hover:text-accent sm:text-3xl">
                  {siteConfig.email}
                </span>
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-b border-border pb-5"
              >
                <span className="meta flex items-center gap-2">
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  WhatsApp
                </span>
                <span className="mt-1 block font-display text-2xl text-secondary transition-colors group-hover:text-accent sm:text-3xl">
                  Message the practice
                </span>
              </a>
            </li>
            <li>
              <a href="#find-us" className="group block border-b border-border pb-5">
                <span className="meta flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  Office
                </span>
                <span className="mt-1 block font-display text-2xl text-secondary transition-colors group-hover:text-accent sm:text-3xl">
                  {siteConfig.address.locality}, {siteConfig.address.region}
                </span>
              </a>
            </li>
          </ul>

          <p className="meta mt-10 max-w-sm normal-case leading-relaxed tracking-normal">
            Remote-first and business-friendly — responsive communication
            throughout your project, wherever you are.
          </p>
        </div>

        {/* The enquiry form — framed, raised paper */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="border border-secondary/20 bg-card p-6 sm:p-10">
            <p className="meta text-accent">Enquiry form</p>
            <h2 className="mt-3 font-display text-2xl font-medium text-secondary sm:text-3xl">
              Tell us what you need
            </h2>
            <LeadForm
              className="mt-8"
              source="CONTACT_PAGE"
              submitLabel="Send enquiry"
            />
          </div>
        </div>
      </section>

      {/* Find us — framed map with a pin on the office */}
      <section
        id="find-us"
        className="scroll-mt-24 border-t border-border"
      >
        <Reveal
          stagger
          className="container grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:py-24"
        >
          <div>
            <p className="meta flex items-center gap-4 text-accent">
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              Find us
            </p>
            <h2 className="mt-6 font-display text-3xl font-medium tracking-[-0.015em] sm:text-4xl">
              Come and say hello.
            </h2>
            <address className="mt-6 space-y-0.5 text-lg not-italic leading-relaxed text-foreground/85">
              <span className="block">{siteConfig.address.street}</span>
              <span className="block">{siteConfig.address.locality}</span>
              <span className="block">{siteConfig.address.postalCode}</span>
              <span className="block">{siteConfig.address.country}</span>
            </address>
            <a
              href={mapDirectionsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2.5 text-sm font-medium text-secondary transition-colors hover:text-accent"
            >
              Get directions
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="relative overflow-hidden border border-secondary/20 bg-card">
            <iframe
              title={`Map showing ${siteConfig.name} at ${formattedAddress}`}
              src={mapEmbedSrc()}
              className="block aspect-[16/10] w-full grayscale-[0.35] transition-[filter] duration-500 hover:grayscale-0"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}

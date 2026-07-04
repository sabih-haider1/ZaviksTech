import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  serviceJsonLd,
} from "@/lib/seo";
import { getService, getServiceSlugs, services } from "@/lib/services";
import { siteConfig, telLink, whatsappLink } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { LeadForm } from "@/components/forms/lead-form";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return buildMetadata({
      title: "Service Not Found",
      path: "/services",
      noIndex: true,
    });
  }

  return buildMetadata({
    title: service.name,
    description: service.summary,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

/**
 * Service detail as an editorial article: mono breadcrumb, display
 * headline, ruled meta strip, sticky-label overview, ruled benefit blocks,
 * a serif process rail, hairline FAQ and a pine enquiry plate. No cards.
 */
export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const indexNumber = String(
    services.findIndex((s) => s.slug === service.slug) + 1,
  ).padStart(2, "0");
  const Icon = service.icon;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
          serviceJsonLd({
            name: service.name,
            description: service.summary,
            path: `/services/${service.slug}`,
          }),
          faqJsonLd(service.faqs),
        ]}
      />

      {/* Masthead */}
      <section className="container pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb">
          <ol className="meta flex flex-wrap items-center gap-3">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Index
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/services"
                className="transition-colors hover:text-accent"
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-accent">
              {indexNumber} — {service.name}
            </li>
          </ol>
        </nav>

        <div
          aria-hidden="true"
          className="mt-8 flex h-14 w-14 items-center justify-center border border-border text-accent"
        >
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 max-w-4xl text-balance font-display text-4xl font-medium leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          {service.heroHeadline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
          {service.summary}
        </p>

        {/* Ruled meta strip */}
        <div className="mt-12 flex flex-col gap-6 border-y border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-10 gap-y-2">
            <p className="meta">
              Service <span className="text-secondary">{indexNumber} / 07</span>
            </p>
            <p className="meta hidden sm:block">
              Engagement{" "}
              <span className="text-secondary">Project or ongoing</span>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#enquire"
              className="group inline-flex h-11 items-center gap-2.5 bg-accent px-6 text-[13px] font-semibold uppercase tracking-button text-accent-foreground transition-colors hover:bg-copper-soft"
            >
              Get a quote
            </a>
            <a
              href={telLink()}
              className="meta transition-colors hover:text-accent"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Overview — sticky label rail */}
      <section className="container grid gap-8 py-16 sm:py-20 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-3">
          <p className="meta lg:sticky lg:top-32">Overview</p>
        </div>
        <Reveal className="space-y-6 lg:col-span-7">
          {service.overview.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-2xl text-lg leading-relaxed text-foreground/85"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </section>

      {/* Benefits — ruled blocks, two columns */}
      <section className="border-t border-border">
        <div className="container section-tight">
          <Reveal>
            <SectionHeading
              eyebrow="What you get"
              title="Why this service makes a measurable difference"
            />
          </Reveal>
          <Reveal as="ul" stagger className="mt-12 grid gap-x-16 sm:grid-cols-2">
            {service.benefits.map((benefit, index) => (
              <li
                key={benefit.title}
                className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-t border-border py-7"
              >
                <span className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium text-secondary">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Process — horizontal serif rail */}
      <section className="border-t border-border bg-card">
        <div className="container section-tight">
          <Reveal>
            <SectionHeading
              eyebrow="How we deliver"
              title="A simple sequence that keeps the work visible"
            />
          </Reveal>
          <Reveal
            as="ol"
            stagger
            className="mt-12 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {service.process.map((step, index) => (
              <li
                key={step.title}
                className="border-l border-border pl-6 lg:pl-8"
              >
                <span className="font-display text-3xl font-light text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-medium text-secondary">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ — hairline ledger */}
      <section className="border-t border-border">
        <div className="container grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="FAQ"
                title="Common questions"
                description="Quick answers to help you decide whether this service is the right fit."
              />
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <Accordion type="single" collapsible>
              {service.faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Enquiry — pine plate with a paper form panel */}
      <section
        id="enquire"
        className="relative overflow-hidden bg-pine text-primary-foreground"
      >
        <div
          aria-hidden="true"
          className="blueprint-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_80%_at_0%_0%,black,transparent_70%)]"
        />
        <div className="container relative grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
          <Reveal className="lg:col-span-5">
            <p className="meta-dark flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              Enquire
            </p>
            <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.015em] text-primary-foreground sm:text-5xl">
              Tell us about your project.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-primary-foreground/70">
              Share a few details and we&apos;ll come back with practical next
              steps — whether you need a one-off project or ongoing support.
            </p>

            <div className="mt-12 space-y-5">
              <a
                href={telLink()}
                className="group flex items-baseline justify-between gap-4 border-b border-primary-foreground/15 pb-4"
              >
                <span className="meta-dark">Phone</span>
                <span className="font-display text-xl text-primary-foreground transition-colors group-hover:text-accent">
                  {siteConfig.phone}
                </span>
              </a>
              <a
                href={whatsappLink(
                  `Hello ZaviksTech, I'd like to discuss ${service.name}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-4 border-b border-primary-foreground/15 pb-4"
              >
                <span className="meta-dark">WhatsApp</span>
                <span className="font-display text-xl text-primary-foreground transition-colors group-hover:text-accent">
                  Message the practice
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal className="bg-card p-6 text-card-foreground sm:p-10 lg:col-span-6 lg:col-start-7">
            <p className="meta text-accent">
              {indexNumber} — {service.name}
            </p>
            <h3 className="mt-3 font-display text-2xl font-medium text-secondary">
              Request a free consultation
            </h3>
            <LeadForm
              className="mt-8"
              source="SERVICE_PAGE"
              defaultService={service.name}
              submitLabel="Send enquiry"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

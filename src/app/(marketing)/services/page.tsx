import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { CtaSection } from "@/components/shared/cta-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceIndex } from "@/components/services/service-index";
import { Reveal } from "@/components/motion/reveal";

export const metadata = buildMetadata({ title: "Services" });

/**
 * Services overview with deliberate hierarchy: the first practice area
 * dominates as a framed feature panel; the remaining six follow as ledger
 * rows. No grid of identical rectangles.
 */
export default function ServicesPage() {
  const [featured, ...rest] = services;
  if (!featured) return null;

  return (
    <>
      <section className="pb-14 pt-16 sm:pt-20 lg:pb-20 lg:pt-28">
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title="What we do, in plain terms"
            description="Each service page explains the offer, the benefits, the process and the next step — so you can move from interest to enquiry without guesswork."
          />
        </div>
      </section>

      {/* Featured practice — 01 dominates. */}
      <section className="container">
        <Reveal className="border border-secondary/20 bg-card">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-8 sm:p-12 lg:p-14">
              <p className="meta text-accent">01 — Featured practice</p>
              <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.015em] sm:text-5xl">
                {featured.name}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {featured.overview[0]}
              </p>
              <Link
                href={`/services/${featured.slug}`}
                className="group mt-10 inline-flex h-12 items-center gap-3 border border-secondary/30 px-7 text-[13px] font-semibold uppercase tracking-button text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                Explore {featured.name}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="border-t border-secondary/20 p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-14">
              <p className="meta">What you get</p>
              <ul className="mt-6">
                {featured.benefits.map((benefit, index) => (
                  <li
                    key={benefit.title}
                    className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-t border-border py-5 first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-medium text-secondary">
                        {benefit.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* The rest of the index. */}
      <section className="section-tight">
        <div className="container">
          <p className="meta mb-8">02 — 07 · The full index</p>
          <ServiceIndex services={rest} startAt={2} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}

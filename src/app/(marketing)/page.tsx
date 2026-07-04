import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { services } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";
import { trustPoints } from "@/lib/site";
import { Hero } from "@/components/home/hero";
import { ServiceIndex } from "@/components/services/service-index";
import { CtaSection } from "@/components/shared/cta-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";

export const metadata = buildMetadata();

const processSteps = [
  {
    title: "Discover",
    description:
      "We learn your goals, challenges and current setup so the solution is grounded in what your business actually needs.",
  },
  {
    title: "Plan",
    description:
      "We define the scope, priorities and best route to a solution before any work begins.",
  },
  {
    title: "Deliver",
    description:
      "We build, implement and launch with a focus on quality, clarity and minimal disruption.",
  },
  {
    title: "Support",
    description:
      "We stay available for ongoing help, maintenance and improvements after launch.",
  },
] as const;

const practiceReasons = [
  {
    title: "Tailored solutions",
    description:
      "Every engagement is scoped around your goals, your team and your current systems — never a template.",
  },
  {
    title: "Fast response",
    description:
      "Clear communication and prompt turnaround keep projects moving and issues under control.",
  },
  {
    title: "Security focused",
    description:
      "We build and support solutions with sensible security practices from the start.",
  },
  {
    title: "Long-term support",
    description:
      "You get a partner for the long run, not a one-off handoff that leaves you stranded.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* The service index — the ledger, not a card grid. */}
      <section id="service-index" className="section">
        <div className="container">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Service index"
              title="Seven ways we keep technology moving your business forward"
            />
            <Link
              href="/services"
              className="group mb-1 inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-accent"
            >
              All services
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          <ServiceIndex services={services} className="mt-12" />
        </div>
      </section>

      {/* The practice — pine plate manifesto. */}
      <section className="relative overflow-hidden bg-pine text-primary-foreground">
        <div
          aria-hidden="true"
          className="blueprint-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_80%_at_100%_0%,black,transparent_70%)]"
        />
        <div className="container section relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-5">
              <p className="meta-dark flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-10 bg-accent" />
                Why ZaviksTech
              </p>
              <h2 className="mt-6 font-display text-4xl font-medium leading-tight tracking-[-0.015em] text-primary-foreground sm:text-5xl">
                No hype. No jargon. Technology that simply does its job.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-primary-foreground/70">
                We avoid unnecessary complexity and concentrate on the
                outcomes that matter — fewer interruptions, safer systems and
                more enquiries for your business.
              </p>
            </Reveal>

            <Reveal as="ul" stagger className="lg:col-span-6 lg:col-start-7">
              {practiceReasons.map((reason, index) => (
                <li
                  key={reason.title}
                  className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-primary-foreground/15 py-7 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[4rem_1fr]"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium text-primary-foreground sm:text-2xl">
                      {reason.title}
                    </h3>
                    <p className="mt-2 max-w-lg leading-relaxed text-primary-foreground/65">
                      {reason.description}
                    </p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>

          {/* Commitments ticker */}
          <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-3 border-t border-primary-foreground/15 pt-8 lg:mt-24">
            {trustPoints.map((point) => (
              <li key={point} className="meta-dark">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work — sticky intro, numbered rail. */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="How we work"
                title="A simple, transparent delivery process"
                description="The work stays structured so you always know what is happening, what comes next and how decisions are being made."
              />
            </Reveal>
          </div>

          <Reveal as="ol" stagger className="lg:col-span-6 lg:col-start-7">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-border py-8 last:border-b sm:grid-cols-[5rem_1fr] sm:py-10"
              >
                <span className="font-display text-2xl font-light text-accent sm:text-3xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-medium text-secondary">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

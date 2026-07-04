import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { trustPoints } from "@/lib/site";
import { CtaSection } from "@/components/shared/cta-section";
import { Reveal } from "@/components/motion/reveal";
import { ArchSchematic } from "@/components/graphics/arch-schematic";

export const metadata = buildMetadata({ title: "About" });

const principles = [
  {
    title: "Professional support",
    description:
      "Responsive communication and dependable delivery that help clients feel supported from the first conversation.",
  },
  {
    title: "Security first",
    description:
      "We make sensible security part of the plan, not an afterthought.",
  },
  {
    title: "Tailored solutions",
    description:
      "Every recommendation is shaped to fit the client, not a generic template.",
  },
  {
    title: "Practical delivery",
    description:
      "We focus on solutions that are maintainable, scalable and useful in real business settings.",
  },
] as const;

/**
 * About as a visual narrative: manifesto opening, a journal-spread story,
 * a numbered book of principles, a pine strip of commitments and the
 * service index as the closing cross-reference.
 */
export default function AboutPage() {
  return (
    <>
      {/* Manifesto */}
      <section className="container pt-16 sm:pt-20 lg:pt-28">
        <p className="meta flex items-center gap-4 text-accent">
          <span aria-hidden="true" className="h-px w-10 bg-accent" />
          About the practice
        </p>
        <h1 className="mt-8 max-w-4xl text-balance font-display text-4xl font-medium leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          We help businesses use technology with{" "}
          <em className="font-light italic text-accent">confidence.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
          ZaviksTech designs, builds and supports practical digital solutions
          that are fast, secure and focused on generating results — so
          growing businesses can move without technology getting in the way.
        </p>
      </section>

      {/* The story — a journal spread */}
      <section className="container mt-16 border-t border-border pt-12 sm:mt-20 lg:mt-24">
        <Reveal stagger className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="meta">Who we are</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/85">
              ZaviksTech is a modern digital services practice focused on IT
              support, web development, cybersecurity, automation, managed
              services and social media management. We bring together the
              technical and commercial sides of a project so the solution is
              useful, maintainable and aligned with your goals.
            </p>
          </div>
          <div>
            <p className="meta">Why clients choose us</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/85">
              Clients choose ZaviksTech when they want a partner who can
              respond quickly, explain things clearly and deliver a clean,
              professional result without unnecessary overhead. We do not
              chase hype or complexity — our focus is practical delivery,
              clear communication and long-term value.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Editorial figure — the keystone motif */}
      <section className="container mt-16 sm:mt-20 lg:mt-24">
        <Reveal className="relative overflow-hidden border border-border bg-card">
          <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <p className="meta text-accent">Fig. 01 — The keystone principle</p>
              <p className="mt-5 font-display text-2xl font-medium leading-snug tracking-[-0.015em] text-secondary sm:text-3xl">
                Every system has one piece that holds the rest together. We
                find it first — then build outward with confidence.
              </p>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                It is the idea our name is built on, and the way we approach
                every engagement.
              </p>
            </div>
            <ArchSchematic className="text-secondary" />
          </div>
        </Reveal>
      </section>

      {/* The principles — a numbered book */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="meta flex items-center gap-4 text-accent">
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              Principles
            </p>
            <h2 className="mt-6 max-w-2xl font-display text-3xl font-medium tracking-[-0.015em] sm:text-4xl">
              Built to solve real business problems
            </h2>
          </Reveal>

          <Reveal as="ol" stagger className="mt-12 border-b border-border">
            {principles.map((principle, index) => (
              <li
                key={principle.title}
                className="grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 border-t border-border py-8 sm:grid-cols-[7rem_1fr] sm:py-10 lg:grid-cols-[9rem_minmax(0,0.9fr)_minmax(0,1.1fr)]"
              >
                <span className="font-display text-3xl font-light text-accent sm:text-5xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-medium text-secondary sm:text-3xl">
                  {principle.title}
                </h3>
                <p className="col-start-2 mt-3 max-w-xl leading-relaxed text-muted-foreground sm:text-lg lg:col-start-3 lg:mt-0">
                  {principle.description}
                </p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Commitments — pine strip */}
      <section className="relative overflow-hidden bg-pine text-primary-foreground">
        <div
          aria-hidden="true"
          className="blueprint-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_120%_at_100%_50%,black,transparent_72%)]"
        />
        <div className="container relative py-14 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal
              as="h2"
              className="max-w-md font-display text-3xl font-medium leading-snug tracking-[-0.015em] text-primary-foreground sm:text-4xl"
            >
              What working with us feels like
            </Reveal>
            <Reveal
              as="ul"
              stagger
              className="grid gap-x-12 gap-y-4 sm:grid-cols-2"
            >
              {trustPoints.map((point, index) => (
                <li
                  key={point}
                  className="flex items-baseline gap-4 border-b border-primary-foreground/15 pb-4"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base text-primary-foreground/85">
                    {point}
                  </span>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cross-reference — the service index, names only */}
      <section className="section-tight">
        <div className="container">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <p className="meta">The service index</p>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-accent"
            >
              All services
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
          <Reveal as="ul" stagger className="mt-8 grid gap-x-16 sm:grid-cols-2">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-baseline gap-5 border-t border-border py-4"
                >
                  <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl text-secondary transition-colors group-hover:text-accent">
                    {service.name}
                  </span>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

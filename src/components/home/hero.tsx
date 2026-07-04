import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { services } from "@/lib/services";
import { ArchSchematic } from "@/components/graphics/arch-schematic";

/**
 * Homepage hero — pure typography on paper. A mono meta frame, one huge
 * display-serif statement with a single italic accent, an offset lede, and
 * the numbered service ticker as the hero's baseboard. Ambient depth comes
 * from a faint, slowly drifting blueprint grid and a copper rule that draws
 * itself in on load — no mockups, no illustration.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient blueprint grid — behind content, faded before the ticker */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(120%_80%_at_15%_0%,black,transparent_70%)]"
      >
        <div className="blueprint grid-drift absolute -inset-24 opacity-[0.35]" />
      </div>

      {/* Editorial keystone-arch schematic in the hero's right whitespace */}
      <ArchSchematic className="pointer-events-none absolute right-0 top-16 hidden w-[24rem] text-secondary/55 [mask-image:linear-gradient(to_bottom,black,transparent_92%)] lg:block xl:-right-4 xl:w-[30rem]" />

      <div className="container relative">
        {/* The statement */}
        <div className="pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-24">
          <h1 className="max-w-5xl font-display text-[2.75rem] font-medium leading-[1.04] tracking-[-0.02em] text-secondary animate-fade-in-up sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            Technology, made{" "}
            <em className="font-light italic text-accent">simple.</em>
          </h1>

          <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-8">
            <p
              className="max-w-xl text-lg leading-relaxed text-muted-foreground animate-fade-in-up lg:col-span-6 lg:text-xl"
              style={{ animationDelay: "120ms" }}
            >
              ZaviksTech is the practice behind growing businesses — IT
              support, web and app builds, security, automation and managed
              services, delivered plainly and answered by humans.
            </p>
            <div
              className="flex flex-col items-start gap-5 animate-fade-in-up lg:col-span-5 lg:col-start-8"
              style={{ animationDelay: "220ms" }}
            >
              <Link
                href="/contact"
                className="group inline-flex h-14 items-center gap-3 bg-accent px-8 text-[13px] font-semibold uppercase tracking-button text-accent-foreground transition-colors hover:bg-copper-soft active:translate-y-px"
              >
                Book a free consultation
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <a
                href="#service-index"
                className="group inline-flex items-center gap-2.5 text-sm font-medium text-secondary transition-colors hover:text-accent"
              >
                <ArrowDown
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
                Browse the service index
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service ticker — the hero's baseboard, an infinite marquee */}
      <div
        className="relative overflow-hidden border-y border-border bg-card [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        role="region"
        aria-label="Our services"
      >
        <div className="flex w-max animate-marquee py-4 hover:[animation-play-state:paused]">
          {[0, 1].map((setIndex) => (
            <ul
              key={setIndex}
              aria-hidden={setIndex === 1 ? "true" : undefined}
              className="flex shrink-0 items-baseline divide-x divide-border"
            >
              {services.map((service, index) => (
                <li key={`${setIndex}-${service.slug}`} className="shrink-0">
                  <Link
                    href={`/services/${service.slug}`}
                    tabIndex={setIndex === 1 ? -1 : undefined}
                    className="group inline-flex items-baseline gap-2 px-6"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground/70 transition-colors group-hover:text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="meta whitespace-nowrap normal-case tracking-normal text-foreground/80 transition-colors group-hover:text-accent">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

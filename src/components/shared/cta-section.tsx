import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { siteConfig, telLink } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";

interface CtaSectionProps {
  headline?: string;
  description?: string;
  buttonLabel?: string;
}

/**
 * Closing strip — the page's last word before the footer. A hairline-framed
 * typographic band: serif invitation left, one copper action and the phone
 * line right. Deliberately quieter than the footer's pine invitation so the
 * two never compete.
 */
export function CtaSection({
  headline = "Ready when you are.",
  description = "Book a free, no-obligation consultation. Tell us your goals and we'll show you a practical way to get there.",
  buttonLabel = "Book a free consultation",
}: CtaSectionProps) {
  return (
    <section className="border-t border-border">
      <Reveal
        stagger
        className="container grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20 lg:py-24"
      >
        <div>
          <p className="meta text-accent">Next step</p>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-[-0.015em] sm:text-5xl">
            {headline}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex flex-col items-start gap-6">
          <Link
            href="/contact"
            className="group inline-flex h-14 items-center gap-3 bg-accent px-8 text-[13px] font-semibold uppercase tracking-button text-accent-foreground transition-colors hover:bg-copper-soft active:translate-y-px"
          >
            {buttonLabel}
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <div>
            <p className="meta">Or call directly</p>
            <a
              href={telLink()}
              className="mt-1 inline-block font-display text-2xl text-secondary transition-colors hover:text-accent"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

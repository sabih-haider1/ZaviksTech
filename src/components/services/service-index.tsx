import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import type { Service } from "@/types";

interface ServiceIndexProps {
  services: Service[];
  /** Ledger numbering starts here (1-based). */
  startAt?: number;
  className?: string;
}

/**
 * The signature component of the design language: the service index.
 * Each service is a ledger row — a framed service icon, mono number, serif
 * name, summary and arrow — separated by hairlines. A copper tick grows in
 * the left gutter on hover (kept clear of the content so it never overlaps
 * the number). Rows stagger into view as the list scrolls up.
 */
export function ServiceIndex({
  services,
  startAt = 1,
  className,
}: ServiceIndexProps) {
  return (
    <Reveal
      as="ul"
      stagger
      className={cn("border-b border-border", className)}
    >
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-4 border-t border-border py-6 transition-colors hover:bg-card sm:gap-x-6 sm:py-7"
            >
              {/* Copper hover tick — lives in the gutter, left of all content */}
              <span
                aria-hidden="true"
                className="absolute -left-3 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100 sm:-left-5 lg:-left-6"
              />

              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center border border-border text-secondary transition-colors duration-300 group-hover:border-accent group-hover:text-accent sm:h-14 sm:w-14"
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
              </span>

              <div className="min-w-0">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-accent">
                    {String(index + startAt).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-medium tracking-[-0.015em] text-secondary transition-colors group-hover:text-accent sm:text-3xl">
                    {service.name}
                  </h3>
                </div>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {service.summary}
                </p>
              </div>

              <ArrowRight
                className="h-5 w-5 shrink-0 self-center text-muted-foreground/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                aria-hidden="true"
              />
            </Link>
          </li>
        );
      })}
    </Reveal>
  );
}

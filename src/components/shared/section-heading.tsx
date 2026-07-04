import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Heading level for correct document outline. */
  as?: "h1" | "h2";
}

/**
 * Editorial section intro: mono kicker over a hairline, display-serif
 * title, optional lede. Left-aligned by default — the ledger reads from
 * the margin, not the middle.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "meta flex items-center gap-4 text-accent",
            align === "center" && "justify-center",
          )}
        >
          {align === "left" && (
            <span aria-hidden="true" className="h-px w-10 bg-accent" />
          )}
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "text-balance font-display text-3xl font-medium tracking-[-0.015em] sm:text-4xl lg:text-5xl",
          eyebrow && "mt-5",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

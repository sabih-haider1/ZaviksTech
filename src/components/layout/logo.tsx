import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

interface LogoMarkProps {
  className?: string;
  /** Render on a dark surface: swaps to the paper-tone mark */
  inverted?: boolean;
}

export function LogoMark({ className, inverted = false }: LogoMarkProps) {
  return (
    <Image
      src={inverted ? "/logo/logo-dark.png" : "/logo/logo-light.png"}
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      priority
      className={cn("object-contain", className)}
    />
  );
}

interface LogoProps {
  className?: string;
  /** Render on a dark background (footer) */
  inverted?: boolean;
  /** Hide the wordmark and show only the mark */
  showName?: boolean;
  /** Size classes for the mark, e.g. "h-7 w-7" */
  markClassName?: string;
}

/** Primary horizontal lockup: mark + single-color wordmark. */
export function Logo({
  className,
  inverted = false,
  showName = true,
  markClassName = "h-7 w-7",
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5",
        inverted ? "text-primary-foreground" : "text-secondary",
        className,
      )}
      aria-label={`${siteConfig.name} — home`}
    >
      <LogoMark inverted={inverted} className={markClassName} />
      {showName && (
        <span className="font-display text-xl font-semibold tracking-tight">
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}

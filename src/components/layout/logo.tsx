import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/*
 * ZaviksTech brand mark — a single character: Z.
 *
 * A confident geometric Z on a 32pt grid: two horizontal bars joined by a
 * diagonal band whose perpendicular weight is optically matched to the bars.
 * The bars follow currentColor so the mark sits on paper or on a pine plate;
 * the diagonal — the forward slash of the Z — is picked out in the palette's
 * single signal colour, copper. The two-tone letterform still reads at
 * favicon size.
 *
 * Brand colours are fixed hex, not theme tokens: the logo must not re-theme
 * with the UI. On dark surfaces the diagonal steps up one tone to keep
 * contrast against the pine plate.
 */
const DIAGONAL_ON_LIGHT = "#C3571D";
const DIAGONAL_ON_DARK = "#DF733A";

interface LogoMarkProps {
  className?: string;
  /** Render on a dark surface: lifts the diagonal one tone */
  inverted?: boolean;
  /** Single-color silhouette (currentColor) for constrained contexts */
  oneColor?: boolean;
}

export function LogoMark({
  className,
  inverted = false,
  oneColor = false,
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Full Z silhouette — also the one-color fallback mark */}
      <path d="M4 4h24v7L15 21h13v7H4v-7L17 11H4z" fill="currentColor" />
      {!oneColor && (
        <path
          d="M17 11h11L15 21H4z"
          fill={inverted ? DIAGONAL_ON_DARK : DIAGONAL_ON_LIGHT}
        />
      )}
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** Render on a dark background (footer) */
  inverted?: boolean;
  /** Hide the wordmark and show only the mark */
  showName?: boolean;
}

/** Primary horizontal lockup: mark + single-color wordmark. */
export function Logo({ className, inverted = false, showName = true }: LogoProps) {
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
      <LogoMark inverted={inverted} className="h-7 w-7" />
      {showName && (
        <span className="font-display text-xl font-semibold tracking-tight">
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}

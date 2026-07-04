import { cn } from "@/lib/utils";

/**
 * Custom editorial artwork — an abstract systems/automation figure: nodes on
 * a technical field, wired by orthogonal paths, with one copper route lit to
 * suggest flow. Line art in currentColor (ink on paper, paper on pine) with a
 * single copper signal. Drawn, not stock.
 */
export function NodeField({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      aria-hidden="true"
      className={cn("h-auto w-full", className)}
    >
      {/* faint baseline grid */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.14">
        <path d="M0 55H320M0 110H320M0 165H320" />
        <path d="M60 0V220M140 0V220M220 0V220M300 0V220" />
      </g>

      {/* inert wiring */}
      <g stroke="currentColor" strokeWidth="1.25" opacity="0.6">
        <path d="M60 55H140V110" />
        <path d="M220 55H300" />
        <path d="M140 165H220V110" />
        <path d="M60 165H140" />
      </g>

      {/* lit copper route */}
      <path
        d="M60 110H140V55H220V110H300"
        stroke="hsl(var(--accent))"
        strokeWidth="1.75"
      />

      {/* inert nodes */}
      <g
        fill="hsl(var(--background))"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.75"
      >
        <rect x="54" y="49" width="12" height="12" />
        <rect x="214" y="49" width="12" height="12" />
        <rect x="134" y="159" width="12" height="12" />
        <rect x="54" y="159" width="12" height="12" />
      </g>

      {/* lit copper nodes */}
      <g fill="hsl(var(--accent))">
        <rect x="54" y="104" width="12" height="12" />
        <rect x="134" y="49" width="12" height="12" />
        <rect x="214" y="104" width="12" height="12" />
        <rect x="294" y="104" width="12" height="12" />
      </g>
    </svg>
  );
}

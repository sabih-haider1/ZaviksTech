import { cn } from "@/lib/utils";

/**
 * Custom editorial artwork — a blueprint of a masonry arch with the keystone
 * (the brand's namesake) picked out in copper. Line art in currentColor so it
 * inherits ink on paper or paper on a pine plate; the keystone and plumb line
 * are the single copper signal. Not stock, not AI illustration — a drawn
 * technical figure that reinforces the practice's identity.
 */
export function ArchSchematic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      aria-hidden="true"
      className={cn("h-auto w-full", className)}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        opacity="0.85"
      >
        {/* ground + springing lines */}
        <path d="M30 275H390" opacity="0.4" />
        <path d="M30 250H390" />
        {/* piers */}
        <path d="M50 250V275M98 250V275M322 250V275M370 250V275" opacity="0.6" />
        {/* extrados + intrados arcs */}
        <path d="M50 250A160 160 0 0 1 370 250" />
        <path d="M98 250A112 112 0 0 1 322 250" />
        {/* voussoir joints */}
        <path
          d="M119.4 184.1L80.6 155.9M175.4 143.5L160.6 97.8M244.6 143.5L259.4 97.8M300.6 184.1L339.4 155.9"
          opacity="0.75"
        />
      </g>

      {/* the keystone — copper */}
      <path
        d="M160.6 97.8H259.4L244.6 143.5H175.4Z"
        fill="hsl(var(--accent) / 0.12)"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
      />

      {/* plumb / load line */}
      <path
        d="M210 84V283"
        stroke="hsl(var(--accent))"
        strokeWidth="1"
        strokeDasharray="2 5"
        opacity="0.75"
      />
      <circle cx="210" cy="90" r="2.75" fill="hsl(var(--accent))" />

      {/* dimension ticks */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.4">
        <path d="M50 288H370" />
        <path d="M50 284V292M370 284V292M210 284V292" />
      </g>
    </svg>
  );
}

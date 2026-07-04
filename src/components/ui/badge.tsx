import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* Badges are quiet mono tags — square, hairline-framed, never pill-shaped. */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-meta transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-primary/25 bg-primary/5 text-primary",
        secondary: "border-secondary/25 bg-secondary/5 text-secondary",
        accent: "border-accent/30 bg-accent/5 text-accent",
        success: "border-success/30 bg-success/5 text-success",
        warning: "border-amber-600/30 bg-amber-600/5 text-amber-700",
        muted: "border-transparent bg-muted text-muted-foreground",
        outline: "border-border text-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Button language: rectangular, letterspaced uppercase labels, no soft
 * shadows. Primary = pine, accent = copper (conversion moments only),
 * outline = 1px ink frame. Color is the hover response — nothing moves.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-sm text-[13px] font-semibold uppercase tracking-button ring-offset-background transition-[color,background-color,border-color,transform] duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-pine-soft",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/85",
        accent: "bg-accent text-accent-foreground hover:bg-copper-soft",
        outline:
          "border border-secondary/30 bg-transparent text-secondary hover:border-secondary hover:bg-secondary/5",
        ghost: "text-secondary hover:bg-muted hover:text-secondary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "normal-case tracking-normal text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-5",
        default: "h-12 px-7",
        lg: "h-14 px-9",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

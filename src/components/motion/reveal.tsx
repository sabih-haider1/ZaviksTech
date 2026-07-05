"use client";

import { createElement, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  /** Element to render (div, section, ul, ol, …). */
  as?: React.ElementType;
  /** Stagger direct children instead of revealing the block as one. */
  stagger?: boolean;
  /** Reveal only once (default) or every time it re-enters the viewport. */
  once?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">;

/**
 * Scroll-reveal wrapper. Progressive enhancement by design: the server
 * renders plain, visible markup. A tiny inline script adds `.js` to <html>,
 * and only then does CSS arm the hidden state — so no-JS users and crawlers
 * always see content, and `prefers-reduced-motion` shows everything instantly
 * (see globals.css). One IntersectionObserver per instance; transforms only.
 */
export function Reveal({
  as = "div",
  stagger = false,
  once = true,
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      setShown(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return createElement(
    as,
    {
      ref,
      className: cn(
        stagger ? "reveal-stagger" : "reveal",
        shown && "is-visible",
        className,
      ),
      ...rest,
    },
    children,
  );
}

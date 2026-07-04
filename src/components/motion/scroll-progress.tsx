"use client";

import * as React from "react";

/**
 * A hairline copper reading-progress bar pinned to the top edge. rAF-throttled
 * scroll handler, GPU-friendly scaleX transform — no layout work per frame.
 * It's an orientation cue, not decoration, so it stays under reduced-motion.
 */
export function ScrollProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent/85 transition-transform duration-150 ease-out"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}

"use client";

/**
 * Soft page transition. A template re-mounts on every navigation, so the
 * fade replays as visitors move between pages. Opacity only; reduced-motion
 * neutralises the duration globally.
 */
export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-fade-in">{children}</div>;
}

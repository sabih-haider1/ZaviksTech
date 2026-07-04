"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { navLinks, siteConfig, telLink, whatsappLink } from "@/lib/site";
import { Logo } from "@/components/layout/logo";

/**
 * Two-tier navigation.
 *
 * A hairline utility bar (the ledger's mono voice: practice line + direct
 * contact) scrolls away; the main bar stays sticky on paper with a blur.
 * Mobile navigation is a full-screen paper overlay with numbered serif
 * links and a contact block — not a dropdown.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the overlay menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Utility bar — scrolls away with the page. */}
      <div className="hidden border-b border-border lg:block">
        <div className="container flex h-9 items-center justify-between">
          <p className="meta">
            Independent IT &amp; digital practice — remote-first, UK based
          </p>
          <div className="flex items-center gap-8">
            <a
              href={telLink()}
              className="meta transition-colors hover:text-accent"
            >
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="meta transition-colors hover:text-accent"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-[background-color,border-color,box-shadow] duration-300",
          scrolled
            ? "border-border bg-background/90 shadow-[0_8px_30px_-24px_rgba(0,0,0,0.35)] backdrop-blur supports-[backdrop-filter]:bg-background/80"
            : "border-transparent bg-background",
        )}
      >
        <div
          className={cn(
            "container flex items-center justify-between gap-4 transition-[height] duration-300",
            scrolled ? "h-14 lg:h-16" : "h-16 lg:h-[4.5rem]",
          )}
        >
          <Logo showName={false} markClassName="h-12 w-12 lg:h-14 lg:w-14" />

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-accent"
                    : "link-underline text-secondary/80 hover:text-secondary",
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-4 -bottom-px h-px bg-accent"
                  />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-6 inline-flex h-10 items-center gap-2 border border-secondary/30 px-5 text-[13px] font-semibold uppercase tracking-button text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-secondary lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu — numbered serif index. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
        >
          <div className="container flex h-16 shrink-0 items-center justify-between">
            <Logo markClassName="h-11 w-11" />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center text-secondary"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container flex-1 overflow-y-auto pt-6"
          >
            <ul>
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className="animate-fade-in-up border-t border-border"
                  style={{ animationDelay: `${index * 60 + 60}ms` }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className="group flex items-baseline gap-5 py-5"
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={cn(
                        "font-mono text-xs",
                        isActive(link.href)
                          ? "text-accent"
                          : "text-muted-foreground",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-3xl font-medium tracking-[-0.015em]",
                        isActive(link.href) ? "text-accent" : "text-secondary",
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="container shrink-0 border-t border-border py-6">
            <div className="flex flex-col gap-2">
              <a href={telLink()} className="meta py-1">
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="meta py-1">
                {siteConfig.email}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="meta py-1"
              >
                WhatsApp
              </a>
            </div>
            <Link
              href="/contact"
              className="mt-5 flex h-12 items-center justify-center bg-accent text-[13px] font-semibold uppercase tracking-button text-accent-foreground"
              onClick={() => setOpen(false)}
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

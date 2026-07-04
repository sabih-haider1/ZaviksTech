"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

import { whatsappLink } from "@/lib/site";

/**
 * Persistent lead-gen actions on every marketing page:
 *  - WhatsApp click-to-chat (always visible; keeps the recognisable green)
 *  - Desktop fixed consultation action, restyled to the ledger language
 *  - Mobile fixed bottom consultation bar
 * Hidden on the contact page where the form is already the focus.
 */
export function FloatingActions() {
  const pathname = usePathname();
  const onContactPage = pathname === "/contact";

  return (
    <>
      {/* Floating WhatsApp — bottom-left so it never overlaps the CTA. */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 max-lg:bottom-20"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </a>

      {/* Desktop fixed consultation action. */}
      {!onContactPage && (
        <Link
          href="/contact"
          className="fixed bottom-6 right-6 z-40 hidden h-12 items-center gap-2 bg-accent px-6 text-[13px] font-semibold uppercase tracking-button text-accent-foreground shadow-lg transition-colors hover:bg-copper-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:inline-flex"
        >
          Free consultation
        </Link>
      )}

      {/* Mobile fixed bottom CTA bar. */}
      {!onContactPage && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
          <Link
            href="/contact"
            className="flex h-12 items-center justify-center gap-2 bg-accent text-[13px] font-semibold uppercase tracking-button text-accent-foreground"
          >
            Get a free consultation
          </Link>
        </div>
      )}
    </>
  );
}

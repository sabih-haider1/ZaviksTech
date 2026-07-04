"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";

const STORAGE_KEY = "zaviks_lead_popup_seen_at";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const TIME_TRIGGER_MS = 8000;
const SCROLL_TRIGGER_RATIO = 0.5;

function recentlyShown(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const last = Number(raw);
    if (Number.isNaN(last)) return false;
    return Date.now() - last < SEVEN_DAYS_MS;
  } catch {
    return false;
  }
}

function markShown() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* ignore storage failures (private mode etc.) */
  }
}

/**
 * Highest-priority lead capture. Opens after 8 seconds OR when the visitor
 * scrolls past 50% of the page — whichever comes first — and at most once
 * every seven days.
 */
export function LeadPopup() {
  const [open, setOpen] = React.useState(false);
  const triggered = React.useRef(false);

  React.useEffect(() => {
    if (recentlyShown()) return;

    const trigger = () => {
      if (triggered.current) return;
      triggered.current = true;
      markShown();
      setOpen(true);
      cleanup();
    };

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const ratio = scrolled / document.documentElement.scrollHeight;
      if (ratio >= SCROLL_TRIGGER_RATIO) trigger();
    };

    const timer = window.setTimeout(trigger, TIME_TRIGGER_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }

    return cleanup;
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <span className="meta text-accent">Free consultation</span>
          <DialogTitle>Let&apos;s grow your business</DialogTitle>
          <DialogDescription>
            Tell us what you need and we&apos;ll get back to you with a free,
            no-obligation consultation.
          </DialogDescription>
        </DialogHeader>
        <LeadForm
          source="HOMEPAGE_POPUP"
          variant="compact"
          onSuccess={() => setOpen(false)}
          submitLabel="Get Free Consultation"
        />
      </DialogContent>
    </Dialog>
  );
}

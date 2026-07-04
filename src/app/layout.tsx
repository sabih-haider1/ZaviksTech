import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";
import { siteConfig } from "@/lib/site";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Toaster } from "@/components/ui/toaster";

/*
 * Type system — the hero of the design language.
 * Fraunces: display serif for headlines and large numerals.
 * Hanken Grotesk: warm humanist sans for body and UI.
 * IBM Plex Mono: the "ledger" meta voice — labels, indexes, breadcrumbs.
 */
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata(),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { telephone: true, email: true, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f8f6f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background font-sans" suppressHydrationWarning>
        {/* Arm the motion system before paint. No-JS visitors keep visible
            content; only with JS does CSS take over the reveal states. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <JsonLd data={organizationJsonLd()} />
        <a
          href="#main-content"
          className="sr-only rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to main content
        </a>
        {children}
        <div aria-hidden="true" className="grain" />
        <Toaster />
      </body>
    </html>
  );
}

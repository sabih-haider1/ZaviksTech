import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} - ${siteConfig.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * OG card in the "Practice Ledger" language: paper field, ink type,
 * a copper rule as the single signal, pine footer strip. Rendered with
 * the bundled default font — the composition, not the typeface, carries
 * the brand at social-card sizes.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#F8F6F2",
        color: "#211B18",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "48px 64px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: -0.5,
          }}
        >
          <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
            <path d="M4 4h24v7L15 21h13v7H4v-7L17 11H4z" fill="#211B18" />
            <path d="M17 11h11L15 21H4z" fill="#C3571D" />
          </svg>
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 20,
            letterSpacing: 4,
            color: "#6B625B",
            textTransform: "uppercase",
          }}
        >
          IT &amp; Digital Practice
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0 64px",
        }}
      >
        <div
          style={{
            width: 96,
            height: 6,
            background: "#C3571D",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontSize: 68,
            lineHeight: 1.08,
            letterSpacing: -2,
            fontWeight: 700,
            maxWidth: 900,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            lineHeight: 1.4,
            color: "#6B625B",
            maxWidth: 760,
          }}
        >
          Support, builds, security and automation — delivered plainly,
          answered by humans.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#192E2A",
          color: "#F8F6F2",
          padding: "28px 64px",
          fontSize: 22,
        }}
      >
        <span>{siteConfig.email}</span>
        <span style={{ color: "#DF733A" }}>{siteConfig.phone}</span>
      </div>
    </div>,
    size,
  );
}

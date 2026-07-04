import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon: the single-character Z on a square pine tile — iOS
 * applies its own corner mask, so no pre-rounded corners. Paper bars with
 * the copper diagonal.
 */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#192E2A",
      }}
    >
      <svg width="112" height="112" viewBox="0 0 32 32" fill="none">
        <path d="M4 4h24v7L15 21h13v7H4v-7L17 11H4z" fill="#F8F6F2" />
        <path d="M17 11h11L15 21H4z" fill="#DF733A" />
      </svg>
    </div>,
    size,
  );
}

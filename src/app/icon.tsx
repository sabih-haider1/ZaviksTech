import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon: the single-character Z on the pine tile. Paper bars with the
 * copper diagonal — the two-tone letterform still reads at 16px. Tile radius
 * is 22% per platform icon norms; the mark fills 20/32 of the tile.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#192E2A",
        borderRadius: 7,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <path d="M4 4h24v7L15 21h13v7H4v-7L17 11H4z" fill="#F8F6F2" />
        <path d="M17 11h11L15 21H4z" fill="#DF733A" />
      </svg>
    </div>,
    size,
  );
}

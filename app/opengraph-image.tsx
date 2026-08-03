import { ImageResponse } from "next/og";

/**
 * Generated at build time — no binary asset to keep in sync with the brand.
 * Fixes bare grey cards when the URL is shared in Slack / LinkedIn / iMessage.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Acta Data — Your entire data function. Built, handed over, done.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0A1828 0%, #14243D 55%, #1B1440 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#A855F7",
            fontWeight: 700,
          }}
        >
          Acta Data
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 68,
            lineHeight: 1.08,
            fontWeight: 800,
            color: "#F2F4F8",
            letterSpacing: -2,
          }}
        >
          <span>Your entire data function.</span>
          <span style={{ color: "#A855F7" }}>Built, handed over, done.</span>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "rgba(242,244,248,0.7)" }}>
          Data &amp; AI consultancy for consumer businesses
        </div>
      </div>
    ),
    size
  );
}

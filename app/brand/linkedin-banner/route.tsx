import { ImageResponse } from "next/og";
import { ogFonts } from "@/components/og-card";

/**
 * The LinkedIn company banner, at LinkedIn's 1128×191.
 *
 * A route rather than a checked-in PNG so it stays on-brand automatically: change
 * the palette or the strapline and re-download. Not linked from anywhere and not
 * in the sitemap — it exists to be fetched once and uploaded.
 *
 * LinkedIn overlays the company logo across the bottom-left of this banner on
 * desktop and crops the edges on mobile, so the left ~300px is deliberately empty
 * and nothing important goes within 28px of any edge.
 */
export const dynamic = "force-static";

const NAVY = "#060B14";
const ELECTRIC = "#A855F7";
const INK = "#F2F4F8";
const BANDS = ["#4F46E5", "#A855F7", "#E835D8"];

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: NAVY,
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -150,
            left: 180,
            width: 620,
            height: 380,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(124,58,237,0.45) 0%, rgba(6,11,20,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            right: -60,
            width: 520,
            height: 380,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(232,53,216,0.26) 0%, rgba(6,11,20,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            width: "100%",
            height: 4,
            background: `linear-gradient(90deg, ${BANDS[0]} 0%, ${BANDS[1]} 50%, ${BANDS[2]} 100%)`,
          }}
        />

        {/* Logo safe zone — LinkedIn puts the company logo here. */}
        <div style={{ display: "flex", width: 300 }} />

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            gap: 40,
            padding: "28px 32px 28px 0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Archivo Black",
                fontSize: 40,
                letterSpacing: -1.2,
                color: INK,
              }}
            >
              The data layer <span style={{ color: ELECTRIC, marginLeft: 12 }}>AI needs.</span>
            </div>
            <div style={{ display: "flex", fontSize: 18, color: "rgba(242,244,248,0.72)" }}>
              Timely data, one source, agents that act — all on Google.
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              {["BigQuery", "shadcn", "Claude"].map(chip => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    padding: "4px 12px",
                    borderRadius: 8,
                    fontSize: 14,
                    border: "1px solid rgba(242,244,248,0.14)",
                    background: "rgba(242,244,248,0.04)",
                    color: "rgba(242,244,248,0.8)",
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
            {/* The distillation motif, scaled to the strip */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {BANDS.map((colour, band) => (
                  <div key={colour} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {Array.from({ length: 3 }).map((_, row) => (
                      <div key={row} style={{ display: "flex", gap: 3 }}>
                        {Array.from({ length: 7 }).map((_, col) => (
                          <div
                            key={col}
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: 2,
                              background: colour,
                              opacity: Math.max(
                                0.1,
                                0.85 - col * 0.11 - ((row + band) % 3) * 0.06
                              ),
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  width: 10,
                  height: 100,
                  borderRadius: 5,
                  background: `linear-gradient(180deg, ${ELECTRIC} 0%, #7C3AED 100%)`,
                  boxShadow: `0 0 26px ${ELECTRIC}`,
                }}
              />
            </div>
            <div style={{ display: "flex", fontSize: 15, color: "rgba(242,244,248,0.6)" }}>
              actadata.co.uk
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1128, height: 191, fonts: ogFonts() }
  );
}

import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { ogFonts } from "@/components/og-card";

/**
 * The LinkedIn company banner.
 *
 * Sized 2256×752 (3:1) rather than to LinkedIn's 1128×191 strip, on purpose.
 * LinkedIn's cover editor opens on a taller canvas than the strip it eventually
 * displays, and it rejected a file sized exactly to the minimum — so this one
 * carries a lot of deliberate background bleed above and below the content, and
 * the content itself is confined to a centred band roughly the shape of the final
 * strip. That means the image can be dragged and zoomed anywhere in the editor and
 * still land on the message, instead of clipping it at the edges.
 *
 * SAFE BAND: everything that matters lives inside the centre 2256×382 and inside
 * 140px of either side. Nothing goes near an edge, because every edge is a
 * candidate for cropping.
 *
 * The wordmark is left of centre rather than hard left: LinkedIn overlays the
 * company avatar across the bottom-left of the displayed strip, and hard-left
 * content is the first thing to disappear on a mobile crop.
 *
 * The logo is handed to satori as a data URI — satori only partially supports
 * inline <svg> children but rasterises an <img> src reliably.
 */
export const dynamic = "force-static";

/** Author at 1x, emit at S. */
const S = 2;
const px = (n: number) => n * S;

const NAVY = "#060B14";
const ELECTRIC = "#A855F7";
const INK = "#F2F4F8";
const BANDS = ["#4F46E5", "#A855F7", "#E835D8"];

export function GET() {
  /* public/logo.svg with its fill opacity lifted to full white for this asset.
     50% white is right in the site header, where the mark deliberately sits back
     from the headline; scaled down inside LinkedIn's chrome it reads grey. The
     source file and the site component are untouched. */
  const logo = readFileSync(join(process.cwd(), "public/logo.svg"), "utf8").replaceAll(
    'fill-opacity="0.5"',
    'fill-opacity="1"'
  );
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: NAVY,
          fontFamily: "Archivo",
        }}
      >
        {/* Full-bleed glows. No top rule any more — a decorative edge is the first
            thing a crop eats, and a half-cropped rule looks like a mistake. */}
        <div
          style={{
            position: "absolute",
            top: px(-180),
            left: px(140),
            width: px(900),
            height: px(700),
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(124,58,237,0.42) 0%, rgba(6,11,20,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: px(-220),
            right: px(-40),
            width: px(820),
            height: px(700),
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(232,53,216,0.24) 0%, rgba(6,11,20,0) 70%)",
          }}
        />

        {/* The safe band: the shape of the final strip, centred in all that bleed. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: px(56),
            width: px(1128),
            height: px(191),
            padding: `0 ${px(70)}px`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="Acta Data" width={px(132)} height={px(74)} />

          <div style={{ display: "flex", flexDirection: "column", gap: px(9) }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Archivo Black",
                fontSize: px(38),
                letterSpacing: -1.1 * S,
                color: INK,
              }}
            >
              The data layer
              <span style={{ color: ELECTRIC, marginLeft: px(11) }}>AI needs.</span>
            </div>
            <div style={{ display: "flex", fontSize: px(17), color: "rgba(242,244,248,0.72)" }}>
              Timely data, one source, agents that act — all on Google.
            </div>
            <div style={{ display: "flex", gap: px(7), marginTop: px(3) }}>
              {["BigQuery", "shadcn", "Claude", "actadata.co.uk"].map((chip, i) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    padding: `${px(4)}px ${px(11)}px`,
                    borderRadius: px(8),
                    fontSize: px(13),
                    border:
                      i === 3
                        ? "1px solid rgba(168,85,247,0.4)"
                        : "1px solid rgba(242,244,248,0.14)",
                    background: i === 3 ? "rgba(168,85,247,0.12)" : "rgba(242,244,248,0.04)",
                    color: i === 3 ? ELECTRIC : "rgba(242,244,248,0.8)",
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>

          {/* Distillation motif, tucked inside the safe band rather than pinned to
              the right edge where a crop would take it. */}
          <div style={{ display: "flex", alignItems: "center", gap: px(9) }}>
            <div style={{ display: "flex", flexDirection: "column", gap: px(6) }}>
              {BANDS.map((colour, band) => (
                <div key={colour} style={{ display: "flex", flexDirection: "column", gap: px(3) }}>
                  {Array.from({ length: 3 }).map((_, row) => (
                    <div key={row} style={{ display: "flex", gap: px(3) }}>
                      {Array.from({ length: 6 }).map((_, col) => (
                        <div
                          key={col}
                          style={{
                            width: px(8),
                            height: px(8),
                            borderRadius: px(2),
                            background: colour,
                            opacity: Math.max(0.1, 0.85 - col * 0.12 - ((row + band) % 3) * 0.06),
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
                width: px(9),
                height: px(96),
                borderRadius: px(5),
                background: `linear-gradient(180deg, ${ELECTRIC} 0%, #7C3AED 100%)`,
                boxShadow: `0 0 ${px(24)}px ${ELECTRIC}`,
              }}
            />
          </div>
        </div>
      </div>
    ),
    { width: px(1128), height: px(376), fonts: ogFonts() }
  );
}

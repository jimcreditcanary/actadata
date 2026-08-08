import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { ogFonts } from "@/components/og-card";

/**
 * The LinkedIn company banner, at LinkedIn's 1128×191.
 *
 * Rendered at 2x (2256x382) rather than at LinkedIn's stated 1128x191 minimum.
 * At exactly the minimum, any crop LinkedIn applies in its editor takes the result
 * BELOW the minimum and the upload fails outright with "Cover image upload failed"
 * — the black bars in that dialog are just its canvas, not a ratio mismatch. 2x
 * gives the crop tool headroom and looks sharp on a retina screen.
 *
 * Every dimension below is multiplied by S, so the design is authored once at 1x
 * and the output size is one constant.
 *
 * A route rather than a checked-in PNG so it stays on-brand automatically: change
 * the palette or the strapline and re-download. Not linked from anywhere and not
 * in the sitemap — it exists to be fetched once and uploaded.
 *
 * The wordmark sits TOP-left rather than centred in that column, because LinkedIn
 * overlays the company logo across the BOTTOM-left of the banner on desktop — so
 * the two would sit on top of each other anywhere lower. Below the fold of that
 * overlay is dead space by design; nothing important goes within 28px of any edge
 * either, since LinkedIn crops on mobile.
 *
 * The logo is passed to satori as a data URI. Satori only partially supports
 * inline <svg> children, but rasterises an <img> src reliably.
 */
export const dynamic = "force-static";

/** Output scale. 1 = LinkedIn's 1128x191 minimum, 2 = 2256x382. */
const S = 2;
const px = (n: number) => n * S;

const NAVY = "#060B14";
const ELECTRIC = "#A855F7";
const INK = "#F2F4F8";
const BANDS = ["#4F46E5", "#A855F7", "#E835D8"];

export function GET() {
  /* public/logo.svg, with its fill opacity lifted for this asset only.
     The source mark is 50% white, which is right in the site header — a
     deliberate step back from the headline. On a banner that gets scaled down
     inside LinkedIn's chrome it just reads grey and unfinished, so the wordmark
     goes to full white here. Nothing else about the file changes, and the site
     component is untouched. */
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
          position: "relative",
          background: NAVY,
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: px(-150),
            left: px(180),
            width: px(620),
            height: px(380),
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(124,58,237,0.45) 0%, rgba(6,11,20,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: px(-160),
            right: px(-60),
            width: px(520),
            height: px(380),
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
            height: px(4),
            background: `linear-gradient(90deg, ${BANDS[0]} 0%, ${BANDS[1]} 50%, ${BANDS[2]} 100%)`,
          }}
        />

        {/* Wordmark top-left; the space beneath it is where LinkedIn drops the
            company logo, so it stays clear. */}
        <div style={{ display: "flex", width: px(300), padding: `${px(26)}px 0 0 ${px(40)}px` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="Acta Data" width={px(118)} height={px(66)} />
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            gap: px(40),
            padding: `${px(28)}px ${px(32)}px ${px(28)}px 0`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: px(10) }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Archivo Black",
                fontSize: px(40),
                letterSpacing: -1.2 * S,
                color: INK,
              }}
            >
              The data layer <span style={{ color: ELECTRIC, marginLeft: px(12) }}>AI needs.</span>
            </div>
            <div style={{ display: "flex", fontSize: px(18), color: "rgba(242,244,248,0.72)" }}>
              Timely data, one source, agents that act — all on Google.
            </div>
            <div style={{ display: "flex", gap: px(8), marginTop: px(4) }}>
              {["BigQuery", "shadcn", "Claude"].map(chip => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    padding: `${px(4)}px ${px(12)}px`,
                    borderRadius: px(8),
                    fontSize: px(14),
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

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: px(14) }}>
            {/* The distillation motif, scaled to the strip */}
            <div style={{ display: "flex", alignItems: "center", gap: px(10) }}>
              <div style={{ display: "flex", flexDirection: "column", gap: px(6) }}>
                {BANDS.map((colour, band) => (
                  <div key={colour} style={{ display: "flex", flexDirection: "column", gap: px(3) }}>
                    {Array.from({ length: 3 }).map((_, row) => (
                      <div key={row} style={{ display: "flex", gap: px(3) }}>
                        {Array.from({ length: 7 }).map((_, col) => (
                          <div
                            key={col}
                            style={{
                              width: px(8),
                              height: px(8),
                              borderRadius: px(2),
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
                  width: px(10),
                  height: px(100),
                  borderRadius: px(5),
                  background: `linear-gradient(180deg, ${ELECTRIC} 0%, #7C3AED 100%)`,
                  boxShadow: `0 0 ${px(26)}px ${ELECTRIC}`,
                }}
              />
            </div>
            <div style={{ display: "flex", fontSize: px(15), color: "rgba(242,244,248,0.6)" }}>
              actadata.co.uk
            </div>
          </div>
        </div>
      </div>
    ),
    { width: px(1128), height: px(191), fonts: ogFonts() }
  );
}

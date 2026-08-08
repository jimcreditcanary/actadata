import { ImageResponse } from "next/og";
import { ogFonts } from "@/components/og-card";

/**
 * The LinkedIn company banner.
 *
 * Stripped back deliberately. Earlier versions carried the wordmark and a row of
 * stack chips, and on the live page that was three competing things at once: the
 * company avatar already shows the wordmark and sits directly on top of the
 * banner, so the banner's own mark was both duplicated and half-covered. One
 * statement reads sharper than four.
 *
 * What is left: the line, the qualifier, the distillation motif. Nothing else.
 *
 * Two pieces of geometry matter:
 *
 * 1. SAFE BAND. The canvas is 2256×752 (3:1) but LinkedIn displays a strip about
 *    a third of that height. Everything lives in a centred band the shape of the
 *    strip, with bleed above and below, so the image can be dragged and zoomed
 *    anywhere in LinkedIn's editor and still land on the message.
 * 2. AVATAR GUTTER. The company avatar covers roughly the left quarter of the
 *    displayed strip. Content starts after it, so nothing important ever sits
 *    behind it.
 */
export const dynamic = "force-static";

/** Author at 1x, emit at S. */
const S = 2;
const px = (n: number) => n * S;

const NAVY = "#060B14";
const ELECTRIC = "#A855F7";
const INK = "#F2F4F8";
const BANDS = ["#4F46E5", "#A855F7", "#E835D8"];

/** Width of the strip the avatar covers, at 1x. Content starts after this. */
const AVATAR_GUTTER = 300;

export function GET() {
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
        <div
          style={{
            position: "absolute",
            top: px(-180),
            left: px(260),
            width: px(900),
            height: px(700),
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(124,58,237,0.40) 0%, rgba(6,11,20,0) 70%)",
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
            background: "radial-gradient(circle, rgba(232,53,216,0.22) 0%, rgba(6,11,20,0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: px(48),
            width: px(1128),
            height: px(191),
            padding: `0 ${px(64)}px 0 ${px(AVATAR_GUTTER)}px`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: px(10) }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Archivo Black",
                fontSize: px(44),
                letterSpacing: -1.4 * S,
                color: INK,
              }}
            >
              The data layer
              <span style={{ color: ELECTRIC, marginLeft: px(13) }}>AI needs.</span>
            </div>
            <div style={{ display: "flex", fontSize: px(19), color: "rgba(242,244,248,0.75)" }}>
              Timely data, one source, agents that act — all on Google.
            </div>
          </div>

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

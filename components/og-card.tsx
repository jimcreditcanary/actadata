import { readFileSync } from "fs";
import { join } from "path";

/**
 * The share-card design, in one place, so the home card and every post card are
 * the same object with different words in it.
 *
 * Rendered by satori (next/og), which is flexbox-only — no grid, no shorthand
 * `background` on some properties, and every element that contains children needs
 * an explicit `display`. Fonts must be loaded or it silently falls back: setting
 * `fontFamily: "sans-serif"` with `fontWeight: 800` is what made the original
 * card render a light system sans and look like a default template.
 */
export const OG_SIZE = { width: 1200, height: 630 };

const NAVY = "#060B14";
const ELECTRIC = "#A855F7";
const INK = "#F2F4F8";

/** The three source bands from the flow diagram on the site. */
const BANDS = ["#4F46E5", "#A855F7", "#E835D8"];

/** Archivo Black for display, Archivo Regular for body — same family, no clash. */
export function ogFonts() {
  const dir = join(process.cwd(), "app/_fonts");
  return [
    {
      name: "Archivo Black",
      data: readFileSync(join(dir, "ArchivoBlack-Regular.ttf")),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Archivo",
      data: readFileSync(join(dir, "Archivo-Regular.ttf")),
      weight: 400 as const,
      style: "normal" as const,
    },
  ];
}

/** Many systems in, one source out — the diagram idea at card scale. */
function GridMotif({ rowsPerBand = 4, cols = 9 }: { rowsPerBand?: number; cols?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {BANDS.map((colour, band) => (
          <div key={colour} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {Array.from({ length: rowsPerBand }).map((_, row) => (
              <div key={row} style={{ display: "flex", gap: 4 }}>
                {Array.from({ length: cols }).map((_, col) => (
                  <div
                    key={col}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                      background: colour,
                      /* Fades toward the layer and staggers by row, so it reads as
                         flow rather than as a gradient rectangle. */
                      opacity: Math.max(0.08, 0.85 - col * 0.09 - ((row + band) % 3) * 0.06),
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
          width: 16,
          height: rowsPerBand * 3 * 16 + 20,
          borderRadius: 8,
          background: `linear-gradient(180deg, ${ELECTRIC} 0%, #7C3AED 100%)`,
          boxShadow: `0 0 40px ${ELECTRIC}`,
        }}
      />
    </div>
  );
}

export function OgCard({
  /** Small label top-left under the wordmark position — e.g. "Insight". */
  kicker,
  /** Headline, split into lines. The last line takes the accent colour. */
  lines,
  sub,
  chips = [],
  /** The last chip is the promise rather than the stack, and gets the accent. */
  accentLastChip = true,
  titleSize = 82,
}: {
  kicker?: string;
  lines: string[];
  sub: string;
  chips?: string[];
  accentLastChip?: boolean;
  titleSize?: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: NAVY,
        fontFamily: "Archivo",
      }}
    >
      {/* Aurora glows, as on the site */}
      <div
        style={{
          position: "absolute",
          top: -260,
          left: -120,
          width: 760,
          height: 620,
          borderRadius: 999,
          background: "radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(6,11,20,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -300,
          right: -140,
          width: 720,
          height: 620,
          borderRadius: 999,
          background: "radial-gradient(circle, rgba(232,53,216,0.28) 0%, rgba(6,11,20,0) 70%)",
        }}
      />
      {/* Top rule, so the card still has an edge on a white background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          width: "100%",
          height: 6,
          background: `linear-gradient(90deg, ${BANDS[0]} 0%, ${BANDS[1]} 50%, ${BANDS[2]} 100%)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "58px 72px 56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Archivo Black",
                fontSize: 27,
                letterSpacing: 7,
                color: INK,
              }}
            >
              ACTA DATA
            </div>
            {kicker && (
              <div
                style={{
                  display: "flex",
                  fontSize: 19,
                  letterSpacing: 3,
                  color: ELECTRIC,
                }}
              >
                {kicker.toUpperCase()}
              </div>
            )}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "rgba(242,244,248,0.55)" }}>
            actadata.co.uk
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            gap: 30,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 56 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Archivo Black",
                fontSize: titleSize,
                lineHeight: 1.04,
                letterSpacing: -2.5,
                color: INK,
              }}
            >
              {lines.map((line, i) => (
                <span key={line} style={i === lines.length - 1 ? { color: ELECTRIC } : undefined}>
                  {line}
                </span>
              ))}
            </div>
            {/* The motif shrinks when the headline needs the room. */}
            <GridMotif rowsPerBand={lines.length > 2 ? 3 : 4} cols={lines.length > 2 ? 6 : 9} />
          </div>

          <div style={{ display: "flex", fontSize: 27, color: "rgba(242,244,248,0.72)" }}>{sub}</div>
        </div>

        {chips.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {chips.map((chip, i) => {
              const accent = accentLastChip && i === chips.length - 1;
              return (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    padding: "9px 18px",
                    borderRadius: 10,
                    fontSize: 20,
                    border: accent
                      ? "1px solid rgba(168,85,247,0.45)"
                      : "1px solid rgba(242,244,248,0.14)",
                    background: accent ? "rgba(168,85,247,0.14)" : "rgba(242,244,248,0.04)",
                    color: accent ? ELECTRIC : "rgba(242,244,248,0.82)",
                  }}
                >
                  {chip}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Splits a headline across lines without breaking a word, so a long post title
 * fills the card instead of overflowing it. Longer titles get more lines and a
 * smaller size, both capped so the card never turns into a paragraph.
 */
export function splitHeadline(title: string, maxLines = 3) {
  const words = title.split(" ");
  const perLine = Math.ceil(words.length / maxLines);
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += perLine) lines.push(words.slice(i, i + perLine).join(" "));
  return lines.slice(0, maxLines);
}

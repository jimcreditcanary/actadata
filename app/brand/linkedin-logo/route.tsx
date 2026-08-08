import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * The square company avatar, 600×600 (2× LinkedIn's recommended 300×300).
 *
 * The avatar currently on the page is the old magenta tile with a "Data made
 * human" strapline, which no longer matches either the site or the new banner —
 * and the avatar sits directly on top of the banner, so a mismatch there is the
 * most visible brand error on the page.
 *
 * No fonts needed: it is the wordmark on the brand navy with a single electric
 * accent. LinkedIn crops avatars to a circle in some placements and shows the
 * square in others, so the mark is well inside a centred circle-safe area and the
 * accent is a corner glow rather than an edge detail.
 */
export const dynamic = "force-static";

const NAVY = "#060B14";
const ELECTRIC = "#A855F7";

export function GET() {
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
        }}
      >
        {/* Corner glow, kept away from the edges so a circular crop keeps it */}
        <div
          style={{
            position: "absolute",
            top: -140,
            left: -100,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(6,11,20,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(232,53,216,0.28) 0%, rgba(6,11,20,0) 70%)",
          }}
        />

        {/* The mark, inside the circle-safe area (about 70% of the square) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="Acta Data" width={380} height={211} />

        {/* One accent: a thin electric bar under the mark, echoing the data layer
            in the diagram and the banner motif. */}
        <div
          style={{
            position: "absolute",
            bottom: 168,
            display: "flex",
            width: 200,
            height: 8,
            borderRadius: 4,
            background: `linear-gradient(90deg, rgba(168,85,247,0) 0%, ${ELECTRIC} 50%, rgba(168,85,247,0) 100%)`,
          }}
        />
      </div>
    ),
    { width: 600, height: 600 }
  );
}

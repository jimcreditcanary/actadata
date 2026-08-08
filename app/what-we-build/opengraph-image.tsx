import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogFonts } from "@/components/og-card";

/**
 * Share card for /what-we-build.
 *
 * The design lives in components/og-card.tsx; this file is only the words.
 */
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Acta Data — a working data function, without building one.";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        kicker="What we build"
        lines={["A working data function.", "Without building one."]}
        titleSize={72}
        sub="The connections, the history, the metric tree, the reporting people open, and the AI layer on top."
        chips={["Six capabilities", "Your own Google environment", "Yours to keep"]}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}

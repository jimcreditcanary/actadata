import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogFonts } from "@/components/og-card";

/**
 * Share card for the /blog index. Individual posts generate their own — see blog/[slug]/opengraph-image.tsx.
 *
 * The design lives in components/og-card.tsx; this file is only the words.
 */
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Acta Data — writing: case studies with the numbers in them, and the arguments behind how we build.";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        kicker="Writing"
        lines={["What we've built,", "and what we think."]}
        sub="Case studies with the numbers in them, and the arguments behind how we build. No gated PDFs."
        chips={["Case studies", "Insight", "No gated PDFs"]}
        accentLastChip={false}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}

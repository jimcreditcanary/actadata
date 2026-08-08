import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogFonts } from "@/components/og-card";

/**
 * Share card for /case-studies — the link a sales email uses.
 *
 * The design lives in components/og-card.tsx; this file is only the words.
 */
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Acta Data case studies — what we built, and what changed.";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        kicker="Case studies"
        lines={["What we built,", "and what changed."]}
        sub="The situation, the work, and the numbers afterwards. References sent matched to your sector."
        chips={["The situation", "The work", "The numbers"]}
        accentLastChip={false}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}

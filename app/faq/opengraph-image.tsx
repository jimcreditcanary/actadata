import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogFonts } from "@/components/og-card";

/**
 * Share card for /faq. The page exists to be the answer rather than the link, and the card should say which questions it answers.
 *
 * The design lives in components/og-card.tsx; this file is only the words.
 */
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Acta Data — what people ask before the first call: cost, timelines, ownership and your data.";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        kicker="Questions"
        lines={["What people ask us", "before the first call."]}
        sub="Cost, timelines, who owns the environment, what happens to personal data, and whether this replaces your team."
        chips={["Cost", "Timelines", "Ownership", "Your data"]}
        accentLastChip={false}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}

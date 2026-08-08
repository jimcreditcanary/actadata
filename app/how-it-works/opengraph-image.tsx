import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogFonts } from "@/components/og-card";

/**
 * Share card for /how-it-works. The chips are the four atomic units, because that is the part of the method that is actually distinctive.
 *
 * The design lives in components/og-card.tsx; this file is only the words.
 */
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Acta Data — clean, model, alert, act. Cost, revenue, conversion and time on every activity.";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        kicker="How it works"
        lines={["Clean. Model.", "Alert. Act."]}
        sub="Every system in, recorded once, and then it works for you — reporting, exceptions, agents."
        chips={["Cost", "Revenue", "Conversion", "Time"]}
        accentLastChip={false}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}

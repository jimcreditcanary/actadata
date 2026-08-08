import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogFonts } from "@/components/og-card";
import {
  discoveryOneOffK,
  entryYearK,
  wholeBusinessYearK,
} from "@/lib/economics";

/**
 * Share card for /pricing. Every figure comes from lib/economics.ts, so the card cannot quote a price the page has stopped charging.
 *
 * The design lives in components/og-card.tsx; this file is only the words.
 */
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Acta Data pricing — £15k for the map, £60k to solve an area, £120k for the whole business.";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        kicker="Pricing"
        lines={[`£${discoveryOneOffK}k for the map.`, `£${entryYearK}k to solve an area.`]}
        titleSize={72}
        sub="Priced by how much of the business is in scope — and the map is credited in full if you go ahead."
        chips={[
          `Discovery £${discoveryOneOffK}k`,
          `One area £${entryYearK}k/yr`,
          `Whole business £${wholeBusinessYearK}k/yr`,
          "Enterprise: on outcome",
        ]}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}

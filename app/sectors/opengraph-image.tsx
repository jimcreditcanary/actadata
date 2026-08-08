import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogFonts } from "@/components/og-card";
import { sectors } from "@/lib/sectors";

/**
 * Share card for the /sectors index. The count comes from lib/sectors.ts so it cannot go stale when a sector is added.
 *
 * The design lives in components/og-card.tsx; this file is only the words.
 */
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Acta Data — we already know your value streams. Eleven sectors, from consumer credit to manufacturing.";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        kicker="Sectors"
        lines={["We already know", "your value streams."]}
        sub={`${sectors.length} sectors where operations are complex enough to need a real data function.`}
        chips={["Consumer credit", "Debt management", "Credit unions", "+ 8 more"]}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}

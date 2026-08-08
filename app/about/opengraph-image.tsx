import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogFonts } from "@/components/og-card";

/**
 * Share card for /about. The four disciplines are the argument: this is an operator's data team, not an agency.
 *
 * The design lives in components/og-card.tsx; this file is only the words.
 */
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Acta Data — operators first, data people second. C-suite experience across marketing, operations, technology and product.";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        kicker="About"
        lines={["Operators first.", "Data people second."]}
        sub="Decades of data and AI experience, from people who have owned the number rather than only reported it."
        chips={["Marketing", "Operations", "Technology", "Product"]}
        accentLastChip={false}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}

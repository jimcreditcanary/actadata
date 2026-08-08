import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogFonts } from "@/components/og-card";

/**
 * The site-wide share card, used for every route that does not generate its own
 * (blog posts do — see app/blog/[slug]/opengraph-image.tsx).
 *
 * Generated at build time, so there is no binary asset to keep in sync with the
 * brand. The design lives in components/og-card.tsx.
 */
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Acta Data — The data layer AI needs. Timely data, one source, agents that act, all on Google.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        lines={["The data layer", "AI needs."]}
        sub="Timely data, one source, agents that act — all on Google."
        chips={["Google BigQuery", "shadcn", "Claude", "Live in weeks"]}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}

import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogFonts, splitHeadline } from "@/components/og-card";
import { sectors, getSector } from "@/lib/sectors";

/**
 * A card per sector, built from lib/sectors.ts — so a campaign landing on
 * /sectors/credit-unions shares as a credit-union card naming the metrics that
 * sector argues about, not as the generic company card.
 *
 * The design lives in components/og-card.tsx; this file is only the words.
 */
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Acta Data — data and AI for your sector.";

export function generateStaticParams() {
  return sectors.map(s => ({ slug: s.slug }));
}

export default async function SectorOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = getSector(slug);

  if (!sector) {
    return new ImageResponse(
      (
        <OgCard
          lines={["The data layer", "AI needs."]}
          sub="Timely data, one source, agents that act — all on Google."
        />
      ),
      { ...size, fonts: ogFonts() }
    );
  }

  /* Sector labels are short, so they get the big size; only the long ones wrap. */
  const lines = splitHeadline(sector.label, 2);

  return new ImageResponse(
    (
      <OgCard
        kicker={sector.group}
        lines={lines}
        titleSize={sector.label.length > 20 ? 70 : 88}
        sub={sector.tagline}
        chips={sector.metrics.slice(0, 3)}
        accentLastChip={false}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}

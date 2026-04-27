import { Badge } from "@/components/ui/badge";

/**
 * Past client / experience logo strip.
 *
 * PLACEHOLDERS — replace `clients` items with real company names + logo SVGs.
 * Once we have real logo files, swap each `<span className="wordmark">…</span>`
 * for an inline <svg> or <Image src="/clients/xyz.svg" />.
 */
const clients = [
  { name: "Client 01" },
  { name: "Client 02" },
  { name: "Client 03" },
  { name: "Client 04" },
  { name: "Client 05" },
  { name: "Client 06" },
  { name: "Client 07" },
  { name: "Client 08" },
];

function Tile({ name }: { name: string }) {
  return (
    <div
      className="
        flex items-center justify-center shrink-0
        h-12 px-8 rounded-md
        border border-dashed border-white/10
        text-foreground/55 hover:text-foreground/85 transition-colors
        font-semibold tracking-[0.18em] uppercase text-[13px]
      "
      aria-label={name}
    >
      {name}
    </div>
  );
}

export function LogoStrip() {
  // duplicate the list so the marquee can loop seamlessly
  const loop = [...clients, ...clients];

  return (
    <section className="relative py-16 border-t border-white/[0.04]">
      <div className="container">
        <div className="flex items-center justify-center mb-7">
          <Badge variant="muted" className="gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-electric/80" />
            Senior team experience across consumer, finance, legal &amp; SaaS
          </Badge>
        </div>

        <div className="marquee marquee-mask overflow-hidden">
          <div className="marquee-track flex gap-6 w-max">
            {loop.map((c, i) => <Tile key={`${c.name}-${i}`} name={c.name} />)}
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Logos shown represent prior work of Acta Data&apos;s founders. Drop in real client SVGs to replace placeholders.
        </p>
      </div>
    </section>
  );
}

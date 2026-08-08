import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { sectors } from "@/lib/sectors";

/**
 * Home-page routing block. Deliberately shows every sector rather than a
 * curated three — the point is that a visitor sees their own industry named and
 * clicks straight to a page written for them.
 */
export function SectorTeaser() {
  return (
    <section className="relative py-16 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">Sectors</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            We already know{" "}
            <span className="text-electric">your value streams.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Every sector argues about different numbers. We have built the layer underneath
            those arguments before, so we start with your metrics rather than a discovery
            phase.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map(s => (
            <Link
              key={s.slug}
              href={`/sectors/${s.slug}`}
              className="group flex items-baseline justify-between gap-4 rounded-xl border border-white/[0.07] bg-navy-100/40 px-5 py-4 transition-colors hover:border-electric/30"
            >
              <span className="text-sm font-semibold tracking-tight group-hover:text-electric transition-colors">
                {s.label}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground group-hover:text-electric transition-colors">
                →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/sectors" className="text-sm text-electric hover:underline">
            All sectors, in detail →
          </Link>
        </div>
      </div>
    </section>
  );
}

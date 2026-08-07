import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { getSector } from "@/lib/sectors";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Renders case-study cards, or nothing at all when the list is empty. Every
 * caller can drop this in unconditionally — an empty array means the block
 * disappears rather than showing a placeholder.
 */
export function CaseStudyCards({ studies }: { studies: CaseStudy[] }) {
  if (studies.length === 0) return null;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {studies.map(cs => {
        const sector = getSector(cs.sector);
        return (
          <Link
            key={cs.slug}
            href={`/case-studies/${cs.slug}`}
            className="group rounded-2xl border border-white/[0.08] bg-card/50 p-7 transition-colors hover:border-electric/30"
          >
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {sector && <span className="text-electric">{sector.label}</span>}
              <span>{cs.client}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight group-hover:text-electric transition-colors">
              {cs.headline}
            </h3>
            <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{cs.summary}</p>

            {cs.stats.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {cs.stats.slice(0, 3).map(s => (
                  <div key={s.label}>
                    <div className="font-display text-2xl tracking-tight text-electric">
                      {s.figure}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 text-sm text-foreground/80 group-hover:text-electric transition-colors">
              Read the detail →
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/** Section wrapper for use on the home and sector pages. */
export function CaseStudySection({
  studies,
  heading = "Proof",
  title = "What this looks like when it's done.",
}: {
  studies: CaseStudy[];
  heading?: string;
  title?: string;
}) {
  if (studies.length === 0) return null;

  return (
    <section className="relative py-24 md:py-28 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">{heading}</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            {title}
          </h2>
        </div>
        <div className="mt-10">
          <CaseStudyCards studies={studies} />
        </div>
      </div>
    </section>
  );
}

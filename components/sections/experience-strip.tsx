import Link from "next/link";
import { ExperienceMarquee } from "@/components/experience-marquee";

/**
 * Social proof, high up, cheap.
 *
 * The full argument for why that experience matters lives in <Crew /> on /about.
 * On the home page it was 2,457px of a phone screen before the reader had got to
 * what we actually do, so all that survives here is the evidence itself and the
 * line that qualifies it — everything else is one tap away.
 *
 * The qualification is not decoration: these are brands the team worked with in
 * prior roles and engagements, NOT Acta Data clients. Do not drop that wording.
 */
export function ExperienceStrip() {
  return (
    <section className="relative py-10 md:py-14 border-y border-white/[0.04] bg-navy-100/30">
      <div className="container">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <div className="text-[11px] uppercase tracking-[0.2em] text-electric">
            Where we&apos;ve worked
          </div>
          <Link
            href="/about"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Why that judgement is the edge &rarr;
          </Link>
        </div>
        <div className="mt-6">
          <ExperienceMarquee />
        </div>
      </div>
    </section>
  );
}

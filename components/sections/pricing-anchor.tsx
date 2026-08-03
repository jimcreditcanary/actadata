import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  inHouseYearOneK,
  inHouseTimeToFirstOutput,
  actaYearOneK,
  headcount,
} from "@/lib/economics";

export function PricingAnchor() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="rounded-2xl border border-white/[0.06] bg-card/50 backdrop-blur p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <Badge variant="muted" className="mb-5">The honest comparison</Badge>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
                12 months. <span className="text-electric">£{actaYearOneK}k.</span> A working data function.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl">
                Or hire {headcount} people, carry ~£{inHouseYearOneK}k a year fully loaded, wait{" "}
                {inHouseTimeToFirstOutput} for the first useful output, and carry the
                retention risk yourself.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="electric" size="lg">
                  <a href="#contact">Talk to us about your situation →</a>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.06] bg-navy-100/60 p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Build it yourself</div>
                <div className="mt-3 text-3xl font-semibold tabular-nums">~£{inHouseYearOneK}k</div>
                <div className="mt-1 text-sm text-muted-foreground">per year, fully loaded</div>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <li>{headcount} hires</li>
                  <li>{inHouseTimeToFirstOutput} to first output</li>
                  <li>Hiring &amp; retention risk</li>
                </ul>
              </div>
              <div className="rounded-xl border border-electric/30 bg-gradient-to-b from-electric/[0.08] to-transparent p-5 glow-ring">
                <div className="text-[11px] uppercase tracking-[0.18em] text-electric">Acta — Build &amp; Hand Over</div>
                <div className="mt-3 text-3xl font-semibold tabular-nums">£{actaYearOneK}k</div>
                <div className="mt-1 text-sm text-electric/80">total, 12 months</div>
                <ul className="mt-5 space-y-2 text-sm text-foreground/90">
                  <li>One senior team</li>
                  <li>First output in weeks</li>
                  <li>You own everything</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

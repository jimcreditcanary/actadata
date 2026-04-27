import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PricingAnchor() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="rounded-2xl border border-white/[0.06] bg-card/50 backdrop-blur p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <Badge variant="muted" className="mb-5">The honest comparison</Badge>
              <h2 className="font-display font-normal text-4xl md:text-6xl tracking-[-0.02em] leading-[1.05]">
                12 months. <span className="text-electric">£120k.</span> A working data function.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl">
                Or hire five people, spend £350k+ a year, wait six months for the first
                useful output, and pray nobody quits. We've seen which one finishes first.
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
                <div className="mt-3 text-3xl font-semibold tabular-nums">£350k+</div>
                <div className="mt-1 text-sm text-muted-foreground">per year, all-in</div>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <li>5 hires</li>
                  <li>3–6 months to first output</li>
                  <li>Hiring & retention risk</li>
                </ul>
              </div>
              <div className="rounded-xl border border-electric/30 bg-gradient-to-b from-electric/[0.08] to-transparent p-5 glow-ring">
                <div className="text-[11px] uppercase tracking-[0.18em] text-electric">Acta — Build &amp; Hand Over</div>
                <div className="mt-3 text-3xl font-semibold tabular-nums">£120k</div>
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

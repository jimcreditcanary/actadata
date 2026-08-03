import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { actaFirstOutputWeeks } from "@/lib/economics";

const stats = [
  { figure: "100+", label: "Years of combined data and AI experience" },
  { figure: actaFirstOutputWeeks, label: "Week to your first real report" },
  { figure: "1", label: "Stack, chosen once — no vendor bake-off" },
  { figure: "0", label: "New hires for you to make or manage" },
];

export function Crew() {
  return (
    <section id="crew" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Badge variant="muted" className="mb-5">The crew</Badge>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            A hundred years of data and AI experience.{" "}
            <span className="text-electric">Pointed at your P&amp;L.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Our team has run these businesses, not just advised them. You feel the
            difference in week one: we find the handful of numbers that actually move
            your outcome, and ship them. A real report in days — not a discovery deck
            in six months.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <Card key={s.label} className="p-6">
              <CardContent className="p-0">
                <div className="font-display text-3xl md:text-4xl tracking-tight text-electric tabular-nums">
                  {s.figure}
                </div>
                <div className="mt-2 text-sm text-muted-foreground leading-snug">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-white/[0.06] bg-card/50 backdrop-blur p-6 md:p-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-electric">
                We operationalise AI
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                Analytics that do something — not analytics you read.
              </h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A report tells you what happened last month. We build the layer
                underneath it: AI inside your workflows, so a number becoming a problem
                triggers the work — the case flagged, the limit reviewed, the exception
                routed to whoever can clear it.
              </p>
              <p>
                What you end up with is an operational and risk capability that runs
                every day, rather than a pack somebody reads once a month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

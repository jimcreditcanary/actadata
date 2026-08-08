import { Card, CardContent } from "@/components/ui/card";
import { actaFirstOutputWeeks } from "@/lib/economics";
import { Eyebrow } from "@/components/eyebrow";
import { ExperienceMarquee } from "@/components/experience-marquee";

const stats = [
  { figure: "Decades", label: "Of hands-on data and AI experience" },
  { figure: actaFirstOutputWeeks, label: "Week to your first real report" },
  { figure: "4", label: "C-suite disciplines: marketing, ops, tech, product" },
  { figure: "0", label: "New hires for you to make or manage" },
];

export function Crew() {
  return (
    <section id="crew" className="relative py-16 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">The crew</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
Decades of data and AI experience.{" "}
            <span className="text-electric">Pointed at your P&amp;L.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            We are data and AI people who have held C-suite positions across marketing,
            operations, technology and product — so we have sat on your side of the table
            and owned the number, not just reported it. You feel it in week one: we find
            the handful of numbers that actually move your outcome, and ship them. A real
            report in days, not a discovery deck in six months.
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

        {/* Where we've worked — the argument for why SME judgement is the edge,
            evidenced by the brands that judgement was formed in. */}
        <div className="mt-5 rounded-2xl border border-white/[0.06] bg-card/50 backdrop-blur p-6 md:p-10">
          <div className="max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.18em] text-electric">
              Where we&apos;ve worked
            </div>
            <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
              Business judgement is the edge AI cannot fake.
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every business can buy the same models now. What separates the ones that get
              value from them is knowing which decisions actually move the number — and that
              only comes from having run things. We have informed strategy through operations
              and data systems in some of the biggest brands in the country and in
              founder-led SMEs, from inside as operators and alongside as consultants.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              That is what we bring to the new wave of intelligence: not just the pipes, but
              the judgement about where to point them.
            </p>
          </div>

          <div className="mt-9">
            <ExperienceMarquee />
          </div>
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
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Where this really bites is the mid-market: enough complexity to need a
                data function, not enough scale to justify five hires for it.
              </p>
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

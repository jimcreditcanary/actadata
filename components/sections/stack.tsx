import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, LayoutDashboard, Sparkles } from "lucide-react";
import { entryYearK } from "@/lib/economics";
import { Eyebrow } from "@/components/eyebrow";

/**
 * Three parts, one line each. The plain-English gloss is the point: most buyers
 * do not need to know what a warehouse is, they need to know where their data
 * lives, what they look at, and who they ask.
 */
const pillars = [
  {
    icon: Database,
    title: "Google BigQuery",
    plain: "Where your data lives.",
    blurb:
      "One place for everything, run by Google so it scales without you thinking about it. Everything is recorded once and never rewritten, so last month's numbers cannot quietly change. And where your systems only hold today's state, we rebuild the history you never had — so you can see a trend where before there was only a snapshot.",
  },
  {
    icon: LayoutDashboard,
    title: "shadcn",
    plain: "What you look at.",
    blurb:
      "Fast, clean dashboards and reports in your own brand — the same toolkit this website is built with. It is code you own, not a licence you rent, so nobody can put the price up or switch it off.",
  },
  {
    icon: Sparkles,
    title: "Claude",
    plain: "Who you ask.",
    blurb:
      "Ask a question in plain English and get an answer from your own data — no analyst, no ticket, no wait. It is the COO and the FD using this directly, not just the data team. Runs in your own Claude account, so your data stays inside your boundary and your controls.",
  },
];

const removed = [
  "Heavy data engineering",
  "Warehouse design from scratch",
  "A BI build project",
  "A five-person hiring round",
];

export function Stack() {
  return (
    <section id="stack" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow accent className="mb-5">The stack</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
Three things.{" "}
            <span className="text-electric">That&apos;s the whole stack.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            BigQuery is where your data lives. shadcn is what you look at. Claude is who
            you ask. That is the whole thing — no vendor bake-off, no sprawl, nothing you
            have to re-platform later. We picked it because it works, it scales with you,
            and it lets us start in days rather than months. Connecting your own systems is
            the only part that varies, because that depends on what each one lets us read.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map(({ icon: Icon, title, plain, blurb }) => (
            <Card key={title} className="p-6 transition-colors hover:border-electric/30">
              <CardContent className="p-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric/15 text-electric">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-1 text-sm font-medium text-electric">{plain}</p>
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{blurb}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-5 grid lg:grid-cols-2 gap-5 items-stretch">
          {/* What you no longer have to own */}
          <Card className="p-6 md:p-8">
            <CardContent className="p-0">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                What you no longer have to own
              </div>
              <ul className="mt-5 grid sm:grid-cols-2 gap-3">
                {removed.map(item => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-navy-100/50 px-4 py-3 text-sm text-muted-foreground"
                  >
                    <span aria-hidden className="text-electric/70 font-semibold">—</span>
                    <span className="line-through decoration-white/25">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-foreground/90 leading-relaxed">
                In their place: BI delivery, tracking and decisioning, end to end, for
                less than half a senior data hire. The whole environment is Terraformed,
                so it hands over cleanly — or we keep running it and wire in new sources
                as they arrive. Your call, not a contract term.
              </p>
            </CardContent>
          </Card>

          {/* Start now */}
          <div className="relative">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-electric/40 to-transparent opacity-60 blur-xl pointer-events-none" />
            <div className="relative h-full rounded-xl border border-electric/30 bg-card/80 backdrop-blur p-6 md:p-8 glow-ring flex flex-col">
              <Eyebrow accent className="mb-5">Start immediately</Eyebrow>
              <h3 className="text-2xl font-semibold tracking-tight leading-tight">
                The only thing we&apos;re waiting on is access to your data.
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                No discovery phase to sit through, no procurement marathon. Give us
                read access with personal data excluded, and we start — your first report inside a week.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                {[
                  ["Kick-off", "This month"],
                  ["Year-1 cost", `From £${entryYearK}k`],
                  ["We need", "Read access, no personal data"],
                  ["You keep", "The whole environment"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
                    <div className="mt-1 font-semibold text-foreground">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-7">
                <Button asChild variant="electric" size="lg">
                  <a href="#contact">Start the conversation →</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

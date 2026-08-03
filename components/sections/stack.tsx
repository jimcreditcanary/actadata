import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cloud, GitBranch, Sparkles } from "lucide-react";
import { actaYearOneK } from "@/lib/economics";

const pillars = [
  {
    icon: Cloud,
    title: "Google Cloud and BigQuery",
    blurb:
      "One warehouse, one bill, no vendor sprawl. BigQuery takes you from your first table to your whole business without a re-platform, and everything else plugs into it.",
  },
  {
    icon: GitBranch,
    title: "CI/CD from the first commit",
    blurb:
      "Every model, pipeline and dashboard is version-controlled, tested and deployed automatically. Nothing is hand-built in a console, so nothing breaks quietly after we hand it over.",
  },
  {
    icon: Sparkles,
    title: "Claude, in your own account",
    blurb:
      "Self-service analytics that people actually use: your team asks in plain English and gets an answer from the warehouse. Your Anthropic account, your data boundary, your controls.",
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
          <Badge variant="electric" className="mb-5">The stack</Badge>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Google, BigQuery and Claude.{" "}
            <span className="text-electric">Chosen once, so you never re-platform.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            We don&apos;t run a vendor bake-off and bill you for the deliberation. One
            stack, deployed by CI/CD, delivered end to end — warehouse, BI, tracking
            and decisioning — with Claude wired in so your team can ask their own
            questions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map(({ icon: Icon, title, blurb }) => (
            <Card key={title} className="p-6 transition-colors hover:border-electric/30">
              <CardContent className="p-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric/15 text-electric">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{blurb}</p>
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
                the price of one senior data hire. We build it and hand it over, or we
                stay on and wire in new data as it arrives.
              </p>
            </CardContent>
          </Card>

          {/* Start now */}
          <div className="relative">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-electric/40 to-transparent opacity-60 blur-xl pointer-events-none" />
            <div className="relative h-full rounded-xl border border-electric/30 bg-card/80 backdrop-blur p-6 md:p-8 glow-ring flex flex-col">
              <Badge variant="electric" className="self-start mb-5">Start immediately</Badge>
              <h3 className="text-2xl font-semibold tracking-tight leading-tight">
                The only thing we&apos;re waiting on is access to your data.
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                No discovery phase to sit through, no procurement marathon. Give us
                non-PII read access and we start — your first report inside a week.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
                {[
                  ["Kick-off", "This month"],
                  ["Year-1 cost", `From £${actaYearOneK}k`],
                  ["We need", "Non-PII read access"],
                  ["You keep", "Every asset we build"],
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

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/eyebrow";

const models = [
  {
    name: "From Scratch",
    duration: "Months, not years",
    blurb:
      "Nothing to build on, or nothing you trust. We start from zero: first real report inside a week, and a working data layer your business runs on within the first few months — regulated reporting included.",
    tier: "BI Only and up",
    featured: true,
  },
  {
    name: "BI Takeover",
    duration: "Migration",
    blurb:
      "A tired setup and a team that can't get ahead of it. We take the whole thing over and turn it into something AI can work with, without the lights going out on the way.",
    tier: "BI Only and up",
  },
  {
    name: "Claude Enterprise Onboarding",
    duration: "Safety first",
    blurb:
      "Claude in your own enterprise account, done properly: who can see what, limits on what it can do, testing against real questions, and a data policy your risk and compliance teams will actually sign.",
    tier: "BI + Claude and up",
  },
  {
    name: "AI Readiness",
    duration: "Activation",
    blurb:
      "Agents that run real operational work, with one agent coordinating the rest. Your data stops being something you report on and starts being something that does the work.",
    tier: "Enterprise",
  },
];

export function EngagementModels() {
  return (
    <section id="engagements" className="relative py-16 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">Engagement models</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Choose how you work with us.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Same operators, same stack, same standards. Four ways in — the only question is
            where you&apos;re starting from.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {models.map(m => (
            <Card
              key={m.name}
              className={`relative p-6 md:p-7 ${m.featured ? "border-electric/40 bg-gradient-to-b from-electric/[0.06] to-transparent glow-ring" : ""}`}
            >
              {m.featured && (
                <Eyebrow accent className="absolute -top-3 left-7 bg-background px-2">Flagship</Eyebrow>
              )}
              <CardContent className="p-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-tight">{m.name}</h3>
                  <span className="shrink-0 text-[11px] uppercase tracking-[0.16em] text-muted-foreground pt-1.5">{m.duration}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.blurb}</p>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <div className="text-electric font-medium">{m.tier}</div>
                  <Button asChild variant="ghost" size="sm" className="text-foreground/80 hover:text-electric shrink-0">
                    <a href="#contact">Discuss →</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <span className="text-foreground font-medium">Acta means acts.</span>{" "}
          We build action data — not archive data.
        </p>
      </div>
    </section>
  );
}

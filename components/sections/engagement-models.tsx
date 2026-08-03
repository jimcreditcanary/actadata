import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { actaMonthlyK } from "@/lib/economics";

const models = [
  {
    name: "From Scratch",
    duration: "12 months",
    blurb:
      "New business, or you missed the BI boom and there's nothing to build on. We start from nothing — and put your first real report in front of you inside a week.",
    price: `From £${actaMonthlyK}k / month`,
    featured: true,
  },
  {
    name: "BI Takeover",
    duration: "Migration",
    blurb:
      "A tired stack and a department that can't get ahead of it. We take the whole thing over and convert it into something AI-ready, without the lights going out on the way.",
    price: `From £${actaMonthlyK}k / month`,
  },
  {
    name: "Claude Enterprise Onboarding",
    duration: "Safety first",
    blurb:
      "Claude into your own enterprise account, properly: access boundaries, guardrails, evals and a data policy your risk and compliance teams will actually sign.",
    price: "Fixed price, fixed scope",
  },
  {
    name: "AI Readiness",
    duration: "Activation",
    blurb:
      "Agent-driven operational pipelines with a master agent orchestrating them. Your data stops being something you report on and starts being something that does the work.",
    price: "Fixed price, fixed scope",
  },
];

export function EngagementModels() {
  return (
    <section id="engagements" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Badge variant="muted" className="mb-5">Engagement models</Badge>
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
                <Badge variant="electric" className="absolute -top-2.5 left-6">Flagship</Badge>
              )}
              <CardContent className="p-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-tight">{m.name}</h3>
                  <Badge variant="muted" className="shrink-0">{m.duration}</Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.blurb}</p>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <div className="text-electric font-medium">{m.price}</div>
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

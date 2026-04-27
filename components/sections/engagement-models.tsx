import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const models = [
  {
    name: "Build & Hand Over",
    blurb: "We build the whole data function in 12 months. You own everything at the end.",
    price: "From £10k / month",
    duration: "12 months",
    featured: true,
  },
  {
    name: "Build & Manage",
    blurb: "We build it, then stay on as your data team. No hiring, no hand-off.",
    price: "Build + ongoing retainer",
    duration: "12 mo + ongoing",
  },
  {
    name: "Build & Embed",
    blurb: "We build alongside the senior hire you're making. They inherit a working machine.",
    price: "From £10k / month",
    duration: "9–12 months",
  },
  {
    name: "Fractional Data Team",
    blurb: "Senior data leadership and delivery from day one. Skip the build phase.",
    price: "From £8k / month",
    duration: "Ongoing",
  },
  {
    name: "Audit & Rescue",
    blurb: "Find what's broken in your stack, fix it fast, leave a 30-day plan behind.",
    price: "From £18k fixed",
    duration: "3–4 weeks",
  },
  {
    name: "AI Readiness Sprint",
    blurb: "LLM use-case mapping, data readiness, evals plan. Fixed price, fixed scope.",
    price: "From £25k fixed",
    duration: "4–6 weeks",
  },
];

export function EngagementModels() {
  return (
    <section id="engagements" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Badge variant="muted" className="mb-5">Engagement models</Badge>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
            Choose how you work with us.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Same operators, same standards. Different shapes — depending on whether
            you want a team forever, a team for now, or just the answer.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {models.map(m => (
            <Card
              key={m.name}
              className={`relative p-6 ${m.featured ? "border-electric/40 bg-gradient-to-b from-electric/[0.06] to-transparent glow-ring" : ""}`}
            >
              {m.featured && (
                <Badge variant="electric" className="absolute -top-2.5 left-6">Most popular</Badge>
              )}
              <CardContent className="p-0">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">{m.name}</h3>
                  <Badge variant="muted">{m.duration}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.blurb}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="text-electric font-medium">{m.price}</div>
                  <Button asChild variant="ghost" size="sm" className="text-foreground/80 hover:text-electric">
                    <a href="#contact">Discuss →</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Badge } from "@/components/ui/badge";
import { Zap, Layers, Lock, Brain } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Immediate start.",
    blurb: "Inside a week, not a hiring cycle. The first useful output ships in weeks.",
  },
  {
    icon: Layers,
    title: "Activity Schema, day one.",
    blurb: "We build on a foundation that makes future questions cheap to answer — analytics, AI, attribution.",
  },
  {
    icon: Lock,
    title: "You own the output.",
    blurb: "Your warehouse, your code, your dashboards. No proprietary lock-in. We hand the keys over.",
  },
  {
    icon: Brain,
    title: "A safe path to LLMs.",
    blurb: "Clean schemas, evals, guardrails. So when you put an AI in front of customers, it doesn't lie.",
  },
];

export function WhyActa() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Badge variant="muted" className="mb-5">Why Acta</Badge>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Four reasons we keep getting picked.
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {reasons.map(({ icon: Icon, title, blurb }) => (
            <div key={title} className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-card/50 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

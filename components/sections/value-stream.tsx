import { Eyebrow } from "@/components/eyebrow";

/**
 * The operations argument, and the most ownable idea on the site.
 *
 * Everything else describes plumbing. This says what the plumbing is FOR: we map
 * the value stream and find where more value can be taken out of it. The four
 * atomic units are the mechanism — every activity in the business gets recorded
 * with its cost, its revenue, its conversion and its time, and business context
 * is layered on top of those four. That is why a question like "where should we
 * put the next hour of effort?" becomes answerable at all.
 */
const units = [
  {
    unit: "Cost",
    q: "What did this activity consume?",
    d: "Every step carries its cost — people, media, carriage, cost to serve — so margin is a fact rather than an allocation argument.",
  },
  {
    unit: "Revenue",
    q: "What did it bring in?",
    d: "Attributed to the activity that produced it, not the last click or the loudest team.",
  },
  {
    unit: "Conversion",
    q: "How much got through?",
    d: "Step-by-step throughput, so you can see which stage leaks and what a point of improvement is worth.",
  },
  {
    unit: "Time",
    q: "How long did it take?",
    d: "Duration between steps, because most operational value hides in the waiting rather than the doing.",
  },
];

export function ValueStream() {
  return (
    <section id="value-stream" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow accent className="mb-5">Operations, not dashboards</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            We map your value stream.{" "}
            <span className="text-electric">Then find where the value leaks.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Reporting tells you what happened. Operations is about where to apply effort next.
            So we model the business end to end — every activity, in order — and record four
            things against each one. Layer your business context over those four and you can
            see, rather than argue about, where the next pound of margin is.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {units.map((u, i) => (
            <div
              key={u.unit}
              className="rounded-2xl border border-white/[0.08] bg-card/50 p-6 transition-colors hover:border-electric/30"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="font-display text-2xl tracking-tight">{u.unit}</div>
                <div className="text-[11px] tabular-nums text-electric/60">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="mt-3 text-sm font-medium text-electric">{u.q}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{u.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-electric/25 bg-gradient-to-b from-electric/[0.07] to-transparent p-7 md:p-9 glow-ring">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                Four units, every activity, end to end.
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Cost, revenue, conversion and time are the atoms. Everything a business
                actually asks — which product to push, which channel to cut, which step to
                automate, where an hour of effort returns most — is a question about how those
                four behave across the stream.
              </p>
            </div>
            <div className="text-muted-foreground leading-relaxed">
              <p>
                It is also why the AI layer works. Give a model a wall of dashboards and it
                guesses. Give it an ordered history of activities with cost, revenue,
                conversion and time attached, and it can reason about cause — which is the
                difference between a chatbot and something that finds you money.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";

/**
 * How we work — the ethos section on /about.
 *
 * The commitments here are deliberately falsifiable: hand it over when it is
 * done, meet each person at their own level, expect the client to be
 * self-sufficient inside the year. A principle nobody could ever hold you to is
 * just decoration, so these are written so a client could call us on them.
 */
const principles = [
  {
    n: "01",
    t: "Open and honest, by default",
    d: "We tell you what the data says, including when it is inconvenient or when it makes our own work look harder. No black boxes, no findings held back to protect a narrative, and no dependency engineered into the build.",
  },
  {
    n: "02",
    t: "If it takes an hour, you get it in an hour",
    d: "We do not drip-feed work to fit a milestone plan. Whatever is finished is handed over the moment it is finished — the code, the models, the reasoning behind them. You are never waiting on us for something that already exists.",
  },
  {
    n: "03",
    t: "Tools matched to the person, not the average",
    d: "Every team has a spread of confidence with data. Some people want to write their own queries; others want one page that already answers the question. We build for both ends of that range, so nobody is left stranded and nobody is held back.",
  },
  {
    n: "04",
    t: "We expect you not to need us",
    d: "By the end of twelve months you should be self-sufficient — usually a good while before that. At which point we get out of the way and let you fly, and you use us where it actually matters rather than out of habit.",
  },
];

/**
 * `compact` is the home-page rendering: the four principle titles, which are
 * punchy enough to carry the ethos on their own, and the panel headline. The
 * paragraphs and the full argument stay on /about. In full it was 2,153px of a
 * phone screen — the titles do most of that work in a quarter of the space.
 */
export function HowWeWork({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="how-we-work"
      className={`relative border-t border-white/[0.04] ${
        compact ? "py-16 md:py-24" : "py-16 md:py-32"
      }`}
    >
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow accent className="mb-5">How we work</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Nothing held back.{" "}
            <span className="text-electric">Including the keys.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            We work at the front edge of what is actually possible with AI right now, and we
            hand all of it over — the tools, the reasoning, the access. Our job is to make
            ourselves unnecessary, then be genuinely useful when you choose to come back.
          </p>
        </div>

        {compact ? (
          <>
            <ul className="mt-9 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {principles.map(p => (
                <li key={p.n} className="flex gap-4 items-baseline">
                  <span className="shrink-0 font-display text-sm tabular-nums text-electric/50">
                    {p.n}
                  </span>
                  <span className="text-lg font-semibold tracking-tight leading-snug">{p.t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border border-electric/25 bg-gradient-to-b from-electric/[0.07] to-transparent p-6 md:p-8 glow-ring">
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                Quality data first. Then the agents.{" "}
                <span className="text-electric">Then your people where it counts.</span>
              </h3>
              <Link
                href="/about#how-we-work"
                className="mt-4 inline-block text-sm text-electric hover:underline"
              >
                How we work, in full &rarr;
              </Link>
            </div>
          </>
        ) : (
          <>
        <div className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-2">
          {principles.map(p => (
            <div key={p.n} className="flex gap-5">
              <div className="mt-1 shrink-0 font-display text-lg tabular-nums text-electric/50">
                {p.n}
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{p.t}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-electric/25 bg-gradient-to-b from-electric/[0.07] to-transparent p-7 md:p-10 glow-ring">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                Quality data first. Then the agents.{" "}
                <span className="text-electric">Then your people where it counts.</span>
              </h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                An AI output is only ever as good as what sits underneath it. Get the data
                right and the model has something to reason from; skip that and you have
                bought a confident guessing machine. So we build the layer first, every time.
              </p>
              <p>
                Then we help you put agents into the operation itself, so the repetitive work
                stops consuming people. That is the point of all of it — your team spending
                their hours on customers and judgement calls, which is the part no model does
                better than a good operator.
              </p>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </section>
  );
}

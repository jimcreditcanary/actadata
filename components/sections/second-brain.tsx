import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { Card, CardContent } from "@/components/ui/card";

/**
 * The second brain — what the layer becomes once it has history, policy and a
 * feedback loop on top of it.
 *
 * Two things make this claim defensible rather than vapour, and both are stated
 * as mechanisms so a client can hold us to them: policy is encoded as code so
 * recommendations are generated inside it rather than filtered afterwards, and
 * the priors are learned from the client's own decisions rather than from generic
 * best practice. If either of those stops being true in delivery, this section is
 * the first thing that has to change.
 *
 * `compact` is the home-page rendering — the two brains and the alignment line,
 * with the mechanism detail on /what-we-build.
 */
const brains = [
  {
    t: "For everyone in it",
    short:
      "Ask it what you would ask the colleague who has been here fifteen years — why we decline these, what we did last time, which of my accounts is about to go wrong.",
    d: "Ask it what you would ask the colleague who has been here fifteen years. Why do we decline these? What did we do last time this happened? Which of my accounts is about to go wrong? It answers from your own history, at whatever level of detail the person asking wants — and it never gets tired of being asked.",
  },
  {
    t: "For the business itself",
    short:
      "Judgement stops living in a handful of heads. When somebody resigns the reasoning stays; when somebody joins they start with the whole history.",
    d: "The judgement that currently lives in a handful of heads becomes something the company owns. When someone resigns, the reasoning stays behind. When someone joins, they start with the whole history rather than a handover document and a folder of spreadsheets.",
  },
];

const alignment = [
  {
    n: "01",
    t: "Your policies, as code",
    d: "Recommendations are generated inside your policy rather than filtered after the fact. If something cannot be offered to a customer in that position, it is never suggested in the first place — which is also what makes the output safe to put in front of a regulator.",
  },
  {
    n: "02",
    t: "Your decisioning priors, not generic best practice",
    d: "It learns how your business actually trades off risk, cost and service from the decisions you have already made — including the ones where a person overrode the system and turned out to be right. Your appetite, not the industry average.",
  },
  {
    n: "03",
    t: "The loop closes",
    d: "Every recommendation is scored against what actually happened next, so the following one is better. That is the difference between a model trained once and a second brain that is still learning in December from what it got wrong in March.",
  },
];

export function SecondBrain({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="second-brain"
      className={`relative border-t border-white/[0.04] ${compact ? "py-16 md:py-20" : "py-16 md:py-20"}`}
    >
      <div className="container">
        {/* The heading gets max-w-4xl rather than the usual 3xl: at 3xl it broke
            after "everyone in" and left "it." orphaned on a third line. */}
        <div className="max-w-4xl">
          <Eyebrow accent className="mb-5">The second brain</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            A second brain for your business.{" "}
            <span className="text-electric">And for everyone in it.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
            The layer does not only report. It remembers — every activity you have recorded,
            every decision anyone made, and what happened next. That is what turns reporting
            into recommendations: something that has seen your business work, is still watching,
            and tells you what to do about what it is seeing right now.
          </p>
        </div>

        {/* Compact drops the cards for a plain two-column split and the short
            copy: two cards of four-line paragraphs plus the full panel cost
            1,518px on a phone, which is too much rent for a teaser. */}
        <div className={`grid gap-5 md:grid-cols-2 ${compact ? "mt-8" : "mt-10"}`}>
          {brains.map(b =>
            compact ? (
              <div key={b.t}>
                <h3 className="text-lg font-semibold tracking-tight">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.short}</p>
              </div>
            ) : (
              <Card key={b.t} className="p-6 md:p-7">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold tracking-tight">{b.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
                </CardContent>
              </Card>
            )
          )}
        </div>

        {compact ? (
          <div className="mt-8 rounded-2xl border border-electric/25 bg-gradient-to-b from-electric/[0.07] to-transparent p-6 md:p-8 glow-ring">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
              Aligned to your policies and{" "}
              <span className="text-electric">the way you actually decide.</span>
            </h3>
            <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
              Recommendations come from inside your own policy, and the priors from decisions your
              business has already made — not the industry average.
            </p>
            <Link
              href="/what-we-build#second-brain"
              className="mt-4 inline-block text-sm text-electric hover:underline"
            >
              How it stays aligned &rarr;
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-14 max-w-3xl">
              <h3 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
                Aligned to your policies and{" "}
                <span className="text-electric">the way you actually decide.</span>
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A recommendation engine that does not know your rules is a liability, and one
                trained on somebody else&apos;s business is a guess. Three things keep this one
                yours.
              </p>
            </div>

            <div className="mt-10 grid gap-x-10 gap-y-9 md:grid-cols-3">
              {alignment.map(a => (
                <div key={a.n}>
                  <div className="font-display text-lg tabular-nums text-electric/50">{a.n}</div>
                  <h4 className="mt-2 text-lg font-semibold tracking-tight leading-snug">{a.t}</h4>
                  <p className="mt-2.5 text-muted-foreground leading-relaxed">{a.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-electric/25 bg-gradient-to-b from-electric/[0.07] to-transparent p-7 md:p-9 glow-ring">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                  And it runs while nobody is watching.
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    A monthly pack tells you what you should have done. A second brain is
                    looking at the business continuously, which means the recommendation arrives
                    while the decision is still live — the case still open, the customer still on
                    the phone, the limit not yet breached.
                  </p>
                  <p>
                    That is also the point at which agents become worth having. Once something
                    can see the whole business, knows your policy and knows what usually works,
                    it can be trusted to do the repetitive part itself and bring you the rest.
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

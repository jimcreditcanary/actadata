import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { maintenanceMonthlyK, actaTimeToFirstOutput } from "@/lib/economics";

/**
 * The shape of an engagement over time — the one thing /how-it-works has that
 * the home page does not, and the answer to the question every prospect asks
 * second ("so what actually happens, and when?").
 *
 * Every stage here is a commitment made elsewhere on the site: first output in
 * week one, self-sufficiency inside the year, a Terraformed handover at the end.
 * If any of those change in the pitch, they change here too.
 */
const stages = [
  {
    when: "Week one",
    what: "Something useful, already live",
    detail:
      "We connect the first source, land the events in your BigQuery project and put a real number in front of you. Not a plan for a number — the number. It is deliberately the first thing we do, because it tells you whether you want to work with us.",
  },
  {
    when: "First month",
    what: "The layer takes shape",
    detail:
      "Sources joined, definitions agreed and written down as code, history rebuilt as far back as the data allows. This is where the arguments about what a customer is get settled once, in the open, with you in the room.",
  },
  {
    when: "Months two and three",
    what: "The Summary Page and the reporting behind it",
    detail:
      "The scorecard, the objectives and the alerting go live on top of the layer, and the manual reporting starts coming out of people's weeks. Regulatory and board reporting gets built here too, because it is the same layer.",
  },
  {
    when: "Months four to twelve",
    what: "Self-service, then agents",
    detail:
      "We open the layer up to your team through Claude, with personal data walled off, so people can ask their own questions. Then we put agents onto the repetitive operational work — the chasing, the flagging, the routing — and keep your people on the decisions.",
  },
  {
    when: "After twelve months",
    what: "You take the keys",
    detail:
      `A structured handover: everything Terraformed, the models documented, your team already running it. You can walk away, keep us on for £${maintenanceMonthlyK}k a month on a rolling contract so nothing falls over, or agree new datasets and training as projects. We expect you to be self-sufficient well before this point.`,
  },
];

export function EngagementTimeline() {
  return (
    <section
      id="timeline"
      className="relative py-16 md:py-32 border-t border-white/[0.04]"
    >
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow accent className="mb-5">The first year</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            {actaTimeToFirstOutput} to something real.{" "}
            <span className="text-electric">Twelve months to not needing us.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            No discovery phase that bills for six weeks and produces a document. Here is what
            actually happens, in order.
          </p>
        </div>

        {/* A single rule down the left with a node per stage — reads as a sequence
            on desktop and stacks without losing the thread on mobile. */}
        <ol className="mt-14 relative border-l border-white/[0.08] space-y-11 pl-7 md:pl-9">
          {stages.map(s => (
            <li key={s.when} className="relative">
              <span
                aria-hidden
                className="absolute -left-[calc(1.75rem+4.5px)] md:-left-[calc(2.25rem+4.5px)] top-2 h-2 w-2 rounded-full bg-electric ring-4 ring-navy"
              />
              {/* The when-label moves into its own column at md, so the block
                  fills the container instead of hugging the left 40% of a
                  desktop screen. Below md it just sits above the title. */}
              <div className="md:grid md:grid-cols-[10rem_1fr] md:gap-x-9 md:items-baseline">
                <div className="text-[11px] uppercase tracking-[0.18em] text-electric md:pt-1.5">
                  {s.when}
                </div>
                <div>
                  <h3 className="mt-2 md:mt-0 text-xl md:text-2xl font-semibold tracking-tight leading-snug">
                    {s.what}
                  </h3>
                  <p className="mt-2.5 max-w-2xl text-muted-foreground leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/pricing" className="text-electric hover:underline">
            What it costs →
          </Link>
          <Link href="/what-we-build" className="text-electric hover:underline">
            What we build →
          </Link>
        </div>
      </div>
    </section>
  );
}

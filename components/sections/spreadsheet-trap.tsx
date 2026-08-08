import { Eyebrow } from "@/components/eyebrow";

/**
 * The pain, named plainly. Everything else on the site describes what we build;
 * this is the only section that describes the visitor's Tuesday. It leads with
 * the symptoms because that is what people recognise themselves in — nobody
 * searches for "semantic layer", they search for a way out of the export.
 */
const symptoms = [
  {
    t: "The monthly download ritual",
    d: "Someone logs into four systems, exports four spreadsheets, and spends two days making them agree. Next month, again.",
  },
  {
    t: "Numbers that arrive too late to use",
    d: "By the time the pack is ready the month is over, the decision has been made, and the report is a post-mortem.",
  },
  {
    t: "Targets nobody can see against",
    d: "The target is in one file, actuals in another, and the gap between them is calculated by whoever asks loudest.",
  },
  {
    t: "No time to actually look",
    d: "All the effort goes into assembling the numbers. Nobody is left with the hours to sit and read what they say.",
  },
  {
    t: "Measuring what's easy, not what matters",
    d: "Revenue and volume, because they're in the system. Margin, retention and cost to serve, because they're not.",
  },
  {
    t: "One version of the truth per person",
    d: "Three people bring three numbers to the same meeting and the first twenty minutes go on whose is right.",
  },
];

export function SpreadsheetTrap() {
  return (
    <section id="the-problem" className="relative py-16 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">The trap</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Most firms are lost in spreadsheets.{" "}
            <span className="text-electric">Not because they lack data.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            They have plenty. It is spread across systems that were never meant to talk, so
            every question turns into an export, and every export turns into a spreadsheet
            somebody has to maintain. The business ends up busy with the reporting and short
            of the time to read it.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-9">
          {symptoms.map((s, i) => (
            <div key={s.t} className="flex gap-4">
              <div className="mt-0.5 shrink-0 font-display text-lg text-electric/50 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div className="font-semibold tracking-tight">{s.t}</div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-electric/25 bg-gradient-to-b from-electric/[0.07] to-transparent p-7 md:p-9 glow-ring">
          <div className="max-w-3xl">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
              We remove the manual reporting entirely.
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              No more downloads, no more reconciling, no more version. The data arrives on its
              own, the numbers agree because they come from one place, and the pack is already
              waiting when you open it. What you get back is the thing you actually wanted:
              time to look at the business instead of assembling it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

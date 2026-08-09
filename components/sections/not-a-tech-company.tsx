import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { entryYearK, discoveryOneOffK } from "@/lib/economics";

/**
 * For the business that reads all of this and decides it is for somebody else.
 *
 * Builders merchants, wholesalers, distributors, plant hire, family
 * manufacturers — businesses doing real volume with real margin pressure, who
 * assume "data and AI" means tech companies. The objection is never "we don't
 * believe it works", it is "that is not us".
 *
 * The filenames are the whole device. Abstract talk about value streams does not
 * land with someone whose business genuinely runs on a shared drive; a list of
 * workbooks they recognise does, because they wrote them. Keep them specific,
 * keep the version suffixes, and keep them affectionate rather than mocking —
 * these spreadsheets are the reason the business works, not a failure. The point
 * is that the person maintaining them is doing a data engineer's job by hand on a
 * Sunday.
 */
const workbooks = [
  { file: "Stock take March FINAL v4.xlsx", cost: "Cash sitting on a shelf nobody has counted since March" },
  { file: "Debtors chase list (Dave's copy).xlsx", cost: "The only copy, and it leaves when Dave does" },
  { file: "Margin by branch — DO NOT EDIT.xlsx", cost: "Gross margin, so the branch that eats the deliveries still looks fine" },
  { file: "Quotes outstanding wk32.xlsx", cost: "Nobody knows the win rate, or which quotes went cold and why" },
  { file: "Price list 2026 (new) (2).xlsx", cost: "Two versions in circulation, and the trade counter has the old one" },
  { file: "Van costs Sheet1.xlsx", cost: "Cost to serve per drop, which is where the margin actually goes" },
  { file: "Credit limits master.xlsx", cost: "Set once, three years ago, on a customer who has since doubled" },
  { file: "Supplier rebates Q3.xlsx", cost: "Rebate thresholds you hit or miss without noticing until the quarter ends" },
];

/**
 * `compact` is the home rendering: the objection, the filenames and the
 * size argument. The three "what you get" columns come off, because home already
 * answers that question three times over — but the filename list stays, because
 * it is the only part that makes somebody recognise themselves.
 */
export function NotATechCompany({ compact = false }: { compact?: boolean }) {
  return (
    <section id="not-a-tech-company" className="relative py-16 md:py-20 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-4xl">
          <Eyebrow accent className="mb-5">If you think this isn&apos;t for you</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            You don&apos;t need to be a tech company.{" "}
            <span className="text-electric">You need to see your own numbers.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
            Builders merchants. Wholesalers. Distributors. Plant hire. Family manufacturers.
            Serious turnover on thin margin, where the person who really understands the numbers
            is the owner, a long-serving manager, and a shared drive.
            {!compact && (
              <>
                {" "}
                If that is you, this is more for you than it is for the tech companies — because
                you are the one still doing it by hand.
              </>
            )}
          </p>
        </div>

        {/* The recognition device: their actual filenames. */}
        <div className="mt-12">
          <div className="text-sm text-muted-foreground">
            You already have a data team. It is a folder.
          </div>
          {/* Eight separate cards stacked to 2,670px on a phone. As rows inside
              one container it is a folder listing, which is both tighter and a
              better metaphor. */}
          <div className="mt-5 rounded-2xl border border-white/[0.07] bg-navy-100/40 divide-y divide-white/[0.05]">
            {(compact ? workbooks.slice(0, 6) : workbooks).map(w => (
              <div
                key={w.file}
                className="flex flex-col gap-1 p-4 md:flex-row md:items-baseline md:justify-between md:gap-8 md:px-6 md:py-4"
              >
                <div className="flex items-baseline gap-2.5 md:shrink-0">
                  {/* Monospace so it reads as a filename, not a headline. */}
                  <span
                    aria-hidden
                    className="mt-0.5 h-2 w-2 shrink-0 rounded-[2px] bg-emerald-400/50"
                  />
                  <span className="font-mono text-[13px] md:text-sm text-foreground/90 break-words">
                    {w.file}
                  </span>
                </div>
                <p className="pl-[18px] text-sm text-muted-foreground leading-relaxed md:pl-0 md:text-right">
                  {w.cost}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-lg text-foreground/90">
            {compact
              ? "Questions the business already asks every week. None of them talk to each other."
              : "Every one of those is a question the business already asks every week. None of them talk to each other, none of them have any history, and all of them depend on somebody remembering to update them."}
          </p>
        </div>

        {/* What they get, in their own terms — not "insight", answers. */}
        {!compact && (
        <div className="mt-14 grid gap-x-10 gap-y-9 md:grid-cols-3">
          {[
            {
              t: "Which customers actually make you money",
              d: "Not gross margin — margin after the deliveries, the returns, the credit you carry and the time your team spends on them. Most merchants find a handful of their biggest accounts are their worst.",
            },
            {
              t: "What is dead on the shelf",
              d: "Every line, how long since it moved, and what that cash would be worth doing something else. Along with the lines you keep running out of, which is the same question from the other side.",
            },
            {
              t: "Which branch, van or rep is carrying the others",
              d: "The same numbers for every part of the business, worked out the same way — so the comparison is an argument about what to do rather than about whose spreadsheet is right.",
            },
          ].map(x => (
            <div key={x.t}>
              <h3 className="text-lg font-semibold tracking-tight leading-snug">{x.t}</h3>
              <p className="mt-2.5 text-muted-foreground leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
        )}

        <div className="mt-12 rounded-2xl border border-electric/25 bg-gradient-to-b from-electric/[0.07] to-transparent p-7 md:p-9 glow-ring">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
              You are not too small for this.{" "}
              <span className="text-electric">You are the size where it pays back fastest.</span>
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {!compact && (
              <p>
                In a large corporate, doing this properly is a multi-year programme with a steering
                committee. In a business of forty or a hundred people it is a few months, because
                the whole operation genuinely fits in one layer — one stock system, one finance
                system, one CRM if you are lucky, and the spreadsheets in between.
              </p>
              )}
              <p>
                And the payback is not a nicer report. It is one dead product line cleared, one
                bad account repriced, one rebate threshold hit that you would otherwise have
                missed. At £{entryYearK}k a year for a single area, that arithmetic tends to work
                out quickly — or start with the £{discoveryOneOffK}k map and see the numbers before
                you commit to anything.
              </p>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/sectors/wholesale" className="text-electric hover:underline">
              Wholesale &amp; distribution &rarr;
            </Link>
            <Link href="/sectors/manufacturing" className="text-electric hover:underline">
              Manufacturing &rarr;
            </Link>
            <Link href="/pricing" className="text-electric hover:underline">
              What it costs &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

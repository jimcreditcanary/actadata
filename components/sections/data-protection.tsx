import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";

/**
 * Data protection as a capability, not a caveat.
 *
 * THE LINE THIS COPY MUST NOT CROSS. Everything here is a mechanism we build or a
 * piece of evidence we produce. Nowhere does it say we make anyone compliant,
 * certify anything, or advise on the law — that would be both untrue and a
 * liability, and the "What we are not" panel says so in the client's face rather
 * than in a footnote. The policy is the DPO's or counsel's; we build the plumbing
 * that makes it happen and the audit trail that proves it did.
 *
 * The three pillars map to what is actually broken in this market:
 *   1. Personal data in the analytical layer — already prevented by the design, so
 *      this pillar is a claim we can already stand behind.
 *   2. Retention policies that exist as a document and nothing else.
 *   3. Marketing lists carrying contacts whose consent nobody can evidence.
 *
 * `compact` is for /what-we-build, where this is one capability among several.
 */
const pillars = [
  {
    n: "01",
    t: "No personal data in the analytical layer",
    short: "Obscured at ingest, so the modelled layer holds none of it — by design, not by setting.",
    d: "Personal data is obscured at ingest, so it never travels into the modelled layer or into an AI prompt. That is data minimisation built into the architecture rather than configured on top of it, and it is what makes self-service analytics safe to open up: a model cannot leak what was never there. Read access with personal data excluded is all we ever ask for.",
  },
  {
    n: "02",
    t: "Retention and destruction that actually happens",
    short:
      "Where personal data really lives, your rules as code against that map, and an audit trail proving what was deleted.",
    d: "We map where personal data actually lives across every connected system, express your retention rules as code against that map, and run them on a schedule. Then the part that decides whether any of it counts: an audit trail showing what was deleted, when, and under which rule — so a retention policy becomes evidence rather than an intention. Erasure requests get the same treatment, once, across every system that holds the record.",
  },
  {
    n: "03",
    t: "Marketing lists you can stand behind",
    short:
      "Every contact traced to the event that created it, so the ones with no evidenced basis can be suppressed rather than hoped over.",
    d: "Every contact traced back to the event that created it — the form submission, with its timestamp and the wording that was on the page — or to nothing at all. Contacts with an evidenced lawful basis get separated from contacts without one, so a list can be suppressed rather than hoped over. The finding is usually the same and usually uncomfortable: a large share of the list has no traceable basis, and nobody knew, because the CRM stores the current state and not how it got there.",
  },
];

export function DataProtection({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="data-protection"
      className={`relative border-t border-white/[0.04] ${compact ? "py-16 md:py-16" : "py-16 md:py-20"}`}
    >
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow accent className="mb-5">Data protection</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            The compliance work nobody is doing.{" "}
            <span className="text-electric">Built in, not bolted on.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Most businesses have a retention policy in a document and no way to show it is
            being followed. That is rarely negligence. It is that nobody knows which of
            fourteen systems hold a given record, and deleting it from the CRM does nothing
            about the copy in the warehouse, the reporting database, the backup, or the
            spreadsheet on somebody&apos;s desktop.
          </p>
        </div>

        <div className={`grid gap-x-10 gap-y-9 md:grid-cols-3 ${compact ? "mt-9" : "mt-12"}`}>
          {pillars.map(p => (
            <div key={p.n}>
              <div className="font-display text-lg tabular-nums text-electric/50">{p.n}</div>
              <h3 className="mt-2 text-lg font-semibold tracking-tight leading-snug">{p.t}</h3>
              <p className="mt-2.5 text-muted-foreground leading-relaxed">
                {compact ? p.short : p.d}
              </p>
            </div>
          ))}
        </div>

        {/* Said plainly and up front, because the alternative reading of this
            section is one we would deserve. */}
        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-navy-100/40 p-7 md:p-9">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div>
              <Eyebrow className="mb-4">What we are not</Eyebrow>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                We are not lawyers, and none of this is legal advice.
              </h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Your DPO, your counsel or your compliance function decides what the policy
                says and what lawful basis you rely on. We are the engineering underneath it:
                finding where personal data actually is, doing what the policy says, and
                producing the evidence that it happened.
              </p>
              <p>
                Acta Data Ltd is registered with the Information Commissioner&apos;s Office
                under ZB502441, and every environment we build is your own — so the data, and
                the responsibility for it, never leaves your control.
              </p>
              {!compact && (
                <p className="text-foreground/90">
                  Compliance stops being an annual project and becomes a by-product of the
                  layer being built properly in the first place.
                </p>
              )}
            </div>
          </div>
        </div>

        {compact && (
          <div className="mt-8">
            <Link href="/data-protection" className="text-sm text-electric hover:underline">
              How we handle data protection &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

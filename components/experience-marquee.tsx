/**
 * Brands the team has worked with or advised, as a two-row marquee.
 *
 * These are TEXT wordmarks, not fetched logo files, and that is deliberate:
 * third-party logo artwork is trademarked and usually licensed, and the copies
 * floating around on logo-CDN sites are not ours to redistribute commercially.
 * Naming a brand you have worked with is a statement of fact; reproducing its
 * logo is reproducing someone's asset. If the real files arrive with permission,
 * swap each <span> for an <Image /> and nothing else changes.
 *
 * The caption underneath is not decoration — it says these are prior roles and
 * engagements rather than Acta Data client relationships, which is the honest
 * framing and the one that keeps the claim defensible.
 */
const ROW_ONE = [
  "P&G",
  "Diageo",
  "BBC 5 Live",
  "Virgin Media",
  "Sky",
  "Accenture",
  "Barclays",
  "Lloyds",
  "TSB",
  "University of Oxford",
  "University of Manchester",
  "WWF",
  "Big Yellow Storage",
];

const ROW_TWO = [
  "Dentsu Aegis",
  "Carat",
  "Proximity London",
  "SapientNitro",
  "Booker",
  "Makro",
  "Slater and Gordon",
  "Barratt Homes",
  "Better Bathrooms",
  "Auden",
  "Ruler Analytics",
  "Mojo CX",
  "The Pipeline",
];

function Row({ names, reverse }: { names: string[]; reverse?: boolean }) {
  // Duplicated so the -50% translate loops seamlessly.
  const loop = [...names, ...names];
  return (
    <div className="marquee marquee-mask overflow-hidden">
      <div
        className="marquee-track flex w-max items-center gap-10"
        style={reverse ? { animationDirection: "reverse", animationDuration: "46s" } : undefined}
      >
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 whitespace-nowrap text-[15px] font-semibold tracking-[0.06em] text-foreground/45 transition-colors hover:text-foreground/80"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ExperienceMarquee() {
  return (
    <div>
      <div className="space-y-3">
        <Row names={ROW_ONE} />
        <Row names={ROW_TWO} reverse />
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Brands our team has worked with or advised, in prior roles and engagements — as
        employees, and as consultants. Shown as experience, not as Acta Data client
        relationships.
      </p>
    </div>
  );
}

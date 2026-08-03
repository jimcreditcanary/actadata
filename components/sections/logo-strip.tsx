import { Badge } from "@/components/ui/badge";

/**
 * Stack strip.
 *
 * Deliberately NOT a client logo wall — we don't publish client names, so a
 * logo wall would either be empty or placeholder. This says something true
 * instead: the tools we build on. Wordmarks are text, so there are no
 * third-party logo assets or trademark issues to manage.
 */
const stack = [
  "BigQuery",
  "Snowflake",
  "dbt",
  "Fivetran",
  "Airflow",
  "Looker",
  "Power BI",
  "Metabase",
  "Postgres",
  "Databricks",
];

function Mark({ name }: { name: string }) {
  return (
    <div
      className="
        flex items-center justify-center shrink-0 h-10 px-6
        text-foreground/50 hover:text-foreground/80 transition-colors
        font-medium tracking-[0.12em] uppercase text-[13px] whitespace-nowrap
      "
    >
      {name}
    </div>
  );
}

export function LogoStrip() {
  // duplicate the list so the marquee can loop seamlessly
  const loop = [...stack, ...stack];

  return (
    <section className="relative py-16 border-t border-white/[0.04]">
      <div className="container">
        <div className="flex items-center justify-center mb-7">
          <Badge variant="muted" className="gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-electric/80" />
            Senior team experience across consumer, finance, legal &amp; SaaS
          </Badge>
        </div>

        <div className="marquee marquee-mask overflow-hidden">
          <div className="marquee-track flex gap-2 w-max">
            {loop.map((name, i) => <Mark key={`${name}-${i}`} name={name} />)}
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          We build on the tools your team can hire for and your auditors recognise. No proprietary layer, no lock-in.
        </p>
      </div>
    </section>
  );
}

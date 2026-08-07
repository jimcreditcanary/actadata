/**
 * The personalised alert queue: three things to look at now, and the queue that
 * refills as they clear.
 *
 * The queue is the whole point. A dashboard shows you everything and leaves the
 * triage to you; this shows three, because three is what someone will actually
 * act on between meetings — and then keeps the next ones visible but dimmed so
 * it is obvious the list is worked, not infinite.
 *
 * Severity is amber or violet only. A third colour would imply a severity scale
 * nobody has agreed, and red on a marketing page reads as "our product is on
 * fire".
 */
export type Alert = {
  title: string;
  /** One line of context — what changed, and by how much. */
  detail: string;
  /** The metric that triggered it. */
  metric: string;
  /** What the recipient is being asked to do. */
  action: string;
  urgent?: boolean;
};

const AMBER = "#FCD34D";
const VIOLET = "#A855F7";

export function SummaryAlerts({
  alerts,
  queued,
  persona,
}: {
  alerts: Alert[];
  /** Titles only — these are next up, not yet actionable. */
  queued: string[];
  /** Who the list is built for, e.g. "COO". */
  persona: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/[0.06] bg-navy-100/40 p-5">
      <div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Needs you now
        </div>
        <div className="mt-0.5 text-sm text-foreground">
          Three things, personalised to the {persona}
        </div>
      </div>

      <ol className="mt-5 space-y-3">
        {alerts.map((a, i) => (
          <li
            key={a.title}
            className={`rounded-lg border p-3.5 ${
              a.urgent
                ? "border-amber-300/35 bg-amber-300/[0.05]"
                : "border-white/[0.07] bg-navy-100/60"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-1 h-2.5 w-2.5 shrink-0 rounded-[2px]"
                style={{ background: a.urgent ? AMBER : VIOLET, opacity: a.urgent ? 0.9 : 0.7 }}
              />
              <div className="min-w-0">
                <div className="text-sm font-medium tracking-tight text-foreground">
                  {a.title}
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{a.detail}</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="rounded-md border border-white/[0.08] bg-navy/60 px-2 py-0.5 text-[11px] tabular-nums text-foreground/80">
                    {a.metric}
                  </span>
                  <span
                    className={`text-[11px] font-medium ${
                      a.urgent ? "text-amber-300" : "text-electric"
                    }`}
                  >
                    {a.action} →
                  </span>
                </div>
              </div>
              <span className="ml-auto shrink-0 text-[11px] tabular-nums text-muted-foreground/70">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </li>
        ))}
      </ol>

      {/* The refill. Dimmed, so it reads as a worked queue rather than a backlog. */}
      <div className="mt-5 border-t border-white/[0.06] pt-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Next up as these clear
        </div>
        <ul className="mt-3 space-y-2">
          {queued.map(q => (
            <li key={q} className="flex items-center gap-2.5 text-xs text-muted-foreground/70">
              <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-white/25" />
              <span className="truncate">{q}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

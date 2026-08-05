/**
 * Pipeline run history — one cell per source per day, 30 days.
 *
 * This is the same block motif as the header mosaic, but here every cell means
 * something: a clean run, a retried run, or today's run in flight. That is the
 * whole reason it belongs on the page — it evidences the real-time and
 * idempotent-pipeline claims rather than asserting them. Cells are a daily
 * rollup of health; the pipelines themselves run continuously.
 *
 * The data is illustrative and deterministic (seeded, not random) so server and
 * client agree on render. The surrounding card is labelled as illustrative.
 */
const SOURCES = ["Shopify", "Stripe", "Ad platforms", "CRM", "Ops database", "Finance ledger"];
const DAYS = 30;

type State = "clean" | "retried" | "today";

function stateFor(row: number, day: number): State {
  if (day === DAYS - 1) return "today";
  // Deterministic sparse retries — a wall of pure green reads as fake.
  const n = (row * 31 + day * 17 + row * day) % 43;
  return n === 0 || n === 19 ? "retried" : "clean";
}

const cellClass: Record<State, string> = {
  clean: "bg-electric/55",
  retried: "bg-amber-300/70",
  today: "bg-electric ring-1 ring-electric/40",
};

export function PipelineGrid() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-navy-100/40 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Pipeline health
          </div>
          <div className="mt-0.5 text-sm text-foreground">Last 30 days, every source</div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[2px] bg-electric/55" aria-hidden /> Clean
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[2px] bg-amber-300/70" aria-hidden /> Retried
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[2px] bg-electric" aria-hidden /> Today
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-1.5 overflow-x-auto">
        {SOURCES.map((source, row) => (
          <div key={source} className="flex items-center gap-3">
            <div className="w-24 shrink-0 truncate text-[11px] text-muted-foreground">{source}</div>
            {/* Fixed square cells, not 1fr — stretched cells read as a bar
                chart, squares read as the block motif. Scrolls on narrow
                viewports rather than distorting. */}
            <div
              className="grid gap-[3px]"
              style={{ gridTemplateColumns: `repeat(${DAYS}, 12px)` }}
              role="img"
              aria-label={`${source}: 30 days of runs, all completed`}
            >
              {Array.from({ length: DAYS }, (_, day) => (
                <span
                  key={day}
                  className={`h-3 w-3 rounded-[2px] ${cellClass[stateFor(row, day)]}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground">
        Retries are expected and safe: a pipeline can re-run without double-counting, so it
        produces the same numbers every time.
      </p>
    </div>
  );
}

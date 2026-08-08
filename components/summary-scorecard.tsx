/**
 * Balanced scorecard — the top block of the Summary Page.
 *
 * Deliberately the four Kaplan & Norton perspectives rather than a pile of
 * whatever metrics happen to be available. That is the whole point of a
 * scorecard: financial performance alone tells you what already happened, so it
 * sits alongside the customer, the operation and the people who run it. Two
 * measures per perspective keeps it readable and forces a choice about what
 * actually matters.
 *
 * RAG is against target, and in the real product it is derived from the metric
 * tree — never typed in by whoever built the slide. The values here are
 * illustrative, so they are authored.
 */
export const PERSPECTIVES = ["Financial", "Customer", "Operations", "People & growth"] as const;
export type Perspective = (typeof PERSPECTIVES)[number];

export type Rag = "green" | "amber" | "red";

export type ScoreMetric = {
  perspective: Perspective;
  label: string;
  value: string;
  /** Formatted target, shown beneath the value. */
  target: string;
  /** Percentage-point or percentage change vs prior period. */
  delta: number;
  /** True when a fall is an improvement (churn, scrap, cost). */
  goodWhenDown?: boolean;
  rag: Rag;
  spark: number[];
};

const RAG: Record<Rag, { dot: string; text: string; label: string }> = {
  green: { dot: "#34D399", text: "text-emerald-400", label: "On plan" },
  amber: { dot: "#FCD34D", text: "text-amber-300", label: "Watch" },
  red: { dot: "#F87171", text: "text-red-400", label: "Off plan" },
};

/** Inline sparkline — hand-rolled so eight of them cost no charting library. */
function Spark({ data, rag }: { data: number[]; rag: Rag }) {
  const w = 60;
  const h = 16;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data
    .map((v, i) => `${((i / (data.length - 1)) * w).toFixed(1)},${(h - ((v - min) / span) * h).toFixed(1)}`)
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden className="shrink-0">
      <polyline
        points={pts}
        fill="none"
        stroke={RAG[rag].dot}
        strokeWidth="1.4"
        strokeOpacity="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SummaryScorecard({ metrics }: { metrics: ScoreMetric[] }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-navy-100/40 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Balanced scorecard
          </div>
          <div className="mt-0.5 text-sm text-foreground">
            The whole business, not just the P&amp;L
          </div>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          {(Object.keys(RAG) as Rag[]).map(k => (
            <span key={k} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: RAG[k].dot }} />
              {RAG[k].label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-x-5 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
        {PERSPECTIVES.map(p => {
          const rows = metrics.filter(m => m.perspective === p);
          const worst: Rag = rows.some(r => r.rag === "red")
            ? "red"
            : rows.some(r => r.rag === "amber")
              ? "amber"
              : "green";
          return (
            <div key={p}>
              <div className="flex items-center gap-2 border-b border-white/[0.07] pb-2">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ background: RAG[worst].dot }}
                />
                <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/80">
                  {p}
                </div>
              </div>

              <div className="mt-3 space-y-3.5">
                {rows.map(m => {
                  const improving = m.goodWhenDown ? m.delta < 0 : m.delta > 0;
                  return (
                    <div key={m.label}>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="min-w-0 text-xs text-muted-foreground truncate">
                          {m.label}
                        </div>
                        <div
                          className={`shrink-0 text-[11px] tabular-nums ${
                            improving ? "text-emerald-400/80" : "text-amber-300/80"
                          }`}
                        >
                          {m.delta > 0 ? "+" : ""}
                          {m.delta}
                        </div>
                      </div>
                      <div className="mt-1 flex items-end justify-between gap-3">
                        <div>
                          <div className="text-lg font-semibold tabular-nums tracking-tight">
                            {m.value}
                          </div>
                          <div className={`text-[11px] tabular-nums ${RAG[m.rag].text}`}>
                            target {m.target}
                          </div>
                        </div>
                        <Spark data={m.spark} rag={m.rag} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

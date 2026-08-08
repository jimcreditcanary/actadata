import { Card, CardContent } from "@/components/ui/card";
import type { SummaryExample } from "@/lib/summary-examples";

/**
 * The 12-week trend chart, hand-rolled SVG.
 *
 * This was recharts, which was the only thing pulling that library in — about
 * 90kB of JavaScript on the two heaviest pages for one area chart with two
 * series. On a phone that is the single most expensive thing on the home page,
 * and none of recharts' interactivity was being used beyond a tooltip.
 *
 * The plot stretches with `preserveAspectRatio="none"` so it fills any container,
 * and `vector-effect="non-scaling-stroke"` keeps the line weights honest while it
 * does. Axis labels are HTML outside the SVG, because text inside a
 * non-uniformly scaled viewBox would squash.
 */
const W = 600;
const H = 200;

function niceTicks(min: number, max: number, count = 4) {
  const span = max - min || 1;
  const raw = span / (count - 1);
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw) ?? mag * 10;
  const lo = Math.floor(min / step) * step;
  const ticks: number[] = [];
  for (let v = lo; v <= max + step * 0.001; v += step) ticks.push(v);
  return ticks;
}

/** Trims trailing zeros so 1.50 reads as 1.5 and 2.00 as 2. */
const fmt = (v: number) =>
  Math.abs(v) >= 1000 ? Math.round(v).toLocaleString("en-GB") : String(+v.toFixed(1));

export function SummaryTrend({
  data,
  label,
}: {
  data: SummaryExample["trend"];
  label: string;
}) {
  const values = data.flatMap(d => [d.current, d.prior]);
  const ticks = niceTicks(Math.min(...values), Math.max(...values));
  const lo = ticks[0];
  const hi = ticks[ticks.length - 1];
  const span = hi - lo || 1;

  const x = (i: number) => (i / (data.length - 1)) * W;
  const y = (v: number) => H - ((v - lo) / span) * H;

  const line = (key: "current" | "prior") =>
    data.map((d, i) => `${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(" ");
  const area = `${line("current")} ${W},${H} 0,${H}`;

  return (
    <Card className="p-5 flex-1 flex flex-col">
      <CardContent className="p-0 flex flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {label}
            </div>
            <div className="text-sm text-foreground mt-0.5">12-week trailing window</div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-3 rounded bg-electric" /> Current
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-3 rounded bg-white/30" /> Prior 12 weeks
            </span>
          </div>
        </div>

        <div className="flex flex-1 min-h-[11rem] gap-2">
          {/* Y axis: HTML, so the numbers stay upright and unsquashed. */}
          <div className="flex flex-col justify-between py-px text-[10px] tabular-nums text-muted-foreground/80">
            {[...ticks].reverse().map(t => (
              <span key={t}>{fmt(t)}</span>
            ))}
          </div>

          <div className="flex-1 flex flex-col">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              className="w-full flex-1"
              role="img"
              aria-label={`${label}. Twelve weeks, current period against the prior twelve weeks.`}
            >
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity={0.42} />
                  <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
                </linearGradient>
              </defs>

              {ticks.map(t => (
                <line
                  key={t}
                  x1="0"
                  x2={W}
                  y1={y(t)}
                  y2={y(t)}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}

              <polygon points={area} fill="url(#trendFill)" />
              <polyline
                points={line("prior")}
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
              <polyline
                points={line("current")}
                fill="none"
                stroke="#A855F7"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* X axis: every other week, so twelve labels never collide on a phone. */}
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground/80">
              {data.map((d, i) => (
                <span key={d.week} className={i % 2 ? "invisible" : undefined}>
                  {d.week}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

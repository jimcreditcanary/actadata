/**
 * The whole proposition in one picture: many messy sources converge into a
 * single data layer, which produces a small number of clean reports, which flag
 * only the exceptions, which agents then act on.
 *
 * Colours are literal here because SVG needs concrete paint values; they mirror
 * the electric / amber tokens used elsewhere (recharts does the same).
 *
 * Motion is meaningful rather than decorative — the dashes travel in the
 * direction the data flows — and is dropped entirely under reduced motion.
 */
const VIOLET = "#A855F7";
const AMBER = "#FCD34D";
const DIM = "rgba(255,255,255,0.22)";

const SOURCES = [
  "Shopify", "Stripe", "Meta Ads", "Google Ads", "CRM", "Ops DB",
  "Warehouse", "Support", "Ledger", "Spreadsheets", "Email", "Legacy BI",
];

const LAYER_X = 430;
const REPORT_X = 700;
const AGENT_X = 1000;

export function FlowDiagram() {
  const top = 40;
  const gap = 22;

  return (
    <div>
      {/* Desktop diagram */}
      <div className="hidden md:block overflow-x-auto">
        <svg
          viewBox="0 0 1160 330"
          className="w-full min-w-[900px]"
          role="img"
          aria-label="Twelve scattered data sources converge into one data layer, which produces four clean reports, one flagged exception, and three autonomous agent workflows."
        >
          <defs>
            <linearGradient id="flow-layer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={VIOLET} stopOpacity="0.9" />
              <stop offset="100%" stopColor={VIOLET} stopOpacity="0.45" />
            </linearGradient>
            <radialGradient id="flow-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={VIOLET} stopOpacity="0.22" />
              <stop offset="100%" stopColor={VIOLET} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* glow behind the layer */}
          <ellipse cx={LAYER_X + 9} cy="165" rx="120" ry="150" fill="url(#flow-glow)" />

          {/* ---- STAGE 1: scattered sources, converging ---- */}
          {SOURCES.map((name, i) => {
            const y = top + i * gap;
            const stagger = (i % 4) * 14;
            const x0 = 8 + stagger;
            const messy = i === 2 || i === 9; // a couple of unreliable feeds
            return (
              <g key={name}>
                <rect
                  x={x0}
                  y={y - 4}
                  width="8"
                  height="8"
                  rx="1.5"
                  fill={messy ? AMBER : VIOLET}
                  opacity={messy ? 0.75 : 0.5}
                />
                <path
                  d={`M ${x0 + 12} ${y} C ${x0 + 120} ${y}, ${LAYER_X - 110} ${165 + (y - 165) * 0.25}, ${LAYER_X - 2} 165`}
                  fill="none"
                  stroke={messy ? AMBER : DIM}
                  strokeWidth={messy ? 1.2 : 1}
                  strokeDasharray="3 5"
                  className="flow-dash"
                  style={{ animationDelay: `${i * -0.6}s` }}
                  opacity={messy ? 0.5 : 0.85}
                />
              </g>
            );
          })}

          {/* ---- STAGE 2: the single data layer ---- */}
          <rect x={LAYER_X} y="45" width="18" height="240" rx="9" fill="url(#flow-layer)" />
          {Array.from({ length: 10 }, (_, i) => (
            <rect
              key={i}
              x={LAYER_X + 5}
              y={57 + i * 23}
              width="8"
              height="8"
              rx="1.5"
              fill="#0A1020"
              opacity="0.55"
            />
          ))}

          {/* ---- STAGE 3: few clean reports ---- */}
          {[0, 1, 2, 3].map(i => {
            const y = 85 + i * 55;
            const flagged = i === 2;
            return (
              <g key={i}>
                <path
                  d={`M ${LAYER_X + 20} 165 C ${LAYER_X + 90} 165, ${REPORT_X - 90} ${y}, ${REPORT_X - 6} ${y}`}
                  fill="none"
                  stroke={flagged ? AMBER : VIOLET}
                  strokeWidth="1.6"
                  strokeDasharray="4 6"
                  className="flow-dash"
                  style={{ animationDelay: `${i * -1.1}s` }}
                  opacity={flagged ? 0.85 : 0.6}
                />
                <rect
                  x={REPORT_X}
                  y={y - 15}
                  width="86"
                  height="30"
                  rx="6"
                  fill="rgba(168,85,247,0.08)"
                  stroke={flagged ? AMBER : VIOLET}
                  strokeOpacity={flagged ? 0.8 : 0.35}
                  strokeWidth="1"
                />
                {/* bars inside each report card */}
                {[0, 1, 2, 3, 4].map(b => (
                  <rect
                    key={b}
                    x={REPORT_X + 10 + b * 13}
                    y={y - 5 + (b % 2 === 0 ? 0 : 3)}
                    width="8"
                    height={b % 2 === 0 ? 10 : 7}
                    rx="1.5"
                    fill={flagged ? AMBER : VIOLET}
                    opacity={flagged ? 0.7 : 0.45}
                  />
                ))}
                {flagged && (
                  // Below the card, not beside it — to the right it collided
                  // with the agent connectors leaving this stage.
                  <text
                    x={REPORT_X}
                    y={y + 28}
                    fill={AMBER}
                    fontSize="10.5"
                    letterSpacing="0.08em"
                    opacity="0.9"
                  >
                    NEEDS ATTENTION
                  </text>
                )}
              </g>
            );
          })}

          {/* ---- STAGE 4: agents acting on the flag ---- */}
          {[0, 1, 2].map(i => {
            const y = 110 + i * 55;
            return (
              <g key={i}>
                <path
                  d={`M ${REPORT_X + 86} 195 C ${REPORT_X + 150} 195, ${AGENT_X - 70} ${y}, ${AGENT_X - 8} ${y}`}
                  fill="none"
                  stroke={VIOLET}
                  strokeWidth="1.4"
                  strokeDasharray="4 6"
                  className="flow-dash"
                  style={{ animationDelay: `${i * -1.4}s` }}
                  opacity="0.55"
                />
                <rect
                  x={AGENT_X}
                  y={y - 13}
                  width="26"
                  height="26"
                  rx="7"
                  fill="rgba(168,85,247,0.14)"
                  stroke={VIOLET}
                  strokeOpacity="0.55"
                />
                <circle cx={AGENT_X + 13} cy={y} r="3.5" fill={VIOLET} opacity="0.9" />
                {[0, 1, 2].map(t => (
                  <rect
                    key={t}
                    x={AGENT_X + 36}
                    y={y - 9 + t * 7}
                    width={t === 1 ? 44 : 30}
                    height="3"
                    rx="1.5"
                    fill={VIOLET}
                    opacity="0.3"
                  />
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Stage captions — separate from the SVG so they stay real, selectable text */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-5">
        {[
          {
            n: "01",
            t: "Every source, however messy",
            d: "Shops, payments, ad platforms, CRM, ops, spreadsheets, the legacy BI nobody trusts.",
          },
          {
            n: "02",
            t: "One data layer",
            d: "Modelled once in BigQuery on the Activity Schema. One definition of every number.",
          },
          {
            n: "03",
            t: "Only what matters",
            d: "A short, timely pack — and an exception raised when something actually needs you.",
          },
          {
            n: "04",
            t: "Agents that act",
            d: "Workflows triggered off the back of it, so the exception gets worked, not just noticed.",
          },
        ].map(s => (
          <div key={s.n}>
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-electric">
              {s.n}
            </div>
            <div className="mt-2 font-semibold tracking-tight">{s.t}</div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

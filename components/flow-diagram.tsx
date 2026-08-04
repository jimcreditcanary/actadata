/**
 * The whole proposition in one picture.
 *
 *   1. A complete grid of every record you own, running right up to the layer.
 *      Rows are banded into three source hues that blend to violet before they
 *      arrive — visibly different systems, without a rainbow.
 *   2. One modelled data layer.
 *   3. Blocks carry the data out to a handful of reports, one flagged amber.
 *   4. More blocks carry it on to the agents that act.
 *
 * Everything is deterministic — no Math.random, which would desync server and
 * client render. Colours are literal because SVG needs concrete paint values;
 * they mirror the electric / amber tokens used elsewhere.
 *
 * Only opacity animates, so nothing in the diagram can shift layout. All of it
 * stops under prefers-reduced-motion (see globals.css).
 */
type RGB = [number, number, number];

const VIOLET: RGB = [0xa8, 0x55, 0xf7];
const AMBER = "#FCD34D";
const LILAC = "#DDD6FE";

/** Source hues, deliberately close to violet so the effect stays subtle. */
const BANDS: RGB[] = [
  [0x63, 0x66, 0xf1], // indigo
  [0xa8, 0x55, 0xf7], // violet — the middle band is already home
  [0xd9, 0x46, 0xef], // magenta
];

const VB_W = 1100;
const VB_H = 320;
const LAYER_X = 400;
const LAYER_Y = 28;
const LAYER_W = 26;
const LAYER_H = 256;
const REPORT_X = 660;
const AGENT_X = 930;
const MID = 156;

/**
 * How far across the grid PII survives. Past this point no cell carries a PII
 * slot, because personal data is removed at ingest — the layer holds none by
 * design. This is the same commitment made in the Stack section (non-PII read
 * access is all we ask for) and in the privacy notice.
 */
const PII_CLEARED_AT = 0.62;

const CELL = 11;
const PITCH = CELL + 4;
const GRID_X0 = 8;
const GRID_Y0 = 24;
/**
 * 24 columns leaves a 36px gap (~2.4 cell widths) between the grid's right edge
 * and the layer. The grid previously butted up against it with 6px clearance,
 * which made the left half read as one heavy mass; the breathing room lets the
 * layer stand as its own object.
 */
const COLS = 24;
const ROWS = 18;

const hex = ([r, g, b]: RGB) =>
  "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");

const lerp = (a: RGB, b: RGB, t: number): RGB =>
  [0, 1, 2].map(i => Math.round(a[i] + (b[i] - a[i]) * t)) as RGB;

type Point = [number, number];

/** Cubic bezier, so the block chains can follow the same curves as before. */
function bezier(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const u = 1 - t;
  return [
    u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0],
    u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1],
  ];
}

/**
 * A chain of blocks along a curve with a bright pulse walking it.
 *
 * A block with animation-delay -x is already x into its cycle, so its NEXT
 * bright moment is (dur - x) away. For the pulse to travel outward, block i must
 * light at (i/n)·dur, hence x = dur·(1 - i/n). Getting this backwards makes the
 * pulse run inward, which is invisible in a screenshot.
 */
function BlockChain({
  from,
  c1,
  c2,
  to,
  colour,
  n,
  dur,
  size = 7,
}: {
  from: Point;
  c1: Point;
  c2: Point;
  to: Point;
  colour: string;
  n: number;
  dur: number;
  size?: number;
}) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const [x, y] = bezier(from, c1, c2, to, (i + 0.5) / n);
        return (
          <rect
            key={i}
            className="blk-pulse"
            x={+(x - size / 2).toFixed(1)}
            y={+(y - size / 2).toFixed(1)}
            width={size}
            height={size}
            rx="1.5"
            fill={colour}
            style={{
              ["--o" as string]: 0.22,
              ["--o2" as string]: 1,
              animationDuration: `${dur}s`,
              animationDelay: `${(-dur * (1 - i / n)).toFixed(2)}s`,
            }}
          />
        );
      })}
    </>
  );
}

function BackGrid() {
  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    const band = BANDS[Math.floor(r / 6) % BANDS.length];
    for (let c = 0; c < COLS; c++) {
      const t = c / (COLS - 1);
      const x = GRID_X0 + c * PITCH;
      const y = GRID_Y0 + r * PITCH;

      const fill = hex(lerp(band, VIOLET, Math.min(1, t * 1.35)));
      const jitter = (((r * 7 + c * 13) % 11) - 5) / 100;
      const op = Math.max(0.1, Math.min(0.92, 0.3 + t * 0.55 + jitter));

      // PII slots: personal data is stripped at ingest, so these render as empty
      // outlined cells — a hole where the field was — and they only exist in the
      // raw left-hand columns. Nothing past PII_CLEARED_AT carries one, which is
      // the point: by the time data reaches the layer there is none left.
      if ((r * 5 + c * 3) % 31 === 0 && t < PII_CLEARED_AT) {
        cells.push(
          <rect
            key={`${r}-${c}`}
            x={x}
            y={y}
            width={CELL}
            height={CELL}
            rx="2"
            fill="none"
            stroke={LILAC}
            strokeWidth="1.2"
            strokeOpacity="0.75"
          />
        );
        continue;
      }

      // Deterministic hash decides which cells move. Not all of them: a fully
      // twinkling grid reads as decoration, and 468 concurrent animations is
      // wasted work.
      const h = (r * 31 + c * 17 + r * c) % 100;
      const common = { x, y, width: CELL, height: CELL, rx: 2, fill };

      if (h < 12) {
        cells.push(
          <rect
            key={`${r}-${c}`}
            className="blk-flash"
            {...common}
            style={{
              ["--o" as string]: op.toFixed(2),
              ["--o2" as string]: Math.min(0.98, op + 0.55).toFixed(2),
              animationDuration: `${(2.6 + (h % 5) * 0.55).toFixed(2)}s`,
              animationDelay: `${(-((r * 7 + c * 11) % 40) * 0.21).toFixed(2)}s`,
            }}
          />
        );
      } else if (h < 52) {
        cells.push(
          <rect
            key={`${r}-${c}`}
            className="blk-flick"
            {...common}
            style={{
              ["--o" as string]: op.toFixed(2),
              ["--o2" as string]: Math.min(0.95, op + 0.26).toFixed(2),
              animationDuration: `${(3.4 + (h % 7) * 0.8).toFixed(2)}s`,
              animationDelay: `${(-((r * 13 + c * 5) % 50) * 0.19).toFixed(2)}s`,
            }}
          />
        );
      } else {
        cells.push(<rect key={`${r}-${c}`} {...common} opacity={op.toFixed(2)} />);
      }
    }
  }
  return <>{cells}</>;
}

export function FlowDiagram() {
  return (
    <div>
      {/* Desktop diagram */}
      <div className="hidden md:block overflow-x-auto">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full min-w-[900px]"
          role="img"
          aria-label="A complete grid of records from three source systems blends to one colour as personal data is stripped out, passes through a single data layer holding no personal information, and streams out as blocks to four reports — one flagged as needing attention — and on to three autonomous agent workflows."
        >
          <defs>
            <linearGradient id="flow-layer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={hex(VIOLET)} stopOpacity="0.9" />
              <stop offset="100%" stopColor={hex(VIOLET)} stopOpacity="0.45" />
            </linearGradient>
            <radialGradient id="flow-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={hex(VIOLET)} stopOpacity="0.22" />
              <stop offset="100%" stopColor={hex(VIOLET)} stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx={LAYER_X + 13} cy={MID} rx="150" ry="170" fill="url(#flow-glow)" />

          {/* ---- STAGE 1: the complete back grid ---- */}
          <BackGrid />

          {/* ---- STAGE 2: the single data layer ---- */}
          <rect
            x={LAYER_X}
            y={LAYER_Y}
            width={LAYER_W}
            height={LAYER_H}
            rx="13"
            fill="url(#flow-layer)"
          />
          {Array.from({ length: 10 }, (_, i) => (
            <rect
              key={i}
              x={LAYER_X + 7}
              y={42 + i * 24}
              width="12"
              height="12"
              rx="2"
              fill="#0A1020"
              opacity="0.55"
            />
          ))}

          {/* ---- STAGE 3: reports, fed by chains of blocks ---- */}
          {[0, 1, 2, 3].map(i => {
            const y = 52 + i * 74;
            const flagged = i === 2;
            const colour = flagged ? AMBER : hex(VIOLET);
            return (
              <g key={i}>
                <BlockChain
                  from={[LAYER_X + LAYER_W + 4, MID]}
                  c1={[LAYER_X + 110, MID]}
                  c2={[REPORT_X - 110, y]}
                  to={[REPORT_X - 10, y]}
                  colour={colour}
                  n={15}
                  dur={3.2}
                />
                <rect
                  x={REPORT_X}
                  y={y - 18}
                  width="120"
                  height="36"
                  rx="8"
                  fill="rgba(168,85,247,0.08)"
                  stroke={colour}
                  strokeOpacity={flagged ? 0.8 : 0.35}
                  strokeWidth="1"
                />
                {[0, 1, 2, 3, 4].map(b => (
                  <rect
                    key={b}
                    x={REPORT_X + 14 + b * 19}
                    y={y - 7 + (b % 2 === 0 ? 0 : 4)}
                    width="12"
                    height={b % 2 === 0 ? 14 : 10}
                    rx="2"
                    fill={colour}
                    opacity={flagged ? 0.7 : 0.45}
                  />
                ))}
                {flagged && (
                  <text
                    x={REPORT_X}
                    y={y + 34}
                    fill={AMBER}
                    fontSize="11.5"
                    letterSpacing="0.08em"
                    opacity="0.9"
                  >
                    NEEDS ATTENTION
                  </text>
                )}
              </g>
            );
          })}

          {/* ---- STAGE 4: agents, fed by chains of blocks ---- */}
          {[0, 1, 2].map(i => {
            const y = 95 + i * 75;
            return (
              <g key={i}>
                <BlockChain
                  from={[REPORT_X + 124, 200]}
                  c1={[REPORT_X + 180, 200]}
                  c2={[AGENT_X - 80, y]}
                  to={[AGENT_X - 12, y]}
                  colour={hex(VIOLET)}
                  n={12}
                  dur={3.6}
                  size={6}
                />
                <rect
                  x={AGENT_X}
                  y={y - 17}
                  width="34"
                  height="34"
                  rx="9"
                  fill="rgba(168,85,247,0.14)"
                  stroke={hex(VIOLET)}
                  strokeOpacity="0.55"
                />
                <circle cx={AGENT_X + 17} cy={y} r="4.5" fill={hex(VIOLET)} opacity="0.9" />
                {[0, 1, 2].map(t => (
                  <rect
                    key={t}
                    x={AGENT_X + 46}
                    y={y - 11 + t * 9}
                    width={t === 1 ? 60 : 40}
                    height="4"
                    rx="2"
                    fill={hex(VIOLET)}
                    opacity="0.3"
                  />
                ))}
              </g>
            );
          })}
        </svg>

        {/* The outlined cells need naming, or they read as decoration. */}
        <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <svg width="12" height="12" aria-hidden className="shrink-0">
              <rect
                x="0.6"
                y="0.6"
                width="10.8"
                height="10.8"
                rx="2"
                fill="none"
                stroke={LILAC}
                strokeWidth="1.2"
                strokeOpacity="0.75"
              />
            </svg>
            Personal data, stripped at ingest — the layer holds none by design
          </span>
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className="h-3 w-3 shrink-0 rounded-[2px]"
              style={{ background: AMBER, opacity: 0.8 }}
            />
            The one exception worth your attention
          </span>
        </div>
      </div>

      {/* Stage captions — real selectable text outside the SVG, and the whole
          mobile experience on their own once the diagram is hidden below md. */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            n: "01",
            t: "Different systems in",
            d: "Every record from every system — shops, payments, ad platforms, CRM, ops, the spreadsheets and the legacy BI nobody trusts.",
          },
          {
            n: "02",
            t: "One data layer",
            d: "Modelled once in BigQuery on the Activity Schema. One definition of every number — and no personal data in it, by design.",
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

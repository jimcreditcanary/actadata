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

const VB_W = 1000;
/** Extra height over the 292px content: room for the stage labels. */
const VB_H = 336;
const LAYER_X = 360;
const LAYER_Y = 28;
const LAYER_W = 32;
const LAYER_H = 256;
/** Pulled in from 660/930 — the layer-to-reports void was the emptiest
 * part of the diagram at 234px. Now 174px. */
const REPORT_X = 540;
const AGENT_X = 830;
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
 * 20 columns. The grid was carrying roughly 70% of the visual weight of the
 * whole diagram; at 20 it ends at x=304 against the layer at 360, and the width
 * freed up goes to the reports and agents so all four zones read as peers.
 */
const COLS = 20;
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
      const op = Math.max(0.12, Math.min(0.95, 0.34 + t * 0.6 + jitter));

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

            {/* The grid used to stop at a hard vertical edge, which is what made
                it read as a heavy block. It now dissolves over its last quarter
                so the mass grades into the layer's glow. */}
            <linearGradient id="grid-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="62%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="grid-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={LAYER_X} height={VB_H}>
              <rect x="0" y="0" width={LAYER_X} height={VB_H} fill="url(#grid-fade)" />
            </mask>
          </defs>

          <ellipse cx={LAYER_X + 13} cy={MID} rx="150" ry="170" fill="url(#flow-glow)" />

          {/* ---- STAGE 1: the grid, dissolving into the layer ---- */}
          <g mask="url(#grid-mask)">
            <BackGrid />
          </g>

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
              x={LAYER_X + 9}
              y={LAYER_Y + (LAYER_H - (9 * 24 + 14)) / 2 + i * 24}
              width="14"
              height="14"
              rx="2"
              fill="#0A1020"
              opacity="0.55"
            />
          ))}

          {/* ---- STAGE 3: reports, fed by chains of blocks ---- */}
          {[0, 1, 2, 3].map(i => {
            const y = 54 + i * 70;
            const flagged = i === 2;
            const colour = flagged ? AMBER : hex(VIOLET);
            return (
              <g key={i}>
                <BlockChain
                  from={[LAYER_X + LAYER_W + 4, MID]}
                  c1={[LAYER_X + 110, MID]}
                  c2={[REPORT_X - 110, y]}
                  to={[REPORT_X - 12, y]}
                  colour={colour}
                  n={18}
                  dur={3.2}
                  size={8}
                />
                <rect
                  x={REPORT_X}
                  y={y - 22}
                  width="160"
                  height="44"
                  rx="9"
                  fill="rgba(168,85,247,0.08)"
                  stroke={colour}
                  strokeOpacity={flagged ? 0.8 : 0.35}
                  strokeWidth="1"
                />
                {[0, 1, 2, 3, 4, 5].map(b => (
                  <rect
                    key={b}
                    x={REPORT_X + 16 + b * 23}
                    y={y - 9 + (b % 2 === 0 ? 0 : 5)}
                    width="14"
                    height={b % 2 === 0 ? 18 : 13}
                    rx="2"
                    fill={colour}
                    opacity={flagged ? 0.7 : 0.45}
                  />
                ))}
                {flagged && (
                  <text
                    x={REPORT_X + 80}
                    y={y + 38}
                    textAnchor="middle"
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
            // 60/156/252 spans 43-269, close to the reports' 34-292 and the
            // grid's 24-290. At 95/170/245 the agents column was 108px shorter
            // than everything else and the right side floated.
            const y = 70 + i * 96;
            return (
              <g key={i}>
                <BlockChain
                  from={[REPORT_X + 164, 194]}
                  c1={[REPORT_X + 230, 194]}
                  c2={[AGENT_X - 80, y]}
                  to={[AGENT_X - 12, y]}
                  colour={hex(VIOLET)}
                  n={14}
                  dur={3.6}
                  size={7}
                />
                <rect
                  x={AGENT_X}
                  y={y - 22}
                  width="44"
                  height="44"
                  rx="12"
                  fill="rgba(168,85,247,0.14)"
                  stroke={hex(VIOLET)}
                  strokeOpacity="0.55"
                />
                <circle cx={AGENT_X + 22} cy={y} r="5.5" fill={hex(VIOLET)} opacity="0.9" />
                {[0, 1, 2].map(t => (
                  <rect
                    key={t}
                    x={AGENT_X + 56}
                    y={y - 13 + t * 11}
                    width={t === 1 ? 70 : 50}
                    height="5"
                    rx="2"
                    fill={hex(VIOLET)}
                    opacity="0.3"
                  />
                ))}
              </g>
            );
          })}
          {/* ---- stage labels, anchored under the thing they name ---- */}
          {[
            { n: "01", label: "CLEAN", cx: 156 },
            { n: "02", label: "MODEL", cx: 376 },
            { n: "03", label: "ALERT", cx: 620 },
            { n: "04", label: "ACT", cx: 893 },
          ].map(st => (
            <g key={st.n}>
              <text
                x={st.cx}
                y="318"
                textAnchor="middle"
                fill={hex(VIOLET)}
                fontSize="10"
                letterSpacing="0.22em"
                opacity="0.7"
              >
                {st.n}
              </text>
              <text
                x={st.cx}
                y="333"
                textAnchor="middle"
                fill="#C9D2E4"
                fontSize="12.5"
                letterSpacing="0.22em"
                fontWeight="600"
              >
                {st.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/*
        Captions sit under the stage they describe — column widths are set in
        globals.css (.flow-captions) from the midpoints between stage centres,
        because the four stages are not evenly spaced across the SVG.

        The CLEAN / MODEL / ALERT / ACT label lives in the SVG on desktop, so it
        is md:hidden here to avoid printing each title twice. Below md the SVG is
        gone, so the label has to come back or the paragraphs lose their headings.
      */}
      <div className="mt-7 grid grid-cols-1 gap-8 md:gap-5 flow-captions">
        {[
          {
            n: "01",
            label: "Clean",
            d: "Every system in, deduplicated and reconciled.",
            key: "pii" as const,
            keyText: "Personal data obscured at ingest",
          },
          {
            n: "02",
            label: "Model",
            d: "Recorded once in BigQuery and never rewritten — every activity with its cost, revenue, conversion and time.",
          },
          {
            n: "03",
            label: "Alert",
            d: "A conscious, real-time view of the business, focused on the next best action.",
            key: "amber" as const,
            keyText: "The one thing that needs you now",
          },
          {
            n: "04",
            label: "Act",
            d: "Agents work the exception off the back of it, rather than just noticing it.",
          },
        ].map(s => (
          <div key={s.n} className="md:text-center">
            {/* Mobile-only heading — the SVG label carries it on desktop. */}
            <div className="md:hidden text-[11px] font-medium uppercase tracking-[0.2em] text-electric">
              {s.n} · {s.label}
            </div>
            <p className="mt-2 md:mt-0 mx-auto max-w-[32ch] text-sm text-muted-foreground leading-relaxed">
              {s.d}
            </p>

            {s.key && (
              <p className="mt-3 flex items-center gap-2 md:justify-center text-xs text-muted-foreground">
                {s.key === "pii" ? (
                  <svg width="11" height="11" aria-hidden className="shrink-0">
                    <rect
                      x="0.6"
                      y="0.6"
                      width="9.8"
                      height="9.8"
                      rx="2"
                      fill="none"
                      stroke={LILAC}
                      strokeWidth="1.2"
                      strokeOpacity="0.75"
                    />
                  </svg>
                ) : (
                  <span
                    aria-hidden
                    className="h-[11px] w-[11px] shrink-0 rounded-[2px]"
                    style={{ background: AMBER, opacity: 0.8 }}
                  />
                )}
                {s.keyText}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

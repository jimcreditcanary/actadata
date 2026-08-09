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

/**
 * Three source hues, pushed further apart than the first attempt — the point of
 * the stage is that separate systems arrive separately, and a near-violet trio
 * read as one field. Still all in the violet family so the palette holds.
 */
const BANDS: RGB[] = [
  [0x4f, 0x46, 0xe5], // indigo
  [0xa8, 0x55, 0xf7], // violet
  [0xe8, 0x35, 0xd8], // magenta
];

/** Vertical gutter between bands, so three sources read as three groups. */
const BAND_GUTTER = 6;
const BAND_ROWS = 6;

const VB_W = 1000;
/** Extra height over the 292px content: room for the stage labels. */
const VB_H = 336;
/**
 * On the lattice, at latX(29) — written literally because the lattice helpers are
 * defined below it. Roughly centred between the grid's right edge (313) and the
 * reports (540): 101px of clearance left, 94px right.
 *
 * It matters that this is a lattice column: the feeds end one column short of the
 * bar, so a non-lattice bar left a 13px hole where the system's only gap is 3px.
 */
const LAYER_X = 414;
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
const PITCH = CELL + 3;
const GRID_X0 = 8;
const GRID_Y0 = 24;
/**
 * 20 columns. The grid was carrying roughly 70% of the visual weight of the
 * whole diagram; at 20 it ends at x=304 against the layer at 360, and the width
 * freed up goes to the reports and agents so all four zones read as peers.
 */
const COLS = 22;
const ROWS = 18;

/** Row y, including the gutter that separates each band of sources. */
const rowY = (r: number) => GRID_Y0 + r * PITCH + Math.floor(r / BAND_ROWS) * BAND_GUTTER;

const GRID_RIGHT = GRID_X0 + (COLS - 1) * PITCH + CELL;

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
 * ONE LATTICE.
 *
 * Every square in this diagram — grid cells, feeds, report chains, agent chains
 * — sits on the same 14px pitch at the same 11px size. It did not used to: the
 * chains placed continuously-positioned rects of 7, 8 and 9→5.5px along bezier
 * curves, which is why the squares looked like two different systems and why the
 * feeds visibly overlapped the grid's last columns.
 *
 * Column positions come from the grid's own origin. Row positions to the RIGHT of
 * the grid use a uniform lattice anchored on the layer's centre line, because the
 * grid's rowY() carries band gutters that only mean something inside the grid.
 * Inside band 1 the two agree exactly (rowY(9) === MID), so the join is seamless.
 */
const latX = (col: number) => GRID_X0 + col * PITCH;
const latY = (k: number) => MID + k * PITCH;

/** Nearest lattice column/row to an arbitrary point. */
const snapCol = (x: number) => Math.round((x - GRID_X0) / PITCH);
const snapRow = (y: number) => Math.round((y - MID) / PITCH);

/**
 * Samples a bezier densely, snaps each sample to the lattice, and returns the
 * ordered unique cells.
 *
 * The dense-sample-then-dedupe is the whole trick. Sampling n times and snapping
 * gives duplicates wherever the curve runs shallow — two rects stacked in one
 * cell, which is exactly the overlap this is meant to remove — so it oversamples
 * and drops repeats instead.
 */
function latticePath(from: Point, c1: Point, c2: Point, to: Point, samples = 240) {
  const cells: { col: number; k: number }[] = [];
  for (let i = 0; i <= samples; i++) {
    const [x, y] = bezier(from, c1, c2, to, i / samples);
    const col = snapCol(x);
    const k = snapRow(y);
    const last = cells[cells.length - 1];
    if (!last || last.col !== col || last.k !== k) cells.push({ col, k });
  }
  return cells;
}

/**
 * A fan of chains leaving one point, deduped across the whole fan.
 *
 * Chains in a fan share their first cells by definition — they all start at the
 * same place — so rendering them independently stacks four rects in one cell,
 * each with its own animation delay. That builds brightness and flickers exactly
 * where the eye enters the stage. On a lattice a cell holds one square, full stop,
 * so the fan is resolved before anything is drawn.
 */
function ChainFan({
  chains,
  dur,
}: {
  chains: { from: Point; c1: Point; c2: Point; to: Point; colour: string; priority?: number }[];
  dur: number;
}) {
  const claimed = new Map<
    string,
    { col: number; k: number; colour: string; i: number; n: number; pr: number }
  >();

  chains.forEach(ch => {
    const cells = latticePath(ch.from, ch.c1, ch.c2, ch.to);
    const n = cells.length;
    cells.forEach(({ col, k }, i) => {
      const key = `${col},${k}`;
      const pr = ch.priority ?? 0;
      const held = claimed.get(key);
      /* Higher priority wins a contested cell, so the flagged amber route stays
         unbroken where it crosses the violet ones. Ties keep the first claim. */
      if (!held || pr > held.pr) claimed.set(key, { col, k, colour: ch.colour, i, n, pr });
    });
  });

  return (
    <>
      {[...claimed.values()].map(({ col, k, colour, i, n }) => (
        <rect
          key={`${col}-${k}`}
          className="blk-pulse"
          x={latX(col)}
          y={latY(k)}
          width={CELL}
          height={CELL}
          rx="2"
          fill={colour}
          style={{
            ["--o" as string]: 0.22,
            ["--o2" as string]: 1,
            animationDuration: `${dur}s`,
            animationDelay: `${(-dur * (1 - i / n)).toFixed(2)}s`,
          }}
        />
      ))}
    </>
  );
}

/**
 * The feeds from the grid into the layer.
 *
 * Two earlier versions were wrong in opposite ways. The first was a bezier
 * starting three columns INSIDE the grid with squares shrinking 9 → 5.5px, so it
 * overlapped the grid's own cells at a different size. The second put three
 * symmetric staircases onto the layer's centre row — on-lattice and tidy, but it
 * drew a literal arrow pointing at the layer, which is a diagram of an arrow
 * rather than of data arriving.
 *
 * The insight that fixes it: the layer is a 256px-tall bar, so nothing needs to
 * converge on its centre at all. A stream only has to reach its left edge at some
 * height. So these are many mostly-horizontal streams leaving the grid at the row
 * they were already on, wandering a row at a time, entering the bar wherever they
 * happen to arrive.
 *
 * Movement is hash-driven, never random: Math.random would desync the server and
 * client renders. Same seed, same picture, every time.
 */
const FEED_END_COL = COLS + 6;

/** Deterministic 0..1 from two integers. */
const h2 = (a: number, b: number) => (Math.abs(a * 73856093 + b * 19349663) % 1000) / 1000;

function Feeds() {
  /* One cell holds one square, so every stream's cells are claimed into a single
     map before anything renders — the streams cross each other by design, and two
     rects in a cell is the defect this whole lattice exists to prevent. */
  const claimed = new Map<
    string,
    { col: number; k: number; fill: string; delay: number; dur: number }
  >();

  for (let r = 0; r < ROWS; r++) {
    /* Every other grid row spawns a stream. All eighteen filled the corridor into
       a solid block; nine reads as flow. */
    if (r % 2 !== 0) continue;

    const band = BANDS[Math.floor(r / BAND_ROWS) % BANDS.length];
    /* Leave from the row the data is already on, not from a band centre. */
    let k = Math.round((rowY(r) - MID) / PITCH);

    /* Ragged left edge: streams do not all start in the same column, so the grid
       does not look like it has a second border made of feed squares. */
    const startCol = COLS + Math.floor(h2(r, 1) * 3);
    const dur = 2.2 + h2(r, 7) * 1.4;
    const delay = -h2(r, 13) * 3;
    const span = FEED_END_COL - startCol + 1;

    for (let i = 0; i < span; i++) {
      const col = startCol + i;
      const u = (i + 0.5) / span;
      const key = `${col},${k}`;
      if (!claimed.has(key)) {
        claimed.set(key, {
          col,
          k,
          fill: hex(lerp(band, VIOLET, Math.min(1, u * 1.35))),
          delay: delay - dur * (1 - i / span),
          dur,
        });
      }

      /* Decide the next row. Mostly hold — that is what makes the runs read as
         horizontal — with a gentle pull toward the middle and an occasional step
         the other way so the field does not comb itself straight. */
      const t = h2(col * 3 + 1, k * 5 + 2);
      if (t < 0.34 && k !== 0) k += Math.sign(-k);
      else if (t > 0.9 && Math.abs(k) < 9) k += t > 0.95 ? 1 : -1;
    }
  }

  return (
    <>
      {[...claimed.values()].map(({ col, k, fill, delay, dur }) => (
        <rect
          key={`${col}-${k}`}
          className="blk-pulse"
          x={latX(col)}
          y={latY(k)}
          width={CELL}
          height={CELL}
          rx="2"
          fill={fill}
          style={{
            ["--o" as string]: 0.34,
            ["--o2" as string]: 1,
            animationDuration: `${dur.toFixed(2)}s`,
            animationDelay: `${delay.toFixed(2)}s`,
          }}
        />
      ))}
    </>
  );
}

function BackGrid() {
  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    const band = BANDS[Math.floor(r / BAND_ROWS) % BANDS.length];
    for (let c = 0; c < COLS; c++) {
      const t = c / (COLS - 1);
      const x = GRID_X0 + c * PITCH;
      const y = rowY(r);

      // Hold the source colour for the first third, then resolve to violet by
      // 85% across. Blending from the very first column made the three sources
      // look like one field, which is the opposite of the point.
      const mix = Math.max(0, Math.min(1, (t - 0.35) / 0.5));
      const fill = hex(lerp(band, VIOLET, mix));
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
              <stop offset="70%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="grid-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={GRID_RIGHT + 8} height={VB_H}>
              <rect x="0" y="0" width={GRID_RIGHT + 8} height={VB_H} fill="url(#grid-fade)" />
            </mask>
          </defs>

          <ellipse cx={LAYER_X + LAYER_W / 2} cy={MID} rx="150" ry="170" fill="url(#flow-glow)" />

          {/* ---- STAGE 1: the grid, dissolving into the layer ---- */}
          <g mask="url(#grid-mask)">
            <BackGrid />
          </g>

          {/* Three feeds converging on the layer — this is the distillation, and
              the only place the diagram shows many-becoming-one as motion rather
              than as a gradient. Each chain carries its source colour and turns
              violet as it arrives. */}
          <Feeds />

          {/* ---- STAGE 2: the single data layer ---- */}
          <rect
            x={LAYER_X}
            y={LAYER_Y}
            width={LAYER_W}
            height={LAYER_H}
            rx="13"
            fill="url(#flow-layer)"
          />
          {Array.from({ length: 9 }, (_, i) => (
            <rect
              key={i}
              x={LAYER_X + Math.round((LAYER_W - CELL) / 2)}
              y={latY(-8 + i * 2)}
              width={CELL}
              height={CELL}
              rx="2"
              fill="#0A1020"
              opacity="0.55"
            />
          ))}

          {/* ---- STAGE 3: reports, fed by chains of blocks ---- */}
          <ChainFan
            dur={3.2}
            chains={[0, 1, 2, 3].map(i => {
              const y = 54 + i * 70;
              const flagged = i === 2;
              return {
                from: [LAYER_X + LAYER_W + 4, MID] as Point,
                c1: [LAYER_X + 110, MID] as Point,
                c2: [REPORT_X - 110, y] as Point,
                to: [REPORT_X - 12, y] as Point,
                colour: flagged ? AMBER : hex(VIOLET),
                priority: flagged ? 1 : 0,
              };
            })}
          />

          {[0, 1, 2, 3].map(i => {
            const y = 54 + i * 70;
            const flagged = i === 2;
            const colour = flagged ? AMBER : hex(VIOLET);
            return (
              <g key={i}>
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
                {[0, 1, 2, 3, 4].map(b => (
                  <rect
                    key={b}
                    x={latX(40 + b * 2)}
                    y={y - 9 + (b % 2 === 0 ? 0 : 5)}
                    width={CELL}
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
          <ChainFan
            dur={3.6}
            chains={[0, 1, 2].map(i => ({
              from: [REPORT_X + 164, 194] as Point,
              c1: [REPORT_X + 230, 194] as Point,
              c2: [AGENT_X - 80, 70 + i * 96] as Point,
              to: [AGENT_X - 12, 70 + i * 96] as Point,
              colour: hex(VIOLET),
            }))}
          />

          {[0, 1, 2].map(i => {
            // 60/156/252 spans 43-269, close to the reports' 34-292 and the
            // grid's 24-290. At 95/170/245 the agents column was 108px shorter
            // than everything else and the right side floated.
            const y = 70 + i * 96;
            return (
              <g key={i}>
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
            { n: "01", label: "CLEAN", cx: 160 },
            { n: "02", label: "MODEL", cx: 426 },
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
      {/*
        Below md these four are the whole diagram, and as loose centred text
        blocks with 32px gaps they read as fragments floating in space. So on
        mobile each stage becomes a numbered card and each key fact becomes a
        chip — every mobile-only style is reset at md, where the SVG is back and
        the captions are supposed to sit quietly underneath it.
      */}
      <div className="mt-7 grid grid-cols-1 gap-3 md:gap-5 flow-captions">
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
          <div
            key={s.n}
            className="rounded-xl border border-white/[0.07] bg-navy-100/40 p-4 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:text-center"
          >
            {/* Mobile-only heading — the SVG label carries it on desktop. */}
            <div className="md:hidden flex items-baseline gap-2.5">
              <span className="font-display text-sm tabular-nums text-electric/45">{s.n}</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-electric">
                {s.label}
              </span>
            </div>
            <p className="mt-2 md:mt-0 md:mx-auto md:max-w-[32ch] text-sm text-muted-foreground leading-relaxed">
              {s.d}
            </p>

            {s.key && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-navy/70 px-2.5 py-1.5 text-xs text-muted-foreground md:mt-3 md:flex md:justify-center md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0">
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

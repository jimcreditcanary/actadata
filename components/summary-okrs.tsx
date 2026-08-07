/**
 * OKR tracking against target.
 *
 * The bar shows progress; the tick shows where the business should be by now
 * (pace), which is the difference between a progress bar and target tracking —
 * 60% of the way to a number is good in month eleven and a problem in month two.
 * Status is derived from progress against pace, never hand-set, so the colour
 * can never disagree with the numbers next to it.
 */
export type Okr = {
  objective: string;
  result: string;
  /** Current value and target, already formatted for display. */
  current: string;
  target: string;
  /** 0–100, progress toward target. */
  progress: number;
  /** 0–100, where they should be by this point in the quarter. */
  pace: number;
};

const VIOLET = "#A855F7";
const AMBER = "#FCD34D";

function status(progress: number, pace: number) {
  const delta = progress - pace;
  if (delta >= -2) return { label: "On track", colour: VIOLET, tone: "text-electric" };
  if (delta >= -12) return { label: "At risk", colour: AMBER, tone: "text-amber-300" };
  return { label: "Behind", colour: AMBER, tone: "text-amber-300" };
}

export function SummaryOkrs({ okrs }: { okrs: Okr[] }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-navy-100/40 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Objectives this quarter
          </div>
          <div className="mt-0.5 text-sm text-foreground">Tracked against target, not vibes</div>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-[2px]" style={{ background: VIOLET }} /> On track
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-[2px]" style={{ background: AMBER }} /> At risk
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-px bg-white/45" /> Pace
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {okrs.map(o => {
          const st = status(o.progress, o.pace);
          return (
            <div key={o.objective}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="min-w-0">
                  <div className="text-sm font-medium tracking-tight text-foreground truncate">
                    {o.objective}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{o.result}</div>
                </div>
                <div className="flex shrink-0 items-baseline gap-2 text-sm tabular-nums">
                  <span className="font-semibold text-foreground">{o.current}</span>
                  <span className="text-xs text-muted-foreground">of {o.target}</span>
                  <span className={`text-[11px] uppercase tracking-[0.14em] ${st.tone}`}>
                    {st.label}
                  </span>
                </div>
              </div>

              {/* Track, fill, and the pace marker */}
              <div className="relative mt-2.5 h-2 rounded-full bg-white/[0.07]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${o.progress}%`, background: st.colour, opacity: 0.85 }}
                />
                <div
                  aria-hidden
                  className="absolute -top-1 bottom-[-4px] w-px bg-white/50"
                  style={{ left: `${o.pace}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

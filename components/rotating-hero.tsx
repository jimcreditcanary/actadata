"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EYEBROW = "Data and AI, built for operations.";
const HEADLINE = ["The data layer", "AI needs."];

/**
 * Five clauses, each of which completes "The data layer AI needs..." as an
 * attribute of the offer. Two were dropped for changing the subject rather than
 * describing the layer: "Then agents that act on it." and "A customer experience
 * that adapts."
 *
 * "Yours, handed over, done." lands last on purpose — ownership is the closing
 * argument, not the opening one. "No black boxes. No lock-in." carries the ethos
 * from /about into the hero, and sits away from "No hires. No re-platform." so the
 * two "No..." lines never run back to back.
 *
 * Clause 1 renders first on load, is what most visitors see, and is the one baked
 * into the <h1> for screen readers and SEO — so order matters.
 */
const CLAUSES = [
  "Insight your operators trust.",
  "No black boxes. No lock-in.",
  "Live in weeks, not years.",
  "No hires. No re-platform.",
  "Yours, handed over, done.",
];

/**
 * ONE live node, whose text is swapped while it is fully transparent.
 *
 * The previous version stacked all five clauses in the same grid cell and
 * animated their opacities against each other. Even sequenced out-then-in, that
 * approach has three ways to show two clauses at once — a delayed transition
 * interrupted by a hover-pause, a tab-away that suspends transitions mid-flight,
 * or timer drift against the transition clock — and any of them double-exposes the
 * glyphs. With a single node it is not a matter of timing: there is only ever one
 * string in the DOM to paint.
 *
 * The swap is driven by `transitionend`, not by a timer racing it, so the text
 * cannot change while it is even fractionally visible. A timer remains as a safety
 * net for the cases where `transitionend` never arrives (background tab).
 *
 * Two details that were the actual source of the "clunky" look:
 *
 * 1. `will-change: opacity` promotes the clause to its own compositing layer.
 *    Without it the browser renders text with subpixel antialiasing at opacity 1
 *    and switches to greyscale antialiasing the moment opacity drops below 1 —
 *    so every fade ended with a visible snap in glyph weight. On its own layer the
 *    text is rasterised once and only composited, so the letterforms are identical
 *    at every opacity.
 * 2. Curves that suit each direction. The fade out is linear, so the outgoing
 *    clause loses legibility at an even rate and is gone when it says it is —
 *    an eased exit holds near full opacity for much of its duration and then
 *    disappears, which reads as a cut rather than a fade. The fade in
 *    decelerates, so it settles rather than arriving flat.
 */
/**
 * Zero overlap and zero blank are mutually exclusive for a fade in one place: the
 * incoming clause can only start once the outgoing one has reached nothing, so
 * there is always a beat with no clause on screen. 170ms of that read as a blink,
 * so the exit is short enough to be a beat rather than an absence — the eye barely
 * registers 120ms — and the entrance takes its time.
 */
const HOLD_MS = 2600;
const FADE_OUT_MS = 120;
const FADE_IN_MS = 280;
/** Only used if `transitionend` never fires. */
const SAFETY_MS = FADE_OUT_MS + 120;

const OUT_EASING = "linear";
const IN_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Hero headline with one rotating clause.
 *
 * Height is reserved by layout, not measurement: a hidden clone of every clause
 * shares one CSS grid cell, so the tallest clause fixes the block height for good
 * and nothing below the hero can ever move. The clones use `visibility: hidden`
 * rather than `opacity: 0` — visibility never paints, so they cannot contribute a
 * stray glyph.
 *
 * Accessibility: the <h1> contains the two grey lines plus clause 1 in a
 * visually-hidden span, and the rotating block is aria-hidden. Without that,
 * screen readers read all five clauses as one run-on heading. Clause 1 is
 * therefore duplicated in the DOM by design.
 *
 * With JS disabled this still renders a complete static hero showing clause 1.
 */
export function RotatingHero({ children }: { children?: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);
  const [paused, setPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  /** Guards against the safety timer and transitionend both advancing. */
  const advancing = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  /* Hold, then start the fade out. Pausing only ever happens from a visible
     clause — freezing on a blank line would be worse than not pausing at all. */
  useEffect(() => {
    if (!shown || reduced || paused || tabHidden) return;
    const id = window.setTimeout(() => setShown(false), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [shown, index, reduced, paused, tabHidden]);

  const advance = () => {
    if (advancing.current) return;
    advancing.current = true;
    setIndex(i => (i + 1) % CLAUSES.length);
    setShown(true);
  };

  /* Safety net only. The real trigger is onTransitionEnd below. */
  useEffect(() => {
    if (shown) return;
    const id = window.setTimeout(advance, SAFETY_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  useEffect(() => {
    if (shown) advancing.current = false;
  }, [shown, index]);

  return (
    // Focus handlers stay on the whole block, in capture phase, so tabbing to a
    // CTA pauses the rotation. Hover-pause does NOT live here: this wrapper spans
    // the entire hero, so any cursor resting in the top-left of the page — which is
    // most of them — froze the rotation indefinitely. Hover-pause is on the clause
    // itself instead, where it means "let me finish reading this".
    <div onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <p className="mb-5 text-sm font-medium tracking-[0.04em] text-hero-eyebrow sm:text-base">
        {EYEBROW}
      </p>

      <h1 className="font-display max-w-5xl text-4xl leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-7xl">
        <span className="block text-foreground">
          {HEADLINE.map(line => (
            // Trailing space keeps the accessible string "The data layer AI needs."
            // rather than running the two block lines together.
            <span key={line} className="block">
              {line}{" "}
            </span>
          ))}
        </span>

        {/* The one clause the heading carries for screen readers and SEO. The
            rotating clause below is decorative and sits OUTSIDE the <h1>, so a
            text-only extraction of the heading yields exactly
            "The data layer AI needs. Insight your operators trust." — not the
            five clauses plus their height-reservation clones run together. */}
        <span className="sr-only"> {CLAUSES[0]}</span>
      </h1>

      {/* Rotating third line — visually the close of the headline, but aria-hidden
          and not inside the <h1> so it adds no duplicate text to the heading. It
          repeats the h1's type styles so it reads as the same line of display. */}
      <div
        aria-hidden="true"
        className="font-display max-w-5xl text-4xl leading-[1.08] tracking-[-0.02em] text-electric grid sm:text-5xl lg:text-7xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Height reservation. Never painted — visibility:hidden, not opacity. */}
        {CLAUSES.map(clause => (
          <span key={clause} className="col-start-1 row-start-1 invisible">
            {clause}
          </span>
        ))}

        {/* The only clause that ever paints. */}
        <span
          className="col-start-1 row-start-1"
          style={{
            opacity: reduced ? 1 : shown ? 1 : 0,
            transitionProperty: reduced ? "none" : "opacity",
            transitionDuration: `${shown ? FADE_IN_MS : FADE_OUT_MS}ms`,
            transitionTimingFunction: shown ? IN_EASING : OUT_EASING,
            // Keeps the glyphs on one compositing layer, so antialiasing does
            // not switch mode part-way through the fade.
            willChange: "opacity",
          }}
          onTransitionEnd={e => {
            if (e.propertyName !== "opacity") return;
            if (!shown) advance();
          }}
        >
          {CLAUSES[index]}
        </span>
      </div>

      {children}
    </div>
  );
}

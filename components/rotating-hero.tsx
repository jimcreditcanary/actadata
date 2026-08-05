"use client";
import { useEffect, useState, type ReactNode } from "react";

const EYEBROW = "Built, handed over, done.";
const HEADLINE = ["The data layer", "AI needs."];

/**
 * Order matters — clause 1 renders first on load and is the one most visitors
 * see. It is also the clause baked into the <h1> for screen readers and SEO.
 */
/**
 * Three clauses, each of which completes "The data layer AI needs..." as an
 * attribute of the offer. Two were dropped for changing the subject rather than
 * describing the layer: "Then agents that act on it." and "A customer experience
 * that adapts."
 *
 * Clause 1 is also the one baked into the <h1> for screen readers and SEO, so
 * order still matters.
 */
const CLAUSES = [
  "Insight your operators trust.",
  "Live in weeks, not years.",
  "No hires. No re-platform.",
];

/**
 * Dwell per clause. Was 4500ms (the original brief's figure), which meant a
 * 22.5s cycle — most visitors saw one clause and left. 3000ms gives a 15s cycle
 * and reads as alive without being distracting.
 */
const INTERVAL_MS = 3000;

/**
 * The swap is sequential, not a crossfade: the outgoing clause fades out first,
 * then the incoming one fades in after it has cleared. A true crossfade means
 * both are partly visible at once, and at this type size the glyphs overlap into
 * a double-exposure — very obvious on mobile.
 *
 * Durations are set inline, NOT via duration-[Nms]: that arbitrary Tailwind class
 * silently fails to generate in this repo, which left the fade at the 150ms
 * default for the life of the component. Same trap as the nav stagger.
 */
const FADE_OUT_MS = 200;
const FADE_IN_MS = 260;

/**
 * Hero headline with one crossfading clause.
 *
 * Height is reserved by layout, not measurement: every clause occupies the same
 * CSS grid cell, so the tallest one fixes the block height for good and nothing
 * below the hero can move. Only opacity animates — no transforms.
 *
 * Accessibility: the <h1> contains the two grey lines plus clause 1 in a
 * visually-hidden span, and the rotating stack is aria-hidden. Without that,
 * screen readers read all five clauses as one run-on heading. Clause 1 is
 * therefore duplicated in the DOM by design; rendering it conditionally instead
 * would reintroduce layout shift.
 *
 * With JS disabled this still renders a complete static hero showing clause 1.
 */
export function RotatingHero({ children }: { children?: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sync = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (reduced || paused || hidden) return;
    const id = window.setInterval(
      () => setIndex(i => (i + 1) % CLAUSES.length),
      INTERVAL_MS
    );
    return () => window.clearInterval(id);
  }, [reduced, paused, hidden]);

  return (
    // Focus handlers stay on the whole block, in capture phase, so tabbing to a
    // CTA pauses the rotation. Hover-pause does NOT live here: this wrapper spans
    // the entire hero, so any cursor resting in the top-left of the page — which
    // is most of them — froze the rotation indefinitely. Hover-pause is on the
    // clause itself instead, where it means "let me finish reading this".
    <div
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
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

        <span className="sr-only"> {CLAUSES[0]}</span>

        <span
          aria-hidden="true"
          className="grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {CLAUSES.map((clause, i) => {
            const active = i === index;
            return (
              <span
                key={clause}
                className="col-start-1 row-start-1 text-electric transition-opacity ease-out motion-reduce:transition-none"
                style={{
                  opacity: active ? 1 : 0,
                  transitionDuration: `${active ? FADE_IN_MS : FADE_OUT_MS}ms`,
                  // The incoming clause waits for the outgoing one to clear.
                  transitionDelay: active ? `${FADE_OUT_MS}ms` : "0ms",
                }}
              >
                {clause}
              </span>
            );
          })}
        </span>
      </h1>

      {children}
    </div>
  );
}

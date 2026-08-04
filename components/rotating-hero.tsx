"use client";
import { useEffect, useState, type ReactNode } from "react";

const EYEBROW = "Built, handed over, done.";
const HEADLINE = ["The data layer", "AI needs."];

/**
 * Order matters — clause 1 renders first on load and is the one most visitors
 * see. It is also the clause baked into the <h1> for screen readers and SEO.
 */
const CLAUSES = [
  "Then agents that act on it.",
  "Insight your operators trust.",
  "A customer experience that adapts.",
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
 * Crossfade. Set inline, NOT via duration-[450ms]: that arbitrary Tailwind class
 * silently failed to generate, leaving the crossfade at the 150ms default for
 * the life of the component. Same trap as the nav stagger.
 */
const FADE_MS = 450;

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
    // Subhead and CTAs come through as children so that hovering or focusing
    // anything in the hero — a CTA included — pauses the rotation. Capture-phase
    // focus handlers are what make keyboard focus on a button count.
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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

        <span aria-hidden="true" className="grid">
          {CLAUSES.map((clause, i) => (
            <span
              key={clause}
              className="col-start-1 row-start-1 text-electric transition-opacity ease-out motion-reduce:transition-none"
              style={{ opacity: i === index ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
            >
              {clause}
            </span>
          ))}
        </span>
      </h1>

      {children}
    </div>
  );
}

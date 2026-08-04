/**
 * Small block mosaic — a dense grid of cells at varying opacity.
 *
 * Purely textural, so it is kept deliberately restrained: one hue, no
 * animation, low contrast. Used in the header's dead space, where it hands over
 * to the nav links on scroll. Anywhere it would sit behind text, don't.
 *
 * The pattern is deterministic (seeded, not random) so server and client render
 * identically — Math.random() here would cause a hydration mismatch.
 */
export function BlockGrid({
  rows = 3,
  cols = 28,
  className = "",
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  const cells = Array.from({ length: rows * cols }, (_, i) => {
    // Cheap deterministic hash — spreads lit cells without clustering.
    const n = (i * 2654435761) % 4294967296;
    const v = (n / 4294967296 + Math.sin(i * 0.7) * 0.5 + 0.5) % 1;
    return v;
  });

  return (
    <div
      aria-hidden
      className={`grid gap-[3px] ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 5px)` }}
    >
      {cells.map((v, i) => (
        <span
          key={i}
          className="h-[5px] w-[5px] rounded-[1px] bg-electric"
          // Harder lit/unlit split than a smooth ramp — that contrast is what
          // makes a grid read as state rather than as noise.
          style={{ opacity: v > 0.84 ? 0.75 : v > 0.6 ? 0.28 : 0.09 }}
        />
      ))}
    </div>
  );
}

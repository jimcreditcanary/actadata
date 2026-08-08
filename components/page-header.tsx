import { Eyebrow } from "@/components/eyebrow";

/**
 * Shared header for interior pages, so every route opens the same way and no
 * page has to reinvent its own spacing. Sits under the fixed nav.
 */
export function PageHeader({
  eyebrow,
  title,
  accent,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Second half of the headline, in the accent colour. */
  accent?: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.04]">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-100 via-navy to-navy pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-30%] left-[8%] h-[420px] w-[420px] rounded-full bg-electric/20 blur-[130px] mix-blend-screen" />
        <div className="absolute top-[-20%] right-[-4%] h-[360px] w-[360px] rounded-full bg-sky/20 blur-[140px] mix-blend-screen" />
      </div>
      <div className="absolute inset-0 bg-terminal-grid opacity-[0.10] pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />

      <div className="container relative pt-28 pb-12 md:pt-40 md:pb-20">
        <Eyebrow accent className="mb-5">{eyebrow}</Eyebrow>
        <h1 className="font-display max-w-4xl text-4xl md:text-6xl tracking-tight leading-[1.06]">
          {title}
          {accent && (
            <>
              {" "}
              <span className="text-electric">{accent}</span>
            </>
          )}
        </h1>
        {lede && (
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">{lede}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

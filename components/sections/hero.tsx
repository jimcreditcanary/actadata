import { Button } from "@/components/ui/button";
import { RotatingHero } from "@/components/rotating-hero";
import { entryMonthlyK } from "@/lib/economics";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* ---- ABSTRACT BACKGROUND LAYERS ---- */}
      {/* base wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-100 via-navy to-navy pointer-events-none" />

      {/* aurora gradient blobs — drift slowly, GPU accelerated */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] h-[640px] w-[640px] rounded-full bg-electric/25 blur-[140px] mix-blend-screen animate-aurora-a" />
        <div className="absolute top-[8%] right-[-6%] h-[560px] w-[560px] rounded-full bg-sky/30 blur-[150px] mix-blend-screen animate-aurora-b" />
        <div className="absolute bottom-[-15%] left-[30%] h-[520px] w-[520px] rounded-full bg-electric/15 blur-[140px] mix-blend-screen animate-aurora-c" />
      </div>

      {/* topographic / data-flow SVG — abstract concentric arcs */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="topoStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#A855F7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.20" />
          </linearGradient>
          <radialGradient id="topoCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#A855F7" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* concentric warped arcs that suggest a topographic map / data wavefronts */}
        <g fill="none" stroke="url(#topoStroke)" strokeWidth="1">
          <path d="M -200 640 C 200 540, 600 720, 1000 580 S 1640 660, 1640 660" />
          <path d="M -200 580 C 220 500, 600 660, 1020 540 S 1640 600, 1640 600" />
          <path d="M -200 520 C 240 460, 620 600, 1040 500 S 1640 540, 1640 540" />
          <path d="M -200 460 C 260 420, 640 540, 1060 460 S 1640 480, 1640 480" />
          <path d="M -200 400 C 280 380, 660 480, 1080 420 S 1640 420, 1640 420" />
          <path d="M -200 340 C 300 340, 680 420, 1100 380 S 1640 360, 1640 360" />
          <path d="M -200 280 C 320 300, 700 360, 1120 340 S 1640 300, 1640 300" />
        </g>
        <circle cx="1080" cy="220" r="240" fill="url(#topoCore)" />
      </svg>

      {/* terminal grid, very subtle */}
      <div className="absolute inset-0 bg-terminal-grid opacity-[0.12] pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />

      {/* film grain */}
      <div className="absolute inset-0 bg-grain opacity-[0.35] pointer-events-none mix-blend-overlay" />

      {/* fade to next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />

      {/* ---- HERO CONTENT ---- */}
      <div className="container relative pt-28 pb-32 md:pt-36 md:pb-40">
        <RotatingHero>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Timely data, recorded once and never rewritten, in a single source your
            whole business agrees on — and the shape AI actually works with. All on
            Google, in your own secure, scalable environment. Live in weeks, not years —
            handed over to you, or run by us.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild variant="electric" size="lg">
              <a href="#how">See how it works →</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">Talk to us</a>
            </Button>
          </div>
        </RotatingHero>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
          {[
            ["Start", "Immediately"],
            ["Stack", "Google · BigQuery · Claude"],
            ["Cost", `From £${entryMonthlyK}k / month`],
            ["Ownership", "100% yours"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-white/[0.08] bg-card/40 backdrop-blur px-4 py-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
              <div className="mt-1 font-semibold text-foreground">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

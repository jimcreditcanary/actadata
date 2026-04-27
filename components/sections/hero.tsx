import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-terminal-grid opacity-[0.18] pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="absolute inset-x-0 top-0 h-[700px] bg-grid-fade pointer-events-none" />
      <div className="container relative pt-20 pb-28 md:pt-28 md:pb-36">
        <Badge variant="electric" className="mb-6 gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
          Data &amp; AI consultancy
        </Badge>
        <h1 className="max-w-4xl text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.02]">
          Your entire data function.{" "}
          <span className="text-electric">Built, handed over, done.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
          Acta builds the data capability your consumer business actually needs —
          integrations, warehouse, ETL, metric trees, board-grade reporting and
          LLM readiness — in months, not years. You own the output.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button asChild variant="electric" size="lg">
            <a href="#summary">See how it works →</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#contact">Talk to us</a>
          </Button>
        </div>

        {/* trust strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
          {[
            ["Start", "Inside a week"],
            ["Build", "12 months"],
            ["Cost", "From £10k / month"],
            ["Ownership", "100% yours"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-white/[0.06] bg-card/50 backdrop-blur px-4 py-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
              <div className="mt-1 font-semibold text-foreground">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

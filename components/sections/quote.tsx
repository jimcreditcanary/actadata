import { Badge } from "@/components/ui/badge";

/**
 * PLACEHOLDER quote — swap `quote`, `name`, `title`, `company` for real
 * attribution before going public. Keep voice operator-flavoured (CEO/COO/CFO).
 */
const quote = {
  text:
    "They embedded inside our operating cadence in a fortnight and shipped a Summary Page our board now opens before every meeting. We saved a year of hiring and ended up with a better answer.",
  name: "Operator name",
  title: "Chief Operating Officer",
  company: "Past client (placeholder)",
};

export function Quote() {
  return (
    <section className="relative py-24 md:py-28 border-t border-white/[0.04]">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="relative rounded-2xl border border-white/[0.06] bg-card/60 backdrop-blur p-8 md:p-14 overflow-hidden">
            {/* atmospheric glow */}
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-electric/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-sky/10 blur-3xl pointer-events-none" />

            <div className="relative">
              <Badge variant="muted" className="mb-6">In their words</Badge>

              {/* oversized opening quote mark */}
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute -left-3 -top-10 md:-top-14 select-none font-semibold text-electric/20 leading-none"
                  style={{ fontSize: "clamp(120px, 14vw, 200px)" }}
                >
                  &ldquo;
                </span>

                <blockquote className="relative text-2xl md:text-3xl lg:text-[34px] leading-[1.25] tracking-tight text-foreground/95 font-medium">
                  {quote.text}
                </blockquote>
              </div>

              <figcaption className="mt-8 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-electric/30 bg-electric/10 font-semibold text-electric">
                  {quote.name.split(" ").map(s => s[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-foreground">{quote.name}</div>
                  <div className="text-muted-foreground">
                    {quote.title} · {quote.company}
                  </div>
                </div>
              </figcaption>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

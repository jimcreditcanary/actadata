import { Eyebrow } from "@/components/eyebrow";
import { FlowDiagram } from "@/components/flow-diagram";

export function HowItWorks() {
  return (
    <section id="how" className="relative py-20 md:py-24 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">How it works</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Everything in.{" "}
            <span className="text-electric">One layer. Then it works for you.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Most businesses have the data and none of the leverage — a dozen systems, none of
            them agreeing. We collapse them into one modelled layer, and everything after that
            gets cheap: the reporting, the exceptions, the agents.
          </p>
        </div>

        <div className="mt-10">
          <FlowDiagram />
        </div>
      </div>
    </section>
  );
}

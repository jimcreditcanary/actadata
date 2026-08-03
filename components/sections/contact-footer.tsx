import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function ContactFooter() {
  return (
    <>
      <section id="contact" className="relative py-24 md:py-32 border-t border-white/[0.04]">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="electric" className="mb-6">Let's talk</Badge>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
              Bring one decision your data should be helping you make.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              30 minutes, no deck. We'll tell you on the call whether Acta is the right
              partner — and what we'd ship in the first 30 days.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="electric" size="lg">
                <a href="mailto:hello@actadata.co.uk?subject=Acta%20Data%20%E2%80%94%20scoping%20call">
                  Email hello@actadata.co.uk
                </a>
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Tell us the decision and we&apos;ll come back with times the same day.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.04] py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Logo />
          <div className="text-center md:text-right">
            <div>© {new Date().getFullYear()} Braemar Brook & New Limited T/A ActaData. All rights reserved.</div>
            <div className="mt-1 text-xs">Strategy · Build · Run — for consumer businesses.</div>
          </div>
        </div>
      </footer>
    </>
  );
}

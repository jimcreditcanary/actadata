import { Logo } from "@/components/logo";
import { LeadForm } from "@/components/lead-form";
import { Eyebrow } from "@/components/eyebrow";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/seo";

/**
 * `hideHeading` drops the eyebrow + headline + lede, leaving just the form.
 * Used on /contact, where the PageHeader already carries the same headline —
 * without it the visitor reads the identical line twice.
 */
export function ContactFooter({ hideHeading = false }: { hideHeading?: boolean }) {
  return (
    <>
      <section id="contact" className="relative py-16 md:py-20 border-t border-white/[0.04]">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            {!hideHeading && (
              <>
                <Eyebrow accent className="mb-6">Let&apos;s talk</Eyebrow>
                <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
                  Bring one decision your data should be helping you make.
                </h2>
                <p className="mt-5 text-lg text-muted-foreground">
                  30 minutes, no deck. We&apos;ll tell you on the call whether we&apos;re the right
                  partner, and exactly what we&apos;d ship in the first 30 days.
                </p>
              </>
            )}
            <LeadForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.04] py-10">
        <div className="container flex flex-col md:flex-row items-start justify-between gap-6 text-sm text-muted-foreground">
          <div className="flex flex-col gap-3">
            <Logo />
            <div className="text-xs">Strategy · Build · Run — for consumer businesses.</div>
          </div>
          <div className="md:text-right space-y-1">
            <div className="text-foreground/80">Acta Data Ltd</div>
            <div className="text-xs">
              Registered in England &amp; Wales, company no. 14182372 · ICO reg. ZB502441.
            </div>
            <div className="text-xs">
              Registered office: Chester House, Lloyd Drive, Cheshire Oaks Business Park,
              Ellesmere Port, Cheshire CH65 9HQ.
            </div>
            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 md:justify-end text-xs">
              <a href="/blog" className="hover:text-foreground transition-colors">Writing</a>
              <a href="/faq" className="hover:text-foreground transition-colors">FAQ</a>
              <a href="/what-we-build#data-protection" className="hover:text-foreground transition-colors">Data protection</a>
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacy notice</a>
              <a
                href={`tel:${PHONE_E164}`}
                className="hover:text-foreground transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href="mailto:info@actadata.co.uk"
                className="hover:text-foreground transition-colors"
              >
                info@actadata.co.uk
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

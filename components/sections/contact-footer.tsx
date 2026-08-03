import { Logo } from "@/components/logo";
import { CopyEmail } from "@/components/copy-email";
import { EnquiryDialog } from "@/components/enquiry-dialog";
import { Eyebrow } from "@/components/eyebrow";

export function ContactFooter() {
  return (
    <>
      <section id="contact" className="relative py-24 md:py-32 border-t border-white/[0.04]">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow accent className="mb-6">Let&apos;s talk</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
              Bring one decision your data should be helping you make.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              30 minutes, no deck. We&apos;ll tell you on the call whether we&apos;re the right
              partner, and exactly what we&apos;d ship in the first 30 days.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <EnquiryDialog />
              <CopyEmail email="info@actadata.co.uk" />
            </div>
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
            <div className="pt-2 flex gap-4 md:justify-end text-xs">
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacy notice</a>
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

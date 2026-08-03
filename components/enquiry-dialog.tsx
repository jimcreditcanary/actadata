"use client";
import { useRef, useState } from "react";
import { Check, Copy, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const EMAIL = "info@actadata.co.uk";

/**
 * Composes an enquiry and hands it to the visitor's mail app, or to their
 * clipboard if that fails. Deliberately has no backend: sending server-side
 * would need a mail provider and an API key, and a dead form loses enquiries
 * silently. Everything here works as a static page.
 */
export function EnquiryDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [context, setContext] = useState("");
  const [copied, setCopied] = useState(false);

  const subject = company
    ? `Acta Data enquiry — ${company}`
    : "Acta Data enquiry";

  const body = [
    name && `Name: ${name}`,
    company && `Business: ${company}`,
    context && `\nWhat we're trying to decide:\n${context}`,
  ]
    .filter(Boolean)
    .join("\n");

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  async function copyEnquiry() {
    const text = `To: ${EMAIL}\nSubject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard blocked — the textarea contents are still selectable.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const field =
    "w-full rounded-lg border border-white/[0.08] bg-navy-100/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-electric/50";

  return (
    <>
      <Button variant="electric" size="lg" onClick={() => ref.current?.showModal()}>
        Tell us what you need →
      </Button>

      <dialog
        ref={ref}
        aria-labelledby="enquiry-title"
        onClick={e => {
          if (e.target === ref.current) ref.current?.close();
        }}
        className="
          m-auto w-[min(34rem,calc(100vw-2rem))] rounded-2xl border border-white/[0.08]
          bg-card p-0 text-left text-foreground backdrop:bg-black/70
          open:animate-in
        "
      >
        <form method="dialog" className="absolute right-3 top-3">
          <button
            aria-label="Close"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </form>

        <div className="p-6 md:p-8">
          <h2 id="enquiry-title" className="text-xl font-semibold tracking-tight">
            Tell us what you need
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            A line about the business and the decision you&apos;re trying to make is enough.
            We&apos;ll come back with times the same day.
          </p>

          <div className="mt-6 space-y-3">
            <input
              className={field}
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className={field}
              placeholder="Business name"
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
            <textarea
              className={`${field} min-h-[7rem] resize-y`}
              placeholder="What the business does, and the decision your data should be helping you make"
              value={context}
              onChange={e => setContext(e.target.value)}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild variant="electric">
              <a href={mailto}>
                <Mail className="mr-2 h-4 w-4" aria-hidden />
                Open in email app
              </a>
            </Button>
            <button
              type="button"
              onClick={copyEnquiry}
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-electric/30 hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-electric" aria-hidden />
                  <span className="text-electric">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden />
                  Copy it instead
                </>
              )}
            </button>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            Nothing is sent from this page and nothing is stored — it opens your own email
            client, or copies the text for you to paste. Or write to us directly at{" "}
            <span className="select-all text-foreground">{EMAIL}</span>.
          </p>
        </div>
      </dialog>
    </>
  );
}

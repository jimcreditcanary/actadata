"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * The address must be reachable without a working mail client — `mailto:` does
 * nothing on machines with no default handler, which silently loses enquiries.
 * So it is shown as selectable text with a copy button alongside the mail link.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API blocked (insecure context, or permission denied) — the
      // address is selectable text anyway, so fall through to the same feedback.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${email} to clipboard`}
      className="group inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-card/50 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-electric/30 hover:text-foreground"
    >
      <span className="select-all font-medium text-foreground">{email}</span>
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-electric" aria-hidden />
          <span className="text-electric text-xs">Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" aria-hidden />
          <span className="text-xs">Copy</span>
        </>
      )}
    </button>
  );
}

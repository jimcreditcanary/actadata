"use client";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Lead-capture form. Posts name / job title / company / email / mobile to
 * /api/lead, which fires the branded auto-reply and the internal alert. On
 * success the form is replaced by a confirmation so the visitor knows a reply
 * is on the way. A hidden honeypot field ("website") traps bots.
 */

type Status = "idle" | "sending" | "done" | "error";

const FIELDS = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name", placeholder: "Jane Roberts" },
  { name: "jobTitle", label: "Job title", type: "text", autoComplete: "organization-title", placeholder: "Chief Operating Officer" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization", placeholder: "Northwind Retail" },
  { name: "email", label: "Work email", type: "email", autoComplete: "email", placeholder: "jane@northwind.co.uk" },
  { name: "mobile", label: "Mobile", type: "tel", autoComplete: "tel", placeholder: "07700 900123" },
] as const;

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError("Couldn't reach us just now. Please try again in a moment.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="mx-auto mt-9 max-w-md rounded-2xl border border-electric/30 bg-gradient-to-b from-electric/[0.08] to-transparent p-8 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-electric/15">
          <Check className="h-5 w-5 text-electric" aria-hidden />
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight">You&apos;re in — check your inbox.</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          We&apos;ve just emailed you a couple of times to meet. Reply with whichever works and
          we&apos;ll lock it in.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-white/[0.08] bg-navy-100/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-electric/50";

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-9 max-w-md text-left" noValidate>
      {/* Honeypot — hidden from people, catnip for bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {FIELDS.map((f, i) => (
          <div key={f.name} className={i < 1 ? "sm:col-span-2" : ""}>
            <label
              htmlFor={f.name}
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              className={field}
            />
          </div>
        ))}
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="electric"
        size="lg"
        disabled={status === "sending"}
        className="mt-5 w-full"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>Book my 30-minute call →</>
        )}
      </Button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        30 minutes, no deck. We&apos;ll reply the same day.
      </p>
    </form>
  );
}

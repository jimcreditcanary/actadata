import { NextResponse } from "next/server";
import { autoReply, leadAlert, type Lead } from "@/lib/emails";

/**
 * Lead-capture endpoint. Takes the contact form, then fires two Postmark emails:
 *   1. the internal alert to LEAD_INBOX (never lose a lead — sent first), and
 *   2. the auto-reply to the enquirer proposing times to meet.
 *
 * The enquirer never sees the internal inbox address; From is always the
 * verified hello@ signature.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FROM = "hello@actadata.co.uk";
const LEAD_INBOX = process.env.LEAD_INBOX || "info@actadata.co.uk";
const MESSAGE_STREAM = process.env.POSTMARK_MESSAGE_STREAM || "outbound";
const POSTMARK_URL = "https://api.postmarkapp.com/email";

type PostmarkMessage = {
  From: string;
  To: string;
  Subject: string;
  HtmlBody: string;
  TextBody: string;
  ReplyTo?: string;
  MessageStream: string;
};

async function sendEmail(token: string, msg: PostmarkMessage): Promise<void> {
  const res = await fetch(POSTMARK_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token,
    },
    body: JSON.stringify(msg),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Postmark ${res.status}: ${detail}`);
  }
}

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  const token = process.env.POSTMARK_SERVER_TOKEN;
  if (!token) {
    console.error("POSTMARK_SERVER_TOKEN is not set");
    return NextResponse.json(
      { ok: false, error: "Email is not configured yet. Please try again shortly." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const lead: Lead = {
    name: clean(body.name),
    jobTitle: clean(body.jobTitle),
    company: clean(body.company),
    email: clean(body.email),
    mobile: clean(body.mobile),
  };

  // Honeypot: bots fill hidden fields, humans never see them.
  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const missing = (Object.keys(lead) as (keyof Lead)[]).filter((k) => !lead[k]);
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: "Please fill in every field." },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  const alert = leadAlert(lead);
  const reply = autoReply(lead);

  // Send the internal alert first — the lead must never be lost even if the
  // auto-reply then fails.
  try {
    await sendEmail(token, {
      From: FROM,
      To: LEAD_INBOX,
      ReplyTo: lead.email,
      Subject: alert.subject,
      HtmlBody: alert.html,
      TextBody: alert.text,
      MessageStream: MESSAGE_STREAM,
    });
  } catch (err) {
    console.error("Lead alert failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please email us directly." },
      { status: 502 }
    );
  }

  // Auto-reply is best-effort: the lead is already captured above.
  try {
    await sendEmail(token, {
      From: FROM,
      To: lead.email,
      ReplyTo: FROM,
      Subject: reply.subject,
      HtmlBody: reply.html,
      TextBody: reply.text,
      MessageStream: MESSAGE_STREAM,
    });
  } catch (err) {
    console.error("Auto-reply failed:", err);
  }

  return NextResponse.json({ ok: true });
}

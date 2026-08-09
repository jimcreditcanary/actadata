/**
 * Branded email templates for the lead-capture flow.
 *
 * Two emails go out on every enquiry:
 *   1. autoReply  — to the person who filled the form, proposing times to meet.
 *   2. leadAlert  — to the Acta Data inbox, flagging a new lead to act on now.
 *
 * Both are plain table-and-inline-style HTML: that is the only layout that
 * survives across Outlook, Gmail and Apple Mail. Colours mirror the site's
 * navy + violet palette. Every template returns { html, text } so we always
 * ship a plain-text part alongside the HTML one.
 */

export type Lead = {
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  mobile: string;
};

const NAVY = "#070A1A";
const SURFACE = "#0C1428";
const BORDER = "#1b2540";
const TEXT = "#E6EEF8";
const MUTED = "#93a0bd";
const VIOLET = "#A855F7";
const VIOLET_GLOW = "#C084FC";

const LEGAL =
  "Acta Data Ltd · Registered in England &amp; Wales, company no. 14182372 · ICO reg. ZB502441.<br/>Chester House, Lloyd Drive, Cheshire Oaks Business Park, Ellesmere Port, Cheshire CH65 9HQ.";

/** Wraps body content in the branded navy shell with the ACTA DATA wordmark. */
function shell(inner: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="color-scheme" content="dark light"/>
</head>
<body style="margin:0;padding:0;background:${NAVY};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${NAVY};padding:32px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr>
          <td style="padding:4px 4px 24px 4px;">
            <span style="font-family:'Archivo Black',Arial,sans-serif;font-weight:800;font-size:20px;letter-spacing:1px;color:${TEXT};">ACTA<span style="color:${VIOLET};">DATA</span></span>
          </td>
        </tr>
        <tr>
          <td style="background:${SURFACE};border:1px solid ${BORDER};border-radius:16px;padding:32px 32px 28px 32px;">
            ${inner}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 4px 4px 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:${MUTED};">
            ${LEGAL}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || "there";
}

/**
 * Two concrete slots to propose, computed from the next available weekdays so
 * the suggestion is always in the future and never lands on a weekend.
 */
function suggestedSlots(from = new Date()): { long: string; short: string }[] {
  const slots: { hour: number; label: string }[] = [
    { hour: 11, label: "11:00" },
    { hour: 15, label: "15:00" },
  ];
  const days: Date[] = [];
  const cursor = new Date(from);
  while (days.length < 2) {
    cursor.setDate(cursor.getDate() + 1);
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) days.push(new Date(cursor));
  }
  const fmt = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/London",
  });
  return days.map((d, i) => {
    const slot = slots[i % slots.length];
    return {
      long: `${fmt.format(d)} at ${slot.label}`,
      short: `${fmt.format(d)}, ${slot.label}`,
    };
  });
}

/** Auto-reply to the person who enquired — warm, direct, proposes times. */
export function autoReply(lead: Lead): { subject: string; html: string; text: string } {
  const name = firstName(lead.name);
  const [a, b] = suggestedSlots();

  const subject = "Let's find a time — Acta Data";

  const inner = `
    <h1 style="margin:0 0 16px 0;font-family:'Archivo Black',Arial,sans-serif;font-weight:800;font-size:24px;line-height:1.25;color:${TEXT};">Thanks, ${name} — let's talk.</h1>
    <p style="margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${TEXT};">
      Got your details. The next step is a 30-minute call — no deck. We'll tell you whether we're the right partner and exactly what we'd ship in your first 30 days.
    </p>
    <p style="margin:0 0 12px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${TEXT};">
      A couple of times that work our end:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px 0;">
      <tr><td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${VIOLET_GLOW};">→ ${a.long}</td></tr>
      <tr><td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${VIOLET_GLOW};">→ ${b.long}</td></tr>
    </table>
    <p style="margin:0 0 24px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${TEXT};">
      Reply to this email with whichever suits — or a better time — and I'll send a calendar hold.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="border-radius:10px;background:${VIOLET};">
          <a href="mailto:hello@actadata.co.uk?subject=${encodeURIComponent("Re: Let's find a time — Acta Data")}" style="display:inline-block;padding:12px 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:${NAVY};text-decoration:none;">Reply with a time →</a>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${MUTED};">
      Speak soon,<br/><span style="color:${TEXT};">The team at Acta Data</span>
    </p>`;

  const text = `Thanks, ${name} — let's talk.

Got your details. The next step is a 30-minute call — no deck. We'll tell you whether we're the right partner and exactly what we'd ship in your first 30 days.

A couple of times that work our end:
  - ${a.long}
  - ${b.long}

Reply to this email with whichever suits — or a better time — and I'll send a calendar hold.

Speak soon,
The team at Acta Data

—
Acta Data Ltd · Registered in England & Wales, company no. 14182372 · ICO reg. ZB502441.
Chester House, Lloyd Drive, Cheshire Oaks Business Park, Ellesmere Port, Cheshire CH65 9HQ.`;

  return { subject, html: shell(inner), text };
}

/** Internal alert to the Acta Data inbox — a new lead to act on immediately. */
export function leadAlert(lead: Lead): { subject: string; html: string; text: string } {
  const subject = `🔔 New lead — ${lead.name}, ${lead.company} (act now)`;

  const row = (label: string, value: string, href?: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-family:Arial,Helvetica,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:${MUTED};width:120px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${TEXT};">${
        href ? `<a href="${href}" style="color:${VIOLET_GLOW};text-decoration:none;">${value}</a>` : value
      }</td>
    </tr>`;

  const inner = `
    <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:${VIOLET};">New enquiry</p>
    <h1 style="margin:0 0 8px 0;font-family:'Archivo Black',Arial,sans-serif;font-weight:800;font-size:24px;line-height:1.25;color:${TEXT};">${lead.name} wants to talk.</h1>
    <p style="margin:0 0 22px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${MUTED};">
      An auto-reply proposing times has already gone to them. Follow up now while it's live — reply straight to this email to reach them.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", lead.name)}
      ${row("Job title", lead.jobTitle)}
      ${row("Company", lead.company)}
      ${row("Email", lead.email, `mailto:${lead.email}`)}
      ${row("Mobile", lead.mobile, `tel:${lead.mobile.replace(/\s+/g, "")}`)}
    </table>`;

  const text = `NEW LEAD — act now

${lead.name} wants to talk. An auto-reply proposing times has already gone to them.

Name:      ${lead.name}
Job title: ${lead.jobTitle}
Company:   ${lead.company}
Email:     ${lead.email}
Mobile:    ${lead.mobile}

Reply straight to this email to reach them.`;

  return { subject, html: shell(inner), text };
}

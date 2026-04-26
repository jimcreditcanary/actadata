---
name: acta-data-website
description: |
  Use this skill for ANY work on the Acta Data marketing website — building new pages, fixing existing pages, tweaking layout/design, updating copy, or deploying changes. Trigger whenever the user mentions "Acta Data", "actadata", "the Acta site", "the data consultancy site", or any page name that's part of this site (index.html, actadata-proposition.html, etc.). Also trigger when the user pastes a Vercel preview URL for the actadata project, references the GitHub repo jimcreditcanary/actadata, or mentions the "Data made human" brand. This skill contains the repo details, design system, standing rules, and a handoff log so Claude can pick up exactly where the last session left off.
---

# Acta Data Website

You're working on the Acta Data marketing website — a consultancy proposition site for data, AI and delivery services aimed at C-suite buyers (CEO / CDO / COO). Brand line: **"Data made human."**

This skill contains everything you need to clone, edit, commit, and deploy without the user having to re-explain context each time.

## First Steps — Every Session

1. **Read the handoff log** at the bottom of this file. It tells you what was last worked on, what's done, and what's outstanding.
2. **Clone the repo** (see connection details below).
3. **Do the work** the user asks for, following the standing rules.
4. **Commit and push** when the work is done.
5. **Update the handoff log** at the bottom of this file before finishing — append a new entry with today's date, what you did, and what's outstanding for next time.

## Connection Details

- **Live site:** Vercel project for `jimcreditcanary/actadata` (auto-deploys on push to `main`). Ask Jim for the current preview URL if you need it.
- **GitHub:** https://github.com/jimcreditcanary/actadata
- **Clone with auth:**
  ```
  git clone https://jimcreditcanary:<GH_TOKEN>@github.com/jimcreditcanary/actadata.git
  ```
- **Push with auth:**
  ```
  git push https://jimcreditcanary:<GH_TOKEN>@github.com/jimcreditcanary/actadata.git main
  ```
- **Auth token:** the real PAT is not committed (GitHub secret scanning blocks it). It's stored in the user's `acta-data-website-SKILL.md` on `~/Desktop/acta/` and in the installed skill at `~/.claude/skills/acta-data-website/SKILL.md`. Replace `<GH_TOKEN>` in the commands above with that value.
- **Git config:** `user.email "jim@creditcanary.co.uk"` / `user.name "Jim"`
- **Deploys automatically** on push to `main` via Vercel.
- **Source brand assets** (logos, founder photos, original "What We Do" copy) live in the user's `~/Desktop/acta` folder — reference them when you need extra context or images.

## Pages

| File | What it is |
|------|-----------|
| `index.html` | Homepage / consultancy proposition (Vercel serves this as `/`) |
| `actadata-proposition.html` | Canonical-name copy of `index.html` — keep in sync if homepage changes |

When adding a new page, remember to keep `index.html` in sync with whatever should serve at `/`.

## Build Approach

- **Single-file pages.** Each HTML file is fully self-contained — styles in a `<style>` block, scripts inline. No external CSS/JS files in the repo.
- **Vanilla HTML/CSS/JS.** No Tailwind, no React, no build step. The repo is pure static files; Vercel serves them as-is. (This is intentional — different stack to credit-canary-website.)
- **Work one page per session.** Files can grow large with inline images; don't try to refactor multiple pages in one context window. Get a focused brief: "Build/fix [page] — here's what it needs."
- **Fonts come from Google Fonts via CDN** (`Archivo Black` for display, `Inter` for body). No local font files.

## Standing Design Rules

These apply to **every page** on the site. Do not deviate without explicit instruction.

### Brand colour palette (CSS variables)

Always define these at the top of any new page's `:root`:

```css
--magenta:       #B5147B;   /* primary brand magenta */
--magenta-deep:  #7A0E54;   /* hover / dark accents */
--magenta-soft:  #F6E6F0;   /* pill/badge backgrounds */
--magenta-tint:  #FBF5F8;   /* alt section backgrounds */
--ink:           #161019;   /* primary text */
--ink-soft:      #4A3F4F;   /* secondary text */
--line:          #E9DDE5;   /* borders / dividers */
--bg:            #FFFFFF;
--shadow:        0 30px 60px -25px rgba(122,14,84,.25);
--radius:        18px;
```

Never introduce new accent colours without a reason — the brand is intentionally monochrome around the magenta.

### Typography

- **Display / headings:** `Archivo Black` (very blocky — matches the ACTA DATA logo).
- **Body:** `Inter` 300/400/500/600/700.
- Heading sizes use `clamp()` for fluid scaling:
  - `h1`: `clamp(40px, 6.4vw, 84px)`
  - `h2`: `clamp(28px, 3.8vw, 48px)`
  - `h3`: `clamp(20px, 2vw, 26px)`
- Body line-height `1.55`. Letter-spacing on headings `-0.01em`.
- Eyebrow/kicker pattern: uppercase, `letter-spacing: .18em`, font-size 12px, magenta colour, sits above every section heading.

### Layout patterns

- Page max width: `1180px` content wrap, side padding `28px`.
- Section vertical padding: `96px 0`.
- Alternating section backgrounds: white → `--magenta-tint` (use class `.alt`) → white. Add a "dark" inverted band (`--ink` background) once or twice per long page for emphasis.
- Cards: white background, `1px solid var(--line)`, `border-radius: var(--radius)`, generous internal padding (28–32px). On hover, lift with `translateY(-3px)` and `box-shadow: var(--shadow)`.
- Buttons:
  - Primary: solid magenta, white text, fully rounded (`border-radius: 999px`), 14px × 22px padding.
  - Ghost: transparent, 1.5px ink border. Inverts to ink-on-hover.
- Diagonal element from the original ACTA brand: a 50/50 diagonal gradient divider (`linear-gradient(135deg, transparent 49.6%, var(--magenta-tint) 50%)`) — use sparingly between sections to echo the original brand's diagonal triangle motif.

### Logo

Inline SVG mark — purple rounded square with stacked "ACTA / DATA" text. Use this version in nav and footer rather than embedding the JPEG/PNG raster files:

```html
<svg width="38" height="38" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="14" fill="#B5147B"/>
  <text x="50" y="44" text-anchor="middle"
        font-family="Archivo Black, Impact, sans-serif" font-size="26" fill="#fff">ACTA</text>
  <text x="50" y="74" text-anchor="middle"
        font-family="Archivo Black, Impact, sans-serif" font-size="26" fill="#fff">DATA</text>
</svg>
```

### Navigation

- Sticky top nav with translucent white background and `backdrop-filter: blur(10px)`.
- Left: logo + "ACTA DATA" wordmark.
- Right: anchor links to in-page sections, ending with a magenta primary "Book a call" button.
- Hide the link list under 760px (mobile) — keep just the logo and CTA button.

### Voice and copy rules

- Audience is **C-suite** (CEO / CDO / COO). Lead with business outcomes, decisions, ROI, board-level framing — not tooling specs.
- Tagline is **"Data made human"** — use it explicitly somewhere on every page.
- House promise: *"We don't sell strategy decks. We sell decisions you can act on by Monday."* — fine to repeat across pages.
- The four service pillars, always in this order: **Align → Strategise → Deliver → Sustain**.
- Engagement tiers, always in this order: **Compass** (diagnostic) → **Catalyst** (strategy sprint) → **Embedded** (delivery partnership). Featured tier is Catalyst.
- Founders: **Shaun Adams** (Founder & Principal Consultant) and **Lauren Adams** (Founder & Consulting Project Manager). Plus **The Network** of specialists.
- Avoid jargon. No "synergy", "leverage", "unlock". Plain operator language wins.

### Footer

- Single thin row, top-bordered.
- Left: copyright + "Data made human."
- Right: positioning line ("Strategy · AI · Delivery — for boards that want both.")

### General Patterns

- Smooth scroll on anchor links — keep the small inline script that wires `a[href^="#"]` to `scrollIntoView({behavior:'smooth'})`.
- Year in footer is auto-set via `document.getElementById('yr').textContent = new Date().getFullYear()`.
- All `<style>` lives in the `<head>` of the page. No external CSS files.
- Base64-encode any small icons inline rather than referencing external image files.
- Photos of founders live in the user's `~/Desktop/acta` folder if you need them — currently the site uses initials avatars (`SA`, `LA`) on a magenta gradient.

## Updating the Handoff Log

At the end of every session, **append** a new entry to the handoff log section below. Format:

```
### YYYY-MM-DD — [what was worked on]
**Done:** [bullet list of completed items]
**Outstanding:** [bullet list of what's left / next steps]
```

This is how the next session knows where to pick up. Be specific — mention file names, section names, and what exactly is unfinished.

---

## Handoff Log

### 2026-04-26 — Initial site + skill creation
**Done:**
- Created the consultancy proposition landing page (`index.html` / `actadata-proposition.html`) — single-file HTML, vanilla CSS, Google Fonts (`Archivo Black` + `Inter`), magenta brand palette.
- Page sections: sticky nav, hero with stat strip, problem band ("where's the return?"), four-pillar services grid (Align / Strategise / Deliver / Sustain), four-step approach (Diagnose → Decide → Deliver → Develop), three-tier pricing (Compass £18k / Catalyst £85k / Embedded £35k+/mo), dark outcomes band, team grid (Shaun / Lauren / Network), magenta CTA card, footer.
- Initialised `jimcreditcanary/actadata` GitHub repo with `index.html`, `actadata-proposition.html`, `README.md`. Pushed to `main`.
- Vercel project created by Jim and connected to the repo (auto-deploy on push to `main`).
- Wrote this skill so future sessions can pick up work without re-briefing.

**Outstanding:**
- Confirm Vercel preview URL with Jim and add it to "Connection Details" above.
- Replace initials avatars (`SA`, `LA`) with the actual founder photos from `~/Desktop/acta` if/when Jim wants real headshots.
- Wire the "Schedule via calendar" CTA button to a real calendar link (currently `href="#"`).
- Wire `mailto:hello@actadata.io` to the actual contact inbox once it's confirmed.
- Add a real favicon (currently no `<link rel="icon">`).
- No analytics installed yet — decide whether to add Vercel Web Analytics, Plausible, or similar.
- Site is currently a single page — additional pages (e.g. `/case-studies`, `/insights`, `/about`) not yet built.

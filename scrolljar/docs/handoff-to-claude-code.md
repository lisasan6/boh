# ScrollJar — handoff to Claude Code (2026-07-31)

Read this first if you're picking up cold. Everything below is decided unless marked OPEN.

---

## What exists right now

Both files live in this project and can be downloaded from claude.ai:

- **`claude/scrolljar-landing.html`** — the waitlist landing page. Single file, no build step. Open it in a browser.
- **`claude/scrolljar-prototype-v2.html`** — the full clickable app prototype. ~15 screens, all flows working (shield → breath pause → "instead" → override → coin drop → jar, plus diary, feed, wobble, standby-note composer, resources). **This is the most valuable asset in the project.** Everything visual on the landing page was extracted from it.
- `og.png` — 1200×630 social share card (in the old session's working dir; regenerate if lost).

## Two blanks stop the page from going live

1. **`YOURFORMID`** in the landing page script → create a free form at formspree.io, paste its ID. Until then the form runs in demo mode and captures nothing.
2. **The number** — the waitlist target that means "keep going" (e.g. 300 signups in 3 weeks). Written in the comment at the top of the file, still blank. L has not picked it. Without it the page is a portfolio piece, not a test.

Plus: buy a domain, drag the file into Netlify/Vercel/Cloudflare Pages, host `og.png` next to it.

## The design history — read this before touching styling

The page went through **six** art directions in one session (aurora glass → brighter → editorial paper-and-ink → clean white "Freedom-style"). That churn frustrated L badly and burned a lot of budget. **Do not re-skin on vague feedback.** The current direction is clean white / near-white with a single teal accent, deep navy text, generous space, and the colorful app screens as the only saturated element.

Root cause of the churn, stated plainly: the previous session could not *see* reference sites — only text summaries of them — so every "matched to your reference" claim was matched to a paragraph of prose, not pixels. **In Claude Code this is fixable: ask L to paste screenshots, or run the page locally and have L screenshot it.** Do that before making visual claims.

L's reference site: **freedom.to** — liked for being professional, credible, structured (press, stats, science, testimonials, FAQ). Its hero uses real video of people, which we cannot produce.

### The open idea worth building
Instead of faking video: **embed the working prototype in the hero phone** so visitors can actually tap the shield, trigger the override, and watch the coin drop into the jar. Real interaction instead of a video of a product. The asset already exists (`scrolljar-prototype-v2.html`). L has not yet approved this — ask.

## Landing page structure (current)

nav → hero (whisper line, headline, email form, phone + 2 floating app cards) → evidence strip (4 sourced stats) → **The difference** (money-flow diagram: their revenue vs your charity) → Sound familiar (message bubbles) → How it works (3 steps with real app screens) → The win-win (two doors) → The science (4 real citations) → What you get back (3 illustrated scenes) → What we refuse (6) → FAQ (7, with FAQPage schema) → final CTA → footer.

## Copy — settled, do not churn

- Headline: **"Your time belongs to you. Let's go get it back."**
- Whisper above it: *"You opened it to check one thing. That was 40 minutes ago."*
- Hero punch: *"Every other app like this keeps that money. We never touch it."*
- Win-win: *"Either you win the night, or a charity does."* / *"The only one who never wins is the app that wanted your night."*
- Voice Law applies: never use failed, wasted, addict, guilty, shame, broke, violation. No shame, ever, in either direction.
- L's core note: lead with the positive promise (time back, you in charge), then the mechanism. Differentiation must be understandable **immediately**.

## Honesty constraints (non-negotiable)

- No fake testimonials, user counts, press logos or star ratings. We have zero users.
- Don't state competitor prices as fact on the live page (they change). "Cheaper than the apps that pocket your penalties" is the safe framing.
- The science section cites real papers — verify any new claim against `claude/science-dossier-bibliography.md`.

## The thing that actually matters more than the page

🔴 **The Apple Family Controls distribution entitlement is still unfiled.** It gates the entire product by weeks (2026 reports: submitted early March, still silent). Chain: enrol in Apple Developer Program ($99/yr, individual is fastest) → create bundle IDs (app + `.monitor`, `.report`, `.shieldaction`, `.shieldconfig`) → submit the request as Account Holder, once per bundle ID. A ready-to-paste justification paragraph is in the conversation history and can be regenerated from `claude/research-findings.md`.

Every day this isn't filed is a day added to launch. It matters more than any styling decision.

## Where to look for context

- `claude/scrolljar-spec.md` — v1.2, canonical product spec
- `claude/research-findings.md` — iOS/Android feasibility, re-verified 2026-07-30 (Android 17 Advanced Protection Mode is a real headwind; iOS-first is the only honest v1)
- `claude/sketchpad.md` — living idea doc, open questions, parking lot, the Wobble design
- `claude/psychology-playbook.md`, `claude/evidence-dossier.md`, `claude/science-dossier-bibliography.md`
- `claude/design-brief.md` — the app's design system (Aurora Chrome). Note: the app and the website are deliberately different registers now — vivid app, calm site.

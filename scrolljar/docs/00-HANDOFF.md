# ScrollJar: handoff to Claude Code

**Date:** 2026-10-13. Read this first. Anything not marked OPEN is decided.

This replaces `handoff-to-claude-code.md` (31 July), which is kept for history.

---

## 1. The product in 5 lines

1. The user picks the apps that drink their time. iOS blocks them through Apple's Screen Time API, a real system-level block.
2. Opening one anyway is always allowed, after a short breath pause, at a price the user set ($2–25, default $5).
3. The price drops as a coin into the user's jar. On the 1st of each month the jar empties: **100% goes to a charity the user chose**, with a receipt.
4. ScrollJar earns money only from memberships: Ghost Jar (free), Jar Hero ($5.99/mo or $49.99/yr) and Jar Legend ($9.99/mo or $79.99/yr, of which we give away half).
5. Positioning: every other stakes app keeps your penalty money; we never touch it. "Either you win the night, or a charity does."

## 2. What exists

| Asset | State | Where |
|---|---|---|
| **App prototype v2** | Complete and clickable: about 15 screens and 15 overlays, all flows working, day and night modes. **The most valuable asset.** | `prototype/` |
| **Landing page** | Built, clean white layout with a teal accent. **Not live** (see §4). | `landing/index.html` |
| Product spec v1.2 | Canonical | `docs/scrolljar-spec.md` |
| Platform research | Re-verified 2026-07-30 | `docs/research-findings.md` |
| Design system (Aurora Chrome) | Locked for the app | `docs/design-brief.md` |
| Psychology, evidence, science | Complete, with citations | `docs/psychology-playbook.md`, `docs/evidence-dossier.md`, `docs/science-dossier-bibliography.md` |
| Teams (B2B) mini-spec | v0.1, parked | `docs/scrolljar-teams-spec.md` |
| Ideas, Wobble design, open questions | Living doc | `docs/sketchpad.md` |
| **iOS build plan** | New in this handoff | `docs/IOS-BUILD-SPEC.md` |

### Prototype map: what each screen and overlay is for

- **Tabs:** TODAY (`s-home`), DIARY (`s-diary`), JARS (`s-friends`), YOU (`s-you`).
- **Core loop:** `ov-shield` → `ov-breath` (breathing pause; the small "continue" button bounces and stops in a new spot each time) → `ov-instead` (what else this hour could be) → `ov-override` (pay $5) → `ov-window` (access countdown) → `ov-mood` (how do you feel now?).
- **Resisting:** `resist()` makes the jar hop; the first time, it opens `ov-firstwin` ("That's the whole product. You just didn't scroll."), followed by `ov-exit`, where the app invites you to leave.
- **Money:** `s-jar`, then `ov-tipout`, the monthly ceremony that shows visible settlement steps.
- **Social:**
  - `s-friends` (feed), `s-jardetail`, `s-challenge`, `s-invite`.
  - **Wobble** (`ov-wobble`) follows the "Ladder of Who Speaks": the friend live, then the friend's standby note, then your own words.
  - `ov-standby` is the composer for the standby note, with an AI-assisted draft and a "cold read" check.
- **Self-knowledge:** `s-diary`, `s-recap`, `s-resources` and `s-resdetail` ("Why it's hard"), and `s-usage`.
- **Setup and paywall:** `ov-onb` (4 slides), `s-new` (new promise), `s-paywall`.
- **Support register (calm teal):** breath, instead, rough day (`ov-rough`), exit.

**The prototype now follows real iOS (updated 2026-10-14).** The shield shows only a title, a subtitle, an icon and 2 buttons. "Open anyway" leads to a notification that the user taps to reach our app (ignoring it counts as resisting). Onboarding includes our Screen Time explainer, Apple's permission prompt (and a calm path if they say no) and Apple's app picker. The day-3 "make it real" flow (topbar button "Day 3 moment") shows stakes, charity, the two separate payments (Jar Hero via Apple, coins via card) and the plain-language mandate. See `IOS-BUILD-SPEC.md` §3.

## 3. Lost in a cloud-workspace reset (regenerate only if needed)

These files are referenced in the docs but no longer exist:

- `og.png`: the 1200×630 social share image. **Regenerated 2026-10-13** from the landing hero (`landing/og.png`).
- `scrolljar-financial-study.xlsx`: unit economics and 24-month scenarios. The key numbers survive in `sketchpad.md` → Monetization (Hero year nets $42.49, LTV ~$91, break-even ~356 subscribers).
- `scrolljar-aurora-chrome.html`: the living design-system page. The tokens survive in `prototype/styles.css` and `design-brief.md`.
- The identity-direction explorations (14 directions), the mission-control HTML page and a `scrolljar.skill` file. These are history only and need no action.

## 4. OPEN: what's blocking what

### 🔴 1. Apple Family Controls distribution entitlement

This gates TestFlight and the App Store, and approval takes weeks.

- **Check whether it has been filed.** If not, file it today.
- The steps are in `IOS-BUILD-SPEC.md` §2.
- Development builds on your own iPhone do **not** need approval, so coding can start now.

### 🟠 2. Landing page: three things before it goes live

1. **`YOURFORMID`**: create a free form at formspree.io and paste its ID into the script. Until then the form runs in demo mode and captures nothing.
2. **TARGET**: the waitlist number that means "keep going" (e.g. 300 signups in 3 weeks). It goes in the comment at the top of the file. Without it the page tests nothing.
3. ~~"This fall" launch claim~~ **Done 2026-10-13:** now "iPhone first" in the hero pill, FAQ and final CTA. The LA-verdict stat was also reworded to say it's on appeal.

Then buy the domain (`scrolljar.app` is assumed throughout) and deploy to Netlify, Vercel or Cloudflare Pages.

**The hero phone now runs the live prototype** (an iframe of `../prototype/index.html?embed=1`, night mode). When deploying, publish `prototype/` alongside `landing/` so that path resolves — e.g. deploy the whole `scrolljar/` folder with `landing/` as the home page, or copy `prototype/` next to `landing/index.html` and change the iframe `src` to `prototype/index.html?embed=1`.

### 🟡 3. Product questions still open

The live list is in `sketchpad.md` → "Open questions":

- Q4 Ghost Jar limits
- Q5 group jar settlement (per member or pooled)
- Q8 hour-posts in v1
- Q12 Big Counter methodology
- Q15 widget scope
- **Q16 US legal entity** (needs an advisor; it gates the Stripe and App Store contracts)
- Q21 Wobble × Teams

### 🟡 4. Idea L hasn't approved yet

Embed the working prototype in the landing page's hero phone, so visitors can tap the shield and watch the coin drop. **Ask L first.**

## 5. Where the docs disagree (later decisions win)

- **Currency:** `psychology-playbook.md` and the brief use € in places. **USD/US-first is decided** (spec v1.2).
- **Tier names:** `board-reactions-2026-07-27.md` lists them as pending. **Ghost Jar / Jar Hero / Jar Legend is decided** (spec v1.2).
- **Buttons:** `design-session-briefing.md` says pill buttons and suggests Sora or Outfit. **Locked: 16px square-rounded buttons, Bricolage Grotesque with Inter** (`design-brief.md`).
- **Day-mode colours:** `design-brief.md` lists a cool day ground (#F3F5FC). The prototype uses a warmer dawn palette. **The prototype's `styles.css` is the source of truth.**
- **App vs website (changed 2026-10-14, L's decision):** the website now shares the app's night aurora look: dark sky, frosted glass panels, a mint-to-lavender headline gradient, the live prototype in the hero phone, and restrained motion (one moment per section, all off under reduced motion). The earlier calm white site is in git history; the two hero explorations are in `landing/explore/`.

## 6. Settled website copy: do not churn

- Headline: **"Your time belongs to you. Let's go get it back."**
- Whisper line: *"You opened it to check one thing. That was 40 minutes ago."*
- Punch line: *"Every other app like this keeps that money. We never touch it."*
- Win-win: *"Either you win the night, or a charity does."* / *"The only one who never wins is the app that wanted your night."*
- L's reference site is **freedom.to**: professional, credible, structured. We can't produce its people videos, so we use real app screens instead.

## 7. Suggested order of work

1. Entitlement status (§4.1). It costs L 30 minutes and saves weeks.
2. Make the landing page live (§4.2): small and cheap, and it starts measuring demand.
3. **Blocking spike on a real iPhone** (`IOS-BUILD-SPEC.md` Phase 1). This is the riskiest technical step, so prove it first.
4. Build the iOS app in the phases of `IOS-BUILD-SPEC.md`, using the prototype as the visual and behavioural reference.

### Website structure (2026-10-14)
- `landing/index.html` is the home page; `landing/teams.html` (for companies) and `landing/families.html` are their own pages.
- Shared styling and behaviour live in `landing/site.css` and `landing/site.js`. Change them once, every page follows. Deploy all five files together (plus `og.png` and `prototype/` for the live demo).
- `landing/explore/light-dark.html` is an alternative look (alternating light sections). Rebuild it from the home page with `python3 landing/explore/make-light-dark.py landing/index.html landing/explore/light-dark.html "../../prototype/index.html?embed=1" "../"`.
- The waitlist form is still in demo mode: set `FORM_ID` in `site.js` (Formspree).

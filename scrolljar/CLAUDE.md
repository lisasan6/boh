# ScrollJar — rules for Claude Code

Claude Code reads this file automatically. Read it fully before doing anything.

## What ScrollJar is

ScrollJar is an iOS-first app that blocks the apps a person chooses, using Apple's Screen Time API. Opening a blocked app anyway is always allowed, but it costs a price the user set in advance. That money ("coins") collects in a jar, and once a month the user gives the jar, in one tap, straight to the charity they picked: **every coin goes to their charity.** We never keep or hold any of it, and we pay the card fees. The company earns money **only from memberships**.

The tagline: *"You can always choose distraction. It just shouldn't be free."*

## The founder (L): how to work with them

- **Keep answers short.** L does not have all day. Lead with the answer, use plain language, and avoid jargon and compressed shorthand.
- **Warn L before any expensive or long task** (big rewrites, many-file changes, long research, repeated design passes). Give a rough size estimate and wait for a yes.
- **Never redesign the visual style unless L asks for it explicitly.** The landing page went through six art directions in one session, which frustrated L and wasted budget. Only fix exactly what was asked.
- **Look before making visual claims.** Run the page locally and take screenshots (Playwright is fine), or ask L for screenshots of reference sites. Never say a design "matches" a reference you have not seen.
- **Copy must be positive and supportive.** Lead with the promise (your time back, you in charge), then explain the mechanism.
- **Ask one clear question when a decision is truly L's to make.** Otherwise choose a sensible default and say which one you chose.

## The Voice Law (applies to every string: app, site, emails)

- Banned words: **failed, wasted, addict, guilty, shame, broke, violation** (and "weak" in user-facing copy about the person).
- No shame, in either direction. Talk about the behaviour, never the person ("a hard evening", not "you're weak").
- Coins are amber/gold, **never red**. A slip is reported, never judged.
- We never speak in a friend's voice. If a friend left no note, the user gets their own words back, not ours.

## Honesty rules (non-negotiable)

- No fake testimonials, user counts, press logos or star ratings. We have zero users.
- Don't state competitor prices as fact on public pages, because they change.
- Every scientific claim must be in `docs/science-dossier-bibliography.md` or `docs/psychology-playbook.md`. Never use "dopamine detox", "21 days to a habit", "willpower is a muscle" or the "65%/95% accountability" statistic.
- The LA verdict is on appeal and the EU findings are preliminary. Phrase them that way.

## Product rules that the code must respect

- **Money (L, 2026-10-20, after the legal review; details in `docs/scrolljar-spec.md` v1.4 notes and `docs/legal-design-options-2026-10.md`):**
  - **The honor jar:** the app counts coins and moves no money. On the 1st the user gives the jar on the charity partner's donation page (pre-filled, Apple Pay) and gets their own receipt. ScrollJar never holds coin money and saves no card for coins. Automatic charging by a partner is a later version.
  - **Cause funds:** 5–10 partner charities with written agreements, a short disclosure before picking, and "suggest a charity". Never "any of a million charities".
  - **ScrollJar pays card fees on every plan.** Nothing is ever added on top, and Plus doesn't "cover fees". The line is "Every coin goes to your charity. We keep none of it, and we pay the fees." Never say "reaches the program".
  - **Jar break is one normal coin (1×)**, after the grace hour. Never 5×.
  - **Pledges (Teams, Families) are charged only for what's unlocked,** at the end of each month or campaign, never up front.
  - **Money features (coins, Plus, Backing) are 18+.** Teens only through Families, with no money.
  - **Version 1 is US only, with no public posts.** Public notes come later with filter, report and block.
  - **Mood check-ins stay on the phone.** Research only with a separate opt-in and ethics approval.

- Users are never hard-locked out; every block can be overridden at their own price.
- We cannot see which apps users block: Apple gives us opaque tokens. Never design features that need app names.
- No variable rewards, no leaderboards, no urgency or countdown sales, and no engagement metrics for our own app.
- Tightening a rule takes effect instantly; loosening it takes 24 hours ("cold blood").
- Kindness features are never paywalled: the breath pause, peek valve, rough-day support and the Wobble.
- Teams: the jar counts **scroll-free hours**: one hour a day per person, at a time they choose, so shift workers count the same (never "evenings"). The jar fills with unnamed glowing lights; copy says "hours". The employer never sees a person (no names, not even who joined; groups under 5 hidden; weekly totals only; nobody's chosen hour or pauses). Notes on what people did are anonymous and squad-only by default, use high fives with no counts, are privacy-checked on the phone only, never reach the employer and are deleted when the campaign ends. Reactions across the product are high fives, not hearts.
- Words: the user's own rules are **deals** ("Your deals", "Make a deal", "Seal the deal"), never "promises" or "commitments" in the UI. "Our promises" on the website means ScrollJar's own promises and stays. In other languages use the natural phrase for a deal with yourself (IT patto, ES trato, FR pacte, DE Abmachung, PT acordo), never the word for a business deal or a market.
- The time people take back is theirs, to use however they like: say "your time", "your hours" (Teams: "Your Hours"; group jar challenges: "Our Hours"), never "focus", which sounds like work (L, 2026-10-16).
- Deals can always be edited: stricter changes apply now, easier ones after 24 hours, and ending a deal is free with 24 hours' notice. Free includes 3 deals; Plus has unlimited.
- Families (after Version 1): kids are never charged and never paid, and they have no accounts of their own: the parent manages the child's phone through Apple's Family Controls, receipts are in the parent's name, and no child's name reaches our server. A parent pledges; a kid's scroll-free hours unlock it for a cause the kid chooses. Rewards are shared and non-cash (a family treat), never money to a child. The family sees the jar, not each other's screens. Don't print "up to 6" publicly (it's Apple's Family Sharing limit).
- Wish jars: a group saves toward something it wants (a trip, a dinner) with **scroll-free time**, never with slips. Up to 2 scroll-free hours a day count per person. Coins are virtual and ScrollJar never touches the money; everyone sees the total, only you see your own share; the date is optional and nothing is owed if it passes. Free with one friend, Plus for groups. Details in `docs/scrolljar-spec.md` §7.
- Backing a friend: someone you share a jar with backs your deals ($5–25, 3–14 days). Each kept day's share becomes a treat for you (a gift card for physical goods or services, like printed books, coffee or cinema; **never cash**, and never a month of Plus); a treat not picked within 30 days goes to your own charity; a day you open anyway sends its share to your own charity. The backer pays either way and **nothing goes back to them** (a gift, never a bet: don't call it a bet or a wager). It's an offer the friend can decline without a reason. The backer sees only how many days were kept. Never for under-18s. Details in `docs/scrolljar-spec.md` §7.
- Creators: the feeds get a shield and posting tools stay open (as guidance for the user's own picks: we never see app names). Posting windows open the feeds with no pause and no coin. In a public challenge, followers set their own deals and every coin goes 100% to the challenge's cause; the creator never earns from followers' coins, and everyone sees totals only, never rankings. Plus is free while a creator runs a public challenge.
- **We limit autopilot, not content (L, 2026-10-15).** ScrollJar is against mindless, automatic scrolling, never against entertainment, creators or the platforms themselves. The goal is that people choose what gets their attention, so they may well keep watching a creator because they chose to. Think of channel-surfing on TV versus picking a film or series on demand. Every pitch to creators or influencers starts here: we're not trying to take viewers away from them, we're helping those viewers come back by choice. In public copy prefer "autopilot" or "mindless scrolling" to labels like "zombie", and talk about the habit, never the person or the creator.
- Diary voice notes are passive: recorded, kept on the phone and played back. Nothing transcribes, analyses or answers them, AI included. No streaks or rewards for them either.
- Onboarding answers can be spoken ("Say it instead", one mic per question). That speech is turned into text and understood on the phone only (Apple speech recognition and on-device AI, simple word-matching on older phones), shown back for the user to confirm, and the recording is deleted at once. Mic and speech permissions are asked only when the mic is tapped. This is the one place we transcribe, and it never applies to Diary notes.

## Where things are

| Path | What it is |
|---|---|
| `prototype/` | The full clickable app prototype (HTML, split into index.html, styles.css and app.js). It is the reference for every screen and flow. `scrolljar-prototype-v2.html` is the original single-file version. |
| `landing/` | The website: `index.html` (home), `teams.html`, `families.html`, `privacy.html`, `404.html`, shared `site.css`/`site.js`, self-hosted `fonts/`. No build step to preview. |
| `deploy/` | How the website goes live: `build.sh` makes `dist/` (website + live app only, fonts self-hosted), `README.md` has L's steps. |
| `docs/00-HANDOFF.md` | **Start here:** current state, what's open, what was lost. |
| `docs/IOS-BUILD-SPEC.md` | The technical plan for the real iOS app. |
| `docs/scrolljar-spec.md` | Product spec v1.3 (canonical; the v1.3 notes on top override older text). |
| `docs/research-findings.md` | What iOS and Android actually allow. |
| `docs/sketchpad.md` | Living ideas, the Wobble design, open questions. |
| other `docs/*.md` | Design system, psychology, evidence, Teams spec, history. |
| `Scrolljar/` (older) | L's March 2026 PRD and research. **Older than `docs/`.** If they disagree, `docs/` wins. |
| `ios/`, `android/`, `backend/` | Empty placeholder folders from earlier. The iOS app goes in `ios/`. |

## Working conventions

- The prototype is plain HTML/CSS/JS with no build step. Open `prototype/index.html` in a browser.
- When you change the prototype or the landing page, check it in a real browser (Playwright screenshots at 390px and 1280px wide) and report what you saw.
- Use git, and commit in small, clearly described steps.

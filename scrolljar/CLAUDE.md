# ScrollJar — rules for Claude Code

Claude Code reads this file automatically. Read it fully before doing anything.

## What ScrollJar is

ScrollJar is an iOS-first app that blocks the apps a person chooses, using Apple's Screen Time API. Opening a blocked app anyway is always allowed, but it costs a price the user set in advance. That money ("coins") collects in a jar, and once a month the jar empties: **100% goes to the charity the user picked.** We never keep any of it. The company earns money **only from memberships**.

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

- Users are never hard-locked out; every block can be overridden at their own price.
- We cannot see which apps users block: Apple gives us opaque tokens. Never design features that need app names.
- No variable rewards, no leaderboards, no urgency or countdown sales, and no engagement metrics for our own app.
- Tightening a rule takes effect instantly; loosening it takes 24 hours ("cold blood").
- Kindness features are never paywalled: the breath pause, peek valve, rough-day support and the Wobble.
- Teams: the jar counts **scroll-free hours**: one hour a day per person, at a time they choose, so shift workers count the same (never "evenings"). The jar fills with unnamed glowing lights; copy says "hours". The employer never sees a person (no names, not even who joined; groups under 5 hidden; weekly totals only; nobody's chosen hour or pauses). Notes on what people did are anonymous and squad-only by default, use high fives with no counts, are privacy-checked on the phone only, never reach the employer and are deleted when the campaign ends. Reactions across the product are high fives, not hearts.
- Diary voice notes are passive: recorded, kept on the phone and played back. Nothing transcribes, analyses or answers them, AI included. No streaks or rewards for them either.

## Where things are

| Path | What it is |
|---|---|
| `prototype/` | The full clickable app prototype (HTML, split into index.html, styles.css and app.js). It is the reference for every screen and flow. `scrolljar-prototype-v2.html` is the original single-file version. |
| `landing/index.html` | The waitlist landing page. Single file, no build step. |
| `docs/00-HANDOFF.md` | **Start here:** current state, what's open, what was lost. |
| `docs/IOS-BUILD-SPEC.md` | The technical plan for the real iOS app. |
| `docs/scrolljar-spec.md` | Product spec v1.2 (canonical). |
| `docs/research-findings.md` | What iOS and Android actually allow. |
| `docs/sketchpad.md` | Living ideas, the Wobble design, open questions. |
| other `docs/*.md` | Design system, psychology, evidence, Teams spec, history. |
| `Scrolljar/` (older) | L's March 2026 PRD and research. **Older than `docs/`.** If they disagree, `docs/` wins. |
| `ios/`, `android/`, `backend/` | Empty placeholder folders from earlier. The iOS app goes in `ios/`. |

## Working conventions

- The prototype is plain HTML/CSS/JS with no build step. Open `prototype/index.html` in a browser.
- When you change the prototype or the landing page, check it in a real browser (Playwright screenshots at 390px and 1280px wide) and report what you saw.
- Use git, and commit in small, clearly described steps.

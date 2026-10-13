# ScrollJar — Project Brief

## Vision
A native mobile app that helps users stay away from their biggest time-wasting apps ("vampire apps") by making it psychologically and financially expensive to bypass their own commitments. Not a traditional app blocker — a commitment platform built on behavioral economics.

> You can always choose distraction. It just shouldn't be free.

## Core concept
- Users select the apps they want to block.
- On open attempt, the app intercepts (where the platform allows) or reminds them of their commitment.
- Users always retain the freedom to continue — but breaking the commitment has self-chosen consequences:
  - Paying a self-defined amount of money
  - That money donated automatically to charity
  - Losing accountability with friends
  - Breaking personal streaks

## Behavioral mechanics
Commitment contracts, loss aversion, friction, self-imposed financial penalties, social accountability, progress tracking. The app helps users pre-commit while they're thinking rationally rather than forcing discipline.

## Main features
1. **Vampire app blocking** — user-chosen distraction apps (Instagram, TikTok, Reddit, X, YouTube, games).
2. **Self-imposed override cost** — per-app override price (e.g. Instagram: $10); every override triggers that payment.
3. **Automatic charity donation** — penalties go to charity, not revenue. Reframes guilt: "I donated because I broke my own commitment."
4. **Time saved** — hours saved, days recovered, sessions avoided; continuously reinforces benefits.
5. **Money donated** — total donated, donation history, impact over time; both successes and failures visible.
6. **Social accountability** — invite friends who see progress, join challenges, hold each other accountable.

## Positioning
Not another productivity timer. Sits between Freedom, Beeminder, Screen Time, and StickK — but with a much simpler consumer experience centered on financial commitment and accountability.

## Target audience
People who already know they waste too much time and want a stronger commitment mechanism: students, founders, developers, remote workers, knowledge workers, people reducing social media use.

## Investor pitch angle
- A commitment platform, not an app blocker
- Behavioral economics, not productivity hacks
- User-defined consequences, not forced restrictions
- Charity as the unique differentiator
- Social accountability as the retention mechanism
- Serious, product-focused messaging (not motivational)

## Technical direction
Two independent native codebases (deliberately no cross-platform framework):

**iOS:** Swift, SwiftUI, Xcode, full native, live previews for rapid AI-assisted UI iteration.

**Android:** Kotlin, Jetpack Compose, Android Studio, full native, live Compose previews.

Rationale: best possible UX, full access to platform APIs (Screen Time / FamilyControls on iOS, UsageStats / Accessibility on Android), faster iteration with AI-assisted development.

## Product philosophy
People usually don't want stronger restrictions — they want stronger commitments they choose for themselves. Combining financial stakes, charitable giving, progress tracking, and social accountability transforms moments of temptation into deliberate, meaningful decisions.

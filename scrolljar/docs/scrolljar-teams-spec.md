# ScrollJar for Teams — Mini-Spec v0.2

**July 28, 2026, updated October 15, 2026 · The B2B product: "Team building through reclaimed attention."** (v0.2 brings the body in line with the 2026-10-14 decisions: scroll-free hours instead of evenings, lights instead of moons, Plus instead of Jar Hero.)

> **STATUS (L, 2026-07-28):** v0.1 PARKED as-is pending L's detailed feature pass — but strategically **elevated to candidate MAIN revenue stream**. Consumer = mission proof, brand, and funnel; Teams = the business. Operational consequence: *sell before build* moves up — design-partner pitching happens during consumer beta (phase 2), pilots in phase 3. The financial model gets a Teams tab at the next finance pass.

> Your team's scroll-free hours become charity. A mental-health benefit with zero surveillance, a CSR story with real numbers, and the only workplace wellness product that touches the actual problem — attention — instead of adding a meditation library on top of it.

> **DECISIONS (L, 2026-10-14) — these override older text below where they differ:**
> - **The jar counts scroll-free hours (L, 2026-10-14; replaces "clean evenings").** Each person picks **one hour a day that's theirs, at any time**, so shift workers, nurses, carers and night workers count the same as office staff. If no shielded app is opened in that hour, it counts as one scroll-free hour. **At most one per person per day.** Apple hides usage totals from apps, so "hours vs baseline" can't be measured honestly; a chosen hour with no slip can (shield events). The pledge converts at a fixed $ per scroll-free hour.
>   - **Changing schedules:** same time every day, or a weekly pattern with a different hour (or none) per day. A day with no hour simply isn't counted.
>   - **Pauses:** "On call today" and "This week is too much" pause counting. Never counts against anyone, shows no gap, stays on the phone.
>   - **Squad goals** are set by the squad from the hours its people actually have, so a squad of shift workers isn't measured against office staff.
>   - **The jar token has no name:** the jar fills with small glowing lights (not moons, not marbles), and copy only ever says "hours", so nothing needs translating. Campaigns are named "Your Hours" etc. (never seasonal names, which look stale part of the year, and never "focus": the hours are people's own to use however they like). High fives never show a count, anywhere in the product.
>   - Which hour someone picked never leaves the phone. The employer sees weekly totals only.
> - **Unspent pledge rolls into the next campaign.** The company never "saves" money because people tried less; the next jar starts partly full.
> - **$4 per employee per month**, billed annually, outside Apple. Free 6-week pilot (up to 50 people). Small teams (5–24): flat ~$99/month.
> - Every employee gets **Plus** (formerly Jar Hero) free for personal use, invisible to the employer.
> - **Notes on what people did (L, 2026-10-14; formerly "evening notes"):** people may share what they did instead ("went to the theatre", "organised the closet"). Rules: anonymous and squad-only by default (signing and company-wide are per-note opt-ins; anonymous only in squads of 5+); never prompted, no post counts; text only; reactions are **high fives with no visible count**; "I'll try this" saves an idea to a private list (the author privately sees how many saved it); colleague ideas appear on the "Instead, you could…" screen; a monthly Slack digest shows 3 random shared ideas, never ranked; the tip-out shows anonymous "what we did" totals for kinds with 5+ notes. **Privacy check on the phone:** every note shows "shared anonymously, to inspire others while keeping you private"; specific nudges for health, money, a child's name, an exact place, someone else's name, and (when anonymous) identifying details. It nudges, never blocks, sends and stores nothing. Notes never appear in the employer dashboard and are deleted when the campaign ends.
> - **Pilot version (v1):** campaign setup, cause vote, join, squads, "your hour" picker with weekly pattern and pauses, lights filling the jar, tip-out ceremony, anonymous dashboard, weekly Slack recap. **Later:** squad rivalries, plus-ones, family extension, boost matching, cross-company leagues.

**Founding non-negotiables (accepted by L):**
1. **The boss can never see individual data.** Aggregate-only, k-anonymity (no stat shown for groups <5). "Your boss can't see your scrolling" printed next to "we couldn't spy on you."
2. **Voluntary, always.** No mandated enrollment, ever (coerced commitment devices backfire — SDT).
3. **Employees never pay, and are never charged.** The employer funds everything. Success costs the company (gladly); distraction costs nobody.
4. **Working hours don't count — by design (L, 2026-07-28; updated 2026-10-14).** The campaign only counts the hour each person chooses in their *own* time, at any time of day, so shift workers count the same. The company doesn't sponsor focus at work; it sponsors its people getting their lives back. This kills the last ghost of productivity monitoring and turns the benefit into what it claims to be: *"Your job gives you back your own time."* (Any work-hours deep-work tooling, if ever built, is a separate opt-in tool that never touches the jar.)

---

## 1. The core mechanic — the Company Jar campaign

A **campaign** is a bounded run (default: 6 weeks; also monthly/quarterly) with a pledge and a cause:

1. **The company pledges a budget** — e.g., $5,000 this quarter — into the Company Jar.
2. **Employees vote the cause** from an HR-curated shortlist (3–5 charities via Every.org). Autonomy makes it theirs, voting makes it an event.
3. **Scroll-free hours fill the jar.** Each person's chosen hour with no shielded app opened counts as one scroll-free hour, at most one a day (see the decisions at the top). Each converts the pledge into unlocked donation at a fixed $ per hour, calibrated so a normally-participating company unlocks 90–100%. The jar visually fills all campaign long. Work hours are structurally invisible to the campaign.
4. **Tip-out ceremony:** campaign ends at an all-hands moment — the jar tips, confetti, the charity's thank-you, the impact stated in vivid units ("our hours funded 2,400 meals"). Ritual, not dashboard.

The inversion in one line: **consumers pay for failure; companies pay for success.**

**The metaphor fix (L's catch, 2026-07-28):** the Teams jar must not fill with the consumer's amber coins — a filling company jar must never read as "we're failing a lot." Same vessel, different currency: the Teams jar fills with **small glowing lights, one per scroll-free hour, earned, not forfeited, drifting *up* into the jar** (consumer coins drop; Teams lights rise). They were moons, one per evening, until 2026-10-14. At the tip-out ceremony, the lights convert into the pledged dollars and go to the cause. Unifying line across both products: *everything that lands in a jar becomes good.*

## 2. How an employee experiences it (fun layer)

- **Join is one tap** from a Slack/Teams invite or QR at launch. Joining = installing ScrollJar with a **campaign profile**: they pick their own vampire apps (the employer never sees *which* apps — not even that it's Instagram vs TikTok) and pick their own hour, in their own time, with a weekly pattern and pauses if they need them. The campaign lives only in that hour.
- **Squads of 4–10** — department-based or self-formed, with names and squad jar mascots. Squad sets its own weekly goal of scroll-free hours from the hours its people actually have (cold blood, self-set — never imposed from above).
- **The feed is the consumer Strava feed, squad-flavored:** finite, kudos, outcomes only. "Design squad kept 47 scroll-free hours this month" — never "Marco opened Instagram 12 times." Reactions are high fives with no counts.
- **Friendly rivalry that charity always wins:** squads can challenge each other for a bounded week — but both sides' hours feed the *same* jar, the "winner" gets a bragging card and picks the next cause. Competition exists only between consenting squads, for one week at a time, never persistent, never individual. No standing leaderboards.
- **Theme weeks:** seasonal company-wide events (Deep Work Week, No-Scroll November) with themed causes and 2× jar rates.
- **Leaders play too, as equals.** A founder's clean hour counts exactly one hour — but leader participation is the culture signal that makes everyone else feel safe joining.
- **The perk that makes it a benefit:** every participating employee gets **Plus free** (covered by their seat) for *personal* use — their private jar, stakes, and charity, fully invisible to the employer. They keep a discount when they leave the company. Work funds the habit; the habit belongs to the person.
- **Private Boost (decided — L, 2026-07-28):** any employee can privately add their own dollars to the campaign's cause, anytime. A **gift, never a penalty**. Rules: amounts and names visible to no one (not employer, not squadmates); the jar shows a small "boosted by teammates 💛" tag only once ≥5 distinct people have boosted (k-anonymity applies to generosity too); boosts route through the Every.org rail via web checkout (outside IAP, consistent with our Apple posture) so the employee gets their own tax receipt — it's their donation, theirs to deduct. **Employer boost-matching toggle:** the company can match boosts 1:1 up to a cap — the classic gift-matching pattern HR already knows, and the easiest upsell in the product. Copy: "Boost the jar 💛".

## 3. What HR/People teams buy (admin product)

- **Campaign builder:** pledge budget, duration, charity shortlist for the vote, launch date.
- **Slack/Teams integration:** weekly recap post, kudos relay, jar-fill milestones. (The office TV jar view for launches.)
- **Dashboard — aggregate only:** participation rate, collective hours reclaimed, jar fill %, impact units, campaign-over-campaign trend. **No individual view exists in the product** — not hidden by permission, *architecturally absent*. No exports of individual anything.
- **Launch kit:** Voice-Law-written email templates, posters, a 10-minute all-hands script, FAQ ("can my manager see my apps?" → "No. Structurally, no.").
- **Receipts:** donation receipts + a public-ready impact page per campaign (recruiting/CSR content the company will actually want to share).

## 4. Pricing & packaging (draft — L to confirm)

- **$4 per employee per month, billed annually** (min 25 seats). Includes: the Teams platform + campaign tooling + **Plus for every employee's personal life**.
- **The charity pledge is separate and 100% pass-through** — employer sets it, every cent reaches the cause, it appears on ScrollJar's public giving ledger as its own line (stream #5).
- Reference deal sizes: 50 seats = $2,400/yr · 200 seats = $9,600/yr · 1,000 seats = $48k/yr. One 200-seat deal ≈ 200 consumer Heroes with a single buyer and B2B-grade retention.
- **Pilot program:** 6-week free pilot for 2–3 design partners (50–200-person friendly startups), in exchange for a case study (participation %, hours reclaimed, donation unlocked, before/after team pulse).
- Positioning price-wise: Calm Business and Headspace for Work occupy the "wellness benefit" budget line at comparable per-seat rates — we arrive as the one that fixes attention rather than soundtracking it.

## 5. Why this wins (the sales narrative)

- **Two budgets, one purchase:** wellbeing/HR (mental-health benefit, team building, retention, employer brand) + CSR (real donations with employee fingerprints on them). Note: we deliberately do NOT sell productivity — the pitch is *"the company that gives you your own time back"*, which is a recruiting weapon no productivity claim could match. **But the whisper line for the buyer's CFO memo is real and citable (L, 2026-07-28: "happier and less frustrated employees are more productive"):** happy workers are ~13% more productive per the causal BT field study (Bellet, De Neve & Ward, Management Science; Oxford Saïd) and ~12% in earlier experiments (Oswald, Proto & Sgroi, J. Labor Economics 2015). We sell people's own time; the business case writes itself — with someone else's peer-reviewed numbers, never our claims.
- **The anti-surveillance wellness product:** the market is full of productivity monitoring dressed as wellness; we are architecturally incapable of it — that's the demo moment ("here's the dashboard; notice what isn't in it").
- **Recruiting content built in:** "our team's hours funded 12,000 meals this year" is an employer-brand asset no meditation subscription produces.
- **Newsjacking works B2B too:** the addiction verdicts and bans that power consumer PR give HR leaders cover to put "attention" on the benefits agenda.
- **Funnel synergy:** every Teams seat gifts the consumer product; alumni keep personal jars after leaving. Teams is consumer acquisition that someone else pays for.

## 6. Measurement (honest, like everything else)

Reclaimed off-hours use the same baseline-delta methodology as consumer (each participant vs their own pre-campaign baseline, counted only outside their self-declared work window; aggregated k≥5). Published methodology; no inflated "productivity gains" claims — we count reclaimed hours and unlocked donations, and let the company's own pulse surveys claim the rest. Optional anonymous 2-question pulse (start/end of campaign) to give HR a before/after wellbeing signal.

## 7. Risks & mitigations

- **Participation apathy** → short campaigns, leader modeling, squad self-formation, the vote, the ceremony. Target: 40%+ opt-in at design partners.
- **"Is this surveillance?" skepticism** → the architecturally-absent dashboard demo + printed privacy promise; works councils/EU postponed (US-first).
- **Gaming (idle phones counting as hours)** → same honest counting as consumer (shield events + baseline delta), plus campaign calibration; the stakes are charitable, so gaming incentive is low — nobody profits from cheating.
- **Sales capacity (solo founder)** → design partners via warm intros only in phase 3; no outbound motion until consumer proves the story.
- **Sabotage-resistance (analyzed 2026-07-28):** the employer's exposure is pre-committed and capped at the pledge; malicious over-participation just funds the charity, and faked hours send capped money to the cause, not to the cheater. No path lets malice extract value or exceed the chosen budget. Worst attack = apathy (jar stays empty; company keeps unspent pledge).
- **Why employee-paid penalties stay out of the workplace context:** power dynamics contaminate voluntary consent; flat penalties are regressive across pay grades; shame/licensing effects amplify under observation (colleagues = maximum observation); and the Glassdoor-post brand risk is asymmetric. Employees who want stakes have them in their private personal jar (invisible to employer). The safe middle path is now a shipped feature: **Private Boost** (§2) — gifts, never penalties, amounts never shown. Workplace penalties remain never.

## 8. The launch board (L, 2026-07-28: Teams as the consumer growth engine)

Teams isn't just revenue — it's a **launch board**: every company becomes a pad from which individuals fire ScrollJar outward, past the company walls.

- **Every seat is already a personal Plus membership** → personal buddy and group jars → the standard invitation system (invite links, invites-that-donate) reaches friends and family *outside* the company. The employer pays for the seat; the seat launches consumer households.
- **Family extension (employer toggle):** each seat can extend Plus to up to 2 household members — a benefit upgrade companies already understand (the Calm/Headspace family model), and every extension seeds a consumer home.
- **Plus-one campaigns (opt-in per company):** an employee may attach one outside plus-one (partner, friend) to a company campaign; the plus-one's clean hours count at 50% toward the Company Jar. Every campaign becomes a wave of invitations with a cause attached — and the employer chose the rate, so the pledge math stays honest.
- **Share moments engineered to leave the building:** the tip-out ceremony share card ("My hours helped fund 2,400 meals"), squad bragging cards, Year in the Company Jar — all designed for the feed the recipient's *friends* see, not the company intranet.
- **The alumni effect:** leave the job, keep your jar (with a leaver's discount). The benefit outlives the deal; the consumer relationship compounds across careers.
- **Metric:** external activations per seat per campaign — the launch-board K-factor. This is the number that makes Teams not just self-sustaining but *self-marketing*.

## 9. Timing & open decisions

Build after consumer launch (phase 3–4); **sell before building** — pitch design partners during beta with mockups; let a signed pilot LOI pull the build forward.

Open: seat price final ($4?) · min seats (25?) · campaign default (6 weeks?) · pilot targets (which 2–3 companies — L's network?) · whether squads can span companies later ("industry leagues") · university edition (student success offices) as a near-B2B second wedge.

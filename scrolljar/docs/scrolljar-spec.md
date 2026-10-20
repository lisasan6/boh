# ScrollJar — Product Specification & Roadmap

**v1.4 · October 20, 2026** (v1.3: October 15, 2026 · v1.2: July 27, 2026) **· US-first launch (USD) · supersedes v1.0 (EUR/EU-first)**

**v1.4 changes (2026-10-20, L's decisions after the legal review; they override all older text below, v1.3 included).** Background: `legal-brief-2026-10.md`; options and reasons: `legal-design-options-2026-10.md`. Still to confirm with counsel, the charity partners and Apple.
- **The honor jar (Version 1).** Coins are counted in the app, and no money moves there. On the 1st, "Your jar is ready" opens a secure donation page from the charity partner with the amount filled in (Apple Pay works). The user gives straight to the charity and gets their own receipt. ScrollJar never holds coin money and stores no card for coins. One reminder, never chasing. Coins can be taken back within 48 hours.
  - **Version 2:** automatic monthly charging, done by a partner on its own account (never through ScrollJar's balance), once a partner agrees and counsel signs off. If charges vary, the user agrees a range up front, so advance notice is only needed outside it.
- **Cause funds.** Users pick a cause (5–10 at launch), each run as a fund by one partner charity with a written agreement. **"Suggest a charity"**: ScrollJar asks the charity to opt in and adds it once it agrees. Users in Hawaii see opted-in charities only. Before a charity is picked, a short disclosure says who receives the donation, any partner fee, payout timing and that the partner may redirect to a similar charity.
- **ScrollJar pays the card fees on every plan** (about 3–5% of coin volume, from membership revenue). No fee is ever added on top. This needs an arrangement with the partner, for example the partner invoicing ScrollJar for fees.
- **The wording:** "Every coin goes to your charity. We keep none of it, and we pay the fees." Never "100% reaches the program".
- **Plus sells what's on top:** unlimited deals, groups and challenges, the tricky-hours heads-up and deep stats. Blocking, the pause and every kindness feature stay free. Plus no longer "covers card fees" (everyone gets that).
- **Jar break is one normal coin (1×)**, not 5×, after the same grace hour. Triggers: switching off Screen Time access or deleting the app mid-deal (there is no card to remove).
- **Money features are 18+** (coins, Plus, Backing), confirmed at "Make it real" and checked with Apple's age-range signal. Teens join only through Families, without money.
- **Families launches after Version 1**, after a children's-privacy review. **No kid accounts:** the parent manages the child's phone through Apple's Family Controls and everything sits under the parent's account. No child names on our server, no posting by kids, receipts in the parent's name; each kid sees their cause on the family's phones.
- **Pledges (Teams, Families) are charged only for what's unlocked**, at the end of each month or campaign. Nothing is charged up front.
- **Backing treats:** gift cards for physical goods or services only (printed books, coffee, cinema). No "month of Plus". A treat not picked within 30 days goes to the friend's own charity.
- **No public posts in Version 1.** The Board's public notes come later, with a filter, a report button, blocking and published contact details (Apple 1.2).
- **Mood check-ins stay on the phone.** Research data only with a separate opt-in, independent ethics approval first, stored apart from accounts.
- **Privacy:** GDPR is the baseline worldwide; data hosted in the EU (Supabase EU region). Company type (Italian SRL or Delaware) still open (Q16).
- **Accessibility:** "Never mind, continue" keeps moving by default, but stays in one place with VoiceOver, Switch Control or Reduce Motion on, or by a setting.
- **Launch plan:** Version 1 is US only (shields, the pause, deals, the honor jar, cause funds). Version 2 adds partner automation. Version 3 adds Families, then the EU with local charity partners.

**v1.3 changes (2026-10-14/15, L's decisions; they override older text below):**
- **Deals.** In the product the user's rules are **deals** ("Make a deal", "Seal the deal", "Your deals"). Where this spec says "commitment", read "deal".
- **Deals are always editable.** Stricter changes apply now; easier ones apply after 24 hours; ending a deal is free with 24 hours' notice.
- **Membership is Free + Plus** (replaces §6's Ghost Jar / Jar Hero / Jar Legend):
  - Real coins (the stakes) work on Free. ~~Card fee added on top~~ (v1.4: ScrollJar pays card fees on every plan).
  - **Plus** ($3.99/mo · $29.99/yr) adds unlimited deals, groups and challenges, the tricky-hours heads-up and deep stats.
  - Free keeps **3 deals** and every kindness feature. Details: `sketchpad.md` → Monetization.
- **Breath pause:** one slow breath of about 10 seconds.
  - The stay button appears first and stays easy to tap. It speaks in the user's own words: "Back to my novel" (or "I'll stay committed" when the deal says nothing about what the time is for).
  - A small "Never mind, continue" follows and stops somewhere new each time, so going on is always a deliberate tap.
- **Positioning: we limit autopilot, not content.** Entertainment and creators are fine; mindless, automatic scrolling is the target. Copy is time-neutral (no "evenings" or "nights"; mornings matter as much).
- **The social tab is BOARD:** shared jars and what people share.
- **The jar has a character:**
  - It has a face with moods and is never sad. It has a lid colour the owner picks (silver by default) and a natural coin pile.
  - The monthly tip-out: the lid pops open, the coins rise out to the cause, the lid goes back on, and the jar spins and shines with joy.
  - Engineering details: `IOS-BUILD-SPEC.md` §7a.
- **New audiences** (Teams first, then Families and Creators):
  - **Teams:** scroll-free hours, glowing lights in the jar, employer funds everything. See `scrolljar-teams-spec.md`.
  - **Families:** a parent pledges; kids' scroll-free hours unlock it for a cause the kid picks. Kids are never charged or paid; any reward is a shared non-cash family treat.
  - **Creators:** feeds shielded, posting tools open, posting windows, and optional public challenges where followers set their own deals and every coin goes to the cause.
  - The rules for all three are in `CLAUDE.md` → Product rules.

**v1.2 seam fixes:** commitments outlive membership (cancellation ≠ escape hatch) · supporter state (no day-31 cliff in group jars) · Legend 50% framed strictly as corporate giving · four-stream giving ledger on the transparency page · escalation × cap collision guard · Legend flair never ranks.

> ScrollJar is a swear jar for scrolling. Block your vampire apps; if you break your own commitment, the penalty you chose drops into a jar — and the jar empties to charity. You can always choose distraction. It just shouldn't be free.

**v1.1 changes:** US market + USD (was EU/EUR) · Every.org as charity rail · 3-tier membership (names pending) with 50%-to-charity top tier · peek valve (48h) · jar break 5× + grace hour · opt-in price escalation capped at 2× · success-side giving with user-chosen cause · invitation system · 2-minute first block onboarding · dual-register design (vibrant core, calm support).

---

## 1. Positioning

**The trust position: we never keep your money.** 100% of penalties go to charity (minus card fees, disclosed). Revenue is membership only — ScrollJar is the only player whose incentives point at the user succeeding.

Whitespace (verified July 2026): nobody ships persistent OS-level blocking + automatic money penalty + charity destination. Forfeit has the engine but keeps the money; Opal/one sec/Jomo are gentle without stakes; StickK/Beeminder stake without blocking; ScreenFence is an unlaunched waitlist. Market: ~$3.8B growing ~11%/yr; Opal hit ~$10M ARR on subscriptions; Forfeit users staked $8.7M+.

**US-first rationale:** biggest category market; ~87–88% of US teens own iPhones (Piper Sandler) and the target demo (students, Gen Z, young knowledge workers) skews harder Apple; Every.org rail (1M+ US 501(c)(3)s) makes the charity mechanics nearly turnkey. iOS-first, not iOS-only — Android is phase 3, timeline set by waitlist platform data.

## 2. Product principles

1. **Freedom preserved.** Never hard-lock; every block is overridable at the price the user chose.
2. **We never profit from failure.** Penalties → charity. Always.
3. **Failure produces good.** Impact framing, never shame. (Science: guilt repairs, shame relapses — Tangney; AVE.)
4. **Friction is the feature.** The pause is the product.
5. **Cold blood / warm moments.** Setup and loosening happen calmly: tightening is instant, weakening takes 24h.
6. **We refuse to steal attention.** No engagement tricks; sacred touchpoints only. Good dopamine: earned, fixed, predictable — never variable-ratio.
7. **The Voice Law.** Every string helps someone become who they're trying to be. Banned: failed, wasted, guilty, shame.

## 3. Core loop

Commit (apps, schedule, price, charity, optional intention) → Live (OS shields) → Moment of choice (shield → breath pause → pay-or-close) → Outcome (time returned, or a coin in the jar) → Monthly tip-out (one charge → charity) → Impact story → Recommit / invite. Both branches produce a positive story — relapse does good, so relapse doesn't churn.

## 4. Mechanics (all decided)

- **Deal** (this spec's "commitment"; editable at any time, see v1.3 notes): apps via FamilyActivityPicker (+ web domains — instagram.com in Safari is shielded too) · schedule (always/windows/weekdays) · override price **$2–25, default $5** · charity · optional one-line intention ("what is this hour for?" — shown on the shield; skippable).
- **Override:** shield → "Open anyway ($5)" → notification → app → one slow breath (~10s): "Back to my novel" (the stay button, in the user's words) first and easy, a small "Never mind, continue" after it in a new spot each time (the easy way out is the science's MVP — PNAS 2023) → confirm → access window (5/15/30 min, Live Activity countdown) → coin drops (warm amber, never red).
- **Peek valve:** one free peek per **48 hours**, length set at commitment creation (2–10 min, default 5). Breath pause + visible countdown; never breaks a clean day; shortening is instant, lengthening takes 24h. For genuine needs (work DMs) — kills the #1 rage-quit without making distraction free-on-demand. **In the prototype (2026-10-19):** offered on the coin sheet, after the pause ("Need to check something real? Your free peek: 5 minutes, no coin, and today still counts as kept"), then the usual countdown; when resting, the sheet and You say when it's back. A peek doesn't count toward rising price or a friend's backing. Length (2, 5 or 10 min) is set in You for now; per deal in the real app.
- **The Jar:** coins accumulate; **monthly settlement** — *(v1.4: the honor jar, the user gives on the partner's page on the 1st; no charge by ScrollJar)* ~~one charge on the 1st, routed to charity~~; receipt + tip-out celebration (THE confetti moment). Monthly cap default **$50** (jar full → blocks stay on; raising the cap is deliberate and visible to accountability friends). **48h kindness refund**, no questions (>3/month pauses stakes).
- **Jar break (anti-cheat), disclosed in plain words at commitment creation:** escaping mid-commitment (revoking Screen Time permission, deleting the app) = breaking the jar = **one normal coin (1×)** *(v1.4; was 5×)*. **Grace hour first:** warning notification + 60 minutes to restore before anything is charged — accidents and iOS glitches forgiven. Ending a deal is always free with 24h notice. Clarity requirements: plain-words card at creation, reminder before any charge, the rule restated in Terms exactly as in-app. **Copy (L, 2026-10-16):** lead with the free way out, then the safeguard; never "breaking the jar", "pull the plug" or "honestly" in user-facing words ("honestly" implies the other way is dishonest). Say "it counts as one coin at 5× your price".
- **Canceling a membership is never an escape hatch:** cancellation stops *renewal*, but active commitments run to their honest end (the per-commitment 24h-notice exit is always available) and the jar settles as normal. Stated in plain words on the cancellation screen and in Terms. Otherwise canceling a $49.99 subscription would be the cheapest override in the app.
- **Price escalation (opt-in, capped 2×):** at commitment creation the user may pre-authorize "if I get comfortable overriding, raise my price" — gradual, automatic, **ceiling 2× the original price**, always visible, cancellable with 24h notice. Never a nag; escalation chosen in cold blood. **Steps (prototype, 2026-10-19):** each opening in a week adds about a quarter of the price, rounded up to whole dollars ($5 → $7 → $9 → $10), and it's back to the deal's own price every Monday. In "Make a deal" and the deal editor it's a switch, "Raise it if it gets easy": on applies now, off waits 24 hours. **Cap-collision guard:** if price × escalation ceiling approaches the monthly cap (e.g., $25 × 2 = the $50 default), setup prompts a cap review at creation time — one escalated coin must never fill the jar and freeze stakes for the month.
- **Streaks:** lifetime clean days accrue forever; a relapse day is a "coin day" that counts toward impact. Never resets (JCR 2023: broken chains kill motivation).
- **Success-side giving:** every 10 clean days, ScrollJar donates a fixed visible unit (e.g., 1 tree / 2 meals) from membership revenue — **to a cause the user chooses** (may differ from their penalty charity). Monthly company budget cap; unit economics reviewed quarterly.
  - **Skipped for now (L, 2026-10-20).** Designed and then removed: on top of covering card fees, a fixed gift per person would leave yearly Plus members at a loss (at 50¢ per 10 days, a typical member nets about −$0.19 a month). If it comes back, fund it from a fixed slice of Plus revenue (e.g. 10%) rather than a fixed amount per person. The design is in git history (commit "Plus: tricky-hours heads-up and giving when you win").
- **Tricky-hours heads-up (Plus, 2026-10-19):** on "More about your week": a week map of when the pull came (last 3 weeks), built **only from shield moments** (we never see apps or usage), the trickiest window in one line, and an optional heads-up 15 minutes before it ("Sunday nights tend to get tricky around 9. Want to line something up?" with "Start my time at 9" / "Not this week"). Includes **"We noticed."** (brainstorm #6): a rare note after a tricky hour went well. At most two a week, never late at night, never a countdown. The pause and rough-day support stay free.
- **Letters to your future self (2026-10-19):** optional, written when you make a deal (a step in "Make a deal", and a row on the Day 1 card), up to 280 characters. It comes back as a letter after 30 days ("You wrote this a month ago"), then lives in the diary. On the phone only: nothing reads, sorts or answers it, and it's never quoted back anywhere else.
- **Rough-day response:** after an expensive day — a check-in, not a bill; pattern insight ("your coins drop after 10pm on Sundays") + self-compassionate copy; restart prompts appear only after rough patches (fresh-start science), never as resets for people doing well.
- **Non-monetary stakes** (v1.5): streak visibility, effort unlocks, social stakes — first-class for students.

## 5. Onboarding — the 2-minute first block

1. One manifesto beat ("We don't want your attention. We want it back in your hands.")
2. Screen Time permission with pre-permission explainer.
3. **Pick your apps** — self-chosen, with "The Classics" starter pack and templates (Study / Sleep 10pm–7am / Work hours / Full detox) as one-tap suggestions, never assumptions.
4. Blocked. That's the whole first run — no card, no account wall.
   - **Sign your deal (2026-10-19):** "Seal the deal" opens "In your own hand": the deal in plain words and a space to sign with a finger. Optional ("Seal it without signing"); the signature stays on the phone and shows on the Day 1 card.
   - **The Last Scroll (2026-10-19):** right after sealing, "One last scroll? Five minutes, on purpose. A goodbye to the automatic kind." A 5-minute countdown, then "That was the last unconscious one. From now on, every scroll is a choice." Skippable: "No need. Shield on now."
5. **Ghost-first:** everyone starts free. Day ~3, after real resisted temptations: "want to make it real?" → stakes + charity + card (Stripe SetupIntent, plain-language mandate).
6. Optional if-then plan ("If I reach for Instagram at night, then I ___" — implementation intentions, d=0.65) and baseline week capture for honest math.

## 6. Membership — Ghost Jar → Jar Hero → Jar Legend (decided 2026-07-27)

> **Replaced on 2026-10-14 by Free + Plus** (see the v1.3 notes at the top). Kept for history: the configuration rules below (kindness never paywalled, the free tier must genuinely work, no day-31 cliff, strength-point upgrades) still apply to Free + Plus.

| | **Ghost Jar** — free forever | **Jar Hero** — $5.99/mo · $49.99/yr | **Jar Legend** — $9.99/mo · $79.99/yr |
|---|---|---|---|
| Blocking (apps + web), schedules, templates, breath pause | ✅ | ✅ | ✅ |
| Peek valve (48h), widget, rough-day support | ✅ | ✅ | ✅ |
| Active commitments | 1 | Unlimited | Unlimited |
| Basic stats (time returned, streak) | ✅ | ✅ | ✅ |
| Buddy jar (1:1 witness, no stakes) | ✅ | ✅ | ✅ |
| **The stakes engine** — jar, charity penalties, settlement, refunds, escalation | — | ✅ | ✅ |
| Group jars + Our Hours challenges | — | ✅ | ✅ |
| Full impact history + success-side giving (10 clean days = 1 unit, your cause) | — | ✅ | ✅ **at 2× units** |
| Deep stats: Year in the Jar, records, percentiles | — | — | ✅ |
| AI companion (when it ships), early features | — | — | ✅ |
| Legend flair (subtle feed badge) + jar skins | — | — | ✅ |
| **50% of membership → charity, by default** | — | — | ✅ ("half of everything we receive," audited) |

**Configuration rules:**
- **Kindness is never paywalled:** the breath pause, peek valve, rough-day support, accessibility, and science notes are identical at every tier — support features are not upsell levers.
- **The free tier must genuinely work** (a real blocker with real friction) — it's the trial, the proof of kindness, and the top of the funnel. No card, ever, on Ghost.
- **Upgrade moments** (strength points, never nags): day-3 graduation prompt ("want to make it real?"), adding a 2nd commitment, receiving a group-jar invite, first 7-day streak.
- **Group-invite pass:** an invitee joining a group jar gets **30 days of Jar Hero free** — the paywall never lands on the viral moment. (Inviter still earns the $1 donation; no give/get stacking.)
- **The supporter state (no day-31 cliff):** when a member's Hero lapses (pass expiry or cancellation), they never "fall out" of their group jar. They become a **supporter**: still visibly in the group, streaks shown, kudos given and received, no stakes — labeled warmly, one tap from rejoining with stakes. Nobody is grayed out, ever.
- **Legend's 50% is corporate giving, always:** framed as *"we give half of everything we receive"* — ScrollJar donates; the user buys a membership. Never "your donation," no tax-receipt implication, no donation language in the paywall (Apple 3.2 + tax accuracy). Same model as (RED) products.
- **Legend flair never ranks:** cosmetic identity only — it must never sort feeds, gray others out, or imply standing. (Guardrail on the no-status-shame principle.)
- **No pricing dark patterns** (Voice Law extends to the paywall): no fake countdown discounts, no pre-checked upsells, annual shown honestly next to monthly.
- Paywall trust line: *"Your membership is what lets us give away 100% of every penalty."* Memberships via Apple IAP; penalties outside IAP via Stripe (Beeminder/StickK/Forfeit precedent).

## 7. Social & invitations

- **Buddy jar (1:1)** — one witness — and **group jars** (shared jar + charity, invite links). The viral loop is "join my jar," never "download ScrollJar."
- **Strava-model feed:** finite (your groups' week, then it ends), no algorithm, no strangers; kudos, no reciprocity nudges; **outcomes only** (weeks survived, dollars donated — never announced intentions, per Gollwitzer 2009); approval-framed community stats; no leaderboards, ever; amounts hideable (coins, not $).
- **Invitation mechanics:** invite link + QR + share card → warm web preview (jar name, charity, members; no login) → App Store → deferred deep link (server-side claim code) lands the invitee inside the joining flow.
- **Invites that donate:** when an invitee **joins a jar and completes their first active week**, ScrollJar donates **$1** to the inviter's jar charity. Guardrails: activation-triggered only, max 10 rewarded invites/user, global monthly budget cap. Invite prompts appear at strength points only (7-day milestone, won challenge, Year in the Jar).
- **Day 7 (designed 2026-10-19, prototype `ov-week`):** on the 7th day of a deal, every time (earned and predictable, never a surprise reward): the jar hops and smiles, "A whole week, kept.", and an optional share card ("A week, kept." · your hours back · "7 days in a row"). The card never shows apps or coins; your hours are on by default, the deal's name off. Post it to your jars, send it to someone with a link to your jar that opens without the app (the strength-point invite), or keep it to yourself.
- **Web kudos** (v1.5): non-users can 👏 a shared milestone card from the web.
- No contact-book import. Invites are handmade.
- **Wish jars (L, 2026-10-16):** a jar for something a group wants together (a trip, a dinner out, a concert, something for home). It **fills with scroll-free time**: every hour a person's own deals give back adds an agreed amount ($0.50, $1 or $2), for each person. **Coins are virtual: ScrollJar never touches the money.** At the goal each person sees only their own share and settles it however the group likes.
  - **Slips don't count and cost nothing here.** Personal deals keep sending their coins 100% to charity. Filling the wish from slips was rejected: it would turn slipping into the way to get the trip (same reason "penalties to own savings" is parked).
  - **Who sees what:** the wish, the total, the date and who's in. Never who slipped, anyone's time or apps, or anyone's share but your own.
  - **Date is optional.** If it comes first, nothing is owed: move the date, or settle for what you reached. It's a plan, not a debt.
  - **Up to 2 scroll-free hours a day count per person (default, to test with users).** Without a cap the person doing best would owe the most, and people might keep their deals small to keep their share small. At $1 an hour the most anyone puts in is about $60 a month, shown up front at setup.
  - **Plans:** free with one friend; groups of three or more are Plus (same line as buddy jars vs groups).
  - Families already have the family treat (kids' scroll-free hours unlock a parent's pledge); wish jars are the grown-ups' and friends' version.
- **The Bell (designed 2026-10-20, brainstorm #3):** once a day a shared jar goes quiet together, at a time the jar picks (7pm to 10pm, or 7am; never fixed at 9pm, so shift workers fit). Each person opts in. When it rings: an hour of shields for whoever's in, and a count of how many are off-screen, never who. Not a deal: skipping costs nothing and nobody sees it.
- **Dinner jars (designed 2026-10-20, brainstorm #10):** ready-made shared deals for two, from the + on the Board: "Phones down at dinner" (7–8:30pm) and "Screens out of the bedroom" (10:30pm–7am). An offer the other person accepts; both get the same shield hours, each keeps their own price and charity, and changes follow the usual cold-blood rule.
- **Backing a friend (L's idea, 2026-07-28; designed 2026-10-19):** someone you share a jar with backs your deals for **3 days, a week or two weeks**, with **$5–25**. A gift either way: a treat for you, or your cause.
  - **Day by day:** each day you keep your deals, that day's share (amount ÷ days) becomes your treat. A day you open anyway sends that day's share to **your own charity**. No cliff: one slip never wipes out the rest.
  - **The treat** is a gift card you pick at the end (printed books, coffee, cinema). *(v1.4: no month of Plus; not picked within 30 days, it goes to the friend's charity.)* **Never cash** (cash payouts to friends stay parked).
  - **The backer pays the full amount either way, when it ends, and nothing ever goes back to them.** That makes it a unilateral conditional gift, never a bet, and nobody can collude to profit. *(v1.4: ScrollJar pays the card fee on every plan, and this money flow must be redesigned so it never passes through ScrollJar.)*
  - **Consent:** it's an offer. The friend says "Yes, back me" or "Not now" (no reason needed; the backer sees "not this time"). The backer can take a pending offer back; once accepted it runs to the end.
  - **Who sees what:** the backer sees how many days were kept, never which apps, when, or which days, and hears when it ends, not every day. You see your own days.
  - **At the moment of temptation, gently:** one quiet line in the breathing pause ("Noor's backing your week. Today's share is still yours.") and an honest line on the coin sheet ("Opening now also sends today's share of Noor's backing, $1.43, to …"). Never a countdown, never guilt.
  - **Limits:** only people you share a jar with · one backing per pair at a time · up to five active per backer · never for under-18s (kids are never paid) · free on every plan.
  - **Open:** gift-card partner and its fees (a rewards API), launch vs fast-follow (Q18), and prize-promotion law per country before going beyond the US (Q19).

## 8. Stats, impact & the Big Counter

- **Time returned** vs the user's own onboarding baseline — honest math, methodology published.
- **The Big Counter** (landing + in-app): "$X donated · Y hours returned to their owners." Real, audited monthly, backed by the public transparency page. The **reclaimed-hours mural** (v1.5): ambient anonymized cards ("someone in Austin read for 40 minutes") from opt-in posts.
- Impact display: one vivid unit ("$5 ≈ 10 school meals"), "100% reaches the program" explicit (highest-converting frame — Science 2014). Measure the enemy, not the joy (Etkin): reclaimed-time stories stay narrative.
- Weekly recap (sacred touchpoint): the week's story + "name one thing you did with a returned hour." Optional mood check-ins (v1.5) feed the future efficacy study.

## 9. Money architecture (USD)

- *(v1.4: Version 1 uses the honor jar, so no coin charges by ScrollJar; the lines below apply only to a later partner-run version and must not route money through ScrollJar.)*
- **Penalties:** Stripe — SetupIntent + 3DS at card save with explicit mandate; one off-session settlement on the 1st; US-first = light SCA burden (EU flow at expansion). Dispute defense: contract at creation, confirmation logs, 48h refunds, pre-settlement email.
- **Charity rail:** *(v1.4: cause funds, 5–10 partner charities with written agreements; Every.org's API can't make donations, so its donate pages fit the honor jar)* ~~Every.org~~ (free API, 1M+ 501(c)(3)s, 0% platform fee, receipts + regrant compliance absorbed). Direct partnerships + Pledge/Change added for EU expansion later.
- **Memberships:** Apple IAP (StoreKit 2).
- **Transparency page — the giving ledger:** ScrollJar now has four giving streams, and the page shows each as its own auditable line: (1) **penalties — 100%**, (2) **Legend memberships — 50% floor**, defined strictly as half of Legend revenue received after platform fees, (3) **success-side giving** (units × cost, monthly company cap), (4) **invite donations** ($1 × activations, capped). No blending, no double-counting; a skeptical journalist audits it in one glance. The page is the marketing; the Big Counter sits on it.

## 10. Platform & architecture

- **iOS 16+, Swift/SwiftUI.** Targets: app + ShieldConfiguration + ShieldAction + DeviceActivityMonitor (6MB limit) extensions; App Group state; ~50-token shield cap (prefer categories); shield → local notification → host-app override flow. **Family Controls distribution entitlement requested for every bundle ID in week 0** (days-to-weeks approval, gates TestFlight).
- **Widgets:** Home Screen jar widget v1 (glanceable streak + jar level; zero engagement mechanics). Lock Screen = open Q15.
- **Backend:** small, EU-hosted *(v1.4; was US-hosted)* (Supabase EU region or Node+Postgres); Stripe + Every.org + APNs; events not content; export/delete built in. Privacy stance: opaque tokens mean we cannot see which apps users struggle with — "we couldn't spy on you even if we wanted to."
- **Invitations:** universal links + web preview + claim codes (deferred deep linking).
- **Android (phase 3):** accessibility service + usage-stats fallback + specialUse FGS + overlay; Play declarations; OEM battery onboarding; timeline driven by waitlist Android demand.

## 11. Design — dual-register system

- **Core register (the app): vibrant, exciting, adult.** Committed saturated color (deepened emerald-teal, electric gold, punchy accents), modern display type (Fredoka under review — candidates Sora/Outfit/Space Grotesk), sleek glassy jar mascot (charming, never babyish). No pastel kindergarten.
- **Support register (breath pause, rough day, resources): calming** — the serene soft-teal-on-cream palette lives here.
- Constants: curved shapes, amber-never-red for coins, motion 100–400ms, breathing idle, reduce-motion honored, CVD-validated chart colors (revalidate on new surfaces). Full brief + identity variations in the project.

## 12. Compliance (US-first)

> ⚠️ **2026-10-20: see `docs/legal-brief-2026-10.md` and the v1.4 notes at the top.** L's decisions answer most of the brief: the honor jar keeps donations outside the app and outside ScrollJar's hands (Apple 3.2.2(iv)), cause funds handle charity consent, GDPR is the baseline. Still open: ask App Review early about 4.10 (no monetizing Screen Time APIs) and the donation link-out, and confirm everything with counsel. The lines below predate that research.

- **Apple:** penalties outside IAP under 3.1.3(e) (precedent dossier: Beeminder, StickK, Forfeit); donations executed server-side via Every.org (users donate through the platform 501(c)(3)); memberships via IAP. Entitlement requests day 0.
- **US:** commercial co-venturer analysis — mitigated by Every.org direct-donation structure; state registrations reviewed with counsel before "we donate" marketing claims. **Entity question (open Q16):** Delaware C-corp/LLC vs Italian entity with US ops — advisor needed before Stripe/App Store contracts.
- **EU (expansion phase):** SCA flows, Italian localization (Voice Law rewritten natively), Italy Law 120/2026 AGCM notification ≥15 days before charity-linked marketing.
- Terms: the commitment contract in plain language; jar break stated exactly as in-app.

## 13. Metrics

North star: **committed hours honored / week**. Health: D30 retention of users with ≥1 active commitment; override rate (healthy ~5–15%); settlement success; % in a buddy/group jar; K-factor on jar invites; $ donated (marketing metric, never revenue).

## 14. Roadmap

| Phase | Weeks | Ships |
|---|---|---|
| 0 — Foundations | 0–2 | Entitlement requests (all bundle IDs), US entity + advisor, Stripe + Every.org accounts, trademark search, identity lock, backend scaffold |
| 1 — iOS build | 2–10 | Blocking core + shield bridge → jar + payments + settlement → charity + stats + baseline → buddy/group jars + invitations → onboarding (2-min first block, ghost-first) |
| 2 — Beta & launch | 10–16 | TestFlight 100–300 (r/nosurf, US colleges), App Review precedent dossier, transparency page + Big Counter live, US launch. **+ Teams sell-before-build: pitch design partners with mockups (Teams = candidate main revenue stream, per L 2026-07-28)** |
| 3 — Android + study | 16–28 | Android build (if waitlist demand supports); efficacy-study partnership (first RCT in the category — unclaimed); **Teams design-partner pilots (2–3 companies, 6 weeks, free)** |
| 4 — Growth & EU | 28+ | **Teams GA (the revenue engine)**, group leagues, seasonal campaigns, Year in the Jar, EU/Italy expansion (SCA, AGCM, Italian localization) |

## 15. Top risks

Entitlement delay (apply day 0) · App Review charity objection (precedent dossier; Every.org structure) · chargebacks (mandate + refunds + logs) · ScreenFence/Forfeit moves (speed; trust brand is hard to copy) · US CAC (mitigations: invites-that-donate, newsjacking calendar — Aug 18 AG trial, rolling verdicts) · entity/tax complexity for an Italian founder (advisor, Q16).

## 16. Open questions (live list in sketchpad)

Tier names (L wants catchy, universally popular — ninja/master direction) · Ghost Jar exact limits (Q4) · group settlement per-member vs pooled (Q5) · "what I did with my hour" posts in v1? (Q8) · science notes placement (Q9) · AI companion privacy shape (Q11) · Big Counter methodology publication (Q12) · widget scope (Q15) · US entity (Q16).

---

*Companion docs: sketchpad (living ideas + Voice Law), psychology-playbook (design rules with receipts), evidence-dossier (legal/regulatory ammunition), science-dossier-bibliography, design-brief, operating-map (how it all connects), mission-control-checklist.*

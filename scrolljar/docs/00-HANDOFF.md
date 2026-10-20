# ScrollJar: handoff to Claude Code

**Date:** 2026-10-13, updated 2026-10-16. Read this first. Anything not marked OPEN is decided.

This replaces `handoff-to-claude-code.md` (31 July), which is kept for history.

---

## 1. The product in 5 lines

1. The user picks the apps that drink their time. iOS blocks them through Apple's Screen Time API, a real system-level block.
2. Opening one anyway is always allowed, after a short breath pause, at a price the user set ($2–25, default $5).
3. The price drops as a coin into the user's jar. On the 1st of each month the jar empties: **100% goes to a charity the user chose**, with a receipt.
4. ScrollJar earns money only from memberships. **Updated 2026-10-14:** real coins (the stakes) are free for everyone; free users see the card fee added on top so 100% of the coins arrive. One paid plan, **Plus** ($3.99/mo or $29.99/yr), covers card fees and adds groups and challenges, the danger-hours forecast, deep stats and unlimited deals. Free keeps 3 deals and every kindness feature. (This replaces Ghost Jar / Jar Hero / Jar Legend; see `docs/sketchpad.md`, Monetization.)
5. Positioning: every other stakes app keeps your penalty money; we never touch it. "Either you win the hour, or a charity does." We limit autopilot, not content: entertainment and creators are fine, mindless scrolling isn't.

**Words:** the user's rules are **deals** ("Make a deal", "Seal the deal", "Your deals"). Older docs say "promise" or "commitment" for the same thing. The time people take back is **"your time"** ("Your Hours" for Teams, "Our Hours" for group challenges), never "focus" (2026-10-16).

## 2. What exists

| Asset | State | Where |
|---|---|---|
| **App prototype v2** | Complete and clickable: 20 screens and about 30 overlays, all flows working, day and night modes, plus Families, Creators and Teams. **The most valuable asset.** | `prototype/` |
| **Website** | Home, Teams, Families, Privacy and a 404 page in the app's night look, with the live prototype in the phones. Home has a "Sound familiar?" film reel (`#moments`, placeholder drawings until L's 9 images arrive) and a "Why money?" answer. **Ready to publish, not live** (see §4.2). | `landing/`, `deploy/` |
| **User tests** | A 30-minute script and a checklist for 5 sessions, updated 2026-10-16 for the new setup, voice answers, the Day 1 card and wish jars. Both docs have the same 6 tasks and 8 end questions. | [Test script](https://claude.ai/code/artifact/f2a0d9da-e08c-4b4b-962d-50aa3f93a30e), [checklist](https://claude.ai/code/artifact/19671cc6-1c63-47de-9664-604e588b5692) (Claude Docs) |
| Film prompts | Image-generator prompts for the 9 film scenes, plus how to keep them consistent | `docs/film-scene-prompts.md` |
| Product spec v1.3 | Canonical (v1.3 notes on top say what changed since v1.2) | `docs/scrolljar-spec.md` |
| Platform research | Re-verified 2026-07-30 | `docs/research-findings.md` |
| Design system (Aurora Chrome) | Locked for the app; jar character and motion updated 2026-10-15 | `docs/design-brief.md` |
| Psychology, evidence, science | Complete, with citations | `docs/psychology-playbook.md`, `docs/evidence-dossier.md`, `docs/science-dossier-bibliography.md` |
| Teams (B2B) mini-spec | Decisions of 2026-10-14 on top (scroll-free hours, pricing, notes) | `docs/scrolljar-teams-spec.md` |
| Ideas, Wobble design, open questions | Living doc | `docs/sketchpad.md` |
| **iOS build plan** | v1.1, 2026-10-15 | `docs/IOS-BUILD-SPEC.md` |

### Prototype map: what each screen and overlay is for

- **Tabs:** TODAY (`s-home`), DIARY (`s-diary`), BOARD (`s-friends`: the shared jars and what people share), YOU (`s-you`). In day mode the tab bar is light.
- **Core loop:** `ov-shield` ("You made a deal with yourself", 2 buttons; the stay button uses the user's own words, e.g. "Back to my novel", via `backTo` and `setStayButtons`) → `ov-ios` (the notification bridge) → `ov-breath` (one slow breath; the small "Never mind, continue" bounces and stops in a new spot each time) → `ov-instead` (what else this hour could be) → `ov-override` (pay $5) → `ov-window` (access countdown) → `ov-mood` (how do you feel now?).
- **Resisting:** `resist()` makes the jar hop; the first time, it opens `ov-firstwin` ("That's the whole product. You just didn't scroll."), followed by `ov-exit`, where the app invites you to leave.
- **Deals:** "Your deals" on Today; `s-new` ("Make a deal": apps from Apple's picker, which names the deal; a schedule that shows its hours; the price; an optional "what is this time for"; the whole deal in plain words, then "Seal the deal"); `ov-deal` edits one: stricter changes apply now, easier ones in 24 hours, ending is free with 24 hours' notice. Free has 3 deals.
- **Money:** `s-jar` (with the lid colour picker) and `s-charity`, then `ov-tipout`, the monthly ceremony: the lid pops off, the coins rise out with a count-up, the lid goes back on, and the jar spins (its face travels round the glass) and shines. Visible settlement steps and a receipt.
- **The jar:** one drawing for every jar (`buildJar` in `app.js`): a natural coin pile, a face with moods (never sad), eyes that follow your finger, a giggle when tapped, and a lid colour the owner picks (silver by default).
- **Wish jars** (2026-10-16): a group saves toward something it wants (a trip, a dinner) with **scroll-free time**, never with slips. `s-wish` (the jar, everyone's total, your own share, "Preview reaching it" → `ov-wishdone`), `ov-newjar` (pick "A wish jar", then what, how much, by when, $ per hour). Up to 2 scroll-free hours a day count per person (`WISH_DAY_CAP`). Coins are virtual; ScrollJar never touches the money; nothing is owed if the date passes. Free with one friend, Plus for groups. Entry points: the + chip in the Board's jar strip (week 3) and "Start a wish jar together" on the empty day-one Board. Spec: `scrolljar-spec.md` §7.
- **Plus extra** (2026-10-19): "Your tricky hours" on More about your week (a map from shield moments only, an optional heads-up, "We noticed"). On Free it's one plain line with "See Plus"; a prototype link previews Plus. ("When you win, we give too" was designed and then skipped on 2026-10-20 for cost; see spec §4.)
- **Sign your deal, the Last Scroll, letters** (2026-10-19): "Seal the deal" at the end of setup opens `ov-sign` (sign with a finger, optional; shown on the Day 1 card), then `ov-last` (one last 5-minute scroll on purpose, or skip). Letters to future you: a row on the Day 1 card and step 5 in Make a deal (`ov-letter`); back after 30 days as `ov-letterread`, then in the diary. Demo button "Day 30".
- **Peek valve** (2026-10-19): usable now. On the coin sheet after the pause, "Just a quick look?" opens a free 5-minute countdown (no coin, the day stays kept), then it rests 48 hours; You shows "Ready" or when it's back, and the length (2, 5, 10 min: shorter now, longer in 24h).
- **Day 7** (2026-10-19): `ov-week`, the week-kept moment with a share card (no apps or coins on it; hours on, deal name off by default): post to your jars, send with a jar link, or keep it. Demo button "Day 7" above the phone.
- **Rising price** (2026-10-19, spec §4): the opt-in switch "Raise it if it gets easy" in Make a deal and the deal editor. Each opening in a week adds about a quarter of the price in whole dollars, never more than double, back to normal every Monday; the shield and coin sheet show the current price (`curPrice`). A warning appears if double the price would fill the monthly cap. In the demo, "The loud one" has it on.
- **Widgets** (2026-10-19): `ov-widgets` previews ours on an iPhone Home Screen (medium + two small, with "Start 25 min") and Lock Screen (no money there), plus the Live Activity countdown with "I'm done" while an app is open. Open it from You → Widgets, or from the countdown after "Open anyway".
- **Backing a friend** (2026-10-19): a friend you share a jar with backs your week ($5–25, 3–14 days). Each kept day's share becomes a treat for you (a gift card or a month of Plus, never cash); a day you open anyway sends its share to your own charity. The backer pays either way and gets nothing back, and sees only counts. In the prototype (week 3): the "Backing" section on the Board (Sofia's offer, Noor backing you, you backing Marta, "+ Back a friend"), a "Backed by Noor" card on Today, one line in the pause and on the coin sheet, and `ov-backing` for every step. Spec: `scrolljar-spec.md` §7.
- **Social:**
  - `s-friends` (Board), `s-jardetail`, `s-challenge`, `s-invite`; `ov-compose` ("What did you do with it?", a post to your jars).
  - **Wobble** (`ov-wobble`) follows the "Ladder of Who Speaks": the friend live, then the friend's standby note, then your own words.
  - `ov-standby` is the composer for the standby note, with an AI-assisted draft and a "cold read" check.
- **Families:** `s-family` (grown-up view and a kid's view), `ov-famsetup`, `ov-famtip`. One family jar: gold coins are grown-ups' own, two-tone coins are unlocked by the kids' scroll-free hours from a parent's pledge. Optional non-cash family treat.
- **Creators:** `s-creator` (creator and follower views), `ov-crsetup` (feeds shielded, tools open, posting windows, an optional public challenge).
- **Teams (company):** `s-company`, `ov-cojoin`, `ov-conote` (notes on what people did, with the on-phone privacy check), `ov-ideas` (ideas saved with "I'll try this"), `ov-cotip`. The company jar fills with glowing lights, one per scroll-free hour.
- **Self-knowledge:** `s-diary` (trimmed 2026-10-15 to three things: one daily question, the weekly recap, your entries; `ov-entry` for a line, `ov-voice` for a voice note), `s-insights` and `s-story` (Your story), `s-recap` (also holds "Does it actually help?", fed by `ov-mood`, and the way into "Why it's hard"), `s-resources` and `s-resdetail` ("Why it's hard"), and `s-usage`.
- **Setup and plans:** `ov-onb` (4 slides; their icons stay as they are: L turned down two rounds of alternatives, 2026-10-19), `ov-preperm` → `ov-sysalert` → `ov-picker` (Apple's screens, mocked; `ov-noperm` if they say no), then `ov-first`: three first-deal questions (when scrolling gets you, with weekday chips; how it feels when time slips by; what you'd rather do with it). A "1 of 8" counter runs through all of setup (`OB_STEPS`, `obProg`). Every answer is multi-select, and each question has **"Say it instead"**: in the real app the phone turns speech into text on-device and shows it back for confirmation (CLAUDE.md). The prototype fakes it with a dashed "Prototype" row (`VOICE_DEMO`: clear, mumbled, off-topic, vague and heavy answers; a heavy answer gets a calm card linking findahelpline.com). `sealFirst` builds the first deal from the answers. Then `ov-real` (the day-3 "make it real" flow), `s-paywall` (Free and Plus).
- **Support register (calm teal):** breath, instead, rough day (`ov-rough`), exit.
- **Getting around:** every pop-up has a ✕ or its own way out, and every screen off a tab has a back arrow. Apple's shield, the breath pause, Apple's mocked screens and onboarding intentionally keep only their own buttons.
- **Day one vs week 3** (2026-10-15): finishing setup lands on **day one** (`S.stage='new'`): the Day 1 deal card (`renderD1Deal`, 2026-10-16) heads with what the time is for ("Room for your novel."), shows whether the shield is on right now (`shieldStatus`), stamps the seal, opens the deal on tap and can show the shield; then three first steps, an empty jar, nobody on the Board (with one example post), no diary entries yet. Opening anyway is **free until "Make it real"** (`S.stakes=false`): the pause, then 15 minutes, no coin. After "Make it real" each opening drops a coin at the chosen price. Skipping setup, the "Week 3" button and the website's embedded phone show the three-weeks-in view.
- **Demo controls** (hidden when embedded): Night/Day, Day 1/Week 3, "Day 3", "Day 7", "Day 30", "Company", "Family", "Creator", ↻. Embedding: `?embed=1`, plus `&show=family` to open on the family screen.

**The prototype follows real iOS (updated 2026-10-14).** The shield shows only a title, a subtitle, an icon and 2 buttons. "Open anyway" leads to a notification that the user taps to reach our app (ignoring it counts as resisting). Onboarding includes our Screen Time explainer, Apple's permission prompt (and a calm path if they say no) and Apple's app picker. The day-3 "make it real" flow (topbar button "Day 3") shows stakes, charity, the two separate payments (Plus via Apple, coins via card) and the plain-language mandate. See `IOS-BUILD-SPEC.md` §3.

## 3. Lost in a cloud-workspace reset (regenerate only if needed)

These files are referenced in the docs but no longer exist:

- `og.png`: the 1200×630 social share image. **Regenerated 2026-10-13** from the landing hero (`landing/og.png`).
- `scrolljar-financial-study.xlsx`: unit economics and 24-month scenarios. The key numbers survive in `sketchpad.md` → Monetization (Hero year nets $42.49, LTV ~$91, break-even ~356 subscribers).
- `scrolljar-aurora-chrome.html`: the living design-system page. The tokens survive in `prototype/styles.css` and `design-brief.md`.
- The identity-direction explorations (14 directions), the mission-control HTML page and a `scrolljar.skill` file. These are history only and need no action.

## 4. OPEN: what's blocking what

### 🔴 1. Apple Family Controls distribution entitlement

This gates TestFlight and the App Store, and approval takes weeks.

- **Check whether it has been filed.** If not, file it today. It needs no Mac: enrolment, identifiers and the request are all on developer.apple.com.
- The steps (checked against Apple's documentation on 2026-10-19), where to see the status, and text to paste into the form are in `IOS-BUILD-SPEC.md` §2.
- Development builds on your own iPhone do **not** need approval, so coding can start now.

### 🟠 2. Website: ready to publish (2026-10-15)

Everything technical is done: a privacy page, a "page not found" page, fonts served from the site (no Google), a build that publishes only the website and the live app (`deploy/build.sh`), and `netlify.toml` for zero-setup Netlify. **Step-by-step for L: `deploy/README.md`.** Still L's:

1. The privacy page's two placeholders: full legal name, city and country.
2. The Formspree form ID (`FORM_ID` in `landing/site.js`). Until then the waitlist runs in demo mode and captures nothing. Sign-ups are tagged `launch` or `families`, so the Families list gets only the Families email it was promised.
3. Buy the domain (`scrolljar.app` is assumed; another one means setting `SITE_URL`), connect the host, and forward `hello@` and `press@`.
4. **TARGET**: the waitlist number that means "keep going" (e.g. 300 signups in 3 weeks).

### 🟡 3. Waiting on L

- **The 9 film images** for the website reel. Prompts and steps: `docs/film-scene-prompts.md`. When they arrive: crop to the frame, add flicker, grain and subtitles, compress, and swap them into `#moments` in `landing/index.html` (the film look, with flicker, grain and weave, is the CSS above the `/* end film */` marker in `landing/site.css`; keep it).
- **Run the 5 user tests** with the script and checklist (§2). They decide three open calls: voice answers in setup, the feelings question, and the wish-jar cap of 2 hours a day.

### 🟡 4. Product questions still open

The live list is in `sketchpad.md` → "Open questions":

- Q4 Free plan limits (decided: 3 deals)
- Q5 group jar settlement (per member or pooled)
- Q8 hour-posts in v1
- Q12 Big Counter methodology
- Q15 widget scope
- **Q16 US legal entity** (needs an advisor; it gates the Stripe and App Store contracts)
- Q21 Wobble × Teams

## 5. Where the docs disagree (later decisions win)

- **Currency:** `psychology-playbook.md` and the brief use € in places. **USD/US-first is decided** (spec v1.2).
- **Tier names:** Ghost Jar / Jar Hero / Jar Legend (spec v1.2) were replaced on 2026-10-14 by **Free + Plus**. The prototype's plans screen and Day 3 flow follow the new model.
- **Deals:** older docs say "promise" or "commitment" for the user's rules. The product says **deals** (2026-10-15). Same thing.
- **"Focus":** older docs say "Focus Hours", "focus session" or "Focus Week". Now **"your time"**, "Your Hours" (Teams) and "Our Hours" (group challenges) (2026-10-16). Some code names (`startFocus`) still say focus; that's fine, users never see them.
- **Switching off mid-deal:** older text says "breaking the jar". Now: switching Screen Time off mid-deal costs 5× the price, while ending a deal is free with 24 hours' notice ("Changing your mind" in `scrolljar-spec.md`).
- **Teams currency:** older Teams text counts "clean evenings" and fills the jar with moons. **Decided 2026-10-14:** scroll-free hours (one chosen hour a day, any time), shown as glowing lights.
- **Families:** the family jar holds coins only (2026-10-15): gold for grown-ups, two-tone for the hours kids unlock. No lights in the family jar.
- **Tip-out animation:** `design-brief.md` once described the jar tilting and pouring. **Now:** the lid opens, the coins rise up and away, the jar spins and shines (`tipOutJar` and `spinFace` in `app.js`).
- **Buttons:** `design-session-briefing.md` says pill buttons and suggests Sora or Outfit. **Locked: 16px square-rounded buttons, Bricolage Grotesque with Inter** (`design-brief.md`).
- **Day-mode colours:** `design-brief.md` lists a cool day ground (#F3F5FC). The prototype uses a warmer dawn palette. **The prototype's `styles.css` is the source of truth.**
- **App vs website (changed 2026-10-14, L's decision):** the website now shares the app's night aurora look: dark sky, frosted glass panels, a mint-to-lavender headline gradient, the live prototype in the hero phone, and restrained motion (one moment per section, all off under reduced motion). The earlier calm white site is in git history; the two hero explorations are in `landing/explore/`.

## 6. Settled website copy: do not churn

- Headline: **"Your time belongs to you. Let's go get it back."**
- Whisper line: *"You opened it to check one thing. That was 40 minutes ago."*
- Punch line: *"Every other app like this keeps that money. We never touch it."*
- Win-win (its own home-page section, "The win-win"): *"Either you win the hour, or a charity does."* / *"Both doors are a win. The only one left out is the app that wanted your time."* (Time-neutral since 2026-10-14: no "night" or "evening".)
- FAQ and app onboarding: *"Watching what you love is fine. Autopilot isn't."*
- **L's lines (2026-10-20), now on the home page:** *"Break the wheel."* (the film reel's last title card) · *"You break the habit one choice at a time."* (end of "Another blocking app? Not quite.") · *"Take back your life and time"* (the label above "Time, returned."). Also good for the App Store, ads and social posts.
- L's reference site is **freedom.to**: professional, credible, structured. We can't produce its people videos, so we use real app screens instead.

## 7. Suggested order of work

1. Entitlement status (§4.1). It costs L 30 minutes and saves weeks.
2. Make the landing page live (§4.2): small and cheap, and it starts measuring demand.
3. Run the 5 user tests (§4.3) and fix anything 2 or more people got stuck on.
4. **Blocking spike on a real iPhone** (`IOS-BUILD-SPEC.md` Phase 1). This is the riskiest technical step, so prove it first.
5. Build the iOS app in the phases of `IOS-BUILD-SPEC.md`, using the prototype as the visual and behavioural reference.

### Website structure (2026-10-15)
- `landing/index.html` is the home page; `landing/teams.html` (for companies), `landing/families.html` and `landing/privacy.html` are their own pages, plus `landing/404.html`. Families embeds the live app opened on the family screen (`?embed=1&show=family`).
- Shared styling and behaviour live in `landing/site.css` and `landing/site.js`. Change them once, every page follows. Publishing goes through `deploy/build.sh` (see `deploy/README.md`): never publish the whole `scrolljar/` folder, because `docs/` is private.
- `landing/explore/light-dark.html` is an alternative look (alternating light sections). Rebuild it from the home page with `python3 landing/explore/make-light-dark.py landing/index.html landing/explore/light-dark.html "../../prototype/index.html?embed=1" "../"`.
- The waitlist form is still in demo mode: set `FORM_ID` in `site.js` (Formspree).
- Fonts: the source pages load Google Fonts (handy for previews); the build swaps them for `landing/fonts/` (OFL licences included). If you add a font or weight, add it there too.

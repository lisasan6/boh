# ScrollJar iOS: build spec

**v1.1 · 2026-10-15** (v1.0 was 2026-10-13; v1.1 adds deals, the jar component, Families, Creators and Teams). This turns `scrolljar-spec.md` (the product) and `research-findings.md` (the platform limits) into an engineering plan. The prototype in `prototype/` is the visual and behavioural reference for every screen.

**Verify Apple and Stripe API details against current documentation before implementing.** The limits below come from the July 2026 research.

---

## 1. Prerequisites (L)

- A Mac with current Xcode, and **a real iPhone**. Screen Time / FamilyControls does not work properly in the Simulator.
- Apple Developer Program membership ($99/yr). An individual account is fastest; an organization needs a D-U-N-S number.
- Later: a Stripe account, an Every.org account with API access, and a US entity decision (spec Q16).

## 2. Targets, bundle IDs, entitlements

Replace `com.scrolljar` with your real prefix.

| Target | Bundle ID | Purpose | Family Controls entitlement |
|---|---|---|---|
| App | `com.scrolljar.app` | Host app: SwiftUI, all our UI | ✅ |
| DeviceActivityMonitor ext. | `com.scrolljar.app.monitor` | Applies and removes shields on schedule; re-shields after windows. **6 MB memory limit.** | ✅ |
| ShieldConfiguration ext. | `com.scrolljar.app.shieldconfig` | Draws the shield: title, subtitle, icon, 2 buttons | ✅ |
| ShieldAction ext. | `com.scrolljar.app.shieldaction` | Handles the 2 shield buttons; can only close or defer | ✅ |
| DeviceActivityReport ext. | `com.scrolljar.app.report` | The "Where your time goes" screen (rendered by Apple; we can't read the data) | ✅ |
| Widget ext. | `com.scrolljar.app.widget` | Home Screen jar widget (v1) | — |

- **App Group:** `group.com.scrolljar`, shared by all targets. It holds the shared state.
- **Distribution entitlement:** request `com.apple.developer.family-controls` for distribution for **each** ✅ bundle ID, as Account Holder, through the Family Controls request form on developer.apple.com.
  - Approval takes weeks with no status visibility.
  - The development entitlement works immediately for builds on your own device.
  - To escalate: file a code-level support request (DTS) with your Team ID.
- Other capabilities: Push Notifications (for Wobble), In-App Purchase, Associated Domains (invite links on `scrolljar.app`).
- Deployment target: iOS 16+ per spec. Consider iOS 17+ if it simplifies the APIs.

## 3. The core flow on real iOS (where the prototype differs)

The shield is drawn by iOS, not by us. **The shield cannot take payment or open our app directly.**

1. **Shield** (ShieldConfiguration)
   - Title: "You made a deal with yourself".
   - Subtitle: the user's intention, offered as an invitation, never a reminder of what they said ("How about your novel instead?").
   - Primary button: **"I'll stay committed"**. Secondary button: **"Open anyway · $5"**.
2. **Primary** → ShieldAction returns `.close`. Log a "resisted" event to the App Group (the first one triggers the `ov-firstwin` moment the next time the app opens).
3. **Secondary** → ShieldAction posts a **local notification** ("Tap to open your jar"), then `.close` (or `.defer`). Tapping the notification opens our app with a deep link to the override flow.
   - This extra tap is the main UX cost of the whole product, and every competitor pays it too.
   - The research notes an optional Shortcuts "App Opened" automation as an alternative entry.
4. **In our app** (mirrors the prototype): breath pause (`ov-breath`: an orb breathing about 4 s in and 6 s out, labelled "breathe in" / "breathe out" for two breaths, then breathing smaller and labelled just "breathe"; "I'll stay committed" fades in a second before one full breath ends (about 9 s) in a fixed place; when the breath ends (about 10 s) and a smaller "Never mind, continue" bounces below it for 7–9 s and stops at a random spot, never near its last one; with reduced motion it just appears in a new spot) → "Instead" (`ov-instead`) → override sheet (`ov-override`) → confirm.
5. **Unlock window**
   - Remove that deal's shield from its own named `ManagedSettingsStore`.
   - Start a `DeviceActivity` schedule for the window (5, 15 or 30 minutes). `intervalDidEnd` in the monitor re-applies the shield.
   - Show a Live Activity countdown (`ov-window`).
6. **Safety net:** DeviceActivity callbacks become unreliable after about 45 minutes, and there is **no API to read which apps are currently shielded**.
   - Keep **shadow state** in the App Group: intended shield state plus window expiry times.
   - Reconcile on every app launch, on foreground, and in every monitor callback.
7. **Coin:** record an Override event locally and send it to the backend. Coins are charged at monthly settlement, not per override (see §6).

**Peek valve:** the same unlock mechanism, free, once every 48 hours, 2–10 minutes long, and it never breaks a clean day.

**Tamper / jar break:**
- On launch and foreground, check `AuthorizationCenter.shared.authorizationStatus`. There is no reliable callback when the user revokes access in Settings.
- If it was revoked while a deal is active: send a warning notification and start the **grace hour**. Charge 5× only if access is not restored.
- Quitting honestly (with 24 hours' notice) is always free.
- The copy must follow the Voice Law.

**Editing a deal** (`ov-deal`): every field can change at any time.
- **Stricter** (higher price, longer shield, more apps, shorter windows) applies **now**.
- **Easier** applies **in 24 hours** ("cold blood"); store it as `pendingChange` and apply it in the monitor or on next launch.
- **Ending** a deal is always free and takes 24 hours (`endsAt`).
- The sheet says which one applies before saving ("Stricter, so this applies right away." / "Easier, so this applies in 24 hours").

**Web domains:** the spec promises that instagram.com in Safari is shielded too. ManagedSettings has web-domain settings, but the research flags real extra cost. **Spike this in Phase 1** before promising it.

## 4. Shared data (App Group + backend)

```
Deal         id, selection(FamilyActivitySelection, encoded), schedule(always|window|weekdays + times),
             price, charityId, intention?, peekMinutes, escalation{enabled, ceiling=2x},
             kind(personal|creator), postingWindows?[{start, minutes}]   (creator setup)
             createdAt, pendingChange?{fields, appliesAt}   (easier changes wait 24h; stricter apply now)
             endsAt?                                         (ending: free, 24h notice)
ShieldState  dealId, intendedShielded, windowEndsAt?, lastReconciledAt                (shadow state)
Event        id, dealId, kind(resisted|override|peek|windowEnd|tamper|restore), at, amount?
JarMonth     month, coins[], total, cap(default $50), settlement{status, stripePI, everyOrgReceipt}
DiaryEntry   LOCAL ONLY (never leaves the phone unless the user exports it)
StandbyNote  text, writtenAt  (sent only to the user's own jar members, on a wobble)
Jar/Group    id, name, charityId, members[], visibility settings
```

Privacy rules:

- **App identities never leave the device.** We only have opaque tokens.
- The backend stores events, not content.
- Diary entries stay on the device.
- Coins are private by default; jar totals are shared.

## 5. Backend (small, US-hosted)

- Supabase (Postgres, auth and edge functions) or Node with Postgres, as the spec suggests.
- **Tables:** users, deals_meta (no tokens), events, jar_months, jars, jar_members, invites (claim codes), standby_notes, wobbles.
- **Jobs:**
  - Monthly settlement on the 1st.
  - The 48-hour refund window.
  - A pre-settlement email.
  - Invite activation ($1 donation once the invitee finishes their first active week; max 10 per user; global monthly cap).
- **Push (Wobble):**
  - Use a silent push that renders in the app only.
  - **Never** use Time Sensitive or Critical alerts; a wobble must never pierce the receiver's own Focus or shield.
  - Only one open wobble at a time.
  - No read receipts and no response metrics.
- **Invites:** universal link → web preview page (jar name, charity, members, no login) → App Store → deferred deep link with a server-side claim code.
- Data export and deletion are built in from day one.

## 6. Money

- **Penalties go through Stripe, outside Apple IAP.** This is allowed under App Store guideline 3.1.3(e); Beeminder, StickK and Forfeit are the precedents.
  - Save the card around day 3 ("want to make it real?") with a **SetupIntent** (`usage: off_session`, 3DS at save) and a plain-language mandate.
  - Run **one off-session PaymentIntent on the 1st** for the month's jar.
  - Monthly cap: $50 by default. When the jar is full, blocks stay on.
  - 48-hour no-questions refund; more than 3 refunds in a month pauses stakes.
- **The charity rail is Every.org.** Donations go through its 501(c)(3), which issues receipts and handles regranting.
  - Confirm the current partner/API terms and the exact flow (direct-donation structure, to avoid commercial co-venturer registration) **with counsel before launch**.
- **Memberships use StoreKit 2 IAP:** Free and **Plus** ($3.99/mo, $29.99/yr; updated 2026-10-14, replacing Ghost Jar / Jar Hero / Jar Legend). Real coins work on Free; the card fee is added on top for free users and covered for Plus. No dark patterns, "Not now" is the default choice, and annual is shown honestly next to monthly.
- Cancelling a membership **does not** end active deals (spec §4).
- **Free has 3 active deals; Plus is unlimited.** A 4th deal on Free shows the plans, never a block on the deals already running.

## 7. Prototype → SwiftUI map

| Prototype | SwiftUI view | Notes |
|---|---|---|
| `ov-onb` | OnboardingView | 4 slides → FamilyControls auth → FamilyActivityPicker → blocked. **No card, no account wall.** Target: under 2 minutes. |
| `s-home` | TodayView | Hero panel, focus session, "Your deals", tips, links |
| `s-jar`, `s-charity`, `ov-tipout` | JarView, CharityView, TipOutView | The jar component (§7a), lid picker, monthly ceremony, visible settlement steps |
| `s-new` | NewDealView | "Make a deal": apps, schedule, price slider $2–25, intention, "Seal the deal" |
| `ov-deal` | DealEditView | Stricter now, easier in 24 hours, ending free with 24 hours' notice |
| `ov-breath`, `ov-instead`, `ov-override`, `ov-window`, `ov-mood` | OverrideFlow (calm register) | Entered from the notification deep link |
| `ov-firstwin`, `ov-exit` | Moments | "Exit points" are a signature: the app tells you to leave |
| `s-usage` | UsageView | Wraps the DeviceActivityReport extension; we can't read the data |
| `s-diary`, `ov-entry`, `ov-voice`, `s-recap`, `s-resources` | DiaryView, RecapView, ResourcesView | Local-only diary; voice notes are passive (recorded and played back, nothing analyses them) |
| `s-friends` (tab: BOARD), `s-jardetail`, `s-challenge`, `s-invite`, `ov-compose` | BoardView, jars | **v1.1+:** build after the solo loop works |
| `s-family`, `ov-famsetup`, `ov-famtip` | Families | Later phase; uses Apple Family Sharing. Kids are never charged or paid |
| `s-creator`, `ov-crsetup` | Creators | Later phase; a creator deal is a normal deal with posting windows |
| `s-company`, `ov-cojoin`, `ov-conote`, `ov-ideas`, `ov-cotip` | Teams | Teams pilot; see `scrolljar-teams-spec.md` |
| `s-insights`, `s-story` | InsightsView, StoryView | Your week and "Your story" |
| `ov-wobble`, `ov-standby` | Wobble feature | v1.1+; the rules are in `sketchpad.md` → The Wobble |
| `s-you`, `s-paywall` | YouView, PaywallView | Settings, privacy, membership |
| Shield | ShieldConfiguration extension | Title, subtitle, icon and 2 buttons only |

**Design tokens:** port `:root` (night) and `body[data-mode="day"]` from `prototype/styles.css` into a SwiftUI `Theme`.
- Fonts: Bricolage Grotesque (display) and Inter (body), both bundled. Tabular numbers for money and time.
- Buttons: 16px radius.
- Motion: "Nintendo" grammar (squash and stretch, elastic springs). Honour Reduce Motion.
- Navigation: every sheet and pop-up has a close button or its own way out; every screen off a tab has a back arrow.

### 7a. The jar component

One `JarView` draws every jar (yours, family, company, creator). Reference: `buildJar`, `jarMood`, `tipOutJar` and `spinFace` in `prototype/app.js`, drawn in a 200 × 226 box.

- **Layers:** soft floor shadow, glass body with an inner shade, contents, cylinder shading and highlights, rim, lid, face. The face is drawn last, on the glass.
- **Contents:**
  - Coins pile naturally, in the order they land. The positions come from a small pour simulation and are stored as a fixed list (`POUR`), so the pile looks the same on every device.
  - The family jar adds two-tone coins (lavender rim) for hours the kids unlock.
  - The company jar holds glowing lights, one per scroll-free hour.
- **Lid:** a rounded bar. The owner picks its colour: silver (default), mint, lavender, copper or cork. Picking one makes the jar hop and smile.
- **Face and moods:**
  - The face has two eyes and a mouth. The moods are idle, happy (you stayed), thanks (a coin landed), rest (a focus session is on, with sleepy eyes) and wow (the tip-out).
  - **Never sad or disappointed:** a slip is a gift to the jar.
  - The eyes follow your finger by up to about 2.6 points, then drift back after about 2.6 s. The eyes blink every 5.6 s.
  - Tapping a big jar makes it giggle (a hop and a smile).
- **Tip-out**, about 4–5 s for a full jar:
  1. The jar looks surprised. The lid pops off to the left and floats there (560 ms).
  2. The coins leave top first, one every 90 ms from 520 ms, each rising through the neck in 420 ms. Each then floats up 150–210 points with a sway and fades. The amount counts up as each coin leaves.
  3. The lid goes back on (560 ms).
  4. The jar spins: the glass stays put and the face travels round it. A cylinder of radius 72 (in the 200-wide box) gives each feature an x position of `100 + 72·sin θ` and a width of `cos θ`. The face shows mirrored at 20% on the far side, as seen through the glass. The spin is 2 turns in 1.7 s, with an 18° wind-up and a 12° overshoot.
  5. While it spins, the jar hops 14 points, glows gold and gets a shine sweep across the glass at 1.25 s, then stars.
  - **Reduce Motion:** the jar simply empties and smiles.

## 8. Phases and "done" criteria

| Phase | Ships | Done when |
|---|---|---|
| **0: Accounts** | Developer account, bundle IDs, App Group, **entitlement requests filed** | Request confirmation for all 5 IDs |
| **1: Blocking spike** (riskiest) | Auth → picker → shield with 2 buttons → notification → our app → timed unlock → automatic re-shield; shadow-state reconcile; web-domain test | On a real iPhone: 20 cycles in a row re-shield correctly, including windows over 45 minutes and an app kill/relaunch |
| **2: Solo loop, no money** | Onboarding, Make a deal, deal editing, Today, override flow, the jar component with **fake coins**, first-win and exit moments, local stats | L can live with it for a week as a free blocker |
| **3: Money** | Backend, Stripe SetupIntent, settlement job, refunds, cap, Every.org donation, tip-out ceremony, jar break and grace hour | End to end in Stripe test mode, plus one real $1 donation with a receipt |
| **4: Membership + polish** | StoreKit 2 Plus (monthly and yearly), plans screen, 3-deal Free limit, widget, Voice Law pass on every string, accessibility | Ready for TestFlight (needs the distribution entitlement) |
| **5: Social** | Buddy and group jars, invites with claim codes, finite feed, Wobble and standby notes | Beta testers can invite each other |
| **6: Beta** | TestFlight with 100–300 users (r/nosurf, US colleges), transparency page | First real conversion data |
| **7: Teams pilot** | Campaigns, squads, "your hour" picker, lights jar, anonymous dashboard, notes with the on-phone privacy check | One company runs a 6-week pilot. Sell it before building (see the Teams spec) |
| **8: Families and Creators** | Family jar and setup (Family Sharing), creator setup with posting windows, public challenges | Built in parallel once Teams works |

Android is phase 3+ of the business roadmap and is not in this plan; see `research-findings.md`.

## 9. Known risks

- **Entitlement delay:** file in Phase 0, and build on development entitlements in the meantime.
- **App Review on the charity mechanics:** prepare a precedent dossier (Forfeit, Beeminder, StickK) and use the Every.org structure.
- **DeviceActivity reliability:** shadow state and reconciliation in Phase 1, before any feature work.
- **Chargebacks:** the mandate at card save, confirmation logs, 48-hour refunds and the pre-settlement email.

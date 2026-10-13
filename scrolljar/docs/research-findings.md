# ScrollJar — Feasibility & Competitive Research (July 2026)

Condensed from four sourced research sweeps (iOS, Android, payments/charity/policy, competition). Ask Claude for full source URLs on any claim.

---

## ⚠️ RE-VERIFIED 2026-07-30 — headline answer

**iOS: yes, real OS-level blocking is available to us, today, for adults on their own device.** The Screen Time API is the same foundation Opal, one sec, Jomo and Forfeit ship on. The block itself is not our risk.

**Android: yes today, but the trend is against us.** No official API; the AccessibilityService pattern still ships, but Android 17's Advanced Protection Mode revokes it for anything not declaring `isAccessibilityTool="true"` (exemptions: screen readers, switch access, voice input, Braille — automation/monitoring/blockers explicitly get none). Opt-in per user, so it doesn't kill the category — it means a slice of security-conscious users can never run ScrollJar and we cannot fix it.

**Nothing landed at WWDC 2026 for third-party blockers.** iOS 26/27 added only the Declared Age Range API and PermissionKit, both parental-control oriented. Do not plan around Apple improving this framework.

**🔴 Most urgent action in the whole project: file the `com.apple.developer.family-controls` distribution entitlement request now.** Free, no code required, needs only the bundle ID — and 2026 forum reports show requests sitting weeks with no status visibility (Mar 4 and Mar 9 2026 submissions still silent; DTS escalation path is a code-level support request with Team ID). Every day not filed is a day added to launch.

---

## iOS blocking (Screen Time API)
- Stack: FamilyControls (auth + opaque app picker), ManagedSettings (OS-level shields), DeviceActivity (schedules/thresholds). Individual (non-parental) auth since iOS 16.
- Shield UI barely customizable: bg color/blur, icon, title, subtitle, ≤2 buttons (text+color only). Button taps handled in a ShieldAction extension that can only .close/.defer — no payment UI in the shield. **The prototype's shield screen is aspiration, not what iOS renders.** All our design lives in the layer *after* the shield.
- Host app never learns WHICH app was blocked (opaque tokens); no shield→app deep-link. Workarounds: shield button fires local notification → tap opens host app (standard), or one sec's Shortcuts "App Opened" automation (iOS 26 App Intents `.foreground(.dynamic)` fixed its relaunch loop). Costs one extra tap — the main UX tax of the whole product.
- **DeviceActivity callback reliability degrades past ~45 minutes** — throttling, delays or outright failure depending on thermal state and usage. Long windows need shadow state + reconciliation, not trust.
- **No public API to read which apps are currently shielded.** Maintain shadow state in UserDefaults and reconcile manually.
- **Web blocking is not included.** ManagedSettings shields don't extend to web domains — Instagram-in-Safari needs a separate Network Extension / content filter. "Web bypass closed" carries a real build cost.
- Report data is sandboxed in an extension that can only reach the host app through an opaque view — constrains our own usage-metrics screen.
- DeviceActivityMonitor extension: hard 6 MB memory limit. ~50-token shield cap (use category tokens). Users can revoke permission in Settings anytime with no reliable callback → keep shadow state; Forfeit treats disconnecting Screen Time as a failed commitment (chargeable). **Our answer must be Voice-Law compatible — a grace + repair path, not a punishment.**
- `com.apple.developer.family-controls` distribution entitlement requires a per-bundle-ID request to Apple (each extension separately); weeks with no status visibility in 2026, apply early. No known rejections for money-on-override apps (Forfeit ships).

## Android blocking
- No official blocking API. Shipping pattern: AccessibilityService (instant TYPE_WINDOW_STATE_CHANGED detection) and/or UsageStatsManager polling (~1s, PACKAGE_USAGE_STATS) + foreground service (type `specialUse`, human-reviewed) + SYSTEM_ALERT_WINDOW (grants overlay AND exemption from background-activity-launch limits on Android 14–16) to show the block screen.
- Play policy: accessibility use must be declared (purpose, prominent disclosure, demo video); app blockers are an accepted non-tool use case; Oct 2025 update bans agentic/autonomous use (rule-based blocking fine). Avoid QUERY_ALL_PACKAGES — use `<queries>` launcher-intent filtering.
- **Android 17 / Advanced Protection Mode (confirmed Feb–Mar 2026, Canary 2602 → A17):** when a user enables AAPM, the system blocks granting AccessibilityService to non-accessibility apps *and revokes it if already granted*. Allowlist is `isAccessibilityTool="true"` only — screen readers, switch input, voice input, Braille. Antivirus, automation, monitoring, cleaners, password managers, launchers and blockers are explicitly excluded. No appeal process documented.
- Bypass reality: force stop, clear data, safe mode, ADB. Countermeasures shipping apps use: device admin (prevents uninstall), blocking the Settings app, PIN/partner locks. Safe mode defeats all.
- OEM battery killers (Samsung, Xiaomi 5/5 severity) silently kill persistent services → need OEM-specific onboarding (autostart, battery-optimization exemption, pin-in-recents).
- **Position: phase 3 at the earliest, shipped as the honestly-lighter version with limits stated up front, or not at all until revenue funds the fight.**

## Payments, charity, policy
- Penalty charges do NOT need Apple IAP: real-world service under 3.1.3(e). Precedent: Beeminder, StickK, Forfeit all charge via Stripe on iOS.
- Charity catch: 3.2.1(vi)/3.2.2(iv) restrict in-app donation collection to Apple-approved nonprofits; this is why Forfeit keeps forfeits and StickK keeps 50% of anti-charity stakes. Safe shapes: route donations through a platform 501(c)(3) (Every.org regrant model), or web checkout link-out (US anti-steering: allowed today, SCOTUS cert granted Jun 2026 — in flux).
- Google Play: tax-exempt donations + non-digital transactions explicitly exempt from Play Billing. Easy side.
- Stripe: SetupIntent (usage: off_session, 3DS at save) → off-session PaymentIntents. Better: Forfeit pattern — pre-authorize hold at commitment, capture on failure (fewer disputes, cleaner SCA). Mandate/contract language à la StickK essential against chargebacks.
- Charity rails (all alive 2026): Every.org (free API, 1M+ US 501(c)(3)s, 0% platform fee, regrant + receipts — fastest path, US-focused), Change/getchange.io (API + absorbs state compliance, global), Pledge.to (non-US payouts), Daffy (DAF API), Benevity (enterprise).
- Regulatory: "pay and we donate" = commercial co-venturer registration in several US states (AL, CA, MA, SC…) unless users donate directly via the platform. Italy Law 120/2026 (in force 21 Jul 2026): charity-linked commerce requires disclosure of recipient/amounts + AGCM notification 15 days pre-launch, €5k–50k fines. Founder is Italy-based — assume it applies; Change sells this compliance.

## Competition (the key finding)
**Nobody ships the full combo: persistent OS-level blocking + automatic money penalty + charity destination.**
- Forfeit (YC): closest engine — Screen Time blocking, Stripe stakes ($8.7M staked, 686k forfeits, 94.2% success), tamper = failure. But company KEEPS the money (HN: "the company is incentivized to take the money") and roadmap points to friends/savings, not charity. Overlord tier reads adversarial/surveillance-heavy.
- ScreenFence: exact charity pitch, unlaunched waitlist, likely no hard blocking. Scroll Toll (Yale nonprofit): charity pledges, no auto-charge, no blocking, negligible traction. Flora: session-based honor-system stakes → trees only. forfeit.tech (unreleased): true blocking + stakes → communal prize pool, not charity.
- Market splits: gentle-but-toothless blockers (Opal $10M ARR in 2 yrs, one sec 100k+ 5★ + PNAS efficacy paper, Jomo) vs punitive-but-self-dealing stakes (Forfeit, Beeminder, StickK). Screen-time software market $3.8B (2025) → $9.7B (2034). Hardware (Brick ~$59, Bloom 60k+ units) proves willingness to pay for hard commitment; "no subscription" is a rising counter-position.
- User complaints across the category: too bypassable, subscription fatigue, shame-y/adversarial tone, distrust when the app profits from failure.

**Whitespace: charity-backed stakes + supportive social frame + real enforcement. The trust position — "we never keep your money" — directly neutralizes the category's biggest objection.**

**Strategic consequence of the API limits:** every competitor gets the *same* Apple block. Nobody can build a stronger one. The differentiator is entirely in the layer Apple doesn't constrain — the price, the charity, the breath pause, the words, the wobble. Our moat is in our own code, which is the good news buried in all of the above.

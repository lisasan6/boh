# ScrollJar — Design System (LOCKED 2026-07-28)

**Direction: AURORA CHROME.** Chosen by L from 14 explored directions (Aurora + Chrome fused — L picked both independently). Living file: `scrolljar-aurora-chrome.html` (hero, 4 screens, day/night toggle, tokens, motion spec, playable Nintendo layer, font switcher).

> The concept in one line: **a night sky that moves, and a chrome-glass jar that catches it.** The aurora *is* the iridescence — the jar doesn't invent light, it reflects the sky. The only warm thing on screen is the gold you're about to give away.

## Locked decisions
| | |
|---|---|
| **Direction** | Aurora Chrome (14) |
| **Display type** | **Bricolage Grotesque** (600/700, tracking -.025em) — locked by L |
| **Body type** | Inter (450–800); **tabular numerals always** for money & time |
| **Buttons** | **Square-rounded, 16px** (`--btn-r`) — no pills, system-wide |
| **Modes** | **Night (primary) + Day (dawn)** — full token parity, live toggle |
| **Motion grammar** | **Nintendo**: squash & stretch, arcing/spinning coins, anticipation before action, elastic `cubic-bezier(.34,1.56,.64,1)`. *(Arcade/neon grammar rejected by L.)* |
| **Readability** | Body ≥13.5px in cards, secondary text on mid-ink (never faintest), captions enlarged |

## Tokens — NIGHT (primary)
Ground `#0B0C1A` · screen mesh `radial(#221F52 → #14142E → #0B0C1A)` · panel `rgba(255,255,255,.045)` · line `rgba(180,175,255,.14)`
Aurora: mint `#37E2C0` · blue `#5AA9FF` · violet `#8B7CF6` · dawn peach `#FF9E7A` (rare)
Chrome: `#F2F7FA → #8798A8 → #5F6E80` · Coin gold `#FFC94D` (`#FFE9A8 → #D8951A`) — **the only warm colour**
Ink `#EFEDFF` / `#A9A4D8` / `#6C6795` · Calm register: ground `#0C1A1C`, teal `#4DB6A5`, soft `#93D3C6`

## Tokens — DAY (dawn)
Ground `#F3F5FC` · screen mesh `radial(#E9EEFF → #F3F5FC → #FDFDFF)` · panel `rgba(255,255,255,.72)` · line `rgba(22,24,54,.11)`
Aurora deepened for light: mint `#0FB99B` · blue `#2E7FE0` · violet `#6B4FE0` · peach `#FF7A4D`
Ink `#141733` / `#4B5070` / `#7A7F9C` · gold text `#B87A05` · sheet `rgba(255,255,255,.93)`
Calm register: ground `#EBF7F3`, teal `#199885`, ink `#0C3B33`

## Motion spec
- **Coin drop (Nintendo):** coin arcs up ~96px, spins 900°, falls; jar **squashes** (scaleX 1.13 / scaleY .87) and springs back; 5-star burst. ~820ms + 520ms settle.
- **Idle charm:** blink every 5.6s; occasional gentle hop (~9s, 50% chance) — Animal-Crossing life, never a nag.
- **Milestone:** happy hop + 9-star fan + wider smile + chunky fanfare label. No random rewards, ever.
- **Tip-out (monthly, updated 2026-10-15):** the lid pops off and waits to the side → coins rise out of the mouth one by one (90ms apart) and float up and away, with a count-up → lid back on → the jar spins in place, its face travelling round the glass (2 turns, 1.7s, small wind-up and overshoot), with a hop, a gold glow, a shine across the glass and stars. The only spectacle. Exact timings: `IOS-BUILD-SPEC.md` §7a.
- **Aurora field:** 4 blurred fields, 26–38s unsynced loops. **Rests** in the calm register (25% speed, cools to teal, specular stops, 600ms crossfade).
- **Tilt iridescence:** gyroscope ±14° across glass + chrome rim. Honors reduce-motion everywhere.

## Preserved identity (non-negotiable)
Jar keeps its gentle face (moods: idle, happy, thanks, rest, wow; **never sad**; eyes follow your finger; tap it and it giggles) · a stylized lid in a colour the owner picks (silver default; mint, lavender, copper, cork) · gold coins in a natural pile · curved geometry · **amber-never-red** · calm support register native (breath pause, rough day, resources) · Voice Law governs every string · the jar thrives, never suffers, never guilt-trips.

## Teams register
**Glowing lights rise** (earned, one per scroll-free hour; they were moons until 2026-10-14) where consumer **coins drop** (forfeited). Dusk lavender lives here. Families: one coin pile, gold for grown-ups and two-tone (lavender rim) for the hours kids unlock. "Everything that lands in a jar becomes good."

## Next
Apply to: prototype v2 → landing page → SwiftUI constants. Archive of all 14 explored directions retained in `scrolljar-identity-directions.html` (1–3), `scrolljar-identity-batch2.html` (4–12), `scrolljar-vault-chrome.html` (13). Rejected by L's filter: Solar Warmth, Liquid Glass, Terracotta Evening (mom-app / clinical / craft-cozy). Parked idea worth reusing: Receipt's itemized-statement aesthetic for the **share-card system**.

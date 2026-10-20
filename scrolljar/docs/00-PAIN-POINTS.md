# ScrollJar — Pain points (live list)

**Live page (tick items off there):** https://claude.ai/artifact/9aWMzBqBu6VQ4m12HPGQ5c (private; pinned in L's claude.ai sidebar). When an item changes, update both this file and the page.

**Options and workarounds** for the top items, with a suggested launch plan, are on the live page and in `legal-design-options-2026-10.md`.

**Keep this list current.** When an item is solved, tick it and add the date and what was decided. When a new one turns up, add it with its source. Last reviewed: **21 October 2026**.

Not legal advice. The details and sources for every item are in the linked docs.

---

## 🔴 Could stop the launch or force a redesign

- [ ] **1. The money can't flow the way we planned.**
  - Every.org can't make automatic donations ("does not provide programmatic donations… via API").
  - No partner openly offers the full package: charge the user each month, the money never touches ScrollJar, and the user gets the receipt.
  - If coin money passes through ScrollJar, money-transmitter licensing and state charity-registration rules apply.
  - **Next:** ask Change (getchange.io) and Pledge (pledge.to) whether they can charge users directly.
  - *Source:* legal brief §1.1 · `legal-research-2026-10/charity-partners.md` (questions in §4)
- [ ] **2. Apple's rules.**
  - Charity money may only be collected outside the app unless you're an approved nonprofit (3.2.2(iv)).
  - Every charity listed in the app must be Apple-approved (3.2.1(vi)).
  - No "monetizing … Screen Time APIs" (4.10).
  - Coins, Plus and Teams all touch these.
  - **Next:** ask Apple's App Review team before building payments.
  - *Source:* legal brief §1.2
- [ ] **3. Charities have to agree.**
  - California and Hawaii (and the UK) want each charity's written consent or agreement before you use its name.
  - That's very hard with a million charities to pick from.
  - **Fix to decide:** launch with a curated list of charities that have signed up.
  - *Source:* legal brief §2 (rows 1–3), design options #1

## 🟠 Needed before launch

- [ ] **4. EU privacy law (GDPR) probably covers every user from day one,** because the founder works from Italy. It's tied to the open company-structure decision (Q16). *Source:* legal brief §1.3
- [ ] **5. Families means children's data.** The stricter US rule (COPPA) has applied since 22 Apr 2026, and Italy's age of consent is 14. **Fix to decide:** receipts in the parent's name, and money features for 18+ only. *Source:* legal brief §1.4, design options #5–6
- [ ] **6. The card fee added on top** is banned for ordinary cards in the EU and UK, and California wants it inside the price. **Fix to decide:** an optional "cover the fee" tick. *Source:* legal brief §1.5, design options #3
- [ ] **7. The 5× charge for switching off mid-deal** is likely to be judged unfair in the EU. **Fix to decide:** lower it, ideally to the deal's normal price. *Source:* legal brief §2 row 7, design options #4
- [ ] **8. "100% to charity" is fragile.**
  - Partner fees, double card fees and partners redirecting money to a similar charity all chip at it.
  - **Fix to decide:** keep "we keep none of it," never say "reaches the program," and show short disclosures before a charity is picked.
  - *Source:* legal brief §2 row 4, design options #9

## 🟡 Smaller, but needs doing

- [ ] **9. Varying monthly charges need advance notice:** 10 days for US debit cards, unless the user picks a range. *Source:* legal brief §2 row 6
- [ ] **10. User posts** (Board, notes, challenges) need filtering, reporting and blocking tools. *Source:* legal brief §2 row 12
- [ ] **11. Health-style data** (mood check-ins, rough days, the research study) needs separate consent and ethics approval for the study. *Source:* legal brief §2 row 8, design options #11
- [ ] **12. Website privacy page:** fill in your name, city, country, postal address, web host and the US transfer safeguard. The website build warns until they're done. *Source:* `landing/privacy.html`
- [ ] **13. Terms of service, trademark search, accessibility** (fixed-position option for the moving "continue" link). *Source:* legal brief §2 rows 15–17, design options #10
- [ ] **14. Backing a friend:** drop "a month of Plus" as a treat (Apple requires its in-app purchase for that), and decide where unpicked treats go. *Source:* design options #7
- [ ] **15. Pledges (Teams, Families):** charge only what's unlocked, never in advance. *Source:* design options #8

## 💸 Costs to budget

- **Change:** $999–$3,500 a month, plus $500 a month per state for the fundraising-platform package.
- **Lawyers:** US payments and nonprofit, EU and Italian privacy and consumer, App Store.
- **Fees:** partner and card fees on each coin (possibly twice).

## 📅 Re-check on dates

- [ ] **~27 Oct 2026:** confirm the Los Angeles trial starts 28 Oct (website "Why now" list), then update the line.
- [ ] **Monthly:** the K.G.M. appeals, New Mexico's appeal, and any EU final decisions on TikTok or Meta. Update the website's "Status as of" date. *Source:* `news-verified-2026-10.md`, handoff §4.5

## ✅ Already solved

- **21 Oct 2026:** website privacy page gaps filled (rights list, legal bases, regulators named, adults-only waitlist).
- **20 Oct 2026:** the competitor line became "Most stakes apps keep your money", and the punch line became "Most apps like this keep that money".
- **20 Oct 2026:** the retracted signing study (Shu et al. 2012) was added to the never-cite lists.
- **16 Oct 2026:** website and app science wording corrected. The Wansink sources, the unverified "slot machines" quote and the word "dopamine" were removed.
- **15–16 Oct 2026:** science docs re-verified. The retracted Ariely & Wertenbroch 2002 was removed and about 25 overstated claims fixed.
- **15–16 Oct 2026:** website news timeline built from verified sources only.
- **16 Oct 2026:** "100% to charity" card fee confirmed: added on top on Free, paid by ScrollJar for members. This is now affected by item 6.

---

**Full detail:**
- `legal-brief-2026-10.md` (start here)
- `legal-design-options-2026-10.md` (the decisions, plus alternatives, workarounds and a launch plan)
- `legal-research-2026-10/` (the evidence)
- `science-verified-2026-10.md`
- `news-verified-2026-10.md`

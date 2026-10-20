# ScrollJar — Pain points (live list)

**Live page (tick items off there):** https://claude.ai/artifact/9aWMzBqBu6VQ4m12HPGQ5c (private; pinned in L's claude.ai sidebar). When an item changes, update both this file and the page.

**Decided 20 Oct 2026: L went with all of Claude's suggestions (the ⭐ options).** These still need a lawyer's check, the charity partners' answers and Apple's reply, and the product docs, website and app haven't been changed to match yet. The company type (Delaware or Italian SRL) stays open.

**Each problem lists its possible solutions underneath** (⭐ = Claude's suggestion; several can be combined). On the live page you can choose them, and the choice is saved with the date. The suggested launch plan is at the end of `legal-design-options-2026-10.md`.

**Keep this list current.** When an item is solved, tick it and add the date and what was decided. When a new one turns up, add it with its source. Last reviewed: **20 October 2026**.

Not legal advice. The details and sources for every item are in the linked docs.

---

## 🔴 Could stop the launch or force a redesign

- [ ] **1. The money can't flow the way we planned.**
  - Every.org can't make automatic donations ("does not provide programmatic donations… via API").
  - No partner openly offers the full package: charge the user each month, the money never touches ScrollJar, and the user gets the receipt.
  - If coin money passes through ScrollJar, money-transmitter licensing and state charity-registration rules apply.
  - **Next:** ask Change (getchange.io) and Pledge (pledge.to) whether they can charge users directly.
  - *Source:* legal brief §1.1 · `legal-research-2026-10/charity-partners.md` (questions in §4)
  - ✅ **Decided 20 Oct 2026:** Honor jar (web checkout) + Cause funds.
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **Honor jar (web checkout).** Coins are counted in the app; no money moves there. On the 1st, a pre-filled web page lets the user pay the charity platform directly (Apple Pay, one tap) and get their own receipt. Cleanest legally; some people may not pay.
    - **Partner charges the card.** Change, Pledge or an Every.org enterprise deal charges the user's card monthly on its own account. Stays automatic; not offered publicly, so it has to be asked for.
    - ⭐ **Cause funds.** Users pick a cause (oceans, hunger, mental health…), each run as a fund by one partner charity. 5–10 agreements instead of a million consents.
    - **Own ScrollJar Foundation.** A nonprofit that receives coins and passes them on. Could become Apple-approved, but takes months, US only. Long-term.
    - **ScrollJar donates its own money.** Users pay ScrollJar, ScrollJar gives the same to charity. Coins become revenue (taxes), no user receipts, state registration. Not advised.
- [ ] **2. Apple's rules.**
  - Charity money may only be collected outside the app unless you're an approved nonprofit (3.2.2(iv)).
  - Every charity listed in the app must be Apple-approved (3.2.1(vi)).
  - No "monetizing … Screen Time APIs" (4.10).
  - Coins, Plus and Teams all touch these.
  - **Next:** ask Apple's App Review team before building payments.
  - *Source:* legal brief §1.2
  - ✅ **Decided 20 Oct 2026:** Donations on the web + Plus sells what's on top + Ask App Review early.
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **Donations on the web.** Link out to a web page for the donation (allowed in US apps since 2025). Same as the honor jar.
    - **Apple Pay to approved nonprofits.** If every listed charity is Apple-approved, Apple allows in-app donations to them with Apple Pay. Needs checking.
    - ⭐ **Plus sells what's on top.** Blocking, the pause and kindness stay free forever; Plus is groups, stats, the heads-up and covered fees, like Opal and one sec.
    - ⭐ **Ask App Review early.** A short written question before building, then an early TestFlight build.
- [ ] **3. Charities have to agree.**
  - California and Hawaii (and the UK) want each charity's written consent or agreement before you use its name.
  - That's very hard with a million charities to pick from.
  - *Source:* legal brief §2 (rows 1–3), design options #1
  - ✅ **Decided 20 Oct 2026:** Cause funds + "Suggest a charity" + Hawaii: opted-in only.
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **Cause funds.** The fewest agreements (see Money flow).
    - **Curated list of 20–50.** Each signs a one-page agreement; Change can automate the consent.
    - ⭐ **"Suggest a charity".** ScrollJar asks the charity to opt in and adds it once it agrees, so the list grows.
    - ⭐ **Hawaii: opted-in only.** Users in Hawaii see only charities that have agreed.

## 🟠 Needed before launch

- [ ] **4. EU privacy law (GDPR) probably covers every user from day one,** because the founder works from Italy. It's tied to the open company-structure decision (Q16). *Source:* legal brief §1.3
  - ✅ **Decided 20 Oct 2026:** GDPR as the worldwide baseline + Host data in the EU.
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **GDPR as the worldwide baseline.** The strictest rules; meeting them once covers most countries.
    - ⭐ **Host data in the EU.** Supabase EU region reduces the US transfer problem.
    - **Company: Italian SRL or US Delaware.** Italian SRL first with a US company later, or Delaware with an EU representative. Decide with an advisor.
- [ ] **5. Families means children's data.** The stricter US rule (COPPA) has applied since 22 Apr 2026, and Italy's age of consent is 14. *Source:* legal brief §1.4, design options #5–6
  - ✅ **Decided 20 Oct 2026:** No kid accounts + Launch Families later + Money features 18+.
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **No kid accounts.** Apple's Family Controls lets the parent manage the child's device; everything stays under the parent's account. No child names on the server, no posting.
    - ⭐ **Launch Families later.** After a children's-privacy review (it's already "coming after launch").
    - ⭐ **Money features 18+.** Coins, Plus and Backing for adults only.
- [ ] **6. The card fee added on top** is banned for ordinary cards in the EU and UK, and California wants it inside the price. *Source:* legal brief §1.5, design options #3
  - ✅ **Decided 20 Oct 2026:** ScrollJar pays the fees.
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **ScrollJar pays the fees.** About 3–5% of coin volume, paid from membership revenue. Makes "100% arrives" fully true, a strong marketing line.
    - **Optional "cover the fee" tick.** On the free plan, unticked by default.
    - **Bank payments.** ACH in the US, SEPA in Europe are much cheaper than cards; Every.org covers fees for bank donations.
- [ ] **7. The 5× charge for switching off mid-deal** is likely to be judged unfair in the EU. *Source:* legal brief §2 row 7, design options #4
  - ✅ **Decided 20 Oct 2026:** One normal coin (1×).
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **One normal coin (1×).** Easy to defend; still discourages sudden exits.
    - **No charge.** Switching off ends the deal; the free 24-hour exit already exists.
    - **None in the EU for 14 days.** Keeps the charge elsewhere; respects the EU withdrawal right.
- [ ] **8. "100% to charity" is fragile.**
  - Partner fees, double card fees and partners redirecting money to a similar charity all chip at it.
  - **Whatever we choose:** never say "reaches the program", and show short disclosures before a charity is picked.
  - *Source:* legal brief §2 row 4, design options #9
  - ✅ **Decided 20 Oct 2026:** "…and we pay the fees".
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **"…and we pay the fees".** "Every coin goes to your charity. We keep none of it, and we pay the fees." (with the fee option above)
    - **The safe version.** "We keep none of it", plus a one-line note on partner fees and timing in the charity picker.

## 🟡 Smaller, but needs doing

- [ ] **9. Varying monthly charges need advance notice:** 10 days for US debit cards, unless the user picks a range. *Source:* legal brief §2 row 6
  - ✅ **Decided 20 Oct 2026:** Honor jar: likely no notice needed + User agrees a range.
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **Honor jar: likely no notice needed.** With web checkout the user starts each payment, so it isn't an automatic charge and the 10-day notice likely doesn't apply. Confirm with counsel.
    - ⭐ **User agrees a range.** At setup the user agrees a range (for example $0–$40). Notice is then needed only if a charge falls outside it. Fits automatic charging in Version 2.
    - **Heads-up 10 days before.** A message with the amount 10 days before each charge. Awkward, because the jar keeps filling after the message.
- [ ] **10. User posts** (Board, notes, challenges) need filtering, reporting and blocking tools. *Source:* legal brief §2 row 12
  - ✅ **Decided 20 Oct 2026:** Launch without public posts + Filter, report and block.
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **Launch without public posts.** Version 1 has no Board or public notes. Add them later, once the tools are ready.
    - ⭐ **Filter, report and block.** Apple requires these for any app with user posts (guideline 1.2): a filter, a report button, blocking, and published contact details.
    - **Ready-made phrases only.** Notes are picked from a list of ready-made phrases plus high fives, so there's nothing to moderate.
- [ ] **11. Health-style data** (mood check-ins, rough days, the research study) needs separate consent and ethics approval for the study. *Source:* legal brief §2 row 8, design options #11
  - ✅ **Decided 20 Oct 2026:** Keep mood check-ins on the phone + Separate research opt-in, ethics approval first.
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **Keep mood check-ins on the phone.** Stored only on the phone, never sent to us, so there's far less to protect. Start the study later.
    - ⭐ **Separate research opt-in, ethics approval first.** A separate plain-words consent just for the study, independent ethics approval before collecting anything, and research data kept apart.
- [ ] **12. Website privacy page:** fill in your name, city, country, postal address, web host and the US transfer safeguard. The website build warns until they're done. *Source:* `landing/privacy.html`
  - ✅ **Decided 20 Oct 2026:** Send Claude the details.
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **Send Claude the details.** Your name, city, postal address and web host. Claude fills them in and runs the check. The transfer safeguard follows from the host.
    - **Fill them in yourself.** Open landing/privacy.html and replace the five highlighted blanks.
- [ ] **13. Terms of service, trademark search, accessibility** (fixed-position option for the moving "continue" link). *Source:* legal brief §2 rows 15–17, design options #10
  - ✅ **Decided 20 Oct 2026:** One lawyer pass + Trademark search first + Fixed-position "continue" option.
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **One lawyer pass.** The same lawyer drafts the terms of service and checks the privacy page.
    - ⭐ **Trademark search first.** Search "ScrollJar" in the US and EU before spending on the brand.
    - ⭐ **Fixed-position "continue" option.** The link keeps moving by default, but stays in one place with VoiceOver, Switch Control or Reduce Motion on, or by a setting.
- [ ] **14. Backing a friend:** drop "a month of Plus" as a treat (Apple requires its in-app purchase for that), and decide where unpicked treats go. *Source:* design options #7
  - ✅ **Decided 20 Oct 2026:** Physical gift cards only + Unpicked treats go to the friend's charity.
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **Physical gift cards only.** Coffee, cinema, printed books. Drop "a month of Plus", because Apple requires its in-app purchase for digital gifts.
    - ⭐ **Unpicked treats go to the friend's charity.** If no treat is picked within 30 days, its value goes to the friend's charity, so ScrollJar never holds unclaimed money.
    - **Plus as an in-app gift.** Keep the Plus treat but sell it through Apple's in-app purchase, with Apple's cut. More work.
- [ ] **15. Pledges (Teams, Families):** charge only what's unlocked, never in advance. *Source:* design options #8
  - ✅ **Decided 20 Oct 2026:** Charge only what's unlocked.
  - **Possible solutions** (⭐ = suggested):
    - ⭐ **Charge only what's unlocked.** A pledge is a promise. The employer is invoiced, or the parent charged, at the end of each month or campaign, only for what was unlocked.
    - **Charge up front, refund the rest.** Simpler billing, but ScrollJar would hold the money: money-transmission and unclaimed-property risk. Not advised.

## 💸 Costs to budget

- **Change:** $999–$3,500 a month, plus $500 a month per state for the fundraising-platform package.
- **Lawyers:** US payments and nonprofit, EU and Italian privacy and consumer, App Store.
- **Fees:** partner and card fees on each coin (possibly twice).

## 📅 Re-check on dates

- [ ] **~27 Oct 2026:** confirm the Los Angeles trial starts 28 Oct (website "Why now" list), then update the line.
- [ ] **Monthly:** the K.G.M. appeals, New Mexico's appeal, and any EU final decisions on TikTok or Meta. Update the website's "Status as of" date. *Source:* `news-verified-2026-10.md`, handoff §4.5

## ✅ Already solved

- **20 Oct 2026:** website privacy page gaps filled (rights list, legal bases, regulators named, adults-only waitlist).
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

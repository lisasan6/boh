# ScrollJar — Legal brief for counsel (global launch, US first)

**Prepared 20 October 2026. This is not legal advice.** It is research to help L (the founder) brief a lawyer. It sets out what the rules say, with links to the sources that were actually opened, and the exact questions to ask. Nothing here says any feature is "legal" or "compliant".

**How it was done:** four research passes (charity law; payments and app stores; privacy and children; consumer law, advertising, platforms, tax and brand). Each rule was read at an official source where possible: statutes, regulators, Apple's guidelines, Every.org's own documentation. The four biggest findings were then re-checked by hand, marked ✔︎ below. The full research, with quotes, links and about 100 questions for counsel, is in `docs/legal-research-2026-10/` (files L1–L4).

**Who to hire:** this needs more than one specialty. Look for a US fintech/payments and nonprofit-law firm, an EU/Italian privacy and consumer-law firm, and an App Store specialist. Firms that work with "charitable fundraising platforms" will recognise most of section 1 at once.

---

## 1. Five things to settle before building the money engine

These could block launch or create real liability, and they change the product design. They belong at the top of the first call with a lawyer.

### 1.1 The money flow doesn't work as designed ✔︎
**What we assumed:** ScrollJar charges each user's card on the 1st and then donates the coins "server-side via Every.org" (spec §12, build plan §6).

**What Every.org's own documentation says:** "At this time, Every.org does not provide programmatic donations or disbursements via API. All donations must be completed by a donor on Every.org." Its API is free only for non-commercial use; for-profit apps need an "enterprise plan". Source: https://docs.every.org/docs/intro.

**Why it matters beyond engineering:** if coin money passes through ScrollJar's own Stripe account, ScrollJar is taking money from one person and sending it to another. That pattern can trigger three things:
- **Money-transmitter licensing:** US federal rules (FinCEN), state laws such as California's and New York's, and EU/UK payment rules. The usual exemptions are written for purchases of goods or services, not donations.
- **Charity fundraising registration:** "commercial co-venturer" and "charitable fundraising platform" rules in several US states.
- **Stripe's restrictions:** Stripe bans person-to-person money transmission and needs prior approval for charity fundraising. That support covers only the US, UK, Canada and Australia.

**Three shapes to put to counsel:**
- **A. The user donates directly** on the charity platform (a link-out). The user is the donor and gets the receipt. Cleanest legally, but the automatic monthly charge goes away.
- **B. ScrollJar charges, then donates in its own name.** ScrollJar becomes the donor of record. The user gets no receipt, "tax-deductible" can't be claimed, and ScrollJar holds charity money, with registration and licensing duties.
- **C. A partner built for this:** an Every.org enterprise deal, or a rail such as Change (getchange.io), which says it handles state compliance. Ideally the card is charged directly on the partner's account (a Stripe Connect "direct charge"), so the money never lands in ScrollJar's balance.

**Partner comparison (20 Oct 2026):** `legal-research-2026-10/charity-partners.md` compares Change, Pledge, Goodstack, Benevity, Every.org, PayPal Giving Fund and Daffy. None publicly documents charging the user's card for a varying monthly amount on its own account. Contact Change first, then Pledge, with the questions listed there.

**Ask:** Which shape, A, B or C, should we build? For each: who is the donor of record, who issues the receipt, do we need a money-transmitter licence anywhere, and which state registrations come before launch? Read the partner's contract before choosing. Every.org's terms page couldn't be opened.

### 1.2 Apple: charity money inside the app, and "monetizing Screen Time" ✔︎
Apple's App Review Guidelines (last updated 16 Oct 2026, https://developer.apple.com/app-store/review/guidelines/):
- **3.2.2(iv):** unless you're an Apple-approved nonprofit, "collecting funds within the app for charities and fundraisers" is not allowed. Such apps "may only collect funds outside of the app, such as via Safari or SMS".
- **3.2.1(vi):** a platform connecting donors to nonprofits "must ensure that every nonprofit listed in the app has also gone through the nonprofit approval process".
- **4.10:** "You may not monetize built-in capabilities provided by the hardware or operating system … or Apple services and technologies, such as … Screen Time APIs."
- **3.2.1(vii):** a gift "connected to … receiving digital content or services must use in-app purchase". A "month of Plus" as a Backing treat would therefore need Apple's in-app purchase.
- **1.2:** user posts (Board, notes, challenges) need filtering, reporting, blocking and a published contact.
- **5.1.3:** a health research study (the planned efficacy study with mood check-ins) needs informed consent (a parent's for minors) and approval from an independent ethics board.

**Our current basis** (coins as "services consumed outside the app", rule 3.1.3(e), plus Every.org) is an argument, not something Apple states. Competitors such as Forfeit keep the money, which avoids 3.2.2(iv) entirely. On the US storefront, Apple now allows links to web payment, so collecting coin payments on a web page is a possible fallback. The Epic v. Apple Supreme Court case could change that. Status: certiorari granted 30 June 2026, limited to a contempt question; Epic's brief due 13 Nov 2026; no hearing date yet.

**Ask:** How should coins be classified under 3.1.3(e), 3.1.1 and 3.2.2(iv), and should we ask App Review in advance? How does 4.10 apply to Plus and Teams? Paid screen-time apps exist on the store, so it's probably read as "don't charge only for Apple's feature", but get that confirmed.

### 1.3 EU privacy law (GDPR) probably applies to every user from day one
- GDPR covers processing "in the context of the activities of an establishment … in the Union" (Art. 3(1)).
- The EU's data protection board says even "one single employee or agent" in the EU can count as an establishment.
- So with the founder working from Italy, GDPR may cover **all** users, US users included, whether the company is Italian or a Delaware company.
- The mission-control checklist's line "GDPR at EU expansion" is likely wrong. The website privacy page already treats GDPR as applying.

**This ties into the entity choice (open question Q16).** The entity decides GDPR set-up, whether EU and UK representatives are needed, unclaimed-property law, tax, Apple enrolment (Apple wants a legal entity, not an individual, for apps handling sensitive data, rule 5.1.1(ix)), and the EU Digital Services Act representative.

**Ask:** With an Italy-based founder, is there an EU establishment? Then pick one consistent set-up: Italian company, or US company plus EU/UK representatives.

### 1.4 Families means collecting data from children
- **US children's privacy law (COPPA, amended rule):** compliance has been required since **22 April 2026**. Children are under 13. Sharing a child's data with a third party needs **separate** verifiable parental consent, and you need a written data-retention policy and a written security programme.
  - Sending a **child's name to the charity platform for the receipt** is such a disclosure. Receipts in the parent's name, with the kid's name shown only on the phone, would avoid it.
- **Italy:** children can consent to online services themselves from **age 14** (UK 13, EU default 16).
- **Texas SB 2420** (App Store Accountability Act, from 1 Jan 2026) may already bind app developers: age-rate the app and each purchase, use Apple's age and consent signals, and tell the app store before privacy-policy changes. A court blocked it, but the Fifth Circuit paused that block and the Supreme Court refused to lift the pause in July 2026 (status from a party's website, so verify).
- **UK Children's Code** (privacy by default for under-18s), the **UK Online Safety Act** (if kids can see or post content), **Australia's** under-16 social media rules and **Brazil's** ECA Digital apply in those markets.
- Apple: don't list in the Kids category, and App Store text mustn't make kids the main audience.

**Ask:** Is Families "directed to children"? Which parental-consent method works with Apple Family Sharing? Should the core app (with money stakes) be 18+ only?

### 1.5 The card fee "added on top" on the free plan ✔︎
- **EU:** payment law says the seller "shall not request charges" for paying with ordinary consumer cards (PSD2 Art. 62(4)).
- **UK:** the same ban (Payment Surcharges Regulations, reg. 6A).
- **California:** advertised prices must include mandatory fees, and a card fee is mandatory if cards are the only way to pay (Civil Code §1770(a)(29); the Attorney General's guidance says exactly this).

**Ask:** Is the top-up a banned surcharge? Would an optional, separately ticked "cover the fee for my charity" be treated differently? Who is the "payee": ScrollJar or the charity platform?

---

## 2. Needed at US launch

| # | Topic | What the rules say (short) | Ask counsel |
|---|---|---|---|
| 1 | **California "charitable fundraising platform"** | Platforms that let users pick charities must register with the Attorney General *before* soliciting ($625/yr), show set disclosures before a charity is picked (who receives it, fees, timing, tax deductibility), and get each charity's written consent *or* say plainly that it hasn't consented. | Are we a platform under §12599.9? Which consent route and wording? |
| 2 | **Hawaii (from 1 July 2026)** | Written consent from each charity before using its name; no "hasn't consented" alternative found. | Limit Hawaii users to charities that have opted in? |
| 3 | **Commercial co-venturer states** (MA, NY, AL, SC; IL unclear) | Written contracts with the charity, registration and/or bonds, and accountings. | Is a coin a "sale" or a direct donation? Does one contract with the charity platform cover all user-picked charities? |
| 4 | **"100% to charity" wording** | Every.org charges processing fees (2.2% + $0.30 for Visa/Mastercard; +1% non-US) and 1.5% to pay out, treats designations as recommendations, and can redirect to a similar charity. Payout takes 1–8 weeks. | What exact wording is defensible? Drop "reaches the program". Disclose the redirect power and the timing. |
| 5 | **Tax deductibility** | California and Hawaii *require* a statement on deductibility. Receipts go to whoever the donor of record is. Every.org receipts are US-only, and some 2026 US deduction rules may exclude donor-advised-fund-style gifts. | What can we say about deductibility under shapes A, B and C? |
| 6 | **Monthly charges that vary** | US debit cards: written authorisation plus a copy, and **10 days'** written notice when the amount changes, unless the user picks a range (Reg E §1005.10). Visa: mandate terms shown separately, written notice and **7 days** after a failed charge. EU/UK: the user can claim a refund for **8 weeks** if the amount was more than they could expect. | Can a user-chosen range (or the $50 cap) replace the 10-day notice? How does that work with coins from the last days of the month? |
| 7 | **Jar break (5× the price)** | EU law lists terms requiring a consumer to pay "a disproportionately high sum" as possibly unfair, and EU withdrawal must be possible "without incurring any costs". | Is 5× proportionate? Would a cap or the normal price be safer? (High risk in the EU; ask for the US too.) |
| 8 | **Health and sensitive data** | The EU's top court (C-21/23, 2024): data counts as health data if health can be *deduced* from it. Washington's My Health My Data Act covers inferred mental-health data, has **no revenue threshold** and allows private lawsuits. | Are mood check-ins, rough-day features, the "something heavy" word list and charity choice (which can reveal religion, politics or health) sensitive? Do we need explicit consent toggles or a separate health-data policy? |
| 9 | **Website privacy page** | 13 gaps: controller name, transfer safeguard, web host not named, missing rights, legal basis for server logs, and no mailing address. Canada's anti-spam law (CASL) and US CAN-SPAM need a postal address; a virtual mailbox is fine. No data processing agreement found for Formspree. | Fix before targeting EU or Canadian visitors; get processor contracts. |
| 10 | **Health claims** | US FDA "general wellness" guidance (Jan 2026): stress and concentration claims are fine, disease claims are not. UK ad rules (CAP 12.1) need trials on people. Citing other studies next to the product can read as a claim about ScrollJar. | Is "the idea behind the pause" framing enough? Avoid anxiety, depression, ADHD and "addiction" in marketing copy. |
| 11 | **Comparative claim** | "Most stakes apps keep your money" needs a dated file of evidence (checked 20 Oct 2026: Forfeit keeps the money, stickK sends it to a friend or a charity). | What evidence file is enough? |
| 12 | **User posts** | Apple 1.2 (filter, report, block). EU DSA hosting duties apply at any size: notice-and-action, reasons, terms, contact points, and an EU representative if there's no EU establishment. The UK Online Safety Act very likely applies. | Which duties apply on day one? Do kids' accounts get no posting? |
| 13 | **Backing a friend** | Gift-card rules (US 5-year minimum expiry; California cash-back under $15); unclaimed-property law if a treat is never picked; Stripe approval needed. The gambling definitions look unmet because the backer never gets anything back, but Apple and Stripe judge on appearance. | Promotional or sold gift card? Default destination for unpicked treats (e.g. the friend's charity after 30 days)? |
| 14 | **Subscriptions** | US ROSCA (clear terms, consent, easy cancel). California auto-renewal law (amended, from 1 Jul 2025: consent record, annual reminder). The FTC "click-to-cancel" rule was struck down in July 2025, and a new rulemaking started in March 2026. | Does a deal with a stored card count as a "continuous service" or "negative option"? Who sends the reminders for Apple subscriptions? |
| 15 | **Legal pages** | Terms of Service (the deal contract stated exactly as in the app), EULA, app privacy policy, community policy, charity/transparency page, and an EU legal notice with VAT number. | Draft them in plain language, matching the app wording. |
| 16 | **Trademark** | "Scroll" and "jar" are common words; no search has been run yet. | Full clearance in the US, EU, UK and Italy before brand spend. |
| 17 | **Accessibility** | The moving "Never mind, continue" button is hard to use with VoiceOver, Switch Control and motor impairments. US lawsuits are common; the EU Accessibility Act exempts microenterprises (under 10 staff and €2M turnover). | Add a fixed-position accessibility option. Which WCAG level to promise Teams customers? |

---

## 3. Later markets (before launching there)

- **UK:**
  - **Charity statements:** under the Charities Act 1992 (ss. 59–60), a "commercial participator" needs a **written agreement with each charity** and a statement naming it. Breaking this is an offence.
  - **Fundraising Regulator code:** new code in force since 1 Nov 2025.
  - **Ad rules for charity promotions:** CAP 8.33 requires stating any caps on company giving.
- **Italy:**
  - **Law 120/2026** (in force 21 Jul 2026): charity-linked sales need labels saying who gets what share, and a notice to the competition authority (AGCM) **15 days** before sales start. Fines run €5,000–50,000. It likely covers Plus marketed alongside giving; coins are unclear.
  - **Prize-promotion rules** (DPR 430/2001) may cover the company's own donations per 10 kept days and the $1 invite donations.
- **EU-wide:**
  - **"Withdraw from contract here" button** required from **19 June 2026** (Germany: §356a BGB). Germany also requires a "cancel contracts here" button (§312k BGB).
  - **14-day withdrawal right** and the unfair-terms rules apply to the deal contract.
  - **Digital Fairness Act** (dark patterns, addictive design) is planned for Q4 2026.
  - **Payment-law reform (PSD3/PSR)** is agreed but not yet adopted.
- **Teams in Germany and Italy:**
  - **Germany:** works councils may have a say even over aggregate-only dashboards (§87(1) no. 6 BetrVG; the federal labour court reads "monitoring" broadly).
  - **Italy:** the workers' statute, art. 4.
  - **The privacy floor:** "Groups under 5 hidden" may not stop someone working out one person's hours when a member joins or leaves. Consider delays or noise.
- **Cross-border giving:** Every.org grants only to US 501(c)(3)s (or charities with US equivalency), accepts only USD, and its receipts are US-only. Germany, for example, allows tax deductions only for gifts to EU/EEA bodies. EU users will need local charity rails (the spec already plans Pledge or Change).
- **Brazil:** ECA Digital requires a **legal representative in Brazil** and parental supervision.
- **Australia:** state fundraising laws, the under-16 social media rules, and a children's privacy code due by 10 Dec 2026.
- **Canada:** CASL consent rules, Quebec's Law 25 (impact assessments; parental consent under 14).
- **India:** the data protection rules phase in through 2027.

---

## 4. What ScrollJar already does well

These are worth telling counsel, because they lower risk:
- **Little data leaves the phone.** App identities never leave the device; diary, letters, signature and onboarding speech stay local.
- **Teams:** no individual view exists; groups under 5 are hidden.
- **Wish jars move no money**, and Teams Private Boost already uses direct donation through the charity platform's own checkout. That's the cleanest pattern, and coins could copy it.
- **Backing:** "Never cash, nothing back to the backer, never a bet", and never for under-18s. Kids are never charged or paid.
- **Charges have guardrails:** a $50 monthly cap, 48-hour refunds, a grace hour, a pre-settlement email, a plain-words card at deal creation, and rising price that's opt-in and capped at 2×.
- **No dark patterns, ads, analytics, leaderboards or variable rewards.** Account deletion and export are built in.
- **Honesty rules:** science claims are traced to sources, competitor prices are never stated as fact, and court findings are labelled "on appeal" or "preliminary".

## 5. Design options that could lower risk (to discuss with counsel, not decided)

- Make coins a **direct donation by the user** to the charity platform (shape A or C), so ScrollJar never holds the money.
- Charge Teams and Families pledges **only for what's unlocked**, never in advance. Teams' "unspent pledge rolls into the next campaign" means holding customer money.
- Put **receipts in the parent's name**, so no child data leaves the phone.
- Make the **core app 18+**, using Apple's age-range signal.
- Make the **card-fee top-up an optional tick**.
- **Cap the jar-break charge**, or drop it for app deletion.
- Offer **physical-service gift cards only** as Backing treats (no "month of Plus").
- Keep a **dated evidence file** for every public claim (science and competitors).

## 6. Couldn't verify (ask counsel)

- Every.org's terms and any enterprise agreement.
- The exact Gazzetta Ufficiale text of Italy's Law 120/2026.
- The South Carolina and Illinois co-venturer details.
- Which US states have adopted the model money-transmission act.
- Texas SB 2420's current status (party source only).
- California's age-appropriate design code after remand.
- Other US kids' and state privacy laws (Utah, California AB 1043, Texas TDPSA and others).
- Formspree and other processors' certification under the EU–US Data Privacy Framework. That framework is also under appeal at the EU's top court (C-703/25 P).
- German case law on group-level data.
- Italy's employee-monitoring rule text.
- The FTC health-claims guidance page.
- Canada, Australia, France, Japan and India details.

Each item is listed with its source attempts in L1–L4.

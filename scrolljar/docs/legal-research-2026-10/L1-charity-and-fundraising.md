# L1 — Charity, donations and fundraising law (ScrollJar)

Prepared 2026-10-20 by research helper L1. **This is research to prepare questions for counsel. It is not legal advice.** Nothing here says a feature is "legal" or "compliant". Each item gives the rule, where it was read, the ScrollJar feature it affects, and the question to ask.

Sources were opened with curl on the date above. Where the official site blocked scripts, a mirror that cites the official text was used, and this is marked "(mirror)". Search snippets were used only to find pages.

---

## 0. The headline: one fact changes the money design

**Every.org's own API docs say it cannot do what the build spec assumes.**

> "At this time, Every.org does not provide programmatic donations or disbursements via API. All donations must be completed by a donor on Every.org."
> https://docs.every.org/docs/intro (read 2026-10-20; the docs changelog was last updated 2026-10-15)

Every.org's help centre also says the API is free only for non-commercial use:

> "For partners using the Every.org Charity API for non-commercial use cases it is free, or you can contact us to explore for-profit enterprise plans."
> https://support.every.org/hc/en-us/articles/360061886773-Does-Every-org-charge-fees

The build plan has ScrollJar charging the user's card through Stripe on the 1st and then making the donation "server-side via Every.org" (IOS-BUILD-SPEC §6; spec §9 and §12). Going by Every.org's published docs, that flow does not exist. That leaves three broad options, and the legal picture is very different under each:

| Option | Who is the donor of record | ScrollJar holds charity money? | Main legal exposure |
|---|---|---|---|
| **A. The user completes each donation on Every.org** (Donate Link with `amount`, `partner_donation_id` and the partner webhook) | The user. Every.org issues the receipt. | No | CA "charitable fundraising platform" disclosures and consent (types A/C); Hawaii consent. Auto-charging on the 1st no longer works as designed, so the product loop needs a rethink. |
| **B. ScrollJar charges the user, then donates in its own name** (manually, or through a different rail) | ScrollJar. The user gets no receipt and, for US tax, has made no deduction-eligible gift. | Yes | Commercial co-venturer, commercial fundraiser or platform registration in several states; separate-account and trust duties (CA 12599.9(h)); "tax-deductible" claims become false. |
| **C. An enterprise deal with Every.org, or another rail that allows programmatic giving** (e.g. Change, as research-findings.md mentions) | Depends on the contract | Depends | Everything depends on the contract terms, which nobody has read yet. |

**Question for counsel (blocking):** "Which of options A, B or C should we build? For each one, who is the donor of record, who issues the receipt, and which state registrations does ScrollJar need before launch?"

---

## 1. United States

### 1.1 California: "charitable fundraising platform" (AB 488). Risk: HIGH

**The rule.** Gov. Code §12599.9, in force for platforms from 1 Jan 2023. The AG's implementing regulations were approved 26 Mar 2024, with parts in force 26 Mar 2024, 12 Jun 2024 and 1 Jan 2025.

- A platform is defined to include one that "Permits persons who use the platform to select one or more recipient charitable organizations to receive donations ... made by a platform, platform charity, or other third party person, based on purchases made or other activity performed by persons who use the platform" (§12599.9(a)(1)(C)). It also covers platforms that "Lists or references by name one or more recipient charitable organizations to receive donations ... made by donors who use the platform" ((a)(1)(A)) and peer-to-peer fundraising ((a)(1)(B)).
- Registration: "A charitable fundraising platform shall, before soliciting, permitting, or otherwise enabling solicitations, register with the Attorney General's Registry ... Registration shall be renewed each year" (§12599.9(b)). The fee is $625 a year (11 CCR §315(a)(2)), with an annual report on Form PL-4 due 15 July (§315(e)).
- Disclosures "before a person can complete a donation or select or change a recipient charitable organization" (§12599.9(e)):
  - who the donation is legally made to;
  - why the charity might not receive it;
  - the maximum time to send it;
  - fees, other than payment processing;
  - "A statement as to the tax deductibility of the donation."
- **Consent to use a charity's name:** "shall obtain the written consent of a recipient charitable organization before using its name in a solicitation" (§12599.9(f)(1)). For types A, B and C there is an alternative to consent. The platform must:
  - show only the charity's public data (name, EIN, website and similar);
  - "conspicuously disclose ... that the recipient charitable organization has not provided consent or permission for the solicitation";
  - remove the charity within three business days of a verified request.

  See §12599.9(f)(2)(A)–(D).
- Money must be held "in a separate account" and must not be misused (§12599.9(h)).
- Overlap with the co-venturer rules: an entity that is both a commercial co-venturer and a platform under (A), (B), (C) or (E) "shall be only a charitable fundraising platform" (§12599.2(a)). A co-venturer can avoid platform status only under (D), and only for "six or fewer" charities a year.
- §12599.9(a)(2)(D)(vi): an entity whose solicitation involves "receiving something of value, or a chance to win something of value, in connection with a donation" is treated as a **commercial fundraiser**, not a platform.

**Sources:**
- Statute (mirror of leginfo, updated 1 Jan 2025): https://california.public.law/codes/government_code_section_12599.9. Official: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12599.9 (blocked to scripts).
- Regulations and in-force dates: https://oag.ca.gov/charities/regs/platforms and the final text at https://oag.ca.gov/system/files/media/pf-final-text-of-proposed-regulations.pdf. The regulations define "Solicitation type C" as including "charitable sales promotions, coventuring or cause marketing campaigns, or free action programs. In these solicitations, platform users have the option to select one or more recipient charitable organizations".

**ScrollJar features affected:**
- Coins, where the user picks any charity: type C under options B/C, type A under option A.
- Creator public challenges: arguably peer-to-peer, type B.
- Teams, where employees vote from an HR shortlist.
- Success-side giving and invites-that-donate, where the user chooses the cause.
- Backing a friend: something of value (a gift card) goes to the friend, which may engage the (a)(2)(D)(vi) carve-out.

**Questions for counsel:**
1. Is ScrollJar a California charitable fundraising platform under (a)(1)(A), (B) or (C), and must it register (Form PL-1, $625) before launch? Does that hold even if Every.org is the legal recipient?
2. Every.org lists over 1M charities that have not consented to ScrollJar. Can we rely on the §12599.9(f)(2) "has not provided consent" route? Exactly what disclosure text and placement satisfy 11 CCR §317 and the "conspicuous" definition?
3. Does Backing a friend (the treat is a gift card) fall under (a)(2)(D)(vi), making ScrollJar a *commercial fundraiser* (separate registration and bond)?
4. Under option B, does holding coin money between the card charge and the donation trigger the §12599.9(h) separate-account duty and trustee status?

### 1.2 Hawaii: platform registration and written consent from 1 July 2026. Risk: HIGH (new in 2026)

**The rule.** Act 108, SLH 2025 (SB 1048, approved 29 May 2025). It amends Act 205 (2024) and takes effect "on July 1, 2026".

- A platform "shall obtain the written consent of a recipient charitable organization before using the recipient charitable organization's name in a solicitation for a purported charitable purpose."
- §467B-9(d), as amended: no platform shall "solicit in the name of or on behalf of any charitable organization unless the charitable fundraising platform or platform charity has obtained written consent".
- Disclosures mirror California's, including "A statement as to the tax deductibility of the donation."
- The six-or-fewer co-venturer rule is also adopted.

Unlike California, the Act's text as read shows **no** "has not consented" alternative.

**Sources:** https://data.capitol.hawaii.gov/sessions/sessionlaws/Years/SLH2025/SLH2025_Act108.pdf. Every.org's own Hawaii disclosure confirms how it handles this: "Every.org is registered with the Hawaii Attorney General's Office as a charitable fundraising platform. We provide an opt-in service to charities, meaning organizations must request access and agree to have their full profiles (names, branding, and messaging) appear on the platform." (https://support.every.org/hc/en-us/articles/5968895910291-What-are-your-Nonprofit-State-Disclosures, updated 2026-06-28).

**Features affected:** the free-text charity picker, Creator challenges and Teams shortlists, for users in Hawaii.

**Question for counsel:** "For Hawaii users, must ScrollJar limit the picker to charities that have given written consent (for example, Every.org's claimed/opt-in profiles), or register as a platform? Did Act 108 keep any non-consent route that we missed?"

### 1.3 Commercial co-venturer (CCV) states. Risk: HIGH under option B, MEDIUM under option A

| State | Rule (quoted) | Source |
|---|---|---|
| **California** | CCV = one who "for profit, is regularly and primarily engaged in trade or commerce other than in connection with the raising of funds ... and who represents to the public that the purchase or use of any goods, services ... will benefit a charitable organization" (§12599.2(a)). Exempt from registering only with a written contract "signed by two officers" of the charity, transfers every 90 days and a written accounting (§12599.2(b)). Otherwise register: CT-5CF, $500 (AG page). | https://california.public.law/codes/government_code_section_12599.2 (mirror); https://oag.ca.gov/charities/pf/cc |
| **Massachusetts** | CCV = "any person who for profit or other commercial consideration, conducts ... sale to the public of a good or service which is advertised in conjunction with the name of any charitable organization ... Any such person who will benefit in good will only shall not be deemed a commercial co-venturer if the collection and distribution of the proceeds ... are supervised and controlled by the benefiting charitable organization" (c.68 §18). Contract "in writing, signed by two officers ... filed ... within ten days" (§22). Disclosures at the time of solicitation, including "a statement that the solicitation is being conducted by a paid fundraiser" (§23). Registration with a $200 fee and a "$25,000" bond (§24). | https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXI/Chapter68/Section18 (also Section22, Section23, Section24) |
| **New York** | CCV defined as in CA (Exec. Law §171-a). No CCV registration (§173(1) covers professional fundraisers and counsel), but "No person shall act as a ... commercial co-venturer before he has a written contract with the charitable organization", with an accounting "Within ninety days after the termination of a sales promotion" (§173-a(1),(3)). Wilful breach of §173 is a misdemeanor. | https://newyork.public.law/laws/n.y._executive_law_section_173-a ; .../section_171-a ; .../section_173 (mirrors of nysenate.gov) |
| **Alabama** | AG: "Alabama law requires professional fundraisers, professional solicitors, and commercial co-venturers to register". CCV fee $100. Registrations expire "September 30th". Closing statement "within 90 days of the termination of the contract" (§13A-9-71(i)). | https://www.alabamaag.gov/licensing-registration/professional-fundraiser-or-commercial-co-venturer-and-professional-solicitors/ |
| **South Carolina** | CCV = one who "may raise funds by advertising that the purchase or use of goods, services ... benefits the charitable organization, if it is offered at a price comparable to similar goods or services in the market" (§33-56-20(3)). Must register (§33-56-110(A)). Contract filed "at least ten days before" (§33-56-140(A)). §33-56-120(D): no one shall "use or display any emblem, device, or printed matter belonging to or associated with a charitable organization ... without first being authorized to do so by the charitable organization." | https://www.scstatehouse.gov/code/t33c056.php . Perlman & Perlman (secondary, June 2026) reports an amendment "as of 6/18/26": registration required only above "$10,000 in charitable contributions". **Not verified in the statehouse code text.** |
| **Illinois** | Statute not reached (ilga.gov TLS error; mirror blocked). Secondary source only: "The Illinois AG's office has taken the position that commercial co-venturers must register under the state's charitable trust law", with a $15 contract filing. | https://perlmanandperlman.com/wp-content/uploads/2026/06/CCV-Registration-Chart.pdf (secondary) |

**Features affected:**
- Coins: is a coin a "sale of a good or service"? It is a self-set price paid to override a block, with 100% passed to charity.
- Plus marketing ("Your membership is what lets us give away 100%").
- Legend/50% membership giving, success-side giving and invites-that-donate (company giving tied to memberships, which looks like a classic CCV).
- Teams seats sold to employers, with the employer's pledge to charity.

**Questions for counsel:**
1. Is a coin a "sale of a good or service" or a "promotional venture" under each statute, or a direct donation by the user?
2. Does the Massachusetts "benefit in good will only ... supervised and controlled by the benefiting charitable organization" exception help if Every.org collects and distributes? ScrollJar earns membership revenue, so is it acting "for profit or other commercial consideration"?
3. The CCV statutes assume a written contract with each charity, signed by two officers. Is a single contract with Every.org (as the legal recipient) enough, or does each user-chosen charity count?
4. Which states require registration or contract filing before the first US user can pick a charity: AL, MA, SC, IL, plus HI/MS contract filing?
5. Is the Perlman report of the South Carolina 2026 threshold amendment accurate?

### 1.4 "100% goes to charity" and fee disclosures. Risk: HIGH (misleading-claim risk)

**What the facts are:**
- **Every.org third-party fees:** "the Stripe processing fee is 2.2% + $0.30 for Visa and Mastercard, or a flat 3.5% for Amex cards. For non-US cards, the Stripe fee increases by 1%. ForGood, Inc charges 1.50% to distribute funds to the nonprofit." The page also says fees are covered if the donor connects a bank account. (https://support.every.org/hc/en-us/articles/360059998533-What-are-the-third-party-processing-fees, updated 2026-10-02)
- **Every.org asks donors for optional tips** to Every.org (fees article above).
- **Designations are not binding:** "Every.org grants are unrestricted, so this is only a recommendation to the nonprofit, not a legal restriction." (https://docs.every.org/docs/donate-link)
- **Every.org can redirect funds:** "If circumstances make distribution to a particular nonprofit impossible or inappropriate ... we may, in our sole discretion, select a similar alternate charity" (state disclosures page above). Undeliverable funds are refunded "with gift card credit" (https://support.every.org/hc/en-us/articles/360058165694).
- **Timing:** "between 1~8 weeks"; "The minimum disbursement is $10 USD through ForGood, Inc." (https://support.every.org/hc/en-us/articles/360059998673)
- **Legal rules:** CA §12599.9(e) requires disclosure of fees other than processing, of possible non-receipt and of the maximum time (§1.1 above). MA c.68 §23 requires solicitation disclosures. SC §33-56-120(A): no one shall "misrepresent or mislead, knowingly and wilfully".

**Where the docs are inconsistent:**
- Spec §2 says "100% of penalties go to charity (minus card fees, disclosed)".
- v1.3 says the card fee is "added on top so 100% of the price arrives".
- Spec §8 wants "'100% reaches the program' explicit".

"Reaches the program" is a stronger claim than ScrollJar can control: the grants are unrestricted, and fees apply at Every.org.

**Questions for counsel:**
1. What exact wording is defensible? For example: "100% of your coins go to the charity you pick, through Every.org. ScrollJar keeps none of it. Card fees are shown before you confirm."
2. Must we drop "reaches the program"?
3. Do we have to disclose Every.org's variance power and the 1–8 week timing (CA §12599.9(e)(2)–(3)) in the picker?

### 1.5 Tax receipts, donor of record and deductibility claims. Risk: HIGH if we make any deductibility statement

- **IRS definition (Pub. 526, for 2025 returns):** "A charitable contribution is a donation or gift to, or for the use of, a qualified organization. It is voluntary and is made without getting, or expecting to get, anything of equal value." (https://www.irs.gov/publications/p526)
- **Substantiation:** "A donor claiming a deduction of $250 or more is also required to obtain and keep a contemporaneous written acknowledgment ... The written acknowledgment must state whether the donee provides any goods or services in consideration for the contribution." (https://www.irs.gov/charities-non-profits/substantiating-charitable-contributions)
- **Quid pro quo:** where a payment over $75 is partly for goods or services, the charity must give a disclosure statement. The penalty is "$10 per contribution, not to exceed $5,000 per fundraising event or mailing". (https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-contributions-quid-pro-quo-contributions)
- **Every.org's position:** "As the legal recipient of donations made through our platform, tax deductions come from Every.org" (https://support.every.org/hc/en-us/articles/5715755336083, updated 2026-08-21; IRS public-charity letter dated 23 Oct 2025, EIN 61-1913297). "Each donation you make goes to Every.org first and we immediately issue a receipt" (https://support.every.org/hc/en-us/articles/360059359213). "our donation receipts are only tax-deductible in the US" (https://support.every.org/hc/en-us/articles/5527881074579).
- **New in 2026 (OBBBA, P.L. 119-21, 4 Jul 2025):** "Beginning with tax year 2026, individuals who do not itemize may deduct up to $1,000 of cash contributions ... ($2,000 for married taxpayers filing jointly). Certain contributions - including donations to donor-advised funds and supporting organizations - do not qualify." (https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions). Every.org tells nonprofits to treat its grants "in the same way" as DAF grants (https://support.every.org/hc/en-us/articles/5711616989843).

**Features affected:**
- Coins, depending on whether ScrollJar or the user is the donor.
- Teams employer pledges: the employer is donor. The Teams spec promises "donation receipts".
- Families: the parent is donor.
- Backing a friend: the backer pays, part goes to the friend's charity and part to a gift card.
- Private Boost.
- Legend 50% and success-side giving: ScrollJar is donor, and the spec already says "no tax-receipt implication" (good).

**Questions for counsel:**
1. Under each option (A/B/C), who receives the 170(f)(8) acknowledgment for coins, Teams pledges, Families pledges and Backing-a-friend charity days?
2. Is a coin "voluntary" if the user agreed in advance to pay it as a self-set penalty? Can the app ever say "tax-deductible"? (CA and HI *require* a statement on deductibility, so we must say *something*.)
3. Do contributions through Every.org count as DAF contributions, excluded from the new 2026 non-itemizer deduction?
4. Backing a friend: is the backer's charity share deductible to the backer, and does the gift-card share create quid-pro-quo or gift-tax issues? (The value goes to a third party, not to the donor.)
5. Teams: employer corporate-deduction limits and the reported 2026 1% floor (not verified, see §6). If unspent pledge rolls over and ScrollJar holds it, has the employer even made a "contribution" yet?

### 1.6 Charity name and logo use (US). Risk: MEDIUM to HIGH

- CA §12599.9(f): written consent, or the no-consent disclosure route (§1.1).
- HI Act 108: written consent (§1.2).
- SC §33-56-120(D): no "emblem, device, or printed matter belonging to or associated with a charitable organization ... without first being authorized" (§1.3).
- SC §33-56-120(C): no implying that someone "sponsors or endorses" a solicitation without "written consent".
- Every.org lists all IRS Pub. 78 public charities by default ("We list public charities based on the IRS Publication 78 data", https://support.every.org/hc/en-us/articles/360059840294). Unclaimed pages "are never promoted or indexed" (https://support.every.org/hc/en-us/articles/5533900192659).

**Features affected:**
- Charity picker with logos.
- Share cards, e.g. "My hours helped fund 2,400 meals" with a charity name.
- Teams impact pages and "the charity's thank-you" at the tip-out.
- Creator challenge pages.
- Impact units such as "$5 ≈ 10 school meals", which make claims about a named charity's costs.

**Questions for counsel:**
1. Can we show charity *logos* at all without consent, given federal trademark (nominative fair use) plus SC and CA rules? Or should we show names only, as CA (f)(2)(A) contemplates?
2. Do we need each charity's approval before using impact units ("10 meals") tied to that charity?

---

## 2. EU and Italy

### 2.1 Italy: Legge 19 giugno 2026, n. 120. Risk: HIGH (founder in Italy; applies to Italian consumers)

**Verified:**
- Title: "Disposizioni in materia di destinazione di proventi derivanti dalla vendita di prodotti". It was a government bill, filed 9 Feb 2024 (Camera), passed by the Camera on 1 Apr 2026, and has six articles (Camera research service: https://temi.camera.it/leg19/provvedimento/disposizioni-in-materia-di-destinazione-di-proventi-derivanti-dalla-vendita-di-prodotti.html).
- Art. 2 per the Camera: producers and professionals "devono fornire anche indicazioni sul soggetto destinatario di parte dei proventi, sulle finalità per cui sarà impiegata la parte dei proventi ... e sulla quota percentuale del prezzo di vendita o l'importo per ogni unità di prodotto".
- Art. 3: notice to AGCM "prima di porre in vendita i prodotti".
- Art. 4: AGCM imposes sanctions.
- Art. 5: does not apply to promotions already running when the law took effect.

**Secondary (law-firm and academic commentary; GU text not opened because gazzettaufficiale.it and normattiva.it reset the connection):**
- In force **21 July 2026**.
- AGCM notice "almeno quindici giorni prima della commercializzazione", plus confirmation of payment "entro tre mesi" after the stated deadline.
- Fine "da 5.000 a 50.000 euro (salvo che il fatto integri un reato o una pratica commerciale scorretta ...)", with publication of the decision. A further €5,000–50,000 applies for not complying (LCA, 24 Jul 2026: https://www.lcalex.it/wp-content/uploads/2026/07/Insight_Pubblicita-e-beneficenza_trasparenza-obbligatoria-per-le-imprese-dal-21-luglio-2026.pdf).
- Art. 1(4): "per 'professionista' si intende sia il venditore sia il soggetto che promuove l'acquisto", which commentators read as covering influencers.
- Beneficiaries include bodies "costituiti, stabiliti o comunque operanti all'estero", so US charities are covered (Sistema Penale: https://sistemapenale.it/it/scheda/breda-il-ddl-ferragni-e-legge-nuovi-obblighi-informativi-a-tutela-dei-consumatori-in-materia-di-devoluzione-solidaristica-di-parte-dei-proventi-commerciali).
- GU issue number: secondary sources disagree (n. 154 or n. 157 of 6 Jul 2026). Normattiva ELI found by search: https://www.normattiva.it/eli/id/2026/07/06/26G00136/ORIGINAL (not opened).

**How it touches ScrollJar:** the law is about *proceeds from selling products to consumers*.

- Coins are arguably not a product's price, since 100% passes through. That needs counsel.
- **Plus memberships marketed alongside giving clearly look closer:** "Your membership is what lets us give away 100%", Legend's 50%, success-side giving funded from membership revenue, and $1 invite donations.
- Teams is B2B, so arguably outside the "consumatori" scope.
- Creators who promote Plus or challenges to Italian followers may be "professionisti".

**Questions for counsel (Italy):**
1. Is a coin a "prodotto" sale under L. 120/2026, or outside its scope?
2. Does membership marketing that mentions giving trigger the art. 2 labelling and the art. 3 AGCM notice 15 days before launch in Italy? Does that apply even if the entity is a US company selling via the App Store?
3. Must Creator partners in Italy carry the disclosures themselves?
4. How does this interact with the Codice del Consumo unfair-practice regime (fines up to €10M per Sistema Penale), as in the 2023 AGCM "Pandoro Pink Christmas" decisions?
5. Is there an AGCM notification form or portal yet? None was found.

### 2.2 Italy: raccolta fondi rules (Codice del Terzo settore, art. 7)

Sistema Penale reports that L. 120/2026 art. 1(2) excludes activity by non-profit bodies and "faces salve le disposizioni in materia di raccolta fondi previste dall'art. 7 del Codice del Terzo Settore". Art. 7 CTS governs fundraising *by* third-sector bodies (ETS). It was not opened directly.

**Question:** "If we set up an Italian entity, or partner with an Italian ETS for EU expansion, does art. 7 CTS (and its 2022 guidelines) apply to us or only to the ETS?"

### 2.3 EU-level

No EU instrument specific to cause-related marketing was found. The general rules are the Unfair Commercial Practices Directive 2005/29/EC and the Empowering Consumers Directive (EU) 2024/825, reported to apply from 27 Sep 2026, which bans generic environmental claims and offset-based neutrality claims. **Neither was opened: EUR-Lex returned a bot challenge (HTTP 202).** This matters if success-side giving says "1 tree".

**Question:** "Do 'plant a tree' style impact units fall under 2024/825's environmental-claim rules?"

---

## 3. United Kingdom

### 3.1 England and Wales: Charities Act 1992 Part II, "commercial participator". Risk: HIGH for UK launch

**The rule** (Part II "wholly in force at 1.3.1995"):

- **s.58 definition:** a commercial participator "carries on for gain a business other than a fund-raising business, but ... engages in any promotional venture in the course of which it is represented that charitable contributions are to be given to or applied for the benefit of the institution". "Charitable contributions" includes "the whole or part of ... the consideration given for goods or services sold or supplied by him, or ... any proceeds (other than such consideration) of a promotional venture undertaken by him". "Charitable institution" includes "an institution (other than a charity) which is established for charitable, benevolent or philanthropic purposes". This arguably includes a US 501(c)(3).
- **s.59(2):** "It shall be unlawful for a commercial participator to represent that charitable contributions are to be given to or applied for the benefit of a charitable institution unless he does so in accordance with an agreement with the institution satisfying the prescribed requirements". The remedy is an injunction on the institution's application (s.59(3)). The agreement must also specify voluntary standards, how vulnerable people are protected, and monitoring (s.59(7)).
- **SI 1994/3024 reg 2:** the agreement must be "in writing and ... signed by or on behalf of the charitable institution", with its parties, term, objectives and the "proportion" if more than one institution.
- **s.60(3) statement:** the representation "shall be accompanied by a statement clearly indicating— (a) the name or names of the institution or institutions concerned; (b) if there is more than one institution concerned, the proportions ...; and (c) the notifiable amount" of what goes to them.
- **s.60(7):** breach is an offence, with a fine up to level 5. s.60(8) gives a due-diligence defence.
- **Recent change:** the refund and cancellation thresholds in s.60(4)–(5) and s.61 were raised to **£150** from **30.9.2026** by S.I. 2026/427.

**Sources:** https://www.legislation.gov.uk/ukpga/1992/41/section/58 (also /59, /60, /61); https://www.legislation.gov.uk/uksi/1994/3024/regulation/2/made

**Fundraising Regulator:** the new Code of Fundraising Practice "came into effect on 1 November 2025" (https://www.fundraisingregulator.org.uk/code). Section 6.4: "You must make a solicitation statement before: a potential donor gives any money (or if you are a commercial participator, before a donor buys a product or service)". Agreements must state "how much you will receive from the commercial participator and how this will be calculated". There is also a Code section 9 on online fundraising platforms. Source: https://www.fundraisingregulator.org.uk/code/standards-which-apply-working-others/fundraising-partnerships

**Features affected:** coins with any user-chosen charity (the model assumes an agreement with each institution), Plus marketing with giving, Teams UK campaigns, and Creator challenges.

**Questions for counsel (UK):**
1. Is ScrollJar a commercial participator for coins? If so, can a single s.59 agreement with Every.org (as the "institution") cover representations about user-chosen end charities?
2. What s.60(3) statement wording and placement work in-app before the user confirms a deal?
3. Gift Aid cannot be expected on US-charity gifts (not verified). Must we say so?

### 3.2 Scotland

Commercial participators are defined in s.79 of the Charities and Trustee Investment (Scotland) Act 2005. It mirrors the E&W test: "carries on for profit a business other than a fundraising business, but ... engages in a promotional venture in the course of which it is represented that benevolent contributions are to be" given (https://www.legislation.gov.uk/asp/2005/10/section/79). The Fundraising Regulator says requirements are in Part 2 of the 2005 Act and the Charities and Benevolent Fundraising (Scotland) Regulations 2009, and that "Legal requirements in Scotland are sometimes different". It also says Northern Ireland "currently" has no such legislation. The 2009 regulation text was not read.

**Question:** "Do the 2009 Scottish regulations need a separate agreement or statement format from the E&W one?"

---

## 4. Canada, Australia and other markets (later markets: mostly unverified)

- **Canada:** IRS Pub. 597 says "Under certain conditions, contributions to qualified U.S. charitable organizations may also be claimed on your Canadian income tax return if you are a Canadian resident" (https://www.irs.gov/publications/p597). Under the treaty this is generally limited against US-source income; CRA pages were unreachable. Every.org says its receipts are "only tax-deductible in the US". Provincial fundraising statutes (e.g. Alberta's Charitable Fund-raising Act) and Competition Act deceptive-marketing rules were not checked.
  - **Question:** "Must the app tell Canadian users that coins are not receiptable in Canada, and do any provincial fundraising-business licences apply?"
- **Australia:** the ACNC, ATO and NSW legislation sites refused connections. State fundraising laws (NSW Charitable Fundraising Act 1991, Vic Fundraising Act 1998, etc.) and DGR-only deductibility were not verified.
  - **Question:** "Do state fundraising licences apply to a foreign app routing to a US charity? Must we say no deduction is available?"
- **Germany (verified):** §10b EStG allows deduction only for gifts to bodies located "in einem Mitgliedstaat der Europäischen Union oder in einem Staat ... auf den das Abkommen über den Europäischen Wirtschaftsraum ... Anwendung findet", so not a US charity (https://www.gesetze-im-internet.de/estg/__10b.html).
- **France, Brazil, India, Japan:** not verified. Legifrance returned 403, and the Legal Data Hunter daily free limit was reached (resets 2026-10-21 17:40 UTC; https://legaldatahunter.com/pricing). Expect national deductions to be limited to domestic or EU-recognised bodies.
  - India: card payments abroad may raise remittance (LRS) questions for users.
  - Any regrant to Indian charities is restricted by FCRA, though Every.org only grants to US 501(c)(3)s or bodies with an equivalency determination.
- **Every.org's coverage of non-US charities (verified):** it grants abroad only where "The international charity has a US 501(c)(3) entity", has a US fiscal sponsor, or has "a valid equivalency determination (ED) certificate with Every.org". It "only accepts USD" (https://support.every.org/hc/en-us/articles/5527881074579). It supports only "public charities which are tax-exempt under Section 501(c)(3)" (https://support.every.org/hc/en-us/articles/360058165314).
  - Consequence: Italian, UK or other local charities a user types in will mostly be unavailable. The spec already anticipates "Direct partnerships + Pledge/Change ... for EU expansion".

---

## 5. What ScrollJar already does well

- Keeps donations separate from Apple IAP and has ScrollJar earn only from memberships. The "we never keep your money" principle reduces "for gain from the donations" arguments, though it does not remove them.
- Spec §6: Legend 50% framed "strictly as corporate giving ... Never 'your donation,' no tax-receipt implication". This matches the IRS donor-of-record logic.
- A transparency ledger with separate auditable streams (spec §9). That suits the CA §12599.9(c) reporting, NY/AL/SC accountings and Italy's art. 3 payment confirmation.
- The build spec already flags "Confirm the current partner/API terms and the exact flow ... with counsel before launch" (IOS-BUILD-SPEC §6). This research shows the answer is needed now.
- Card fee shown and added on top for Free users (v1.3), which supports an accurate "100%" claim.
- Wish jars move no money, so they are outside this topic.
- Teams spec: the employer's pledge is pre-committed and "100% pass-through", with HR-curated shortlists. The small fixed list makes charity consent achievable for Teams.
- Kids are never charged or paid (Families). Backing a friend is never framed as a bet.

---

## 6. Unverified / ask counsel

1. **Every.org Terms of Service and any for-profit enterprise or partner agreement.** www.every.org/terms returned 403. Read it before choosing option A, B or C, including whether a for-profit app may use Every.org in a commercial product, and on what terms.
2. Exact text of L. 120/2026 in the Gazzetta Ufficiale (n. 154 or 157 of 6 Jul 2026). Whether "prodotti" includes services or subscriptions, and whether an AGCM form exists.
3. South Carolina's 2026 CCV threshold amendment ($10,000, reported effective 18 Jun 2026). Illinois CCV registration position (statute not reached).
4. Whether Every.org is a DAF sponsor for the 2026 non-itemizer deduction exclusion. The reported 2026 corporate 1% floor and individual 0.5% floor under OBBBA were not found on the IRS page read.
5. Charleston Principles (NASCO) on when an online solicitation triggers state registration. FTC Act §5 and FTC endorsement rules for Creators (free Plus is a material connection), which is likely another helper's topic.
6. EU Directive 2024/825 application date and scope; UCPD.
7. UK Gift Aid non-availability; Scottish 2009 regulations text.
8. Canada (CRA, provincial), Australia (ACNC, state Acts, DGR), France (art. 200 CGI), Brazil, Japan and India deductibility and fundraising rules.
9. Families: the spec does not say whether the parent is charged the full pledge or only the unlocked part, or where an unlocked remainder goes. Teams: who holds rolled-over pledge money. Both decide whether ScrollJar holds charitable funds.
10. Whether impact units ("$5 ≈ 10 school meals") need substantiation from, or approval by, the named charity.

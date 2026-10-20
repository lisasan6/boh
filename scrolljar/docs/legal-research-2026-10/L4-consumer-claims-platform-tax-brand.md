# L4 findings: consumer protection, subscriptions, contract terms, advertising and health claims, accessibility, platform rules, tax and brand

Prepared 2026-10-20 by research helper L4 for ScrollJar's founder and the lawyer(s) they hire.

**This is not legal advice.** It lists what the rules say, sourced from pages actually opened on 2026-10-20, and the questions to put to counsel. Nothing here says that any ScrollJar feature is "legal" or "compliant".

Source notes:
- EU texts were fetched as the official Publications Office (EUR-Lex cellar) originals. Where an act was amended later, the amending act is cited too.
- Some official sites blocked scripted access: ftc.gov, leginfo.legislature.ca.gov, normattiva.it, ofcom.org.uk, austlii and esafety. Where that happened, the gap is stated and the item goes in section 3 if it could not be checked at another official source.

Risk key:
- **High** = could block launch or create real liability.
- **Medium** = needed at launch, or likely to come up soon.
- **Low** = for later markets, or easy to handle.

---

## Top risks at a glance

1. **The Free plan's "card fee added on top" (High in the EU and UK; Medium in California).**
   - EU and UK law ban fees for paying with consumer cards.
   - California's hidden-fees law requires advertised prices to include unavoidable fees, and a card fee is unavoidable when cards are the only way to pay.
   - Ask counsel whether the top-up counts as a "surcharge" or "mandatory fee", or whether it can be an optional, separate donation that covers the fee.
2. **The jar-break charge ("one coin at 5× your price" when Screen Time access is revoked, the card is removed or the app is deleted) (High in the EU).**
   - The EU Unfair Contract Terms Directive lists as possibly unfair any term "requiring any consumer who fails to fulfil his obligation to pay a disproportionately high sum in compensation".
   - It may also clash with the 14-day EU withdrawal right, which lets consumers leave "without incurring any costs".
3. **Whether a deal, and the standing authority to charge coins under it, is a consumer "contract" in scope of EU withdrawal rights, the EU withdrawal button (from 19 June 2026), Germany's cancellation button, California's auto-renewal law and US Regulation E (High once in the EU; Medium in the US).** The money goes to charity, but ScrollJar is still the trader that sets the terms and starts the charge.
4. **Implied health claims on the website (Medium).**
   - The "mental health and wellbeing" randomised-trial line next to the product, and "a wellbeing benefit" for Teams, need evidence about ScrollJar itself or very careful framing.
   - Disease or "addiction" language could pull the app toward medical-device rules (FDA, EU MDR).
5. **Comparative and charity claims (Medium).**
   - "Most stakes apps keep your money" and "Apps that keep your stake" need documented substantiation.
   - The UK's charity-linked promotion rules require stating any company cap on ScrollJar's own giving (success-side giving and invite donations).
6. **User-generated content: Board posts, Teams notes, creator challenges, share cards (Medium).**
   - EU DSA hosting duties apply at any company size: notice and action, statements of reasons, terms, contact points, and an EU legal representative if there is no EU establishment.
   - The UK Online Safety Act very likely applies to a user-to-user service with UK users.
   - Apple guideline 1.2 requires filtering, reporting, blocking and a published contact.
   - Children in Families raise the stakes.

---

## 1. Findings by topic and jurisdiction

### 1A. Subscriptions and auto-renewal (Plus via Apple IAP; also the deal's standing card authority)

#### US federal: the FTC "click-to-cancel" rule was vacated; a new rulemaking has started; ROSCA still applies

**The vacatur.**
- The Eighth Circuit vacated the FTC's 2024 amended Negative Option Rule on **8 July 2025** (*Custom Communications, Inc. v. FTC*, No. 24-3137): "we grant the petitions for review and vacate the Rule."
  - Ground: the FTC "failed to follow procedural requirements under § 22 of the Federal Trade Commission Act … 15 U.S.C. § 57b-3(b)(1)".
  - Source: https://ecf.ca8.uscourts.gov/opndir/25/07/243137P.pdf
- On **12 Feb 2026** the FTC published a final rule to "recodify the text of the Negative Option Rule as it existed before the effective date of the Commission's 2024 final rule amending it".
  - Source: https://www.federalregister.gov/api/v1/documents/2026-02866.json (Federal Register API; the HTML page blocks scripts)

**The new rulemaking (pending).**
- Advance notice of proposed rulemaking, published **13 March 2026**: the FTC "seeks public comment on the need for amendments … to help consumers avoid recurring payments for products and services they did not intend to order and to allow them to cancel such payments without unwarranted obstacles".
- Comments closed 13 April 2026. No proposed rule text has been published.
- Source: https://www.federalregister.gov/documents/2026/03/13/2026-04952/rule-concerning-the-use-of-prenotification-negative-option-plans (abstract read through the Federal Register API)

**Still in force: ROSCA, 15 U.S.C. § 8403 (2010).** For online sales "through a negative option feature", the seller must:
- "clearly and conspicuously disclose[] all material terms … before obtaining the consumer's billing information";
- obtain "express informed consent before charging";
- provide "simple mechanisms for a consumer to stop recurring charges".
- Source: https://www.law.cornell.edu/uscode/text/15/8403

**Where it touches ScrollJar.**
- Plus, sold through Apple IAP. Apple runs checkout and cancellation, but ScrollJar's paywall copy makes the offer.
- The deal itself: a standing card authority under which monthly charges continue until the user ends the deal.

**Risk: Medium.**

**Ask counsel.**
- Does ScrollJar, as the "App Provider", carry ROSCA duties for Plus even though Apple runs billing and cancellation?
- Is a deal a "negative option feature"? Charges arise only when the user taps "Open anyway", but the card authority continues until the user acts to end it.
- Is the opt-in "rising price" switch a material term that needs ROSCA-style disclosure and consent?

#### US: California Automatic Renewal Law as amended by AB 2863 (Chapter 515, Statutes of 2024; applies to contracts entered into, amended or extended on or after 1 July 2025)

What the Legislative Counsel's Digest says the law now requires:
- the consumer's "express affirmative consent to the automatic renewal or continuous service offer terms";
- keeping proof of consent "for at least 3 years, or one year after the contract is terminated, whichever period is longer";
- an "annual reminder" disclosing the product, "the frequency and amount of the associated charges, and the means to cancel".
- It applies "to contracts entered into, amended, or extended on or after July 1, 2025".

Source: the official leginfo.legislature.ca.gov page returned 403 to scripts. The digest text was read on the CalMatters Digital Democracy mirror: https://calmatters.digitaldemocracy.org/bills/ca_202320240ab2863 (secondary source).

**Where it touches ScrollJar.**
- Plus (yearly plan at $29.99).
- Possibly the deal as a "continuous service" offer, since card authority continues until cancelled.

**Risk: Medium.**

**Ask counsel.**
- Who sends the annual reminder and keeps the consent record for IAP subscriptions: Apple, or ScrollJar?
- Is a deal with a stored card and monthly settlement a "continuous service offer" under Bus. & Prof. Code §17601?
- How do the new "save offer" rules fit the cancellation screen? That screen states that deals keep running after Plus is cancelled.

#### EU: 14-day withdrawal right (Consumer Rights Directive 2011/83/EU, as amended by 2019/2161 and 2023/2673)

**Scope and withdrawal right.**
- Scope (Art. 3(1) as amended by 2019/2161): the Directive applies "to any contract concluded between a trader and a consumer where the consumer pays or undertakes to pay the price".
  - Source: https://eur-lex.europa.eu/eli/dir/2019/2161/oj
- Withdrawal (Art. 9(1)): "the consumer shall have a period of 14 days to withdraw from a distance … contract, without giving any reason, and without incurring any costs other than those provided for in Article 13(2) and Article 14."
  - Source: https://eur-lex.europa.eu/eli/dir/2011/83/oj
- Services that start straight away (Art. 8(8) as amended): where the consumer wants a service to begin during the withdrawal period "and the contract places the consumer under an obligation to pay", the trader must get "an express request" and an acknowledgement that, "once the contract has been fully performed", the right of withdrawal is lost.

**Withdrawal function (new Art. 11a, inserted by Directive (EU) 2023/2673, applies from 19 June 2026).**
- "For distance contracts concluded by the means of an online interface, the trader shall ensure that the consumer can also withdraw from the contract by using a withdrawal function."
- It must be "labelled with the words 'withdraw from contract here' or an unambiguous corresponding formulation", be "continuously available throughout the withdrawal period" and be "prominently displayed".
- Member States "shall apply those measures from 19 June 2026".
- Source: https://eur-lex.europa.eu/eli/dir/2023/2673/oj
- Germany transposed this as **§ 356a BGB** ("Elektronische Widerrufsfunktion", button text "Vertrag widerrufen"). Source: https://www.gesetze-im-internet.de/bgb/__356a.html

**Who handles Plus.**
- For EU customers, Apple Distribution International is the merchant of record. Apple's own terms offer a 14-day withdrawal: "You can exercise your right of withdrawal by going to Apple Account > Purchase History … 'Withdraw Transaction'."
- Source: Apple Media Services Terms (Ireland), last updated 14 September 2026: https://www.apple.com/legal/internet-services/itunes/ie/terms.html

**Where it touches ScrollJar.**
- Plus: largely handled by Apple as commissionaire.
- Deals and coin charges: not handled by Apple. ScrollJar would be the trader for the deal, and Stripe runs the charges.
- Jar break: a 5× charge for removing the app or the card in the first 14 days could conflict with "without incurring any costs".

**Risk: High at EU launch** (the spec plans the EU and Italy for phase 4; the founder is in Italy).

**Ask counsel.**
- Is a deal a "service contract" where the consumer "pays the price"? The coins go to charity, but ScrollJar supplies the blocking, settlement and refund service under its own terms.
- If so, does every new deal need express consent plus acknowledgement before starting, and a "withdraw from contract here" function in the app from 19 June 2026?
- How does withdrawal interact with coins already charged, the 48-hour refund and the jar-break charge?

#### Germany: cancellation button (§ 312k BGB, in force since 1 July 2022)

- Applies where consumers can conclude "über eine Webseite" an e-commerce contract creating a continuing obligation under which the trader owes a paid service ("entgeltliche Leistung").
- The trader must provide a cancellation button labelled "Verträge hier kündigen" that leads straight to a confirmation page.
- If this is missing, the consumer may cancel "jederzeit und ohne Einhaltung einer Kündigungsfrist" (at any time, without notice).
- Source: https://www.gesetze-im-internet.de/bgb/__312k.html

**Where it touches ScrollJar.**
- Plus if sold on the web; IAP is handled by Apple.
- A deal's "24 hours' notice to end": if § 312k applies and the button is missing, the 24-hour notice may not hold.
- Teams is B2B, so § 312k does not apply.

**Risk: Low now, Medium at EU launch.**

**Ask counsel.**
- Does § 312k reach in-app contracts (the text says "Webseite")?
- Is a deal a contract under which ScrollJar owes an "entgeltliche Leistung"?

#### UK: DMCC Act 2024 subscription contracts regime (enacted, not yet in force)

- Government response of 2 April 2026: "We will legislate when parliamentary time allows and we anticipate that the regime will commence in **spring 2027**."
- What it adds: a 14-day "renewal cooling-off period after a trial or 12 month+ contract auto-renews", the ability to "exit online if they signed up online", and reminder notices.
- Source: https://www.gov.uk/government/consultations/consultation-on-the-implementation-of-the-new-subscription-contracts-regime/outcome/government-response-to-consultation-on-the-implementation-of-the-new-subscription-contracts-regime-web-accessible-version
- One trade publication reports the start date moved to January 2027. This could not be confirmed on gov.uk (see section 3).

**Where it touches ScrollJar.** The Plus yearly plan (12 months, auto-renewing) would get a renewal cooling-off period.

**Risk: Low** (Apple handles the IAP mechanics; the rules start in 2027).

**Ask counsel.** For IAP subscriptions, who is the "trader" responsible under the new regime: Apple or ScrollJar?

### 1B. The coin charges as a contract (deal terms, pricing, payments)

#### EU Unfair Contract Terms Directive 93/13/EEC

- Art. 3(1): a non-negotiated term is unfair "if, contrary to the requirement of good faith, it causes a significant imbalance in the parties' rights and obligations … to the detriment of the consumer."
- Annex 1(e) (the indicative "grey list"): terms "requiring any consumer who fails to fulfil his obligation to pay a disproportionately high sum in compensation".
- Annex 1(j): terms "enabling the seller or supplier to alter the terms of the contract unilaterally without a valid reason which is specified in the contract".
- Art. 5: terms "must always be drafted in plain, intelligible language … the interpretation most favourable to the consumer shall prevail".
- Source: https://eur-lex.europa.eu/eli/dir/1993/13/oj

**Where it touches ScrollJar.**
- **Jar break** (5× the price): the closest fit to Annex 1(e).
- **Rising price**: automatic increases. The user opts in and can switch it off with 24 hours' notice, which helps.
- **24-hour delay on loosening a deal**, and **memberships do not end deals**.
- The **monthly cap**, **48-hour refund** and grace hour all help the balance.

**Risk: High (jar break) and Medium (other terms) at EU launch.**

**Ask counsel.**
- Is "one coin at 5× your price" proportionate when its only purpose is to stop people escaping a deal they chose?
- Would a flat cap, the deal's ordinary price, or no charge for app deletion be safer?
- Does charging after app deletion or Screen Time revocation work at all in the EU, given withdrawal and termination rights?
- How should the Terms word "rising price" so it is not a unilateral change? It is a consumer-chosen rule with a 2× ceiling and a Monday reset.

#### EU Unfair Commercial Practices Directive 2005/29/EC, including dark patterns; Digital Fairness Act still only planned

- Art. 7(1): a practice is misleading if it "omits material information that the average consumer needs … to take an informed transactional decision".
- Art. 6(1)(d): misleading as to "the price or the manner in which the price is calculated".
- Source: https://eur-lex.europa.eu/eli/dir/2005/29/oj
- The **Digital Fairness Act** (dark patterns, addictive design, subscription cancellation) is still at the planning stage. The Commission's Have Your Say record for initiative 14622 shows the proposal stage as "ADOPTION_WORKFLOW", planned **Q4 2026**, feedback "UPCOMING".
  - Source: https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives/14622-Digital-Fairness-Act_en (read through the Commission's public API)

**Where it touches ScrollJar.**
- The breath pause's "Never mind, continue" link moves to a new spot each time. That is friction placed in front of a charge the user chose to make, which is the reverse of a typical dark pattern. Still, regulators look at moving buttons, and it raises accessibility problems (see 1D).
- On the coin sheet, the price shown must be the total.

**Risk: Medium.**

**Ask counsel.**
- Is the moving "continue" button defensible under the UCPD (and the coming Digital Fairness Act), given that it adds friction before a payment the user chose?
- Should there be an accessibility setting that keeps the button in a fixed place?

#### Card fee "added on top" on the Free plan: EU and UK surcharge bans; California honest pricing

**EU, PSD2 (Directive (EU) 2015/2366) Art. 62(4).**
- "Member States shall ensure that the payee shall not request charges for the use of payment instruments for which interchange fees are regulated under Chapter II of Regulation (EU) 2015/751." This covers consumer debit and credit cards.
- Source: https://eur-lex.europa.eu/eli/dir/2015/2366/oj
- See also CRD Art. 19: "Member States shall prohibit traders from charging consumers, in respect of the use of a given means of payment, fees that exceed the cost borne by the trader".

**UK, Consumer Rights (Payment Surcharges) Regulations 2012, reg. 6A (from 13 Jan 2018).**
- "A payee must not charge a payer any fee in respect of payment by means of" a consumer card-based payment instrument.
- Source: https://www.legislation.gov.uk/uksi/2012/3110/regulation/6A

**California, Civil Code §1770(a)(29) (SB 478, from 1 July 2024).**
- Bans "[a]dvertising, displaying, or offering a price for a good or service that does not include all mandatory fees or charges".
- The Attorney General's FAQ: "if a business only accepts credit cards as a form of payment, then the credit card fee is mandatory and would have to be included in the advertised price."
- Source: https://oag.ca.gov/hiddenfees

**Where it touches ScrollJar.** The website FAQ says: "on the free plan it is shown and added on top, so the full price you set still arrives." The same applies to Backing a friend on Free ("the card fee is added on top").

**Risk: High (EU and UK); Medium (US and California).**

**Ask counsel.**
- Is the top-up a "charge for the use of" a card (banned in the EU and UK), and who is the "payee": ScrollJar or Every.org?
- Would an **optional, separately ticked "cover the fee for my charity" donation** be treated differently from a mandatory fee?
- In California, is a coin a "price for a good or service", or a donation outside §1770? If it is a price, must the fee be shown inside the $5 figure?
- Do other US states or card-network rules limit surcharges? (Not verified here.)

#### Variable monthly charges: US Regulation E and the EU PSD2 refund right

**US, Regulation E, 12 C.F.R. §1005.10.**
- Preauthorized transfers "may be authorized only by a writing signed or similarly authenticated by the consumer", and the person obtaining it "shall provide a copy".
- When a transfer "will vary in amount", the payee or bank "shall send the consumer written notice of the amount and date of the transfer at least 10 days before the scheduled date".
- Source: eCFR API, title 12 part 1005, current as of 16 Oct 2026: https://www.ecfr.gov/current/title-12/chapter-X/part-1005/section-1005.10

**EU, PSD2 Art. 76 and 77.**
- A payer is entitled to a refund of a payee-initiated payment where "the authorisation did not specify the exact amount" and the amount "exceeded the amount the payer could reasonably have expected".
- The refund can be requested "for a period of 8 weeks".

**Where it touches ScrollJar.**
- Monthly settlement on the 1st, with variable amounts.
- The pre-settlement email (timing is not specified in the build spec).
- The $50 default cap, which keeps amounts within what users can expect.

**Risk: Medium.**

**Ask counsel.**
- Does Reg E §1005.10(d) apply to recurring debit-card charges made through Stripe off-session payments? If so, should the pre-settlement email go out at least 10 days before the 1st, or can users opt for notice only when the total is above a set range?
- What exactly must the stored mandate text say (Reg E "copy" and card-network stored-credential rules)?

#### Things that help on the contract side (positive)

The monthly cap with jar-full freezing, the 48-hour no-questions refund, the grace hour before any jar-break charge, plain-words cards at creation, "Terms restate the rule exactly as in-app", and the "pre-settlement email" all speak directly to the UCTD "plain, intelligible" test and the PSD2 "reasonably expected" test.

### 1C. Advertising and health claims

#### US: FTC Act substantiation; FTC endorsement guides; FTC fake-reviews rule

- **Endorsement Guides, 16 C.F.R. Part 255 (revised 26 July 2023, 88 FR 48102).**
  - "Advertisers are subject to liability for misleading or unsubstantiated statements made through endorsements or for failing to disclose unexpected material connections between themselves and their endorsers."
  - Advertisers should "[p]rovide guidance to their endorsers on the need … to disclose unexpected material connections".
  - Source: https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255
- **Trade Regulation Rule on Consumer Reviews and Testimonials, 16 C.F.R. Part 465 (89 FR 68077, 22 Aug 2024).**
  - It is unlawful "to write, create, or sell a consumer review, consumer testimonial, or celebrity testimonial that materially misrepresents … [t]hat the reviewer or testimonialist exists".
  - It also covers insider reviews (§465.5), review suppression (§465.7) and fake social-media indicators (§465.8).
  - Source: https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-465
- **FTC Health Products Compliance Guidance (Dec 2022)**: ftc.gov returned 404/403 to every request, so its text was not verified here (see section 3). The general FTC standard that health claims need "competent and reliable scientific evidence" is reported in secondary sources only.

**Where it touches ScrollJar.**
- Creators in public challenges are endorsers. They get Plus free while a challenge runs, which is a material connection that must be disclosed.
- Any future testimonials. CLAUDE.md already bans fake ones.

**Risk: Medium (creators).**

**Ask counsel.**
- Does free Plus for creators running a challenge count as a material connection they must disclose in every post?
- What disclosure wording and monitoring should ScrollJar require of creators?

#### Health and wellbeing claims, and the medical-device line

**US, FDA "General Wellness: Policy for Low Risk Devices" (final guidance, January 2026; page current as of 06/01/2026).**
- FD&C Act §520(o)(1)(B) excludes software "for maintaining or encouraging a healthy lifestyle and is unrelated to the diagnosis, cure, mitigation, prevention, or treatment of a disease or condition".
- Examples of acceptable wellness claims: "Claims to promote relaxation or manage stress"; "Claims to improve mental acuity, … concentration".
- Examples outside the policy: "A claim that a product helps treat an anxiety disorder".
- Sources: https://www.fda.gov/regulatory-information/search-fda-guidance-documents/general-wellness-policy-low-risk-devices (PDF: https://www.fda.gov/media/90652/download)

**EU, Medical Device Regulation (EU) 2017/745.**
- Art. 2(1): a "medical device" is software "intended by the manufacturer" for "diagnosis, prevention, monitoring, prediction, prognosis, treatment or alleviation of disease".
- Recital 19: "software intended for life-style and well-being purposes is not a medical device".
- Source: https://eur-lex.europa.eu/eli/reg/2017/745/oj

**UK, CAP Code.**
- Rule 12.1: "Objective claims must be backed by evidence, if relevant consisting of trials conducted on people"; medical claims only "for a medical device with the applicable conformity marking".
- Rule 3.7: marketers "must hold documentary evidence to prove claims".
- Sources: https://www.asa.org.uk/type/non_broadcast/code_section/12.html and https://www.asa.org.uk/type/non_broadcast/code_section/03.html

**EU, UCPD Annex I item 17 (always unfair):** "Falsely claiming that a product is able to cure illnesses, dysfunction or malformations."

**Where it touches ScrollJar** (current landing copy):
- "Two weeks of blocked mobile internet measurably improved attention, mental health and wellbeing in a randomised trial". This describes a study of a *different* intervention (blocking mobile internet). Placed on a product page, it can read as an implied claim that ScrollJar improves mental health.
- "In a peer-reviewed study, a short pause … led people to back out of 36% of their attempts". This was a study of a different app's pause.
- Teams: "A wellbeing benefit", "An anonymous wellbeing question".
- CLAUDE.md already bans "addict" and pseudo-science phrases, which keeps the copy away from disease claims ("smartphone addiction" or "gaming disorder" would be disease language).

**Risk: Medium.**

**Ask counsel.**
- Can ScrollJar cite third-party studies on its pages without making an implied efficacy claim for ScrollJar? Would "the idea behind the pause" framing plus a link be enough?
- Is "wellbeing benefit" acceptable under FDA general wellness, EU MDR recital 19 and CAP 12.1 without ScrollJar-specific evidence?
- Should copy never mention anxiety, depression, ADHD, sleep disorders or "addiction"?
- If the planned efficacy study goes ahead, what claims could it support, and would mood check-ins change the device analysis?

#### Charity claims ("100% to charity", "We keep none of it", success-side giving, invite donations)

**UK, CAP Code rules 8.33 and 8.34 (charity-linked promotions).** Promotions must:
- "name each charity or cause that will benefit";
- "specify exactly what will be gained by the named charity or cause and state the basis on which the contribution will be calculated";
- "state if the promoter has imposed a limit on its contributions";
- "not exaggerate the benefit";
- "if asked, make available to consumers a current or final total";
- "not directly encourage children to buy, or exhort children to persuade an adult to buy".
- Source: https://www.asa.org.uk/type/non_broadcast/code_section/08.html

**EU, UCPD Art. 6(1)(c)**: misleading as to "the motives for the commercial practice".

**Italy, Codice del Consumo arts. 20–23** (unfair, misleading and always-misleading practices, enforced by AGCM). Located through the Legal Data Hunter index of normattiva: https://www.normattiva.it/eli/id/2007/09/06//007G0161/CONSOLIDATED. Normattiva itself refused scripted connections, so the article text was not re-read at source. Italy Law 120/2026 on charity-linked marketing is already noted in `docs/research-findings.md`.

**Where it touches ScrollJar.**
- "100% of every coin goes to charity. We keep none of it" (site footer). It must be literally true on every path:
  - card fees (covered on Plus, added on top on Free);
  - any Every.org fees, and any regranting if a chosen charity cannot be paid;
  - refunds;
  - jar-break charges;
  - Backing a friend, where part of the money buys a gift card rather than going to charity.
- **Success-side giving** has a "monthly company budget cap", and **invite donations** have a "global monthly budget cap". Under CAP 8.33.4 those caps must be stated wherever the giving is promoted.
- Families (children choose a cause; parents pledge): CAP 8.33.8.

**Risk: Medium.**

**Ask counsel.**
- Is "100%" accurate if Every.org or card processors take any amount on any path, or if Every.org regrants when a charity cannot receive funds?
- Must the caps on success-side and invite giving appear next to each promise?
- Does the Families page's appeal to kids choosing a cause raise CAP 8.33.8 issues?

#### Comparative advertising ("A blocker says no. Most stakes apps keep your money."; the "Apps that keep your stake / Your $35 goes to the app" panel)

**EU, Directive 2006/114/EC.**
- "'comparative advertising' means any advertising which explicitly or by implication identifies a competitor".
- It is permitted only if, among other conditions, it "objectively compares one or more material, relevant, verifiable and representative features" and "does not discredit or denigrate" competitors.
- Source: https://eur-lex.europa.eu/eli/dir/2006/114/oj

**UK, CAP 3.33–3.38**: comparisons must be of products "meeting the same needs", must not "create confusion", and price comparisons must make "the basis of the comparison clear".

**Where it touches ScrollJar.** "Most stakes apps" is a quantitative claim that needs a dated list of the stakes apps counted, with evidence of what each does with forfeited money. The panel implies a typical rival keeps 100% ("Your $35 goes to the app"). The founder's note ("every app that promised to help … kept the money") is personal experience, but it still names a category of rivals.

**Risk: Medium** (US competitor claims under the Lanham Act are also possible; not researched here).

**Ask counsel.**
- What file of evidence is needed for "most stakes apps keep your money"?
- Is the $35 comparison panel "representative" if some rivals send part of forfeits to charity or to friends?
- Should the page cite the date it was checked, as CLAUDE.md already requires for competitor prices?

#### Green claims (minor)

From **27 September 2026**, Directive (EU) 2024/825 bans "a generic environmental claim for which the trader is not able to demonstrate recognised excellent environmental performance".
- Source: https://eur-lex.europa.eu/eli/dir/2024/825/oj

**Where it touches ScrollJar.** The spec mentions success-side giving units like "1 tree". The prototype already states amounts in money, "not in meals or trees". **Risk: Low.**

#### UK fake reviews (DMCC Act 2024 Sch. 20, in force 6 April 2025 by S.I. 2025/272)

- Banned: "a fake consumer review", "a consumer review that conceals the fact it has been incentivised", and publishing reviews "without taking such reasonable and proportionate steps" to prevent fakes.
- Source: https://www.legislation.gov.uk/ukpga/2024/13/schedule/20
- **Risk: Low** (CLAUDE.md already bans fake testimonials and ratings).

### 1D. Accessibility

#### EU: European Accessibility Act, Directive (EU) 2019/882 (applies from 28 June 2025)

- Scope includes "e-commerce services", defined as "services provided at a distance, through websites and mobile device-based services by electronic means and at the individual request of a consumer with a view to concluding a consumer contract".
- Microenterprise exemption (Art. 4(5)): "Microenterprises providing services shall be exempt from complying with the accessibility requirements". A microenterprise is one "which employs fewer than 10 persons and which has an annual turnover not exceeding EUR 2 million or an annual balance sheet total not exceeding EUR 2 million".
- Measures apply "from 28 June 2025".
- Source: https://eur-lex.europa.eu/eli/dir/2019/882/oj

**Where it touches ScrollJar.**
- The app concludes consumer contracts: Plus, deals and Backing.
- Teams pages are B2B and outside the e-commerce definition.
- At launch ScrollJar is very likely a microenterprise, but the exemption ends once it grows past either threshold.

**Risk: Low at launch; Medium later.**

**Ask counsel.**
- Is the ScrollJar app an "e-commerce service" (it concludes contracts in the app), and does the Italian transposition add anything for an Italian entity?
- When ScrollJar outgrows the microenterprise exemption, what must its accessibility statement contain?

#### US: ADA

- **Title II** (state and local governments only). 28 C.F.R. §35.200 requires "[a] public entity" to make web content and mobile apps meet WCAG 2.1 AA. The DOJ extended the compliance dates on **20 April 2026**: "Beginning April 26, 2027" for larger entities and "April 26, 2028" for smaller ones.
  - Sources: https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200 and https://www.federalregister.gov/documents/2026/04/20/2026-07663/
  - This does not apply to ScrollJar as a private company, except where a public body buys Teams.
- **Title III** (private businesses): there is no web regulation, so courts decide case by case.
  - Example: *Robles v. Domino's Pizza*, 913 F.3d 898 (9th Cir. 2019) relied on the "nexus between Domino's website and app and physical restaurants", which it called "critical to our analysis". Source: https://www.courtlistener.com/opinion/4581582/guillermo-robles-v-dominos-pizza-llc/
  - ScrollJar has no physical premises. How other circuits and state laws treat app-only businesses was not verified (section 3).

**Risk: Medium** (US accessibility demand letters are common, even where the law is unsettled).

**Ask counsel.**
- In the US circuits and states that matter, can an app-only business be sued under ADA Title III or state law (for example California's Unruh Act)?
- Should ScrollJar adopt WCAG 2.1/2.2 AA as its contractual standard for Teams customers?

#### Apple

**Accessibility Nutrition Labels.**
- Apple's App Store Connect help says they are "voluntary to start", but "over time, you'll be required to share accessibility support details to submit new apps and app updates".
- Source: https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels

**Where it touches ScrollJar.**
- The **moving "Never mind, continue" button** is hard to use with VoiceOver, Switch Control and motor impairments, and does not keep a consistent layout. There must be an accessible fixed-position path.
- The shield, the jar animation ("Reduce Motion honoured", which the spec already plans) and colour (the CVD-validated palette, also planned).

**Risk: Medium (UX and legal).**

### 1E. Platform and online-services rules (Board posts, Teams notes, creator challenges, share cards, web kudos, standby notes)

#### EU: Digital Services Act, Regulation (EU) 2022/2065 (applies from 17 Feb 2024)

**Is ScrollJar a hosting service or an online platform?**
- A "hosting" service is "the storage of information provided by, and at the request of, a recipient of the service". Board posts, notes and challenge texts are stored, so ScrollJar is very likely at least a hosting service.
- An "online platform" "stores and disseminates information to the public". Dissemination means making information available "to a potentially unlimited number of third parties".
- Recital 14: information is public "only where recipients … are automatically registered or admitted without a human decision or selection", while "public groups or open channels" can be covered.

**Obligations for all intermediary or hosting services, at any size:**
- Art. 11 and 12: points of contact for authorities and users.
- **Art. 13: a legal representative in the EU** for providers "which do not have an establishment in the Union but which offer services in the Union". This applies if ScrollJar is a US entity serving the EU.
- Art. 14: the terms must describe "any policies, procedures, measures and tools used for the purpose of content moderation … in clear, plain, intelligible, user-friendly and unambiguous language". Where a service is used by minors, the terms must be explained "in a way that minors can understand".
- Art. 16: "Providers of hosting services shall put mechanisms in place to allow any individual or entity to notify them of … illegal content".
- Art. 17: a statement of reasons to the user for any restriction imposed.

**Small-company exemptions:**
- Art. 15(2): transparency reports are not required from "micro or small enterprises".
- Art. 19(1): Section 3 (online-platform duties, Art. 20–28, including the Art. 25 dark-patterns ban and Art. 28 protection of minors) "shall not apply to providers of online platforms that qualify as micro or small enterprises", except Art. 24(3).

Source: https://eur-lex.europa.eu/eli/reg/2022/2065/oj

**Where it touches ScrollJar.**
- Board and group jars are invite-only, which points to "not public".
- Creator **public challenges**, web share cards with a link that opens without the app, and web kudos may be public.
- Teams notes are squad-only and anonymous.

**Risk: Medium.**

**Ask counsel.**
- Is any ScrollJar surface "dissemination to the public" (creator challenge pages, web share cards)?
- Which DSA duties apply on day one?
- If ScrollJar is a Delaware entity, who will be its Art. 13 legal representative?
- Does the anonymous Teams note design (the "on-phone privacy check") meet Art. 16 and 17 when a note is reported?

#### UK: Online Safety Act 2023

**Scope.**
- A "user-to-user service" is "an internet service by means of which content that is generated directly on the service by a user … may be encountered by another user".
  - Source: https://www.legislation.gov.uk/ukpga/2023/50/section/3
- It is regulated if it "has links with the United Kingdom": "a significant number of United Kingdom users" or the UK as "one of the target markets".
  - Source: https://www.legislation.gov.uk/ukpga/2023/50/section/4

**Exemptions that do not obviously fit:**
- Schedule 1 para. 4 ("limited functionality") covers only "posting comments or reviews relating to provider content" and reactions to them. ScrollJar's notes and Board posts are users' own content.
- The "internal business services" exemption (para. 7) needs the business itself to be "the provider". ScrollJar, not the employer, provides Teams.
- Source: https://www.legislation.gov.uk/ukpga/2023/50/schedule/1

**Dates (gov.uk explainer, updated 24 April 2025):**
- "the illegal content duties are now in effect, and as of 17 March Ofcom can now enforce".
- A children's access assessment was due by 16 April 2025.
- A children's risk assessment for services likely to be accessed by children was due by "24 July 2025".
- Duties are "proportionate to … the size and capacity of each provider".
- Source: https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer

**Where it touches ScrollJar.** Board, notes, standby notes, kudos and challenge posts. Families means children may be users.

**Risk: Medium** (High if children can post).

**Ask counsel.**
- With UK users, is ScrollJar a regulated user-to-user service from launch?
- What must the illegal-content risk assessment and the children's access assessment contain for a small app?
- If kids in Families can see or post anything, do the children's safety duties apply?

#### Australia: Online Safety Act 2021 (compilation of 12 Sept 2026)

**Section 63C** (social media minimum age):
- An "age-restricted social media platform" is a service where "the sole purpose, or a significant purpose, of the service is to enable online social interaction between 2 or more end-users", end-users can "link to, or interact with" others, and can "post material".
- Note 1: "Online social interaction does not include (for example) online business interaction."
- Section 63D: providers "must take reasonable steps to prevent age-restricted users having accounts". Civil penalty: 60,000 penalty units.
- Source: https://www.legislation.gov.au/C2021A00076/latest/text (compilation PDF read through the legislation.gov.au API)

**Where it touches ScrollJar.** Families (under-16s), Board and group jars.

**Risk: Low** (Australia is a later market). It becomes High if under-16s get social features there.

**Ask counsel.**
- Is the Board a "significant purpose" of ScrollJar, or ancillary to a self-control tool?
- Do the legislative rules' exclusions cover it?
- Should kids' accounts have no Board or posting at all?

#### Apple App Review Guideline 1.2 (user-generated content)

- Apps with user-generated content "must include: A method for filtering objectionable material … A mechanism to report offensive content and timely responses to concerns … The ability to block abusive users … Published contact information".
- Source: https://developer.apple.com/app-store/review/guidelines/

**Where it touches ScrollJar.** Board, notes, standby notes, challenge posts. Blocking a user in a group jar needs designing.

**Risk: Medium (App Review).**

### 1F. Tax

**Plus through Apple IAP.**
- Apple acts as the developer's agent or commissionaire. Apple's Media Services Terms: "Apple acts as an agent for App Providers … and is not a party to the sales contract … However, if you are a customer of Apple Distribution International Ltd. or Apple Services Pte. Ltd., then the merchant of record is that entity."
  - Source: https://www.apple.com/legal/internet-services/itunes/us/terms.html
- Apple Developer Program License Agreement, Schedule 2, Exhibit B: "If taxes apply, Apple shall collect and remit to the competent tax authorities the taxes … for sales of the Licensed Applications to End-Users" in a listed set of regions. The list includes the **United States, United Kingdom, Italy, Germany, France, Spain, Australia, Canada**, among others. Some regions are starred where local developers must remit themselves; Italy and the US are not starred.
- The developer is responsible for "selecting and maintaining accurate inputs for tax categorization".
- Where a tax authority imposes "reverse charge accounting" on Apple's commission, the developer "shall take full responsibility for such compliance".
- Source: https://developer.apple.com/support/terms/apple-developer-program-license-agreement/

**Teams (B2B) and any web sales.** EU VAT One Stop Shop: an EU-established business uses the "Union scheme" for "cross-border supplies of services to non-taxable persons" (B2C). A non-EU business uses the "non-Union scheme". B2B supplies to EU businesses generally follow reverse-charge rules (Art. 196 VAT Directive as amended; text not re-read in consolidated form).
- Source: https://vat-one-stop-shop.ec.europa.eu/one-stop-shop_en

**Coins and donations.** Whether coin amounts, the card fee on top, or Backing money count as ScrollJar's turnover (VAT, income) or as pass-through donations depends on who the Stripe merchant of record is and on the Every.org contract.

**Risk: Medium** (entity choice drives everything).

**Ask counsel.**
- With an Italian entity, is Apple's commission reverse-charged in Italy, and what e-invoicing (SdI) duties apply to Teams invoices?
- With a Delaware entity, which US states tax SaaS sold to Teams customers?
- Is ScrollJar or Every.org the payee and merchant of record for coins? Are coins or card fees ever ScrollJar's turnover?
- Are success-side and invite donations deductible for the chosen entity?

### 1G. Brand

**Trademark clearance.**
- USPTO offers the "Trademark Search system" and recommends a "Comprehensive clearance search for similar trademarks", checking "Likelihood of confusion" and "coordinated classes".
  - Source: https://www.uspto.gov/trademarks/search
- The usual process:
  1. Knock-out search on USPTO, EUIPO/TMview, UK IPO and WIPO Global Brand Database.
  2. Lawyer's full clearance, including common-law, app-store and domain use.
  3. File in the US (or Italy or the EU) for the likely classes (software, SaaS, charitable fundraising services).
  4. Extend through the Madrid Protocol.
- Risk: "jar" and "scroll" are common words, so similar app names may exist. No search was run here.

**Third-party marks (Instagram, TikTok, Apple, Screen Time).**
- US nominative fair use (*New Kids on the Block v. News America Publishing*, 971 F.2d 302 (9th Cir. 1992)). The product must be "one not readily identifiable without use of the trademark"; use "only so much of the mark … as is reasonably necessary"; and "do nothing that would … suggest sponsorship or endorsement".
  - Source: https://www.courtlistener.com/opinion/587692/the-new-kids-on-the-block-a-massachusetts-general-partnership-consisting/
- EU Trade Mark Regulation (EU) 2017/1001 Art. 14(1)(c) and (2): referential use "for the purpose of identifying or referring to goods or services as those of the proprietor", only "in accordance with honest practices".
  - Source: https://eur-lex.europa.eu/eli/reg/2017/1001/oj
- Apple's third-party guidelines allow Apple word marks "in a referential phrase such as 'runs on,' 'for use with,' 'for,' or 'compatible with'". The Apple logo is not allowed.
  - Source: https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html
- App Review 5.2.1: "Don't use protected third-party material such as trademarks … without permission … in your app bundle or developer name". This matters for app name, subtitle and keywords such as "Instagram blocker".

**Where it touches ScrollJar.** Landing copy: "Built on Apple Screen Time", "Apple's own Screen Time engine". Future ads naming Instagram or TikTok. CLAUDE.md's "we limit autopilot, not content" stance helps avoid disparagement.

**Risk: Medium (name clearance); Low (referential use).**

**Ask counsel.**
- Run a full clearance for "ScrollJar" in the US, EU, UK and Italy before spending on the brand.
- Is "Built on Apple Screen Time" an acceptable referential phrase, or should it read "Works with Screen Time on iPhone"?

### 1H. Website legal pages

**EU e-Commerce Directive 2000/31/EC, Art. 5(1).** The provider must make "easily, directly and permanently accessible":
- its name and geographic address;
- an email contact;
- its trade-register number;
- "where the service provider undertakes an activity that is subject to VAT, the identification number".
- Source: https://eur-lex.europa.eu/eli/dir/2000/31/oj
- An Italian entity would put its partita IVA there (see section 3 for the Italian provision).

**Germany, Digitale-Dienste-Gesetz § 5** (enacted 6 May 2024, in force 14 May 2024, replacing TMG § 5): "leicht erkennbar und unmittelbar erreichbar … ständig verfügbar" name, address, legal form, representative, email, register number and VAT ID.
- Source: https://www.gesetze-im-internet.de/ddg/__5.html
- Under the country-of-origin principle (DDG §3, ECD Art. 3), an Italian-established provider follows Italian law. Ask counsel whether a German-style "Impressum" page is still advisable.

**EU ODR link: obligation gone.**
- Regulation (EU) 2024/3228: "Regulation (EU) No 524/2013 is repealed with effect from 20 July 2025" and "The European Online Dispute Resolution Platform … shall be discontinued."
- Source: https://eur-lex.europa.eu/eli/reg/2024/3228/oj
- The old duty to link to the ODR platform ended with it. Whether ADR-information duties remain was not verified (section 3).

**Current state of the site.**
- `landing/privacy.html` still says "ScrollJar is run by [full legal name], [city, country]". It must be completed before EU or UK visitors are targeted.
- There is no Terms page or legal-notice page yet.
- The app will need, at minimum:
  - Terms of Service, including the deal contract, jar break, rising price, refunds, cancellation and "memberships don't end deals", "exactly as in-app";
  - an EULA (Apple standard or custom);
  - an app privacy policy;
  - a content and community policy with notice and action (DSA, OSA, Apple 1.2);
  - a charity and transparency page (CAP 8.33);
  - for the EU: a legal notice with VAT number and the DSA contact points;
  - an accessibility statement when no longer exempt.

**Risk: Medium.**

---

## 2. What ScrollJar already does well on this topic (from the docs)

- **Cancellation never traps people in Plus**, and the copy about it is honest: "memberships don't end deals" is stated on the cancellation screen and in Terms, and ending a deal is free with 24 hours' notice. This fits the ROSCA, California ARL and DMCC aims, if counsel accepts the 24-hour notice.
- **No dark patterns at the paywall**: "Not now" is the default, there are no fake countdowns or pre-ticked upsells, and annual is shown honestly next to monthly (`scrolljar-spec.md` §6; `IOS-BUILD-SPEC.md` §6).
- **Strong consumer safeguards around charges**:
  - a $50 default monthly cap, with any raise made deliberately;
  - a 48-hour no-questions refund;
  - a grace hour before any jar-break charge;
  - a plain-words card at deal creation, and "Terms restate the rule exactly as in-app";
  - a pre-settlement email.
- **Rising price is opt-in, capped at 2×, visible, and resets weekly**, with a guard that stops it colliding with the cap. "Off" waits 24 hours; counsel should confirm that delay is acceptable.
- **Honesty rules**: no fake testimonials, user counts, star ratings or press logos. No competitor prices stated as fact. Every science claim must trace to the bibliography. Banned pseudo-science phrases. Court and regulator findings described as "on appeal" or "preliminary". This matches the FTC Part 465, DMCC Sch. 20 and CAP 3.7 themes.
- **Voice Law bans "addict"** and similar words, which keeps copy away from disease claims (FDA, MDR).
- **Giving claims are already money-denominated**: the prototype avoids "meals or trees" until a partner's unit cost can be cited.
- **Privacy by design limits platform risk**: Board is finite, there is no algorithm, no strangers, no leaderboards, and amounts can be hidden. Teams notes are anonymous, squad-only and deleted at campaign end. This supports the "not public" DSA argument and lowers OSA risk.
- **Backing a friend is never for under-18s**, and kids are never charged or paid. This helps the consumer, children's-safety and prize-promotion analyses.
- **Accessibility is already on the build list**: Reduce Motion honoured, CVD-validated colours, and an "accessibility" pass in Phase 4.
- **The website collects only an email**, with no cookies or analytics, and gives its retention period and EU/UK complaint rights (`landing/privacy.html`).

---

## 3. Unverified / ask counsel

1. **FTC Health Products Compliance Guidance (Dec 2022)** and other ftc.gov pages could not be opened (403/404 to scripts). Counsel should confirm its current status and what substantiation standard applies to wellbeing claims for an app.
2. **California ARL statutory text** (Bus. & Prof. Code §§17600–17606 as amended by AB 2863) was read only through the Legislative Counsel's Digest on a mirror. Counsel should check the exact wording on "continuous service", "save" offers and online cancellation.
3. **The UK subscription regime start date**: gov.uk says spring 2027. A trade report of "January 2027" was not confirmed on gov.uk.
4. **US card-surcharge limits** (state laws and Visa or Mastercard rules) were not researched.
5. **Reg E and debit cards**: whether Stripe off-session recurring debit-card charges are "preauthorized electronic fund transfers" under §1005.10.
6. **ADA Title III for app-only businesses** outside the Ninth Circuit, and state laws such as California's Unruh Act, were not verified.
7. **Australia**: the start date of the social media minimum-age duty (s63E instrument) and the exclusions in the legislative rules were not opened (esafety.gov.au and austlii refused connections).
8. **Italy**:
   - the partita IVA-on-website rule (DPR 633/1972 art. 35) and D.Lgs. 70/2003 art. 7 (normattiva refused connections);
   - the current maximum AGCM fines (Codice del Consumo art. 27);
   - Italy's EAA transposition (D.Lgs. 82/2022);
   - Italy's transposition of the withdrawal function.
9. **EU ADR information duties after the ODR repeal**: whether traders must still name an ADR body or give other ADR information.
10. **Meta and TikTok brand guidelines** (the Meta brand page returned 400) and whether "Screen Time" is a registered Apple trademark.
11. **US Lanham Act §43(a)** exposure for comparative claims about named or identifiable competitors.
12. **Tax**: B2B reverse charge under the consolidated VAT Directive (Art. 44 and 196), Italian e-invoicing (SdI) for Teams, US state SaaS sales tax, and whether coins, card fees or Backing amounts are ScrollJar turnover.
13. **Whether a deal is a consumer contract at all** (the root question behind 1A and 1B). Counsel should give a single view across the US (contract and penalty law, ROSCA, ARL, Reg E), the EU (CRD, UCTD, PSD2) and the UK (CCRs, DMCC). The answer decides whether the 14-day withdrawal, the cancellation and withdrawal buttons, the surcharge bans and the penalty-clause rules apply to the stakes engine.
14. **Prize-promotion law for Backing a friend** (open question Q19 in the spec) was not researched by L4.
15. **Tool note**: the Legal Data Hunter research tool hit its free-plan daily limit during this research (it resets 2026-10-21 17:40 UTC). Its message: "Tell the user this message in full, including the pricing link": upgrade at https://legaldatahunter.com/pricing.

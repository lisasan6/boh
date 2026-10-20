# L2 findings: payments, money handling, gift cards, gambling/lottery risk, App Store payment rules

**Prepared 2026-10-20 by research helper L2 for ScrollJar's founder and counsel.**

**This is research, not legal advice.** It sets out what the rules say, quoted from sources that were actually opened, and the questions to put to a lawyer. Nothing here says that any ScrollJar feature is "legal" or "compliant".

**How sources were read.** Several official sites block scripted access from this environment:
- California leginfo, nysenate.gov, NY DFS and the California DFPI returned Cloudflare 403s. Their statute text was read from **public.law**, a mirror that cites and links the official source. The mirror is marked "(mirror)" wherever it is used. Counsel should re-check those quotes on the official site.
- EUR-Lex HTML returned 202 challenges, so EU acts were read from the **EU Publications Office (cellar)**, which serves the official Official Journal text.
- The EBA Q&A site returned 403; Normattiva reset the connection; AustLII returned 403. Italian and Australian texts were read through the Legal Data Hunter database, which links back to Normattiva and the Federal Register of Legislation.
- **Tool note for the caller:** the Legal Data Hunter tool hit its free-plan daily limit during this research: `{"limit_reached":true,"limit_type":"day","plan":"free","upgrade_url":"https://legaldatahunter.com/pricing","resets_at":"2026-10-21T17:40:00+00:00"}`. Pricing link: https://legaldatahunter.com/pricing. Because of this, two Italian provisions are in the Unverified list.

---

## 0. Top risks at a glance

| # | Issue | Feature | Risk | Why |
|---|---|---|---|---|
| 1 | **Apple 3.2.2(iv) / 3.2.1(vi): collecting money for charities inside the app** | Coins, Families, Teams, Backing (charity share) | **High (could block launch)** | Only Apple-approved nonprofits may fundraise in-app. A platform must make sure **every** nonprofit it lists is approved. Everyone else "may only collect funds outside of the app". The spec relies on 3.1.3(e) plus Every.org, but those guidelines don't say that routing money through Every.org meets this test. |
| 2 | **Flow of funds: money passes through ScrollJar's Stripe balance on its way to Every.org** | Coins (a), Backing (b), Families (c), Teams (d) | **High** | Taking money from one person and sending it to another person is the core definition of money transmission (FinCEN; California MTA; NY Banking Law §641; PSD2 "money remittance"). The exemptions that are usually relied on are written for **buying goods or services**. A donation to a third party may not fit them. |
| 3 | **Holding other people's money over time** | Teams ("unspent pledge rolls into the next campaign"); Families pledges if paid up front; Backing (between charge and treat pick) | **High** if pre-funded | Holding customer funds for later transfer raises money-transmission and stored-value questions, plus unclaimed-property duties. Charging only when money is unlocked avoids most of this. |
| 4 | **Every.org's public API doesn't document what the spec assumes** | Coins, Backing, Families, Teams | **High (dependency)** | The public docs cover search, fundraisers, a Donate Button, and a Donate Link where the **donor pays on Every.org**, with frequency `ONCE`, `MONTHLY` or `YEARLY`. They describe no endpoint that takes funds a platform has already collected. A partner agreement is needed, and its structure decides risks 1–3. |
| 5 | **Backing a friend: gift cards, Stripe rules, Apple IAP** | Backing | **Medium–High** | Stripe **prohibits** "peer-to-peer money transmission" and **restricts** gift-card sales and fundraising. Apple requires IAP for any gift "connected to … receiving digital content or services", so a month of Plus as the treat would need IAP. Digital gift cards for digital goods also need IAP. |
| 6 | **Monthly charges of varying amounts** | Coins settlement on the 1st; jar break 5× | **Medium** | US Reg E: for **debit cards**, a recurring charge needs a signed or similarly authenticated authorization, and a written notice of the amount **10 days** before any charge that differs from the last one (or a consumer-chosen range). Visa's stored-credential agreement rules apply. In the EU and UK, payers have an **8-week** refund right for payee-initiated charges where the exact amount wasn't set at authorization. |
| 7 | **Gambling or lottery characterisation** | Backing a friend; coins | **Low–Medium** (as designed) | The backer pays a fixed amount whatever happens and gets nothing back. The friend pays nothing. The user's coins depend on the user's own choices and carry no prize. Under the US and UK definitions quoted below, that shape is far from a bet or a lottery. The risk is in future changes, and in how Apple (5.3) and Stripe (prohibited gambling list) read the feature. |
| 8 | **Unclaimed property (escheat)** | Unpicked treats, refunds that can't be delivered, unspent pledges, donations that bounce | **Medium** | Money ScrollJar owes to someone and can't deliver may have to be reported to a state. |
| 9 | **EU expansion moves** | All | Later market | PSD3/PSR are **not yet adopted** (EP procedure file: "Awaiting Council's 1st reading position"). Apple's new EU business terms took effect **1 Oct 2026**. |

---

## 1. Money transmission and payment-services licensing

### 1.1 United States, federal: FinCEN money services business (MSB) rules

**Rule: 31 CFR 1010.100(ff)(5)** (current eCFR). FinCEN's general MSB definitions date from the 2011 MSB final rule (76 FR 43596, 21 Jul 2011). The prepaid-access rules were amended in 2011, and the definitions section was last amended in 2014.
- Definition: "A person that provides money transmission services. The term 'money transmission services' means the acceptance of currency, funds, or other value that substitutes for currency from one person **and the transmission of currency, funds, or other value that substitutes for currency to another location or person by any means**."
- Exemptions: "The term 'money transmitter' shall not include a person that only: … (B) **Acts as a payment processor to facilitate the purchase of, or payment of a bill for, a good or service** through a clearance and settlement system by agreement with the creditor or seller; … (E) Provides prepaid access; or (F) **Accepts and transmits funds only integral to the sale of goods or the provision of services**, other than money transmission services, by the person who is accepting and transmitting the funds."
- URL: https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-A/section-1010.100

**FinCEN's four conditions for the payment-processor exemption.** These come from FIN-2019-G001 (9 May 2019), restating earlier administrative rulings. To qualify, a person must:
- "(a) facilitate the purchase of goods or services, or the payment of bills for goods or services (not just the money transmission itself);
- (b) operate through clearance and settlement systems that admit only BSA-regulated financial institutions;
- (c) provide its service pursuant to a formal agreement; and
- (d) enter a formal agreement with, at a minimum, **the seller or creditor that provided the goods or services and also receives the funds**."
- URL: https://www.fincen.gov/sites/default/files/2019-05/FinCEN%20Guidance%20CVC%20FINAL%20508.pdf (pp. 22–23)

**Prepaid access (relevant to gift cards).** "an arrangement is not a prepaid program if: (A) It provides **closed loop prepaid access to funds not to exceed $2,000** maximum value that can be associated with a prepaid access device or vehicle on any day" (1010.100(ff)(4)(iii)(A)). "Closed loop prepaid access" is defined in (kkk) as prepaid access "that can be used only for goods or services in transactions involving a defined merchant or location".

**How this touches ScrollJar:**
- **(a) Coins → Every.org.** In the current spec, the user's card is charged by **ScrollJar's** Stripe account on the 1st, and ScrollJar then donates through Every.org. On those facts ScrollJar accepts funds from the user and sends them on to Every.org, a different person.
  - The payment-processor exemption (B) needs a purchase of goods or services and an agreement with the **seller** who receives the funds. A donation is not a purchase, and Every.org is not selling anything to the user.
  - The "integral" exemption (F) needs the transmission to be integral to a sale of goods or services **by ScrollJar**. Counsel must judge whether a coin donation is "integral" to the app's service, or is the transmission itself.
- **(b) Backing a friend.** User A's money becomes a third-party gift card for user B, or a donation to B's charity. Value moves from one user towards another person, which is the pattern the definition targets. ScrollJar would also buy gift cards with A's money, so (ff)(4) and (7) on prepaid access and its sellers become relevant.
- **(c) Families.** The parent's money goes to the charity the kid picks. This is the same pass-through question as (a). It gets worse if the pledge is charged in advance and held.
- **(d) Teams.** The employer's pledge goes to a charity. The Teams spec says the company pledges a budget "into the Company Jar" and "**Unspent pledge rolls into the next campaign**" (`docs/scrolljar-teams-spec.md` lines 16 and 34). If ScrollJar actually holds that money between campaigns, that is custody of a customer's funds for later transmission.

**Risk: High** for the current design. The structural fix in 1.3 would lower it.

**Questions for counsel:**
1. On the current flow (ScrollJar's Stripe account charges the user, then ScrollJar pays Every.org), is ScrollJar a "money transmitter" under 31 CFR 1010.100(ff)(5)? Does exemption (B) or (F) apply to donations, given that FinCEN's conditions require "the seller or creditor that provided the goods or services"?
2. If ScrollJar instead charges the user as the merchant of record for **its own** service and then donates **its own** money, does that remove the transmission? What does it change for the "100% goes to charity" claim, for who gets the tax receipt, and for commercial co-venturer status?
3. For Teams and Families, does invoicing or charging only the **unlocked** amount at campaign end, with nothing held, avoid MSB status? Does pre-funding a pledge create it?
4. For Backing, does buying a closed-loop gift card for B with A's money make ScrollJar a "seller of prepaid access" or "provider of prepaid access"? Is it enough that the card issuer or rewards vendor is the provider of record?

### 1.2 United States, states: money transmitter laws

Each state licenses money transmitters separately. This section covers California and New York. Other states differ, and some have adopted the CSBS Model Money Transmission Modernization Act; that is unverified, see §7.

**California Money Transmission Act, Financial Code §2003** (mirror; in force as amended, source updated 1 Jan 2025):
- "'Money transmission' means any of the following: … Selling or issuing stored value to a person located in this state. … Receiving money for transmission from a person located in this state."
- "Only a licensee may issue stored value or payment instruments."
- URL (mirror): https://california.public.law/codes/financial_code_section_2003 (official: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FIN&sectionNum=2003)

**California Financial Code §2010(l), the agent-of-payee exemption** (mirror; updated 1 Jan 2025). The Act does not apply to:
- "(l) A transaction in which the recipient of the money or other monetary value is an agent of the payee pursuant to a preexisting written contract and delivery of the money or other monetary value to the agent satisfies the payor's obligation to the payee. … (2) For purposes of this subdivision, '**payee' means the provider of goods or services, who is owed payment** of money or other monetary value from the payor for the goods or services. (3) … 'payor' means the recipient of goods or services, who owes payment…"
- URL (mirror): https://california.public.law/codes/financial_code_section_2010

**New York Banking Law §641(1)** (mirror; source updated 22 Sep 2014):
- "No person shall engage in the business of selling or issuing checks, or engage in the business of **receiving money for transmission or transmitting the same**, without a license therefor obtained from the superintendent …, nor shall any person engage in such business as an agent, **except as an agent of a licensee or as agent of a payee**."
- URL (mirror): https://newyork.public.law/laws/n.y._banking_law_section_641

**How this touches ScrollJar:**
- California's agent-of-payee exemption is defined around a **payee who provides goods or services and is owed payment**. A charity receiving a voluntary donation, or a friend receiving a gift, is not obviously such a payee.
- An agent-of-the-charity structure (ScrollJar as Every.org's agent under a written contract) needs counsel's analysis. It would not automatically fit §2010(l).
- California's "selling or issuing stored value" limb matters if ScrollJar ever issues its own credit, such as a ScrollJar treat balance, as opposed to delivering a third-party issuer's gift card.

**Risk: High** if money passes through ScrollJar. **Low** if ScrollJar never takes possession of the funds (see 1.3).

**Questions for counsel:**
5. In California and New York, and in the other launch states, does the coin flow, Backing, Families or Teams count as "receiving money for transmission"? Can ScrollJar rely on agent-of-payee where the "payee" is a charity platform receiving donations rather than a seller owed payment?
6. Which states have adopted the Money Transmission Modernization Act's agent-of-payee and payroll/marketplace exemptions? Does any state exempt donation platforms specifically?
7. Should ScrollJar get a state-by-state licensing opinion before US launch, or is a "never in the flow of funds" structure enough?

### 1.3 Structures that keep ScrollJar out of the flow of funds

These are options to put to counsel, not recommendations.

**Stripe Connect charge types.** Stripe documentation, read 2026-10-20:
- **Direct charges:** "Create a charge directly on a connected account. … **the payment appears in the connected account's balance, not in your platform's balance**. … Your platform's balance increases with any application fees you collect for a charge. Refunds and chargebacks reduce the connected account's balance."
- **Destination charges:** "You create a charge on your platform, so **the payment appears in your platform's balance**. A portion of the funds immediately transfers to the connected account's balance … Refunds and chargebacks reduce your platform's balance."
- URL: https://docs.stripe.com/connect/charges
- What follows from this: a **direct charge on the charity platform's own connected account** (Every.org, or a similar donation platform acting as merchant of record) keeps the money out of ScrollJar's balance. Destination charges and "separate charges and transfers" pass through ScrollJar's balance. Whether Every.org will accept off-session charges of varying amounts on a connected account is a commercial question for Every.org.

**Every.org's public API.** Read 2026-10-20 at https://docs.every.org/docs/intro and https://docs.every.org/docs/donate-link.
- It documents the Nonprofits API, the Fundraisers API, a Donate Button, and a Donate Link with `frequency - … Allowed values are ONCE , MONTHLY , or YEARLY` and a partner webhook.
- In this flow **the donor pays on Every.org**: it is a direct donation, and the receipt is in the donor's name.
- No public endpoint is documented for (i) ScrollJar charging users and remitting the funds, or (ii) Every.org charging a stored card off-session for a variable amount on the 1st.
- The IOS-BUILD-SPEC already says to "Confirm the current partner/API terms and the exact flow … with counsel before launch." The public docs confirm that confirmation is genuinely needed.

**Stripe's prohibited and restricted list** (page "Last updated: 2026-09-22"):
- **Prohibited:** "Peer-to-peer money transmission"; and under Gambling, "Games of chance including … sweepstakes and contests …", "Games of skill … with a monetary or material prize", "**Payments of an entry or player fee that promise the entrant or player will win a prize of value**", "Lotteries".
- **Restricted** (needs Stripe approval): "Crowdfunding and fundraising … Organizations fundraising for a charitable purpose (Note: Supported in Australia, Canada, the United Kingdom, and the United States. Prohibited in all other countries.)"; "Sale of stored value or credits maintained, accepted, and issued by anyone other than the seller"; "Preloaded payment cards, gift cards, virtual credits …"; "Payment facilitation and aggregation (including receiving settlement proceeds for goods or services that you did not provide, on behalf of one or multiple third-party sellers)".
- URL: https://stripe.com/legal/restricted-businesses
- How this touches ScrollJar:
  - Coins (fundraising for others), Backing (gift cards; a friend's money becoming another person's value) and Teams/Families pass-through may each need **Stripe's prior approval**.
  - Backing must never look like P2P money transmission or a prize for an entry fee.
  - Note the country limits: charitable fundraising is shown as **not supported outside AU, CA, UK, US**. That matters for an Italian entity or for EU users.

**Visa deposit rule (Visa Core Rules, 18 April 2026 edition, §1.5.6.1):** "Merchant or Digital Wallet Operator: Only submit a Deposit for a Transaction that it has completed with a Cardholder." Under the current flow, ScrollJar is the merchant of record for a charge whose proceeds belong to a charity. URL: https://usa.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf

**Questions for counsel:**
8. Of these models, which keeps ScrollJar (i) out of money transmission, (ii) out of commercial co-venturer registration, and (iii) inside Apple 3.2.2(iv)? The models are: (1) direct charge on the donation platform's connected account, (2) ScrollJar as merchant of record that then donates its own funds, (3) a donor-advised-fund style account in the user's name, and (4) the user donating directly on Every.org through a link-out.
9. Who should the merchant of record and card statement descriptor be, so that disputes and card-network rules line up with the real recipient?

### 1.4 European Union: PSD2 today, PSD3/PSR pending

**Directive (EU) 2015/2366 (PSD2).** Adopted 25 Nov 2015; transposition and application from 13 Jan 2018. URL (official OJ text via the Publications Office): https://publications.europa.eu/resource/celex/32015L2366 (EUR-Lex: https://eur-lex.europa.eu/eli/dir/2015/2366/oj)
- Art. 4(22): "'**money remittance**' means a payment service where funds are received from a payer, without any payment accounts being created in the name of the payer or the payee, for the sole purpose of transferring a corresponding amount to a payee or to another payment service provider acting on behalf of the payee…"
- Art. 3(b), commercial-agent exclusion: "payment transactions from the payer to the payee through a commercial agent authorised via an agreement to negotiate or conclude **the sale or purchase of goods or services** on behalf of **only the payer or only the payee**".
- Recital 11: agents acting for both sides "should be excluded only if they do not, at any time enter into possession or control of client funds."
- Art. 3(k), limited-network exclusion: "(i) instruments allowing the holder to acquire goods or services only in the premises of the issuer or within a limited network of service providers under direct commercial agreement with a professional issuer; (ii) instruments which can be used only to acquire a very limited range of goods or services; …". Art. 37 requires notifying the competent authority above a value threshold.

**How this touches ScrollJar (later EU market):**
- The current coin flow (funds in, passed to a charity platform) reads closely onto "money remittance".
- The commercial-agent exclusion is tied to negotiating a **sale or purchase of goods or services**, which a donation is not.
- The limited-network exclusion covers *instruments* such as store cards. It could matter for treat gift cards issued by a third party, but it does not cover the coin pass-through.
- An Italian entity would apply for authorisation, if needed, to the Banca d'Italia under the Italian transposition (not verified here).

**PSD3 / Payment Services Regulation (PSR): status on 2026-10-20.**
- European Parliament Legislative Observatory, procedure **2023/0210(COD)** (PSR):
  - "Stage reached in procedure: **Awaiting Council's 1st reading position**".
  - Key event "05/05/2026 Approval in committee of the text agreed at early 2nd reading interinstitutional negotiations (PE787.675)".
  - Forecast "**14/12/2026** Indicative plenary sitting date".
  - URL: https://oeil.secure.europarl.europa.eu/oeil/en/procedure-file?reference=2023/0210(COD)
- Secondary source (Matheson, 29 Apr 2026): "On 23 April 2026, the Council of the European Union published the final compromise texts … formal adoption by the Council and Parliament, signing and publication in the Official Journal are yet to occur." URL: https://www.matheson.com/insights/psd3-and-psr-published-whats-changing-for-eu-payment-services/
- **So PSD3/PSR are agreed politically but not adopted or in force.** PSD2 still governs. Application dates (for example 18 months for PSD3 transposition) are reported only by secondary sources and are unverified.

**Questions for counsel (EU, later):**
10. In the EU, does the coin flow make ScrollJar (or its Italian entity) a provider of "money remittance" under PSD2 Annex I(6), unless ScrollJar never touches the funds?
11. Do the agreed PSD3/PSR texts change the commercial-agent or limited-network exclusions in a way that affects a donation pass-through or treat gift cards? When will they apply?

### 1.5 United Kingdom: PSRs 2017 and EMRs 2011

**Payment Services Regulations 2017 (SI 2017/752), Schedule 1 Part 2.** Revised text is "up to date with all changes known to be in force on or before 20 October 2026". URL: https://www.legislation.gov.uk/uksi/2017/752/schedule/1/part/2
- (b): "payment transactions between the payer and the payee through a commercial agent authorised in an agreement to negotiate or conclude the sale or purchase of goods or services on behalf of either the payer or the payee **but not both** the payer and the payee"
- (k)(ii): instruments that "are issued by a professional issuer and allow the holder to acquire goods or services only within a limited network of service providers which have direct commercial agreements with the issuer"

**Electronic Money Regulations 2011 (SI 2011/99), reg. 3.** "electronic money does not include— (a) monetary value stored on specific payment instruments that can be used only in a limited way …". URL: https://www.legislation.gov.uk/uksi/2011/99/regulation/3

**Effect:** the same analysis as the EU applies (UK market, later).

### 1.6 Feature-by-feature summary

| Feature | Who pays → who receives | Does money touch ScrollJar today? | Main question |
|---|---|---|---|
| (a) Coins | User → (ScrollJar Stripe) → Every.org → charity | **Yes** (per IOS-BUILD-SPEC §6) | MSB / state MTL / Apple 3.2.2(iv). Restructure as a direct charge on the donation platform? |
| (b) Backing a friend | User A → (ScrollJar) → gift-card vendor for B, and/or Every.org for B's charity | **Yes** | Transmission + prepaid access + Stripe P2P/gift-card limits + Apple IAP for "month of Plus" |
| (c) Families | Parent → (ScrollJar?) → charity the kid picks | Unclear (timing of the charge not specified) | Charge only on unlock, never pre-fund |
| (d) Teams | Employer → (ScrollJar?) → charity, "unspent pledge rolls into the next campaign" | **Possibly held across campaigns** | Invoice only the unlocked amount, or have the employer pay the donation platform directly |
| Private Boost (Teams) | Employee → Every.org web checkout | No (direct donation) | Good pattern already |
| Success-side giving, invite $1 | ScrollJar's own money → charity | ScrollJar is the donor | No transmission issue; possible prize-promotion issue in Italy (§3.4) |
| Wish jars | No money moves | No | None for this topic |

---

## 2. Gift cards and stored value (the Backing "treat")

### 2.1 US federal: CARD Act gift-card rules (Regulation E §1005.20)

**15 U.S.C. §1693l-1** (Credit CARD Act of 2009, §401) and **12 CFR 1005.20** (in force 22 Aug 2010). URL: https://www.ecfr.gov/current/title-12/chapter-X/part-1005/subpart-A/section-1005.20
- "'Store gift card' means a card, code, or other device that is: (i) Issued on a prepaid basis primarily for personal, family, or household purposes to a consumer in a specified amount … in exchange for payment; and (ii) Redeemable upon presentation at a single merchant or an affiliated group of merchants".
- **Exclusion** (b)(3): "A loyalty, award, or promotional gift card", defined in (a)(4) as one "issued … in connection with a loyalty, award, or promotional program" that carries prescribed disclosures, including "A statement indicating that the card … is issued for loyalty, award, or promotional purposes, which must be included on the front of the card".
- **Expiry** (e): "No person may sell or issue a gift certificate, store gift card, or general-use prepaid card with an expiration date, unless: (1) … at least **five years** remaining until the certificate or card expiration date".
- **Fees** (d): no dormancy, inactivity or service fee unless "There has been no activity … in the one-year period ending on the date on which the fee is imposed" and the fee is disclosed.

**How this touches ScrollJar:** the treat is a third-party gift card (books, coffee, cinema) bought through a "gift-card rewards API".
- Many rewards APIs issue cards on "promotional or reward" terms, often with shorter expiry.
- Backer A **pays** for the treat as a gift to B. That looks less like a company loyalty, award or promotional programme, and more like a gift card sold "in exchange for payment".
- If so, the five-year expiry and fee rules apply, and the issuer or seller must give pre-purchase disclosures under §1005.20(c)(3).

### 2.2 US states: California gift-certificate law and escheat

**California Civil Code §1749.5** (mirror):
- "(a) It is unlawful for any person or entity to sell a gift certificate to a purchaser that contains any of the following: (1) An expiration date. (2) A service fee …"
- "(b)(2) … a gift certificate with a cash value of **less than fifteen dollars ($15)** is redeemable in cash for its cash value."
- (e)(1) exempts expiring certificates "distributed by the issuer to a consumer pursuant to an awards, loyalty, or promotional program **without any money or other thing of value being given in exchange**".
- URL (mirror): https://california.public.law/codes/civil_code_section_1749.5
- The mirror shows a $15 threshold. Older summaries say $10, so counsel should confirm the current figure.

**California Code of Civil Procedure §1520.5** (mirror; updated 1 Jan 2004): "Section 1520 does not apply to gift certificates subject to Title 1.4A … However, Section 1520 applies to any gift certificate that has an expiration date and that is given in exchange for money or any other thing of value." URL (mirror): https://california.public.law/codes/code_of_civil_procedure_section_1520.5

**How this touches ScrollJar:**
- If a backer in California pays for a gift card for B, the "awards/loyalty" exemption doesn't obviously apply, because money was given in exchange.
- Under §1749.5(b)(2), a treat under $15 (Backing amounts start at $5) could be cash-redeemable **from the issuer**.
- Escheat risks sit with ScrollJar where ScrollJar holds the value:
  - The backer has paid but the friend never picks a treat. The spec says the backer is charged "when the backing ends" and the treat is picked "at the end".
  - A treat code is issued but never delivered.
  - Refunds can't be paid out.
  - Teams and Families pledges are unspent.
- Unredeemed **third-party** cards are mainly the issuer's escheat problem. Unpicked treat value held by ScrollJar is ScrollJar's.

**Risk: Medium.**

**Questions for counsel:**
12. Is the Backing treat a "store gift card" sold to a consumer, or a "loyalty, award, or promotional gift card"? Who is the "issuer" and the "seller" for disclosure purposes: ScrollJar, the rewards vendor, or the brand?
13. What happens legally to the kept share if B never picks a treat? Can the Terms set a default, for example that after 30 days it goes to B's charity, so ScrollJar never holds unclaimed value? Which state's unclaimed-property law governs (holder's state of incorporation versus owner's last-known address)? Note that the Delaware-versus-Italy entity choice affects this.
14. For Teams and Families, is any pledge money held by ScrollJar reportable as unclaimed property if a campaign ends and the customer doesn't respond?

### 2.3 EU and UK: e-money

**Directive 2009/110/EC (EMD2), Art. 1(4)** (official text via the Publications Office): "This Directive does not apply to monetary value stored on instruments exempted as specified in Article 3(k) of Directive 2007/64/EC." The reference now reads as PSD2 Art. 3(k). URL: https://publications.europa.eu/resource/celex/32009L0110

**UK EMRs 2011 reg. 3(a):** same limited-use exclusion (quoted in 1.5).

**How this touches ScrollJar:** a treat that is a single brand's gift card is the classic limited-network instrument, and that is the issuer's concern. ScrollJar should not create its **own** stored balance, such as "treat credit". If it did, it would have to analyse e-money issuance (EU/UK) and "stored value" (California §2003).

### 2.4 Apple and gift cards (see also §5)

App Review Guideline 3.1.1: "Digital gift cards, certificates, vouchers, and coupons which can be redeemed for **digital goods or services** can only be sold in your app using in-app purchase."
- "Books" could mean e-books (Kindle, Apple Books), which are digital goods.
- Coffee or cinema cards are for physical goods and services.

---

## 3. Gambling, lottery and contest risk

### 3.1 United States

**California Penal Code §319**, lottery (mirror): "A lottery is any scheme for the disposal or distribution of property **by chance**, among persons who have **paid or promised to pay any valuable consideration** for the chance of obtaining such property…". The three elements are **prize, chance and consideration**. URL (mirror): https://california.public.law/codes/penal_code_section_319

**New York Penal Law §225.00(2)**, gambling (mirror): "A person engages in gambling when he stakes or risks something of value upon the outcome of a contest of chance or a **future contingent event not under his control or influence**, upon an agreement or understanding that **he will receive something of value** in the event of a certain outcome." URL (mirror): https://newyork.public.law/laws/n.y._penal_law_section_225.00

**Federal UIGEA, 31 U.S.C. §5362(1)(A)** (enacted 13 Oct 2006): "'bet or wager' … means the staking or risking by any person of something of value upon the outcome of **a contest of others, a sporting event, or a game subject to chance**, upon an agreement or understanding that **the person or another person** will receive something of value in the event of a certain outcome". URL: https://www.law.cornell.edu/uscode/text/31/5362

**Applying the elements, person by person** (questions for counsel, not conclusions):
- **User's own coins.**
  - The user pays a price they set to open an app.
  - The outcome is under the user's own control: it is their choice to open.
  - There is no prize and nothing comes back.
  - On NY §225.00(2), the event is "under his control" and the user "receives" nothing. On CA §319, there is no chance and no prize.
- **Backer A.**
  - A pays a fixed $5–25 **whatever happens**, and "nothing goes back" (spec §7).
  - A gets nothing of value on any outcome, so NY's "he will receive" element looks absent.
  - Under UIGEA, "another person" (friend B) receives a treat depending on the outcome. But the outcome is a person's own conduct, not "a contest of others, a sporting event, or a game subject to chance".
- **Friend B.**
  - B pays nothing to take part (no consideration) and doesn't control A's payment.
  - B's own coins are the ordinary product.
  - B receives a treat on the days B keeps their deals. That depends on B's own conduct, not chance.
- **Features that would raise the risk** (worth putting in a "never" list):
  - any refund or upside to the backer;
  - the backer betting against the friend, or two users staking against each other;
  - pooled pots split among winners;
  - cash payouts;
  - an entry fee to a creator challenge with a prize;
  - random rewards.
  The CLAUDE.md rules already exclude most of these: "never cash", "nothing goes back to them", no variable rewards, no rankings.

**Risk: Low–Medium.** The legal elements look absent as designed. The commercial gatekeepers (Apple 5.3, Stripe's prohibited gambling list, card-network MCC coding) may judge on appearance, which is why the spec already bans the words "bet" and "wager".

### 3.2 United Kingdom: Gambling Act 2005 (ss. 6, 9, 14 in force 1 Oct 2005; s. 339 in force 1 Sep 2007)

- s. 6(1): "'gaming' means playing a game of chance for a prize." URL: https://www.legislation.gov.uk/ukpga/2005/19/section/6
- s. 9(1): "'betting' means making or accepting a bet on— (a) the outcome of a race, competition or other event or process, (b) the likelihood of anything occurring or not occurring, or (c) whether anything is or is not true." URL: https://www.legislation.gov.uk/ukpga/2005/19/section/9
- s. 14(2): a simple lottery is where "(a) persons are required to pay in order to participate …, (b) … one or more prizes are allocated to one or more members of a class, and (c) the prizes are allocated by a process which relies wholly on chance." URL: https://www.legislation.gov.uk/ukpga/2005/19/section/14
- s. 339: "Participating in a competition or other arrangement under which a person may win a prize is not gambling for the purposes of this Act unless it is— (a) gaming …, (b) participating in a lottery …, or (c) betting …". URL: https://www.legislation.gov.uk/ukpga/2005/19/section/339

**How this touches ScrollJar:**
- s. 9 does not define "bet". Counsel should say whether a one-sided payment, where the payer can never win, is a "bet on … the likelihood of anything occurring" (the friend keeping their deals).
- There is no chance element, so lottery (s. 14) and gaming (s. 6) look inapplicable.

**Questions for counsel:**
15. In the US states at launch, and later in the UK, could Backing a friend be treated as "betting" or "gambling" when only one party pays and that party never receives anything? Does the friend's "treat" make it a prize promotion that needs official rules?
16. Should the Terms state expressly that Backing is a conditional gift with no return to the backer, and that coins are self-chosen charges for the user's own deals, with no prize? Is any state-specific disclosure needed?

### 3.3 Australia: Interactive Gambling Act 2001 (Cth), s. 4

Compilation dated 14 Oct 2024, read through the Federal Register of Legislation record C2024C00646. "**gambling service** means: (a) a service for the placing, making, receiving or acceptance of bets; … (c) a service for the conduct of a lottery; … (e) a service for the conduct of a game, where: (i) the game is played for money or anything else of value; …". URL: https://www.legislation.gov.au/Details/C2024C00646

**Effect:** in Australia the risk turns on whether Backing is a "bet". This is a later market; ask local counsel before launching there.

### 3.4 Italy

**DPR 26 Oct 2001 n. 430, art. 1** (prize competitions and prize operations; text in force from 12 Apr 2002, read via Normattiva in Legal Data Hunter):
- "I concorsi e le operazioni a premio di ogni specie, consistenti in promesse di premi al pubblico dirette a favorire, nel territorio dello Stato, la conoscenza di prodotti, servizi, ditte, insegne o marchi o la vendita di determinati prodotti o la prestazione di servizi, aventi, comunque, fini anche in parte commerciali, si effettuano alle condizioni e con le modalità di cui al presente titolo." In English: prize competitions and prize operations of every kind, meaning promises of prizes to the public aimed at promoting products, services or brands with at least partly commercial aims, must follow this regulation.
- "La partecipazione ai concorsi e alle operazioni a premio è gratuita…" In English: taking part must be free.
- URL: https://www.normattiva.it/eli/id/2001/12/13//001G0490/CONSOLIDATED

**How this touches ScrollJar:**
- "Success-side giving" (ScrollJar donates per 10 clean days) and "invites that donate" ($1 per activated invite) are promises made by a company to the public to promote its service.
- Counsel should check whether they are "operazioni a premio", and whether the fact that the benefit goes to a charity, not the user, matters.
- Backing treats are paid by a user, not promised by ScrollJar, so they are a different case.
- The spec's open question Q19 ("prize-promotion law per country") is the right place for this.
- The art. 6 exclusions (including for benefits to charitable bodies) could not be opened before the tool limit; see §7.

**Gambling under the Codice penale (arts. 718–721) and Codice civile art. 1933** (no court action for gaming debts): **not verified** (Normattiva unreachable). See §7.

### 3.5 Commitment-contract precedents and how they frame it

- **Forfeit**, Terms of Use read 2026-10-20 at https://forfeit.app/terms:
  - "PAYMENT AUTHORIZATION: IF YOU MAKE A COMMITMENT THROUGH THE SERVICE, THEN YOU AUTHORIZE FORFEIT TO CHARGE YOUR PAYMENT METHOD **UP TO THE AMOUNT YOU HAVE SELECTED** FOR THAT COMMITMENT IF YOU FAIL TO VERIFY YOUR COMMITMENT."
  - "…selecting a corresponding penalty amount ('Penalty') to be charged if you fail to timely verify…".
  - Framing: a self-selected **penalty** under an authorization. The company keeps it.
- **Beeminder** standard contract, https://www.beeminder.com/contract:
  - "I, _____, will stay on the good side of my Bright Red Line every day until I reach my goal or **forfeit $___**."
  - "You can change the steepness of your red line at any time for any reason, with one week notice."
  - Framing: a pledge you forfeit, with a cooling-off delay on loosening, much like ScrollJar's 24-hour rule.
- **stickK:** the FAQ and Terms returned 403 and could not be read. Its framing is unverified here.
- **What this means:** the precedents frame money as a self-imposed **penalty or pledge** under a clear payment authorization, not as a stake with a possible win. None of the pages opened discusses gambling law. **No precedent found covers a third-party "backer" paying for a friend's outcome.** That is new for ScrollJar.

---

## 4. Payments regulation: off-session monthly charges, mandates, notices, chargebacks and refunds

### 4.1 United States: Regulation E (debit cards) and Regulation Z (credit cards)

**12 CFR 1005.2(k):** "'Preauthorized electronic fund transfer' means an electronic fund transfer authorized in advance to recur at substantially regular intervals." Debit-card transactions are EFTs (1005.3(b)(1)(v)).

**12 CFR 1005.10(b)** (in force; last amended 89 FR 106836, 30 Dec 2024): "Preauthorized electronic fund transfers from a consumer's account may be authorized only by **a writing signed or similarly authenticated** by the consumer. The person that obtains the authorization shall provide **a copy** to the consumer." URL: https://www.ecfr.gov/current/title-12/chapter-X/part-1005/subpart-A/section-1005.10

**Official Interpretation 10(b)-7** confirms that this covers card-on-file debit charges: "Consumers sometimes authorize third-party payees, by telephone or online, to submit recurring charges against a credit card account. If the consumer indicates use of a credit card account when in fact a debit card is being used, the payee does not violate the requirement to obtain a written authorization if …". Comment 10(b)-2: "it is the third-party payee that is in violation" if the payee fails to get the authorization. Comment 10(b)-5: the E-SIGN Act satisfies "similarly authenticated". URL: https://www.ecfr.gov/current/title-12/chapter-X/part-1005/appendix-Supplement%20I%20to%20Part%201005

**12 CFR 1005.10(d), varying amounts:**
- "(1) … When a preauthorized electronic fund transfer from the consumer's account will **vary in amount** from the previous transfer under the same authorization or from the preauthorized amount, the designated payee or the financial institution shall send the consumer written notice of the amount and date of the transfer **at least 10 days before** the scheduled date of transfer."
- "(2) Range. The designated payee … shall inform the consumer of the right to receive notice of all varying transfers, but may give the consumer the option of receiving notice only when a transfer falls outside a specified range of amounts or only when a transfer differs from the most recent transfer by more than an agreed-upon amount."

**12 CFR 1005.10(c):** the consumer may stop payment by telling their bank "at least three business days before the scheduled date".

**12 CFR 1026.13(a)(3)** (Reg Z, credit cards): a billing error includes "an extension of credit for property or services **not accepted by the consumer** … or not delivered … as agreed".

**How this touches ScrollJar:**
- The monthly settlement on the 1st is a recurring transfer, authorized in advance, whose amount varies.
- For **debit-card** users, the spec's "pre-settlement email" may need to go out **≥10 days before the 1st**, or the user must opt into a range at card save. One option to ask counsel about: "notify me only if the jar is over $X", with the $50 cap shown at sign-up.
- The "plain-language mandate" at SetupIntent must be a signed or similarly authenticated authorization, and the user must **get a copy** (for example by email).
- The **jar-break charge (5× price)** and the **Backing charge** (one off-session charge at the end) also need clear prior authorization.
- Note the timing clash: coins logged late in the month (say the 25th–31st) can't be in a notice sent 10 days before the 1st. The settlement date, the cut-off or the notice design may need to change.

**Risk: Medium.**

**Questions for counsel:**
17. Does Reg E §1005.10(b) and (d) apply to ScrollJar's monthly debit-card charge? Can a consumer-chosen range (for example "only email me if it's over $25", or the $50 cap) replace the 10-day notice? How should settlement timing work with coins logged in the last 10 days of the month?
18. Is the in-app mandate at card save (SetupIntent, 3DS) enough as a "similarly authenticated" writing under E-SIGN, with a copy emailed?

### 4.2 Card-network rules (Visa Core Rules and Visa Product and Service Rules, edition 18 April 2026)

URL: https://usa.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf

- **Agreement contents for stored credentials** (Table 5-20). The merchant "must obtain the Cardholder's express informed consent to an agreement that contains", among other things:
  - "Transaction amount or a description of how the Transaction amount will be determined";
  - "How the Stored Credential will be used";
  - "Timing and frequency of Transactions";
  - for unscheduled credential-on-file, "the event that will prompt the Transaction";
  - "Cancellation and refund policies".
  These "must be displayed separately from the general purchase terms and conditions."
- **Before storing:** "Submit an Authorization Request for the Transaction amount" or, "If payment is not required, submit an Account Verification". "If the initial Authorization Request or Account Verification is not approved, the Merchant must not store the credential." (Table 5-22)
- **Declines:** "If an Authorization Request for a Merchant-initiated Transaction with a Stored Credential is declined, the Merchant must notify the Cardholder in writing and allow the Cardholder at least **7 calendar days** to pay by other means." (Table 5-22)
- **Europe Region:** "The Merchant must provide the Cardholder with confirmation of the establishment of the Recurring Transaction agreement within 2 business days." "For Unscheduled Credential-on-File Transactions, the Merchant must provide notification to the Cardholder of any change in the Transaction amount or any other terms of the agreement at least 2 working days before the change."
- **Definition:** "Recurring Transaction: A Transaction, in a series of Transactions that use a Stored Credential and that are processed at fixed, regular intervals … representing Cardholder agreement for the Merchant to initiate future Transactions **for the purchase of goods or services**…"
- **Disputes:** "Dispute Condition 13.2: Cancelled Recurring Transaction … 120 calendar days from the Transaction Processing Date".

**How this touches ScrollJar:**
- The mandate screen at card save should spell out:
  - how each month's amount is worked out (your coins, capped at $50);
  - that the charge is on the 1st;
  - the jar-break rule as "the event that will prompt" a one-off charge;
  - the 48-hour refund;
  - how to cancel.
- Show these separately from the general Terms.
- A failed charge on the 1st needs a written notice and a 7-day window before any retry escalation.
- Whether a variable monthly coin charge should be flagged to the network as a "Recurring" or an "Unscheduled COF" transaction is a question for Stripe and counsel. The Recurring definition also says "purchase of goods or services", which a donation pass-through may not be.

### 4.3 EU and UK: Strong Customer Authentication, MIT and refund rights (later markets)

- **PSD2 Art. 97(1):** a PSP "applies strong customer authentication where the payer: … (b) initiates an electronic payment transaction". Art. 97 applies from 14 Sep 2019 under RTS (EU) 2018/389.
- **RTS 2018/389 Art. 14** (recurring exemption): "Payment service providers shall apply strong customer authentication when a payer creates, amends, or initiates for the first time, **a series of recurring transactions with the same amount** and with the same payee." The exemption for later payments covers **same-amount** series only. ScrollJar's amounts vary, so this exemption doesn't fit. URL: https://publications.europa.eu/resource/celex/32018R0389
- **Merchant-initiated transactions:** the EBA/ECB *2025 Report on Payment Fraud* (EBA/REP/2025/40, Dec 2025, p. 28) describes MITs as transactions "which entail the existence of a previously existing mandate that **requires the application of SCA when the mandate is granted**". That matches the spec's plan (SetupIntent `usage: off_session`, 3DS at card save). URL: https://www.eba.europa.eu/sites/default/files/2025-12/1709846a-84d9-47cf-86a0-b155efb34d66/EBA%20and%20ECB%20Report%20on%20Payment%20Fraud.pdf. The underlying EBA Q&A (2018_4031) could not be opened (403).
- **PSD2 Art. 75(1)**, holding funds when the amount is unknown: "the payer's payment service provider may block funds on the payer's payment account **only if the payer has given consent to the exact amount** of the funds to be blocked."
  - research-findings.md suggests a Forfeit-style pre-authorization hold "at commitment, capture on failure". In the EU that needs consent to the exact amount held, and the hold must be released "without undue delay" (Art. 75(2)).
- **PSD2 Art. 76(1) and Art. 77(1)**, refund rights for payee-initiated transactions: the payer is entitled to a refund if "(a) the authorisation did not specify the exact amount … and (b) the amount … exceeded the amount the payer could reasonably have expected taking into account the previous spending pattern, the conditions in the framework contract and relevant circumstances". The request window is "**8 weeks** from the date on which the funds were debited".
- **UK:** PSRs 2017 reg. 79(2)(b) (same test) and reg. 80(1): "The payer must request a refund under regulation 79 … within 8 weeks". URLs: https://www.legislation.gov.uk/uksi/2017/752/regulation/79 and https://www.legislation.gov.uk/uksi/2017/752/regulation/80

**How this touches ScrollJar (EU/UK):**
- A visible monthly cap ($50 default) and an "escalation ceiling 2×", both stated in the mandate, help define what the payer "could reasonably have expected".
- A jar-break charge at 5× is the most likely to be refunded or disputed.

**Questions for counsel:**
19. For EU and UK users, is the monthly charge correctly set up as a merchant-initiated transaction under a mandate authenticated with SCA at card save? Does raising the cap count as "amending" the mandate, so that it needs fresh SCA?
20. Would a jar-break charge (5× price) be likely to meet the Art. 76 / reg. 79 refund test? Should the cap also limit jar-break charges?

### 4.4 Consumer refunds and chargebacks: what the spec already plans

The spec already plans a 48-hour no-questions refund, a pause after more than 3 refunds a month, a pre-settlement email, a mandate at card save, and confirmation logs (IOS-BUILD-SPEC §6, §9). These match what the rules above look for: written authorization, notice, a refund policy, and evidence for disputes. Two gaps:
- the timing of the Reg E 10-day notice (4.1);
- the Visa decline notice and 7-day rule (4.2).

---

## 5. App Store and Play payment rules

### 5.1 Apple App Review Guidelines: current text ("Last Updated: October 16, 2026")

URL: https://developer.apple.com/app-store/review/guidelines/

- **3.1.1:** "If you want to unlock features or functionality within your app, (by way of example: subscriptions, in-game currencies, game levels, access to premium content, or unlocking a full version), you must use in-app purchase. Apps may not use their own mechanisms to unlock content or functionality…" Also: "Apps may enable gifting of items that are eligible for in-app purchase to others. Such gifts may only be refunded to the original purchaser and may not be exchanged." And: "Digital gift cards, certificates, vouchers, and coupons which can be redeemed for digital goods or services can only be sold in your app using in-app purchase. Physical gift cards that are sold within an app and then mailed to customers may use payment methods other than in-app purchase."
- **3.1.1(a):** "Developers may apply for entitlements to provide a link in their app to a permitted destination in order to purchase digital content or services. **These entitlements are not required for developers to include buttons, external links, or other calls to action in their United States storefront apps.**" Also: "In all other storefronts, except for the United States storefront, where this prohibition does not apply, apps and their metadata may not include buttons, external links, or other calls to action that direct customers to purchasing mechanisms other than in-app purchase."
- **3.1.3 (intro):** "Apps in this section cannot, within the app, encourage users to use a purchasing method other than in-app purchase, except for apps on the United States storefront and as set forth in 3.1.1(a) and 3.1.3(a)."
- **3.1.3(e):** "If your app enables people to purchase physical goods or services that will be **consumed outside of the app**, you must use purchase methods other than in-app purchase to collect those payments, such as Apple Pay or traditional credit card entry."
- **3.2.1(vi):** "Approved nonprofits may fundraise directly within their own apps or third-party apps, provided those fundraising campaigns adhere to all App Review Guidelines and **offer Apple Pay support**. These apps must disclose how the funds will be used, abide by all required local and federal laws, and ensure appropriate tax receipts are available to donors. … **Nonprofit platforms that connect donors to other nonprofits must ensure that every nonprofit listed in the app has also gone through the nonprofit approval process.**"
- **3.2.1(vii):** "Apps may enable individual users to give a monetary gift to another individual without using in-app purchase, provided that (a) the gift is a completely optional choice by the giver, and (b) 100% of the funds go to the receiver of the gift. However, **a gift that is connected to or associated at any point in time with receiving digital content or services must use in-app purchase.**"
- **3.2.2(iv)** (unacceptable): "Unless you are an approved nonprofit or otherwise permitted under Section 3.2.1 (vi) above, **collecting funds within the app for charities and fundraisers**. Apps that seek to raise money for such causes must be free on the App Store and **may only collect funds outside of the app, such as via Safari or SMS**."
- **5.3** (Gaming, Gambling, and Lotteries): "5.3.1 Sweepstakes and contests must be sponsored by the developer of the app. 5.3.2 Official rules for sweepstakes, contests, and raffles must be presented in the app and make clear that Apple is not a sponsor … 5.3.4 Apps that offer real money gaming … or lotteries must have necessary licensing … Lottery apps must have consideration, chance, and a prize."
- **Apple approval for nonprofits** (https://developer.apple.com/apple-pay/nonprofits/): "You'll need a Candid Seal of Transparency. All seal holders are approved to accept donations through Apple Pay."

**How this touches each ScrollJar feature:**
- **Coins (charged in-app by card, then donated).**
  - ScrollJar's file treats coins as "penalties outside IAP under 3.1.3(e)". But a coin is collected inside the app, and 100% goes to charities, which is close to "collecting funds within the app for charities". 3.2.2(iv) allows that only for approved nonprofits under 3.2.1(vi). A platform must ensure every listed nonprofit is approved, and Every.org lists 1M+.
  - Paying to remove ScrollJar's own shield could also be read as "unlock[ing] … functionality" under 3.1.1.
  - The 3.1.3(e) basis ("physical goods or services … consumed outside of the app") is an argument, not a stated rule. Competitor precedent (Forfeit, Beeminder, stickK) is evidence of App Review practice, not of the guideline's meaning, and those companies **keep** the money, which avoids 3.2.2(iv).
  - **Risk: High (launch).**
- **US-storefront link-outs.** Since 3.1.1(a) and 3.1.3 now allow buttons and links on the US storefront, a fallback to consider: collect coin authorization and donations on the **web** (Safari), linked from the app. That fits 3.2.2(iv)'s "only collect funds outside of the app, such as via Safari". This could change if the Supreme Court case (5.2) changes the injunction.
- **Backing a friend.**
  - A "month of Plus" as the treat is a gift "connected to … receiving digital content or services", so it **must use IAP** (3.2.1(vii); 3.1.1 gifting).
  - Gift cards for digital goods (e-books) must be IAP; coffee or cinema cards are physical services.
  - The 3.2.1(vii) monetary-gift route requires "100% of the funds go to the receiver". Backing splits between a treat and a charity and adds a card fee on Free, so it may not fit.
  - App Review may also look at it under 5.3.
- **Families pledge and Teams pledge.**
  - Teams is sold to employers. 3.1.3(c) "Enterprise Services" covers apps "only sold directly by you to organizations", and the employer pays outside the app.
  - The charity pledge is funds for charities. If collected outside the app (invoice, web), 3.2.2(iv) is less of an issue.
  - A Families pledge entered in the app is the same issue as coins.
- **Plus membership.** Uses IAP, consistent with 3.1.1.

**Questions for counsel and App Review:**
21. Does in-app card collection of coins that go 100% to charity fall under 3.2.2(iv)? Must ScrollJar either (i) become or partner with an Apple-approved nonprofit platform where every listed charity is approved (and support Apple Pay), or (ii) collect coin funds only outside the app (Safari), as US-storefront link-outs now allow?
22. Should ScrollJar ask App Review in advance (an App Review Board inquiry or a pre-submission contact) to confirm the classification of coins: 3.1.3(e), 3.1.1, or 3.2.2(iv)?
23. Is a "month of Plus" as a Backing treat only possible through IAP gifting? If so, should the treat options be physical-service gift cards only?
24. Does Every.org (or another rail) hold Apple nonprofit approval or a Candid Seal for itself? Does that help, given that the guideline requires every **listed** nonprofit to be approved?

### 5.2 US anti-steering: Epic v. Apple, status on 2026-10-20

Verified on the Supreme Court docket:
- **Ninth Circuit:** decision **11 Dec 2025**, *Epic Games v. Apple*, 161 F.4th 1162 (No. 25-2935); rehearing denied 30 Mar 2026.
- **Stay applications:** Apple's application for a stay (No. **25A1213**) was "denied by Justice Kagan" on **6 May 2026**. A second application (No. **26A194**) to stay district-court proceedings was granted administratively on 12 Aug 2026, then "denied by Justice Kagan" on **13 Aug 2026**.
- **Certiorari, No. 25-1311:** petition filed 21 May 2026; "**Petition GRANTED limited to Question 1** presented by the petition" on **30 Jun 2026**.
  - Question 1: "Whether a court may hold a party in civil contempt based on a violation of an injunction's 'spirit' where the injunction is silent as to the conduct upon which contempt is based…".
  - Question 2 (the CASA / nationwide-scope question) was **not** granted.
  - Apple's merits brief was filed 14 Sep 2026; amicus briefs followed, including the United States "in support of neither party" on 21 Sep 2026.
  - "The time to file respondent's brief is extended to and including **November 13, 2026**."
  - The docket shows **no argument date** yet.
- URLs: https://www.supremecourt.gov/docket/docketfiles/html/public/25-1311.html · https://www.supremecourt.gov/docket/docketfiles/html/qp/25-01311qp.pdf · https://www.supremecourt.gov/docket/docketfiles/html/public/25a1213.html

**How this touches ScrollJar:**
- Today Apple's own guideline text allows US-storefront buttons and links (3.1.1(a)).
- The Supreme Court is reviewing the contempt finding. The case concerns commissions on linked-out purchases, so it reaches digital goods. A ruling (likely in 2027) could change Apple's US link-out terms.
- research-findings.md says "SCOTUS cert granted Jun 2026, in flux". That is accurate. It should add "limited to Question 1 (contempt based on an injunction's 'spirit'); respondent's brief due 13 Nov 2026; not yet argued".
- **Risk: Medium** for any plan that relies on US link-outs.

### 5.3 EU: Digital Markets Act alternative payment terms

Apple's "DMA and apps in the EU" page, read 2026-10-20 (https://developer.apple.com/support/dma-and-apps-in-the-eu/):
- "The Apple Developer Program License Agreement, updated August 18, 2026, introduced new business terms … **Effective October 1, 2026** … Apps distributed in the EU are now subject to a single set of terms … The Core Technology Fee … has been replaced by the Core Technology Commission, a simple 5% commission on digital transactions in apps distributed outside the App Store. The new terms also eliminate the Initial Acquisition Fee and Store Services Fee."
- App Store commission: **26%** on IAP (15% for Small Business Program and subscriptions after year 1). **20%** on alternative payment processing in-app (10% reduced). A store services commission of **15%** (10% reduced) applies to "out-of-app offer with an actionable link … Only sales made within 7 days of the link tap are subject to this commission."
- "developers offering payment options … must maintain those options for **12 months**."
- Child safety: "For users 13 years old to 17 years old, both alternative payment processing within the app and out-of-app purchase offers must be behind a parental gate."

**How this touches ScrollJar:** this affects only **Plus** (a digital service) in EU storefronts. Coins and donations are governed by 3.1.3 and 3.2.x, not by these commission terms. Families with teens would face the parental-gate rules if Plus is sold outside IAP. **Later market.**

### 5.4 Google Play, if Android comes later

Google Play Payments policy (https://support.google.com/googleplay/android-developer/answer/9858738):
- "Google Play's billing system **must not be used** in cases where: payment is primarily: for the purchase or rental of physical goods …; for the purchase of physical services …; … **payments include peer-to-peer payments, online auctions, and tax exempt donations**; payment is for content or services that facilitate online gambling".
- In-app features and subscriptions "must use Google Play's billing system".

**How this touches ScrollJar:** on Android, coin donations to 501(c)(3)s and physical-service gift cards would go **outside** Play billing; Plus would use Play billing. Note that Google's list includes "peer-to-peer payments", which is relevant to Backing.

---

## 6. What ScrollJar already does well on this topic (from the docs)

- **"Nothing goes back to the backer", "never cash", "never a bet".** This removes the "receive something of value" element that US gambling definitions need (NY PL §225.00(2)). It also avoids Stripe's prohibited gambling categories and P2P cash transfers.
- **Wish jars move no money** ("ScrollJar never touches the money"). This is the cleanest possible design for money-transmission purposes.
- **Teams Private Boost uses Every.org web checkout, outside IAP, so the employee gets their own receipt.** This is the direct-donation pattern that avoids pass-through, and it fits Apple 3.2.2(iv)'s "outside of the app".
- **Kids are never charged or paid; Backing is never for under-18s.** This avoids gift-card and payment issues with minors.
- **Card saved with a SetupIntent (`usage: off_session`, 3DS at save) and a plain-language mandate.** This matches the EU MIT model (SCA when the mandate is granted) and Visa's agreement and account-verification rules.
- **$50 monthly cap, 2× escalation ceiling, cap-collision guard, pre-settlement email, 48-hour refund, confirmation logs.** These define the "reasonable expectation" under PSD2 Art. 76 / UK reg. 79, support Reg E range notices, and help with disputes.
- **Jar-break rule "restated in Terms exactly as in-app", with a grace hour.** This matches Visa's requirement to disclose "the event that will prompt the Transaction".
- **Teams' employer exposure is "pre-committed and capped at the pledge".** This is good, if it is charged only on unlock rather than held (see 1.1(d)).
- **The spec already flags counsel review** of the Every.org flow, the gift-card partner and the "legal framing (a conditional gift)", and prize-promotion law per country (Q19).

---

## 7. Unverified, or for counsel to confirm

1. **Every.org partner terms.** No public terms page could be opened (www.every.org/terms returned 403). Ask whether Every.org (a) offers off-session, variable-amount charges on its own merchant account for a platform; (b) accepts platform-remitted funds and in whose name it issues receipts; (c) holds Apple nonprofit approval or a Candid Seal; (d) supports non-US donors.
2. **EBA Q&A 2018_4031** on merchant-initiated transactions being outside SCA: the page could not be opened (403). The EBA/ECB 2025 fraud report statement was used instead.
3. **PSD3/PSR final text and application dates.** Not adopted as of 2026-10-20 (EP: awaiting the Council's first-reading position; indicative plenary 14 Dec 2026). The exact changes to the commercial-agent and limited-network exclusions, and the transposition period, are not verified.
4. **Which US states have adopted the Money Transmission Modernization Act**, and their agent-of-payee wording. Not checked.
5. **California Civil Code §1749.5(b)(2) threshold** ($15 per the public.law mirror; older sources say $10). Confirm on leginfo, which was blocked here.
6. **Delaware unclaimed-property treatment of gift cards and of amounts owed to app users.** Not checked; this matters for the entity choice.
7. **Italy:** DPR 430/2001 **art. 6** exclusions (for example benefits to charitable or public bodies), Codice penale **arts. 718–721** (gioco d'azzardo, defined by profit aim and chance), and Codice civile **art. 1933**. Not verified: Normattiva was unreachable and Legal Data Hunter hit its daily limit. Also unverified: Italy's PSD2 transposition (D.Lgs. 11/2010 as amended) and the ADM's view of "skill-based" or self-directed stakes.
8. **stickK's framing** of commitment contracts and any gambling disclaimer: the site returned 403.
9. **Whether Reg E §1005.10 applies** when the card is a credit card. It doesn't (Reg Z applies), but users often can't tell. Comment 10(b)-7 offers a bona-fide-error defence if ScrollJar asks whether the card is debit or credit.
10. **Commercial co-venturer registration and Italy Law 120/2026** (charity-linked commerce): this is outside L2's scope and presumably covered by another helper. It interacts directly with the flow-of-funds choice in §1.3.
11. **UK subscription-contract rules** (Digital Markets, Competition and Consumers Act 2024, Part 4 Chapter 2) and **US state automatic-renewal laws**: these may touch Plus (sold through Apple IAP) and possibly the monthly settlement. Not researched.
12. **Australia** has later IGA compilations than 14 Oct 2024. The definition quoted is unlikely to have changed, but this is not verified.

---

## 8. Sources opened (all read 2026-10-20)

- 31 CFR 1010.100: https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-A/section-1010.100
- FinCEN FIN-2019-G001: https://www.fincen.gov/sites/default/files/2019-05/FinCEN%20Guidance%20CVC%20FINAL%20508.pdf
- 12 CFR 1005.2 / 1005.3 / 1005.10 / 1005.11 / 1005.20 and Supplement I: https://www.ecfr.gov/current/title-12/chapter-X/part-1005
- 12 CFR 1026.13: https://www.ecfr.gov/current/title-12/chapter-X/part-1026/subpart-B/section-1026.13
- 15 U.S.C. 1693l-1: https://www.law.cornell.edu/uscode/text/15/1693l-1
- 31 U.S.C. 5362: https://www.law.cornell.edu/uscode/text/31/5362
- Cal. Fin. Code 2003, 2010; Cal. Penal Code 319; Cal. Civ. Code 1749.5; Cal. CCP 1520.5 (public.law mirrors of leginfo): https://california.public.law/codes/
- N.Y. Banking Law 641; N.Y. Penal Law 225.00 (public.law mirrors of nysenate.gov): https://newyork.public.law/laws/
- PSD2, EMD2, RTS 2018/389 (Publications Office cellar): https://publications.europa.eu/resource/celex/32015L2366 · /32009L0110 · /32018R0389
- EP Legislative Observatory 2023/0210(COD): https://oeil.secure.europarl.europa.eu/oeil/en/procedure-file?reference=2023/0210(COD)
- Matheson on PSD3/PSR (secondary): https://www.matheson.com/insights/psd3-and-psr-published-whats-changing-for-eu-payment-services/
- EBA/ECB 2025 Report on Payment Fraud: https://www.eba.europa.eu/sites/default/files/2025-12/1709846a-84d9-47cf-86a0-b155efb34d66/EBA%20and%20ECB%20Report%20on%20Payment%20Fraud.pdf
- UK PSRs 2017 Sch 1 Pt 2, regs 79–80; EMRs 2011 regs 2–3; Gambling Act 2005 ss 6, 9, 14, 339, Sch 2: https://www.legislation.gov.uk/
- Interactive Gambling Act 2001 (Cth) compilation C2024C00646: https://www.legislation.gov.au/Details/C2024C00646
- DPR 430/2001 art. 1: https://www.normattiva.it/eli/id/2001/12/13//001G0490/CONSOLIDATED
- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple Pay for Donations: https://developer.apple.com/apple-pay/nonprofits/
- Apple DMA page: https://developer.apple.com/support/dma-and-apps-in-the-eu/
- Supreme Court dockets 25-1311, 25A1213 and the QP: https://www.supremecourt.gov/docket/docketfiles/html/public/25-1311.html
- Google Play Payments policy: https://support.google.com/googleplay/android-developer/answer/9858738
- Visa Core Rules (18 Apr 2026): https://usa.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf
- Stripe Connect charges: https://docs.stripe.com/connect/charges · Stripe prohibited and restricted businesses: https://stripe.com/legal/restricted-businesses
- Every.org API docs: https://docs.every.org/docs/intro · https://docs.every.org/docs/donate-link
- Forfeit Terms: https://forfeit.app/terms · Beeminder contract: https://www.beeminder.com/contract

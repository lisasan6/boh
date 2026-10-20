# L3 findings: privacy, data protection and children (global)

Helper L3 · researched 2026-10-20 · **This is research to prepare questions for counsel. It is not legal advice and does not say that anything is "legal" or "compliant".**

Source notes: EUR-Lex returned a bot-challenge (HTTP 202) to every request, so EU GDPR text is quoted from legislation.gov.uk's **"Original (As adopted by EU)"** version (`/eur/2016/679/article/N/adopted`), which reproduces the Official Journal text. CJEU judgments were read via the Legal Data Hunter mirror of EUR-Lex/CURIA. federalregister.gov blocks scripts, so the COPPA Federal Register notice was read on govinfo.gov. Where only a law-firm memo or news source was available, it is marked **(secondary)**.

Risk levels: **High** = could block launch or create real liability · **Medium** = needed at or near launch · **Low** = later markets / housekeeping.

---

## 0. The ten questions that matter most (summary for counsel)

1. **GDPR from day one (High).** If the founder runs the company from Italy (even for a Delaware entity), is there an "establishment" in the EU under GDPR Art. 3(1), so that GDPR covers *all* users worldwide, US users included? (§1.1)
2. **Health / special-category data (High).** Are mood check-ins, the "feelings" onboarding answer, the on-device "something heavy" word list, rough-day features, the planned efficacy study, and the **charity choice** (which can show religion or politics) special-category data under GDPR Art. 9, and "consumer health data" under Washington's My Health My Data Act (which allows private lawsuits)? (§1.3, §3.2)
3. **Families = a service for children (High).** Families collects data from children under 13 on their own iPhones and sends a **child's name to Every.org** for the receipt. That means COPPA verifiable parental consent, which since 22 April 2026 requires *separate* consent for disclosures to third parties. In Italy, GDPR Art. 8 + Codice art. 2-quinquies put the age at 14. (§2.1, §2.2)
4. **Teams in Germany/EU (High for EU Teams sales).** Do aggregate-only dashboards still trigger works-council co-determination (BetrVG §87(1) no. 6) and an employment-context DPIA? Is "groups under 5 hidden" enough against differencing (someone joins or leaves a 5-person squad)? (§4)
5. **Transfers to the US (Medium).** Each US processor (Formspree, host, Supabase, Stripe, Every.org, email service) needs an Art. 28 contract and a transfer tool (DPF certification or SCCs). The DPF survived the General Court on 3 Sept 2025, but **an appeal is pending before the Court of Justice (C-703/25 P)**. (§1.5)
6. **EU/UK representative (Medium).** If the entity is US-only *and* there is no EU establishment, Art. 27 needs a written EU representative; the UK needs its own. If the founder's presence *is* an establishment, Art. 27 does not apply, but GDPR applies in full. (§1.6)
7. **US app-store age laws (Medium–High for US launch).** Texas SB 2420 (App Store Accountability Act) has **duties for app developers**: age-rating each app and purchase, using the app store's age and consent signal, and giving notice before privacy-policy changes. A district court enjoined it in Dec 2025, but the Fifth Circuit stayed that injunction (June 2026) and the Supreme Court refused to vacate the stay (July 2026) **(secondary: CCIA)**. Is it enforceable now, and what must ScrollJar build? (§2.4)
8. **The efficacy study + mood check-ins (High if built).** Apple 5.1.3(iii)–(iv) requires informed consent (a parent's for minors) and **independent ethics board approval** for health-related human-subject research, and GDPR Art. 9 needs explicit consent. (§1.3, §2.7)
9. **Website privacy notice gaps (Medium, fix before the waitlist goes live).** No controller name or address yet, no transfer mechanism named, host not named, incomplete rights list, wrong legal basis for server logs and Teams emails, and a CASL mailing-address gap. (§6)
10. **Cross-topic flag, not privacy:** App Review Guideline **4.10** says: "You may not monetize built-in capabilities provided by the hardware or operating system … or Apple services and technologies, such as … Screen Time APIs." Ask counsel or App Review how this reads against Plus and Teams, which are paid features built on Screen Time. https://developer.apple.com/app-store/review/guidelines/ (High; pass to the Apple/payments helper.)

---

## 1. EU GDPR, UK GDPR, ePrivacy, Italy

### 1.1 Does GDPR apply from day one? (High)

**Rule.** GDPR (Reg. (EU) 2016/679, in force 24 May 2016, applies since 25 May 2018), Art. 3:
- Art. 3(1): "This Regulation applies to the processing of personal data in the context of the activities of an establishment of a controller or a processor in the Union, regardless of whether the processing takes place in the Union or not."
- Art. 3(2): it also applies to a non-EU controller processing data of "data subjects who are in the Union" where processing relates to "(a) the offering of goods or services … to such data subjects in the Union; or (b) the monitoring of their behaviour as far as their behaviour takes place within the Union."
URL: https://www.legislation.gov.uk/eur/2016/679/article/3/adopted

**EDPB Guidelines 3/2018 on territorial scope (final, adopted 12 Nov 2019):** "The threshold for 'stable arrangement' can actually be quite low when the centre of activities of a controller concerns the provision of services online. As a result, in some circumstances, the presence of one single employee or agent of a non-EU entity in the Union may be sufficient to constitute a stable arrangement (amounting to an 'establishment' for the purposes of Art 3(1)) if that employee or agent acts with a sufficient degree of stability." Its Example 10 says a US news app "exclusively directed at the U.S. market, evident by the app terms of use and the indication of US Dollar as the sole currency" is not subject to GDPR for a US tourist in Europe.
URL: https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_1.pdf

**How it touches ScrollJar.** The founder designs the product, runs the waitlist, answers hello@scrolljar.app and will run the backend from Italy. Under either entity option:
- **Italian entity:** GDPR applies to everything under Art. 3(1), including US users.
- **Delaware entity run by an Italy-based founder:** the founder may be the "stable arrangement". Then Art. 3(1) also covers all processing "in the context of" those activities, worldwide.
- Even with no establishment, Art. 3(2) catches EU users once the app is offered in EU App Store storefronts or the site targets EU visitors. Behaviour monitoring (Art. 3(2)(b)) is also arguable: shield events, tricky-hours maps and override timestamps are behavioural data.
- The **website waitlist already collects EU emails today.** The privacy page already treats GDPR as applying, which is consistent.

**Questions for counsel.**
- With a Delaware entity and an Italy-resident founder doing product, ops and support, is there an EU establishment under Art. 3(1)? If so, does GDPR then cover US-only users too?
- If the app launches in the US App Store only at first (USD only, US terms), does the founder's presence alone still bring US users under GDPR?
- Which supervisory authority would lead (the Garante if the main establishment is in Italy)?

### 1.2 Lawful bases (Medium)

**Rule.** Art. 6(1) bases. Consent ("freely given, specific, informed and unambiguous", Art. 4(11)) can be withdrawn at any time, and "It shall be as easy to withdraw as to give consent" (Art. 7(3)). Art. 7(4) says that when judging whether consent is free, "utmost account shall be taken of whether … the performance of a contract … is conditional on consent to the processing of personal data that is not necessary for the performance of that contract."
URLs: https://www.legislation.gov.uk/eur/2016/679/article/4/adopted · https://www.legislation.gov.uk/eur/2016/679/article/7/adopted

**Feature mapping to test with counsel:**

| Processing | Likely candidate basis | Note |
|---|---|---|
| Account, deals metadata, events, monthly settlement, Stripe card, Every.org donation | Contract (6(1)(b)) | Deal is a contract the user makes |
| Pre-settlement email, receipts | Contract / legal obligation | |
| Charity choice + donation history | Contract **plus Art. 9 check** (§1.3) | |
| Tricky-hours map and heads-up (Plus) | Contract or consent | Built from behaviour; profiling-like |
| Mood check-ins (v1.5) and efficacy study | **Explicit consent** (9(2)(a)) | Research use |
| Waitlist email | Consent (as the page says) | |
| Server and host logs | Legitimate interests (6(1)(f)) | Notice currently says only "consent" |
| Teams: employee participation | **Not consent from the employer side**; see §4 | |
| Backing a friend: backer sees "days kept" count | Contract with both? Consent of the backed friend (the offer can be declined) | Data *about* B goes to A |

### 1.3 Special-category data: is wellbeing data "health data"? (High)

**Rule.**
- Art. 9(1) prohibits processing of data "revealing … political opinions, religious or philosophical beliefs … data concerning health" unless an Art. 9(2) exception applies, such as "(a) the data subject has given explicit consent".
- Art. 4(15) defines "'data concerning health' means personal data related to the physical or mental health of a natural person, including the provision of health care services, which reveal information about his or her health status".

URLs: https://www.legislation.gov.uk/eur/2016/679/article/9/adopted · https://www.legislation.gov.uk/eur/2016/679/article/4/adopted

**CJEU, C-21/23 *Lindenapotheke*, Grand Chamber, 4 Oct 2024**, para 83: "in order for personal data to be classified as data concerning health … it is sufficient that they are capable of revealing information about the health status of the data subject by means of an intellectual operation involving collation or deduction". Para 90 adds that this holds "even where it is only with a certain degree of probability, and not with absolute certainty".
URL: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62023CJ0021 (read via Legal Data Hunter, source EU/CURIA 62023CJ0021)

**ScrollJar features at risk:**
- **On the phone only, by design:**
  - `feelAfter` (how you feel when the time has gone)
  - Diary entries and voice notes
  - Letters to your future self
  - Onboarding speech (transcribed on-device and then deleted)
  - The **"something heavy" word list** (`HEAVY`), which detects distress and shows a helpline card
- **Server-side or planned:**
  - **Optional mood check-ins (v1.5) that "feed the future efficacy study"** (spec §8)
  - Rough-day check-ins after an expensive day
  - "Pattern insight" ("your coins drop after 10pm on Sundays")
  - Teams **wellbeing pulse** (2-question anonymous survey, Teams spec §80)
  - The Teams pitch as a "mental-health benefit"
- **Charity choice:** a user's chosen charity (a church, a mosque, a political or advocacy group, an LGBTQ+ charity, an addiction-recovery charity) can reveal religion, politics, sexual orientation or health, "by means of an intellectual operation involving collation or deduction". The charity ID sits on the backend (Deal.charityId, JarMonth with Every.org receipt). Teams voting on a cause is the same issue.
- **Override and peek counts with timestamps:** behavioural, not health on their own. But combined with a "self-control app" context and rough-day features, ask whether they reveal mental-health status.

**Questions for counsel.**
- Is processing that stays entirely on the user's device and that ScrollJar can never access (diary, `feelAfter`, the HEAVY list, onboarding speech) "processing" by ScrollJar as controller at all? If yes, does it need an Art. 9(2) exception?
- Are server-side mood check-ins, the rough-day flow and the pulse survey "data concerning health" after *Lindenapotheke*? If so, should the basis be explicit consent with a separate toggle?
- Is a user's chosen charity special-category data? Should ScrollJar treat every charity ID as sensitive (minimise, encrypt, restrict staff access, avoid analytics on it)? What goes into the Every.org donation record?
- Does the efficacy study need explicit consent + Art. 89 safeguards, and an ethics board (see Apple 5.1.3 in §2.7)?

### 1.4 DPIA (Medium–High)

**Rule.**
- Art. 35(1) requires a DPIA where processing "in particular using new technologies … is likely to result in a high risk". Art. 35(3)(b) names "processing on a large scale of special categories of data".
  URL: https://www.legislation.gov.uk/eur/2016/679/article/35/adopted
- WP29/EDPB WP248 rev.01 (endorsed by the EDPB 25 May 2018) lists criteria. It names "Data concerning vulnerable data subjects … Vulnerable data subjects may include children … employees". Another criterion is "Sensitive data or data of a highly personal nature".
  URL: https://ec.europa.eu/newsroom/article29/redirection/document/47711
- The Garante's Art. 35(4) list (decision of 11 Oct 2018) confirms that a DPIA is required where "two or more" of the WP248 criteria are met ("il ricorrere di due o più dei predetti criteri è indice di un trattamento che presenta un rischio elevato").
  URL: https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9058979

**ScrollJar.** Families (children), Teams (employees), behavioural data, possible health/wellbeing data, a novel technology (Screen Time + money stakes), and the Wobble and backing features (data about one user shown to another). Several criteria stack up.

**Question.** Should ScrollJar run one DPIA per module (core app, Families, Teams, Backing, efficacy study) before each launch? Note also that the UK Children's Code (standard 2) and Quebec Law 25 s. 3.3 require impact assessments.

### 1.5 International transfers (Medium)

**Rule.**
- **EU–US Data Privacy Framework:** the Commission adopted Implementing Decision (EU) 2023/1795 on 10 July 2023. The Commission page says: "personal data can flow freely from the EU to companies in the United States that participate in the Data Privacy Framework."
  URL: https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en
- **General Court, T-553/23 *Latombe v Commission*, 3 Sept 2025:** the action seeking annulment of Decision 2023/1795 was heard by the Tenth Chamber, Extended Composition, and the challenge was dismissed.
  URL: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62023TJ0553
- **Appeal:** lodged 31 Oct 2025 and pending before the Court of Justice as **C-703/25 P** (secondary: WilmerHale, 1 Dec 2025: "the European Court of Justice may soon weigh in again following French politician Philippe Latombe's appeal on October 31, 2025").
  URL: https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20251201-european-court-of-justice-to-review-challenge-to-eu-us-data-privacy-framework
  I found no judgment or AG opinion as of 2026-10-20 (unverified at CURIA, whose search page did not load).
- **Processors:** Art. 28(3): "Processing by a processor shall be governed by a contract or other legal act … that is binding on the processor". Art. 13(1)(f) requires the notice to state the intention to transfer and "the existence or absence of an adequacy decision" or the safeguards relied on.
  URLs: https://www.legislation.gov.uk/eur/2016/679/article/28/adopted · https://www.legislation.gov.uk/eur/2016/679/article/13/adopted

**Processors and recipients to paper:**

| Party | What it handles | What I found |
|---|---|---|
| **Formspree** (waitlist) | Email, list, IP | Its privacy policy is "Last updated: April 24, 2022". It relies on contract necessity: "we need to transfer your personal information to the US … to provide the Services". It does not mention the DPF or SCCs. `formspree.io/legal/data-processing-agreement/` returned 404. **No DPA located.** https://formspree.io/legal/privacy-policy/ |
| **Web host** (Netlify or Cloudflare Pages per `deploy/build.sh`) | IP logs | Unnamed on the privacy page |
| **Supabase / Postgres host** (US) | Accounts, events, jar data | Planned (IOS-BUILD-SPEC §5) |
| **Stripe** | Card, mandate | Stripe publishes a DPA page that references the Data Privacy Framework: https://stripe.com/legal/dpa. Ask whether Stripe is a processor or an independent controller for fraud and KYC. |
| **Every.org** | Donor name, amount, charity; **a child's name on Families receipts** | every.org/privacy returned 403. Likely an **independent controller** (it issues the tax receipt), so this is a disclosure, not processing on ScrollJar's behalf. |
| **Gift-card rewards API** (backing a friend) | Friend's name or email for the card | Not chosen yet |
| **Apple** (IAP, APNs, Family Sharing, speech) | IAP and push | Apple is an independent controller for IAP; ScrollJar is controller for push tokens it stores |
| **Email service** (launch email, pre-settlement email) | Emails | Not chosen yet; the page promises to name it before use |

**Questions.**
- Which processors are DPF-certified? (The DPF list at dataprivacyframework.gov is script-rendered and I could not query it.)
- For those that are not, are SCCs (2021/914) in place?
- Should ScrollJar choose EU hosting for Supabase to reduce transfer exposure, given the pending C-703/25 P appeal?
- Is Every.org a recipient or controller (disclosure), and on what basis is a child's name sent to it?

### 1.6 EU representative (Art. 27) and UK representative (Medium)

**Rule.**
- Art. 27(1): "Where Article 3(2) applies, the controller or the processor shall designate in writing a representative in the Union."
- Exception in Art. 27(2)(a): processing "which is occasional, does not include, on a large scale, processing of special categories … and is unlikely to result in a risk".

URL: https://www.legislation.gov.uk/eur/2016/679/article/27/adopted

**ScrollJar.** Art. 27 applies only if the controller is **not** established in the EU. A Delaware entity with an Italy-based founder may already be "established" (§1.1); then Art. 27 does not apply, but GDPR applies through Art. 3(1). App usage is continuous, not occasional, so the exception looks unlikely to fit. A UK representative is needed separately under UK GDPR Art. 27 if the controller has no UK establishment.

**Question.** Which is it? Pick one coherent story: an Italian establishment, or a US entity with EU and UK representatives.

### 1.7 ePrivacy (website and app) (Low for the website, Medium for the app)

**Rule.** The ePrivacy Directive 2002/58/EC Art. 5(3) (EUR-Lex unreachable) is implemented in Italy by Codice privacy art. 122: "L'archiviazione delle informazioni nell'apparecchio terminale di un contraente o di un utente o l'accesso a informazioni già archiviate sono consentiti unicamente a condizione che il contraente o l'utente abbia espresso il proprio consenso … Ciò non vieta l'eventuale archiviazione tecnica … se finalizzati" (it then lists strictly necessary purposes).
Codice (testo coordinato), Garante PDF: https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9042678

**Website check (I looked at the code):**
- `landing/site.js`, `prototype/app.js` and `prototype/index.html` contain no `localStorage`, `sessionStorage`, IndexedDB or `document.cookie`.
- The only third-party call is the Formspree `fetch` on submit.
- The source pages load Google Fonts. `deploy/build.sh` rewrites them to self-hosted fonts and **fails the build** if any Google Fonts link remains, so the claim "The fonts are served from this site" holds only for the built `dist/`.
- **Keep deploying only through build.sh.**

**App.** Device storage (App Group state, diary, signature, letters) appears to fall under the strictly-necessary exemption because the user requested it. Any analytics or crash SDK writing identifiers would need consent.

**Question.** Confirm that on-device storage of features the user asked for is exempt, and that ScrollJar keeps no analytics SDK (consistent with "no engagement metrics for our own app").

### 1.8 Italy specifics (Garante) (Medium)

- **Child consent age 14.** Codice art. 2-quinquies(1): "il minore che ha compiuto i quattordici anni può esprimere il consenso al trattamento dei propri dati personali in relazione all'offerta diretta di servizi della società dell'informazione". Under 14, consent-based processing is lawful only if given by "chi esercita la responsabilità genitoriale". Art. 2-quinquies(2) requires information in "linguaggio particolarmente chiaro e semplice … comprensibile dal minore". The Garante page confirms: "In Italia il limite è fissato a 14 anni".
  URLs: Codice PDF above · https://www.garanteprivacy.it/temi/minori
- **Employee monitoring.** Codice art. 114: "Resta fermo quanto disposto dall'articolo 4 della legge 20 maggio 1970, n. 300" (Statuto dei lavoratori, remote monitoring). I did not open the text of art. 4 (normattiva reset the connection). Ask counsel (§4).
- **Marketing email.** Codice art. 130(1)–(2): automated communications for advertising or direct sales, including "mediante posta elettronica", are allowed "con il consenso del contraente o utente". The waitlist relies on consent, which is consistent.
- **Italian-language notice.** For an Italian launch, Art. 12(1) requires information "in a concise, transparent, intelligible and easily accessible form, using clear and plain language, in particular for any information addressed specifically to a child".
  URL: https://www.legislation.gov.uk/eur/2016/679/article/12/adopted

### 1.9 Child consent ages under GDPR Art. 8 (High for Families and teens)

**Rule.** Art. 8(1): where consent is the basis "in relation to the offer of information society services directly to a child", processing is lawful "where the child is at least 16 years old". Below that, consent must be "given or authorised by the holder of parental responsibility". "Member States may provide by law for a lower age … not below 13 years." Art. 8(2): the controller "shall make reasonable efforts to verify … taking into consideration available technology."
URL: https://www.legislation.gov.uk/eur/2016/679/article/8/adopted

- **Verified:** Italy 14 (above).
- **UK GDPR Art. 8:** "at least [13 years old]".
  URL: https://www.legislation.gov.uk/eur/2016/679/article/8
- **Other member states:** not verified one by one (see Unverified). The often-cited spread is 13–16.
- Art. 8 matters only where **consent** is the basis. Contract-based processing for teens raises the separate question of whether a minor can contract (Art. 8(3) leaves that to national contract law).

**ScrollJar.**
- Teens using the core app with a card on file is a minor-capacity issue: a minor making a contract and paying stakes. The spec says "Under-18s are never charged" for Families. Is the **core app** 18+? The spec targets "students, Gen Z" and cites US teen iPhone ownership.
- **Families:** kids under 13 or 14 need parental authorisation for any consent-based processing.

**Questions.**
- Will the core stakes product be 18+ only, with age gating via Apple's Declared Age Range API?
- For Families, is the basis contract with the parent, or consent? If consent, use the per-country Art. 8 age table.

### 1.10 UK specifics (Medium)

- UK GDPR Art. 8 age is 13 (above).
- **Data (Use and Access) Act 2025 s. 81** adds UK GDPR Art. 25(1A)–(1B): for "information society services which are likely to be accessed by children" the controller "must take into account the children's higher protection matters". **In force 5 Feb 2026** (S.I. 2026/82, reg. 2(k)) per legislation.gov.uk commencement note.
  URL: https://www.legislation.gov.uk/ukpga/2025/18/section/81
- The ICO Children's Code is covered in §2.3.

---

## 2. Children

### 2.1 US COPPA (FTC rule, amended 2025) (High for Families)

**Rule.** 16 CFR Part 312, "as amended at 90 FR 16977, Apr. 22, 2025".
- **Effective date:** 23 June 2025.
- **Compliance date:** "Except with respect to Sec. 312.11(d)(1), (d)(4), and (g), regulated entities have until April 22, 2026 to comply." The compliance date has **passed**, so the amended rule now applies in full.

URLs: eCFR https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312 · FR notice (90 FR 16918) https://www.govinfo.gov/content/pkg/FR-2025-04-22/html/2025-05904.htm

**Key text:**
- "Child means an individual under the age of 13." (§312.2)
- Who is covered: "any operator of a website or online service directed to children, or any operator that has actual knowledge that it is collecting or maintaining personal information from a child" (§312.3).
- Factors for "directed to children" include "subject matter, visual content, use of animated characters or child-oriented activities and incentives … the age of users on similar websites or services" (§312.2).
- Disclosure: "An operator must give the parent the option to consent to the collection and use of the child's personal information without consenting to disclosure of his or her personal information to third parties, unless such disclosure is integral to the website or online service. An operator required to give the parent this option must obtain **separate verifiable parental consent** to such disclosure." (§312.5(a)(2))
- Retention: "Personal information collected online from a child may not be retained indefinitely … the operator must establish, implement, and maintain a written data retention policy". The policy must appear in the online notice (§312.10).
- A "written information security program" is required (§312.8(b)).
- "Personal information" includes a "biometric identifier … voiceprints … facial templates" (§312.2(10)) and persistent identifiers.

**How it touches ScrollJar Families:**
- Kids have their own iPhones under Apple Family Sharing, choose apps to shield, have scroll-free hours counted and **pick a cause**. The jar shows "each kid's name on their receipt" (`landing/families.html`). The design is an animated jar character with moods, and the prototype has a "Mia" kid view. All of this is collection from children under 13 with actual knowledge.
- **The child's name goes to Every.org** for the receipt. That is a disclosure to a third party, so it needs **separate VPC** unless it is "integral". Ask whether the receipt can carry the parent's name with the kid's name on-device only.
- Wobble, standby notes and the family board are communications among family members. Can a child post free text visible to others? "Making personal information publicly available" counts as collection.
- **Onboarding speech and Diary voice notes:** an audio file of a child's voice is personal information. They stay on the device, and onboarding audio is deleted at once. Ask whether never-transmitted data is "collected" by the operator.
- **Finger signature image** (stays on the phone): same question.
- Approved VPC methods are listed in §312.5(b), including government-ID-plus-face-match and knowledge-based authentication. The FTC has not approved Apple Family Sharing parent approval as such a method (not found in the rule text).

**Questions for counsel.**
- Is Families "directed to children" (or "mixed audience") under COPPA? Which VPC method fits an iOS Family Sharing flow?
- Can ScrollJar avoid sending any child's name off the device? (Receipts in the parent's name, with the kid's name added locally.)
- What written retention policy and security program are needed?
- Is the core (non-Families) app "directed to children"? It should not be: no "For Kids" wording and the 18+ stakes. Then only actual knowledge triggers COPPA.

### 2.2 EU and Italy children rules (High for Families in the EU)

- Art. 8 and Codice 2-quinquies (above): parental authorisation under 14 in Italy. Information must be child-readable.
- **DSA Art. 28 minors guidelines (Commission, published 14 July 2025):** "The guidelines will apply to all online platforms accessible to minors, with the exception of micro and small enterprises." Recommendations include "Disabling by default features that contribute to excessive use, like communication 'streaks,' … 'read receipts,' … or push notifications" and protections against "certain virtual currencies". The Commission "will use these guidelines to assess compliance with Article 28(1) of the DSA". Following them "is voluntary and does not automatically guarantee compliance."
  URL: https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-protection-minors
  - **ScrollJar relevance:** Board (shared jars, notes), creator public challenges and Teams notes may make ScrollJar an "online platform" under the DSA, which means it hosts *and disseminates to the public*. The micro/small enterprise exclusion probably covers ScrollJar now.
  - Several ScrollJar choices already line up with the guidelines: "No variable rewards", no leaderboards, no read receipts on the Wobble, and "No streaks or rewards" for diary notes. But **day streaks** ("7 days in a row" share card) and **push heads-ups** for minors deserve a look. So do virtual **coins** for minors.
  - **Question:** Is ScrollJar an "online platform" under the DSA (public challenges are visible to non-members)? When would it stop qualifying for the micro/small exclusion?

### 2.3 UK Age Appropriate Design Code (ICO Children's Code) (Medium for UK)

**Rule.** The code (issued under DPA 2018 s. 123, in force since 2 Sept 2020; date not re-verified) "applies to 'information society services likely to be accessed by children' in the UK … It is not restricted to services specifically directed at children." Children here means under 18. It has 15 standards. Examples:
- "Settings must be 'high privacy' by default"
- "Switch options which use profiling 'off' by default"
- "If your online service allows a parent or carer to monitor their child's online activity … provide an obvious sign to the child when they are being monitored"
- "Do not use nudge techniques to lead or encourage children to provide unnecessary personal data"

URLs: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/services-covered-by-this-code/ · …/code-standards/

**Territorial note (verified on the ICO page):** "If you don't have a UK establishment, but do have an establishment elsewhere in the EEA this code does not apply (even if you offer your service to UK users …)". This wording predates Brexit and may be out of date. **Ask counsel whether it still holds for an Italian entity.**

**ScrollJar.**
- Families shows parents the kids' scroll-free hours. That is monitoring, so the code wants an obvious sign to the child. The design is already "the family sees the jar, not each other's screens".
- The **tricky-hours map** is profiling, and it is Plus-only. Should it be off by default for teens?
- The core app is "likely to be accessed" by 13–17s unless it is gated to 18+.

### 2.4 US state children's and age laws (Medium–High)

- **California Age-Appropriate Design Code Act (Civ. Code §1798.99.28 et seq.) (secondary: Cooley, 24 Mar 2026).** On 12 March 2026 the Ninth Circuit (No. 25-2366) narrowed the injunction.
  - "allows several of the statute's substantive obligations to take effect while litigation continues"
  - Still enjoined: the DPIA requirement, the 90-day cure provision, the data-use restrictions in §1798.99.31(b)(1)–(4), and the dark-patterns ban in (b)(7)
  - No longer enjoined: the age-estimation duty in §1798.99.31(a)(5), "estimate the age of child users … or apply the child-level privacy and data protections to all consumers"
  - Remanded on severability

  URL: https://www.cooley.com/news/insight/2026/2026-03-30-netchoice-v-bonta-ninth-circuit-narrows-injunction-against-californias-ageappropriate-design-code-act
  **Question:** What is the status after remand (Oct 2026), and do the parts in force (age estimation, high-privacy defaults, privacy information) apply to ScrollJar as a "business" under the CCPA thresholds? (The CAADCA uses the CCPA "business" definition; ScrollJar likely falls below it at launch, see §3.1.)
- **Texas SB 2420, App Store Accountability Act (Bus. & Com. Code ch. 121), effective 1 Jan 2026.** Subchapter C, "Duties of Software Application Developers":
  - Developers "shall assign to each software application and to each purchase that can be made through the software application an age rating" (§121.052).
  - They must notify app stores "before making any significant change to the terms of service or privacy policy", which includes changes to "the type or category of personal data collected" and "new monetization features" (§121.053).
  - They "shall create and implement a system to use information received [from the app store] to verify … the age category assigned to that user … and for each minor user … whether consent has been obtained" (§121.054).
  - App-store age data may be used only for age-related restrictions, legal compliance and safety features (§121.055).

  URL: https://capitol.texas.gov/tlodocs/89R/billtext/html/SB02420F.htm
  **Status (secondary, CCIA litigation page):** preliminary injunction granted 23 Dec 2025. "June 2026 – The Fifth Circuit formally entered a stay of the injunction, meaning that SB 2420 could take effect." "July 2026 – The Supreme Court denied the emergency application and declined to vacate the stay." The appeal is pending.
  URL: https://ccianet.org/litigation/ccia-v-paxton-w-d-tex/
  **Question:** Is SB 2420 enforceable today? If so, ScrollJar needs app-level and purchase-level age ratings (memberships, coins, backing), a flow that checks Apple's age and consent signals for Texas minors, and a notice process before privacy-policy changes.
- **Other state laws:** Utah's app store act, California AB 1043 (Digital Age Assurance Act), Louisiana, the New York Child Data Protection Act, the Maryland Kids Code and the Vermont AADC are **not verified**; see the Unverified list.

### 2.5 Brazil (later market) (Low now, High before a Brazil launch of Families)

- **LGPD (Lei 13.709/2018) art. 14:** children's data "deverá ser realizado em seu melhor interesse". Under 12s need "consentimento específico e em destaque dado por pelo menos um dos pais" (§1º). Controllers must make "todos os esforços razoáveis para verificar" that consent (§5º), and must not condition app use on more data than "estritamente necessárias" (§4º).
  URL: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- **ECA Digital (Lei 15.211, 17 Sept 2025), Estatuto Digital da Criança e do Adolescente.** "Esta Lei entra em vigor em 17 de março de 2026" (art. 41-A, inserted by Lei 15.352/2026). It applies to products "direcionado a crianças e a adolescentes no País ou de acesso provável por eles, independentemente de sua localização". Art. 40 requires foreign providers to keep a "representante legal no País". It includes parental-supervision duties and a ban on self-declaration for certain age checks ("vedada a autodeclaração").
  URL: https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15211.htm
  **Question:** Before any Brazil storefront, does ScrollJar (core or Families) fall under the ECA Digital? It needs a legal representative in Brazil.

### 2.6 Australia (later market) (Low now)

- The **Children's Online Privacy Code** exposure draft was released **31 March 2026**. Submissions have closed, and "The final Code must be registered by 10 December 2026" (OAIC).
  URL: https://www.oaic.gov.au/engage-with-us/consultations/draft-childrens-online-privacy-code-consultation-for-industry,-civil-society,-academia
  Commencement date not confirmed.
- **Small business exemption (OAIC):** "Most small businesses are not covered by the Privacy Act 1988, but some are. A small business is one with an annual turnover of $3 million or less." Exceptions include health service providers.
  URL: https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business
- **Question:** Would ScrollJar be under the A$3m exemption, and does any exception (e.g. "health service provider" for wellbeing features) remove it? Would the Children's Code apply to an app "likely to be accessed by children"?

### 2.7 Apple rules for kids, privacy and health (High; App Review gate)

App Store Review Guidelines (current page): https://developer.apple.com/app-store/review/guidelines/
- **1.3 Kids Category:** apps "must not include links out of the app, purchasing opportunities, or other distractions to kids unless reserved for a designated area behind a parental gate". "Kids Category apps may not send personally identifiable information or device information to third parties." **Do not put ScrollJar in the Kids Category.**
- **2.3.8 (as restated in 5.1.4):** "Apps not in the Kids Category cannot include any terms in app name, subtitle, icon, screenshots or description that imply the main audience for the app is children." **Families copy in App Store metadata must not make kids the main audience.**
- **5.1.4 Kids:** apps that collect personal information "from a minor must include a privacy policy and must comply with all applicable children's privacy statutes". "The parental gate requirement for the Kid's Category is generally not the same as securing parental consent to collect personal data under these privacy statutes."
- **5.1.1(ii):** "Apps that collect user or usage data must secure user consent for the collection, even if such data is considered to be anonymous". "Paid functionality must not be dependent on or require a user to grant access to this data."
- **5.1.1(v):** "If your app supports account creation, you must also offer account deletion within the app." The spec already plans this.
- **5.1.1(ix):** apps that "require sensitive user information should be submitted by a legal entity that provides the services, and not by an individual developer". This bears on the entity question. **Enrol as an organisation.**
- **5.1.2(i):** "You must clearly disclose where personal data will be shared with third parties, including with third-party AI, and obtain explicit permission before doing so." This covers Every.org, the gift-card API and Stripe.
- **5.1.3(iii)–(iv) Health research:** "Apps conducting health-related human subject research must obtain consent from participants or, in the case of minors, their parent or guardian". They "must secure approval from an independent ethics review board". **This applies to the planned efficacy study fed by mood check-ins.**
- **4.10** (see §0, item 10).

---

## 3. US state privacy laws and other major regimes

### 3.1 California CCPA/CPRA (Low at launch, Medium as you scale)

**Rule.** A "business" is a for-profit that does business in California and meets one of these thresholds (Civ. Code §1798.140(d)):
- "(A) … annual gross revenues in excess of twenty-five million dollars ($25,000,000) … as adjusted", now **$26,625,000 effective 1 Jan 2025** (CPPA; adjusted every odd-numbered year, so next in Jan 2027)
- "(B) Alone or in combination, annually buys, sells, or shares the personal information of 100,000 or more consumers or households"
- "(C) Derives 50 percent or more of its annual revenues from selling or sharing consumers' personal information"

"Sensitive personal information" includes "Personal information collected and analyzed concerning a consumer's health." New CCPA regulations (risk assessments, ADMT, cybersecurity audits) took effect 1 Jan 2026.
URLs: https://cppa.ca.gov/pdf/20260101_ccpa_statute.pdf · https://cppa.ca.gov/regulations/cpi_adjustment.html · https://cppa.ca.gov/regulations/

**ScrollJar.** Likely not a "business" at launch: revenue is far below the threshold and it does not sell or share data for ads. Threshold (B) counts only buying, selling or sharing (cross-context ads), not mere collection. **Question:** Confirm that ScrollJar is outside the CCPA until revenue exceeds $26.6m, provided it never sells or shares. Does Teams B2B data change this?

### 3.2 Consumer health data laws (High)

- **Washington My Health My Data Act (RCW 19.373, operative 31 Mar 2024; small businesses 30 Jun 2024).**
  - "'Consumer health data' means personal information that is linked or reasonably linkable to a consumer and that identifies the consumer's past, present, or future physical or mental health status."
  - The definition includes "Social, psychological, behavioral, and medical interventions" and data "derived or extrapolated from nonhealth information (such as proxy, derivative, inferred, or emergent data by any means, including algorithms or machine learning)".
  - There is **no revenue threshold**: "small business" entities are covered too.
  - Collection is allowed only "With consent from the consumer for such collection for a specified purpose; or … To the extent necessary to provide a product or service that the consumer … has requested". Sharing needs a **separate** consent.
  - A separate **consumer health data privacy policy** must be linked "prominently … on its homepage".
  - A breach is "an unfair or deceptive act" under the Consumer Protection Act (RCW 19.86), which carries a **private right of action**.

  URL: https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true
  - **ScrollJar:** A self-control app with mood check-ins, rough-day support, "pattern insights" and a HEAVY-words support card could be read as processing "behavioral … interventions" or inferred mental-health status. Charity choices, such as an addiction-recovery charity, could be inferred health data. Employees are excluded ("does not include an individual acting in an employment context"), but Teams users also use the app privately.
  - **Questions:** Is any ScrollJar data "consumer health data"? Must the website carry a separate consumer health data privacy policy at launch? Is "necessary to provide the requested service" enough for the server-side features, or is consent needed?
- **Nevada SB 370 (NRS 603A.400 et seq.).** "'Consumer health data' means personally identifiable information that is linked or reasonably capable of being linked to a consumer and that a regulated entity **uses to identify** the past, present or future health status of the consumer." This includes "Social, psychological, behavioral or medical interventions". The test turns on use, so it is narrower than Washington's.
  URL: https://www.leg.state.nv.us/NRS/NRS-603A.html
- **Connecticut** (consumer health data amendments): page not reachable (TLS error). Unverified.

### 3.3 Other comprehensive regimes (Low now; check before each market)

- **Canada, Quebec Law 25 (Act respecting the protection of personal information in the private sector, CQLR c. P-39.1):**
  - s. 4.1: under-14 data "may not be collected from him without the consent of the person having parental authority".
  - s. 3.3: a privacy impact assessment for any new electronic service involving personal information.
  - s. 9.1: privacy settings must "provide the highest level of confidentiality by default".
  - s. 17: a PIA "Before communicating personal information outside Québec".
  - s. 3.1: the person in charge of privacy must be published on the website.

  URL: https://www.legisquebec.gouv.qc.ca/en/document/cs/P-39.1
  Federal PIPEDA: not verified in detail.
- **India DPDP Act 2023 + DPDP Rules 2025:** notified 14 Nov 2025 (PIB): "The DPDP Rules provide an 18-month phased compliance timeline". "Data Fiduciaries must obtain verifiable consent before processing the personal data of children". The rules require "standalone, clear and simple consent notices".
  URL: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014
  The exact tranche dates (14 Nov 2026 and 14 May 2027) come from secondary sources only. Children are under 18 under the Act (s. 2(f), not opened).
- **Japan APPI:** the PPC lists the consolidated Act "as of April 1, 2023. All the amended Acts entered into full force."
  URL: https://www.ppc.go.jp/en/legal/
  No detailed check (cross-border transfer consent rules are an open question).
- **Switzerland nFADP (SR 235.1), status as of 1 Sept 2023.**
  - Art. 14: a representative in Switzerland is required if foreign controllers process Swiss data "connected with the offer of goods or services … in Switzerland" and the processing is on a large scale, regular **and** poses a high risk.
  - Art. 5(c) defines sensitive personal data.
  - Art. 22 requires a DPIA for "large-scale processing of sensitive personal data".

  URL: https://www.fedlex.admin.ch/eli/cc/2022/491/en (read via the fedlex filestore HTML)
- **Brazil LGPD:** §2.5. **Australia:** §2.6.

---

## 4. Teams: employee data and works councils (High for EU Teams sales; Low for US-only pilots)

- **GDPR Art. 88(1):** Member States "may, by law or by collective agreements, provide for more specific rules … in respect of the processing of employees' personal data in the employment context".
  URL: https://www.legislation.gov.uk/eur/2016/679/article/88/adopted
- **Consent at work. WP29 Opinion 2/2017 on data processing at work (WP249, adopted 8 June 2017):** "consent is highly unlikely to be a legal basis for data processing at work, unless employees can refuse without adverse consequence". "Especially when it concerns the employer tracking the behaviour of the employee over time … the consent is not valid since it is not and cannot be freely given."
  URL: https://ec.europa.eu/newsroom/article29/redirection/document/45631
  - **ScrollJar:** Participation is voluntary, the employer sees only aggregates, and no individual view exists. That supports the claim that employees can refuse without consequence. But the employer still learns the participation rate.
  - **Question:** Who is controller for Teams data: ScrollJar, the employer, or both jointly? On what basis does ScrollJar process a participating employee's data: contract with the employee, or consent the employee gives to ScrollJar, not the employer?
- **Germany. BetrVG §87(1) no. 6:** the works council has co-determination rights over "Einführung und Anwendung von technischen Einrichtungen, die dazu bestimmt sind, das Verhalten oder die Leistung der Arbeitnehmer zu überwachen". §87(2) provides that the conciliation board (Einigungsstelle) decides if there is no agreement.
  URL: https://www.gesetze-im-internet.de/betrvg/__87.html
  - **BAG, 16 July 2024, 1 ABR 16/23** (headnote): a headset system letting supervisors listen in "ist eine technische Einrichtung, die zur Überwachung der Arbeitnehmer iSd. § 87 Abs. 1 Nr. 6 BetrVG bestimmt ist. Seine Einführung und Nutzung unterliegt auch dann der betrieblichen Mitbestimmung, wenn die Gespräche nicht aufgezeichnet oder gespeichert werden." The court read monitoring broadly: even without storage, co-determination applied.
    URL: https://www.rechtsprechung-im-internet.de/jportal/?quelle=jlink&docid=KARE600069331&psml=bsjrsprod.psml
  - **ScrollJar:** The dashboard shows participation rate, hours reclaimed and jar fill, weekly, for groups of 5 or more. It is still a technical system that produces data about employee *behaviour* (phone use outside work), even if only as aggregates.
  - **Questions:** Does an aggregate-only dashboard with k≥5 fall under §87(1) no. 6, given case law on group-level data and "objective suitability" (not verified, see Unverified)? Should ScrollJar ship a model works agreement (Betriebsvereinbarung) for German customers?
- **Italy:** Statuto dei lavoratori art. 4 (via Codice art. 114). Does ScrollJar Teams count as a remote-monitoring tool that needs a union agreement or labour-inspectorate authorisation? It is an off-hours personal-phone benefit and the employer sees no individual data. Unverified, ask counsel.
- **Minimum group size and anonymity:**
  - Hiding groups under 5 is k-anonymity at display time. Do the employer-side aggregates count as anonymous data (outside GDPR) or as personal data?
  - Small teams (the "Small teams (5–24)" tier) plus weekly deltas allow **differencing**: when one person joins or leaves, the change in the total reveals that person's hours.
  - The "boosted by teammates" tag (≥5 boosters) and "what we did" totals (≥5 notes) are similar.
  - **Questions:** Is k=5 enough, or should ScrollJar add noise or suppression across weeks, minimum headcount changes, and a delay? Are employer dashboards personal data for GDPR purposes?
- **DPIA:** employees are "vulnerable data subjects" in WP248 (§1.4). Expect a DPIA for Teams.

---

## 5. Marketing email and the waitlist (Medium)

- **GDPR and Italy:** consent basis (Codice art. 130). Withdrawal must be "as easy … as to give consent" (Art. 7(3)). The current waitlist has no checkbox: typing an email and pressing "Join the waitlist" next to "one email at launch" is the affirmative act. **Question:** Is that enough as "specific, informed" consent for one launch email? Does sending the *Families* email or later product news need fresh consent?
- **US CAN-SPAM (15 U.S.C. §7704(a)(5)):** commercial email must include "clear and conspicuous identification that the message is an advertisement or solicitation", an opt-out notice and "a valid physical postal address of the sender."
  URL: https://www.law.cornell.edu/uscode/text/15/7704
  **The launch email needs a postal address.** The founder may want a virtual mailbox rather than a home address.
- **Canada CASL (S.C. 2010, c. 23):** s. 6(1): "It is prohibited to send … a commercial electronic message unless (a) the person to whom the message is sent has consented to receiving it, whether the consent is express or implied". Regulations SOR/2012-36 s. 4: a **request for consent** must include the sender's name, "the mailing address, and either a telephone number … an email address or a web address", and "a statement indicating that the person whose consent is sought can withdraw their consent".
  URLs: https://laws-lois.justice.gc.ca/eng/acts/E-1.6/page-1.html · https://laws-lois.justice.gc.ca/eng/regulations/SOR-2012-36/FullText.html
  **Gap:** the waitlist form and privacy page give no mailing address.
- **Australia Spam Act 2003:** s. 16 "Unsolicited commercial electronic messages must not be sent", s. 17 "Commercial electronic messages must include accurate sender information", s. 18 "Commercial electronic messages must contain a functional unsubscribe facility" (Schedule 2, consent).
  URL: https://www.legislation.gov.au/C2004A01214/latest/text
- **In-app emails** (pre-settlement email, receipts) are transactional, not marketing, but keep them free of promotion. The **invite flow** ("join my jar", share links) is user-initiated. **Question:** Does any ScrollJar-sent invite count as a commercial message under CASL or the Spam Act?

---

## 6. Review of `landing/privacy.html` (website notice, "Last updated 15 October 2026")

**What it already does well:** short and plain. It states one purpose and consent as the basis, says withdrawal works at any time, and promises one-click unsubscribe. It names Formspree and says it is in the US. It gives a concrete retention limit ("never more than 12 months after launch … If ScrollJar never launches, we delete the whole list"). It names the complaint right for the EU/UK, says the app will have its own policy, and promises to ask before changing email use. The code supports the "no cookies, no analytics" claim (§1.7).

**Gaps (each with the rule):**

| # | Gap | Rule | Fix to discuss |
|---|---|---|---|
| 1 | Controller is "[full legal name], [city, country]" (build.sh warns about it) | GDPR Art. 13(1)(a) "the identity and the contact details of the controller and, where applicable, of the controller's representative" | Fill in once the entity exists; add EU/UK representative if §1.6 requires one |
| 2 | Transfer to the US is described ("that's where your email is stored") but **no adequacy decision or safeguard is named** | Art. 13(1)(f) | State DPF or SCCs once Formspree's status is confirmed. No Formspree DPA located (§1.5) |
| 3 | "Our web host" is not named; server logs are said to be kept "to keep the site running and secure" | Art. 13(1)(e) recipients; 13(1)(c)–(d) basis and legitimate interest | Name the host (Netlify or Cloudflare Pages); state legitimate interests as the basis for logs, and log retention |
| 4 | "We rely on your consent" is the only basis given, but the page also covers **emails you send us (e.g. Teams pilots)** | Art. 13(1)(c) | Give the basis for replying to messages (legitimate interests / steps before a contract) |
| 5 | Rights list covers see, correct, delete and withdraw only | Art. 13(2)(b) also names "restriction … object … data portability" | Add the missing rights in plain words |
| 6 | Complaint right says "your data protection authority" | Art. 13(2)(d) | Fine. Could name the Garante if the lead authority is Italian; for the UK, the ICO |
| 7 | No mailing address anywhere | CASL regs s. 4(d); CAN-SPAM postal address in the email itself | Add a business mailing address (a virtual mailbox is fine) to the page and the launch email |
| 8 | "If you're under 16, ask a parent to join instead" | Art. 8 ages differ (Italy 14, UK 13, COPPA 13) | Acceptable as a simple adult-only line. Ask counsel whether to say "18 or over" to match the stakes product and the Families framing |
| 9 | Email service "we'll name it on this page before we use it" | Art. 13(1)(e) | Good. Remember to update before sending |
| 10 | No US state-law section | WA MHMDA homepage link rule applies only if the *app* processes consumer health data | Not needed for the waitlist; plan the app policy (§3.2) |
| 11 | Fonts claim is true only for `dist/` | Accuracy (Art. 5(1)(a) fairness) | Always deploy through `deploy/build.sh` (it fails the build if Google Fonts remain) |
| 12 | Italian version absent | Art. 12(1) clear language for the audience | Add Italian before targeting Italy |
| 13 | Formspree's own role | Formspree's policy says API users "are independent controllers" | Confirm with counsel that Formspree acts as ScrollJar's processor and get an Art. 28 agreement |

**For the future app privacy policy** (Apple 5.1.1(i) requires a link in App Store Connect and in the app). It must cover:
- Stripe, Every.org (including what reaches Every.org: names, kids' names, amounts), the gift-card API, Supabase and APNs
- The backer seeing "days kept" counts
- Teams aggregates and the k≥5 rule
- Families, with COPPA §312.4(d) online notice contents and the §312.10 written retention policy
- Mood check-ins and the efficacy study
- A possible WA consumer health data policy
- Account deletion in the app
- Retention per table

---

## 7. What ScrollJar already does well on this topic (from the docs)

- **Data minimisation by architecture:**
  - Apple's opaque tokens mean "App identities never leave the device".
  - "The backend stores events, not content."
  - Diary, `feelAfter`, signature and letters are "LOCAL ONLY".
  - Wish jars and backing send only counts ("only the count leaves the phone").
- **Speech:** on-device recognition is required (`requiresOnDeviceRecognition = true`), audio is kept in memory only and deleted at once, and the mic is hidden if on-device recognition is unavailable. Permissions are asked only when the mic is tapped. This lines up with Apple 5.1.1(iv) and GDPR minimisation.
- **Diary voice notes:** never transcribed or analysed, AI included.
- **Teams:** no individual view ("architecturally absent"), k≥5 suppression, weekly totals only. Notes are anonymous, checked on the phone, never shown to the employer and deleted at campaign end. Employees are never charged. Works councils were already flagged as an EU-expansion item.
- **Families:** kids never charged or paid. The family "sees the jar, not each other's screens", and diaries stay private ("No reading diaries").
- **Backing:** an offer the friend can decline, never for under-18s, and the backer sees only the count of kept days.
- **No engagement metrics, ads, analytics SDKs, leaderboards, variable rewards, read receipts or contact-book import.** This matches the DSA minors guidelines and the ICO nudge standard.
- **Export and deletion "built in from day one"**, which Apple 5.1.1(v) requires.
- **Website:** no cookies or trackers, self-hosted fonts enforced by the build, a honeypot instead of a third-party CAPTCHA, a retention limit, and a single-purpose email.

---

## 8. Unverified / ask counsel

1. **Art. 8 ages per EU member state** (other than Italy 14 and the EU default 16) were not verified one by one at national sources.
2. **DPF appeal C-703/25 P:** pending status comes from secondary sources (WilmerHale; a June 2026 item says Microsoft intervened). I did not confirm at CURIA whether a hearing date or AG opinion exists.
3. **DPF certification** of Formspree, Supabase, Every.org, Stripe and the email provider: dataprivacyframework.gov is script-rendered and I could not query it.
4. **Formspree DPA:** none found (the URL returned 404). Ask Formspree, or switch to a provider with a published DPA and EU hosting.
5. **Every.org's privacy terms and role** (every.org/privacy returned 403).
6. **German case law on group-level data under §87(1) no. 6** ("objective suitability"; monitoring pressure in small groups): not verified. My Legal Data Hunter search hit its free daily limit.
7. **Italy Statuto dei lavoratori art. 4** text and its application to Teams: not opened.
8. **Texas SB 2420 current enforceability:** status comes from CCIA's own litigation page (party source). Check the Fifth Circuit docket.
9. **California AADC post-remand status** (after 12 Mar 2026): secondary source only (Cooley).
10. **Other US kids/age laws:** Utah App Store Accountability Act (SB 142), California AB 1043 (Digital Age Assurance Act, reportedly effective 1 Jan 2027), Louisiana's app store law, New York Child Data Protection Act, Maryland Kids Code, Vermont AADC, Nebraska and others. None verified.
11. **Other US comprehensive state laws** (Texas TDPSA, which reportedly applies to non-"small businesses" regardless of volume and requires consent for sensitive data; Colorado, Virginia, Connecticut consumer health data provisions, Oregon, Montana, etc.). Not verified: the Texas statutes site is script-rendered and Connecticut's site failed TLS.
12. **India DPDP tranche dates** (14 Nov 2026 for notice and consent; 14 May 2027 for the rest): secondary only. PIB confirms only "18-month phased".
13. **Australia:** Privacy and Other Legislation Amendment Act 2024 (statutory privacy tort reportedly from 10 June 2025; Children's Online Privacy Code) not opened at legislation.gov.au (script-rendered). Spam Act consent details beyond the section titles not read.
14. **Canada PIPEDA** details; **Japan APPI** cross-border consent rules; **Swiss–US DPF** recognition.
15. **ePrivacy Directive Art. 5(3)** text (EUR-Lex blocked). Italy's art. 122 was used instead.
16. **Whether on-device-only processing** (diary, `feelAfter`, HEAVY list, speech) makes ScrollJar a controller under GDPR, or a COPPA "operator" collecting data.
17. **Whether coins or "virtual currency" for minors** in Families raise DSA or consumer-law issues (outside privacy; pass to the consumer-law helper).
18. **Apple Declared Age Range API / PermissionKit** capabilities for parental consent flows: not checked against Apple developer documentation.
19. **ICO Children's Code territorial line** ("establishment elsewhere in the EEA … code does not apply"): the wording predates Brexit and may be stale. Confirm.
20. **ICO Children's Code in-force date** (2 Sept 2020): not re-verified.

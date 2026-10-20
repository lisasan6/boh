# Charity donation partners for ScrollJar: who could move coin money to charities

**Prepared 20 October 2026. This is not legal advice.** It compares donation partners that a for-profit app could use. It says what each provider's own pages say, and what to ask them and counsel. Every quote below was read with curl on the provider's own site (docs, pricing, terms, help centre) on 2026-10-20. Search results were used only to find pages. The saved copies are in the research scratchpad (not kept in the repo).

**Why this matters (from the brief §1.1–1.2, L1 §0, L2 §1.3).** Every.org's docs say "Every.org does not provide programmatic donations or disbursements via API. All donations must be completed by a donor on Every.org." So the planned flow does not exist on Every.org's public product. The planned flow is: ScrollJar charges the user's card on the 1st for a variable amount, then donates "server-side via Every.org". Whatever replaces it decides four things:
- who the merchant of record is
- whether coin money ever sits in ScrollJar's balance (money transmission, Stripe's restricted list, commercial co-venturer rules)
- who the donor of record is and who gets the receipt
- whether ScrollJar is a "charitable fundraising platform" in California and Hawaii

Apple 3.2.2(iv) and 3.2.1(vi) also apply whichever partner is chosen.

---

## 1. The short answer

**No provider publicly documents the exact flow ScrollJar wants:** the partner charges the end user's saved card off-session, for a variable amount each month, as merchant of record, and sends the receipt to the user. Every candidate falls into one of two families:

| Family | How it works | Who is donor of record | Money in ScrollJar's balance? | Who offers it |
|---|---|---|---|---|
| **1. "Platform pays" APIs** | ScrollJar creates donations by API. The partner bills ScrollJar (monthly invoice, or a batch charge to ScrollJar's card or bank). ScrollJar collects from users itself. | Usually ScrollJar (Goodstack and Benevity say so outright). Pledge says the end users. Change depends on a flag. | **Yes.** ScrollJar collects users' money and pays the partner later. Change's Stripe Connect option is a destination charge, so it also lands in ScrollJar's balance first. | Change, Pledge, Goodstack, Benevity ("company donation") |
| **2. "Donor pays the foundation" checkouts** | The user pays the partner's foundation directly on a hosted page or form. | The user. The partner's foundation sends the receipt. | No | Every.org Donate Link, Goodstack Hosted Gateway, Pledge forms, Change checkout link, Benevity "Credit Card Functionality", PayPal Giving Fund |

Family 1 matches the product as designed, but it puts ScrollJar in the flow of funds, which is the exact problem flagged in brief §1.1. Family 2 keeps ScrollJar out of the money, but the public docs only show checkouts that the donor completes. Recurring giving is a fixed amount at best (Every.org `MONTHLY`, Pledge recurring forms). None documents a variable, off-session monthly charge.

**Teams and Families fit Family 1 better.** The employer or parent is the donor, so they can be invoiced directly. Change and Benevity are built for exactly this "company donation" pattern.

**Recommendation (details in §4):** contact **Change (getchange.io)** first and **Pledge (pledge.to)** second.
- Change has the most developed US compliance tooling: AB 488 and Hawaii consent, CCV agreements, and a regrant policy written around California's solicitation types.
- Pledge is the cheapest. Its API is platform-initiated and says end users can get receipts, and its forms already support recurring charges as merchant of record.
- Keep **Goodstack** in mind for UK, Australia and the EU later, and **Benevity** for local receipts in many countries if Teams grows into an enterprise product.

---

## 2. Provider by provider

### 2.1 Change (GetChange Corp.), with Our Change Foundation (OCF)
**Status: active.** The API changelog has entries in February and March 2026, and the Terms of Use were "last updated on August 12, 2026" (https://link.getchange.io/api-tos, PDF).

**1. Programmatic donations: yes.**
- The API is "Create a donation… Change keeps track of your donations, bills you at the end of the month, and handles the nonprofit payouts for you." (https://docs.getchange.io/api/)
- The parameter `funds_collected` is required: "Whether you are collecting payment for the donation. This helps us issue the correct tax receipt at the end of the year." (same page)
- Recurring or variable amounts: any amount, any time. "You can create donations at any time after the payment is successful… in a batch job." (https://docs.getchange.io/recipes/basic-stripe-integration/)
- Change does not charge end users' cards itself: "Change is not a payment processor." (https://getchange.io/pricing)
- The only card flow Change hosts is a one-off "Stripe Checkout link to collect donations for a specific nonprofit" (API, "Create a checkout link").

**2. Money flow.**
- Basic integration: ScrollJar charges the user, and "Each month, you'll receive an invoice from Change for the total amount of donations you've created. When you pay the invoice, Change will automatically distribute the donations." (basic Stripe recipe)
- Stripe Connect option: "use the `transfer_data` field to use Stripe Connect to transfer a portion of the payment to Change", then call the Transfers endpoint with `allocations` across several nonprofits. Access is "(Ask us for access)". (https://docs.getchange.io/recipes/stripe-connect/ and the API Transfers section)
- `transfer_data` on a platform PaymentIntent is a destination charge. Stripe says that payment "appears in your platform's balance" (https://docs.stripe.com/connect/charges, quoted in L2 §1.3). **So in both Change flows the money passes through ScrollJar.**
- Change's marketing says the opposite: "No fund custody. Donations route through our partner DAF, Our Change Foundation, so you never hold charitable funds" (https://getchange.io/product/donations). **This conflicts with the docs. Ask about it (§4).**

**3. Donor of record and receipts.**
- Terms §3: "Change, as agent of OCF, will then issue charitable contribution receipts to donor Client and/or donor customers of Client reflecting OCF's EIN number as the recipient charity."
- OCF is "a Donor Advised Fund and an organization described in Section 501(c)(3)… located in the United States." Receipts are therefore US-only. No non-US receipting was found.

**4. Charity coverage.**
- "Securely and promptly donate to nearly 1M nonprofits" (pricing page). "Most US-based nonprofits are supported." (https://docs.getchange.io/getting-started/)
- International: "Change primarily supports U.S.-based 501(c)(3) organizations, [but] we can also support international organizations that have been vetted by CAF America or GlobalGiving." (https://intercom.help/getchange/en/articles/10408950-international-nonprofits-charities)
- CAF America: "If the end charity is registered in Canada or the UK, the donation processing fee is 5%"; other countries cost "$400 validation fee w/ Expenditure Responsibility" or "$1,000… w/ Equivalency Determination", and vetting takes "4-6 weeks". (https://intercom.help/getchange/en/articles/13891999-international-donations-caf-america)
- GlobalGiving: "they will automatically deduct their corporate fee of 15% per donation", plus "a vetting fee of $750-900 USD" for new nonprofits. (https://intercom.help/getchange/en/articles/12675213-international-donations-globalgiving)
- Charities that haven't signed up: OCF contacts them by letter, email, LinkedIn and phone. "If Our Change Foundation receives no response from the charity within 6 months, we will reach out to the merchant for regrant instructions… If, after a total of 9 months, there is no response from the merchant, Our Change Foundation will regrant the funds to an enrolled charity with a mission similar…" (https://intercom.help/getchange/en/articles/11851828-regranting-policy)
- **Conflicting text on unsigned charities.** The Terms say OCF disburses "if it is a qualified charity and it has an account with Change". The nonprofit FAQ offers a paper cheque without an account (https://intercom.help/getchange/en/articles/10023514-faqs-for-nonprofits). Ask which applies.

**5. Fees** (https://getchange.io/pricing):
- "Plus 2.49% Per transaction $999 per month, Support 1,000 nonprofits/year"
- "Commercial Co-Venturer 1.9%… $2.5k per month… Nationwide legal compliance"
- "Professional Fundraiser 1.9%… $3.5k per month"
- "For Charitable Fundraising Platforms $500 per month, per state"
- Charities receive money free: "Claiming your nonprofit and receiving payouts via Change are 100% free." (nonprofit FAQ)
- Payout timing: "Nonprofits are paid by direct deposit (ACH) within 1-2 business days of Change receiving the funds" (donations page). For California Type A/B solicitations, funds go "within a maximum of thirty (30) days after the end of the month" (Terms §3).
- ScrollJar would still pay its own Stripe fee to collect from users, on top of Change's fee.

**6. Compliance help: the strongest of all candidates.**
- "Add a compliance package to any plan and meet requirements (like California AB 488 and Hawaii Act 108)… Change automates nonprofit consent, verifies organization eligibility in real time, ensures timely and compliant payouts, and generates filing-ready reports" (pricing page)
- "Sign a single CCV agreement with our trusted donor-advised fund (DAF)… State bonds for CCVs" (pricing page)
- A written-consent API: "Donation platforms should collect written consent from nonprofits before granting funds to them… check that `written_consent.direct` is true" (https://docs.getchange.io/written-consent/)
- The Terms set payout timing under "Haw. Rev. Stat. Ann. § 467B-2.7(d)(3)".
- The platform page says "File annual CA registrations (and soon, HI)" (https://getchange.io/solutions/charitable-fundraising-platform).
- Change describes itself as "not… solicitation on its own platform, but rather processes contributions made via Clients' own platform(s)" (Terms §3). **So ScrollJar would still be the platform that solicits.** Change helps with ScrollJar's filings but does not take on ScrollJar's status.
- Apple, Candid or App Store: nothing found.

**7. For-profit use: yes,** it is built for companies. No prohibition on penalty or stake-style donations was found. Change openly serves sweepstakes ("Sweepstakes & Auctions").

### 2.2 Pledge (Pledgeling Technologies, Inc.), with Pledgeling Foundation
**Status: active.** The developer docs at https://developer.pledge.to include an AI/MCP guide, and Lovable lists a Pledge connector (https://docs.lovable.dev/integrations/pledge.md). The terms page shows no date. One help article is dated 2020.

**1. Programmatic donations: yes.**
- "To redeem points, the rewards platform converts the points to a dollar amount, and makes an API call to the Pledge Donate API. Pledge tracks this donation as pending. On a periodic basis, we will batch up all of the pending donations and charge them to a payment method provided to us in a single transaction. It can either be via credit card or ACH… At a minimum, you should be charged monthly." (https://developer.pledge.to/guides/point-redemption/)
- "Can I make micro-donations…? Yes… Set up a payment method on your account, and we will charge it once your aggregated donations reach certain thresholds." (https://www.pledge.to/products/apis)
- Recurring as merchant of record exists on Pledge's own forms: "If you select a recurring Donation… We may submit periodic charges – for instance, monthly – without further authorization from you." (https://www.pledge.to/terms)
- A variable off-session amount is not documented.

**2. Money flow.**
- Donate API: Pledge charges ScrollJar's card or bank in a batch. ScrollJar would have collected from users first, **so the money sits with ScrollJar.**
- Forms and fundraisers: the donor pays Pledge directly (Stripe test cards are mentioned in https://developer.pledge.to/guides/getting-started/).

**3. Donor of record and receipts: the most favourable to end users in Family 1.**
- "Even though the donations are charged to your payment method, for tax and accounting purposes they are considered to be individual donations by those donors and not a single donation by you." (https://help.pledgeling.org/support/solutions/articles/36000233791-how-are-donations-through-the-api-paid-for-, "Modified on: Wed, 24 Jun, 2020")
- "Upon redemption, we can send a tax receipt to the user (once reviewed and approved by our compliance team)." (point-redemption guide)
- Receipts are US only: "We email IRS-compliant receipts for the initial donation to Pledgeling Foundation, a U.S. 501(c)(3) public charity" (terms).
- **Counsel should check this "individual donations" position.** The user paid ScrollJar, not the foundation.

**4. Charity coverage.**
- "a database of verified 501(c)(3) nonprofit organizations… as well as equivalent organizations in other countries" (https://www.pledge.to/solutions/compliance)
- "For payments to non-US charities not registered as 501c3 organizations with the IRS, we partner with international nonprofits… They typically charge a 5% fee" (terms)
- **Unsigned charities: red flag.** "In most cases, we do NOT have an agreement in place with a listed Charity and those Charities have not provided consent… Such consent is NOT required" (terms). Compare California's AB 488 consent rules (L1 §1.1) and Hawaii's written-consent rule.

**5. Fees.**
- "Pledge takes a 5% fee from the donation… If you pay via ACH, the fee is 0.8% (capped at $5). Credit card is 2.9% + $0.30. There is also a $5 disbursement fee for the nonprofits." (point-redemption guide)
- No platform fee: "There is no charge to use our API" (APIs page).
- Disbursement: "within 15 days of the end of the calendar month… If the aggregate amount… is less than $20, disbursement… may take longer" (terms).

**6. Compliance claims.**
- "Pledge maintains full registration and compliance for fundraising in all required U.S. states" and "comprehensive state-by-state compliance coverage and AB488 compliance" (compliance page)
- Pledge calls itself "a 'charitable fundraising platform'" and the Foundation "a 'platform charity'" (terms)
- **These are claims about Pledge's own registrations. They do not cover ScrollJar's.**
- Apple, Candid or App Store: nothing found.

**7. For-profit use: yes.** Its customers include Evite, Price.com and Legacy.com (APIs page). No prohibition on our use case was found.

### 2.3 Goodstack (formerly Percent), with Intelligent Foundation (UK, Australia) and Percent Impact Foundation (US)
**Status: active.** The charity terms are effective June 22, 2026, and the client terms November 15, 2024. The changelog at https://changelog.goodstack.io/ shows no dates.

**1. Programmatic donations: yes, two modes.**
- Donations API: "you simply create donations using the Donations API and Goodstack will keep track of your donations, request payment from you and handle timely disbursement… There are many ways to build donations into your product including one-off donations, round ups and recurring donations." (https://docs.goodstack.io/docs/guides/Monetary%20donations/donations-api)
- Hosted Gateway: the user pays on a Goodstack page. A session "expiresAt time is 24 hour after creation" and "Users will receive a donation receipt via email." (https://docs.goodstack.io/docs/guides/Monetary%20donations/donations-hosted)
- Off-session saved-card charging is not documented.

**2. Money flow.**
- API: "Make payments of Donations on its own behalf and/or on behalf of Client End Users to the Foundation" and "Ensure that each Client End User pays any Donations to the Client in cleared funds" (https://goodstack.io/legal/additional-terms-donation-service). **The money passes through ScrollJar.**
- Gateway: "their Donation will be paid, using their preferred payment method through our Payment Provider, to the Foundation" (https://goodstack.io/legal/additional-terms-hosted-donation-gateway)

**3. Donor of record and receipts.**
- **API: the user gets no receipt.** "Ensure that each Client End User understands and accepts that it will not receive a receipt from the Foundation" and Goodstack will "facilitate the provision to the Client of a tax receipt" (Donation Service terms). This is option B in the brief.
- Gateway: the donor gets the receipt.
- Foundations: "Intelligent Foundation (… Charity Commission for England and Wales… 1192508), Intelligent Foundation (… ACNC, ABN 48156978613); or Percent Impact Foundation (… IRS… 87-3165286)", and "in the most tax effective manner based on the donor's original donation currency" (https://goodstack.io/legal/donation-delivery-policy). **No EU, Italian or Canadian foundation is listed.**

**4. Charity coverage: the most global.**
- "135+ currencies: Make donations to nonprofits globally" (https://goodstack.io/donations). That figure applies to gateway payments: "For donations via our hosted gateway, we support payments in over 135+ currencies" (https://docs.goodstack.io/docs/concepts/Donations/currencies). Account currencies are USD, EUR, GBP, AUD and NZD.
- Unclaimed charities: data is "drawn from publicly available databases from Charity country regulators"; after about 30 days of contact attempts Goodstack tries "alternative methods, such as by cheque", then reassigns funds (Donation Delivery Policy). Claimed charities are paid monthly subject to a minimum.
- Changelog: batches are disbursed once they reach "the equivalent of $45" or once donations are "90 days old or more".

**5. Fees.** "2.9% + $0.30" for US, Canada and Australia; "2.9% + £0.20" for the UK and rest of world; "Currency conversion or non domestic cards – additional 2%"; "we don't charge any platform fees" (https://goodstack.io/pricing). This pricing appears to apply to the gateway. API commercial terms are by "Service Order", which was not seen.

**6. Compliance.**
- California: "To comply with AB488, Goodstack can only show U.S. nonprofits that are listed on certain government-approved registries" (https://help.goodstack.org/understanding-california-ab488-rules).
- No claim of handling a client's state registration or CCV filings was found.
- The terms are governed by the law of England and Wales.
- Apple: only "Apple and Google Pay" support is mentioned. No App Store claim.

**7. For-profit use: yes,** it is B2B. The end-user gateway terms limit end users to "personal and non-commercial purposes". That applies to donors, not to ScrollJar.

### 2.4 Benevity (Giving API), with a network of foundations
**Status: active.** The API terms say "Last Updated: January 2026" and the fee schedule says "Last Updated: May 1, 2026". The public API changelog stops at 2024.

**1. Programmatic donations: yes**, by enterprise order only. "The terms contained herein apply to the extent that Client has purchased Benevity's application programming interface… via an Order Document." (https://go.benevity.com/hubfs/website/legal/Benevity-SSI-API.pdf)
- "Company donation": "your users do not have to pay immediately… your company will receive a donation report at the end of the month" (https://developer.benevity.org/guides/giving/post-paid-donations/make-company-donation.html)
- A credit-card ("prepaid") flow also exists. Its guide page did not render, so off-session or recurring support could not be checked.

**2. Money flow.**
- "Donations made via the Donations Functionality will be collected and held in escrow by Client as agent for the applicable Foundation" (SSI-API §5b). **ScrollJar would hold the funds as the foundation's agent.**
- "only the Credit Card Functionality… allows API Participants or other donors to transfer funds directly to a Foundation" (SSI-API §5c)

**3. Receipts.**
- "Due to the micro-donation nature of Benevity API-enabled giving programs, API Participants will typically not receive Donation Documentation" unless agreed (SSI-API §5e).
- Local foundations exist in the US (AOGF), Canada (COGF), the UK (CG, UKOGF), Ireland (IOGF), France (FPS), Germany (HdS), Australia, New Zealand and India (https://info.benevity.com/rs/970-BMO-559/images/Benevity_Fees_Schedule.pdf). **No Italian foundation was found.**

**4. Coverage.** A "global database of nearly 2 million vetted nonprofits" (https://developer.benevity.org/). Unsigned charities: cheques only in the US and Canada, with a "$100… Manual Check Threshold" and an annual sweep at $20 (fee schedule).

**5. Fees.**
- "2.99% of each donation" Cause Support Fee, capped at $500
- card fees of 2.75% to 3.75% depending on the foundation (2.95% for AOGF in the US)
- an FX fee of 1.50%
- a manual cheque fee of the "Higher of $35… or 8%"
- The platform licence is by quote.

**6. Compliance.** "Client agrees that it is responsible for any legal or regulatory requirements that apply with respect to its use of Benevity API" (SSI-API §3). Clients must keep to card scheme rules (§7). No AB 488, Hawaii or App Store claims were found.

**7. For-profit use: yes**, enterprise only. Any new giving program needs "prior written approval of Benevity… to confirm proper mechanics and receiptability" (SSI-API §3). **Expect a review of the coin mechanic.**

### 2.5 Every.org (current plan of record)
**Status: active.** The docs changelog was updated 2026-10-15.
- **1–2.** "At this time, Every.org does not provide programmatic donations or disbursements via API. All donations must be completed by a donor on Every.org." (https://docs.every.org/docs/intro). The Donate Link supports a fixed `MONTHLY` frequency (L2 §1.3). The donor pays Every.org, so the money never touches ScrollJar.
- **3.** The donor gets the receipt. "our donation receipts are only tax-deductible in the US" (https://support.every.org/hc/en-us/articles/5527881074579)
- **4.** "over 1 million 501(c)(3) organizations". International charities only via "a US 501(c)(3) entity", a US 501(c)(3) fiscal sponsor, or "a valid equivalency determination (ED) certificate". "Every.org only accepts USD" (same article).
- **5.** No Every.org fee to donors or charities; the API is free only "for non-commercial use cases… or you can contact us to explore for-profit enterprise plans" (https://support.every.org/hc/en-us/articles/360061886773).
- **6–7.** The terms page and charity-api page returned 403, so compliance claims could not be read. A for-profit app needs an enterprise plan. The 2023 changelog mentions a "disbursements batch file", which suggests a non-public partner flow. **Ask about it.**

### 2.6 PayPal Giving Fund (PPGF)
**Status: active.** The Charity Search guide was "Last updated: September 14, 2026".
- **1.** The only public partner API is search: "The Charity Search API is a PayPal limited release REST API… to list charities registered with the PayPal Giving Fund" (https://developer.paypal.com/limited-release/charity-search). How partners send money is not public (https://www.paypal.com/us/paypal-giving-fund/partner).
- **3.** "When a user donates, the donation is made to PayPal Giving Fund. We'll also send a tax receipt to the donor." (partner page). PPGF also runs UK, Canadian and Australian sites (for example https://www.paypal.com/uk/paypal-giving-fund/partner).
- **Red flag for coins.** Donors certify that no grant is made "to pay for goods or services received by you" (https://www.paypal.com/us/paypal-giving-fund/policies/donor-terms-of-service, effective December 11, 2024). Counsel should say whether a coin paid to "open" an app is a payment for a service. The same question affects deductibility everywhere.
- **5.** "PayPal Giving Fund does not charge individual donors or charities any fees… certain partners may deduct… processing or platform fees" (donor terms).
- **Fit:** possibly good for the Family 2 checkout, but nothing public on off-session or variable charges. Partnership terms are not public.

### 2.7 Daffy (Daffy Charitable Fund, a donor-advised fund)
- **1.** The public API runs on **the user's own Daffy fund** with a personal key: "To use the Daffy Public API, you will need to authenticate your requests using an API key. To get one you'll first need to sign up for a Daffy account" (https://docs.daffy.org/getting-started). Donations come out of the user's fund balance (statuses include `waiting_for_funds`; https://docs.daffy.org/ref/donations).
- **3.** The user is the donor and holds a US DAF. "Membership starts at $3/mo" (https://www.daffy.org/).
- **Fit:** an interesting US "option A+". The user funds a Daffy account, and ScrollJar triggers grants from it. It needs every user to open a DAF, it is US only, and no documented third-party OAuth was found. "Partner APIs" are mentioned only in a 2023 announcement (https://www.daffy.org/resources/api-for-developers).

### 2.8 Not a fit, or not verifiable
- **Givebutter:** the API manages *a nonprofit's own* Givebutter account (campaigns, contacts, transactions; `is_offline` and `check_number` fields in "Create a transaction", https://docs.givebutter.com/api-reference/transactions/create-a-transaction.md). It is not a rail for a for-profit platform to give to many charities.
- **GlobalGiving:** the public API is for projects data and "to submit a donation" to GlobalGiving projects (https://www.globalgiving.org/api/overview/). It works best as an international back end via Change (15% fee) or Pledge. The corporate help page returned 403.
- **CAF America:** the site blocked curl (Cloudflare). It is relevant only as the back end for Canadian, UK and other charities via Change (5% for CA/UK).
- **Givinga:** an enterprise giving back end. No public API docs or pricing ("Get custom pricing", https://www.givinga.com/). It could suit Teams later.

---

## 3. Comparison table

| | Change | Pledge | Goodstack | Benevity | Every.org | PPGF | Daffy |
|---|---|---|---|---|---|---|---|
| **API-initiated donations** | Yes (invoice monthly) | Yes (batch charge to platform) | Yes (requests payment from client) | Yes (enterprise order) | **No** (donor-completed only) | Not public | Yes, from the user's own DAF |
| **Partner charges end user's card off-session, variable amount** | No (not a processor; one-off checkout link) | Not documented (recurring forms exist) | Not documented (24h sessions) | "Credit Card Functionality" exists; details unverified | No (fixed MONTHLY link) | Unverified | n/a (user funds DAF) |
| **Money in ScrollJar's balance?** | Yes, in both basic and Connect (destination charge) flows | Yes (Donate API) | Yes (API); no (gateway) | Yes ("held in escrow by Client as agent") | No | Probably no | No |
| **Donor of record / receipt** | OCF receipt to "Client and/or… customers" (depends on `funds_collected`) | Pledgeling Fdn; says end users count as donors and can be receipted | API: client only, end user gets **no** receipt; gateway: donor | Foundation; API users "typically" no receipt | Donor | Donor | User (DAF holder) |
| **Receipt countries** | US | US | US, UK, AU | US, CA, UK, IE, FR, DE, AU, NZ, IN | US | US (plus PPGF UK, CA, AU sites) | US |
| **Charities** | ~1M US; international via CAF America or GlobalGiving | 501(c)(3)s plus "equivalent" abroad via intermediaries (≈5%) | Global regulator databases | ~2M worldwide | 1M+ US; international only with a US entity or ED | "over a million" | 1.5M US |
| **Unsigned charities** | Outreach, then regrant after 6–9 months | Listed without consent ("NOT required") | Outreach about 30 days, cheque, then reassign | Cheque (US/CA only, $100 threshold), else re-advise | n/a | Funds held for enrolment (policy not read) | Cheque |
| **Fees** | 2.49% + $999/mo (Plus) or 1.9% + $2.5k/mo (CCV); +$500/mo per state for platform compliance | 5% + card 2.9%+$0.30 or ACH 0.8% (cap $5); $5 per disbursement | 2.9% + $0.30 (+2% FX); no platform fee (gateway) | 2.99% (cap $500) + 2.75–3.75% card + 1.5% FX; licence by quote | Free non-commercial; enterprise by quote | No PPGF fee; partner fees possible | $3+/mo per user |
| **US state compliance help** | **Strongest:** AB 488 and HI Act 108 package, consent API, CCV agreement and bonds | Claims own registration in "all required U.S. states" and AB 488 compliance | AB 488 filter on charities only | None ("Client… responsible") | Not readable (403) | Not public | n/a |
| **Apple / App Store claims** | None | None | None (Apple Pay only) | None | None | None | None |
| **For-profit allowed** | Yes | Yes | Yes | Yes (enterprise) | Enterprise plan needed | Partner agreement | Yes (free API) |
| **Active in 2026** | Yes (terms 12 Aug 2026; changelog Mar 2026) | Yes (current dev docs; terms undated) | Yes (terms June 2026) | Yes (Jan/May 2026 docs) | Yes (changelog 15 Oct 2026) | Yes (Sept 2026 guide) | Yes |

---

## 4. Who to contact first, and what to ask

### First: Change (hello@getchange.io / support@getchange.io)
**Why first:** it is built for companies that trigger donations, including round-ups and "action-triggered" giving. It already prices AB 488 and Hawaii compliance, has a consent API, and its terms set payout timing to California's Type A/B rules and Hawaii's statute.

Questions:
1. Your donations page says "you never hold charitable funds". Your docs say we collect payment and pay your monthly invoice, and your Stripe Connect recipe uses `transfer_data`, which Stripe says lands in our balance first. **Can OCF be the merchant of record?** That means a Stripe Connect *direct* charge on OCF's connected account, using a card the user saved with OCF, off-session, for a variable monthly amount. If not, what structure do you recommend so we never hold coin money?
2. With `funds_collected: true`, **who gets the receipt**, the end user or ScrollJar? Can each end user get an individual receipt for their monthly total?
3. Which plan covers a consumer app where users pick from about 1M charities (Plus caps at "1,000 nonprofits/year")? What does the "$500 per month, per state" platform package include? Which states does it cover today (California, Hawaii, others)? Does it include ScrollJar's own PL-1 registration, PL-4 reports and the Hawaii registration?
4. Does OCF disburse to charities that have **not** opened a Change account, by cheque? Your terms say "has an account with Change" and your FAQ offers cheques.
5. For Teams and Families, can the employer or parent be the "Client" billed directly, so the money never reaches us?
6. International charities via CAF America or GlobalGiving: can a user in Italy, the UK, Canada or Australia pick a local charity in-app? At what cost? Are there any non-US receipts?
7. Have you reviewed a penalty or commitment mechanic like ours? Any restrictions? Any experience with Apple's 3.2.2(iv) and nonprofit approval (3.2.1(vi)) for apps using Change?

### Second: Pledge (developer and sales contact via https://www.pledge.to/contact)
**Why second:** the cheapest per coin with no platform fee, a platform-initiated Donate API, a stated position that end users are the donors and can get receipts, and recurring merchant-of-record charging already on its forms.

Questions:
1. Can **Pledge, not ScrollJar, charge the end user's saved card** each month for a variable amount, with Pledge as merchant of record? That means extending your recurring-donation flow to amounts set by our API.
2. Your help article says API donations charged to the partner's card "are considered to be individual donations by those donors". Is that still your position? Can each user get an IRS receipt for their monthly total? What does your "compliance team" review before receipting?
3. Your terms say listed charities have generally not consented and consent "is NOT required". How do you meet **California AB 488 and Hawaii written-consent** rules for donations a platform like ours solicits? Which entity is the registered platform, Pledge or us?
4. Which states are you registered in, under which roles (platform, platform charity, commercial fundraiser)? Can you share copies?
5. Fees on our volumes: is the 5% negotiable? Can the 2.9% + $0.30 apply once per batch? Is there anything we can say truthfully next to "100% to charity"?
6. Non-US charities: which intermediaries, which countries, what fees, and how long?
7. Any restrictions on penalty or commitment mechanics, or on use inside an iOS app?

### Later markets: Goodstack (and Benevity if Teams goes enterprise)
- **Goodstack:** can the Hosted Gateway (donor pays the foundation, so there is a receipt and no ScrollJar custody) store a card and take variable monthly off-session charges? Is there an EU or Italian foundation, or a plan for one? Which receipts can an Italian donor use? What do API Service Orders cost?
- **Benevity:** does "Credit Card Functionality" support saved cards and variable off-session charges? Can receipts be issued per user (SSI §5e)? Which foundation would serve Italy? What does a minimum order cost?

---

## 5. Red flags to carry into the counsel call
1. **Family 1 puts ScrollJar in the money flow.** That covers Change (both flows), Pledge's Donate API, Goodstack's API and Benevity's "company donation". Benevity even says "held in escrow by Client as agent for the applicable Foundation". The money-transmission, Stripe-restricted and CCV questions in brief §1.1 stay open unless the partner becomes merchant of record.
2. **Double card fees.** ScrollJar pays Stripe to collect from users, then pays a partner's card or processing fee again (Pledge 2.9%+$0.30 by card, Goodstack 2.9%+, Benevity 2.75–3.75%), plus platform fees (Pledge 5%, Change 1.9–2.49%, Benevity 2.99%). All of this conflicts with "each coin goes 100% to charity" (L1 §1.4) unless ScrollJar absorbs it.
3. **Receipts to users are not the default.** Goodstack's API says end users get none. Benevity says "typically" none. Change depends on a flag. Only Pledge says users are the donors, in a 2020 help article.
4. **Charity consent.** Pledge's terms say consent "is NOT required", while California AB 488 and Hawaii (from 1 July 2026) have consent rules (L1 §1.1–1.2). Change sells a consent API. Goodstack filters on registries.
5. **Change says two different things about holding funds** (marketing vs. docs), and about whether unsigned charities get paid.
6. **Quid pro quo wording.** PPGF donors certify a grant is not "to pay for goods or services received by you". If a coin is seen as the price of opening an app, receipts and deductibility claims become doubtful with any DAF partner. Ask counsel how to describe a coin.
7. **No partner addresses Apple.** None claims Apple nonprofit approval or App Store guidance. 3.2.2(iv) (fundraising in-app) and 3.2.1(vi) (every listed nonprofit must have gone through Apple's approval) stay open whichever partner is chosen.
8. **Foreign coverage costs more and arrives later.** International charities via CAF America cost 5% for CA/UK and $400–1,000 vetting elsewhere, and via GlobalGiving 15% plus $750–900. Receipts are US-only for Change, Pledge, Every.org and Daffy. Goodstack adds UK and AU receipts. Only Benevity lists EU foundations (France, Germany, Ireland), and none for Italy.

---

## 6. What could not be verified
- **Off-session or variable recurring charges by any partner as merchant of record.** No provider documents it publicly. It has to be asked.
- Every.org's terms and enterprise plan (403). Whether its "disbursements batch file" is a partner product.
- PayPal Giving Fund's partner agreement and how partners send money. Only the Charity Search API is public.
- Benevity's credit-card donation guide (the page did not render), its API pricing, and whether receipts can go to each user.
- Goodstack's API pricing (Service Order) and whether its listed card fees apply to API donations.
- CAF America's and GlobalGiving's own corporate terms (blocked or 403). Their fees above come from Change's help centre.
- Whether any partner is registered as a charitable fundraising platform with the California AG or Hawaii AG. Pledge and Change *say* they handle registrations, but no registry entries were checked.
- Pledge's terms carry no "last updated" date. Its key help article on donor of record is dated 2020.
- Givinga and Daffy partner APIs (no public docs beyond the personal-key API).
- Any provider's position on penalty, stake or commitment-style donations. No explicit ban was found anywhere, but no explicit approval either.

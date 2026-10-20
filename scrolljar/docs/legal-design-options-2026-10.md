# ScrollJar — Product changes that lower legal risk (for L to decide)

**21 October 2026.** These come from `legal-brief-2026-10.md`. Nothing has been built: each item is a decision for L, and ideally a quick check with a lawyer. **Not legal advice.**

Each item shows: **now** (what the product does today), **option** (the change), **why** (the rule behind it), **cost** (what we give up), and **your call**.

---

## 1. Let users pick from a curated list of charities that have agreed (instead of any of 1M+)
- **Now:** any US charity on Every.org, chosen freely.
- **Option:** launch with a curated list of about 20–50 charities across causes, each with a short written agreement (and ideally Apple-approved, which means holding a Candid Seal of Transparency). Add more over time.
- **Why:** one change answers several rules at once:
  - **California:** written consent from each charity before using its name, or a "has not consented" warning;
  - **Hawaii:** written consent required, with no alternative;
  - **UK:** a written agreement with each charity named;
  - **US co-venturer states:** a written contract with the charity;
  - **Apple 3.2.1(vi):** every nonprofit listed in the app must be approved.
- **Cost:** less choice at launch, and some outreach to sign up charities. Users who want "their" charity have to wait, or suggest it.
- **Your call:** curated list at launch? About how many, and which causes?

## 2. Money goes straight to the charity partner, never through ScrollJar
- **Now:** ScrollJar's Stripe account charges the card on the 1st, then donates. Every.org's API can't do the second step.
- **Option A (simplest legally):** on the 1st, "Your jar is ready" opens the partner's checkout. The user confirms the donation there and gets their own receipt. The tip-out stays a ritual moment, now one the user completes.
- **Option B (keeps it automatic):** a partner that charges the user's card **on its own account** (a Stripe Connect "direct charge"), so the money never lands in ScrollJar's balance. The charity-partner comparison says who can do this.
- **Why:** if money passes through ScrollJar, money-transmitter licensing and state charity-registration rules come into play. Apple also says charity money must be collected outside the app (e.g. on a web page) unless you're an approved nonprofit.
- **Cost:** with A, some users may not complete the donation, and nothing forces them (the deal still works as friction and a pledge). With B, we depend on one partner's terms and fees.
- **Your call:** A or B? This depends on the partner comparison and on counsel.

## 3. Card fee: an optional "cover the fee" tick instead of adding it on top
- **Now (Free plan):** the card fee is added on top so the full price reaches the charity. Plus covers it.
- **Option:** on Free, a tick box at the first coin, **unticked by default**: "Add about $0.45 a month so the full amount reaches [charity]." Plus still covers fees.
- **Why:** the EU and UK ban charging consumers a fee for paying by card (PSD2 Art. 62(4); UK reg. 6A). California requires mandatory fees to be in the price. A voluntary extra donation may be treated differently; confirm with counsel.
- **Cost:** on Free, when unticked, the charity gets the price minus card fees. The claim becomes "100% of what you give goes to your charity; card processing fees are covered by Plus, or by you if you choose."
- **Your call:** switch to the optional tick, at least for the EU and UK?

## 4. Cap the switch-off charge
- **Now:** switching Screen Time off, removing the card or deleting the app mid-deal costs **5× the price**, after a 60-minute grace period.
- **Options:**
  - (a) the deal's own price, 1× (one ordinary coin);
  - (b) 2×, always within the monthly cap;
  - (c) no charge for deleting the app, kept only for switching Screen Time off;
  - (d) in the EU, no charge in the first 14 days.
- **Why:** EU law lists terms that make consumers pay "a disproportionately high sum" as possibly unfair, and EU withdrawal must be possible "without incurring any costs". A 5× charge is also the most likely to be refunded or disputed with the card company.
- **Cost:** a lower charge makes switching off a cheaper way out. The free way out (ending a deal with 24 hours' notice) already exists, so the charge only deters sudden escapes.
- **Your call:** which option? (a) is the simplest to defend.

## 5. Families: receipts in the parent's name; kids' names stay on the phone
- **Now:** the website says the jar tips out "with each kid's name on their receipt", which would send a child's name to the charity partner.
- **Option:** the receipt is in the parent's name. The app shows each kid's cause and their part of the jar, on the family's phones only. Kids' accounts collect the minimum and can't post.
- **Why:** under US children's privacy law (COPPA, amended rule in force since April 2026), sending a child's data to a third party needs **separate** verifiable parental consent. In Italy, under-14s need a parent's consent.
- **Cost:** none for the experience; the kid still sees "my hours went to the ocean charity" in the app. Website line to change: "with each kid's name on their receipt" → "and each kid sees the cause their hours went to".
- **Your call:** agree?

## 6. The main app (with money) is for adults: 18+
- **Now:** no stated minimum age for the main app. The spec targets students and Gen Z. Families kids use a no-money mode, and Backing is never for under-18s.
- **Option:** the money parts (coins, Plus, Backing) are 18+, checked with Apple's age-range signal. Teens join only through Families, without money.
- **Why:** minors generally can't be bound by contracts and payment mandates. Several children's laws apply to services "likely to be accessed" by under-18s (the UK Children's Code, Texas SB 2420, Brazil's ECA Digital). It also keeps us clear of Apple's kids rules.
- **Cost:** no under-18 users outside Families. Most college students are 18+.
- **Your call:** agree?

## 7. Backing a friend: physical gift cards only; unpicked treats go to the friend's charity
- **Now:** the treat is a gift card (books, coffee, cinema) **or a month of Plus**. If the friend never picks, the spec doesn't say what happens.
- **Option:** drop "a month of Plus" as a treat. Use gift cards for physical goods or services only (coffee, cinema, printed books). If no treat is picked within 30 days, the value goes to the friend's charity.
- **Why:** Apple requires in-app purchase for any gift tied to digital content or services (3.2.1(vii)), and for gift cards redeemable for digital goods (3.1.1). Value ScrollJar holds that nobody claims can fall under state unclaimed-property laws.
- **Cost:** one fewer treat option.
- **Your call:** agree?

## 8. Teams and Families pledges: charge only what's unlocked
- **Now:** the Teams spec says "unspent pledge rolls into the next campaign", and the Families screen says "whatever isn't unlocked rolls into next month". It's unclear whether the money is charged up front.
- **Option:** a pledge is a promise, not a payment. The employer is invoiced, and the parent charged, only for what's unlocked, at the end of each month or campaign. What isn't unlocked stays promised, uncharged. The wording can stay: "Whatever isn't unlocked rolls into next month."
- **Why:** holding customers' money between campaigns looks like custody of funds for later transfer (money transmission), and unclaimed money can fall under unclaimed-property law.
- **Cost:** none for users. Accounting is simpler.
- **Your call:** confirm that's the intended model.

## 9. Charity wording we can defend
- **Now:** "100% of every coin goes to charity. We keep none of it." The spec also wanted "100% reaches the program".
- **Option:** keep "We keep none of it." Never say "reaches the program". Before a charity is picked, show the partner's disclosure: who legally receives the donation, its fees, how long payout takes, and that it can redirect to a similar charity if needed.
- **Why:**
  - Every.org charges processing and payout fees, treats designations as recommendations, and can redirect money.
  - California and Hawaii require these disclosures before a charity is picked, plus a statement on tax deductibility.
- **Cost:** a short disclosure in the charity picker.
- **Your call:** agree? Final wording comes after the partner choice.

## 10. A fixed-position option for "Never mind, continue"
- **Now:** the link moves each time, as deliberate friction.
- **Option:** keep the moving link by default, plus a setting (or automatic with VoiceOver, Switch Control or Reduce Motion on) that keeps it in one place.
- **Why:** a moving target is hard with screen readers and motor impairments. US accessibility lawsuits are common, and the EU Accessibility Act will apply once ScrollJar outgrows the microenterprise exemption.
- **Cost:** none for most users.
- **Your call:** agree?

## 11. Mood check-ins and the efficacy study: separate opt-in, ethics approval first
- **Now:** optional mood check-ins (planned v1.5) would "feed the future efficacy study".
- **Option:** a separate, explicit opt-in just for research, with its own plain-words consent. Get independent ethics board approval before collecting anything. Store research data apart from account data.
- **Why:** Apple 5.1.3 requires consent and ethics approval for health research. EU privacy law treats data that can reveal mental health as sensitive (explicit consent). Washington's health data law allows private lawsuits.
- **Cost:** a little more setup before the study starts.
- **Your call:** agree?

---

### Quick decision list
- [ ] 1. Curated, consenting charities at launch
- [ ] 2. Money flow: A (user completes on partner checkout) or B (partner charges on its own account)
- [ ] 3. Optional "cover the fee" tick
- [ ] 4. Switch-off charge: (a) 1× / (b) 2× / (c) not for deletion / (d) none in EU first 14 days
- [ ] 5. Parent-name receipts for Families
- [ ] 6. Money features 18+
- [ ] 7. Physical gift cards only; unpicked treats to the friend's charity
- [ ] 8. Pledges charged only when unlocked
- [ ] 9. Defensible charity wording and disclosures
- [ ] 10. Fixed-position accessibility option
- [ ] 11. Research opt-in and ethics approval

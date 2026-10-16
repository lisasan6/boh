# C-findings: Friction, commitment devices and financial stakes (dossier sections 3–4, plus the playbook pitch)

Retraction/correction check for every paper below: I checked the Crossref `update-to`, `updated-by` and `relation` fields, and the Europe PMC record where one exists. None had a retraction, correction or expression of concern. "Replication" below means I searched Crossref and Europe PMC for follow-ups and contradicting work.

---

## 1. Per-citation verification

### 1.1 Grüning, Riedel & Lorenz-Spreen (2023), PNAS
- **Metadata: correct.** "Directing smartphone use through the self-nudge app one sec", *PNAS* 120(8): e2213114120, published 16 Feb 2023, doi:10.1073/pnas.2213114120. Open access as PMC9974409.
- **Opened:** the Crossref abstract, and the full text from Europe PMC (PMC9974409 fullTextXML).
- **Exact quotes:**
  - "we collected behavioral user data from 280 participants over 6 wk"
  - "on average 36% of the times participants attempted opening a target app, they closed that app again"
  - "users attempted to open target apps 37% less than in the first week"
  - "one sec decreased users' actual opening of target apps by 57% after six consecutive weeks"
  - Online experiment, "preregistered online experiment (N = 500)": "providing the additional option to dismiss the consumption attempt had the strongest effect. While the friction by time delay also reduced consumption instances, the deliberation message was not effective."
- **Design caveats that the dossier leaves out** (the paper's own words):
  1. The field study had **no control group**. It is a before-and-after comparison of new one sec users who opted in themselves. The authors write: "future research ought to conduct a controlled experimental trial in the field where users are randomly assigned to either a control group not using one sec or an experimental group … Only by comparing these two groups would we be able to … disregard the self-selection bias that confounds the results of the present paper."
  2. The "37% fewer" figure compares week 6 with **week 1**, and one sec was already switched on in week 1. It is not compared with a baseline before the app was installed.
  3. **Attrition was high.** "We recruited N = 719 … iOS users of one sec"; only 280 finished (about 39%). The authors note that people who dropped out "differ on some decisive psychological dimensions".
  4. **The behavioural outcome is the number of openings, not time spent.** The time claim is self-reported only: "participants report to spend 77 min less on digital apps per day".
  5. The N=500 experiment was run on Prolific. Its outcome was skipping viral video clips in a survey, not real app use.
- **Our claim that "a deliberation message alone did nothing": accurate.** The message condition matched the control condition: "the control group have the highest video consumption rate, however, showing the same values as the condition with the deliberation message."
- **Waiting-time friction:** it worked ("Implementing friction by time delay is also effective; however, it does not add to the effect of the option to dismiss"). The dismiss option beat friction alone (d = 0.44, p_holm = .004).
- **Replication:** no independent replication exists. Follow-ups come from the same group (Hansen et al. 2026; Aijala et al. 2026; Norwood et al. 2026). All are preprints; see sections 2 and 3.
- **Verdict:**
  - The numbers are **accurate**.
  - Framing them as "PNAS-level evidence" that friction "demonstrably works and compounds over time" is **overstated**, because the field result is uncontrolled and comes from self-selected users with 61% attrition.
- **Corrected wording:** "In a 6-week study of 280 people who had installed one sec themselves, users backed out of 36% of app-opening attempts, and actual openings fell 57% by week 6. There was no control group, so this is promising but not proof. In a separate randomised online experiment (n=500), the 'dismiss' option worked best and a waiting delay also helped. A reflective message on its own had no effect."

### 1.2 Castelo, Kushlev, Ward, Esterman & Reiner (2025), PNAS Nexus
- **Metadata: correct.** "Blocking mobile internet on smartphones improves sustained attention, mental health, and subjective well-being", *PNAS Nexus* 4(2): pgaf017, Feb 2025, doi:10.1093/pnasnexus/pgaf017, PMC11834938.
- **Opened:** the Crossref abstract, and the Europe PMC full text.
- **Sample:** "we retained 467 unique participants (242 in Intervention and 225 in Delayed Intervention)". Our "~400+" is technically true but vague; use **n=467**.
- **Compliance was low.** "of the 467 who committed … 266 set up the app … and 119 (25.5% of those who committed) met our preregistered definition of 'compliant'". The analyses are intention-to-treat on complete cases: 313 people completed all three surveys.
- **The 91% figure.** The paper says: "Overall, 90.7% of participants experienced an improvement in at least one of these" outcomes. Two caveats:
  - This is a simple before-and-after count across both arms, not a comparison between treatment and control.
  - With three noisy outcomes, roughly 87% of people would "improve on at least one" by chance alone (1 − 0.5³). **Do not use the 91% figure.** The valid result is the randomised comparison.
- **Mediators.**
  - The abstract lists "more time socializing in person, exercising, and being in nature".
  - The full text tested five preregistered or derived mediators: time in the "offline world", time consuming media, social connectedness, self-control and sleep. It reports that SWB and mental-health effects "were mediated by increased time spent in the offline world, decreased time spent consuming media, increased social connectedness, improved feelings of self-control, and increased sleep."
  - So **sleep is a mediator**, but the effect on sleep was small (dz = 0.14, P = 0.016). The authors also warn that "mediation analyses cannot provide definitive causal evidence", and "None of these factors mediated the effect … on sustained attention."
- **Other notes:**
  - The intervention blocked **all mobile internet** using the Freedom app. It did not block selected apps, so it is a far stronger dose than ScrollJar's.
  - The control condition was a delayed intervention: a randomised crossover trial with a waitlist.
- **Verdict:**
  - "~400+": imprecise.
  - The mediator wording is roughly accurate.
  - The "large share" of participants improving is **misleading**.
  - Saying the trial shows ScrollJar's block-first design is the evidence-backed one is **overstated**, because whole-phone internet blocking is not the same as blocking selected apps.
- **Corrected wording:** "In a randomised trial (n=467), blocking all mobile internet for two weeks improved sustained attention, mental health and well-being, even though only about a quarter of people fully kept to the block. Gains were linked to more time offline, more in-person connection, more sense of self-control and slightly more sleep."

### 1.3 Giné, Karlan & Zinman (2010), AEJ: Applied
- **Metadata: correct.** *AEJ: Applied Economics* 2(4): 213–235, Oct 2010, doi:10.1257/app.2.4.213.
- **Opened:** the Crossref abstract of the published version, and the Jan 2010 working-paper PDF hosted by IPA (poverty-action.org).
- **Exact quotes:**
  - Published abstract: "If they pass, their money is returned; otherwise, their money is **forfeited to charity**. Of smokers offered CARES, **11 percent took up**, and smokers randomly offered CARES were **3 percentage points** more likely to pass the 6-month test … this effect persisted in surprise tests at 12 months."
  - Working paper: "3.3 to 5.8 percentage points" at 6 months; "3.4 to 5.7 percentage points" at 12 months.
  - On size relative to quit rates without the contract: "Our intention-to-treat effects represent an 38.2% (3.4/8.9) or 38.8% (5.7/14.7) increase over these baseline likelihoods."
  - Sample: "2,000 smokers" in Mindanao.
  - Most people who took the contract still lost their deposit: "a surprisingly large proportion of smokers who voluntarily committed with CARES, **66%**, ended up failing to quit."
- **Verdict:**
  - "ITT ~3–6pp": accurate.
  - "~30–60% over baseline": **overstated**. The paper itself says about 38–39%.
  - The 11% take-up and the charity destination are both missing, and both matter. The charity destination is a direct precedent for ScrollJar.
- **Corrected wording:** "In an RCT with 2,000 smokers, a voluntary deposit account was offered. Money went to charity if a urine test showed smoking. Only 11% took it up, but being offered it raised verified quitting by 3–6 percentage points at 6 and 12 months, about 40% above the comparison group's quit rate. Two-thirds of those who signed up still lost their deposit."

### 1.4 Halpern et al. (2015), NEJM: confirmed
- **Metadata:** NEJM 372(22): 2108–2117, doi:10.1056/NEJMoa1414293, PMID 25970009. Crossref shows no updates. Two published comments exist: an NEJM editorial and a Nature news piece.
- **Opened:** the PubMed abstract.
- **Exact quotes:** "2538 participants"; "90.0% accepted … compared with 13.7% of those assigned to deposit-based programs"; "15.7% vs. 10.2%"; "13.2 percentage points (95% CI, 3.1 to 22.8) higher in the deposit-based programs … among the estimated 13.7% … who would accept participation in either type of program."
- **Nuance to add:** the deposit arms were "refundable deposits of $150 **plus $650 in reward payments**". So they were not pure stakes. The paper also says "the superiority of reward-based programs was sustained through 12 months."
- **Verdict:** accurate. Keep the "among those willing" qualifier. Consider adding that the deposit arms also paid rewards.

### 1.5 de Buisonjé et al. (2022), JMIR
- **Metadata: correct.** *J Med Internet Res* 24(10): e38339, Oct 2022, doi:10.2196/38339, PMID 36201384.
- **Opened:** the PubMed abstract.
- **Exact quotes:**
  - Sample: "N=126", 20 days, a €10 deposit or a €10 reward.
  - Pooled incentives beat control: "financial incentive conditions (mean 13.10 … days) had higher effectiveness than the control condition (mean 8.00 …; P=.002)".
  - "Deposit contracts had lower uptake (29/47, 62%) than rewards (50/50, 100%)".
  - "deposit contracts … were **not significantly more effective than rewards** (P=.17)".
  - "**Unexpectedly, loss frames … were significantly less effective than gain frames** (P=.007)".
  - The authors' cautions: "low uptake is an important obstacle", "limited statistical power".
- **Verdict: overstated and selectively cited.** The trial did not show that deposits beat rewards. The comparison with control pooled the deposit and reward arms. **Loss framing did worse**, which cuts against any "loss aversion" story for daily feedback.
- **Corrected wording:** "A small app-based RCT (n=126, 20 days) found that financial incentives as a group increased exercise goal days compared with no incentive. Deposits were taken up less often (62% vs 100%) and were not more effective than rewards. Loss-framed feedback did worse than gain-framed feedback."
- **Design implication:** ScrollJar's in-app feedback should be gain-framed (for example, money given or hours kept) and not loss-framed.

### 1.6 Stedman-Falls & Dallery (2020), JABA
- **Metadata: correct, with exact title and pages added.** "Technology-based versus in-person deposit contract treatments for promoting physical activity", *J Appl Behav Anal* 53(4): 1904–1921, doi:10.1002/jaba.776, PMID 32939749.
- **Opened:** the Crossref abstract.
- **Exact quote:** "with **12 individuals** … The 2 types of treatments were equally effective in increasing physical activity, but the technology-based deposit contracts were preferred by most participants."
- **Verdict:** accurate as stated, but it is a single-case design with 12 people. **Flag it as small N.**

### 1.7 Dossier claim: "no peer-reviewed evaluation of Forfeit, Opal, or any stakes-based screen-time app yet exists"
- **Searched:**
  - Europe PMC: commitment, deposit or commitment contract AND smartphone, social media or screen time, 2019–2026; financial incentive or loss aversion AND smartphone, screen time or social media use AND trial.
  - Crossref: "Opal screen time app evaluation", "Forfeit app commitment money screen time" and similar.
  - OpenAlex was over its rate limit and unavailable.
- **Found:**
  - No peer-reviewed evaluation of Forfeit, Opal or any commercial money-stake screen-time app.
  - Peer-reviewed small-N studies **do** exist on money contingencies for phone and social-media use:
    - **Williams-Buttari, Deshais, Reeve & Reeve (2023)**, *Behavior Modification* 47(2): 476–503, doi:10.1177/01454455221113561. Six college students deposited $40 and earned it back by meeting daily smartphone goals. Use went down for all six; four had consistent reductions above 40%. "Maintenance of intervention effects was limited for all participants."
    - **Stinson & Dallery (2023)**, *JABA* 56(2): 323–335, doi:10.1002/jaba.975. Contingency management (money for meeting goals) plus notifications reduced social-media time to goal levels in 9 out of 9 students.
    - **Olgun et al. (2026)**, *JABA* 59(2): e70061, doi:10.1002/jaba.70061. A replication with n=4.
- **Verdict:** accurate only if worded narrowly. A hostile reader could point to these studies and say that money-stake interventions for phone use have already been studied.
- **Corrected wording:** "No published evaluation of any commercial stakes-based screen-time app (Forfeit, Opal or similar) exists yet. A handful of tiny lab studies (4–9 students each) found that deposit or earn-back contracts reduced phone and social-media use while they were running, with limited lasting effect."

### 1.8 Playbook pitch: "friction at the moment of opening cuts app use by half (PNAS 2023)"
- **Verdict: overstated.**
  - The 57% figure is about app **openings**, not time spent or "use".
  - It comes from an uncontrolled before-and-after study of self-selected users.
  - Time spent was self-reported only.
- **Corrected wording:** "a pause at the moment of opening cut actual app openings by more than half over six weeks among people who chose to use it (PNAS 2023)."
- A safer, still strong alternative: "a short pause at app entry cut habitual app openings by more than half in a PNAS field study, and a waiting delay worked in a randomised experiment too."

---

## 2. Counter-evidence (all verified)

1. **Friction apps lose most of their users.** Norwood, Grüning, Riedel & Elson (2026), PsyArXiv preprint, doi:10.31234/osf.io/9eq3x_v3.
   - A preregistered RCT with N = 1,641 new one sec users.
   - "Retention was low … (65–70% dropout)". Gradually lengthening the delay did not help.
   - **Implication:** the 57% figure applies only to people who stay. ScrollJar's retention is the real risk, and we should not imply the effect holds across all users.
2. **People who choose commitment are not necessarily the people who benefit.**
   - Carrera, Royer, Stehr, Sydnor & Taubinsky (2022), *Rev Econ Stud* 89(3): 1205–1244, doi:10.1093/restud/rdab056. In a gym study (N = 1,248), "take-up is influenced both by noisy valuation and incorrect beliefs"; "Approximately half of the people who take up commitment contracts for higher gym attendance also take up commitment contracts for lower gym attendance." Their model says these contracts "lower consumer surplus".
   - John (2020), *Management Science* 66(2): 503–529, doi:10.1287/mnsc.2018.3236. With self-chosen penalties, "55% of clients default and incur monetary losses", and the chosen penalties may have been "too low".
   - Giné et al. (2010): 66% of people who took the contract lost their deposit.
   - **Implication:** for many users, a self-set price will simply be paid, again and again. That fits ScrollJar's model of giving to charity, but we cannot claim that stakes "work" for everyone who sets them. We need honest framing, the ability to change the price, and the copy without shame that we already plan.
3. **Low take-up of deposit contracts.** Halpern (13.7% vs 90%), Giné (11%) and de Buisonjé (62% vs 100%).
   - The opposite case, for balance: Allcott et al. (2022) found 78% kept binding limits that cost nothing to set. Limits without money attract far more people than money stakes do.
4. **Loss framing can backfire.** de Buisonjé (2022): loss-framed feedback was less effective than gain-framed feedback (P = .007).
5. **Restricting social media alone may not improve well-being.** Collis & Eggers (2022), *PLOS ONE* 17(8): e0272416, doi:10.1371/journal.pone.0272416. A limit of 10 minutes per day on social media led students to "substitute social media for instant messaging and do not decrease their total time spent on digital devices … we do not find any significant impact … on well-being and academic success."
6. **Effects fade after the intervention stops.**
   - Boudi et al. (2026), RCT preprint on Research Square, doi:10.21203/rs.3.rs-9135544/v1, n = 143 aged 11–25. Use fell 41% during the intervention, then returned "to baseline at post-test".
   - Williams-Buttari (2023): "Maintenance … limited".
   - Kim et al. (2026), JMIR scoping review, doi:10.2196/101150. Most studies of digital-overuse interventions last 4 weeks or less, and only 38% had any follow-up.
7. **Tools get switched off.**
   - Allcott et al. found that actual effects were smaller than the limits users set, "primarily because users snooze".
   - Peña-Albert et al. (2026), *JMIR Formative Research* 10: e85349, studied users who had already **disabled** their nudges. Only 46% accepted a prompt to turn them back on.
8. **The meta-analytic base is thin.** Monge Roffarello & De Russis (2023), *ACM TOCHI* 30(4), doi:10.1145/3571810 (opened the author manuscript on iris.polito.it).
   - Pooled effect of digital self-control tools on time spent: "g = 0.47 … 95% CI … 0.27 to 0.68".
   - Only **7 studies** went into the final model, all comparing baseline with intervention, and two outliers were removed.
   - It counts as moderate support, but the evidence is not strong.

---

## 3. New studies to add (verified)

1. **Allcott, Gentzkow & Song (2022), "Digital Addiction," *AER* 112(7): 2424–2463, doi:10.1257/aer.20210867.** Opened the Crossref abstract and the NBER w28936 full text.
   - "The limit treatment reduced FITSBY screen time by 22 minutes per day (16 percent) over 12 weeks"
   - "78 percent of participants set binding limits and continued using them"
   - People were willing to give up $4.20 for 3 weeks of access to the limits.
   - **Why it matters:** it is the best-controlled RCT showing that self-set limits reduce adults' use, and that many people want such limits.
   - **Suggested claim:** "In a large randomised trial, simply giving adults the ability to set app limits cut their social-media time by 16% over 12 weeks, and most kept their limits."
2. **Hansen, Grüning, Jespersen, Riedel & Normann (2026), PsyArXiv preprint, doi:10.31234/osf.io/ruvp3_v2.**
   - A randomised field experiment with 269 Danish adolescents and 1.2 million logged interactions.
   - "Daily social media use declined by 33.8% under planning and 38.0% under waiting, whereas reflection showed little evidence of change"
   - **Why it matters:** this is a randomised field test with **time spent** as the outcome. It supports a pause and planning step over moral messages.
   - **Caveats:** adolescents, not peer reviewed, and the comparison is against baseline and a reflection arm rather than a no-app control.
   - Use it only as "new evidence (preprint)".
3. **Mertens et al. (2026), Wellspent RCT, *JMIR mHealth uHealth* 14: e56824, doi:10.2196/56824.**
   - A 3-week randomised trial with 70 adult iPhone users.
   - A full-screen prompt with a quit or continue choice after a self-set limit cut time on the most problematic app by about 29 minutes per day (95% CI −42.8 to −16.0). It did not reduce problematic social-media use scores.
   - **Why it matters:** it is a peer-reviewed RCT of a self-set iPhone interrupt in adults, close to ScrollJar's mechanism.
   - **Caveats:** small and short.
   - **Suggested claim:** "A 2026 randomised trial found a self-set interrupt with a 'close' option cut adults' time on their most-used social app by about half an hour a day."
4. **Aijala et al. (2026), "Wait a sec", PsyArXiv preprint, doi:10.31234/osf.io/ngbue_v1.** An RCT with 135 participants over one week.
   - Target-app interactions decreased.
   - Mood at the moment of opening became more positive, and self-reported stress improved (dz −0.66).
   - **Why it matters:** this is early evidence that friction does not sour mood, which helps ScrollJar's "compassionate pause" positioning.
   - **Caveats:** preprint, one week only.
5. **Williams-Buttari et al. (2023) and Stinson & Dallery (2023)** (details in 1.7).
   - **Why it matters:** these are the only peer-reviewed tests of money contingencies for phone or social-media use. They support the mechanism and frame ScrollJar's research gap honestly.
   - **Caveats:** n = 6 and n = 9.

---

## 4. Top 3 risks

1. **"Cuts app use by half" in the press pitch.**
   - It is wrong on the outcome (openings, not use) and on the design (no control group, self-selected users, 61% attrition).
   - Another one sec trial found 65–70% dropout.
   - **Fix:** "cut app openings by more than half among people who used it (PNAS 2023)". Add Allcott's controlled 16% as the conservative anchor.
2. **The stakes evidence is presented as stronger and more general than it is.**
   - "30–60% over baseline" should be about 40%.
   - de Buisonjé is cited as support when deposits did **not** beat rewards and loss framing backfired.
   - Take-up of deposit contracts is 11–14% in the big trials.
   - Most people who sign up still lose their money (66% in Giné; 55% defaulted in John 2020).
   - **Fix:**
     - Correct the numbers.
     - Describe stakes as "works for the minority who choose it".
     - Drop de Buisonjé as positive evidence, or report it honestly.
     - Use gain-framed feedback.
     - Note that Giné's contract also sent forfeits to charity, which supports ScrollJar.
3. **The Castelo "91%" figure and the "first-mover, no evaluation exists" claim.**
   - The 91% is a before-and-after count that chance alone would produce at about 87%.
   - Whole-phone internet blocking is not the same as blocking selected apps.
   - Small peer-reviewed deposit-contract studies for phone use do exist.
   - **Fix:**
     - Use n = 467, the randomised effect, and the fact that only 25.5% fully complied.
     - Drop the 91%.
     - Narrow the gap claim to "no evaluation of any commercial stakes-based screen-time app".

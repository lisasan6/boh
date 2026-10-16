# F — Findings: Playbook §7 (social layer), §8 (charity & impact), "Never say" items 3–8

Checks run for every citation: Crossref metadata (`update-to` / `updated-by` / `relation`), PubMed or Europe PMC abstract where indexed, the FLoRA Replication Atlas (forrt.org/flora-replication-atlas/doi/<doi>), plus targeted searches for "replication" and "retraction". OpenAlex `is_retracted` was checked before its rate limit ran out. **No paper in my scope is retracted.** Three have corrections or errata (listed below), and none of those changes our claims.

---

## 1. Per-citation verification

### §7 The social layer

**1. "Kudos received predicts subsequent activity on Strava (Social Networks 2022)"**
- Verified: Franken, R., Bekhuis, H., & Tolsma, J. (2023). *Kudos make you run! How runners influence each other on the online social network Strava.* **Social Networks 72: 151–164** (issue dated Jan 2023, online 2022). DOI 10.1016/j.socnet.2022.10.001
- Opened: api.crossref.org/works/10.1016/j.socnet.2022.10.001 and the OpenAlex abstract.
- Quote: "We found that receiving kudos induced runners to run more and more often… Contrary to our expectation, kudos-friends who ran more and more often than ego were not the most influential. If anything, the reverse was true; athletes were more likely to come to resemble the running behavior of their kudos-friends who ran less and less often."
- Design: **329 members of 5 Dutch running clubs**, 11 monthly waves, observational network model (SIENA). Not an RCT. Not retracted; no replication found.
- Verdict: **Accurate on the core claim ("predicts"), but the year is wrong and it is small and observational.** The paper also found that runners drift toward their *less* active friends, which cuts slightly against using social features to raise effort.
- Corrected wording: "In a year-long study of 329 Strava club runners, receiving kudos was followed by more running (Franken et al., *Social Networks* 2023; observational)."

**2. Aral & Nicolaides, Nature Comms 2017**
- Verified: Aral, S., & Nicolaides, C. (2017). *Exercise contagion in a global social network.* **Nature Communications 8: 14753.** DOI 10.1038/ncomms14753. No updates on Crossref.
- Opened: Crossref abstract; full text at nature.com/articles/ncomms14753.
- Quotes: "~1.1M individuals who ran over 350M km… over 5 years"; "Less active runners influence more active runners, but not the reverse"; "runners are more influenced by peers whose performance is slightly worse, but not far worse, than their own as well as by those who perform slightly better, but not far better"; "the effects are much larger for downward comparisons than for upward comparisons." Also: "Both men and women influence men, while only women influence other women."
- Method: weather in friends' locations is used as an instrument, so this is a quasi-experimental causal estimate rather than an RCT. The sample is wearable/app users; the authors say they "may not represent the average person". A published peer-review comment questions whether "more active do not influence less active" is overstated, because the error bars overlap.
- Verdict: **Accurate** (1.1M, causal via natural experiment, comparable peers, influence flowing from slightly-behind to slightly-ahead).
- Suggested wording: "Exercise spreads between friends: in 1.1M runners, a natural experiment found people respond most to peers just a little behind or ahead of them (Aral & Nicolaides 2017)."
- Relevance caveat: running is something you add, while scrolling less is something you hold back from. Contagion of *abstaining* is not shown.

**3. Gollwitzer et al. 2009, "When Intentions Go Public"**
- Verified: Gollwitzer, P. M., Sheeran, P., Michalski, V., & Seifert, A. E. (2009). **Psychological Science 20(5): 612–618.** DOI 10.1111/j.1467-9280.2009.02336.x. (The full title on most PDFs adds "Does Social Reality Widen the Intention-Behavior Gap?". Crossref holds only the short title.)
- Quote (abstract): "Identity-related behavioral intentions that had been noticed by other people were translated into action less intensively than those that had been ignored (Studies 1–3)… it held among participants with strong but not weak commitment to the identity goal… this gives the individual a premature sense of possessing the aspired-to identity."
- Replication status: **I found no direct replication, successful or failed.** I checked Crossref, the FLoRA atlas (no record) and web searches; OpenAlex citing-work search was cut short by its rate limit. The brief's hint of a 2024/25 failed replication could not be confirmed. The original is 4 small student studies. **The newer and larger evidence points the other way** (Peetz et al. 2025; Harkin et al. 2016; Klein et al. 2020; see Counter-evidence).
- Verdict: **Overstated as a general law.** The design choice (show outcomes, not announcements) is still sensible.
- Corrected wording: "A 2009 lab study found that announcing an identity goal and being acknowledged for it can create a premature sense of 'already there'. Newer studies find that sharing goals often helps, especially with supportive or respected people. So we celebrate what you did, not what you announced."

**4. Lewis & Rook 1999**
- Verified: Lewis, M. A., & Rook, K. S. (1999). *Social control in personal relationships: Impact on health behaviors and psychological distress.* **Health Psychology 18(1): 63–71.** DOI 10.1037/0278-6133.18.1.63
- Quote (abstract): "A random sample of 242 individuals… Analyses yielded mixed support for the hypotheses, but… social control predicted less health-compromising behavior and more health-enhancing behavior as well as more distress."
- Verdict: **Overstated / partly wrong.** The paper is cross-sectional and found that social control *improved* health behaviour while also raising distress (the "dual effects" model). "Hiding" does not appear in the abstract. "Support helps" is not this paper's finding.
- Corrected wording: "Being policed by others can improve behaviour but also raises distress (Lewis & Rook 1999, correlational). We pick encouragement over monitoring." Drop "hiding" or give it a separate source.

**5. Schultz et al. 2007**
- Verified: Schultz, P. W., Nolan, J. M., Cialdini, R. B., Goldstein, N. J., & Griskevicius, V. (2007). *The Constructive, Destructive, and Reconstructive Power of Social Norms.* **Psychological Science 18(5): 429–434.** DOI 10.1111/j.1467-9280.2007.01917.x (PubMed 17576283). No updates; not in the FLoRA atlas.
- Quote: "a descriptive normative message detailing average neighborhood usage produced either desirable energy savings or the undesirable boomerang effect, depending on whether households were already consuming at a low or high rate… adding an injunctive message (conveying social approval or disapproval) eliminated the boomerang effect."
- Caveat: a single field study of about 290 households in one California town. That the approval signal was an emoticon is from my knowledge of the paper; the abstract does not say so.
- Verdict: **Accurate.** Note that "92% of jars survived this week" is itself a descriptive norm. That fits the paper as long as the approval signal is attached, and it avoids telling the minority that they are below the norm.

**6. Hanus & Fox 2015**
- Verified (Crossref): Hanus, M. D., & Fox, J. (2015). *Assessing the effects of gamification in the classroom: A longitudinal study on intrinsic motivation, social comparison, satisfaction, effort, and academic performance.* **Computers & Education 80: 152–161.** DOI 10.1016/j.compedu.2014.08.019. **Has a Corrigendum**: Computers & Education 127: 298 (2018), DOI 10.1016/j.compedu.2018.09.019. I could not read its content.
- Abstract: the publisher page returns 403 and the abstract is withheld from Crossref, OpenAlex and Semantic Scholar. The findings come only from secondary summaries and are **not primary-verified**. Those summaries say: about 80 students in two course sections over 16 weeks; the gamified section had badges, coins *and* a leaderboard; it showed lower intrinsic motivation, lower satisfaction and lower final exam scores.
- Verdict: **Overstated.** The effect cannot be pinned on leaderboards (the elements were bundled), it was not randomised at the individual level, and it is one small study. It is not "the canonical" test.
- Corrected wording: "In one semester-long class study, a badge-plus-leaderboard course lowered motivation and exam scores (Hanus & Fox 2015). Evidence on competition is mixed, so we choose self-comparison."

**7. Gamification metas ("modest, fragile effects at best")**
- Verified: Sailer, M., & Homner, L. (2020). *The Gamification of Learning: a Meta-analysis.* **Educational Psychology Review 32(1): 77–112** (online 2019). DOI 10.1007/s10648-019-09498-w
- Quote: "significant small effects of gamification on cognitive (g = .49…), motivational (g = .36…), and behavioral learning outcomes (g = .25…)… the effect… on cognitive learning outcomes was stable in a subsplit analysis of studies employing high methodological rigor, effects on motivational and behavioral outcomes were less stable… combining competition with collaboration were particularly effective."
- Verdict: **Slightly overstated.** "Small to moderate; less robust for motivation and behaviour" is fair. "At best" is not, and the same meta-analysis found competition plus collaboration *helped*. See also STEP UP below.

### §8 Charity & impact display

**8. Small, Loewenstein & Slovic 2007 (identifiable victim; "adding statistics reduces giving")**
- Verified: Small, D. A., Loewenstein, G., & Slovic, P. (2007). *Sympathy and callousness: The impact of deliberative thought on donations to identifiable and statistical victims.* **Organizational Behavior and Human Decision Processes 102(2): 143–153.** DOI 10.1016/j.obhdp.2006.01.005
- Original claim (as summarised in the replication's full text): in Study 3, "those in the joint presentation condition donated less than those in the identified victim condition".
- **Replication: FAILED.** Maier, Wong & Feldman, *Collabra: Psychology* 9(1): 90203 (DOI 10.1525/collabra.90203). The volume is dated 2023; the PDF header says 2024. It is preregistered, N≈1,004, with hypothetical donations. Quote: "We found no empirical support for the identifiable victim effect (ηp2 = .000, 95% CI [.000, .003]) and subsequently no support for debiasing." Its reanalysis of the meta-analysis below with bias correction: "moderate evidence for publication bias (BF01 = 0.11) and strong evidence for the absence of the average effect (BF01 = 14.93), with a model-averaged mean effect size estimate of r = 0.002". The FLoRA atlas records this as a "failed" replication. Opened: Warwick WRAP PDF and the FLoRA page.
- Meta-analysis: Lee, S., & Feeley, T. H. (2016). *The identifiable victim effect: a meta-analytic review.* **Social Influence 11(3): 199–215.** DOI 10.1080/15534510.2016.1216891, with a **Correction** (DOI 10.1080/15534510.2017.1340136). Quote: "an overall significant yet modest IVE (r = .05)… reliable mainly when there is a single identified or a single unidentified victim".
- Also: Moche, Karlsson & Västfjäll (2024), PLOS ONE 19(3): e0300863, five studies with N = 7,996: "while the level of identifiability influences affective reactions, this effect does not extend to donations".
- Verdict: **Wrong as worded ("outperforms… adding statistics *reduces* giving").** Our design choice, a concrete unit, still has good support from a *different* mechanism (tangible impact; see Cryder 2013 and Saeri 2023 below).
- Corrected wording: "Concrete, tangible impact ('€5 ≈ 10 school meals') is one of the better-supported ways to make giving feel meaningful (Saeri et al. 2023 meta-review; Cryder et al. 2013). We show one clear unit, not data dumps." Do not cite the identifiable-victim effect.

**9. Hsee et al. 2013 "Unit asking"**
- Verified: Hsee, C. K., Zhang, J., Lu, Z. Y., & Xu, F. (2013). *Unit Asking: A method to boost donations and beyond.* **Psychological Science 24(9): 1801–1808.** DOI 10.1177/0956797613482947 (PubMed 23907547)
- Quote: "merely asking donors to indicate a hypothetical amount for helping one of the needy persons before asking donors to decide how much to donate for all of the needy persons… greatly increases donations… Different from… identifiable-victim effects".
- Replicated: Karlsson, Hellström, Moche & Västfjäll (2020), *Judgment and Decision Making* 15(6): 989–993. Quote: "Across three domains, we find that unit asking increased donations." The FLoRA atlas records it as successful.
- Verdict: **Overstated as support for "one vivid unit".** Unit asking is a specific two-step ask, and the authors say it is distinct from the identifiable-victim effect. It would apply only if ScrollJar asked "what would you give for one meal?" before setting the price.

**10. Gneezy, Keenan & Gneezy 2014 (overhead aversion)**
- Verified: **Science 346(6209): 632–635.** DOI 10.1126/science.1253932 (PubMed 25359974). No corrections.
- Quote: "informing potential donors that overhead costs are covered by an initial donation significantly increases the donation rate by 80% (or 94%) and total donations by 75% (or 89%) compared with the seed (or matching) approach." Field sample: 40,000 potential donors.
- Replication: included in Camerer et al. 2018, *Nature Human Behaviour* (SSRP; Gneezy et al. appears in the reference list, verified on nature.com). The FLoRA atlas records "successful". My understanding, not verified, is that SSRP re-ran the *lab* component, not the 40k-letter field test.
- Verdict: **Accurate on the effect; overstated on application.** The test was a third party covering overhead in a fundraising letter. ScrollJar's context is a self-imposed penalty, and "precisely the highest-converting frame" is an extrapolation.
- **Critical:** "100% reaches the program" must be literally true *net of payment-processing and donation-platform fees*. If any fee is deducted, this is the easiest line in the deck to catch out.
- Corrected wording: "Donors give more when they know overhead is already covered (Gneezy et al., *Science* 2014). That's why we pass on 100% of your coin [after card fees, if any; say exactly who pays them]."

**11. Dunn, Aknin & Norton 2008 + registered replications ("robust in large samples per Aknin/Dunn 2022")**
- Verified: Dunn, E. W., Aknin, L. B., & Norton, M. I. (2008). *Spending Money on Others Promotes Happiness.* **Science 319(5870): 1687–1688.** DOI 10.1126/science.1150952. **PubMed lists an Erratum: Science 2009; 324(5931): 1143.**
- Registered replication: Aknin, L. B., Dunn, E. W., Proulx, J., Lok, I., & Norton, M. I. (2020). *Does spending money on others promote happiness?: A registered replication report.* **JPSP 119(2): e15–e26.** DOI 10.1037/pspa0000191. Results: Exp 1 (N = 712) positive; Exp 2 (N = 1,950) "did not report greater happiness"; Exp 3 (N = 5,199) "greater happiness but differences were small". The authors conclude: "magnitude… depends on several methodological features". FLoRA: "mixed".
- Close replication: Kim et al. (2022), PLOS ONE 17: e0272434. Quote: "original study (N = 46)… in our replication (N = 133), we did not observe a significant difference", although a secondary, more direct happiness measure was significant.
- **No "Aknin/Dunn 2022" paper was found.** The 2022 Aknin item that does exist (Cash, Aknin & Proulx, *Collabra* 2022) is about which features of recalled spending predict happiness, not about robustness.
- Verdict: **"Robust in large samples per Aknin/Dunn 2022" is unverifiable or wrong.** The rest ("real but smaller, conditional") is accurate.
- Corrected wording: "Spending on others tends to lift mood a little in the moment. Large preregistered replications find the effect is real but small and depends on the situation (Aknin et al. 2020)."

### "Never say" items 3–8

**3. "21 days to form a habit"**
- Verified: Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010). *How are habits formed: Modelling habit formation in the real world.* **European Journal of Social Psychology 40(6): 998–1009** (online 2009). DOI 10.1002/ejsp.674. Quote: "The time it took participants to reach 95% of their asymptote of automaticity ranged from 18 to 254 days"; "Missing one opportunity to perform the behaviour did not materially affect the habit formation process." The modelled sample was **62 participants, 39 with good fit** (96 enrolled).
- Newer: Singh, Murphy, Maher & Smith (2024), *Healthcare* 12(23): 2488, DOI 10.3390/healthcare12232488. 20 studies, N = 2,601: "median 59–66 days… means 106–154 days… substantial individual variability (4–335 days)"; most studies at high risk of bias.
- Maltz origin (*Psycho-Cybernetics*, 1960, "a minimum of about 21 days"): **not primary-verified.** Treat it as folklore and don't cite Maltz.
- Verdict: **Accurate.** Better wording: "Habits take about two months on average, with huge variation (from a few weeks to most of a year), and missing a day doesn't reset you (Lally 2010; Singh 2024)." The second half is ideal rough-day copy.

**4. "65%/95% accountability" (attributed to ASTD)**
- Searched: no primary ASTD/ATD study, report, methodology or dataset turned up. Every occurrence is a blog or coaching page, sometimes conflated with Gail Matthews' unpublished Dominican University conference study, whose figures vary between retellings. Checked by web search only; an absence of evidence cannot be proven.
- Verdict: **Accurate to avoid it.** "Fabricated" is stronger than we can prove; say "**untraceable** — no primary study has ever been found."
- Giné, Karlan & Zinman, *AEJ: Applied* 2(4): 213–235 (2010), DOI 10.1257/app.2.4.213, verified: "11 percent took up, and smokers randomly offered CARES were 3 percentage points more likely to pass the 6-month test… persisted in surprise tests at 12 months." The money was forfeited **to charity**, which is directly relevant to ScrollJar.

**5. StickK "72% success"**
- I could not find "72%" on any reachable page (stickk.com returns 403; the Wayback Machine failed). Closest figures:
  - A secondary retelling of an NYT article gives 71.5% with money at stake.
  - The Harvard HBS case on edX (opened) says: "Individuals' reported weight loss success rates using stickK ranged from a high of 61.3%… (using both financial incentives and a referee…) to 14.5% without a referee or financial stakes."
  - The ICWSM 2024 paper (397,456 stickK commitments, opened) says: "accountability and stakes are not often used but are strong determents of success". That is observational and self-reported.
- Verdict: **Accurate to avoid it.** "Self-reported, unverified, self-selected users."

**6. "Losses hurt twice as much"**
- Verified: Brown, A. L., Imai, T., Vieider, F. M., & Camerer, C. F. (2024). *Meta-analysis of Empirical Estimates of Loss Aversion.* **Journal of Economic Literature 62(2): 485–516.** DOI 10.1257/jel.20221698. Quote: "607 empirical estimates… mean loss aversion coefficient is 1.955 with a 95 percent probability that the true value falls in the interval [1.820, 2.102]."
- Verdict: **"About twice, on average" is accurate.** Add "estimates vary widely across people and settings."

**7. Overselling giving-makes-you-happy** — **Accurate** to avoid; see item 11 and Falk & Graeber in Counter-evidence.

**8. Noun-identity claims**
- Original: Bryan, Walton, Rogers & Dweck (2011), *PNAS* 108(31): 12653–12656, DOI 10.1073/pnas.1103343108.
- **Three failed replications, all large field experiments:**
  - Gerber, Huber, Biggers & Hendry (2016), *PNAS* 113(26): 7112–7117, DOI 10.1073/pnas.1513727113: "In contrast to the 11 to 14% point greater turnout… we find no statistically significant difference… point estimate… approximately zero".
  - Gerber, Huber & Fang (2017), *Political Psychology*, DOI 10.1111/pops.12446.
  - Gerber, Huber & Fang (2023 print; online 2020), *Behavioural Public Policy* 7(2): 380–394, DOI 10.1017/bpp.2020.57: "no evidence that noun wording increases turnout… even in competitive states."
- FLoRA: 2 replications recorded, both failed.
- Verdict: **Accurate to avoid.** Upgrade "contested replications" to "**failed large replications**."

---

## 2. Counter-evidence

1. **Sharing goals usually helps rather than hurts.** This weakens how we use Gollwitzer.
   - Peetz, Buehler & Wells (2025), *PSPB* 52(10): 3447–3463, DOI 10.1177/01461672251382271. Four longitudinal studies, N = 1,035: "participants assigned to share a goal… later reported receiving more support from others, which in turn was linked to greater goal pursuit effort and progress."
   - Harkin et al. (2016), *Psychological Bulletin* 142(2): 198–229, DOI 10.1037/bul0000025. 138 RCTs, N = 19,951: monitoring progress improves attainment (d = 0.40), with "larger effects on goal attainment when the outcomes were reported or made public".
   - Klein, Lount, Park & Linford (2020), *J Applied Psychology* 105(4): 372–389, DOI 10.1037/apl0000441: telling a *higher-status* audience raises commitment and performance.
   - → Keep "celebrate outcomes", but drop "announcing reduces striving" as a flat rule. An optional "tell one person you trust" feature is evidence-supported.
2. **Competition can beat support.** Patel et al. (2019), STEP UP RCT, *JAMA Internal Medicine* 179(12): 1624–1632, DOI 10.1001/jamainternmed.2019.3505 (PubMed 31498375). N = 602 adults; steps vs control: competition +920, support +689, collaboration +637; "competition was the most effective" and the only arm still significant at follow-up.
   - → "No leaderboards" is a brand and values choice consistent with self-compassion. Do **not** claim the science shows competition fails. The support arm working is good news for a kudos-style design.
3. **Commitment devices carry social stigma.** Kristal & Zlatev (2024), *JPSP* 126(5): 804–817, DOI 10.1037/pspa0000385: "individuals trust people who choose to use a commitment strategy less than those who choose to use willpower… people select commitment strategies more in private than in public."
   - → Make the social layer opt-in, with private by default. This is a real risk for a public feed.
4. **The giving glow may reverse.** Falk & Graeber (2020), *PNAS*, DOI 10.1073/pnas.1914324117: "Our data weakly replicate the positive effect… but only for the very short run. One month later, the sign of the effect reversed."
   - → Never promise that donating makes you happier.
5. **The identifiable-victim effect is near zero after bias correction** (Maier et al. 2023/24; Moche et al. 2024, N = 7,996). → Rephrase §8 around tangible impact.
6. **Charity forfeits may deter less than anti-charity forfeits. This is a hypothesis, not tested.** Halpern, Asch & Volpp (2012), *BMJ* 344: e522, DOI 10.1136/bmj.e522 (PMC4707874, opened): "we might expect greater success if lost deposits were to go to causes or people one dislikes rather than a favourite charity."
   - A stickK conference abstract on weight loss (anti-charity 7.7% vs charity 6.8% loss) could not be opened, so it is unverified.
   - The best causal evidence, Giné et al. 2010 (charity forfeit, RCT), shows charity-destination contracts **do work**.
   - → Our honest line: "Forfeiting to charity has worked in a randomised trial (Giné et al. 2010). Whether a 'disliked cause' would deter more hasn't been tested, and we won't make you fund causes you oppose."
7. Strava (Franken 2023): runners converged toward *less* active kudos-friends. Social exposure can pull people down as well as up.

---

## 3. New studies to add (all verified)

| Study | Why it matters for ScrollJar | Suggested plain-English claim |
|---|---|---|
| **Peetz, Buehler & Wells (2025)**, *PSPB* 52(10): 3447–63, DOI 10.1177/01461672251382271 (4 longitudinal studies, N = 1,035) | Modern, partly randomised evidence that sharing a goal brings support and effort; supports an optional "tell one friend" feature | "Telling someone about your goal tends to bring support and more effort (Peetz et al. 2025)." |
| **Harkin et al. (2016)**, *Psych Bull* 142(2): 198–229 (138 RCTs, N ≈ 20k) | Gives the weekly recap and stats tab a meta-analytic basis | "Tracking your progress helps you reach goals, especially when it's written down or shared (138-trial meta-analysis)." |
| **Saeri et al. (2023)**, *Voluntas* 34(3): 626–642, DOI 10.1007/s11266-022-00499-y (21 reviews, 1,339 studies) | Best summary of which donation framings work; "describing the impact of the donation" is among the most robust | "Showing exactly what a donation does is one of the best-supported ways to make giving count (2023 meta-review)." Note: the overall effect is small (r = 0.08). |
| **Cryder, Loewenstein & Scheines (2013)**, *OBHDP* 120(1): 15–23, DOI 10.1016/j.obhdp.2012.08.002 | Direct support for "€5 ≈ 10 school meals": the "identified intervention effect" works through perceived impact | "Specific details about what your money does increase giving (3 experiments)." Single paper; replication status unknown. |
| **Kristal & Zlatev (2024)**, *JPSP* 126(5): 804–817 (7 studies) | Design guardrail: people judge commitment-device users, so keep jars private by default | Internal design rationale only. |
| **Patel et al. (2019)**, STEP UP RCT, *JAMA IM* (N = 602) — older than 2023, but the strongest RCT on social features | Shows a "support" design works (+689 steps/day); honest that competition worked best | "In a 602-person trial, a support-buddy design increased daily activity (Patel et al. 2019)." |
| **Singh et al. (2024)**, *Healthcare* 12: 2488 | Updates Lally | "Habits take around two months on average, but anywhere from weeks to most of a year." |

Not found: no 2023–26 RCT of peer accountability specifically for reducing phone or social-media use. Don't imply one exists.

---

## 4. Top 3 risks

1. **"100% reaches the program" + the identifiable-victim effect in §8.** The IVE has a failed preregistered replication and a bias-corrected meta-analytic effect of r ≈ 0.002. The "100%" claim is false if any card or platform fee is taken from the coin. **Fix:** cite tangible impact (Saeri 2023, Cryder 2013) instead of the IVE. Make the 100% line literally true, or say exactly "100% after card fees, which are [X]".
2. **Gollwitzer 2009 as a rule ("announcing *reduces* striving") plus "no leaderboards" framed as science.** Larger newer studies show goal sharing helps (Peetz 2025; Harkin 2016), and the best RCT found competition worked best (STEP UP 2019). Hanus & Fox is one small bundled-gamification class study with a corrigendum. **Fix:** present both as *values-based design choices informed by* evidence ("we choose self-comparison because comparison can sting"). Do not say "science shows leaderboards fail."
3. **Wrong or unfindable specifics.** These include:
   - "Social Networks 2022" (it is 2023, with N = 329 and observational)
   - "robust in large samples per Aknin/Dunn 2022" (no such paper; the 2020 RRR is mixed)
   - Lewis & Rook cited for "support helps" and "hiding" (it found control *improves* behaviour while raising distress)
   - "fabricated" for the ASTD statistic (say "untraceable")
   - **Fix:** apply the corrected wordings above.

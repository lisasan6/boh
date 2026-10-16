# D-findings: penalty framing, licensing, loss aversion, guilt/shame, self-compassion, fresh starts

Scope: dossier §5 and playbook §3–4, plus the "scientific pitch" sentence at playbook line 86, which reuses these claims.
Method: Crossref API metadata for every DOI, including checks of the `update-to`, `updated-by` and `relation` fields. I also checked OpenAlex `is_retracted`. Abstracts came from Crossref, PubMed or OpenAlex. I read full text where noted: the Gneezy & Rustichini 2000 PDF, the Gneezy, Imas & Madarász 2014 PDF and the Brown et al. OSF preprint.
**Retraction check:** none of the papers below is retracted, and none carries a correction or expression-of-concern notice in Crossref. Each entry still lists its replication status.

---

## 1. Per-citation verification

### 1.1 Gneezy & Rustichini (2000), "A Fine Is a Price" (dossier §5; playbook §3)
- **Metadata:** Gneezy U, Rustichini A. *J Legal Studies* 29(1):1–17, 2000. doi:10.1086/468061. Correct as cited.
- **Opened:** Crossref; OpenAlex abstract; full PDF at rady.ucsd.edu/_files/faculty-research/uri-gneezy/fine.pdf.
- **Quotes:**
  - "We introduced a monetary fine for late-coming parents. As a result, the number of late-coming parents increased significantly. After the fine was removed no reduction occurred."
  - Design: "we introduced a fine in six of the 10 day-care centers"; "A fine of NIS 10 is relatively small"; the other four centres were controls.
  - The authors concede: "a 'large enough' fee would eventually reduce the behavior."
- **Replication:** Metcalf, Satterthwaite, Dillbary & Stoddard (2020), *Int Rev Law Econ* 63:105906, doi:10.1016/j.irle.2020.105906, tried to replicate it and failed: "Our survey results do not replicate the original findings… the introduction of fines causes respondents to reduce non-compliant behaviour." That was a vignette study on MTurk, not a field replication. I found no field replication either way.
- **Verdict: Accurate.** But this is a single field study of 10 centres, so treat it as an illustration.
- **Wording to add:** "one well-known field study (10 daycare centres) — a vignette replication found fines deterred, so treat it as a design caution, not a law."

### 1.2 Blanken, van de Ven & Zeelenberg (2015), moral licensing meta-analysis (dossier §5; playbook §3)
- **Metadata:** *PSPB* 41(4):540–558. doi:10.1177/0146167215572134. Correct.
- **Opened:** Crossref abstract.
- **Quote:** "meta-analysis of 91 studies (7,397 participants)… Cohen's d of 0.31… published studies tend to have larger moral licensing effects than unpublished studies. We found no empirical evidence for other moderators."
- **Replication status (checked):**
  - Blanken et al. (2014), *Social Psychology* 45(3):232–238, doi:10.1027/1864-9335/a000189. Three replications (N = 105, 150, 940) "did not confirm the moral licensing effect."
  - Urban, Bahník & Kohlová (2019), *J Environ Psychol* 63:139–147, doi:10.1016/j.jenvp.2019.01.011. "Green consumption does not make people cheat: three attempts to replicate…"
  - Kuper & Bott (2019), *Meta-Psychology* 3, doi:10.15626/MP.2018.878. After bias correction: "The adjusted effect sizes were reduced to d = −0.05, p = .64 [PET-PEESE] and d = 0.18, p = .002 [3PSM]… both the evidence for and the size of moral licensing effects has likely been inflated by publication bias."
  - Rotella et al. (2025), §1.4: after correction, licensing is about zero when people are unobserved.
- **Verdict:**
  - "Real but small (d≈0.31)" is **Overstated**: after bias correction the effect is somewhere between zero and about d = 0.18.
  - The dossier's line "the loss-aversion effect of forfeiting money is far larger" is **Unverifiable**. No study compares these two quantities; λ is a ratio, not an effect size on behaviour.
- **Corrected:** "The original meta-analysis estimated a small licensing effect (d ≈ 0.31), but bias-corrected re-analyses and failed replications suggest it is smaller still, possibly near zero when no one is watching."

### 1.3 Gneezy, Imas & Madarász (2014), "Conscience Accounting" (playbook §3; pitch line 86)
- **Metadata:** "Conscience Accounting: Emotion Dynamics and Social Behavior," *Management Science* 60(11):2645–2658. doi:10.1287/mnsc.2014.1942.
- **Opened:** Crossref abstract; full published PDF at rady.ucsd.edu/_files/faculty-research/uri-gneezy/mnsc-E1942.pdf.
- **What it shows:**
  - In a lab deception game, people who lied were more likely to donate when a surprise donation option came right after: "30% (6) of the participants who told the truth chose to donate compared with 73% (27) of those who lied."
  - The effect fades with delay: liars donated 52% (14) when the option came later.
  - **Critical for ScrollJar ("Paying for Sins"):** "63% (39) of senders lied in the Informed Incentive treatment compared with 48% (30)… senders were more willing to lie when they knew that a donation opportunity would follow."
  - **When liars could choose when to donate,** "43% (10) chose to make their donation decisions early and 57% (13) chose… late," and late choosers donated far less (31% vs 90%). Most transgressors avoided the immediate donation.
  - Guilt was **never measured**; the paper infers it ("We interpret this increase… as being driven by a temporal increase in guilt").
- **Verdict on our wording:**
  - "people prefer to donate immediately" is **Wrong**. Most chose to delay.
  - "it genuinely relieves guilt" is **Unverifiable**, because guilt was not measured.
  - "transgress→donate ordering works as moral cleansing/repair, closing the loop" is **Overstated**.
  - Pitch line 86, "donations immediately after a slip convert guilt into repair," is **Overstated**.
  - We also **omit the finding most relevant to us**: knowing a donation will follow made people transgress *more*. That is a direct analogue of a known charity price on an override.
  - The samples are small (cells of 6–39) and lab-based.
- **Corrected:** "In lab experiments, people who had just broken a rule were more likely to give to charity if asked right away, and the urge faded with time (Gneezy, Imas & Madarász 2014). The same study warns that knowing a donation will follow can make rule-breaking *more* likely, so ScrollJar frames the payment as a broken promise, not a ticket."

### 1.4 "A 2025 meta finds licensing mainly when behavior is observed" (playbook §3)
- **Found:** Rotella A, Jung J, Chinn C, Barclay P. "Observation Moderates the Moral Licensing Effect: A Meta-Analytic Test of Interpersonal and Intrapsychic Mechanisms." *PSPB*, online 8 Jul 2025; Crossref lists vol. 52(9):2792–2808. doi:10.1177/01461672251345512.
- **Opened:** Crossref abstract.
- **Quote:** "In a multi-level meta-analysis of 115 experiments (N = 21,770), moral licensing was stronger when participants were observed (g = 0.65) than unobserved (g = 0.13). After accounting for publication bias… moderate evidence for licensing when participants were observed (g = 0.51; BF10 = 9.14), but moderate evidence against licensing when unobserved (g = −0.01; BF10 = 0.11)."
- **Verdict: Accurate.** Add the citation by name.
- **Caveat:** this is about moral licensing (a good deed licensing a bad one). It does not cover the "paying for sins" pathway in §1.3, which worked even in a semi-private lab setting. So "private-first design weakens licensing" is fair. "Private design neutralises the risk that the price feels like a permit" is not supported.

### 1.5 Brown, Imai, Vieider & Camerer (2024), loss aversion meta-analysis (playbook §3; pitch)
- **Metadata:** "Meta-analysis of Empirical Estimates of Loss Aversion," *J Econ Literature* 62(2):485–516. doi:10.1257/jel.20221698.
- **Opened:** Crossref abstract; OSF preprint full text (osf.io/hnefr).
- **Quote (published abstract):** "607 empirical estimates… from 150 articles… the mean loss aversion coefficient is 1.955 with a 95 percent probability that the true value falls in the interval [1.820, 2.102]. Few characteristics are substantially correlated with differences in the mean estimates."
- **The preprint also says:**
  - "researchers more concerned about publication bias may want to consider lower values (e.g., λ = 1.73–1.74)"
  - field experiments and non-student samples give modestly *higher* estimates.
- **Verdict:**
  - λ ≈ 1.95 with CI [1.82, 2.10] is **Accurate**. Strictly it is a Bayesian credible interval; the upper bound is 2.102.
  - "weaker at small stakes" is **not in Brown et al.**, so it is mis-attributed. It is supported by Ert & Erev (2013), *Judgment and Decision Making* 8(3):214–235, doi:10.1017/s1930297500005945, who list "the use of high stakes" among the conditions that increase loss-averse behaviour.
  - Caveat: λ comes mostly from choices between risky gambles. Applying it to deterrence by a sure fee is an extrapolation.
- **Corrected:** "Across 150 studies, losses weigh roughly twice as much as equal gains (λ ≈ 1.96, likely range 1.82–2.10; Brown et al. 2024), and somewhat less after allowing for publication bias. Other work suggests the asymmetry is weaker for small amounts (Ert & Erev 2013)."

### 1.6 Harbaugh, Mayr & Burghart (2007) (playbook §3)
- **Metadata:** "Neural Responses to Taxation and Voluntary Giving Reveal Motives for Charitable Donations," *Science* 316(5831):1622–1625. doi:10.1126/science.1140738. PMID 17569866.
- **Opened:** Crossref and PubMed abstract; University of Oregon press release on ScienceDaily for N.
- **Quote:** "even mandatory, tax-like transfers to a charity elicit neural activity in areas linked to reward processing… neural activity further increases when people make transfers voluntarily."
- **N:** "19 women participants" (press release).
- **Verdict: Accurate**, and the "small N" flag is correct; say 19 women, fMRI.
- **Caveat:** in the study, "voluntary" meant choosing each transfer in the moment. ScrollJar's penalty is mandatory once the price is set, so authorship is pre-commitment, not in-the-moment choice. Keep the claim soft ("may"), and don't call it neuroscience proof.

### 1.7 Marlatt abstinence violation effect + "confirmed in real-time EMA studies" (playbook §4)
- **Primary sources:**
  - Construct: Curry, Marlatt & Gordon (1987), "Abstinence violation effect: Validation of an attributional construct with smoking cessation," *J Consult Clin Psychol* 55(2):145–149, doi:10.1037/0022-006x.55.2.145. Metadata only; abstract not retrieved.
  - Real-time tests:
    - Shiffman et al. (1996), *JCCP* 64(5):993–1002, doi:10.1037/0022-006x.64.5.993, PMID 8916628.
    - Shiffman et al. (1997), *Cognitive Therapy and Research* 21(5):497–523, doi:10.1023/a:1021853301255 (metadata only).
    - Kirchner, Shiffman & Wileyto (2012), *J Abnorm Psychol* 121(1):187–197, doi:10.1037/a0024451, PMID 21787035.
- **Quotes:**
  - Shiffman 1996 (palmtop EMA, N = 133): "Indicators of the Abstinence Violation Effect—self-efficacy, attributions, and affective reactions to the lapse—generally failed to predict progression to relapse, but participants who felt like giving up after the first lapse progressed more rapidly… Participants who attempted restorative coping were less likely to progress to another lapse on the same day."
  - Kirchner 2012 (203 smokers, 1,001 lapses): "Neither self-blame, self-efficacy, nor guilt following participants' first lapse predicted relapse… drops in self-efficacy were associated with accelerated progression… increases in internal attributions of blame actually protected against lapsing (HR = 0.98)."
- **Verdict: Wrong.** The key EMA studies largely did *not* confirm the attribution/shame part of the AVE. What held up was low self-efficacy and "feeling like giving up" (bad), and restorative coping (good).
- **Corrected:** "Real-time smoking studies found that what predicts the slide from one slip to the next is feeling like giving up and losing confidence; trying to get back on track straight away protects. So the after-slip screen restores confidence and offers one small next step." Do not claim that internal attributions predict relapse.

### 1.8 Tangney guilt vs shame (playbook §4)
- **Sources:**
  - Tangney, Stuewig & Mashek (2007), "Moral Emotions and Moral Behavior," *Annu Rev Psychol* 58:345–372. doi:10.1146/annurev.psych.56.091103.070145. This is a narrative review.
  - Tangney, Stuewig & Martinez (2014), "Two Faces of Shame: The Roles of Shame and Guilt in Predicting Recidivism," *Psychol Sci* 25(3):799–805. doi:10.1177/0956797613508790.
- **Opened:** Crossref abstracts for both.
- **Quote (2014, 476 jail inmates, longitudinal):** "Guilt proneness negatively and directly predicted reoffense… shame proneness did not… shame proneness positively predicted recidivism via its robust link to externalization of blame. There remained a direct effect of shame on recidivism: Unimpeded by defensive externalization of blame, shame inhibited recidivism."
- **Counter-meta:** Leach & Cidam (2015), *JPSP* 109(6):983–1002, doi:10.1037/pspa0000037, PMID 26641074. Across 90 samples (N = 12,364), "shame had a positive link to constructive approach when failure (g = .47)… was more reparable… a negative link… when failure was less reparable (g = −.34)."
- **Verdict:**
  - "guilt motivates repair; shame predicts hiding" is **Accurate** as a broad summary of correlational work.
  - "shame predicts… re-offense" and "shame destroys" are **Overstated**. In the best longitudinal study, shame did not directly predict reoffending, and all of this work is correlational trait research. "Well-replicated" is fair for the guilt/shame distinction, not for "shame destroys."
- **Corrected:** "Research on guilt and shame (Tangney and colleagues) links focusing on the act ('I did a bad thing') with making amends, and focusing on the self ('I am bad') with hiding and blaming others. A large meta-analysis adds that even bad feelings turn constructive when the slip feels fixable, so every message points to a repair."

### 1.9 Breines & Chen (2012) (dossier §5; playbook §4)
- **Metadata:** "Self-Compassion Increases Self-Improvement Motivation," *PSPB* 38(9):1133–1143. doi:10.1177/0146167212445599. Correct.
- **Quote:** "Participants in a self-compassion condition… reported greater motivation to make amends and avoid repeating a recent moral transgression (Experiment 2); spent more time studying for a difficult test following an initial failure (Experiment 3)… taking an accepting approach to personal failure may make people more motivated to improve themselves."
- **Replication:** I found no direct preregistered replication, successful or failed. Conceptually consistent: Zhang & Chen (2016), *PSPB* 42(2):244–258, doi:10.1177/0146167215623271. These are four small lab studies with students; outcomes are mostly self-reported motivation, with study time in Exp 3.
- **Verdict:** **Accurate** for "self-compassion after failure increases motivation to improve."
  - The dossier's add-on "shame predicts relapse, compassion predicts retry" is **Overstated**. It is not in this paper, and see §1.7.
- **Corrected:** "In four lab experiments, people prompted to be kind to themselves after a failure were more motivated to improve and studied longer than those given a self-esteem boost."

### 1.10 Sirois 2015 (playbook §4)
- **Likely intended papers:**
  - Sirois, Kitner & Hirsch (2015), "Self-compassion, affect, and health-promoting behaviors," *Health Psychol* 34(6):661–669, doi:10.1037/hea0000158, PMID 25243717.
  - For procrastination: Sirois (2014), "Procrastination and Stress: Exploring the Role of Self-compassion," *Self and Identity* 13(2):128–145, doi:10.1080/15298868.2013.763404.
- **Quotes:**
  - 2015: "a small-scale meta-analysis approach with our own data sets… Fifteen independent samples (N = 3,252)… small effect size (average r = .25)."
  - 2014: "Across four samples… A meta-analysis of these effects revealed a moderate negative association of procrastination with self-compassion."
- **Verdict: Accurate but blended.** Two papers are merged into one. Both are correlational; the 2015 meta pools the authors' own samples.
- **Corrected:** "Self-compassionate people report less procrastination (Sirois 2014) and somewhat better health habits (r ≈ .25; Sirois et al. 2015; r = .26 across 94 studies in Phillips & Hine 2021). These are correlations."

### 1.11 "Ferrari 2019, 27 RCTs" (playbook §4)
- **Metadata:** Ferrari M, Hunt C, Harrysunker A, Abbott MJ, Beath AP, Einstein DA. "Self-Compassion Interventions and Psychosocial Outcomes: a Meta-Analysis of RCTs," *Mindfulness* 10(8):1455–1473, 2019. doi:10.1007/s12671-019-01134-6.
- **Opened:** Crossref; abstract from the ACU repository (DSpace API).
- **Quote:** "Twenty-seven randomized controlled trials… Effects were moderate for self-compassion (g = 0.75), stress (g = 0.67), depression (g = 0.66)… self-criticism (g = 0.56)… eating behavior (g = 1.76) and rumination (g = 1.37)… publication bias may be present."
- **Verdict:** **Accurate** for "27 RCTs, moderate effects," but on *psychosocial/mental-health* outcomes. It is not evidence about behaviour-change persistence, and it notes possible publication bias.
- **Corrected:** "Self-compassion training improves stress, mood and self-criticism in randomised trials (27 RCTs; Ferrari et al. 2019)."

### 1.12 "Dai 2018, double-edged sword" (playbook §4)
- **Found:** Dai H. (2018), "A double-edged sword: How and why resetting performance metrics affects motivation and performance," *Organizational Behavior and Human Decision Processes* 148:12–29. doi:10.1016/j.obhdp.2018.06.002.
- **Opened:** Crossref; abstract via Semantic Scholar API.
- **Quote:** "Three laboratory experiments and one field study analyzing 40 years of data from professional baseball players… unanticipated resets increase self-efficacy and thus boost motivation and future performance when they follow weak performance. However, such resets decrease self-efficacy and thus harm motivation and future performance when they follow strong performance."
- **Verdict:** **Accurate** in substance, with two caveats:
  - Name it fully: Dai 2018, *OBHDP*.
  - The study tested resets of *performance metrics* (sales-type scores, baseball stats), not habit streaks or "restart" prompts, so applying it to ScrollJar is a reasonable extrapolation.

### 1.13 Gollwitzer & Sheeran (2006) (dossier §5)
- **Metadata:** "Implementation Intentions and Goal Achievement: A Meta-analysis of Effects and Processes," *Adv Exp Soc Psychol* 38:69–119. doi:10.1016/S0065-2601(06)38002-1. Correct.
- **Opened:** Crossref; abstract via Semantic Scholar API; green open-access copy listed at kops.uni-konstanz.de.
- **Quote:** "Findings from 94 independent tests showed that implementation intentions had a positive effect of medium-to-large magnitude (d = .65) on goal attainment."
- **Update:** Sheeran, Listrom & Gollwitzer (2024), "The when and how of planning: Meta-analysis of the scope and components of implementation intentions in 642 tests," *Eur Rev Soc Psychol* 36(1):162–194, doi:10.1080/10463283.2024.2334563: "Across 642 independent tests… effective for cognitive, affective, and behavioural outcomes (.27 ≤ d ≤ .66)… larger when plans had a contingent (if-then) format, participants were highly motivated… and plans were rehearsed."
- **Verdict:** **Accurate**, but dated. Cite the 2024 update with its more modest range.

---

## 2. Counter-evidence (verified)

1. **Moral licensing may be close to zero once bias is removed.** Sources: Kuper & Bott 2019, Blanken et al. 2014, Urban et al. 2019, Rotella et al. 2025 (all §1.2/1.4).
   - Effect on us: this *helps* us. Licensing is a weaker threat than the dossier implies.
   - But we must stop quoting d≈0.31 as the size.
2. **"Paying for sins" (Gneezy, Imas & Madarász 2014):** knowing that a donation would follow raised lying from 48% to 63%.
   - This is the most direct evidence that a known charity price can turn into a permit, which is exactly ScrollJar's mechanic. The playbook currently cites this paper only as support.
   - Fix: own the risk openly, keep the broken-promise framing and the price-comfort watchdog, and measure repeat-override rates.
3. **Charitable incentives may not motivate behaviour.** Sasaki, Ishihara & Kurokawa (2025), "Scaling Charitable Incentives: Policy Selection, Beliefs, and Evidence from a Field Experiment," arXiv:2512.24852 (working paper, not peer reviewed):
   - "randomized field experiment (N=808)… Financial incentives increase daily steps by about 1,000, whereas charitable incentives deliver a precisely estimated null… stakeholders greatly overpredict charitable incentives' effects."
   - Effect on us: these are *rewards* paid to charity, not penalties from one's own pocket, but it warns against implying that "charity" itself adds motivation.
   - Supporting evidence for charity-destination penalties does exist: Giné, Karlan & Zinman (2010), *AEJ: Applied* 2(4):213–235, doi:10.1257/app.2.4.213. Forfeited deposits went "to charity"; those offered the account were "3 percentage points more likely to pass the 6-month test" (11% take-up).
4. **"A fine is a price" did not replicate in vignettes** (Metcalf et al. 2020; §1.1). The original remains one field study of 10 centres.
5. **Loss-aversion skeptics:**
   - Gal & Rucker (2018), "The Loss of Loss Aversion: Will It Loom Larger Than Its Gain?", *J Consumer Psychol* 28(3):497–516, doi:10.1002/jcpy.1047: "current evidence does not support that losses, on balance, tend to be any more impactful than gains."
   - Rebuttal: Mrkva, Johnson, Gächter & Herrmann (2020), *J Consumer Psychol* 30(3):407–428, doi:10.1002/jcpy.1156: across N = 17,720, "people of all knowledge and experience levels were loss averse… we cast doubt on recent claims that loss aversion is a fallacy."
   - Ert & Erev (2013): loss aversion appears mainly with high stakes, high nominal payoffs and status-quo framing.
   - Effect on us: keep "about twice," keep it hedged, and don't promise that small prices sting.
6. **The abstinence violation effect is not confirmed in EMA studies** (Shiffman 1996; Kirchner 2012; §1.7). The attribution/guilt components failed to predict relapse; internal blame was even slightly protective in Kirchner.
   - Effect on us: drop "confirmed in EMA" and lean on the self-efficacy and restorative-coping findings, which did hold.
7. **Shame is not uniformly destructive** (Leach & Cidam 2015; Tangney 2014 direct effect).
   - Effect on us: soften "shame destroys" to "shame tends to backfire, especially when a slip feels unfixable." This fits our "make it fixable" design.
8. **One-off self-compassion prompts may not change behaviour.** Phillips & Hine (2021), "Self-compassion, physical health, and health behaviour: a meta-analysis," *Health Psychol Rev* 15(1):113–139, doi:10.1080/17437199.2019.1705872, PMID 31842689: "Multi-session interventions designed to boost self-compassion predicted increased physical health and health behaviour… The effects of single-session inductions were non-significant."
   - Effect on us: a single compassionate screen is closest to a "single-session induction." Claim it reduces distress and supports retrying, not that it measurably cuts relapse by itself. Repeated, consistent compassionate messaging is more defensible.
9. **Self-compassion after a lapse did not prevent the next lapse.** Hagerman et al. 2023 (§3) found it reduced negative affect and raised perceived control, but "None of the self-compassion variables predicted the likelihood of participants reporting a lapse again that day."

---

## 3. New studies to add (verified)

1. **Rotella, Jung, Chinn & Barclay (2025)**, *PSPB*, doi:10.1177/01461672251345512. Preregistered meta-analysis: 115 experiments, N = 21,770 (§1.4).
   - **Why it matters:** the best current evidence that licensing is mainly a reputation effect, so a private override flow is the right design.
   - **Claim:** "The largest analysis of moral licensing (115 experiments) found it appears mainly when people are being watched; in private, the evidence points to no effect."
2. **Silverman & Barasch (2022/23)**, "On or Off Track: How (Broken) Streaks Affect Consumer Decisions," *J Consumer Research* 49(6):1095–1117, doi:10.1093/jcr/ucac029. Seven studies.
   - **Quote:** "the effect of intact (vs. broken) logged streaks is amplified when consumers attribute a break in the streak to themselves rather than to external factors, and attenuated when consumers can 'repair' a broken streak."
   - **Why it matters:** this is direct experimental support for externalising copy ("a hard evening") and for offering a repair path after a slip. It is stronger support than the AVE.
   - **Claim:** "Experiments show broken streaks demotivate less when the break isn't framed as a personal flaw and when people can repair it."
3. **Sharif & Shu (2021)**, "Nudging persistence after failure through emergency reserves," *OBHDP* 163:17–29, doi:10.1016/j.obhdp.2019.01.004. One field study and four lab studies.
   - **Quote:** "framing goals with emergency reserves, a type of slack, can motivate individuals to persist after subgoal failures, leading to better performance on long-term goals."
   - **Why it matters:** supports building in a small, planned allowance (for example a weekly "rough day" pass) so that one slip doesn't end the goal.
   - **Claim:** "Goals with a little built-in slack keep people going after a setback."
4. **Hagerman, Ehmann, Taylor & Forman (2023)**, "The role of self-compassion and its individual components in adaptive responses to dietary lapses," *Appetite* 190:107009, doi:10.1016/j.appet.2023.107009, PMID 37619622. EMA study, N = 140, 6 surveys a day for 7 days; correlational.
   - **Quote:** "Total self-compassion and each facet… were all associated with less negative affect after a lapse… higher total self-compassion and higher self-kindness after a lapse were both associated with greater perceived self-control… in the hours following."
   - **Why it matters:** real-time, real-world lapse data. It supports a self-kindness tone and is honest that it doesn't reduce same-day repeat lapses.
   - **Claim:** "In real-time tracking of dieters, being kind to yourself after a slip went with feeling better and more in control afterwards."
5. **Sheeran, Listrom & Gollwitzer (2024)**, 642-test meta-analysis of implementation intentions, *Eur Rev Soc Psychol*, doi:10.1080/10463283.2024.2334563 (§1.13).
   - **Claim:** "Across 642 tests, if-then plans reliably help people act on their goals, especially when the plan is specific and rehearsed."
6. **Optional, with caveats:**
   - Hébert et al. (2025), "Just-in-Time Adaptive Intervention for Smoking Cessation in Low-Income Adults," *JAMA Netw Open* 8(8):e2526691, doi:10.1001/jamanetworkopen.2025.26691. RCT, N = 454: verified abstinence at 26 weeks was 16.4% vs 10.0%, aOR 1.81 (95% CI 1.03–3.18); 30-day and continuous abstinence did not differ. Shows that support timed to moments of risk can help. This is smoking, not phones.
   - Gershon et al., "In Service of the Streak," six-week field experiment in the "one sec" app (seminar abstract at chibe.upenn.edu; SSRN 5934555/5939795; **unpublished**): streak feedback "introduced new goals… which competed with consumers' original objectives, ultimately leading to increased social media usage." This is relevant to playbook §5 on streaks and is a caution against streak mechanics. Cite only as a working paper.

---

## 4. Top 3 risks and fixes

1. **Conscience Accounting is mis-cited and actually cuts against us** (playbook §3 and pitch line 86).
   - The paper shows transgressors mostly *delayed* donating, guilt was never measured, and knowing a donation would follow *increased* rule-breaking (48% → 63%).
   - A critic who reads the paper will say ScrollJar sells indulgences.
   - **Fix:** rewrite as in §1.3 and openly name the "paying for sins" risk alongside our mitigations: broken-promise framing, self-set meaningful price, price-comfort watchdog, private flow. Remove "donations immediately after a slip convert guilt into repair" from the press pitch.
2. **"AVE confirmed in real-time EMA studies" is false** (playbook §4).
   - The EMA studies (Shiffman 1996; Kirchner 2012) found that attributions and guilt did *not* predict relapse.
   - **Fix:** cite what EMA did show: giving up and losing confidence predict the next lapse, and restorative coping protects. Cite Silverman & Barasch 2022 for externalising and repair.
   - Also soften "self-compassionate failure handling is the strongest known buffer against the relapse spiral" (pitch) to "is supported by experiments on motivation after failure." Single-session self-compassion inductions had no significant effect on health behaviour in the Phillips & Hine meta-analysis.
3. **Effect-size numbers stated more firmly than current evidence allows.**
   - Licensing d≈0.31: bias-corrected it is about 0 to 0.18.
   - "Loss aversion far larger than licensing": not a valid comparison.
   - "Weaker at small stakes": mis-attributed to Brown et al.; it is Ert & Erev 2013.
   - "Shame destroys / predicts re-offense": shame did not directly predict reoffense in the key longitudinal study.
   - **Fix:** use the corrected wording in §1.2, 1.5 and 1.8, attribute each number to the paper that actually reports it, and label correlational findings as correlations.

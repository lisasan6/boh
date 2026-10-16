# E-findings: Dossier §6 + Playbook §§1, 5, 6, 9, 10

Checked 2026-10-15. Retraction and correction checks used the Crossref `update-to`/`updated-by`/`relation` fields for every DOI below. OpenAlex `is_retracted` was checked where the quota allowed (Thai, Ariely); after that OpenAlex was rate-limited. The other sources used were PubMed efetch, Europe PMC abstracts and full text, author PDFs, Retraction Watch and press releases.

## !! STOP-SHIP FINDING
**Ariely & Wertenbroch (2002), Psychological Science 13(3):219-224, doi:10.1111/1467-9280.00441, is RETRACTED.** The retraction is dated 2 Sep 2026, notice doi:10.1177/09567976261488042, Psych Sci 37(9):665. The Crossref title now begins "RETRACTED:" and OpenAlex shows `is_retracted: true`. Our playbook says "replicated 2024". This is the **opposite of the truth**. The 2024 item is the Hyndman & Bisin SSRN preprint (doi:10.2139/ssrn.4844080), which says "the results of the paper do not replicate". It was published as Hyndman & Bisin (2026), Psych Sci 37(8):557-571, doi:10.1177/09567976261460772: "We show that our results do not replicate those of the original article… changes in the deadlines had a negligible effect on the three performance metrics". Retraction Watch (3 Sep 2026) adds that Data Colada concluded the Study 2 data "were severely tampered with or fabricated". Co-author Wertenbroch requested the retraction, and Ariely says the data "cannot be trusted". → **Delete this citation everywhere.** A hostile journalist would find it in a minute. "Smart defaults" can stand on its own as a product choice. For the commitment-device evidence, rely on the field RCTs in dossier §4, which are other helpers' scope (e.g., Giné, Karlan & Zinman 2010).

---

## 1. Per-citation verification

### Science dossier §6

**Schmidt-Persson et al. 2024, JAMA Netw Open 7(7):e2419881**
- Verified: Schmidt-Persson J, Rasmussen MGB, Sørensen SO, Mortensen SR, Olesen LG, Brage S, Kristensen PL, Bilenberg N, Grøntved A. "Screen Media Use and Mental Health of Children and Adolescents: A Secondary Analysis of a Randomized Clinical Trial." doi:10.1001/jamanetworkopen.2024.19881, PMID 38995646. No updates or corrections. The journal published an invited commentary, e2419824.
- Opened: Crossref and the PubMed abstract.
- Quotes: intervention = "reduce their leisure-time screen media use to 3 hours per week or less per person **and hand over smartphones and tablets**". Result: "between-group mean difference in the total difficulties score… (−1.67; 95% CI, −2.68 to −0.67; Cohen d, 0.53). The greatest improvements were observed for internalizing symptoms (emotional symptoms and peer problems…) and prosocial behavior". N = 89 families, 181 children, mean age about 9.
- Verdict: **Accurate, but missing caveats.** It is a *prespecified secondary analysis*. Follow-up was only 2 weeks. The intervention was near-total removal (devices handed over), not a modest cap. The subjects are children, so this is not our audience. The outcome (SDQ) is parent-reported and the trial is unblinded.
- Suggested wording: "In a Danish trial, families who cut leisure screen time to ≤3 hrs/week and handed in phones and tablets for two weeks saw children's emotional and social difficulties ease (d≈0.5). The trial was small and short, and in children."

**Thai et al. 2023, Psychology of Popular Media**
- Verified: Thai H, Davis CG, Mahboob W, Perry S, Adams A, Goldfield GS. "Reducing social media use improves appearance and weight esteem in youth with emotional distress." Psychology of Popular Media **13(1):162-169** (online 2023, issue Jan 2024), doi:10.1037/ppm0000460. It is a **Brief Report**. Not retracted, no corrections.
- Opened: Crossref and the full-text PDF (utstat.toronto.edu course copy of the APA version).
- Quotes: "220 participants (17–25 years; 76% female…) were assigned to either an intervention (SMU limited to 1 hr/day) or control (unrestricted access to SMU)… 1-week baseline and 3-week intervention". Effects: "appearance esteem (from M = 2.95 to 3.15, p < .001, dz = 0.33) and weight esteem (from M = 3.16 to 3.32, … dz = 0.27)". Between-group p < .022 and p < .026.
- Verdict: **Mostly accurate.** "Teens/young adults" should be "17–25-year-olds (mostly undergraduates) with depression/anxiety symptoms and heavy use". The effects are small, the outcome is self-reported, there was no follow-up, and the authors call it a proof of concept.

**Brailovskaia et al. 2023, J Exp Psych: Applied 29(1)**
- Verified: Brailovskaia J, Delveaux J, John J, Wicker V, Noveski A, Kim S, Schillack H, Margraf J. "Finding the 'sweet spot' of smartphone use: Reduction or abstinence to increase well-being and healthy lifestyle?! An experimental intervention study." JEP:Applied 29(1):**149-161**, doi:10.1037/xap0000430, PMID 35389685 (epub 7 Apr 2022). No updates.
- Opened: the PubMed abstract and the Ruhr-Uni Bochum press release ("divided them randomly into three groups").
- Quotes: "N total = 619… first experimental group (N = 200) waived smartphone use for 7 days, the second (N = 226) reduced its daily use by 1 hr, and the control group (N = 193) used smartphone as usual… baseline; postintervention; 1 and 4 months after". "Both interventions reduced smartphone use intensity, problematic use tendencies, depressive, and anxiety symptoms. In both groups, life satisfaction and physical activity increased. **Most effects were stronger and remained more stable over 4 months in the reduction group than in the abstinence group.**" Smoking fell in the reduction group only.
- Verdict: **Slightly overstated.** "Reduction beat total abstinence" should read "most effects were stronger and more durable with reduction". Outcomes are self-reported online surveys. The sample is German adult smartphone users, not a clinical sample. It is a single study from one lab group. Also, the abstinence group *also* improved; the dossier should not imply that abstinence did nothing.
- Suggested wording: "In a German experiment with 619 adults, cutting phone use by one hour a day for a week improved mood, life satisfaction and exercise, and most gains lasted 4 months. They were stronger and more durable than a week of total abstinence."

**Radtke et al. 2022, Mobile Media & Communication 10(2)**
- Verified: Radtke T, Apel T, Schenkel K, Keller J, von Lindern E. "Digital detox: An effective solution in the smartphone era? A systematic literature review." MM&C 10(2):**190-215**, doi:10.1177/20501579211028647 (online July 2021). No updates.
- Opened: the Crossref abstract.
- Quote: "k = 21… (total N = 3,625)… 12 were identified as randomized controlled trials… effects from digital detox interventions varied across studies… some studies found positive intervention effects, whereas others found no effect or even negative consequences for well-being."
- Verdict: **"Mixed" is accurate.** "Effects often fade" is **not stated in the abstract**, so it is unverifiable as written; drop it. Note that Radtke's "detox" also covers *partial* timeouts, not only cold turkey. The leap to "sustainable reduction with structural support beats abstinence — ScrollJar's model" is our inference, not the review's. Present it as "consistent with".

### Psychology playbook §1

**Ryan & Deci 2000.** American Psychologist 55(1):68-78, doi:10.1037/0003-066X.55.1.68, PMID 11392867. No updates. Opened PubMed: "three innate psychological needs--competence, autonomy, and relatedness--which when satisfied yield enhanced self-motivation and mental health and when thwarted lead to diminished motivation". **Accurate.** It is a theory and review paper, so cite it as theory.

**Ariely & Wertenbroch 2002.** **RETRACTED; see the top of this file. Our "replicated 2024" is Wrong.** Remove it.

**Gollwitzer & Sheeran 2006.** Adv Exp Soc Psych 38:69-119, doi:10.1016/S0065-2601(06)38002-1. Abstract via Semantic Scholar: "Findings from 94 independent tests showed that implementation intentions had a positive effect of medium-to-large magnitude (d = .65)". **Accurate.** Update it with the 2024 mega-meta (Sheeran, Listrom & Gollwitzer 2024, Eur Rev Soc Psych 36(1):162-194, doi:10.1080/10463283.2024.2334563): "Across 642 independent tests… effective for cognitive, affective, and behavioural outcomes (.27 ≤ d ≤ .66). Effect sizes were larger when plans had a contingent (if-then) format, participants were highly motivated… and plans were rehearsed." → Say "small-to-medium effects across 642 tests", not d = .65.

**WOOP/MCII "metas d ≈ 0.28–0.34".** Two metas found:
- (a) Wang, Wang & Gai 2021, Front Psychol 12:565202, doi:10.3389/fpsyg.2021.565202: "21 empirical studies… (15,907 participants)… g = 0.336… document-based interventions (g = 0.277)… because of some publication bias, the actual effect sizes may be smaller."
- (b) Cross & **Sheffield** (not Sheeran) 2019, Health Psychol Rev 13(2):209-225, doi:10.1080/17437199.2019.1594332: "adjusted Hedges' g = 0.28… MCII (k = 7) showed a similar effect, g = 0.28… addition of implementation intentions (MCII) did not further strengthen the effects".
- Verdict: **Accurate** ("small", g≈0.28–0.34). Add the publication-bias caveat. Cite both metas by name. App-delivered (document-style) versions sit at the low end, about 0.28.

**Locke & Latham 2002.** American Psychologist 57(9):705-717, doi:10.1037/0003-066X.57.9.705, PMID 12237980. The abstract (opened) is a review of "35 years of empirical research on goal-setting theory". The specific-difficult > "do your best" finding is the theory's core claim; I could not open the full text for an exact quote. **Accurate as a summary.** The evidence is mostly from work-task performance; "under 45 min/day" is an application of it, not a tested claim.

**Dai, Milkman & Riis 2014.** Management Science 60(10):2563-2582, doi:10.1287/mnsc.2014.1901. Quote: "Across three archival field studies… Google searches for the term 'diet' (Study 1), gym visits (Study 2), and commitments to pursue goals (Study 3) all increase following temporal landmarks". **Accurate**, but the studies are archival and correlational.
- "Field-replicated in savings enrollment 2021" means Beshears, Dai, Milkman & Benartzi 2021, OBHDP 167:72-87, doi:10.1016/j.obhdp.2021.06.005. Quote: "University employees (N=6,082)… Framing the future time point in relation to a fresh start date… increased the likelihood… to increase contributions… fresh start framing increased retirement plan contributions in the eight months following". It concerns **contribution increases among existing employees, not enrollment**, and it tests *framing* of a future date. It is an experimental field demonstration, not a "replication" of the archival effect.
- Suggested wording: "…and a 6,000-person field experiment found that framing a future start date as a fresh start raised retirement saving (Beshears et al. 2021)."

**Verplanken & Roy 2016.** J Environ Psychol 45:127-134, doi:10.1016/j.jenvp.2015.11.008 (CC-BY). Abstract opened: "field experiment… 800 participants… half of the households had recently relocated… **Self-reported** frequencies… eight weeks later… intervention was more effective among recently relocated participants… window of opportunity was three months after relocation." **Overstated.** Only *relocation* was tested; "new job, breakup" are extrapolations. The outcomes are self-reported environmental behaviours.
- Fix: "A field experiment found a sustainability intervention worked better for people who had moved house in the previous ~3 months. Other life changes (new job, new phone) may open similar windows, but that is untested."

**Gerber et al. 2016 vs Bryan et al. 2011.**
- Bryan, Walton, Rogers & Dweck 2011, PNAS 108(31):12653-12656, doi:10.1073/pnas.1103343108.
- Gerber, Huber, Biggers & Hendry 2016, PNAS 113(26):7112-7117, doi:10.1073/pnas.1513727113. Title: "A field experiment shows that subtle linguistic cues might not affect voter behavior". Abstract (Europe PMC): "In contrast to the 11 to 14% point greater turnout… reported in the work by Bryan et al., we find no statistically significant difference in turnout… (the point estimate… approximately zero)".
- Verdict: **Accurate in substance.** Change "failed field replications" (plural) to "a large field replication found no effect". Keep "fine as flavor".

### Playbook §5

**Silverman & Barasch, JCR 2023.** "On or Off Track: How (Broken) Streaks Affect Consumer Decisions." JCR 49(6):1095-1117, doi:10.1093/jcr/ucac029 (online June 2022; issue April 2023). No updates.
- Quote: "In seven studies… intact streaks highlighted via behavioral logs increase consumers' subsequent engagement… relative to when broken streaks are highlighted… depends solely on how that behavior is represented within the log… consumers consider maintaining a logged streak to be a meaningful goal in and of itself… attenuated when consumers can 'repair' a broken streak."
- Verdict: **Mostly accurate.** "Never-resetting streaks are *directly* supported" is **overstated**: the paper did not test lifetime or never-reset counters. Its findings are that showing a broken streak lowers engagement and that repair options soften this. Fix: "consistent with" or "evidence-aligned", not "directly supported".

**Lally et al. 2010.** "How are habits formed: Modelling habit formation in the real world." EJSP 40(6):998-1009, doi:10.1002/ejsp.674 (online 2009). No updates.
- Abstract quote: "96 volunteers… model fitted for 62 individuals, of whom 39 showed a good fit… ranged from 18 to 254 days… Missing one opportunity to perform the behaviour did not materially affect the habit formation process." The 66-day median is not in the abstract; it is confirmed by the BPS Research Digest and by the registered-report replication protocol (de Wit et al., PCI RR, Stage 1 accepted 2023), which quotes "(median) 66 days… range from 18 to 254 days".
- Caveats: only **39 people** had well-fitting curves; values above 84 days are **extrapolated**; it has **not yet been replicated**. The 800-person multi-centre replication (de Wit et al.) has, as far as I could find, no published Stage 2 results.
- Verdict: **Accurate but fragile.** Change "missing a single day makes no material difference" to "missing one opportunity did not materially affect habit formation". The paper does not cover several missed days.

**Kivetz, Urminsky & Zheng 2006.** "The Goal-Gradient Hypothesis Resurrected: Purchase Acceleration, Illusionary Goal Progress, and Customer Retention." JMR 43(1):39-58, doi:10.1509/jmkr.43.1.39. Quote: "customers who receive a 12-stamp coffee card with 2 preexisting 'bonus' stamps complete the 10 required purchases faster". **Accurate.** No retraction. I found no failed replication, but did not find a formal registered replication either.

**Amabile (small wins).** Amabile & Kramer, "The Power of Small Wins", HBR May 2011 (hbr.org page opened): "In an analysis of knowledge workers' diaries…". **Accurate as cited**, but it is a correlational workplace diary study published in a magazine and a book, not habit research. Use it as inspiration only.

### Playbook §6

**Etkin JCR 2016.** The DOI is not given in the playbook; the correct one is doi:10.1093/jcr/ucv095. JCR 42(6):967-984. Quote: "Six experiments demonstrate that while measurement increases how much of an activity people do… it can simultaneously reduce how much people enjoy those activities… measurement can decrease continued engagement in the activity and subjective well-being." **Accurate.** It is a single paper of mostly short experiments with no known replication. Note the irony: our streak and stats screens *are* measurement, so keep them about the thing being avoided, as the playbook already says.

**Annabell & Rasmussen 2025.** Most likely "An algorithmic event: The celebration and critique of Spotify Wrapped", New Media & Society 28(10):5620-5643, doi:10.1177/14614448251391301. A companion paper is Annabell & Rasmussen 2024, J Gender Studies 34(8):1177-1193, doi:10.1080/09589236.2024.2433674. Quote: "five creative workshops… university students… four themes: the resonance of Wrapped, **limits of the Wrapped self**… contestations of Spotify's governance… ranging from celebration of personalisation to **critique of data capture**."
- Verdict: **Overstated.** This is a small qualitative study, and it documents ambivalence and critique as much as identity adoption. "Identity engine" and "best organic-share surface" are not supported by it. Fix: "Qualitative research finds people enjoy Wrapped-style recaps as self-expression, but also push back on feeling reduced to data. Keep it opt-in and warm."

### Playbook §9

**Seligman et al. 2005.** "Positive Psychology Progress: Empirical Validation of Interventions." Am Psychol 60(5):410-421, doi:10.1037/0003-066X.60.5.410. Quote (Europe PMC): "6-group, random-assignment, placebo-controlled Internet study… 3 of the interventions lastingly increased happiness and decreased depressive symptoms."
- Later work: Mongrain & Anselmo-Matthews 2012, J Clin Psychol 68(4) (pages not in Crossref), doi:10.1002/jclp.21839, a replication with a better control. Quote: "PPEs led to lasting increases in happiness, **as did the positive placebo**. The PPEs did not exceed the control condition in producing changes in depression… effects… on depression may be more modest than previously assumed."
- Meta: Diniz et al. 2023, einstein (São Paulo) 21:eRW0371, doi:10.31744/einstein_journal/2023rw0371: 64 RCTs of gratitude interventions showed "better mental health, and fewer symptoms of anxiety and depression". Effect sizes are not in the abstract. Cregg & Cheavens 2021 (J Happiness Stud 22:413-445, doi:10.1007/s10902-020-00236-6) exists, but I could not open its abstract, so treat it as unverified.
- Verdict: **Accurate** ("modest"; "later RCTs confirm smaller effects"). Cite Mongrain 2012 by name.

### Playbook §10

**Tamagotchi / virtual pet.** Our wording ("suggestive, not RCT-grade; Finch is press-level; A/B test") is **appropriately hedged**. I found no RCT showing a virtual companion sustains adult behaviour change; the evidence is mostly small HCI pilots. Never say "research shows".

---

## 2. Counter-evidence (verified)

1. **Meta-analyses of social-media abstinence find null or small effects.**
   - Lemahieu et al. 2025, Sci Rep 15:7581, doi:10.1038/s41598-025-90984-3, preregistered, 10 studies, N = 4,674: "no significant effects of social media abstinence interventions on positive affect, negative affect, or life satisfaction."
   - Ferguson 2024, Psychology of Popular Media 14(2):201-206, doi:10.1037/ppm0000541, **has a published correction**, doi:10.1037/ppm0000586. It found no average effect, per the peer-reviewed commentary below. It has been heavily disputed (Rausch & Haidt; Thrul et al. 2025).
   - On the other side: Liu et al. 2025, Behav Sci 15(3):290, doi:10.3390/bs15030290, 20 RCTs: "a positive and small effect of SMD on well-being".
   - Burnell et al. 2025, SSM-Mental Health 7:100459, doi:10.1016/j.ssmmh.2025.100459, 32 RCTs. I verified the metadata in Crossref but could not open the abstract. A peer-reviewed commentary (Thimm-Kaiser & Keyes 2025, SSM-Mental Health 100467, PMC12421657) summarises it as "reducing or pausing social media use improves, to a relatively small degree, some domains of wellbeing for some people".
   - **Implication:** never claim reduction "transforms" well-being. The honest line is "small, real benefits for some people; reduction looks better than abstinence." Total abstinence specifically looks weak, which happens to fit ScrollJar's reduction-with-friction model.
2. **Gains fade when support is removed.** Pieh et al. 2025 (below): "Screen time increased rapidly after the intervention and at follow-up the values were once again approaching the initial level." This is counter-evidence to "a short detox fixes it". It supports ongoing structural tools.
3. **Compliance is hard.** In Castelo et al. 2025, only "119 (25.5% of those who committed) met our preregistered definition of 'compliant'". Expect drop-off and design for it.
4. **Habit timelines are longer and more variable than "66 days".**
   - Singh et al. 2024, Healthcare 12(23):2488, doi:10.3390/healthcare12232488, 20 studies, N = 2,601: "median 59–66 days… means 106–154 days… substantial individual variability (4–335 days)… Most studies had a high risk of bias."
   - Keller et al. 2021, Br J Health Psychol 26(3):807-824, doi:10.1111/bjhp.12504, an RCT with N = 192: "a median of 59 days for participants who successfully formed habits".
   - **Implication:** say "about 2 months for many people, often longer, and it varies a lot". Note too that habit research is about forming *new positive* habits, not about breaking a scrolling habit.
5. **Implementation-intention effects are smaller in the 642-test meta** (d .27–.66 vs .65). Update the number.

## 3. New studies to add (verified)

1. **Castelo, Kushlev, Ward, Esterman & Reiner 2025, PNAS Nexus 4(2):pgaf017, doi:10.1093/pnasnexus/pgaf017.** Preregistered RCT, n = 467 adults, delayed-intervention control. An app blocked all mobile internet for 2 weeks, with calls and texts still allowed. "The intervention improved mental health, subjective well-being, and objectively measured ability to sustain attention; 91% of participants improved on at least one". Time shifted to "socializing in person, exercising, and being in nature."
   - Why it matters: it is the closest analogue to ScrollJar (an app-based block) and the outcomes are adults' attention and mood.
   - Claim: "In a 2025 randomized trial, adults who used an app to block mobile internet for two weeks showed better attention, mood and well-being, and spent more time with people and outdoors."
   - Caveat: only 25.5% fully complied.
2. **Pieh, Humer, Hoenigl, Schwab, Mayerhofer, Dale & Haider 2025, BMC Medicine 23:107, doi:10.1186/s12916-025-03944-z.** Preregistered (OSF), non-blinded RCT, n = 111 students. Screen time was capped at ≤2 h/day for 3 weeks. "Significant… effects of small to medium size… on well-being (η² = .053), depressive symptoms (η² = .109), sleep quality (η² = .048), and stress (η² = .085)."
   - Why it matters: sleep and stress outcomes in young adults, plus the rebound when support ends.
   - Claim: "Cutting smartphone time to two hours a day for three weeks improved sleep, stress and mood in a randomized trial with university students, and the gains slipped when the limit ended."
   - Note: a near-identical title appears as J Psychosom Res 196:112271 (2025). Cite the BMC Medicine paper.
3. **Sheeran, Listrom & Gollwitzer 2024, Eur Rev Soc Psych 36(1):162-194, doi:10.1080/10463283.2024.2334563.** 642 tests of if-then plans; effects are larger for if-then format, motivated users and rehearsed plans.
   - Why it matters: supports the onboarding if-then prompt, and shows ScrollJar should let users revisit or rehearse the plan.
4. **Beshears et al. 2021, OBHDP** (above). Experimental field support for fresh-start timing.
5. **Singh et al. 2024 and Keller et al. 2021** (above). An honest habit timeline.

## 4. Top 3 risks

1. **The retracted Ariely & Wertenbroch citation described as "replicated 2024".** This could not be more embarrassing: it was retracted for suspected data fabrication, and the 2024 study it was supposedly replicated by is the failed replication. **Fix:** delete it, and grep every doc, the press kit and the site for "Ariely".
2. **Overselling reduction RCTs.** Abstinence metas are null (Lemahieu 2025), the evidence is contested (Ferguson 2024 vs Rausch & Haidt), effects are small (Burnell 2025, Liu 2025), use rebounds (Pieh 2025) and compliance is low (Castelo 2025). **Fix:** say "small but real benefits in randomized trials; reducing beats quitting cold turkey". Mark the child and teen studies (Schmidt-Persson, Thai) as not-our-audience, and drop "effects often fade" from the Radtke summary unless sourced.
3. **Habit and streak certainty.** The 66-day figure rests on 39 people and is unreplicated (a replication is pending). "Never-resetting streaks directly supported" goes beyond Silverman & Barasch. "Habits changeable after new job or breakup" goes beyond Verplanken & Roy (relocation only). "Wrapped = identity engine" goes beyond a qualitative critique paper. **Fix:** use "consistent with" and give ranges ("about 2 months, often longer, varies widely").

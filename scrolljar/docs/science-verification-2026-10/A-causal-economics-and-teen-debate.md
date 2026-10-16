# Helper A findings: Dossier sections 1 and 7, counter-evidence, new adult studies

Checked 15 Oct 2026. Every item below was checked against Crossref metadata (including `update-to`/`updated-by` for corrections or retractions) and, where possible, OpenAlex `is_retracted`. I read the abstract or full text from the sources named. Local copies are in `scratchpad/A/` (NBER PDFs, LMU working paper, ORA manuscript, PMC XML).

---

## 1. Per-citation verification

### 1.1 Allcott, Braghieri, Eichmeyer & Gentzkow (2020), "The Welfare Effects of Social Media", AER 110(3): 629–76
- **Metadata:** correct. DOI 10.1257/aer.20190658. Crossref lists no correction or retraction, and OpenAlex has is_retracted=false.
- **Opened:** Crossref, OpenAlex, https://www.nber.org/papers/w25514, and the full NBER PDF w25514.
- **Quotes:**
  - "deactivating Facebook for the four weeks before the 2018 US midterm election (i) reduced online activity, while increasing offline activities such as watching TV alone and socializing with family and friends; (ii) reduced both factual news knowledge and political polarization; (iii) increased subjective well-being; and (iv) caused a large persistent reduction in post-experiment Facebook use."
  - Size of the well-being effect: "Deactivation caused small but significant improvements in well-being … Our overall index of subjective well-being improved by 0.09 standard deviations."
  - Persistence: "Several weeks later, the Treatment group's reported usage of the Facebook mobile app was about 11 minutes (22 percent) lower than in Control."
- **Replication:** a 20x larger follow-up, the 2020-election deactivation study (Allcott et al. 2024 PNAS; 2025 NBER w33697), found a **smaller** emotional-state gain of 0.060 SD and **near-zero** effects on polarization. The direction of the well-being result is confirmed, but at a smaller size. The polarization result did **not** replicate (see section 2).
- **Verdict:** **Mostly accurate, but partly overstated.**
  - We never say "small", and the authors do.
  - We leave out that deactivation also reduced news knowledge.
  - The claim that a forced break "breaks the habit, exactly ScrollJar's mechanism" goes too far. The study tested 4-week paid deactivation, not friction or a price. Persistence was measured over weeks, not as a permanent change.
  - Polarization should be dropped or caveated, because it did not replicate in 2020.
- **Corrected wording:** "In a large randomized trial, people paid to deactivate Facebook for four weeks reported small but significant gains in well-being (0.09 SD), spent more time with friends and family, and kept using Facebook about 22% less for weeks afterwards."

### 1.2 Allcott, Gentzkow & Song (2022), "Digital Addiction", AER 112(7): 2424–63
- **Metadata:** correct. DOI 10.1257/aer.20210867. No correction or retraction.
- **Opened:** Crossref, OpenAlex abstract, https://www.nber.org/papers/w28936, and the full NBER PDF w28936 (rev. March 2022).
- **Quotes:**
  - "Looking at these facts through the lens of our model suggests that self-control problems cause 31 percent of social media use."
  - The body text gives the basis: "our primary model prediction is that eliminating self-control problems would reduce FITSBY use by 48 minutes per day, or 31 percent of baseline use." FITSBY means Facebook, Instagram, Twitter, Snapchat, Browsers and YouTube.
  - Willingness to pay: "the average Limit group participant was willing to give up a $4.20 fixed payment for three weeks of access to the limit functionality. About 58 percent of participants were willing to give up at least some money for the limits, and 20 percent were willing to give up more than $10 … This willingness to pay for a commitment device is consistent with perceived self-control problems."
  - Uptake and effect of limits: "78 percent of participants set binding limits"; "The limit treatment reduced FITSBY screen time by 22 minutes per day (16 percent)."
  - Caveats the authors give: the participants "are not representative of U.S. adults"; the study ran during early COVID; and "Only 5 percent of our sample reported using any apps to limit their smartphone use at baseline … commercial self-control tools are too expensive or are ineffective because it's too easy to evade them."
- **Replication:** I found no direct replication.
- **Verdict:** **31% claim: accurate, but missing context.** It is a structural-model estimate, not a directly observed number. It covers a bundle of apps that includes browsers and YouTube. The sample was about 2,000 self-selected Android users.
- **Verdict on "willing to pay for commitment":** **Accurate.** However, our statement that "ScrollJar's core premise (people rationally pay to lock themselves out) is the headline result" is **overstated.** The headline results are habit formation and self-control problems. Willingness to pay is a secondary finding and modest ($4.20 average over 3 weeks, with 42% unwilling to pay anything). It also concerns paying for access to a limit tool, not paying a penalty to break one.
- **Corrected wording:** "A large AER field experiment estimated that self-control problems account for roughly 31% of time on social apps. 78% of participants chose to set binding limits, and most would pay something to keep them."

### 1.3 Bursztyn, Handel, Jiménez-Durán & Roth (2025), "When Product Markets Become Collective Traps: The Case of Social Media", AER 115(12): 4105–36
- **Metadata:** volume, issue and pages are **confirmed** by Crossref: 115(12), 4105–4136, Dec 2025, DOI 10.1257/aer.20231468. NBER WP 31771 is from Oct 2023 (rev. July 2024). No corrections.
- **Opened:** Crossref, the OpenAlex abstract (published version), and the full NBER PDF w31771.
- **Quotes:**
  - Published abstract: "Incentivized experiments with college students indicate positive welfare based on the standard measure but negative welfare when accounting for these nonuser externalities. Our findings highlight the existence of product market traps, where active users of a platform prefer it not to exist."
  - Figures in the working paper: "60% and 46% percent of active TikTok and Instagram users, respectively, experience negative welfare from the product's existence."
  - Mechanism: "the fear of missing out is the most prevalent motive"; but the evidence "does not conclusively show that FOMO is the main mechanism."
  - Key nuance: "Such traps can arise from social forces even with fully rational expectations and without behavioral frictions."
- **Verdict:** **Mostly accurate, but some framing is wrong.**
  - "Driven by fear of missing out" is overstated. It should read "FOMO was the most common reason given."
  - "Users aren't choosing freely" contradicts the paper, which says traps can arise even when people choose fully rationally.
  - "ScrollJar is an individual exit from a collective trap" is logically weak. The paper's point is that exiting **alone** is costly, because non-users bear the externality. That is exactly why people stay.
  - The sample was about 1,000 US college students using hypothetical-but-incentivized elicitation, so it is not representative of adults.
- **Corrected wording:** "In incentivized experiments with US college students, many active TikTok and Instagram users said they would prefer the platform didn't exist for anyone. They stay mainly so they don't miss out. ScrollJar helps you cut back without having to quit entirely."

### 1.4 Braghieri, Levy & Makarin (2022), "Social Media and Mental Health", AER 112(11): 3660–93
- **Metadata:** correct. DOI 10.1257/aer.20211218. No correction or retraction.
- **Opened:** Crossref, the OpenAlex abstract, the full working paper (LMU CRC TRR 190 DP No. 320, https://epub.ub.uni-muenchen.de/91215/1/320.pdf), the authors' university press releases (https://english.tau.ac.il/node/3216 and https://mitsloan.mit.edu/ideas-made-to-matter/study-social-media-use-linked-to-decline-mental-health), and the VoxEU column (returned 403, so not used).
- **Quotes:**
  - Main result in the paper: "Our index of poor mental health … increased by 0.085 standard deviation units … around 22% of the effect of losing one's job on mental health."
  - Tel Aviv University release: "7% increase in number of students who reported having suffering, at least once during the preceding year, depression so severe that it was difficult for them to function" and "20% increase in number of students who reported anxiety disorders."
  - Academic impairment: "increased by three percentage points over a baseline of 13%."
  - Footnote 28: "For anti-depressants and psychotherapy, the point estimates represent an increase of about 13% and 20% over the baseline mean."
- **What 7% and 20% mean:** they are **relative** increases over the baseline share of students. They are not percentage points and not index effects. The 20% figure is a relative change on a low base rate. In the paper's Table A.4, the anxiety-disorder effect is about 0.02 in raw units and 0.07 SD.
  - I found these two figures only in the authors' press releases, not stated as such in the paper text I read.
  - The individual outcomes are significant before multiple-testing correction (p = 0.03 and 0.01) but only marginal after it (sharpened FDR q = 0.09 each).
- **Verdict:**
  - Numbers: **accurate as relative increases**, but we should write "relative to baseline".
  - "**the strongest causal evidence that social media itself … damages mental health**" is **overstated.** This is quasi-experimental difference-in-differences on 2004–06 desktop-era Facebook among college students. Haidt & Rausch (2026) themselves note it was "text-based, desktop-only."
- **Corrected wording:** "When Facebook rolled out across US colleges in 2004–06, students' mental health worsened (0.085 SD, about a fifth of the effect of losing a job). The share of students reporting severe depression rose about 7% and anxiety disorders about 20% relative to baseline, and the effects were largest for the most vulnerable students."

### 1.5 Orben & Przybylski (2019), "The association between adolescent well-being and digital technology use", Nature Human Behaviour 3(2): 173–82
- **Metadata:** correct. DOI 10.1038/s41562-018-0506-1. PMID 30944443. No retraction.
- **Opened:** the PubMed abstract and the accepted manuscript on Oxford ORA (uuid:5d844350…).
- **Quotes:**
  - "total n = 355,358 … The association we find between digital technology use and adolescent well-being is negative but small, explaining at most 0.4% of the variation in well-being."
  - Potatoes: "the association of well-being with regularly eating potatoes was nearly as negative as the association with technology use (0.9x, YRBS) and wearing glasses was more negatively associated with well-being (1.5x, MCS)."
- **Replication and critique:** there is a published comment, Twenge, Haidt, Joiner & Campbell (2020), "Underestimating digital media harm", NHB 4: 346–48 (10.1038/s41562-020-0839-4), and a reply from Orben & Przybylski, NHB 4: 349–51 (10.1038/s41562-020-0840-y).
- **Verdict:** **Accurate.** The study is correlational, the 0.4% is an upper bound, and the potato comparison applies to one dataset (YRBS).

### 1.6 Haidt (2024), *The Anxious Generation*
- **Publication details:** Penguin Press (US) and Allen Lane (UK), 2024. Confirmed via the Odgers review header: "The Anxious Generation: How the Great Rewiring of Childhood is Causing an Epidemic of Mental Illness, Jonathan Haidt, Allen Lane (2024)."
- **Verdict:** **Accurate.** Note that it is a trade book, not peer-reviewed.

### 1.7 Odgers (2024), Nature
- **Metadata:** "The great rewiring: is social media really behind an epidemic of teenage mental illness?" *Nature* 628(8006): 29–30 (29 Mar 2024), DOI 10.1038/d41586-024-00902-2. It is a **book review** of Haidt.
- **Opened:** the nature.com page, which is free to read.
- **Quote:** "the book's repeated suggestion that digital technologies are rewiring our children's brains and causing an epidemic of mental illness is not supported by science … Our efforts have produced a mix of no, small and mixed associations. Most data are correlative."
- **Verdict:** **Accurate in substance.** Call it a "book review", not a "review". Add the page numbers.

### 1.8 "Haidt's team's 2026 rebuttal"
- **Exists.** Haidt, J. & Rausch, Z. (2026), "Social Media is Harming Adolescents at a Scale Large Enough to Cause Changes at the Population Level", *World Happiness Report 2026*, Chapter 3.
- **Opened:** https://worldhappiness.report/ed/2026/social-media-is-harming-adolescents-at-a-scale-large-enough-to-cause-changes-at-the-population-level/
- **Quotes:**
  - It responds directly to Odgers: "the three studies Odgers cited do not in fact support her 'reverse predictability only' claim."
  - It argues "seven lines of evidence."
  - It asks readers to use a "preponderance" standard rather than proof beyond reasonable doubt.
- **Status:** an essay in an edited report. The authors say it was revised after peer review, but it is **not a journal article**, presents no new data, and is advocacy by the book's author.
- **Verdict:** **Accurate but vague.** Give the full citation.

---

## 2. Counter-evidence (all verified)

### Meta-analyses of reduction and abstinence experiments
1. **Ferguson (2024/2025), "Do social media experiments prove a link with mental health: A methodological and meta-analytic review", *Psychology of Popular Media* 14(2): 201–06, DOI 10.1037/ppm0000541.**
   - Metadata confirmed via Crossref. **A correction exists** (10.1037/ppm0000586; Crossref, 3 Feb 2025). I could not open its content because APA is paywalled.
   - Ferguson's conclusion, as summarized in the peer-reviewed reanalysis (Thrul et al. 2025 abstract): 27 experiments, "social media effects were statistically no different from zero."
   - The pooled d ≈ 0.088 (CI crossing zero) comes from secondary sources only (WHR 2026 chapter; AfterBabel); I did not see it in a primary source.
2. **Thrul et al. (2025), "Social media reduction or abstinence interventions are providing mental health benefits—Reanalysis of a published meta-analysis", *PPM* 14(2): 207–09, DOI 10.1037/ppm0000574.**
   - Quote: "interventions of less than 1 week resulted in significantly worse mental health outcomes (d = −0.175), while interventions of 1 week or longer resulted in significant improvements (d = 0.156)."
3. **Burnell et al. (2025), "The effects of social media restriction: Meta-analytic evidence from randomized controlled trials", *SSM – Mental Health* 7: 100459, DOI 10.1016/j.ssmmh.2025.100459.**
   - 32 RCTs, 5,544 college students or adults.
   - Quote: "restricting social media use significantly improved subjective well-being (ḡ = .17, 95% CI [0.08, 0.27]) … Although significant, the pooled estimates were small in magnitude, suggesting only weak support."
   - "Moderation by … length of intervention … was not consistent."
4. **Lemahieu et al. (2025), "The effects of social media abstinence on affective well-being and life satisfaction: a systematic review and meta-analysis", *Scientific Reports* 15: 7581, DOI 10.1038/s41598-025-90984-3.**
   - Preregistered; 10 studies, N = 4,674.
   - Quote: "no significant effects of social media abstinence interventions on positive affect, negative affect, or life satisfaction."

### Large deactivation study (adults, 2020 US election)
5. **Allcott, Gentzkow, Mason, Wilkins et al. (2024), "The effects of Facebook and Instagram on the 2020 election: A deactivation experiment", *PNAS* 121(21): e2321584121, DOI 10.1073/pnas.2321584121.**
   - 19,857 Facebook users and 15,585 Instagram users, 6-week deactivation.
   - Quote: effects "on affective and issue polarization … were all precisely estimated and close to zero."
   - **A correction exists** (10.1073/pnas.2607249123, 18 Mar 2026). Its content could not be opened (PNAS returned 403).
6. **Allcott, Gentzkow, Wittenbrink et al. (2025), "The Effect of Deactivating Facebook and Instagram on Users' Emotional State", NBER WP 33697, DOI 10.3386/w33697.** Working paper only; Crossref shows no journal version as of today.
   - Quote: "a 0.060 standard deviation improvement in an index of happiness, depression, and anxiety … Instagram … 0.041 standard deviation improvement."
   - The Instagram effect has "p = 0.14 … after adjusting for multiple hypothesis testing … does not meet our pre-registered p = 0.05 significance threshold."
   - "Exploratory analysis suggests the Facebook effect is driven by people over 35, while the Instagram effect is driven by women under 25."
   - Benchmark: about "15 and 22 percent as much as the average psychological intervention"; "effect sizes are smaller than benchmarks … and previous experimental estimates in smaller samples."

### Expert consensus reports
7. **NASEM (2024; released Dec 2023), *Social Media and Adolescent Health*, National Academies Press, doi 10.17226/27396.**
   - Opened: the Highlights PDF.
   - Quote: "the committee's review of published literature did not support the conclusion that social media causes changes in adolescent health at the population level."
8. **US Surgeon General (2023), *Social Media and Youth Mental Health: The U.S. Surgeon General's Advisory*, HHS; NCBI Bookshelf PMID 37721985.**
   - Opened: the PubMed record.
   - Quote: "robust independent safety analyses on the impact of social media on youth have not yet been conducted."
   - I could **not** open the full PDF (HHS and NCBI pages blocked; Wayback reset). The often-quoted lines ("cannot conclude social media is sufficiently safe"; ">3 h/day doubles risk") are therefore **unverified by me**. Do not quote them without checking.

### What this means for us
- The causal effect of cutting social media on adult well-being is **real but small**: about 0.06–0.17 SD in the best and largest studies.
- One-week abstinence can be null or even negative. Longer reductions tend to help (Thrul).
- Population-level harm is officially "not supported" (NASEM).
- Never imply large, guaranteed, or clinical mental-health effects.
- Our strongest honest position is this: the effects are modest but consistent, and they come from **sustained reduction** rather than short detoxes.

---

## 3. New studies to add (adults, 2023–2026; verified)

1. **Castelo, Kushlev, Ward, Esterman & Reiner (2025), "Blocking mobile internet on smartphones improves sustained attention, mental health, and subjective well-being", *PNAS Nexus* 4(2): pgaf017, DOI 10.1093/pnasnexus/pgaf017, PMC11834938.**
   - Preregistered RCT, n = 467 adults, 2-week block of mobile internet.
   - Quote: "The intervention improved mental health, subjective well-being, and objectively measured ability to sustain attention."
   - Quote: "Complying with the intervention was evidently difficult for participants: … 119 (25.5% of those who committed) met our preregistered definition of 'compliant'."
   - Caveat: the comparisons to "more than antidepressants" and "10 years younger" use within-person pre–post effects (d_z = 0.56 and 0.23). Do not repeat them as headline claims.
   - **Why it matters:** it is causal evidence on attention, and it shows that people find blocking hard to stick with. That is ScrollJar's niche.
   - **Claim:** "In a randomized trial, adults who blocked mobile internet on their phones for two weeks improved in well-being, mental health and measured attention. Most found the block hard to stick with."
2. **Pieh, Humer, Hoenigl et al. (2025), "Smartphone screen time reduction improves mental health: a randomized controlled trial", *BMC Medicine* 23: 107, DOI 10.1186/s12916-025-03944-z, PMC11846175.**
   - Preregistered; n = 111 students (small); screen time limited to ≤2 h/day for 3 weeks.
   - Quote: "small to medium effect sizes on depressive symptoms, stress, sleep quality, and well-being."
   - Quote: "Screen time increased rapidly after the intervention and at follow-up the values were once again approaching the initial level."
   - **Why it matters:** it adds sleep as an outcome, and it shows benefits fade when support stops. That is an argument for an ongoing tool.
   - **Claim:** "Cutting phone time to two hours a day for three weeks improved sleep, stress and mood in a small trial. Use crept back once the limit ended."
3. **Burnell et al. (2025), SSM – Mental Health** (details in section 2).
   - **Claim:** "Across 32 randomized trials in adults, limiting social media produced small but reliable well-being gains."
4. **Allcott et al. (2025), NBER WP 33697** (details in section 2). This is the largest trial (about 35k people).
   - **Claim:** "In the largest trial to date, six weeks off Facebook slightly improved happiness, anxiety and depression, especially for people over 35." Label it a working paper.
5. **Thrul et al. (2025)** (details in section 2). Reductions lasting a week or more help, and very short breaks do not.
   - **Why it matters:** it supports a sustained reduction design over a one-off detox.

---

## 4. Top 3 risks and fixes

1. **Overselling effect size and causality** ("strongest causal evidence … damages mental health", "flagship RCT showing that stepping away improves well-being").
   - The best and largest adult evidence gives 0.06–0.17 SD. The authors themselves say "small". Two meta-analyses (Ferguson; Lemahieu) find null effects, and NASEM says population-level causation is not supported.
   - **Fix:** say "small but consistent improvements", cite Burnell and Allcott 2025, keep Braghieri as "one quasi-experiment from the 2004–06 Facebook era", and remove polarization claims, which did not replicate in 2020.
2. **Misreading Bursztyn and Allcott-Gentzkow-Song as proof of ScrollJar's model.**
   - The 31% is a model estimate covering a bundle of apps that includes browsers and YouTube.
   - Willingness to pay was a modest $4.20 for access to a limit tool, not a penalty or donation.
   - The "collective trap" paper says people stay rationally because leaving alone is costly. Calling ScrollJar "an exit from the trap" contradicts that, and "users aren't choosing freely" contradicts the paper outright.
   - **Fix:** use the corrected wording in 1.2 and 1.3.
3. **Imprecise figures and citations.**
   - The 7% and 20% figures need "relative to baseline". They come from the authors' press release, and the paper's 20% footnote is about psychotherapy uptake, so the two are easy to confuse.
   - Odgers is a book review.
   - The "2026 rebuttal" should be cited in full as Haidt & Rausch, WHR 2026 Ch. 3, and labelled an essay, not a journal article.
   - The Surgeon General's ">3 h doubles risk" and "not sufficiently safe" lines were not verified.
   - The dossier header says "All citations verified against journal pages". Change it to something accurate.

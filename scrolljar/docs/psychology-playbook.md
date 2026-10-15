# ScrollJar — Psychology Playbook

**Design rules with receipts.** First compiled July 27, 2026. **Re-verified and corrected 15 October 2026.** Every citation was checked against the paper itself and searched for retractions and failed replications. The audit, with quotes and links, is in `science-verification-2026-10/` and the summary in `science-verified-2026-10.md`. Companion docs: science-dossier-bibliography.md, evidence-dossier.md.

**Rule for this file:** a rule marked *"design choice"* is a value we hold, informed by evidence but not proven by it. Never present a design choice as "science shows."

---

## 1 · Onboarding & making deals

- **Everything is chosen, nothing imposed.** Self-determination theory (Ryan & Deci 2000, *American Psychologist*; a theory and review paper) holds that autonomy sustains motivation and control undermines it. The user picks apps, schedule, price and charity, and ScrollJar only ever enforces the user's own choices.
- **Offer smart defaults.** *Design choice.* Suggest sensible starting points (€5, 15-minute windows) rather than a blank slider, so people aren't left guessing. (The study previously cited here, Ariely & Wertenbroch 2002, was **retracted in September 2026**. Never cite it.)
- **Elicit an if-then plan.** If-then plans reliably help people act on goals: d = 0.27–0.66 across 642 tests, larger when the plan is specific, people are motivated and the plan is rehearsed (Sheeran, Listrom & Gollwitzer 2024, *Eur Rev Soc Psychol*). Onboarding asks: *"If I reach for Instagram at night, then I will ___,"* and the plan reappears so people can rehearse it. WOOP-style setup (wish → outcome → obstacle → plan) has small effects, about g ≈ 0.28–0.34, possibly smaller after allowing for publication bias (Cross & Sheffield 2019; Wang et al. 2021). Say "helps," never "transforms."
- **Specific beats vague.** Goal-setting theory (Locke & Latham 2002, a review of mostly workplace studies) finds that concrete targets ("under 45 min/day") outperform "use my phone less."
- **Anchor to values, not restriction.** *Design choice.* The intention question ("what is this hour for?") carries the meaning. The promised payoff is a richer life, not a smaller phone bill.
- **Time the invitation.** People search for "diet," visit the gym and make commitments more often after temporal landmarks such as Mondays, month starts and birthdays (Dai, Milkman & Riis 2014, *Management Science*; archival data). A 6,000-person field experiment found that framing a future date as a fresh start raised retirement saving (Beshears et al. 2021, *OBHDP*). A sustainability intervention worked better for people who had **moved house** in the previous ~3 months (Verplanken & Roy 2016). Other life changes, such as a new job or new phone, may open similar windows, but that is untested.
- **Identity framing: flavour only.** The "be a voter, not just vote" effect failed in three large field replications (Gerber et al. 2016, 2017, 2023). Never claim it as a mechanism.

## 2 · The shield & the breath pause

- **The pause works; the lecture doesn't.** In a six-week study of people who chose to use the one sec app, users backed out of 36% of opening attempts and openings fell 57% (Grüning et al. 2023, *PNAS*; no control group). In the paper's randomised online experiment, the **easy dismiss option** worked best, a waiting delay also helped, and **a reflective message alone did nothing**. A 2026 RCT of a similar iPhone prompt (Wellspent, *JMIR mHealth*, n = 70) cut time on the most-used app by about 29 minutes a day. **Design consequence:** the breath pause needs a prominent, warm "never mind, close" path, and no moralising text during the pause.
- **Urge surfing: let the urge pass.** In a small trial with student smokers, a brief mindfulness instruction didn't weaken urges, but people smoked fewer cigarettes over the next week (Bowen & Marlatt 2009, *Psychol Addict Behav*, doi:10.1037/a0017127; N = 123, preliminary). Mindful attention lowered cue-induced craving in a lab study (Westbrook et al. 2013, N = 47). The pause may soften the urge, and mainly helps you not act on it.
- **Treat the reach as boredom.** Many people find even 15 minutes alone with their thoughts hard. In one study, 12 of 18 men and 6 of 24 women chose to give themselves a mild shock rather than just sit (Wilson et al. 2014, *Science*). The preference for doing over thinking held across 11 countries (Buttrick et al. 2019, N = 2,557). People who get bored easily report more problematic tech use (r ≈ .38 across 25 studies; Tagliaferri et al. 2026; correlational). A gentle reframe at the shield ("this itch is where ideas come from") turns the hardest moment into the kindest touch.
- **Soft limits beat total lockout.** Batching notifications made people feel more in control; switching them off entirely raised anxiety and fear of missing out (Fitz et al. 2019, n = 237). This supports ScrollJar's rule that users are never hard-locked.

## 3 · The override & the coin

- **The price is a broken deal, never a ticket.** This is the most important risk in the product, and the evidence points at it directly:
  - In lab experiments, **knowing a donation opportunity would follow made people more likely to break a rule** (lying rose from 48% to 63%; Gneezy, Imas & Madarász 2014, *Management Science*).
  - A small fine can come to feel like a fair price (Gneezy & Rustichini 2000; a single field study).
  - **Mitigations, all required:** a self-set, meaningful price; broken-deal framing before payment ("this breaks your deal"); consolation after; the price-comfort watchdog (cheerful repeat overrides → suggest raising the price); and tracking repeat-override rates as a core health metric.
  - Never write copy like "unlocked" or "made it right," and never suggest the donation *repairs* anything. It is what the user decided in advance would happen.
- **Giving right after a slip is natural; don't exploit it.** In the same experiments, people who had just lied gave more if asked immediately, and the urge faded with time. But most, given the choice, preferred to decide later, and guilt was never measured. So we don't claim the donation "relieves guilt."
- **Keep the override private.** The largest meta-analysis of moral licensing (115 experiments) found it appears when people are **watched** and not when they are unobserved (Rotella et al. 2025, *PSPB*). The older "d ≈ 0.31" estimate shrinks to near zero after bias correction. Private-by-default overrides are the right design.
- **Loss aversion: about twice, on average.** Losses weigh roughly twice as much as equal gains (λ ≈ 1.96, likely range 1.82–2.10; Brown et al. 2024, *J Econ Literature*), somewhat less after allowing for publication bias. The asymmetry is weaker for small amounts (Ert & Erev 2013). It is measured mostly with gambles, so applying it to a sure fee is an extrapolation. Say "about twice as heavy, on average," never "always twice."
- **Gain-frame the feedback.** In an app-based RCT, loss-framed feedback did significantly *worse* than gain-framed (de Buisonjé et al. 2022, *JMIR*). Report hours kept and money given, never "money lost."
- **Remind people they chose it.** Voluntary giving engaged reward areas more than tax-like giving in a small brain-imaging study (Harbaugh et al. 2007, *Science*; 19 women). ScrollJar's price is chosen in advance rather than in the moment, so keep this soft: at the coin moment, remind people they picked the charity and the amount.

## 4 · The rough day

- **Restore confidence, offer one next step.** Real-time studies of smokers found that what predicts the slide from one slip to relapse is **feeling like giving up and losing confidence**; getting back on track straight away protected (Shiffman et al. 1996; Kirchner et al. 2012; 203 smokers, 1,001 lapses). Self-blame and guilt did *not* predict relapse in these studies, so we don't claim the "abstinence violation effect" is confirmed. The after-slip screen says it's one evening, not a pattern, and immediately offers one small, doable next step.
- **Talk about the behaviour, never the person.** Research on guilt and shame (Tangney and colleagues; correlational) links focusing on the act ("I did a bad thing") with making amends, and focusing on the self ("I am bad") with hiding and blaming others. A large meta-analysis adds that even bad feelings turn constructive when the slip feels **fixable** (Leach & Cidam 2015, *JPSP*, 90 samples). Every string targets the behaviour and points to a way back. This is the psychology under the Voice Law.
- **Externalise and allow repair.** Broken streaks demotivate less when the break isn't framed as a personal flaw and when people can repair it (Silverman & Barasch 2022, *J Consumer Research*, 7 studies). Copy: "a hard evening," "the scroll won this round."
- **Kindness supports the retry.** People prompted to be kind to themselves after a failure were more motivated to improve (Breines & Chen 2012; lab studies). Self-compassion training improves stress and mood (27 RCTs; Ferrari et al. 2019). Self-compassionate people report less procrastination and somewhat better health habits (correlational; Sirois 2014; Sirois et al. 2015). ⚠️ One-off kindness prompts did *not* change health behaviour on their own (Phillips & Hine 2021 meta-analysis). The tone must be **consistent across the whole product**, not a single nice screen, and we never claim kindness "prevents relapse."
- **Build in slack.** Goals with a small built-in reserve keep people going after a setback (Sharif & Shu 2021, *OBHDP*). A rough-day allowance means one slip doesn't end the deal.
- **Offer a fresh start only after rough patches.** In lab studies and 40 years of baseball data, resetting performance scores boosted people after weak performance but hurt them after strong performance (Dai 2018, *OBHDP*). Restart prompts appear after expensive weeks, never as a global mechanic.

## 5 · Streaks & progress

- **Never-resetting counts are consistent with the evidence.** Showing a *broken* streak lowers later engagement, and offering repair softens this (Silverman & Barasch 2022). That study didn't test lifetime counts directly. ScrollJar's lifetime scroll-free days plus a "coin day" calendar follow from its findings rather than being proven by them. ⚠️ An unpublished field experiment inside the one sec app found streak feedback *increased* social-media use by creating a competing goal (Gershon et al., working paper). Keep streak mechanics minimal and A/B test them.
- **Honest habit timeline.** Habits take about two months on average: median 59–66 days, but anywhere from weeks to most of a year (Lally et al. 2010, 39 people; Singh et al. 2024 review). Missing one opportunity didn't materially affect habit formation (Lally). Frame progress in weeks to months, and say so kindly when a day is missed.
- **Show milestone proximity.** People speed up as they near a goal, even with head-start credit (Kivetz, Urminsky & Zheng 2006, *J Marketing Research*). Surface "3 fewer opens than yesterday." (Amabile's "small wins" is a workplace diary study in a magazine and book, so use it as inspiration only.)

## 6 · Stats & tracking

- **Measure the habit, not the joy.** Measuring enjoyable activities increases how much people do them but can reduce how much they enjoy them (Etkin 2016, *J Consumer Research*, doi:10.1093/jcr/ucv095; six experiments). ScrollJar measures scrolling avoided and money given. What people *did* with reclaimed time stays narrative and unmeasured.
- **Tracking progress helps.** Monitoring progress improves goal attainment (d = 0.40), more so when it's written down or shared (Harkin et al. 2016, *Psychological Bulletin*, 138 RCTs). This supports the weekly recap.
- **The year-in-review: warm, opt-in, no promises.** Qualitative research on Spotify Wrapped finds people enjoy it as self-expression but also push back on being reduced to data (Annabell & Rasmussen 2025; small workshop study). "Your Year in the Jar" stays opt-in and warm. Don't call it an "identity engine."

## 7 · The social layer

- **Private by default.** People trust those who use commitment strategies *less* than those who rely on willpower, and they choose commitment devices more in private (Kristal & Zlatev 2024, *JPSP*, 7 studies). Jars and overrides are private by default; sharing is opt-in.
- **Kudos and support are reasonable.** In a year-long study of 329 Strava club runners, receiving kudos was followed by more running (Franken et al. 2023, *Social Networks*; observational). Runners also drifted toward *less* active friends, so social exposure can pull both ways. Across 1.1 million runners, a natural experiment found exercise spreads between friends, most from peers just a little behind or ahead (Aral & Nicolaides 2017, *Nature Communications*). ⚠️ Running is something you add; scrolling less is something you hold back. Contagion of *not* doing something isn't shown.
- **Celebrate outcomes, not announcements.** *Design choice.* A small 2009 lab study found that announcing an identity goal and being acknowledged can create a premature sense of "already there" (Gollwitzer et al.; no replication found either way). Newer, larger studies find sharing goals often *helps*, bringing support and effort (Peetz et al. 2025, *PSPB*; Harkin et al. 2016). So the feed shows weeks kept and money given, and an optional "tell one person you trust" feature is evidence-supported.
- **Encourage, never police.** *Design choice.* Being monitored by others can improve behaviour but also raises distress (Lewis & Rook 1999; correlational). No policing mechanics, no "call out a friend," no reciprocity nudges ("you haven't high-fived back").
- **Norms need an approval signal.** In a field study, telling households the average usage made low users drift *up* toward it; adding an approving signal removed that effect (Schultz et al. 2007, *Psychological Science*; ~290 households). Community stats read "92% of jars made it through this week 💛," never raw counts of slips.
- **No leaderboards.** *Design choice, not settled science.* The evidence on competition is mixed. In the strongest trial (STEP UP, *JAMA Internal Medicine* 2019, 602 adults), competition raised activity most, and a support-buddy design also worked. One small class study found a badge-plus-leaderboard course lowered motivation (Hanus & Fox 2015). We choose self-comparison because comparison can sting and we refuse ranking people. Never say "science shows leaderboards fail."

## 8 · Charity & impact display

- **Show concrete impact, one clear unit.** Describing exactly what a donation does is one of the better-supported ways to make giving feel meaningful (Saeri et al. 2023, *Voluntas*, review of 21 reviews; overall effects small). Specific details about what the money buys increase giving (Cryder, Loewenstein & Scheines 2013, *OBHDP*). "€5 ≈ 10 school meals," one image, no data dumps. (The "identifiable victim effect" previously cited here, Small et al. 2007, failed a preregistered replication and shrinks to about zero after bias correction, so we no longer cite it.)
- **"100% reaches the charity": only if literally true.** Donors give much more when told overhead is already covered (donation rate +80%; Gneezy, Keenan & Gneezy 2014, *Science*; 40,000 letters). ScrollJar's keep-nothing model is a strong frame, but **only if every coin reaches the charity after card and platform fees.** The site currently adds the card fee on top on the free plan, so the full price arrives. Keep it that way on every plan, and say exactly who pays any fee.
- **Charity forfeits have worked in a trial.** In the smoking RCT, forfeited deposits went to charity, and the program raised verified quitting (Giné, Karlan & Zinman 2010). Whether a "cause you dislike" would deter more has been suggested but never tested. We won't make anyone fund a cause they oppose.
- **Giving feels good, a little, sometimes.** Large preregistered replications find spending on others lifts mood slightly and depending on the situation (Aknin et al. 2020, *JPSP*; mixed results). One study found the effect reversed after a month (Falk & Graeber 2020, *PNAS*). Never promise that donating makes you happier.

## 9 · The weekly recap

- **One concrete prompt, modest expectations.** "Three good things"-style exercises improve well-being modestly. A replication with a better control found a placebo exercise did about as well (Mongrain & Anselmo-Matthews 2012). ScrollJar's version: *"Name one thing you did with a returned hour."* Specific and behavioural, opt-in, feeds the mural.

## 10 · The jar as character

- **Care may sustain behaviour; unproven.** There is no RCT showing that a virtual pet or companion sustains adult behaviour change; the evidence is small pilots and press stories. Direction: the jar *benefits* from your success (it smiles, fills, thrives) and never suffers or guilt-trips when you slip. A/B test it; never say "research shows."

---

## ⛔ Never say / never claim (the honesty shield)

1. **"Dopamine detox."** It misreads the science: avoiding stimulation doesn't lower or "refill" your dopamine (Harvard Health blog, 2020: "Dopamine fasting: Misunderstanding science spawns a maladaptive fad"). Never use "dopamine" in marketing at all.
2. **"Willpower is a muscle" / ego depletion.** Two large preregistered multi-lab tests found effects close to zero (d = 0.04, N ≈ 2,100, Hagger et al. 2016; d = 0.06, N ≈ 3,500, Vohs et al. 2021). Our line: we build friction so you don't need willpower.
3. **"21 days to form a habit."** A myth. Habits take about two months on average, from weeks to most of a year.
4. **The "65%/95% accountability" statistic.** Untraceable: no primary study has ever been found. Never quote it.
5. **StickK's "72% success."** Platform-reported, self-selected and unverified. Use RCT numbers.
6. **"Losses hurt twice as much"** as a universal law. Say "about twice, on average."
7. **"Donating makes you happier."** Real, small, conditional, and possibly short-lived.
8. **Identity-noun claims** ("saying 'I'm a reader' changes you"). The "voter" study failed three large replications.
9. **Anything from Ariely & Wertenbroch 2002** (retracted 2026) **or Brian Wansink** (research misconduct). Don't cite either, even for ideas that sound right.
10. **"Social media addiction" about people, or "addicts."** Researchers dispute whether heavy use is a true addiction. Say "habit," "autopilot," "problematic use." Quote "addictive design" only when attributing it to a court or regulator.
11. **"Infinite scroll makes you scroll X% longer."** No randomised trial shows this. Say it removes natural stopping points.
12. **"Cuts app use in half."** The one sec 57% figure is app *openings* among people who kept using the app, with no control group.

## The one-paragraph scientific pitch (press-ready)

ScrollJar is built from the strongest evidence we could find, and we're honest about its size. A short pause at the moment of opening, with an easy way out, cut app openings by more than half among people who used it (PNAS 2023), and self-set limits cut social-media time by 16% in a large randomised trial (AER 2022). Blocking mobile internet for two weeks improved attention and mental health in a randomised trial (PNAS Nexus 2025). Putting your own money on the line, forfeited to charity, raised verified quitting in a classic smoking trial (AEJ 2010), and works best for the people who choose it (NEJM 2015). And after a slip, what keeps people going is confidence and a next step, not blame (real-time relapse studies; Silverman & Barasch 2022). Cutting back brings small but real benefits; ScrollJar is designed to make cutting back last.

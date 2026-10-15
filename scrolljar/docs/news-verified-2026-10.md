# ScrollJar — News verification, October 2026

**Run date:** 2026-10-15 · **Result: 0 items verified. Do not publish any item from this file yet.**

## 1. Summary

This pass could not verify anything. The cloud environment's network policy blocked every source page: WebFetch failed with `getaddrinfo ENOTFOUND` for every host tried (oag.ca.gov, digital-strategy.ec.europa.eu, npr.org, wunc.org, doi.org, en.wikipedia.org), and curl got `CONNECT tunnel failed, response 403` from the proxy for the same hosts plus conseil-constitutionnel.fr and api.crossref.org. Only github.com was reachable. Under the verification rule (an item counts only if a source page was actually opened and read), every item goes under **Dropped**. Web search still worked, so section 6 lists what the search snippets suggest changed since July, with candidate URLs to open on the next pass. Those are **leads, not facts**. In short, the snippets point the same way as the warning box in `evidence-dossier.md`: France's ban was struck down; the state-AG case moved to a proposed settlement of about $17B that still needs the judge's approval; Breathitt County settled in May 2026 for about $27M total; Australia's leakiness figure comes from eSafety (31 July 2026), not Newcastle University.

**To unblock:** in the cloud environment settings (Network access), choose a broader access level or add the hosts listed at the end of this file under Allowed domains, then re-run this task. Steps: https://code.claude.com/docs/en/cloud-environments#network-access

## 2. Verified timeline

*(Empty. No source page could be opened.)*

## 3. Dropped

Every requested item was dropped for the same reason: **no source page could be opened (network blocked), so nothing was read at source.**

| # | Item | Why dropped |
|---|---|---|
| 1 | K.G.M. v. Meta & YouTube (JCCP 5255): verdict, damages split, appeals, next trial | Not opened (npr.org blocked). Snippets disagree on who appealed and when, and give no confirmed late-October trial date. |
| 2 | New Mexico v. Meta, $375M | Not opened. No primary source was tried because every host failed. |
| 3 | 29+ state AGs vs Meta: proposed settlement 2026-08-26 | Not opened (oag.ca.gov blocked). Snippets disagree on the amount (up to $17B / $17.1B / $18B) and the number of AGs (51 vs 52). No report of court approval was found. |
| 4 | MDL 3047 Breathitt County settlement | Not opened. Snippets say "about $27M" comes from Bloomberg's records request, while AP and Courthouse News said the terms were not disclosed. |
| 5 | EU DSA preliminary findings, TikTok (2026-02-06) and Meta (2026-07-10) | Not opened (digital-strategy.ec.europa.eu blocked). The "autopilot" wording is still unchecked. |
| 6 | Australia under-16 law: 4.7M accounts, eSafety evaluation, maximum penalty | Not opened. The penalty amount (A$49.5M vs "doubled") is still unresolved. |
| 7 | France under-15 law and Conseil constitutionnel 2026-911 DC | Not opened (conseil-constitutionnel.fr blocked). |
| 8 | Florida under-14 law, appeals ruling reportedly 2026-10-14 | Not opened. Search found **no** October 2026 ruling, only the Nov 2025 stay (which let Florida enforce) and a March 2026 oral argument. Treat the 14 Oct lead as **unconfirmed**. |
| 9 | "Project Mercury" unsealed documents (Nov 2025) | Not opened. |
| 10 | Other items (Brazil ECA Digital, UK OSA, Indonesia, Malaysia, Denmark, Spain, Paris TikTok probe, etc.) | Not searched in depth, since none could be opened. |
| 11 | Counterpoints | See section 4. |
| — | Four science links | See section 5. |

## 4. Counterpoints

*(None verified.)* Leads to verify, from search snippets only:
- **Bans are leaky:** an eSafety study published **2026-07-31** (reported by Reuters via The Star / Internazionale, and by Al Jazeera on 2026-08-03) reportedly found that over 81% of surveyed children still used at least one age-restricted platform three months in (vs nearly 86% before), daily use at about 58% (vs about 60%), and account ownership down to 42% from 52%. This replaces the July dossier's "Newcastle Univ. >85%" attribution, which looks **wrong**. Candidates: https://www.aljazeera.com/news/2026/8/3/australias-under-16-social-media-ban-failing-study-shows-what-it-means · https://www.thestar.com.my/tech/tech-news/2026/07/31/most-australian-teens-still-on-social-media-three-months-after-under-16-ban-began-study-finds · the eSafety report itself on esafety.gov.au (URL not yet found).
- **Courts and constitutional limits:** France's Conseil constitutionnel reportedly struck down the under-15 ban (see section 6). US First Amendment injunctions in other states: not checked this pass.
- **Platforms' denials:** reported for the AG settlement (no admission) and Breathitt (no admission of liability). Unverified.

## 5. Science links

**None could be opened** (doi.org, the publishers and api.crossref.org were all blocked). Status for each, unchanged from our notes and **not re-verified**:

| Paper | URL to open | Claim we use | Status |
|---|---|---|---|
| Allcott, Gentzkow & Song (2022) "Digital Addiction", *AER* 112(7) | https://doi.org/10.1257/aer.20210867 | self-control problems cause ~31% of social media use | Not verified this pass |
| Grüning, Riedel & Lorenz-Spreen (2023) *PNAS* 120(8) e2213114120 | https://doi.org/10.1073/pnas.2213114120 | a brief pause led people to abandon 36% of app-opening attempts | Not verified this pass |
| Halpern et al. (2015) *NEJM* 372 | https://doi.org/10.1056/NEJMoa1414293 | among those willing, deposit contracts beat rewards by ~13 pp | Not verified this pass |
| Castelo et al. (2025) *PNAS Nexus* 4(2) pgaf017 | https://doi.org/10.1093/pnasnexus/pgaf017 | two weeks of blocking mobile internet improved attention, mental health, well-being | Not verified this pass |

## 6. Leads for the next pass (search snippets only, NOT verified)

Newest first. Each lead says what the snippets claim and which page to open.

- **2026-10-14? Florida under-14 law (appeals).** Not found. Snippets only show the 11th Circuit stay of Nov 2025 letting Florida enforce, the AG's enforcement push (Florida Phoenix, 2025-11-26) and a March 2026 oral argument. Open: https://floridaphoenix.com/2025/11/26/attorney-general-will-now-aggressively-enforce-social-media-ban-on-minors/ · https://thecapitolist.com/appeals-court-clears-way-for-florida-to-enforce-child-social-media-regulations/ · the 11th Circuit docket (CCIA & NetChoice v. Uthmeier).
- **2026-08-26 State AGs and Meta, proposed settlement.** Reported as "$17 billion" (NPR via member stations), "$17.1B" or "up to $18B over 10 years" (Variety); 51 or 52 AGs; includes an independent auditor and an injunction against deceptive safety statements; **subject to approval by Judge Yvonne Gonzalez Rogers (N.D. Cal.)**; no approval found as of this search. Open: https://oag.ca.gov/news/press-releases/attorney-general-bonta-secures-transformative-17-billion-settlement-meta (primary) · https://www.wunc.org/2026-08-26/california-says-states-meta-agree-to-17-billion-settlement-in-child-safety-trial (NPR) · https://au.variety.com/2026/digital/news/meta-18-billion-settlement-state-ags-lawsuit-social-media-addiction-39755/ · the DC AG release on oag.dc.gov.
- **2026-08-14 France: Conseil constitutionnel 2026-911 DC.** Reportedly struck down Article 1 (the under-15 ban) as a disproportionate infringement of freedom of expression and communication; also flagged that age checks would apply to all users without privacy safeguards. Referred by 60+ LFI deputies on 2026-07-23 after final adoption on 2026-07-21. Other provisions reportedly survive (unverified). Open: https://www.conseil-constitutionnel.fr/decision/2026/2026911DC.htm (primary) · https://www.reedsmith.com/articles/french-constitutional-council-strikes-down-under-15-social-media-ban/ · then Le Monde.
- **2026-07-31 Australia: eSafety three-month evaluation.** See section 4. eSafety reportedly investigating Facebook, Instagram, Snapchat, TikTok and YouTube for possible non-compliance.
- **2026-07-27 JCCP: second bellwether (R.K.C.).** Reportedly set for trial on 27 July 2026; one guide says YouTube settled it confidentially. Outcome unknown. No late-October trial date found.
- **2026-07-10 EU: preliminary findings against Meta (Instagram, Facebook).** Infinite scroll, autoplay, push notifications, recommender systems; screen-time tools "can be dismissed too easily"; still **preliminary**. Open: https://digital-strategy.ec.europa.eu/en/news/commission-preliminarily-finds-addictive-design-instagram-and-facebook-breach-digital-services-act (primary).
- **2026-06 (early) K.G.M. post-trial motions.** Judgment entered 2026-04-07 with enforcement stayed pending post-trial motions; JNOV and new-trial motions heard 2026-06-04 and reportedly denied; YouTube filed a notice of appeal; Meta's appeal not confirmed in snippets. Open: the LASC JCCP 5255 docket; AP/Reuters coverage.
- **2026-05 MDL 3047: Breathitt County settlements.** Settled before the June trial; reported total about $27M (Bloomberg, from open-records documents: Meta $9M, Snap $8M, TikTok $8M, YouTube about $2M); no admission of liability; about 1,200 school-district cases still pending. Open: https://www.jurist.org/news/2026/05/meta-settles-first-lawsuit-over-harm-to-childrens-mental-health/ · https://courthousenews.com/meta-settles-bellwether-suit-over-harms-of-social-media-to-school-districts · Bloomberg Law.
- **2026-03-25 K.G.M. verdict / 2026-03-24 New Mexico $375M / 2026-02-06 EU TikTok preliminary findings / 2025-12-10 Australia in force / Nov 2025 Project Mercury.** No new snippets checked this pass. Use the URLs in `evidence-dossier.md` Parts 1–2.

### Hosts to allow for the next run
oag.ca.gov, oag.dc.gov, digital-strategy.ec.europa.eu, ec.europa.eu, conseil-constitutionnel.fr, legifrance.gouv.fr, esafety.gov.au, pm.gov.au, nmdoj.gov, courtlistener.com, storage.courtlistener.com, lacourt.org, cand.uscourts.gov, media.ca11.uscourts.gov, doi.org, aeaweb.org, pnas.org, nejm.org, academic.oup.com, apnews.com, reuters.com, npr.org, bbc.co.uk, bbc.com, theguardian.com, lemonde.fr, abc.net.au, nytimes.com, ft.com, aljazeera.com

# Luxmi InvestCare — Regulatory Compliance Watch Log

> **Append-only record.** Add new dated entries below; never delete or rewrite historical findings. Corrections must be recorded as a dated correction entry with links to the original entry.

**Business:** Luxmi InvestCare — AMFI-registered Mutual Fund Distributor (ARN 365140)  
**Website:** https://www.luxmiinvestcare.com  
**Repository:** https://github.com/shivpawan007/LuxmiInvestCare  
**Review timestamp:** 23 November 2026, 00:24:37 IST (Asia/Kolkata)  
**Branch:** `compliance/regulatory-watch-2026-11-23`  
**Main baseline:** `521cb8181c76a0aef25ad0326efab9b7ee3f2dd3  
**Scope:** SEBI, AMFI, RBI, MeitY, Government of India/Gazette, Income Tax Department, Consumer Affairs and CERT-In; public website, disclosures, privacy, forms, calculator content and user journeys.

## Executive summary

- **HIGH / P1 — Digital accessibility:** SEBI circular dated 30 October 2026 extends appointment of an IAAP auditor, digital accessibility audit and remediation to **31 January 2027**. The circular names registered intermediaries and AMFI; Luxmi's direct scope as an AMFI MFD needs human confirmation. No accessibility audit evidence was found in the repository audit.
- **MEDIUM / P2 — DPDP preparation:** Rule 4 (Consent Manager) commenced 13 November 2026. The main notice/security/rights/breach rules listed in Rules 3, 5–16, 22 and 23 are scheduled for 13 May 2027 (18 months from the Rules' Gazette date). Luxmi is not identified as a Consent Manager in the inspected website flows. Privacy-policy/data-flow review is needed ahead of the future commencement.
- **LOW website / conditional MEDIUM business — FATCA/CRS:** SEBI circular dated 11 November 2026 updates reporting references to Income-tax Act 2025/Rules 2026 and Form 166 for intermediaries within scope. No FATCA/CRS certification or KYC onboarding was identified in the public website journey; entity/reporting status remains a professional confirmation item.
- **CRITICAL / P1 — Existing release blocker:** The latest stored CI audit from 22 November 2026 remains FAIL: 3 production dependency vulnerabilities (1 critical, 1 high, 1 low), 6 full-tree vulnerabilities (1 low, 3 moderate, 1 high, 1 critical), and a high promotional-language finding on `/calculators/sip`. These are historical results, not fresh tests in this watch run.
- **Monitoring gap:** The previous watcher covered six SEBI/AMFI pages and did not directly watch the SEBI circular list. The proposed configuration expands to 18 sources. The existing watcher still compares raw SHA-256 bytes, not semantic regulatory text.

## Entry 2026-11-23 00:24:37 IST — SEBI Digital Accessibility timeline

**Source / authority:** SEBI  
**Circular:** *Extension of timeline with respect to compliance of Digital Accessibility Circulars*  
**Circular No.:** HO/53/12/13(2)2026-ITD5-M2IPC/I/24856/2026  
**Published/effective:** 30 October 2026  
**Official page:** https://www.sebi.gov.in/legal/circulars/oct-2026/extension-of-timeline-with-respect-to-compliance-of-digital-accessibility-circulars_105523.html  
**Official PDF:** https://www.sebi.gov.in/sebi_data/attachdocs/oct-2026/1793363799724.pdf

### Previous requirement vs. change

- SEBI's 31 July 2026 circular extended digital-platform accessibility audit and remediation to 31 October 2026.
- The 30 October 2026 circular extends **appointment of an IAAP auditor, audit of digital platforms and remediation of audit findings to 31 January 2027**.
- All other provisions of the earlier Digital Accessibility Circulars remain unchanged.

**Applicability assessment:** The circular addresses all Registered Intermediaries and AMFI. Luxmi InvestCare is AMFI-registered as an MFD. Whether the circular directly covers this individual MFD website in the same way as SEBI-registered intermediaries must be confirmed by a compliance professional/AMFI. Treat it as potentially applicable and do not assume exemption.

**Risk:** HIGH / P1 review — deadline is 69 days from the review date.

**Impacted scope:** All public website routes, including home, about, services, calculator landing pages and calculators, investor education, contact, privacy and disclosures; plus authenticated admin pages and common components. The previous audit checked route availability, not accessibility.

**Repository evidence:** No formal IAAP audit report or dedicated accessibility test evidence was identified. The repository's public-route probe (13 routes) and successful build do **not** establish accessibility compliance.

**Recommended audit scope (not a claim that these are the circular's exact technical standards):** keyboard-only navigation and focus order; screen-reader labels and announcements; heading/landmark structure; contrast; zoom/reflow; forms and error feedback; link/button names; images/alternative text; calculator inputs, chart alternatives and dynamic result announcements; mobile responsiveness; and authenticated admin screens.

**AI analysis / action:** No website code change made because applicability and a formal audit need human review. Arrange an IAAP auditor (if applicable), obtain a documented audit, and remediate findings before the deadline. Do not substitute automated checks for the required professional audit.

**Unresolved human review:** (1) Confirm direct applicability to an AMFI MFD. (2) Confirm who appoints the auditor and approve the audit/remediation scope.

## Entry 2026-11-23 00:24:37 IST — DPDP phased commencement and privacy notice preparation

**Authority:** MeitY / Government of India  
**Rules:** Digital Personal Data Protection Rules, 2025, G.S.R. 846(E), Gazette dated 13 November 2025  
**Rules index:** https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?pageTitle=Digital-Personal-Data-Protection-Rules-2025  
**Rules Gazette PDF:** https://egazette.gov.in/WriteReadData/2025/267650.pdf  
**Commencement notification G.S.R. 843(E):** https://egazette.gov.in/WriteReadData/2025/267647.pdf

### Effective dates and requirements

- **13 November 2026:** Rule 4 (Consent Manager registration and obligations) commenced one year after Gazette publication. This is relevant to Consent Manager services, not an ordinary website merely collecting enquiry data.
- **13 May 2027 (calculated from the Gazette's 18-month commencement):** Rules 3, 5–16, 22 and 23 are scheduled to commence. The Gazette's phased dates are authoritative; monitor for any amendment/corrigendum.

**Previous vs. new:** The commencement is phased, not a single commencement date. Rule 4 is now in effect; the principal Data Fiduciary notice/security/rights/breach-related rule package is on the 18-month phase.

**Website review:** The privacy page last updated 6 October 2026 describes enquiry fields (name, mobile, email, message, source page), calculator report-sharing session details and browser local-storage history; it lists processing purposes, a withdrawal/contact route, security and a flexible retention statement. The page does not specify a fixed retention schedule. The website does not appear to operate a Consent Manager.

**Risk:** MEDIUM / P2 preparation.

**Impacted:** `app/privacy/page.tsx`, contact/enquiry form, report-sharing/local-storage paths, lead APIs/database and admin lead access.

**AI analysis / action:** Before the 18-month phase, review whether the standalone notice clearly itemises data and purposes; provides the appropriate withdrawal, rights-exercise and Board-complaint means; and documents retention, processors, consent basis, breach response and security controls. No policy/code change was made because exact retention and processing/legal choices require human approval.

**Unresolved human review:** Confirm data retention periods, processors, consent bases, rights-request handling, breach-response owner and final notice wording.

## Entry 2026-11-23 00:24:37 IST — SEBI FATCA/CRS reporting update

**Authority:** SEBI  
**Circular:** *Reporting requirement under Foreign Account Tax Compliance Act (FATCA) and Common Reporting Standard (CRS) revised through Income-Tax Act, 2025 read with Income-Tax Rules, 2026*  
**Circular No.:** HO/38/14/(18)2026-MIRSD-POD2/I/25560/2026  
**Published:** 11 November 2026  
**Official page:** https://www.sebi.gov.in/legal/circulars/nov-2026/reporting-requirement-under-foreign-account-tax-compliance-act-fatca-and-common-reporting-standard-crs-revised-through-income-tax-act-2025-read-with-income-tax-rules-2026_105705.html

**Previous requirement:** Earlier SEBI FATCA/CRS circulars referenced Income-tax Act 1961, Rules 114F–114H and Form 61B.  
**New requirement:** The circular updates references to Income-tax Act 2025, Rules 238–240 and Form 166, including reporting/certification duties for intermediaries within scope.

**Applicability:** The circular is directed to SEBI-registered intermediaries and reporting financial institutions. Luxmi's public website is an AMFI MFD enquiry/education site; no KYC/FATCA/CRS certification collection was identified. Website applicability is not established.

**Risk:** LOW for website; MEDIUM conditional for entity-level reporting.

**AI analysis / action:** No website changes. Confirm whether Luxmi is a SEBI-registered intermediary and/or Reporting Financial Institution and consult tax/compliance professional if applicable before implementing new forms/reporting.

## Entry 2026-11-23 IST — Other SEBI/AMFI updates reviewed

SEBI's circular listing was reviewed for 5–17 November 2026:

- 17 November — Review of Margin Framework for Commodity Derivatives Segment: no direct MFD website impact identified.
- 5 November — Review of the framework for Accredited Investors: no accredited-investor onboarding or service identified on the website; no direct change recommended.
- 5 November — Framework for net settlement of funds for mutual fund schemes in cash market: scheme/transaction operations; no MFD website change identified.
- AMFI's MFD circular list continues to show the 28 July 2026 single-examination registration circular as its newest listed MFD circular, with the MFD Master Circular dated 14 January 2026. No newer MFD-specific circular was identified in the list checked.

**Sources:**  
SEBI circular listing: https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&smid=0&ssid=7  
AMFI MFD circulars: https://www.amfiindia.com/distributor/amfi-circulars

## Entry 2026-11-23 IST — Existing repository audit status (historical evidence)

**Source:** GitHub Actions Weekly Random Compliance Audit, Run #82  
**Run:** https://github.com/shivpawan007/LuxmiInvestCare/actions/runs/45016925749  
**Audit JSON:** `compliance/audit/latest.json` in main  
**Generated:** 22 November 2026, 16:52:46 IST (from 11:22:46 UTC)

- Production dependency audit: **3 vulnerabilities — 1 critical, 1 high, 1 low**; gate failed.
- Full dependency audit: **6 vulnerabilities — 1 low, 3 moderate, 1 high, 1 critical**.
- High content finding: `promotion.return-on-investment` at `/calculators/sip`.
- 13/13 public route probes returned HTTP 200.
- Compliance content scan passed for 115 source files.
- Production build succeeded in that run.
- Overall audit **FAIL**; successful route probes/build/scan do not override failed security/content gates.
- The source watcher detected byte-hash changes in the SEBI regulations and SEBI MF master-circular listing between 21 and 22 November. No semantic diff was produced by the watcher, so those changes remain source-review triggers rather than confirmed regulatory amendments.

**Risk:** CRITICAL / P1 for dependency remediation; HIGH for SIP wording. This watch run did not execute a fresh npm audit, ESLint, TypeScript, build, or route probe. Do not treat these 22 November results as current verification.

## Entry 2026-11-23 IST — Monitoring coverage improvement

**Previous:** Six source URLs in `config/mfd-compliance-sources.json`, limited to SEBI regulations/master circulars and AMFI MFD circulars/master/FAQs. The SEBI circular listing was not directly monitored.  
**Proposed:** 12 additional source URLs (18 total), including SEBI circulars and identified circulars, AMFI general circulars, RBI circular index, MeitY DPDP index/Gazette references, Income Tax Department portal/FAQ, Consumer Affairs and CERT-In.

**Monitoring limitations:** The current script uses byte-level SHA-256; it does not semantically compare regulatory text. Dynamic HTML can generate false positives. Static Gazette PDFs are reference snapshots and cannot detect amendments by themselves. The eGazette homepage timed out during this run and was not added as a broad source. The watcher does not replace primary-source reading or legal review.

**Files changed in this proposed PR:**
- `config/mfd-compliance-sources.json` — expanded source coverage.
- `compliance/regulatory-log.md` — durable chronological review.
- `compliance/regulatory-log.json` — machine-readable entries.

**Validation:** The updated source configuration and log JSON were parsed before writing. No npm/Node test, accessibility test, build or dependency audit was run in this automation session. The existing compliance workflow does not run on this branch, so no CI result is claimed.

**PR / commits:** To be filled with verified links after the PR and follow-up log commits.

---

## Human actions / review queue

1. **Accessibility (P1 review):** Confirm whether the SEBI circular applies directly to Luxmi as an AMFI MFD; if yes, appoint an IAAP auditor and schedule audit/remediation by 31 January 2027. Consider proactively auditing even while scope is being confirmed.
2. **Privacy (P2 preparation):** Review and approve a DPDP-ready notice, retention schedule, data-rights request process, processor inventory and breach-response workflow before 13 May 2027.
3. **FATCA/CRS (conditional):** Confirm entity-level reporting-financial-institution/intermediary status with a tax/compliance professional; website changes are not recommended absent evidence of applicability.
4. **Existing critical release blockers:** Separate remediation workstream must resolve production dependency vulnerabilities and the high SIP promotional-language finding, then rerun the full release gates.

**Change control:** This log does not authorize merging or production deployment. All changes remain in a review PR until approved. Append future updates; preserve every earlier entry.


## Verified PR and commit links

**Draft PR:** https://github.com/shivpawan007/LuxmiInvestCare/pull/18

- Source configuration commit: https://github.com/shivpawan007/LuxmiInvestCare/commit/68dd26030cdc320941f20d9ae0a8278998472ffe
- Initial machine-readable log commit: https://github.com/shivpawan007/LuxmiInvestCare/commit/6848a53ab19f35e95d60ef919f5db869e2f5c99c
- Initial Markdown log commit: https://github.com/shivpawan007/LuxmiInvestCare/commit/ba9b2d7491f9b6c4532004a243182c92787b4493

These commits and this PR contain only monitoring configuration and compliance documentation; no production code, merge, or deployment.


## Supplemental verification — 23 November 2026, 00:32:06 IST

- The official SEBI July 31 accessibility page confirms circular metadata, but its text/PDF could not be extracted in this web session. The previous **31 October** deadline is corroborated by a secondary full-text reproduction; the **31 January 2027** extension in the October 30 circular is confirmed from the official SEBI circular. See official July page: https://www.sebi.gov.in/legal/circulars/jul-2026/extension-of-timelines-with-repect-to-compliance-of-digital-accessibility-circulars-_103277.html and secondary cross-check: https://www.compliedai.com/updates/sebi/extension-of-timelines-with-repect-to-compliance-of-digital-accessibilit-xkojxg
- Official SEBI FATCA/CRS page and PDF link identified. PDF text could not be extracted in this session; Form 166 / Act 2025 / Rules 2026 details were cross-checked against secondary reproductions and should be verified from the official PDF before any business action. Official PDF: https://www.sebi.gov.in/sebi_data/attachdocs/nov-2026/1794392501415.pdf
- PR check status at 00:32:06 IST: **Vercel Preview Comments succeeded; three Vercel deployment status contexts remained pending; no GitHub Actions checks ran on this branch.** No build/test result is claimed for this PR.


## Daily review — 24 November 2026, 00:43:45 IST (Asia/Kolkata)

**Run ID:** REGWATCH-2026-11-24-0043IST  
**Regulatory result:** No new material rule/circular/FAQ change identified for Luxmi's MFD website scope since the previous watch. This is a source-list review, not a guarantee of exhaustive coverage.

### Sources checked and result
- **SEBI circulars:** official listing reviewed through the latest displayed 17 November 2026 entry (Review of Margin Framework for Commodity Derivatives Segment). No later SEBI circular surfaced in the reviewed listing through 24 November. Commodity-derivatives margin scope does not directly affect the MFD website identified.
- **AMFI MFD circulars:** official MFD-specific list reviewed; latest displayed MFD circular is CIR/ARN-33/2026-27 dated 28 July 2026 (registration for mutual fund and SIF distribution under NISM-V-D examination). No new MFD circular identified.
- **AMFI general circulars:** reviewed; no new applicable MFD website requirement identified.
- **RBI circular index:** November 23 entries include securitisation amendment directions for AIFIs, NBFCs, SFBs and commercial banks. Recipient/scope is institution-specific; no direct Luxmi website impact identified.
- **MeitY/DPDP, Consumer Affairs and CERT-In:** fresh search did not surface a material update directly applicable to Luxmi's website in this review window. Coverage is limited by search/index access; primary-source pages may be dynamic or not fully indexed.

### Previously identified regulatory items — status unchanged
- **HIGH / P1 — SEBI digital accessibility:** deadline 31 January 2027. Direct applicability to Luxmi as an AMFI-registered MFD remains for human confirmation. Formal IAAP audit evidence still not identified. **Issue #19 opened** for scope confirmation and auditor/audit plan: https://github.com/shivpawan007/LuxmiInvestCare/issues/19.
- **MEDIUM / P2 — DPDP preparation:** Rule 4 commenced 13 November 2026; principal Data Fiduciary rule package is scheduled for 13 May 2027 subject to Gazette verification. Privacy/data-flow and retention decisions remain open.
- **FATCA/CRS — conditional:** entity reporting status and any Form 166 obligations remain to be confirmed; no public website KYC/certification flow was identified.

### Freshly verified repository audit evidence
- Scheduled **Weekly Random Compliance Audit #83** completed on 23 November 2026 at 18:06:43 IST, but its final audit gate **FAILED**. Workflow evidence: https://github.com/shivpawan007/LuxmiInvestCare/actions/runs/45175718230.
- Persisted report: https://github.com/shivpawan007/LuxmiInvestCare/commit/1c8cc98ce922e7996bc85c3a03b5930d77257ea5.
- Report status **FAIL**: production dependencies 3 vulnerabilities (1 critical, 1 high, 1 low); full tree 6 (1 critical, 1 high, 3 moderate, 1 low); high promotional-language finding `promotion.return-on-investment` on `/calculators/sip`; 13/13 required routes HTTP 200.
- Workflow steps for compliance scan, dependency audit, build, audit report generation/upload and report commit completed; final fail-gate step failed because persisted audit was FAIL. These results are from workflow #83, not new commands run during this automation.
- Remediation PR #17 remains open/unmerged: https://github.com/shivpawan007/LuxmiInvestCare/pull/17. Comment added with the current audit evidence and requested review: https://github.com/shivpawan007/LuxmiInvestCare/pull/17#issuecomment-7111339828.

### Changes this run
- No website code/content or production change.
- Opened human-review issue #19 for digital accessibility scope and IAAP audit tracking.
- Added a compliance-watch comment to PR #17 and a daily review comment to this log PR.
- Append-only log update in this draft PR; no prior entry overwritten.

### Validation and limitations
- Source-list findings were checked via fresh web retrieval on 24 November 2026. No new direct website requirement was found.
- No new local npm audit, lint, TypeScript, tests, build, accessibility audit, or live route probe was run in this automation. Workflow #83 results are reported separately as historical evidence.
- Source searches may omit or lag dynamic regulatory pages; primary-source review was limited to accessible listings and surfaced documents.
- **No PR merge or production deployment performed.**

### Human action
1. Review issue #19; confirm accessibility applicability and arrange IAAP audit if required before 31 January 2027.
2. Review and merge/revise PR #17 only after its validation and manual/legal blockers are resolved.
3. Review PR #18 to approve the monitoring source configuration and durable log.


## Supplemental validation status — 24 November 2026, 00:47:29 IST (Asia/Kolkata)

**Supplement ID:** REGWATCH-2026-11-24-0047IST-SUPPLEMENT-1

### Remediation PR #17 — latest CI evidence
- Workflow run **#46** failed at the production-build step: https://github.com/shivpawan007/LuxmiInvestCare/actions/runs/44981759265.
- Branch artifact `luxmi-remediation-checks` contains production and full `npm audit` JSON reports with **0 vulnerabilities each**. Compliance content scan and ESLint steps passed.
- **Production build failed**, and the live route/compliance audit was **skipped**.
- **Three Vercel deployment contexts failed**; the Vercel Preview Comments check itself passed.
- The artifact did not contain the build log; root cause is not diagnosed. The PR body previously described latest validation as pending; this supplement records the actual observed failure.
- PR #17 comment: https://github.com/shivpawan007/LuxmiInvestCare/pull/17#issuecomment-7111387860.

### Main branch status remains separate
- Main scheduled audit #83 remains **FAIL**, with 3 production dependency vulnerabilities (1 critical, 1 high, 1 low), 6 full-tree vulnerabilities (1 critical, 1 high, 3 moderate, 1 low), and the high `promotion.return-on-investment` finding on `/calculators/sip`. 13/13 routes passed the route probe.
- Main audit evidence: https://github.com/shivpawan007/LuxmiInvestCare/actions/runs/45175718230.
- PR #18 supplemental comment: https://github.com/shivpawan007/LuxmiInvestCare/pull/18#issuecomment-7111390494.

**No code changes, merge or production deployment.** Build failure root cause and preview deployment errors require review and another CI validation run.

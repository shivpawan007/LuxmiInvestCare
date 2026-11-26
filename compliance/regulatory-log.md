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


## Daily review — 25 November 2026, 00:10:22 IST (Asia/Kolkata)

**Run ID:** REGWATCH-2026-11-25-001022IST  
**Regulatory result:** No new directly applicable SEBI/AMFI statutory website requirement was identified. A new **CERT-In Critical threat advisory** (CIAD-2026-0062, issued 20 November) is materially relevant to Luxmi's exposed login/API and CRM/admin attack surface and requires security review. This is threat intelligence, not a new MFD rule.

### New CERT-In advisory — Critical threat, Luxmi P1/high security review

**Authority:** CERT-In / Ministry of Electronics and Information Technology, Government of India  
**Title:** *Abuse of Business Payment Workflows and Use of AI-Driven Agentic Offensive Frameworks across Sectors*  
**Advisory ID:** CIAD-2026-0062  
**Publication date:** 20 November 2026  
**Retrieval/review:** 25 November 2026, 00:10:22 IST (Asia/Kolkata)  
**Official advisory:** https://www.cert-in.org.in/s2cMainServlet?VLCODE=CIAD-2026-0062&pageid=PUBVLNOTES02  
**Official CERT-In 2026 advisory list:** https://www.cert-in.org.in/s2cMainServlet?pageid=PUBADVLIST02&year=2026

**Previous guidance:** CERT-In advisories CIAD-2026-0046, 0049 and 0058 already addressed payment/disbursement API abuse and AI-enabled intrusion. The current main login and public enquiry endpoints inspected in this review did not show application-level rate-limit enforcement. PR #17 proposes rate limiting and response-security headers but remains unmerged and has a failed production-build validation.

**New guidance:** CERT-In describes abuse of trusted business workflows and underlying records/approval relationships, AI-driven agentic offensive frameworks, automated reconnaissance, credential attacks and unauthorized access. It recommends reviewing internet-facing applications/APIs, identities, privileged accounts, service credentials, external integrations, monitoring/logs and incident response, and refers organizations to CIAD-0046, CIAD-0049, CIAD-0058 and the AI-assisted vulnerability-exploitation blueprint. Recommendations are not a new website-specific legal requirement.

**Applicability assessment:** No payment, payout, transfer or disbursement route names were found in the recursive repository path search. This is a path/name search only—not proof that no payment workflow or code exists. Payment-workflow abuse is not directly evidenced. General credential, exposed API/application, privileged access and business-record alteration risks are relevant because the site has an admin login, public lead submission and CRM/admin routes.

**Risk:** CERT-In advisory severity **CRITICAL**; Luxmi exposure assessed **HIGH / P1 security review**, not critical on current evidence. Impacts include credential abuse, unauthorized CRM access/changes, lead spam/availability and enquiry-data exposure. No evidence of compromise was found; logs and security telemetry were not examined.

**Impacted files/routes:**
- `app/api/auth/login/route.ts` — login/password verification; no visible rate-limit call in inspected main.
- `app/api/leads/route.ts` — validated public lead submission and consent; no visible rate-limit call in inspected main.
- `app/api/admin/leads/route.ts`, `app/api/admin/leads/[id]/route.ts`, `app/api/admin/users/route.ts`, `app/api/admin/leads/[id]/activities/route.ts` — authenticated/role-checked routes inspected; continue review of mutation authorization, privileged record changes and auditability.
- `next.config.ts` — inspected main configuration does not define baseline response-security headers.
- `lib/rateLimit.ts` and `database/migrations/2026-11-22-api-rate-limits.sql` — proposed in PR #17, not present/effective in main.

**AI analysis / remediation:** Reuse and review PR #17's proposed MySQL-backed rate limiting for public leads and login, security headers, migration and proxy/IP handling rather than duplicating unvalidated controls. Diagnose the build failure and rerun CI first. Review MFA/least privilege for admin and provider accounts, secrets hygiene, independent verification for sensitive record changes, and logs/monitoring. No code change was made in this watch because rate-limit infrastructure, proxy trust, migration, and security configuration require validation; no incident or logs were assessed.

**Issue created:** P1 security review issue #20 — https://github.com/shivpawan007/LuxmiInvestCare/issues/20  
**Related remediation PR #17:** https://github.com/shivpawan007/LuxmiInvestCare/pull/17  
**Regulatory-log PR #18:** https://github.com/shivpawan007/LuxmiInvestCare/pull/18

### Other source checks

- **SEBI circular listing:** latest displayed relevant entry dated 17 November 2026 (commodity-derivatives margin framework); no later directly relevant MFD website update surfaced. Official listing: https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&sid=1&smid=0
- **AMFI MFD circulars:** latest displayed item remains CIR/ARN-33/2026-27 dated 28 July 2026; no newer MFD-specific item surfaced. https://www.amfiindia.com/distributor/amfi-circulars
- **RBI:** official November index shows 23 November securitisation amendment directions for AIFIs, NBFCs, SFBs and commercial banks; institution-specific, no direct Luxmi MFD website impact identified. https://www.rbi.org.in/scripts/BS_CircularIndexDisplay.aspx
- **Consumer Affairs:** official search surfaced GATC notification S.O. 5620(E), dated 13 October 2026, legal-metrology subject; no direct website impact identified. https://consumeraffairs.gov.in/
- **MeitY/DPDP and Income Tax:** fresh search did not surface a new directly applicable change; previous DPDP phased commencement and FATCA/CRS applicability questions remain open. Dynamic source/search coverage may be incomplete.

### Latest main-branch audit — workflow #84 (historical CI evidence)

**Workflow:** https://github.com/shivpawan007/LuxmiInvestCare/actions/runs/45405885027  
**Report generated:** 24 November 2026, 19:11:42 IST  
**Report commit:** 1c8cc98ce922e7996bc85c3a03b5930d77257ea5  
**Conclusion:** FAIL — final fail-gate step failed because persisted audit status was FAIL.

- Production dependency audit: **3 vulnerabilities** (1 critical, 1 high, 1 low).
- Full dependency tree: **6 vulnerabilities** (1 critical, 1 high, 3 moderate, 1 low).
- **HIGH** promotional-language finding `promotion.return-on-investment` on `/calculators/sip`.
- Route probe: **13/13 HTTP 200**.
- Compliance scan, dependency audit, production build, route probe, report upload and report commit steps completed in this workflow. Successful steps do not override the overall audit failure.

This is workflow #84 evidence retrieved from GitHub, not a fresh local audit.

### Changes this run

- Created human-review security issue #20 with scope, findings, recommended options and validation limitations.
- Added CERT-In advisory listing and direct CIAD-2026-0062 source URLs to the existing watch configuration (18 → **20 sources**).
- Appended this review to Markdown and machine-readable logs; prior entries were preserved.
- No application code changed; no merge or production deployment.

**Validation:** Source/config and machine-readable log JSON were parsed in the automation before update. Official CERT-In advisory/listing and SEBI/AMFI/RBI/Consumer Affairs sources were reviewed. Repository/API files were read through GitHub for security posture. No local npm audit, ESLint, TypeScript, build, penetration test, production route test or log review was run.

**Email:** Not sent. Gmail access/search requires interactive authorization and the recipient could not be verified.

### Human actions / review queue

1. **P1 security:** Review issue #20 and PR #17. Diagnose its build failure, validate rate limits/security headers/IP trust and migration, and check MFA, secrets, privileged record changes and security logs.
2. **P1 accessibility:** Continue issue #19; confirm direct SEBI scope and arrange IAAP audit/remediation if applicable by 31 January 2027.
3. **P2 privacy:** Approve actual retention, processor/data-flow, consent/withdrawal, rights-request and breach-response arrangements before DPDP main rules commence.
4. **Conditional tax:** Confirm FATCA/CRS entity/reporting status with tax/compliance professional.

**Change control:** No code or production deployment. Changes remain in PR #18 for review. Monitoring is source-change detection, not semantic legal analysis; primary-source access/search may be incomplete.


### Supplemental GitHub branch verification (same watch run)

PR #18 remains **OPEN / DRAFT**. GitHub compare of `main` with `compliance/regulatory-watch-2026-11-23` reports **14 commits ahead / 3 behind**, compare status `diverged`, and mergeability `unknown`. The comparison lists only the three intended log/config files: `compliance/regulatory-log.md`, `compliance/regulatory-log.json`, and `config/mfd-compliance-sources.json`. Keep draft; refresh against main and resolve conflicts while preserving append-only history before approval/merge.

**Verified update commits:**
- Source configuration: https://github.com/shivpawan007/LuxmiInvestCare/commit/cb878ef908f7963d0474a4ecd6a315dd28e35673
- Machine-readable log: https://github.com/shivpawan007/LuxmiInvestCare/commit/a587203dc06a52cdac3a64075d4c7935b528409c
- Markdown log: https://github.com/shivpawan007/LuxmiInvestCare/commit/5b864d36f490220544c714a9befa5725e9ed3909

Comments recorded: PR #17 comment ID 7141090779; PR #18 comment ID 7141091446 and synchronization note ID 7141105352. PR #18 head SHA after updates: `5b864d36f490220544c714a9befa5725e9ed3909`. This synchronization check is read-only; no merge or deployment occurred.

### Supplemental branch comparison correction (later verification in this watch run)

A second read-only compare after the latest two log commits reports PR #18 as **16 commits ahead / 3 behind main** (status `diverged`, mergeability unknown). The earlier 14-ahead figure above was the comparison snapshot before those two additional log commits. The comparison still lists only the three intended log/config files. Keep the PR draft; synchronize with main and preserve append-only history before merge/review. Exact retrieval time was not returned by the compare API.


## Daily regulatory review — 26 November 2026, 00:42:56 IST (Asia/Kolkata)

**Retrieval timestamp:** 2026-11-26T00:42:56+05:30  
**Review status:** NEW SEBI investor advisories and KRA circular identified; DPDP order clarification verified; no safe/direct website code change identified in the inspected content.  
**Branch:** `compliance/regulatory-watch-2026-11-23`  
**PR:** https://github.com/shivpawan007/LuxmiInvestCare/pull/18  
**Current branch comparison:** At this review, `main`...watch branch reports 18 commits ahead / 4 behind, status `diverged`; only the three compliance-log/source-config files are listed in the compare. Mergeability is unknown. Do not merge; synchronize later while preserving the append-only log.

### Entry 2026-11-26 — SEBI PR 75/2026: Unregulated IPO pre-listing premium / GMP advisory

**Authority:** Securities and Exchange Board of India (SEBI)  
**Source title:** *Advisory Regarding Unregulated Pre-listing Premium often called as Grey Market Premium (GMP) for Upcoming Initial Public Offers (IPOs)*  
**Press release:** PR No. 75/2026  
**Publication date:** 23 November 2026  
**Effective date:** Press release/advisory published 23 November 2026; no separate commencement date stated.  
**Official page:** https://www.sebi.gov.in/media-and-notifications/press-releases/nov-2026/advisory-regarding-unregulated-pre-listing-premium-often-called-as-grey-market-premium-gmp-for-upcoming-initial-public-offerings-ipos-_105942.html  
**Official PDF:** https://www.sebi.gov.in/sebi_data/attachdocs/nov-2026/1795441481174.pdf

**Previous requirement/status vs. new advisory:** No GMP figures or grey-market-premium content were found in the public content files specifically inspected for this watch. SEBI now warns that GMP figures are unofficial, unverified and unregulated, not part of exchange price discovery, without settlement guarantee or investor-protection framework. SEBI says publication/display/circulation/dissemination may be discontinued across the securities market and advises SEBI-registered intermediaries and market participants to refrain from publishing, displaying or broadcasting GMP figures on websites, platforms, email, SMS or social channels.

**Applicability:** This is a press release/advisory, not a new circular or statutory commencement instrument. Luxmi is AMFI-registered as an MFD; whether it is within the advisory's use of “market participants” or any directly covered intermediary class requires human compliance/legal confirmation. Do not assume either exemption or direct registration status.

**Risk:** MEDIUM / P2 — content/regulatory scope review. If in-scope GMP publication is used, it may expose investors to misleading unofficial pricing and create regulatory risk.

**Impacted scope:** Public marketing/educational pages; any IPO content; social posts/reels/captions; WhatsApp broadcasts/groups; email/SMS; future editorial approval. Targeted checks of `app/page.tsx`, `app/investor-education/page.tsx`, `components/home/InvestorEducation.tsx`, `app/disclosures/page.tsx`, and `app/privacy/page.tsx` found no GMP/grey-market-premium content. GitHub targeted search returned no matches, but indexing/search is not exhaustive and external social channels were not checked.

**AI analysis/action:** No code/content removal was made because no GMP content was identified in the inspected website material and scope to an AMFI MFD needs human confirmation. Avoid adding GMP figures to future marketing pending compliance guidance.

**Human review:** Confirm advisory scope for Luxmi MFD; review all external and archived social/email/WhatsApp content; approve future IPO-content controls.

**Issue:** https://github.com/shivpawan007/LuxmiInvestCare/issues/21  
**Log PR:** https://github.com/shivpawan007/LuxmiInvestCare/pull/18

**Validation:** Official SEBI press-release page and two-page PDF reviewed. Targeted repository file inspection/search only; no exhaustive external-channel audit, automated test, build, route test or production verification.

### Entry 2026-11-26 — SEBI PR 76/2026: Impersonation of registered intermediaries on closed social-media groups

**Authority:** SEBI  
**Source title:** *Caution to investors regarding impersonation of SEBI registered intermediaries on closed user groups of social media platforms*  
**Press release:** PR No. 76/2026  
**Publication date:** 23 November 2026  
**Effective date:** Press-release investor caution published 23 November 2026; no separate statutory commencement date.  
**Official page:** https://www.sebi.gov.in/media-and-notifications/press-releases/nov-2026/caution-to-investors-regarding-impersonation-of-sebi-registered-intermediaries-on-closed-user-groups-of-social-media-platforms_105944.html  
**Official PDF:** https://www.sebi.gov.in/sebi_data/attachdocs/nov-2026/1795578311073.pdf

**Previous guidance vs. new:** The release references earlier SEBI impersonation and invitation-only WhatsApp stock-tip warnings. PR 76 describes fake closed WhatsApp/Telegram groups impersonating intermediaries, fabricated institutional trading opportunities, foreign-market/stock recommendations, unauthorised trading platforms and third-party bank accounts. It identifies red flags including unsolicited invitation links, fake accounts/apps, misuse of registration screenshots and letterheads, false SEBI connections and re-invitation after group suspension. Investors are directed to independently verify registration, apps and payment details and avoid unknown groups.

**Applicability:** Investor-protection warning, not a new binding MFD website rule. It is relevant to brand/channel integrity because Luxmi's name/ARN/contact details could be impersonated. The official Luxmi social profiles, account ownership, group activity and external links were not independently verified in this run.

**Risk:** MEDIUM / P2 — impersonation, investor fraud, brand harm and false affiliation.

**Impacted scope:** Social-media account ownership and handles; WhatsApp contact/group practices; website contact/social links; investor-facing fraud warnings and marketing approval workflow.

**AI analysis/action:** No new public warning was published because official account handles/contact destinations must first be verified. Issue #21 groups this warning with PR 75 for a human channel/content audit.

**Issue:** https://github.com/shivpawan007/LuxmiInvestCare/issues/21  
**Log PR:** https://github.com/shivpawan007/LuxmiInvestCare/pull/18

**Validation:** SEBI official PR page and official PDF reviewed; the PDF content was cross-checked for the described impersonation patterns. No social-account access or incident investigation performed.

### Entry 2026-11-26 — SEBI KRA onboarding and risk-framework circular (25 November 2026)

**Authority:** SEBI  
**Circular:** HO/38/14/(25)2026-MIRSD-POD3  
**Source title:** *Simplification of client on-boarding and rationalisation of risk management framework at KYC Registration Agencies*  
**Publication date:** 25 November 2026  
**Effective date:** 24 December 2026 (30 days from issuance, as stated in the circular)  
**KRA SOP:** KRAs to issue an implementation SOP within 30 days of circular issuance.  
**Official page:** https://www.sebi.gov.in/legal/circulars/nov-2026/simplification-of-client-on-boarding-and-rationalisation-of-risk-management-framework-at-kyc-registration-agencies_105839.html  
**Official 11-page PDF:** https://www.sebi.gov.in/sebi_data/attachdocs/nov-2026/1795605346389.pdf

**Previous requirement/status vs. new circular:** The existing KYC Master Circular and KRA framework are amended to centralise common supplementary information; require uploading/recording CKYC ID and DIGIPIN (if available) and OVD expiry as applicable; include income range, FATCA/CRS, PEP status and occupation in KRA uploads; tag independently verified KRA information; update records from KRA/CKYCRR information and provide a client option to confirm; make mobile verification optional when KRA already marks an Aadhaar-seeded number verified; modify KYC record delinking/closure timelines; permit optional overseas address proof for certain resident OCI/foreign-national clients with verified Indian address; simplify name-change documents; and improve validated-record portability/attribute tagging. The circular's detailed paragraphs and exceptions govern; this summary is not a substitute for the text.

**Applicability:** The circular is addressed to SEBI-registered intermediaries, KRAs, exchanges, clearing corporations and depositories. Luxmi is an AMFI-registered MFD and may assist in KYC workflows via AMCs/RTA/KRA, but direct applicability and the business-process duties require confirmation. Public website inspection found enquiry/contact forms, not a direct KYC/account-opening or document-upload workflow.

**Risk:** MEDIUM / P2 — process readiness review because the effective date is 24 December 2026 and client onboarding/KYC work may be affected if Luxmi participates.

**Impacted scope:** Any MFD/AMC/RTA/KRA onboarding or KYC-update procedure; future forms/document collection; data handling, retention and client confirmation; no direct public website route identified.

**AI analysis/action:** No website form/code changes made. Do not collect CKYC, DIGIPIN, OVD expiry, income/PEP/FATCA-CRS information through a generic enquiry form without an approved, secure workflow and documented legal/business need. Confirm the relevant AMC/KRA SOP and MFD role before updating internal processes.

**Human review / issue:** https://github.com/shivpawan007/LuxmiInvestCare/issues/22  
**Log PR:** https://github.com/shivpawan007/LuxmiInvestCare/pull/18

**Validation:** Official SEBI circular page and full 11-page PDF reviewed, including provisions 3.1–3.7, effective date and KRA SOP requirement. No local tests, npm audit, build, route audit or production verification performed.

### Entry 2026-11-26 — DPDP Removal of Difficulties Order, 2026 (supplemental clarification)

**Authority:** Ministry of Electronics and Information Technology (MeitY), Government of India  
**Instrument:** Digital Personal Data Protection (Removal of Difficulties) Order, 2026 — S.O. 5458(E)  
**Order date:** 5 October 2026  
**Gazette publication date:** 6 October 2026 (Gazette issue No. 5248, printed masthead)  
**Effective date:** 6 October 2026, on Gazette publication  
**Official MeitY PDF:** https://www.meity.gov.in/static/uploads/2026/10/daf495a7b5798a3dfa72a944b51fc176.pdf

**Previous wording vs. new:** Section 9(1) of the DPDP Act wording was corrected from “child or a person with disability” to “child or of a person with disability,” expressly pairing child data and a person with disability who has a lawful guardian for verifiable consent. Section 10(2)(c)(ii) replaces “audit” with “data audit” for the periodic audit of Significant Data Fiduciaries.

**Applicability:** The Order itself is in force, but it does not create a new website obligation, amend the DPDP Rules or move commencement dates. Sections 9 and 10 remain in the 18-month commencement group (13 May 2027 is the calculated date previously logged; confirm against the Gazette commencement instrument and any subsequent amendment). Luxmi's enquiry/report-share processing remains relevant to future DPDP readiness, but the wording correction does not require a website change on present evidence.

**Risk:** LOW / P3 — statutory-text accuracy and future privacy-consent planning.

**Impacted scope:** `app/privacy/page.tsx`, enquiry consent/notice, any future child/person-with-disability data processing or consent verification, and future SDF audit planning only if designated.

**AI analysis/action:** The earlier DPDP phased-commencement entry remains valid but is supplemented to record this Order. No policy/code change made: no child/person-with-disability processing flow was identified, and the corrected wording does not change the existing website flow. Do not infer that Luxmi is a Significant Data Fiduciary.

**Official source:** https://www.meity.gov.in/static/uploads/2026/10/daf495a7b5798a3dfa72a944b51fc176.pdf  
**Cross-check reference (secondary only):** DSCI brief, 9 October 2026: https://www.dsci.in/resource/content/brief-meitys-digital-personal-data-protection-removal-difficulties-order-2026

**Validation:** Official MeitY-hosted Gazette PDF reviewed, including Gazette masthead, operative substitutions and commencement paragraph. No website code or privacy copy changed.

### Daily source checks — 26 November 2026

- **SEBI circular listing (25 Nov):** KRA client-onboarding/risk-framework circular and significant-indices circular newly displayed. KRA circular recorded above; index-provider circular is outside Luxmi's website/MFD scope on present evidence. https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&sid=1&smid=0&ssid=7
- **SEBI press releases (23 Nov):** PR 75 GMP advisory and PR 76 impersonation caution recorded above. https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=6&smid=0&ssid=23
- **AMFI MFD circulars:** Official distributor circular listing searched; no newer MFD-specific item than the previously identified July 2026 entry surfaced in this search. https://www.amfiindia.com/distributor/amfi-circulars
- **RBI:** November circular index shows 23 November securitisation directions for AIFIs, NBFCs, SFBs and commercial banks; no direct MFD website change identified. https://www.rbi.org.in/scripts/BS_CircularIndexDisplay.aspx
- **MeitY/DPDP:** Official MeitY-hosted S.O. 5458(E) PDF verified. No new DPDP commencement change identified in this review. https://www.meity.gov.in/static/uploads/2026/10/daf495a7b5798a3dfa72a944b51fc176.pdf
- **Income Tax Department:** Latest surfaced 6 November update concerned an IFSC aircraft-leasing dividend exemption; 3 November notification concerned non-profit mergers. No direct MFD website disclosure impact identified. https://www.incometax.gov.in/iec/foportal/
- **Consumer Affairs:** Latest surfaced GATC notification S.O. 5620(E), dated 13 October 2026; no direct website requirement identified. https://consumeraffairs.gov.in/pages/gatc-notifications
- **CERT-In:** Official 2026 advisory listing still shows CIAD-2026-0062 (20 Nov), CIAD-0061 (18 Nov), CIAD-0060 (13 Nov) and earlier advisories. No new advisory later than 0062 surfaced in this review. https://www.cert-in.org.in/s2cMainServlet?pageid=PUBADVLIST02&year=2026

### Changes this run

- Created human-review issues **#21** (SEBI PR 75/76: GMP content and social-channel impersonation) and **#22** (SEBI KRA onboarding circular applicability and process impact).
- Expanded source monitoring **20 → 25** by adding SEBI press-release listing, PR 75, PR 76, KRA circular and official MeitY DPDP Order.
- Appended four detailed entries to the Markdown log and four corresponding machine-readable entries; prior history preserved.
- No application code, public marketing content, forms or privacy flows changed because no GMP content was found in the inspected public website material and the scope/business decisions require human confirmation.
- PR #18 remains open/draft; latest comparison at review time reports 18 commits ahead/4 behind main, diverged. Only the compliance log and monitoring configuration are in the comparison. Do not merge/deploy.

### Validation and limitations

- Official SEBI PR 75 and PR 76 pages/PDFs reviewed.
- Official SEBI KRA circular page and full 11-page PDF reviewed.
- Official MeitY-hosted DPDP Removal of Difficulties Order PDF reviewed.
- Targeted main-branch file inspection and repository search performed; search indexing may be incomplete. No external social channels or closed groups inspected.
- No local npm audit, ESLint, TypeScript, tests, build, accessibility audit, live route probe, penetration test or incident-log investigation performed in this watch run.
- Existing main-branch audit #84 and remediation PR #17 evidence remain historical, not rerun today.
- Gmail profile/search/send requires interactive authorization in this non-interactive run; recipient could not be verified, so no email was sent. GitHub issues and PR #18 provide the actionable notifications.

### Human review queue

1. **P2 / Issue #21:** Verify official Luxmi social handles, contact destinations and any closed groups; review GMP content on website, social, email, SMS and WhatsApp; confirm legal applicability of PR 75 to an AMFI MFD.
2. **P2 / Issue #22:** Confirm whether Luxmi assists with KYC onboarding/update through AMC/RTA/KRA and obtain applicable SOPs before 24 December 2026.
3. **P1 / Issue #20:** Continue CERT-In security review, validate PR #17 controls and diagnose build/deployment failures; investigate logs if suspicious activity is suspected.
4. **P1 / Issue #19:** Confirm accessibility circular scope and IAAP audit plan before 31 January 2027.
5. **P2 privacy:** Approve data retention, processors, consent/withdrawal, rights-request and breach-response procedures before the main DPDP rule phase.

**No merge or production deployment performed.**


## Supplemental commit references — 26 November 2026 (Asia/Kolkata)

- Source configuration update (20 → 25 monitored URLs): https://github.com/shivpawan007/LuxmiInvestCare/commit/dbefc6f882e6ad8b160bd8b6ac37f031d2a0bbe2
- Markdown append for the 26 November review: https://github.com/shivpawan007/LuxmiInvestCare/commit/90b9c5b2c2a601da9f855eab2cffaf4a7e42cf31
- Machine-readable JSON append for the 26 November review: https://github.com/shivpawan007/LuxmiInvestCare/commit/0f1ed3406cbd5ca3ed113d9fbd4e2858494e94f2
- Draft compliance PR (all updates remain unmerged): https://github.com/shivpawan007/LuxmiInvestCare/pull/18
- Human-review Issue #21: https://github.com/shivpawan007/LuxmiInvestCare/issues/21
- Human-review Issue #22: https://github.com/shivpawan007/LuxmiInvestCare/issues/22

These references are added as a dated supplement. Earlier source/config/log records remain intact.


## Regulatory compliance watch — 27 November 2026, 00:21:11 IST (Asia/Kolkata)

**Review result: no new directly applicable MFD website regulation identified in the reviewed official listings. New high/critical CERT-In product-vulnerability notes require human asset/version triage.**

### Official-source comparison

- **SEBI official news listing (reviewed through 26 Nov):** 26 Nov shows an UAPA sanctions-list amendment and an SBI MSCI India ETF FoF draft filing; 25 Nov shows the KRA onboarding circular (already recorded) and a significant-indices circular (no direct MFD website impact identified). No new direct MFD website circular surfaced in the reviewed listing. [SEBI listing](https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&search=Of)
- **AMFI MFD circulars:** latest displayed MFD-specific item remains CIR/ARN-33/2026-27, 28 July 2026; no new item surfaced. [AMFI MFD circular listing](https://www.amfiindia.com/distributor/amfi-circulars)
- **RBI notifications:** 26 Nov UAPA sanctions-list updates addressed to RBI-regulated entities; 23 Nov securitisation amendments are institution-specific. No direct MFD website change identified. [RBI notifications](https://www.rbi.org.in/scripts/NotificationUser.aspx)
- **CERT-In advisories:** latest listed advisory remains CIAD-2026-0062 (20 Nov); no later advisory surfaced. [CERT-In advisories](https://www.cert-in.org.in/s2cMainServlet?pageid=PUBADVLIST02&year=2026)
- **MeitY/DPDP, Consumer Affairs and Income Tax:** targeted official-source searches did not surface a new directly applicable change. Coverage is limited and not exhaustive.

### New product vulnerabilities

#### P1 / HIGH — CERT-In CIVN-2026-0576: Multiple Vulnerabilities in WhatsApp

- **Publication:** 26 November 2026; CERT-In severity **HIGH**.
- **Affected products:** WhatsApp and WhatsApp Business for Android/iOS and WhatsApp desktop versions listed in the official note, including WhatsApp Business Android prior to 2.26.23.70 / 2.26.17.4 and iOS prior to 2.26.23.72. Verify exact version branch against vendor guidance.
- **Previous:** Watch included CERT-In advisories but did not explicitly monitor the product Vulnerability Notes listing.
- **New:** crafted messages, attachments or URLs may lead to code execution, sensitive-information disclosure or security restriction bypass on affected versions.
- **Luxmi applicability:** potential because website contact includes WhatsApp; staff use and installed versions are unknown. This is a product-security advisory, not a new MFD regulatory duty.
- **Impacted:** Luxmi-owned staff devices/accounts; `components/home/Contact.tsx` only as a channel reference, not as a vulnerability code target.
- **AI analysis/remediation:** verify all business communication devices and WhatsApp/WhatsApp Business versions; apply vendor-fixed updates immediately if affected; avoid unsolicited links/attachments. No website code patch was made because version and device inventory are unavailable.
- **Official source:** [CERT-In CIVN-2026-0576](https://www.cert-in.org.in/s2cMainServlet?VLCODE=CIVN-2026-0576&pageid=PUBVLNOTES01)
- **Human action:** [Issue #23](https://github.com/shivpawan007/LuxmiInvestCare/issues/23) — device/account/version inventory and patch verification.

#### P1 / CRITICAL advisory — CERT-In CIVN-2026-0572: Multiple Vulnerabilities in NGINX

- **Publication:** 25 November 2026; CERT-In severity **CRITICAL**.
- **Affected:** version-specific NGINX/F5 products; impacts include remote code execution, memory corruption and denial of service.
- **Previous:** NGINX/F5 assets were not identified in the inspected repository; vulnerability-note monitoring was not explicit.
- **New:** affected product versions require inventory and vendor patch verification.
- **Luxmi applicability:** unconfirmed. Repository `vercel.json` indicates Vercel-oriented hosting; no self-managed NGINX/F5 version or asset was found. This does not prove provider-managed ingress is unaffected.
- **Impacted:** hosting/provider infrastructure and any self-managed reverse proxy; public routes only if an affected component is in scope. No application source patch identified.
- **AI analysis/remediation:** obtain provider/IT confirmation and asset inventory; patch only if an affected NGINX/F5 component is actually deployed. Do not make an unsupported Next.js code change.
- **Official source:** [CERT-In CIVN-2026-0572](https://www.cert-in.org.in/s2cMainServlet?VLCODE=CIVN-2026-0572&pageid=PUBVLNOTES01)
- **Human action:** [Issue #23](https://github.com/shivpawan007/LuxmiInvestCare/issues/23).

#### P3 / LOW website risk — SEBI/RBI UAPA sanctions-list amendments, 26 November

- **Previous:** Section 51A/UAPA and sanctions-list obligations continue for covered entities under applicable directions; no MFD website screening flow was identified.
- **New:** SEBI's 26 Nov listing and RBI notification list show amendments to the UNSC ISIL/Al-Qaida sanctions list. RBI directions are addressed to RBI-regulated entities, and no direct MFD website obligation was identified.
- **Applicability:** no direct MFD website change. Luxmi's precise AML/screening/escalation duties under its MFD/AMC arrangements require human confirmation.
- **Impacted files/routes:** none identified; potentially business AML/KYC procedures only if applicable.
- **AI analysis:** log as list update awareness, not a new MFD statutory rule. Confirm obligations with compliance/legal; do not autonomously add a sensitive screening process.
- **Official sources:** [SEBI news listing](https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&search=Of), [RBI notification listing](https://www.rbi.org.in/scripts/NotificationUser.aspx).

### Monitoring-source expansion

Added three official listing sources to the PR branch, increasing the monitored source configuration from **25 to 28**:

1. SEBI official news listing (orders, mutual-fund items, sanctions-list notices): https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&search=Of
2. RBI official notifications listing: https://www.rbi.org.in/scripts/NotificationUser.aspx
3. CERT-In 2026 vulnerability-note listing: https://www.cert-in.org.in/s2cMainServlet?pageid=VLNLIST02&year=2026

### Latest main-branch audit evidence — Workflow #86 (26 Nov)

- **Status: FAIL.** Report timestamp `2026-11-26T12:31:31.128Z` = **18:01:31.128 IST**.
- **115 source files checked; 13 public routes discovered.**
- Critical: `dependencies.production-high-or-critical-vulnerabilities` in production dependency audit.
- High: `promotion.return-on-investment` on `/calculators/sip`.
- Medium: development-only dependency findings in `@eslint/config-array`, `eslint`, and `minimatch`.
- Route probe: **13/13 HTTP 200**.
- Workflow steps for compliance scan, dependency-audit collection, production build, random audit, artifact upload and audit-report commit succeeded; the final fail-gate step failed because the stored audit status was FAIL.
- Evidence: [Workflow #86](https://github.com/shivpawan007/LuxmiInvestCare/actions/runs/45820206882) and [latest audit report](https://github.com/shivpawan007/LuxmiInvestCare/blob/main/compliance/audit/latest.json).
- This is historical GitHub workflow evidence, not a fresh local run. No local `npm audit`, ESLint, TypeScript, build, route probe, accessibility audit or penetration test was run today.

### GitHub updates and branch state


- **Issue #23 created:** P1 security triage for WhatsApp HIGH and NGINX CRITICAL product notes. https://github.com/shivpawan007/LuxmiInvestCare/issues/23
- **Issue #20 updated:** cross-reference to Issue #23.
- **PR #17 updated:** latest main audit #86 and vulnerability triage evidence.
- **PR #18 updated:** daily watch findings, sources, audit and branch state.
- **Source config commit:** https://github.com/shivpawan007/LuxmiInvestCare/commit/62cbd3b73fc27132dfbbc8072a817d02153df5a3
- **JSON log commit:** recorded after this entry is appended; final commit references will be posted in PR #18.
- **PR #18 current comparison:** 23 commits ahead / 5 behind main; compare status diverged, only the three compliance files listed, PR open/draft; mergeable flag true but mergeable state unstable. Latest main SHA `eb07b574691570533b15b4c6e291397d25e10b9d`, PR head `24581f4d16bd7f60394784e369afafbab7916405`. Synchronization remains required.

### Human review queue

1. **P1 / Issue #23:** check WhatsApp/WhatsApp Business devices and versions; verify patch status; confirm hosting-provider/NGINX/F5 exposure.
2. **P1 / Issue #20:** continue broader CERT-In security review; validate PR #17 security controls and diagnose build failure.
3. **P1 / Issue #19:** confirm accessibility circular scope and IAAP audit owner before 31 January 2027.
4. **P2 / Issue #21:** verify official social handles, channels, GMP content and impersonation controls.
5. **P2 / Issue #22:** confirm KRA circular applicability and process/SOP before 24 December 2026.
6. **P2 privacy:** approve retention, processors, consent/withdrawal, rights requests and breach response ahead of the DPDP commencement schedule.
7. **P3:** confirm sanctions-list screening/escalation scope with compliance/legal.

**No website code/content patch, merge or production deployment.** Gmail interactive authorization was unavailable; no recipient was verified and no email was sent.

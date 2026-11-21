# Luxmi InvestCare Compliance & Security Review — 22 November 2026

**Baseline:** GitHub Actions run [44896852598](https://github.com/shivpawan007/LuxmiInvestCare/actions/runs/44896852598), audit commit `96ba16c692f05395956034569b609e541cde4b90` on `main`.

This is a technical and compliance gap review, not a legal certification. It does not verify AMC contracts, actual social-media posts, AMFI status, production secrets, database operations, or external platform settings.

## Baseline evidence

- The audit workflow completed its content scan and production build, but the final compliance audit failed.
- **Public routes:** all 13 required routes returned HTTP 200 in the audit. `/calculators/sip` was flagged only by the broad `return on investment` text rule.
- **npm audit:** 6 findings in the full tree (1 low, 3 moderate, 1 high, 1 critical). Production tree had 3 (1 low, 1 high, 1 critical).
- Production dependencies in the lockfile: Next.js **16.4.0**, Zod **4.5.1**, DOMPurify **3.4.16**.
- Full-tree findings also included `@eslint/config-array 0.23.5`, `eslint 10.14.0`, and `minimatch 11.0.0`; fixes were available in the audit.
- The Next.js 16.4.0 lockfile is below the November security release. Update to patched 16.4.5 or later; the remediation branch targets 16.4.6. See the [official Next.js October security update](https://github.com/vercel/next.js/security/advisories) and the [November release notes](https://nextjs-changelog.vercel.app/).
- Production page text is behind repository text: production privacy/disclosures displayed 26 September 2026, while repository versions were dated 6 October and 20 October respectively. This suggests the production deployment is not reflecting the current `main` source.

## Changes made on this remediation branch

- Updated the Next.js and Zod minimum dependency ranges to patched lines; the remediation workflow will refresh the lockfile and run npm audit fix without `--force`.
- Narrowed the ROI rule so neutral calculator labels are not treated as marketing promises; high/guaranteed/assured/best ROI wording remains detectable.
- Corrected the audit schedule from daily to weekly.
- Added baseline security headers and disabled the Next.js powered-by header. A CSP is intentionally not added yet because it needs browser regression testing for the site's scripts and sharing features.
- Added a shared, MySQL-backed rate limiter to the public enquiry endpoint (5 requests/10 minutes/IP) and admin login (10 requests/15 minutes/IP). IP keys are HMAC-hashed rather than stored in plaintext.
- Added the rate-limit table to the schema and an idempotent migration at `database/migrations/2026-11-22-api-rate-limits.sql`. **Run this migration before deploying the code changes**, or the protected endpoints will fail when the table is missing.
- Clarified the contact-form notice: the enquiry is stored by Luxmi InvestCare before WhatsApp opens; the user chooses whether to send the prefilled message. The lead activity log now records the consent policy version.
- Updated the privacy notice's retention wording. A fixed retention schedule is still not published and remains an owner/legal-review item.
- Added official SEBI EoDI social-disclosure, Common Advertisement Code, and MeitY DPDP Rules sources to the regulatory watch.

## Outstanding items requiring owner or specialist review

### 1. Social-media disclosure — high priority

SEBI circular **HO/(79)2026-MIRSD-PODMMC dated 26 February 2026**, effective **1 May 2026**, requires regulated agents to disclose the principal entity's registered name and registration number followed by the agent's own registered name and registration number on profiles and at the start of relevant securities-market content. For multiple principal relationships, the profile must link to a website list of principal entities/registration details. The verified principal-AMC list is not present in the repository/site and could not be populated without confirmed empanelment data. Social profile bios and historical/current posts/videos could not be fetched for verification. Do not mark this item complete until the list is verified, published, linked from every relevant profile, and the content inventory is reviewed.

### 2. ARN holder/status verification

The official [AMFI distributor locator](https://www.amfiindia.com/locate-distributor) is interactive; this review could not confirm ARN 365140's exact registered holder name, validity, status, or social handles. Verify these manually and ensure the website and social profiles use the exact registered name, not only the trade name.

### 3. Privacy / DPDP readiness

The website collects name, mobile, optional email, and enquiry text, stores contact-form submissions in a lead database, and records a consent activity. A retention period is not fixed/published and no automated deletion process was verified. Confirm the retention schedule, database/hosting processors, access controls, request/withdrawal handling, breach-response process, and standalone notice/rights links before the DPDP Rules' phased obligations become applicable. The Gazette timeline gives 18 months from 13 November 2025 (13 May 2027) for Rules 3 and 5–16, 22 and 23.

### 4. Advertisement-code readiness

The SEBI Intermediaries Regulations amended through the Common Advertisement Code are dated through 10 October 2026; the cited amendment commences on the 180th day after Gazette publication (9 October 2026; calculated as 7 April 2027—confirm the commencement date against the Gazette before relying on it). Review the code and update approval/disclosure controls before that date.

### 5. Repository and deployment controls

- `main` is currently **unprotected** (GitHub reports `protected=false`). Require PR review, status checks, restrict direct pushes, and prevent bypass.
- Production headers could not be independently inspected from this environment. The baseline headers are now configured in Next.js but are not live until approved and deployed.
- The production website is reachable and the 13-route audit passed HTTP checks; however, the source/deployment date discrepancy must be reconciled.
- The project has no `test` script in `package.json`; lint, build, content scan, audit, and route checks are used instead.

## No merge or production deployment

All changes remain on `compliance-remediation-2026-11-22`. Production has not been changed. The PR must be reviewed, CI must pass on the updated head, and the database migration/social-media/retention blockers must be addressed before deployment.

**Status:** dependency/content/build/route remediation checks passed once; the latest lint-inclusive run is pending. External social-media, AMFI status, retention/processor review, branch protection, and deployment verification remain open. Not certified 100% compliant.

## Remediation CI evidence

Initial remediation workflow run [44939644854](https://github.com/shivpawan007/LuxmiInvestCare/actions/runs/44939644854) completed successfully on branch commit `cf2dc4f119f0df340865326407866b0151d7cd7c`:

- Production and full-tree npm audits: **0 vulnerabilities**.
- Patched lockfile versions: Next.js **16.4.6**, Zod **4.6.7**, DOMPurify **3.4.18**, ESLint **10.15.0**, `@eslint/config-array 0.23.6`, and `minimatch 11.0.9`.
- Compliance scan: **PASS**, 116 source files checked.
- Production build: **compiled successfully**.
- Live route/compliance audit: **PASS**; all required routes were HTTP 200 and the ROI false-positive finding was cleared.

Later lint-inclusive runs exposed pre-existing ESLint configuration and React-effect-state issues. The branch aligned `eslint-config-next` with Next.js 16.4.6 and corrected the remaining lint errors (including JSX apostrophe escaping and deriving admin loading state from async data). Run 44940029081 and PR run 44940440921 failed on earlier commits; the newest push run 44940650866 is pending validation of the latest branch head. No merge or deployment has occurred.

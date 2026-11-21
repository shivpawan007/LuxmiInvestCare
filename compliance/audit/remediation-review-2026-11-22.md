# Luxmi InvestCare Compliance & Security Review — 22 November 2026

**Baseline:** GitHub Actions run [44896852598](https://github.com/shivpawan007/LuxmiInvestCare/actions/runs/44896852598), audit commit `96ba16c692f05395956034569b609e541cde4b90` on `main`.

This is a technical/compliance gap review, not legal certification. It does not verify AMC contracts, actual social-media posts, AMFI status, production secrets, database operations, or external platform settings.

## Baseline evidence

- The audit workflow completed its content scan and production build, but the final compliance audit failed.
- **Public routes:** all 13 required routes returned HTTP 200 in the audit. `/calculators/sip` was flagged only by the broad `return on investment` text rule.
- **npm audit:** 6 findings in the full tree (1 low, 3 moderate, 1 high, 1 critical). Production tree had 3 (1 low, 1 high, 1 critical).
- Production lockfile versions: Next.js **16.4.0**, Zod **4.5.1**, DOMPurify **3.4.16**. Full-tree findings also included `@eslint/config-array 0.23.5`, `eslint 10.14.0`, and `minimatch 11.0.0`; fixes were available.
- Next.js was below the patched version identified by the audit; remediation targets **16.4.6**. See [Next.js security advisories](https://github.com/vercel/next.js/security/advisories).
- Production page text is behind repository text: production privacy/disclosures displayed 26 September 2026, while repository versions were dated 6 October and 20 October respectively. This suggests production is not reflecting the current `main` source.

## Changes made on this branch

- Updated Next.js and Zod minimum versions; remediation workflow refreshes the lockfile and runs `npm audit fix` without `--force`.
- Updated transitive vulnerable dependencies from audit evidence (including DOMPurify, ESLint, config-array, and minimatch).
- Narrowed the ROI rule so a neutral calculator label is not treated as a marketing promise; promotional/high/guaranteed/assured ROI wording remains detectable.
- Changed the named weekly audit schedule from daily to weekly.
- Added baseline response-security headers and disabled the Next.js powered-by header. CSP is deferred for browser regression testing.
- Added MySQL-backed rate limits: public lead submission **5 requests/10 minutes/IP** and admin login **10 requests/15 minutes/IP**, using HMAC-hashed IP keys.
- Added the rate-limit table to `database/schema.sql` and migration `database/migrations/2026-11-22-api-rate-limits.sql`. **Apply this migration before deployment**, or the endpoints will fail if the table is absent.
- Clarified the contact form notice: the enquiry is stored before WhatsApp opens, and the user chooses whether to send the prefilled message. The lead activity records the Privacy Policy version.
- Updated privacy retention wording. A fixed retention schedule remains unpublished.
- Added official SEBI social-media disclosure, Common Advertisement Code, and MeitY DPDP Rules sources to regulatory monitoring.
- Added lint corrections (JSX escaping, admin loading-state refactor, and deferred effect-triggered data loads) after the lint step exposed existing errors.

## CI verification

Initial remediation run [44939644854](https://github.com/shivpawan007/LuxmiInvestCare/actions/runs/44939644854) passed:
- Production and full-tree `npm audit`: **0 vulnerabilities**
- Compliance scan: **PASS (116 files)**
- Production build: **compiled successfully**
- Live route/compliance audit: **PASS**, all 13 required routes HTTP 200

Lint-inclusive runs exposed issues after the initial pass:
- `eslint-config-next 0.2.4` did not export `core-web-vitals`; it was aligned with Next.js **16.4.6**.
- React effect-state lint errors in the admin leads/users pages were addressed in subsequent commits.
- Earlier runs [44940029081](https://github.com/shivpawan007/LuxmiInvestCare/actions/runs/44940029081) and [44940719748](https://github.com/shivpawan007/LuxmiInvestCare/actions/runs/44940719748) failed on earlier commits. The current branch head still requires a completed lint-inclusive validation; do not merge until it passes.

## Outstanding owner/legal actions

### 1. Social-media disclosures — high priority
SEBI circular **HO/(79)2026-MIRSD-PODMMC dated 26 February 2026**, effective **1 May 2026**, requires registered-name/registration-number disclosures on profiles and at the start of relevant securities-market content. For multiple principals, profiles must link to a website list of principal entities and registration details. The verified principal-AMC list is not present in the repo/site and could not be populated without confirmed empanelment data. Social profiles and posts/videos could not be fetched for verification. Do not mark complete until the list is verified, published, linked from relevant profiles, and content is reviewed.

### 2. ARN holder/status verification
The [AMFI distributor locator](https://www.amfiindia.com/locate-distributor) is interactive; this review could not confirm ARN 365140's exact holder name, active status, validity, or official social handles. Verify these manually and use the exact registered name.

### 3. Privacy / DPDP readiness
The contact form collects name, mobile, optional email and enquiry text, stores submissions in a lead database, and records consent activity. A fixed retention period is not published and no automated deletion was verified. Confirm retention schedule, processors/hosting providers, access controls, deletion/withdrawal handling and breach response. DPDP Rules 2025 have phased commencement; Rules 3 and 5–16, 22 and 23 are scheduled 18 months after 13 November 2025 (**13 May 2027**).

### 4. Advertisement-code readiness
The Common Advertisement Code amendment is effective on the 180th day after Gazette publication. Gazette publication is reported as **9 October 2026**; calendar calculation suggests **7 April 2027**. Verify the commencement date against the Gazette. Review the code and update approval/disclosure controls before it takes effect.

### 5. Repository/deployment controls
- GitHub reports `main` **unprotected**. Require PR review, status checks, restrict direct pushes, and prevent bypass.
- Production response headers could not be independently inspected. The baseline headers are configured on this branch but are not live until approved/deployed.
- Production routes were reachable (13/13 required routes HTTP 200), but the source/deployment date discrepancy must be reconciled.
- The project has no `test` script; lint, build, content scan, audit and route checks are used instead.

## Deployment

All changes remain on `compliance-remediation-2026-11-22` and PR #17. **No merge or production deployment was performed.**

**Status:** technical remediation underway; not certified 100% compliant.

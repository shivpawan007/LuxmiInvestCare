import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOTS = ["app", "components", "lib"];
const EXTENSIONS = /\.(tsx?|jsx?|md|txt)$/i;
const STANDARD_WARNING =
  "Mutual Fund investments are subject to market risks, read all scheme related documents carefully.";

const FORBIDDEN_PATTERNS = [
  { id: "nomenclature.financial-planning", pattern: /financial\s+planning/i },
  { id: "nomenclature.financial-planner", pattern: /financial\s+planner/i },
  { id: "nomenclature.financial-adviser", pattern: /financial\s+adviser/i },
  { id: "nomenclature.financial-advisor", pattern: /financial\s+advisor/i },
  { id: "nomenclature.investment-adviser", pattern: /investment\s+adviser/i },
  { id: "nomenclature.investment-advisor", pattern: /investment\s+advisor/i },
  { id: "nomenclature.wealth-adviser", pattern: /wealth\s+adviser/i },
  { id: "nomenclature.wealth-advisor", pattern: /wealth\s+advisor/i },
  { id: "nomenclature.wealth-manager", pattern: /wealth\s+manager/i },
  { id: "promotion.assured-return", pattern: /assured\s+return/i },
  { id: "promotion.guaranteed-return", pattern: /guaranteed\s+return/i },
  { id: "promotion.multibagger", pattern: /\bmultibagger\b/i },
  { id: "promotion.portfolio-management", pattern: /portfolio\s+management/i },
  { id: "promotion.portfolio-review", pattern: /portfolio\s+review/i },
  { id: "promotion.retirement-planning", pattern: /retirement\s+planning/i },
  { id: "promotion.goal-based", pattern: /goal[-\s]+based/i },
  { id: "promotion.asset-allocation-advice", pattern: /asset\s+allocation\s+advice/i },
  { id: "promotion.wealth-creation-services", pattern: /wealth\s+creation\s+services/i },
  { id: "promotion.best-fund", pattern: /\bbest\s+(?:mutual\s+)?fund\b/i },
  { id: "promotion.top-fund", pattern: /\btop\s+(?:mutual\s+)?fund\b/i },
  { id: "promotion.highest-return", pattern: /highest\s+return/i },
  { id: "promotion.fixed-return", pattern: /fixed\s+return/i },
  { id: "promotion.risk-free-return", pattern: /risk[-\s]+free\s+return/i },
  { id: "promotion.ranking", pattern: /\branking\b/i },
  { id: "promotion.testimonial", pattern: /\btestimonials?\b/i },
  { id: "promotion.number-one", pattern: /number\s*1/i },
];

const PUBLIC_ROUTE_EXCLUSIONS = ["/admin", "/api", "/_not-found"];

// Critical public routes are always probed. Random sampling remains in addition
// to these deterministic checks so the weekly audit has both coverage modes.
const REQUIRED_PUBLIC_ROUTES = ["/", "/privacy", "/disclosures", "/services"];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (EXTENSIONS.test(entry.name)) files.push(full);
  }
  return files;
}

function relative(file) {
  return path.relative(process.cwd(), file).replaceAll(path.sep, "/");
}

function sample(items, count) {
  const copy = [...items];
  const selected = [];
  while (copy.length && selected.length < Math.min(count, copy.length)) {
    const index = crypto.randomInt(copy.length);
    selected.push(copy.splice(index, 1)[0]);
  }
  return selected;
}

function routeFromPage(file) {
  const rel = relative(file);
  if (!rel.startsWith("app/") || (!rel.endsWith("/page.tsx") && rel !== "app/page.tsx")) {
    return null;
  }

  let route = rel
    .replace(/^app/, "")
    .replace(/\/page\.tsx$/, "")
    .replace(/^$/, "/");

  route = route.replace(/\[\[[^\]]+\]\]/g, "");
  if (/\[[^\]]+\]/.test(route)) return null;
  route = route.replace(/\/+/g, "/");
  return route || "/";
}

function findViolations(content, file) {
  const findings = [];
  const regulatoryDisclosure =
    file === "app/disclosures/page.tsx" ||
    file === "app/privacy/page.tsx";

  for (const rule of FORBIDDEN_PATTERNS) {
    if (regulatoryDisclosure) continue;

    if (rule.pattern.test(content)) {
      findings.push({ severity: "high", rule: rule.id, file });
    }
  }
  return findings;
}

async function probeRoute(baseUrl, route, required = false) {
  const url = new URL(route, baseUrl).toString();
  const started = Date.now();
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "LuxmiInvestCare-ComplianceAudit/1.1" },
    });
    const html = await response.text();
    const findings = [];

    for (const rule of FORBIDDEN_PATTERNS) {
      if (rule.pattern.test(html)) {
        findings.push({ severity: "high", rule: rule.id, route });
      }
    }

    if (!response.ok) {
      findings.push({
        severity: required ? "high" : "medium",
        rule: required ? "live.required-route-not-ok" : "live.route-not-ok",
        route,
        status: response.status,
      });
    }

    return {
      route,
      required,
      status: response.status,
      ok: response.ok,
      durationMs: Date.now() - started,
      findings,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      route,
      required,
      status: null,
      ok: false,
      durationMs: Date.now() - started,
      error: message,
      findings: [{
        severity: required ? "high" : "medium",
        rule: required ? "live.required-route-unreachable" : "live.probe-unreachable",
        route,
        error: message,
      }],
    };
  }
}

const sourceFiles = ROOTS
  .flatMap((root) => walk(root))
  .filter((file) => !file.includes("node_modules"));

const allFindings = [];
const contents = new Map();

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, "utf8");
  contents.set(file, content);
  allFindings.push(...findViolations(content, relative(file)));
}

const allSource = [...contents.values()].join("\n");
const identityPresent =
  /AMFI[-\s]+[Rr]egistered\s+Mutual\s+Fund\s+Distributor/i.test(allSource);
const arnPresent = /ARN\s*[:|]?\s*365140/i.test(allSource);
const warningPresent = allSource.includes(STANDARD_WARNING);

if (!identityPresent) {
  allFindings.push({ severity: "critical", rule: "identity.mfd-designation-missing", file: "GLOBAL" });
}
if (!arnPresent) {
  allFindings.push({ severity: "critical", rule: "identity.arn-365140-missing", file: "GLOBAL" });
}
if (!warningPresent) {
  allFindings.push({ severity: "critical", rule: "risk-warning.mandatory-standard-warning-missing", file: "GLOBAL" });
}

const publicPages = sourceFiles
  .map(routeFromPage)
  .filter(Boolean)
  .filter((route) => !PUBLIC_ROUTE_EXCLUSIONS.some((prefix) =>
    route === prefix || route.startsWith(prefix + "/")
  ));

const sampledFiles = sample(sourceFiles, 8);
const sampledRoutes = sample(publicPages, 5);
const baseUrl = process.env.AUDIT_BASE_URL || "https://luxmiinvestcare.com";

let dependencyAudit = null;
const dependencyAuditPath = path.join(process.cwd(), "compliance", "audit", "npm-audit.json");

if (fs.existsSync(dependencyAuditPath)) {
  try {
    const raw = JSON.parse(fs.readFileSync(dependencyAuditPath, "utf8"));
    const counts = raw.metadata?.vulnerabilities || {};
    dependencyAudit = {
      counts,
      total: Object.values(counts).reduce((sum, value) => sum + Number(value || 0), 0),
    };

    if ((counts.critical || 0) > 0 || (counts.high || 0) > 0) {
      allFindings.push({
        severity: "critical",
        rule: "dependencies.high-or-critical-vulnerabilities",
        file: "npm-audit.json",
      });
    } else if ((counts.moderate || 0) > 0) {
      allFindings.push({
        severity: "medium",
        rule: "dependencies.moderate-vulnerabilities",
        file: "npm-audit.json",
      });
    }
  } catch (error) {
    allFindings.push({
      severity: "medium",
      rule: "dependencies.audit-report-unreadable",
      file: "npm-audit.json",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

const requiredRouteResults = [];
for (const route of REQUIRED_PUBLIC_ROUTES) {
  requiredRouteResults.push(await probeRoute(baseUrl, route, true));
}

const randomRouteResults = [];
for (const route of sampledRoutes) {
  if (!REQUIRED_PUBLIC_ROUTES.includes(route)) {
    randomRouteResults.push(await probeRoute(baseUrl, route, false));
  }
}

const routeResults = [...requiredRouteResults, ...randomRouteResults];

// Promote every live route finding into the report's global findings.
// Previously high-severity production findings could remain hidden inside
// routeResults and incorrectly leave the overall status at WARN.
for (const result of routeResults) {
  allFindings.push(...result.findings);
}

const sampledFileFindings = sampledFiles.flatMap((file) =>
  findViolations(contents.get(file) || "", relative(file))
);

const findings = [...allFindings, ...sampledFileFindings];
const uniqueFindings = Array.from(
  new Map(findings.map((finding) => [JSON.stringify(finding), finding])).values()
);

const report = {
  auditVersion: "2.1",
  auditType: "weekly-random-compliance",
  generatedAt: new Date().toISOString(),
  commit: process.env.GITHUB_SHA || null,
  branch: process.env.GITHUB_REF_NAME || null,
  baseUrl,
  sourceFilesChecked: sourceFiles.length,
  publicRoutesDiscovered: publicPages.length,
  requiredRoutes: REQUIRED_PUBLIC_ROUTES,
  randomSample: {
    sourceFiles: sampledFiles.map(relative),
    routes: sampledRoutes,
  },
  checks: {
    forbiddenPromotionalLanguage: uniqueFindings.filter((x) =>
      x.rule?.startsWith("nomenclature.") || x.rule?.startsWith("promotion.")
    ).length === 0,
    mfdIdentity: identityPresent,
    arn365140: arnPresent,
    standardRiskWarning: warningPresent,
    liveRouteProbe: routeResults.every((x) => x.ok),
    dependencyAudit: dependencyAudit
      ? ((dependencyAudit.counts.critical || dependencyAudit.counts.high)
        ? false
        : dependencyAudit.counts.moderate ? null : true)
      : null,
  },
  dependencyAudit,
  routeResults,
  findings: uniqueFindings,
  status: uniqueFindings.some((x) => x.severity === "critical" || x.severity === "high")
    ? "FAIL"
    : uniqueFindings.some((x) => x.severity === "medium")
      ? "WARN"
      : "PASS",
};

const outputPath = path.join(process.cwd(), "compliance", "audit", "latest.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n");

console.log(JSON.stringify(report, null, 2));

if (report.status === "FAIL") process.exit(1);

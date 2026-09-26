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
  { id: "promotion.ranking", pattern: /\branking\b/i },
  { id: "promotion.testimonial", pattern: /\btestimonials?\b/i },
  { id: "promotion.number-one", pattern: /number\s*1/i },
];

const PUBLIC_ROUTE_EXCLUSIONS = [
  "/admin",
  "/api",
  "/_not-found",
];

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
  if (!rel.startsWith("app/") || !rel.endsWith("/page.tsx") && rel !== "app/page.tsx") {
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
    if (
      regulatoryDisclosure &&
      rule.id.startsWith("nomenclature.")
    ) {
      continue;
    }

    if (rule.pattern.test(content)) {
      findings.push({
        severity: "high",
        rule: rule.id,
        file,
      });
    }
  }
  return findings;
}

async function probeRoute(baseUrl, route) {
  const url = new URL(route, baseUrl).toString();
  const started = Date.now();
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "user-agent": "LuxmiInvestCare-ComplianceAudit/1.0",
      },
    });
    const html = await response.text();
    const findings = [];
    for (const rule of FORBIDDEN_PATTERNS) {
      if (rule.pattern.test(html)) {
        findings.push({
          severity: "high",
          rule: rule.id,
          route,
        });
      }
    }
    return {
      route,
      status: response.status,
      ok: response.ok,
      durationMs: Date.now() - started,
      findings,
    };
  } catch (error) {
    return {
      route,
      status: null,
      ok: false,
      durationMs: Date.now() - started,
      error: error instanceof Error ? error.message : String(error),
      findings: [],
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
  allFindings.push({
    severity: "critical",
    rule: "identity.mfd-designation-missing",
    file: "GLOBAL",
  });
}

if (!arnPresent) {
  allFindings.push({
    severity: "critical",
    rule: "identity.arn-365140-missing",
    file: "GLOBAL",
  });
}

if (!warningPresent) {
  allFindings.push({
    severity: "critical",
    rule: "risk-warning.mandatory-standard-warning-missing",
    file: "GLOBAL",
  });
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
const routeResults = [];

for (const route of sampledRoutes) {
  routeResults.push(await probeRoute(baseUrl, route));
}

const liveFailures = routeResults
  .filter((result) => !result.ok)
  .map((result) => ({
    severity: "medium",
    rule: result.status === null ? "live.probe-unreachable" : "live.route-not-ok",
    route: result.route,
    status: result.status,
    error: result.error,
  }));

const sampledFileFindings = sampledFiles.flatMap((file) =>
  findViolations(contents.get(file) || "", relative(file))
);

const findings = [...allFindings, ...sampledFileFindings, ...liveFailures];
const uniqueFindings = Array.from(
  new Map(
    findings.map((finding) => [
      JSON.stringify(finding),
      finding,
    ])
  ).values()
);

const report = {
  auditVersion: "2.0",
  auditType: "weekly-random-compliance",
  generatedAt: new Date().toISOString(),
  commit: process.env.GITHUB_SHA || null,
  branch: process.env.GITHUB_REF_NAME || null,
  baseUrl,
  sourceFilesChecked: sourceFiles.length,
  publicRoutesDiscovered: publicPages.length,
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
  },
  routeResults,
  findings: uniqueFindings,
  status: uniqueFindings.some((x) => x.severity === "critical" || x.severity === "high")
    ? "FAIL"
    : uniqueFindings.some((x) => x.severity === "medium")
      ? "WARN"
      : "PASS",
};

const outputPath = path.join(
  process.cwd(),
  "compliance",
  "audit",
  "latest.json"
);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n");

console.log(JSON.stringify(report, null, 2));

if (report.status === "FAIL") process.exit(1);

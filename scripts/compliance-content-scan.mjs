import fs from "node:fs";
import path from "node:path";

const ROOTS = ["app", "components", "lib"];
const STANDARD_WARNING =
  "Mutual Fund investments are subject to market risks, read all scheme related documents carefully.";
const MFD_TAGLINE = "AMFI-registered Mutual Fund Distributor";
const ARN = "ARN: 365140";
const REQUIRED_CONFLICT_DISCLOSURE = "distribution-related remuneration";

const FORBIDDEN_PROMOTIONAL_PATTERNS = [
  /financial\s+planning/i,
  /financial\s+planner/i,
  /financial\s+adviser/i,
  /financial\s+advisor/i,
  /investment\s+adviser/i,
  /investment\s+advisor/i,
  /wealth\s+adviser/i,
  /wealth\s+advisor/i,
  /wealth\s+manager/i,
  /assured\s+return/i,
  /guaranteed\s+return/i,
  /multibagger/i,
  /portfolio\s+management/i,
  /portfolio\s+review/i,
  /retirement\s+planning/i,
  /goal[-\s]+based/i,
  /asset\s+allocation\s+advice/i,
  /wealth\s+creation\s+services/i,
  /\bbest\s+(?:mutual\s+)?fund\b/i,
  /\btop\s+(?:mutual\s+)?fund\b/i,
  /highest\s+return/i,
  /fixed\s+return/i,
  /risk[-\s]+free\s+return/i,
  /past\s+performance.*future\s+return/i,
  /customer\s+testimonial/i,
  /\btestimonials?\b/i,
  /\branking\b/i,
  /number\s*1/i,
  /return\s+on\s+investment/i,
  /plan\s+your\s+future/i,
  /grow\s+wealth/i,
  /secure\s+future/i,
  /free\s+(?:investment\s+)?advice/i,
  /free\s+portfolio\s+review/i,
  /rebate|gift[-\s]?voucher/i,
  /indicative\s+(?:portfolio|yield|return)/i,
  /assur(?:ed|ance)\s+return/i,
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (/\.(tsx?|jsx?|md|txt)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function isRegulatoryDisclosure(file) {
  const normalized = path.normalize(file);
  return (
    normalized === path.normalize("app/disclosures/page.tsx") ||
    normalized === path.normalize("app/privacy/page.tsx")
  );
}

const files = ROOTS
  .flatMap((root) => walk(root))
  .map((file) => path.normalize(file));

const violations = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");

  for (const pattern of FORBIDDEN_PROMOTIONAL_PATTERNS) {
    if (isRegulatoryDisclosure(file)) continue;

    if (pattern.test(content)) {
      violations.push({
        file,
        pattern: pattern.source,
      });
    }
  }
}

const allSource = files
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

if (!allSource.includes(MFD_TAGLINE)) {
  violations.push({ file: "GLOBAL", pattern: "Missing MFD identity tagline" });
}

if (!allSource.includes(ARN)) {
  violations.push({ file: "GLOBAL", pattern: "Missing ARN 365140" });
}

const disclosure = fs.existsSync("app/disclosures/page.tsx")
  ? fs.readFileSync("app/disclosures/page.tsx", "utf8")
  : "";

if (!disclosure.toLowerCase().includes(REQUIRED_CONFLICT_DISCLOSURE)) {
  violations.push({
    file: "app/disclosures/page.tsx",
    pattern: "Missing distribution remuneration / conflict disclosure",
  });
}

if (!allSource.includes(STANDARD_WARNING)) {
  violations.push({
    file: "GLOBAL",
    pattern: "Missing exact standard mutual fund warning",
  });
}

if (violations.length) {
  console.error("Compliance content scan FAILED:");
  for (const violation of violations) {
    console.error(
      `- ${violation.file}: ${violation.pattern}`,
    );
  }
  process.exit(1);
}

console.log(
  `Compliance content scan PASSED: ${files.length} source files checked.`,
);

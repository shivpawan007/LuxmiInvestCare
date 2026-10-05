import fs from "node:fs";
import path from "node:path";

const ROOTS = ["app", "components", "lib"];
const STANDARD_WARNING =
  "Mutual Fund investments are subject to market risks, read all scheme related documents carefully.";

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

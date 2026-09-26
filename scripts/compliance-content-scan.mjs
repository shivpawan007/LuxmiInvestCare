import fs from "node:fs";
import path from "node:path";

const ROOTS = ["app", "components", "lib"];
const EXCLUDED = new Set([
  path.normalize("app/disclosures/page.tsx"),
  path.normalize("app/privacy/page.tsx"),
]);

const FORBIDDEN_PROMOTIONAL_PATTERNS = [
  /financial\s+planning/i,
  /financial\s+planner/i,
  /financial\s+adviser/i,
  /investment\s+adviser/i,
  /wealth\s+adviser/i,
  /wealth\s+manager/i,
  /assured\s+return/i,
  /guaranteed\s+return/i,
  /past\s+performance.*future\s+return/i,
  /customer\s+testimonial/i,
  /\btestimonials?\b/i,
  /\branking\b/i,
  /number\s*1/i,
];

const STANDARD_WARNING =
  "Mutual Fund investments are subject to market risks, read all scheme related documents carefully.";

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (/\.(tsx?|jsx?|md|txt)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const files = ROOTS.flatMap((root) => walk(root))
  .map((file) => path.normalize(file))
  .filter(Boolean);

const violations = [];

function isRegulatoryDisclosure(file) {
  return (
    file === path.normalize("app/disclosures/page.tsx") ||
    file === path.normalize("app/privacy/page.tsx")
  );
}

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  for (const pattern of FORBIDDEN_PROMOTIONAL_PATTERNS) {
    if (
      isRegulatoryDisclosure(file) &&
      /financial|investment|wealth/.test(pattern.source)
    ) {
      continue;
    }
    if (pattern.test(content)) {
      violations.push({ file, pattern: pattern.source });
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
    console.error(`- ${violation.file}: ${violation.pattern}`);
  }
  process.exit(1);
}

console.log(`Compliance content scan PASSED: ${files.length} source files checked.`);

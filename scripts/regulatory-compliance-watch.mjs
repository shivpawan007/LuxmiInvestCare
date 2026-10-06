import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const CONFIG_PATH = path.join(process.cwd(), "config", "mfd-compliance-sources.json");
const STATE_PATH = path.join(process.cwd(), "compliance", "audit", "regulatory-watch.json");

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));

async function fetchSource(source) {
  const response = await fetch(source.url, {
    redirect: "follow",
    headers: {
      "user-agent": "LuxmiInvestCare-MFD-ComplianceWatch/1.0",
      accept: "text/html,application/pdf,*/*",
    },
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get("content-type") || "";
  const hash = crypto.createHash("sha256").update(buffer).digest("hex");

  return {
    ...source,
    checkedAt: new Date().toISOString(),
    finalUrl: response.url,
    status: response.status,
    ok: response.ok,
    contentType,
    bytes: buffer.length,
    sha256: hash,
  };
}

async function main() {
  const previous = fs.existsSync(STATE_PATH)
    ? JSON.parse(fs.readFileSync(STATE_PATH, "utf8"))
    : null;

  const previousById = new Map(
    (previous?.sources || []).map((source) => [source.id, source]),
  );

  const results = [];
  const changes = [];
  const failures = [];

  for (const source of config.sources) {
    try {
      const result = await fetchSource(source);
      results.push(result);

      if (!result.ok) {
        failures.push({
          id: source.id,
          rule: "regulatory-source.unreachable",
          status: result.status,
          url: source.url,
        });
        continue;
      }

      const prior = previousById.get(source.id);
      if (prior && prior.sha256 !== result.sha256) {
        changes.push({
          id: source.id,
          authority: source.authority,
          url: source.url,
          previousSha256: prior.sha256,
          currentSha256: result.sha256,
          previousCheckedAt: prior.checkedAt,
          currentCheckedAt: result.checkedAt,
        });
      }
    } catch (error) {
      failures.push({
        id: source.id,
        rule: "regulatory-source.fetch-error",
        url: source.url,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const report = {
    version: 1,
    generatedAt: new Date().toISOString(),
    purpose: "Detect changes in official SEBI/AMFI sources so MFD website rules can be reviewed before publication.",
    automaticPolicy: "A source change triggers review; the workflow must not silently rewrite compliance content or make legal interpretations.",
    sources: results,
    changes,
    failures,
    status: failures.length > 0 ? "FAIL" : changes.length > 0 ? "REVIEW_REQUIRED" : "PASS",
  };

  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
  fs.writeFileSync(STATE_PATH, JSON.stringify(report, null, 2) + "\n");

  console.log(JSON.stringify(report, null, 2));

  if (report.status !== "PASS") process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

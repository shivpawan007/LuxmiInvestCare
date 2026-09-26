import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { requireUser } from "@/lib/auth";

type AuditReport = {
  auditVersion?: string;
  auditType?: string;
  status?: "PASS" | "WARN" | "FAIL" | "PENDING";
  generatedAt?: string | null;
  commit?: string | null;
  branch?: string | null;
  message?: string;
  sourceFilesChecked?: number;
  publicRoutesDiscovered?: number;
  randomSample?: {
    sourceFiles?: string[];
    routes?: string[];
  };
  checks?: Record<string, boolean | null>;
  routeResults?: Array<{
    route: string;
    status: number | null;
    ok: boolean;
    durationMs?: number;
    error?: string;
  }>;
  findings?: Array<{
    severity: string;
    rule: string;
    file?: string;
    route?: string;
    status?: number | null;
    error?: string;
  }>;
};

export const dynamic = "force-dynamic";

async function readAudit(): Promise<AuditReport | null> {
  try {
    const file = path.join(
      process.cwd(),
      "compliance",
      "audit",
      "latest.json",
    );
    return JSON.parse(await fs.readFile(file, "utf8")) as AuditReport;
  } catch {
    return null;
  }
}

function statusClass(status?: string) {
  if (status === "PASS") return "bg-green-100 text-green-800 ring-green-200";
  if (status === "FAIL") return "bg-red-100 text-red-800 ring-red-200";
  if (status === "WARN") return "bg-amber-100 text-amber-800 ring-amber-200";
  return "bg-slate-100 text-slate-700 ring-slate-200";
}

function label(value: string) {
  return value
    .replaceAll(/([a-z])([A-Z])/g, "$1 $2")
    .replaceAll(/[-_]/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
}

export default async function ComplianceAuditPage() {
  await requireUser();
  const report = await readAudit();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              Luxmi InvestCare
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Compliance Audit
            </h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Weekly automated compliance monitoring with a full source scan,
              a random deep sample and live public-route checks.
            </p>
          </div>
          <Link
            href="/admin/dashboard"
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center font-semibold text-slate-800 hover:bg-slate-50"
          >
            Back to Dashboard
          </Link>
        </div>

        {!report ? (
          <div className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              No audit report available
            </h2>
            <p className="mt-2 text-slate-600">
              The weekly GitHub Actions audit has not produced its first
              report yet.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-5 md:grid-cols-4">
              <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Status</p>
                <span
                  className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-bold ring-1 ${statusClass(report.status)}`}
                >
                  {report.status || "PENDING"}
                </span>
              </div>
              <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Source Files</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {report.sourceFilesChecked ?? "—"}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Public Routes</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {report.publicRoutesDiscovered ?? "—"}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Findings</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {report.findings?.length ?? 0}
                </p>
              </div>
            </div>

            <section className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                Audit checks
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(report.checks || {}).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {label(key)}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${value === true
                        ? "bg-green-100 text-green-800"
                        : value === false
                          ? "bg-red-100 text-red-800"
                          : "bg-slate-100 text-slate-600"}`}
                    >
                      {value === true ? "PASS" : value === false ? "FAIL" : "PENDING"}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <h2 className="text-xl font-bold text-slate-900">
                  Random source sample
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Selected independently on each weekly run.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {(report.randomSample?.sourceFiles || []).map((file) => (
                    <li key={file} className="rounded-lg bg-slate-50 px-3 py-2">
                      {file}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <h2 className="text-xl font-bold text-slate-900">
                  Random live-route sample
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Public pages selected for live HTTP verification.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {(report.randomSample?.routes || []).map((route) => (
                    <li key={route} className="rounded-lg bg-slate-50 px-3 py-2">
                      {route}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                Audit metadata
              </h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Last run
                  </dt>
                  <dd className="mt-1 text-sm text-slate-800">
                    {report.generatedAt
                      ? new Date(report.generatedAt).toLocaleString("en-IN")
                      : "Not yet run"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Commit
                  </dt>
                  <dd className="mt-1 break-all text-sm text-slate-800">
                    {report.commit || "—"}
                  </dd>
                </div>
              </dl>
            </section>

            {!!report.findings?.length && (
              <section className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
                <h2 className="text-xl font-bold text-red-900">
                  Findings requiring review
                </h2>
                <ul className="mt-4 space-y-3">
                  {report.findings.map((finding, index) => (
                    <li
                      key={`${finding.rule}-${index}`}
                      className="rounded-xl bg-white p-4 ring-1 ring-red-100"
                    >
                      <p className="font-semibold text-red-900">
                        {finding.rule}
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {finding.file || finding.route || "Global check"}
                      </p>
                      {finding.error && (
                        <p className="mt-1 text-xs text-slate-500">
                          {finding.error}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {report.message && (
              <p className="mt-6 text-sm text-slate-500">{report.message}</p>
            )}
          </>
        )}
      </div>
    </main>
  );
}

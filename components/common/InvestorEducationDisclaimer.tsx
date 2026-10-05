import React from "react";

export default function InvestorEducationDisclaimer() {
  return (
    <aside
      aria-label="Investor education disclaimer"
      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600"
    >
      <p>
        <strong className="text-slate-800">Investor Education & Illustrative Disclaimer:</strong>{" "}
        The information and calculators on this website are provided for investor
        education and illustration purposes only. Results are hypothetical and
        depend on the assumptions entered. Actual investment outcomes may differ.
        These illustrations do not represent or assure any specific return or future
        value. Mutual Fund investments are subject to market risks. Read all scheme
        related documents carefully before investing.
      </p>
    </aside>
  );
}

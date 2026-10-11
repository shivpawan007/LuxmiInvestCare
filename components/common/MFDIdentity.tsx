import React from "react";

export default function MFDIdentity({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "text-xs leading-5 text-slate-600" : "text-sm leading-6 text-slate-700"}>
      <strong className="text-slate-900">Luxmi InvestCare</strong>
      <span className="mx-2">•</span>
      <strong className="text-green-700">AMFI-Registered Mutual Fund Distributor</strong>
      <span className="mx-2">•</span>
      <span>ARN: 365140</span>
    </div>
  );
}

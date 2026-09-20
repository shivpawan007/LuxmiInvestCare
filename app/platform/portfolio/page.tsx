const cards = [
  ["Total value", "₹ 0.00"],
  ["Invested", "₹ 0.00"],
  ["Unrealised P&L", "₹ 0.00"],
  ["Day P&L", "₹ 0.00"],
];

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">Portfolio</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Portfolio overview</h1>
        <p className="mt-2 text-sm text-slate-400">Account and holdings integration is intentionally disabled in this foundation stage.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => (
          <article key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-3 text-2xl font-bold text-white">{value}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-10 text-center">
        <h2 className="text-lg font-semibold text-white">No portfolio connected</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
          Broker authentication, holdings import, reconciliation, and portfolio persistence will be implemented only after the relevant integration and UAT gates.
        </p>
      </div>
    </div>
  );
}

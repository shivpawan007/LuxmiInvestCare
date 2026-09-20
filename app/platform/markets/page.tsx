const instruments = [
  ["NIFTY 50", "25,120.40", "+0.42%"],
  ["SENSEX", "82,410.12", "+0.36%"],
  ["BANKNIFTY", "57,840.20", "+0.31%"],
  ["RELIANCE", "1,482.60", "-0.18%"],
  ["TCS", "3,214.80", "+0.67%"],
  ["HDFCBANK", "1,012.30", "+0.22%"],
];

export default function MarketsPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">Markets</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Market workspace</h1>
        <p className="mt-2 text-sm text-slate-400">
          UI foundation only. Live exchange data will be connected through a controlled market-data adapter after vendor approval.
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="grid grid-cols-3 border-b border-slate-800 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>Instrument</span><span className="text-right">Last</span><span className="text-right">Change</span>
        </div>
        {instruments.map(([name, value, change]) => (
          <div key={name} className="grid grid-cols-3 border-b border-slate-800 px-5 py-4 text-sm last:border-0">
            <span className="font-semibold text-slate-200">{name}</span>
            <span className="text-right text-slate-300">{value}</span>
            <span className={change.startsWith("-") ? "text-right text-red-400" : "text-right text-green-400"}>{change}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

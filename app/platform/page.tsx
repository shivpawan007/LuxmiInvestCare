const watchlist = [
  { symbol: "NIFTY 50", value: "25,120.40", change: "+0.42%" },
  { symbol: "BANKNIFTY", value: "57,840.20", change: "+0.31%" },
  { symbol: "RELIANCE", value: "1,482.60", change: "-0.18%" },
  { symbol: "TCS", value: "3,214.80", change: "+0.67%" },
];

const actions = [
  ["Watchlist", "/platform/watchlist"],
  ["Markets", "/platform/markets"],
  ["Portfolio", "/platform/portfolio"],
  ["Paper Trading", "/platform/paper-trading"],
];

export default function PlatformDashboard() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:py-10">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
              Investor Mode
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your investment dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              V2 foundation is running in demo/UAT mode. No live broker,
              exchange, or order-execution connection is enabled.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {actions.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-800"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Portfolio Value", "₹ 0.00", "No account connected"],
          ["Today's Change", "₹ 0.00", "Demo state"],
          ["Invested Value", "₹ 0.00", "No positions imported"],
          ["Available Balance", "₹ 0.00", "Execution disabled"],
        ].map(([label, value, note]) => (
          <article key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="mt-3 text-2xl font-bold text-white">{value}</p>
            <p className="mt-2 text-xs text-slate-500">{note}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
            <div>
              <h2 className="font-semibold text-white">Market snapshot</h2>
              <p className="text-xs text-slate-500">Illustrative UI data only</p>
            </div>
            <a href="/platform/markets" className="text-xs font-semibold text-green-400 hover:text-green-300">
              View markets
            </a>
          </div>
          <div className="divide-y divide-slate-800">
            {watchlist.map((item) => (
              <div key={item.symbol} className="grid grid-cols-3 items-center px-5 py-4 text-sm">
                <span className="font-semibold text-slate-200">{item.symbol}</span>
                <span className="text-right text-slate-300">{item.value}</span>
                <span className="text-right text-green-400">{item.change}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Platform status
          </p>
          <div className="mt-5 space-y-4">
            {[
              ["Investor dashboard", "Ready"],
              ["Watchlist UI", "Ready"],
              ["Market data adapter", "Not connected"],
              ["Broker adapter", "Disabled"],
              ["Live order execution", "Disabled"],
            ].map(([label, status]) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-300">{label}</span>
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-400">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

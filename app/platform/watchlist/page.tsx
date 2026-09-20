const lists = [
  { name: "My Watchlist", items: ["NIFTY 50", "BANKNIFTY", "RELIANCE", "TCS"] },
  { name: "Long Term", items: ["HDFCBANK", "INFY", "ITC"] },
];

export default function WatchlistPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">Watchlist</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Track instruments</h1>
        <p className="mt-2 text-sm text-slate-400">Create, organize, and monitor instruments. Persistence and live quotes come in later stages.</p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {lists.map((list) => (
          <article key={list.name} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-white">{list.name}</h2>
              <span className="text-xs text-slate-500">{list.items.length} instruments</span>
            </div>
            <div className="mt-4 space-y-2">
              {list.items.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3">
                  <span className="text-sm font-medium text-slate-200">{item}</span>
                  <span className="text-xs text-slate-500">Quote pending</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

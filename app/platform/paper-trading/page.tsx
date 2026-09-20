export default function PaperTradingPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Paper Trading</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Simulation workspace</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
          This workspace is for simulated orders only. It does not place orders with a broker or exchange.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="font-semibold text-white">Order ticket</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-slate-400">Instrument
              <input disabled placeholder="e.g. NIFTY 50" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 outline-none" />
            </label>
            <label className="text-sm text-slate-400">Quantity
              <input disabled placeholder="0" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 outline-none" />
            </label>
            <label className="text-sm text-slate-400 sm:col-span-2">Order type
              <select disabled className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-500">
                <option>Market</option>
                <option>Limit</option>
              </select>
            </label>
          </div>
          <button disabled className="mt-5 w-full rounded-lg bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-500">
            Simulation engine — coming next
          </button>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="font-semibold text-white">Safety gates</h2>
          <div className="mt-5 space-y-3">
            {["Live broker credentials: not configured","Live order routing: disabled","Market data: demo state","Audit trail: planned","Risk controls: planned"].map((item) => (
              <div key={item} className="rounded-lg bg-slate-950 px-4 py-3 text-sm text-slate-400">{item}</div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

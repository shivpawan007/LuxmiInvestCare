"use client";

import { useMemo, useState } from "react";
import { calculateSWP } from "@/lib/swp";

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export default function SWPCalculator() {
  const [initialCorpus, setInitialCorpus] = useState(1000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(25000);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [years, setYears] = useState(20);

  const result = useMemo(
    () =>
      calculateSWP(
        initialCorpus,
        monthlyWithdrawal,
        annualReturn,
        years
      ),
    [initialCorpus, monthlyWithdrawal, annualReturn, years]
  );

  const maxCorpus =
    result.projections.length > 0
      ? Math.max(
          ...result.projections.map(
            (projection) => projection.estimatedValue
          ),
          initialCorpus
        )
      : initialCorpus;

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="container-custom py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold tracking-wide text-emerald-700">
              SWP CALCULATOR
            </span>

            <h1 className="section-title mt-5">
              Plan Your Withdrawals with a{" "}
              <span className="text-emerald-700">
                Systematic Withdrawal Plan
              </span>
            </h1>

            <p className="section-subtitle mx-auto mt-4 max-w-2xl">
              Estimate how regular withdrawals may affect your investment
              corpus over time using illustrative return assumptions.
            </p>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="bg-white pb-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            {/* INPUTS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
                  Withdrawal Inputs
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Plan Your SWP
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Adjust the assumptions below to see an illustrative
                  withdrawal projection.
                </p>
              </div>

              {/* Corpus */}
              <div className="mb-8">
                <label className="mb-3 block text-sm font-semibold text-slate-800">
                  Initial Investment / Corpus
                </label>

                <input
                  type="range"
                  min={100000}
                  max={10000000}
                  step={50000}
                  value={initialCorpus}
                  onChange={(event) =>
                    setInitialCorpus(Number(event.target.value))
                  }
                  className="w-full accent-emerald-700"
                />

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    ₹1 Lakh
                  </span>

                  <span className="text-lg font-bold text-emerald-700">
                    {formatINR(initialCorpus)}
                  </span>

                  <span className="text-xs text-slate-500">
                    ₹1 Crore
                  </span>
                </div>
              </div>

              {/* Withdrawal */}
              <div className="mb-8">
                <label className="mb-3 block text-sm font-semibold text-slate-800">
                  Monthly Withdrawal
                </label>

                <input
                  type="range"
                  min={1000}
                  max={200000}
                  step={1000}
                  value={monthlyWithdrawal}
                  onChange={(event) =>
                    setMonthlyWithdrawal(Number(event.target.value))
                  }
                  className="w-full accent-emerald-700"
                />

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    ₹1,000
                  </span>

                  <span className="text-lg font-bold text-emerald-700">
                    {formatINR(monthlyWithdrawal)}
                  </span>

                  <span className="text-xs text-slate-500">
                    ₹2 Lakh
                  </span>
                </div>
              </div>

              {/* Return */}
              <div className="mb-8">
                <label className="mb-3 block text-sm font-semibold text-slate-800">
                  Expected Annual Return
                </label>

                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.5}
                  value={annualReturn}
                  onChange={(event) =>
                    setAnnualReturn(Number(event.target.value))
                  }
                  className="w-full accent-emerald-700"
                />

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500">1%</span>

                  <span className="text-lg font-bold text-emerald-700">
                    {annualReturn}%
                  </span>

                  <span className="text-xs text-slate-500">20%</span>
                </div>
              </div>

              {/* Years */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-800">
                  Withdrawal Period
                </label>

                <input
                  type="range"
                  min={1}
                  max={40}
                  step={1}
                  value={years}
                  onChange={(event) =>
                    setYears(Number(event.target.value))
                  }
                  className="w-full accent-emerald-700"
                />

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    1 Year
                  </span>

                  <span className="text-lg font-bold text-emerald-700">
                    {years} Years
                  </span>

                  <span className="text-xs text-slate-500">
                    40 Years
                  </span>
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">
                    Remaining Corpus
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-700">
                    {formatINR(result.estimatedValue)}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">
                    Total Withdrawn
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {formatINR(result.totalWithdrawn)}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">
                    Net Wealth Gain
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-700">
                    {formatINR(result.wealthGain)}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div
                className={`mt-5 rounded-2xl p-6 text-white shadow-sm ${
                  result.sustainable
                    ? "bg-emerald-950"
                    : "bg-slate-800"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
                  SWP Projection
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {result.sustainable
                    ? "Corpus remains at the end of the selected period"
                    : "Corpus may be exhausted during the selected period"}
                </h2>

                <p className="mt-3 text-sm leading-6 text-emerald-50/80">
                  This is an illustrative projection based on the
                  assumptions entered above. Actual investment returns
                  can vary.
                </p>
              </div>

              {/* Yearly Projection */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  Estimated Corpus Over Time
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Illustrative year-wise projection after withdrawals.
                </p>

                <div className="mt-7 space-y-4">
                  {result.projections.map((projection) => {
                    const percentage =
                      maxCorpus > 0
                        ? (projection.estimatedValue / maxCorpus) * 100
                        : 0;

                    return (
                      <div key={projection.year}>
                        <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                          <span className="font-semibold text-slate-600">
                            Year {projection.year}
                          </span>

                          <span className="font-bold text-slate-900">
                            {formatINR(
                              projection.estimatedValue
                            )}
                          </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-700 to-emerald-400 transition-all duration-300"
                            style={{
                              width: `${Math.max(
                                percentage,
                                projection.estimatedValue > 0
                                  ? 2
                                  : 0
                              )}%`,
                            }}
                          />
                        </div>

                        <div className="mt-1 text-xs text-slate-500">
                          Withdrawn this year:{" "}
                          {formatINR(
                            projection.annualWithdrawal
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* EDUCATIONAL NOTE */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Understanding SWP
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
              A Systematic Withdrawal Plan allows an investor to withdraw
              a predetermined amount from an investment at regular
              intervals. The remaining corpus continues to be exposed to
              market-linked returns, subject to the underlying investment
              and market conditions.
            </p>

            <p className="mt-4 text-xs leading-6 text-slate-500">
              The calculations shown are illustrative estimates based on
              the assumptions entered. Mutual fund investments are subject
              to market risks. Actual returns may differ from the
              assumptions used in this calculator. This calculator is for
              educational purposes only and should not be considered
              investment advice.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 p-6 text-white shadow-lg md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Planning a regular income strategy?
                </h2>

                <p className="mt-2 max-w-2xl text-sm text-emerald-100/80">
                  Use this calculator as an educational starting point
                  and consider your goals, risk profile and investment
                  horizon before investing.
                </p>
              </div>

              <a
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-400 px-5 py-3 font-semibold text-emerald-950 transition hover:bg-amber-300"
              >
                Talk to Luxmi InvestCare
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useMemo, useState } from "react";

interface Projection {
  year: number;
  monthlySIP: number;
  annualInvestment: number;
  totalInvested: number;
  estimatedValue: number;
}

interface StepUpResult {
  totalInvested: number;
  estimatedValue: number;
  wealthGain: number;
  finalMonthlySIP: number;
  projections: Projection[];
}

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/**
 * Step-Up SIP calculation
 *
 * The SIP amount increases once every year by the selected
 * annual step-up percentage.
 *
 * Returns are calculated monthly using the assumed annual
 * return divided by 12.
 */
function calculateStepUpSIP(
  startingMonthlySIP: number,
  annualStepUp: number,
  annualReturn: number,
  years: number
): StepUpResult {
  const monthlyRate = annualReturn / 12 / 100;

  let corpus = 0;
  let totalInvested = 0;

  const projections: Projection[] = [];

  for (let year = 1; year <= years; year++) {
    const monthlySIP =
      startingMonthlySIP * Math.pow(1 + annualStepUp / 100, year - 1);

    const annualInvestment = monthlySIP * 12;

    for (let month = 1; month <= 12; month++) {
      corpus = corpus * (1 + monthlyRate) + monthlySIP;
      totalInvested += monthlySIP;
    }

    projections.push({
      year,
      monthlySIP,
      annualInvestment,
      totalInvested,
      estimatedValue: corpus,
    });
  }

  const finalMonthlySIP =
    startingMonthlySIP *
    Math.pow(1 + annualStepUp / 100, Math.max(years - 1, 0));

  return {
    totalInvested,
    estimatedValue: corpus,
    wealthGain: Math.max(corpus - totalInvested, 0),
    finalMonthlySIP,
    projections,
  };
}

export default function StepUpSIPCalculator() {
  const [startingMonthlySIP, setStartingMonthlySIP] = useState(5000);
  const [annualStepUp, setAnnualStepUp] = useState(10);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(20);

  const result = useMemo(
    () =>
      calculateStepUpSIP(
        startingMonthlySIP,
        annualStepUp,
        annualReturn,
        years
      ),
    [startingMonthlySIP, annualStepUp, annualReturn, years]
  );

  const maxChartValue =
    result.projections.length > 0
      ? Math.max(...result.projections.map((item) => item.estimatedValue))
      : 1;

  return (
    <main>
      <section className="section bg-white">
        <div className="container-custom">

          {/* HERO */}
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <span className="inline-flex rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">
              STEP-UP SIP CALCULATOR
            </span>

            <h1 className="section-title mt-6">
              Grow Your SIP as Your{" "}
              <span className="block text-emerald-700">
                Income Grows
              </span>
            </h1>

            <p className="section-subtitle mx-auto">
              Estimate how increasing your SIP contribution every year may
              affect your long-term investment corpus.
            </p>
          </div>

          {/* MAIN CALCULATOR */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">

            {/* INPUTS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                  Investment Inputs
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Plan Your Step-Up SIP
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Adjust the assumptions below to see an illustrative
                  year-wise projection.
                </p>
              </div>

              {/* STARTING SIP */}
              <div className="mb-8">
                <label
                  htmlFor="starting-sip"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Starting Monthly SIP
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-emerald-700">
                    ₹
                  </span>

                  <input
                    id="starting-sip"
                    type="number"
                    min="500"
                    max="1000000"
                    step="500"
                    value={startingMonthlySIP}
                    onChange={(e) =>
                      setStartingMonthlySIP(
                        Math.min(
                          1000000,
                          Math.max(500, Number(e.target.value) || 500)
                        )
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-9 text-lg font-semibold text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={Math.min(startingMonthlySIP, 100000)}
                  onChange={(e) =>
                    setStartingMonthlySIP(Number(e.target.value))
                  }
                  className="mt-3 w-full accent-emerald-700"
                />

                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>₹500</span>
                  <span>₹1,00,000</span>
                </div>

                <p className="mt-2 text-sm font-semibold text-emerald-700">
                  {formatINR(startingMonthlySIP)} per month
                </p>
              </div>

              {/* STEP-UP */}
              <div className="mb-8">
                <label
                  htmlFor="step-up"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Annual Step-Up
                </label>

                <div className="relative">
                  <input
                    id="step-up"
                    type="number"
                    min="0"
                    max="50"
                    step="1"
                    value={annualStepUp}
                    onChange={(e) =>
                      setAnnualStepUp(
                        Math.min(
                          50,
                          Math.max(0, Number(e.target.value) || 0)
                        )
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-lg font-semibold text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                    %
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={Math.min(annualStepUp, 30)}
                  onChange={(e) =>
                    setAnnualStepUp(Number(e.target.value))
                  }
                  className="mt-3 w-full accent-emerald-700"
                />

                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>0%</span>
                  <span>30%</span>
                </div>

                <p className="mt-2 text-sm font-semibold text-emerald-700">
                  SIP increases by {annualStepUp}% every year
                </p>
              </div>

              {/* RETURN */}
              <div className="mb-8">
                <label
                  htmlFor="annual-return"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Expected Annual Return
                </label>

                <div className="relative">
                  <input
                    id="annual-return"
                    type="number"
                    min="1"
                    max="30"
                    step="0.5"
                    value={annualReturn}
                    onChange={(e) =>
                      setAnnualReturn(
                        Math.min(
                          30,
                          Math.max(1, Number(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-lg font-semibold text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                    %
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={Math.min(annualReturn, 20)}
                  onChange={(e) =>
                    setAnnualReturn(Number(e.target.value))
                  }
                  className="mt-3 w-full accent-emerald-700"
                />

                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>1%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* YEARS */}
              <div>
                <label
                  htmlFor="investment-years"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Investment Period
                </label>

                <div className="relative">
                  <input
                    id="investment-years"
                    type="number"
                    min="1"
                    max="40"
                    step="1"
                    value={years}
                    onChange={(e) =>
                      setYears(
                        Math.min(
                          40,
                          Math.max(1, Number(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-16 text-lg font-semibold text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                    Years
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="mt-3 w-full accent-emerald-700"
                />

                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>1 Year</span>
                  <span>40 Years</span>
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="space-y-6">

              <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">
                    Estimated Future Value
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-800">
                    {formatINR(result.estimatedValue)}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">
                    Total Invested
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {formatINR(result.totalInvested)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">
                    Estimated Wealth Gain
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-700">
                    {formatINR(result.wealthGain)}
                  </p>
                </div>

              </div>

              {/* SUMMARY */}
              <div className="rounded-2xl bg-emerald-950 p-6 text-white shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-sm text-emerald-200">
                      Monthly SIP in the final investment year
                    </p>

                    <p className="mt-1 text-3xl font-bold text-amber-300">
                      {formatINR(result.finalMonthlySIP)}
                    </p>
                  </div>

                  <div className="max-w-md text-sm leading-6 text-emerald-50/80">
                    A step-up strategy increases your contribution gradually
                    rather than requiring the higher SIP amount from the
                    beginning.
                  </div>

                </div>
              </div>

              {/* CORPUS GROWTH */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Estimated Corpus Growth
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Illustrative year-wise projection based on the assumptions
                    entered above.
                  </p>
                </div>

                <div className="space-y-3">
                  {result.projections.map((item) => {
                    const width =
                      maxChartValue > 0
                        ? (item.estimatedValue / maxChartValue) * 100
                        : 0;

                    return (
                      <div
                        key={item.year}
                        className="grid grid-cols-[52px_1fr_auto] items-center gap-3"
                      >
                        <span className="text-sm font-medium text-slate-500">
                          Y{item.year}
                        </span>

                        <div className="h-7 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-800 to-emerald-500 transition-all duration-300"
                            style={{
                              width: `${Math.max(width, 2)}%`,
                            }}
                          />
                        </div>

                        <span className="min-w-[100px] text-right text-sm font-semibold text-slate-700">
                          {formatINR(item.estimatedValue)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* YEAR-WISE TABLE */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Year-wise Projection
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    See how the SIP contribution and estimated corpus may
                    progress over time.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">

                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-5 py-4">Year</th>
                        <th className="px-5 py-4">Monthly SIP</th>
                        <th className="px-5 py-4">Annual Investment</th>
                        <th className="px-5 py-4">Total Invested</th>
                        <th className="px-5 py-4">Estimated Value</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {result.projections.map((item) => (
                        <tr
                          key={item.year}
                          className="transition hover:bg-emerald-50/40"
                        >
                          <td className="px-5 py-4 font-semibold text-slate-900">
                            {item.year}
                          </td>

                          <td className="px-5 py-4 text-slate-700">
                            {formatINR(item.monthlySIP)}
                          </td>

                          <td className="px-5 py-4 text-slate-700">
                            {formatINR(item.annualInvestment)}
                          </td>

                          <td className="px-5 py-4 text-slate-700">
                            {formatINR(item.totalInvested)}
                          </td>

                          <td className="px-5 py-4 font-semibold text-emerald-800">
                            {formatINR(item.estimatedValue)}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </div>

              {/* EDUCATIONAL NOTE */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">

                <h2 className="font-bold text-slate-900">
                  Learn something new every day
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  A Step-Up SIP allows an investor to increase the SIP
                  contribution periodically. If income increases over time,
                  gradually increasing the investment amount may help align
                  savings with changing financial capacity.
                </p>

                <p className="mt-3 text-xs leading-5 text-slate-600">
                  The calculations shown are illustrative estimates based on
                  the assumptions entered. Mutual fund investments are subject
                  to market risks. Past performance does not indicate future
                  performance. Actual returns may differ from the assumptions
                  used in this calculator.
                </p>

              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-emerald-900/10 bg-gradient-to-r from-emerald-950 to-emerald-800 p-6 text-white shadow-sm">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <h2 className="text-xl font-bold">
                      Planning a long-term investment goal?
                    </h2>

                    <p className="mt-1 text-sm text-emerald-50/80">
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
          </div>
        </div>
      </section>
    </main>
  );
}

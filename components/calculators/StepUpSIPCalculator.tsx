"use client";

import { useMemo, useState } from "react";
import { Share2 } from "lucide-react";

import CalculatorInput from "./CalculatorInput";
import DownloadReport from "./DownloadReport";
import ReportShareDialog from "./sharing/ReportShareDialog";
import ConnectWithLuxmi from "./sharing/ConnectWithLuxmi";

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
  years: number,
): StepUpResult {
  const monthlyRate = annualReturn / 12 / 100;

  let corpus = 0;
  let totalInvested = 0;

  const projections: Projection[] = [];

  for (let year = 1; year <= years; year++) {
    const monthlySIP =
      startingMonthlySIP *
      Math.pow(
        1 + annualStepUp / 100,
        year - 1,
      );

    const annualInvestment =
      monthlySIP * 12;

    for (
      let month = 1;
      month <= 12;
      month++
    ) {
      corpus =
        corpus * (1 + monthlyRate) +
        monthlySIP;

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
    Math.pow(
      1 + annualStepUp / 100,
      Math.max(years - 1, 0),
    );

  return {
    totalInvested,
    estimatedValue: corpus,
    wealthGain: Math.max(
      corpus - totalInvested,
      0,
    ),
    finalMonthlySIP,
    projections,
  };
}

export default function StepUpSIPCalculator() {
  const [startingMonthlySIP, setStartingMonthlySIP] =
    useState(5000);

  const [annualStepUp, setAnnualStepUp] =
    useState(10);

  const [annualReturn, setAnnualReturn] =
    useState(12);

  const [years, setYears] =
    useState(20);

  const [shareOpen, setShareOpen] =
    useState(false);

  const result = useMemo(
    () =>
      calculateStepUpSIP(
        startingMonthlySIP,
        annualStepUp,
        annualReturn,
        years,
      ),
    [
      startingMonthlySIP,
      annualStepUp,
      annualReturn,
      years,
    ],
  );

  const maxChartValue =
    result.projections.length > 0
      ? Math.max(
        ...result.projections.map(
          (item) =>
            item.estimatedValue,
        ),
      )
      : 1;

  return (
    <main>
      <section className="section bg-white">
        <div className="container-custom">

          {/* ==================================================
              HERO
          ================================================== */}
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
              Estimate how increasing your SIP
              contribution every year may affect
              your long-term investment corpus.
            </p>
          </div>

          {/* ==================================================
              MAIN CALCULATOR
          ================================================== */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">

            {/* ==================================================
                INPUTS
            ================================================== */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                  Investment Inputs
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Plan Your Step-Up SIP
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Adjust the assumptions below to
                  see an illustrative year-wise
                  projection.
                </p>
              </div>

              {/* ==================================================
                  STARTING MONTHLY SIP
              ================================================== */}
              <div className="mb-8">
                <CalculatorInput
                  label="Starting Monthly SIP"
                  value={startingMonthlySIP}
                  min={500}
                  max={100000}
                  step={500}
                  maxCap={10000000}
                  expansionStep={50000}
                  allowDynamicRange
                  prefix="₹"
                  onChange={setStartingMonthlySIP}
                  formatValue={(value) =>
                    Math.round(value).toLocaleString(
                      "en-IN",
                    )
                  }
                />

                <p className="mt-2 text-sm font-semibold text-emerald-700">
                  {formatINR(
                    startingMonthlySIP,
                  )}{" "}
                  per month
                </p>
              </div>

              {/* ==================================================
                  ANNUAL STEP-UP
              ================================================== */}
              <div className="mb-8">
                <CalculatorInput
                  label="Annual Step-Up"
                  value={annualStepUp}
                  min={0}
                  max={50}
                  step={1}
                  maxCap={100}
                  expansionStep={5}
                  allowDynamicRange
                  suffix="%"
                  onChange={setAnnualStepUp}
                  formatValue={(value) =>
                    String(value)
                  }
                />

                <p className="mt-2 text-sm font-semibold text-emerald-700">
                  SIP increases by{" "}
                  {annualStepUp}%
                  every year
                </p>
              </div>

              {/* ==================================================
                  EXPECTED ANNUAL RETURN
              ================================================== */}
              <div className="mb-8">
                <CalculatorInput
                  label="Expected Annual Return"
                  value={annualReturn}
                  min={1}
                  max={20}
                  step={0.5}
                  maxCap={30}
                  expansionStep={2.5}
                  allowDynamicRange
                  suffix="%"
                  onChange={setAnnualReturn}
                  formatValue={(value) =>
                    String(value)
                  }
                />
              </div>

              {/* ==================================================
                  INVESTMENT PERIOD
              ================================================== */}
              <div>
                <CalculatorInput
                  label="Investment Period"
                  value={years}
                  min={1}
                  max={40}
                  step={1}
                  maxCap={60}
                  expansionStep={10}
                  allowDynamicRange
                  suffix={
                    years === 1
                      ? " Year"
                      : " Years"
                  }
                  onChange={setYears}
                  formatValue={(value) =>
                    String(value)
                  }
                />
              </div>
            </div>

            {/* ==================================================
                RESULTS
            ================================================== */}
            <div className="space-y-6">

              {/* SUMMARY CARDS */}
              <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">
                    Projected Value
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-800">
                    {formatINR(
                      result.estimatedValue,
                    )}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">
                    Total Invested
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {formatINR(
                      result.totalInvested,
                    )}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">
                    Illustrative Gain
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-700">
                    {formatINR(
                      result.wealthGain,
                    )}
                  </p>
                </div>
              </div>

              {/* FINAL SIP SUMMARY */}
              <div className="rounded-2xl bg-emerald-950 p-6 text-white shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-sm text-emerald-200">
                      Monthly SIP in the final investment year
                    </p>

                    <p className="mt-1 text-3xl font-bold text-amber-300">
                      {formatINR(
                        result.finalMonthlySIP,
                      )}
                    </p>
                  </div>

                  <div className="max-w-md text-sm leading-6 text-emerald-50/80">
                    A step-up approach increases the
                    SIP contribution gradually rather
                    than requiring the higher SIP amount
                    from the beginning.
                  </div>

                </div>
              </div>

              {/* ==================================================
                  CORPUS GROWTH
              ================================================== */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Estimated Corpus Growth
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Illustrative year-wise projection
                    based on the assumptions entered above.
                  </p>
                </div>

                <div className="space-y-4">
                  {result.projections.map(
                    (item) => {
                      const percentage =
                        maxChartValue > 0
                          ? (item.estimatedValue /
                            maxChartValue) *
                          100
                          : 0;

                      return (
                        <div
                          key={item.year}
                        >
                          <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                            <span className="font-semibold text-slate-600">
                              Y{item.year}
                            </span>

                            <span className="font-bold text-slate-900">
                              {formatINR(
                                item.estimatedValue,
                              )}
                            </span>
                          </div>

                          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-emerald-700 to-emerald-400 transition-all duration-300"
                              style={{
                                width: `${Math.max(
                                  percentage,
                                  item.estimatedValue >
                                    0
                                    ? 2
                                    : 0,
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {/* ==================================================
                  YEAR-WISE TABLE
              ================================================== */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Year-wise Step-Up SIP Projection
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Illustrative contribution and corpus
                    projection for the selected period.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">

                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-5 py-4">
                          Year
                        </th>

                        <th className="px-5 py-4">
                          Monthly SIP
                        </th>

                        <th className="px-5 py-4">
                          Annual Investment
                        </th>

                        <th className="px-5 py-4">
                          Total Invested
                        </th>

                        <th className="px-5 py-4">
                          Projected Value
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {result.projections.map(
                        (item) => (
                          <tr
                            key={item.year}
                            className="transition hover:bg-emerald-50/40"
                          >
                            <td className="px-5 py-4 font-semibold text-slate-900">
                              {item.year}
                            </td>

                            <td className="px-5 py-4 text-slate-700">
                              {formatINR(
                                item.monthlySIP,
                              )}
                            </td>

                            <td className="px-5 py-4 text-slate-700">
                              {formatINR(
                                item.annualInvestment,
                              )}
                            </td>

                            <td className="px-5 py-4 text-slate-700">
                              {formatINR(
                                item.totalInvested,
                              )}
                            </td>

                            <td className="px-5 py-4 font-semibold text-emerald-800">
                              {formatINR(
                                item.estimatedValue,
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              REPORT ACTIONS
          ================================================== */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <DownloadReport
              calculatorType="step-up-sip"
              investment={
                startingMonthlySIP
              }
              annualReturn={
                annualReturn
              }
              years={years}
              investedAmount={
                result.totalInvested
              }
              estimatedReturns={
                result.wealthGain
              }
              maturityValue={
                result.estimatedValue
              }
              yearlyGrowth={
                result.projections
              }
              stepUpData={{
                startingMonthlySIP,
                annualStepUp,
                annualReturn,
                years,
                totalInvested:
                  result.totalInvested,
                estimatedValue:
                  result.estimatedValue,
                wealthGain:
                  result.wealthGain,
                finalMonthlySIP:
                  result.finalMonthlySIP,
                projections:
                  result.projections,
              }}
              reportTitle="Step-Up SIP Projection Report"
              fileName="Luxmi-InvestCare-Step-Up-SIP-Projection-Report.pdf"
            />

            <button
              type="button"
              onClick={() =>
                setShareOpen(true)
              }
              className="flex items-center gap-2 rounded-lg border border-green-700 bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50"
            >
              <Share2 className="h-5 w-5" />
              Share Report
            </button>
          </div>

          {/* ==================================================
              SHARE REPORT
          ================================================== */}
          <ReportShareDialog
            open={shareOpen}
            onClose={() =>
              setShareOpen(false)
            }
            calculatorType="step-up-sip"
            reportTitle="Step-Up SIP Projection Report"
            investment={
              startingMonthlySIP
            }
            years={years}
            annualReturn={
              annualReturn
            }
            estimatedReturns={
              result.wealthGain
            }
            maturityValue={
              result.estimatedValue
            }
          />

          {/* ==================================================
              CONNECT WITH LUXMI
          ================================================== */}
          <ConnectWithLuxmi
            calculatorType="step-up-sip"
            reportTitle="Step-Up SIP Projection Report"
            investment={
              startingMonthlySIP
            }
            years={years}
            annualReturn={
              annualReturn
            }
            estimatedReturns={
              result.wealthGain
            }
            maturityValue={
              result.estimatedValue
            }
          />

          {/* ==================================================
              EDUCATIONAL NOTE
          ================================================== */}
          <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">

            <h2 className="font-bold text-slate-900">
              Learn something new every day
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-700">
              A Step-Up SIP allows an investor to
              increase the SIP contribution
              periodically. Gradually increasing
              the contribution may help align
              investments with changing financial
              capacity.
            </p>

            <p className="mt-3 text-xs leading-5 text-slate-600">
              The calculations shown are illustrative
              estimates based on the assumptions entered.
              Mutual fund investments are subject to
              market risks. Past performance does not
              indicate future performance. Actual returns
              may differ from the assumptions used in this
              calculator.
            </p>

          </div>

          {/* ==================================================
              CTA
          ================================================== */}
          <div className="mt-6 rounded-2xl border border-emerald-900/10 bg-gradient-to-r from-emerald-950 to-emerald-800 p-6 text-white shadow-sm">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Need help understanding this illustration?
                </h2>

                <p className="mt-1 text-sm text-emerald-50/80">
                  Use the calculator for investor education
                  and connect with Luxmi InvestCare for
                  information about available investment
                  products.
                </p>
              </div>

              <a
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-400 px-5 py-3 font-semibold text-emerald-950 transition hover:bg-amber-300"
              >
                Connect With Luxmi InvestCare
              </a>

            </div>
          </div>

          {/* ==================================================
              INVESTOR EDUCATION DISCLAIMER
          ================================================== */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">

            <h3 className="mb-3 text-lg font-bold text-slate-900">
              Investor Education Disclaimer
            </h3>

            <p className="text-sm leading-7 text-slate-600">
              This calculator provides illustrative
              estimates based on the assumptions entered
              by the user and an assumed rate of return.
              Actual investment outcomes may differ
              depending on market performance. Mutual
              Fund investments are subject to market
              risks. Please read all scheme-related
              documents carefully before investing.
            </p>

          </div>
        </div>
      </section>
    </main>
  );
}
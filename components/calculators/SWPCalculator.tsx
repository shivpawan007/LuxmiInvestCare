"use client";

import { useMemo, useState } from "react";
import { Share2 } from "lucide-react";

import { calculateSWP } from "@/lib/swp";

import CalculatorInput from "./CalculatorInput";
import DownloadReport from "./DownloadReport";
import ReportShareDialog from "./sharing/ReportShareDialog";
import ConnectWithLuxmi from "./sharing/ConnectWithLuxmi";

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export default function SWPCalculator() {
  const [initialCorpus, setInitialCorpus] =
    useState(1000000);

  const [monthlyWithdrawal, setMonthlyWithdrawal] =
    useState(25000);

  const [annualReturn, setAnnualReturn] =
    useState(10);

  const [years, setYears] =
    useState(20);

  const [shareOpen, setShareOpen] =
    useState(false);

  const result = useMemo(
    () =>
      calculateSWP(
        initialCorpus,
        monthlyWithdrawal,
        annualReturn,
        years,
      ),
    [
      initialCorpus,
      monthlyWithdrawal,
      annualReturn,
      years,
    ],
  );

  /*
   * Maximum projected corpus used only for the
   * visual bars in the year-wise projection section.
   */
  const maxCorpus =
    result.projections.length > 0
      ? Math.max(
        ...result.projections.map(
          (projection) =>
            projection.closingCorpus,
        ),
        initialCorpus,
      )
      : initialCorpus;

  return (
    <main className="bg-white">
      {/* =====================================================
          HERO
      ====================================================== */}
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
              Estimate how regular withdrawals may affect
              your investment corpus over time using
              illustrative return assumptions.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CALCULATOR
      ====================================================== */}
      <section className="bg-white pb-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">

            {/* =================================================
                INPUTS
            ================================================== */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
                  Withdrawal Inputs
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Plan Your SWP
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Adjust the assumptions below to see an
                  illustrative withdrawal projection.
                </p>
              </div>

              {/* =================================================
                  INITIAL CORPUS
              ================================================== */}
              <div className="mb-8">
                <CalculatorInput
                  label="Initial Investment / Corpus"
                  value={initialCorpus}
                  min={100000}
                  max={10000000}
                  step={50000}
                  maxCap={100000000}
                  expansionStep={1000000}
                  allowDynamicRange
                  prefix="₹"
                  onChange={setInitialCorpus}
                  formatValue={formatINR}
                />
              </div>

              {/* =================================================
                  MONTHLY WITHDRAWAL
              ================================================== */}
              <div className="mb-8">
                <CalculatorInput
                  label="Monthly Withdrawal"
                  value={monthlyWithdrawal}
                  min={1000}
                  max={200000}
                  step={1000}
                  maxCap={1000000}
                  expansionStep={50000}
                  allowDynamicRange
                  prefix="₹"
                  onChange={setMonthlyWithdrawal}
                  formatValue={formatINR}
                />
              </div>

              {/* =================================================
                  EXPECTED RETURN
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
                    `${value}%`
                  }
                />
              </div>

              {/* =================================================
                  WITHDRAWAL PERIOD
              ================================================== */}
              <div>
                <CalculatorInput
                  label="Withdrawal Period"
                  value={years}
                  min={1}
                  max={40}
                  step={1}
                  maxCap={60}
                  expansionStep={10}
                  allowDynamicRange
                  suffix=" Years"
                  onChange={setYears}
                  formatValue={(value) =>
                    `${value} ${value === 1
                      ? "Year"
                      : "Years"
                    }`
                  }
                />
              </div>
            </div>

            {/* =================================================
                RESULTS
            ================================================== */}
            <div>

              {/* =================================================
                  SUMMARY CARDS
              ================================================== */}
              <div className="grid gap-4 sm:grid-cols-3">

                {/* Remaining Corpus */}
                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">
                    Remaining Corpus
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-700">
                    {formatINR(
                      result.remainingCorpus,
                    )}
                  </p>
                </div>

                {/* Total Withdrawn */}
                <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">
                    Total Withdrawn
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {formatINR(
                      result.totalWithdrawn,
                    )}
                  </p>
                </div>

                {/* Net Wealth Gain */}
                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">
                    Net Wealth Gain
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-700">
                    {formatINR(
                      result.wealthGain,
                    )}
                  </p>
                </div>
              </div>

              {/* =================================================
                  STATUS
              ================================================== */}
              <div
                className={`mt-5 rounded-2xl p-6 text-white shadow-sm ${result.sustainable
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
                  This is an illustrative projection based
                  on the assumptions entered above. Actual
                  investment returns can vary.
                </p>

                {!result.sustainable &&
                  result.exhaustionYear && (
                    <p className="mt-3 text-sm font-semibold text-amber-200">
                      Illustrative exhaustion year:{" "}
                      {result.exhaustionYear}
                    </p>
                  )}
              </div>

              {/* =================================================
                  YEAR-WISE PROJECTION
              ================================================== */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  Estimated Corpus Over Time
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Illustrative year-wise projection after
                  withdrawals.
                </p>

                <div className="mt-7 space-y-4">
                  {result.projections.map(
                    (projection) => {
                      const percentage =
                        maxCorpus > 0
                          ? (projection.closingCorpus /
                            maxCorpus) *
                          100
                          : 0;

                      return (
                        <div
                          key={
                            projection.year
                          }
                        >
                          <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                            <span className="font-semibold text-slate-600">
                              Year{" "}
                              {
                                projection.year
                              }
                            </span>

                            <span className="font-bold text-slate-900">
                              {formatINR(
                                projection.closingCorpus,
                              )}
                            </span>
                          </div>

                          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-emerald-700 to-emerald-400 transition-all duration-300"
                              style={{
                                width: `${Math.max(
                                  percentage,
                                  projection.closingCorpus >
                                    0
                                    ? 2
                                    : 0,
                                )}%`,
                              }}
                            />
                          </div>

                          <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                            <span>
                              Opening:{" "}
                              {formatINR(
                                projection.openingCorpus,
                              )}
                            </span>

                            <span>
                              Growth:{" "}
                              {formatINR(
                                projection.growth,
                              )}
                            </span>

                            <span>
                              Withdrawn:{" "}
                              {formatINR(
                                projection.annualWithdrawal,
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              REPORT ACTIONS
          ====================================================== */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <DownloadReport
              calculatorType="swp"
              investment={initialCorpus}
              annualReturn={annualReturn}
              years={years}
              investedAmount={
                initialCorpus
              }
              estimatedReturns={
                result.estimatedGrowth
              }
              maturityValue={
                result.remainingCorpus
              }
              yearlyGrowth={
                result.projections
              }
              swpData={{
                initialCorpus:
                  result.initialInvestment,

                monthlyWithdrawal:
                  result.monthlyWithdrawal,

                totalWithdrawn:
                  result.totalWithdrawn,

                remainingCorpus:
                  result.remainingCorpus,

                estimatedGrowth:
                  result.estimatedGrowth,

                sustainable:
                  result.sustainable,

                exhaustionYear:
                  result.exhaustionYear,
              }}
              reportTitle="SWP Projection Report"
              fileName="Luxmi-InvestCare-SWP-Projection-Report.pdf"
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

          {/* =====================================================
              SHARE REPORT DIALOG
          ====================================================== */}
          <ReportShareDialog
            open={shareOpen}
            onClose={() =>
              setShareOpen(false)
            }
            calculatorType="swp"
            reportTitle="SWP Projection Report"
            investment={initialCorpus}
            years={years}
            annualReturn={annualReturn}
            estimatedReturns={
              result.estimatedGrowth
            }
            maturityValue={
              result.remainingCorpus
            }
          />

          {/* =====================================================
              CONNECT WITH LUXMI
          ====================================================== */}
          <ConnectWithLuxmi
            calculatorType="swp"
            reportTitle="SWP Projection Report"
            investment={initialCorpus}
            years={years}
            annualReturn={annualReturn}
            estimatedReturns={
              result.estimatedGrowth
            }
            maturityValue={
              result.remainingCorpus
            }
          />

          {/* =====================================================
              INVESTOR EDUCATION DISCLAIMER
          ====================================================== */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h3 className="mb-3 text-lg font-bold text-slate-900">
              Investor Education Disclaimer
            </h3>

            <p className="text-sm leading-7 text-slate-600">
              The SWP Calculator provides an
              illustrative estimate based on the
              assumptions entered by the user and
              an assumed rate of return. Actual
              investment outcomes may differ
              depending on market performance.
              Mutual Fund investments are subject
              to market risks. Please read all
              scheme-related documents carefully
              before investing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
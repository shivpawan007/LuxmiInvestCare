"use client";

import {
    useMemo,
    useState,
} from "react";
import { Share2 } from "lucide-react";

import GoalSelector from "./GoalSelector";
import GoalInputs from "./GoalInputs";
import GoalResults from "./GoalResults";
import GoalProjectionChart from "./GoalProjectionChart";
import CalculatorInput from "./CalculatorInput";
import DownloadReport from "./DownloadReport";
import ReportShareDialog from "./sharing/ReportShareDialog";
import ConnectWithLuxmi from "./sharing/ConnectWithLuxmi";

import { calculateGoal } from "@/lib/goal";

export default function GoalPlanner() {
    const [goal, setGoal] =
        useState("house");

    const [targetAmount, setTargetAmount] =
        useState(5000000);

    const [years, setYears] =
        useState(15);

    const [expectedReturn, setExpectedReturn] =
        useState(12);

    const [inflation, setInflation] =
        useState(6);

    const [shareOpen, setShareOpen] =
        useState(false);

    const result = useMemo(
        () =>
            calculateGoal(
                targetAmount,
                years,
                expectedReturn,
                inflation,
            ),
        [
            targetAmount,
            years,
            expectedReturn,
            inflation,
        ],
    );

    const illustrativeGain =
        Math.max(
            0,
            result.futureValue -
            result.lumpsumRequired,
        );

    return (
        <main>
            <section className="section bg-white pt-24 md:pt-16">
                <div className="container-custom">

                    {/* ==================================================
              HEADING
          ================================================== */}
                    <div className="mx-auto mb-14 max-w-3xl text-center">

                        <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
                            GOAL PLANNER
                        </span>

                        <h1 className="section-title mt-6">
                            Estimate the Future Cost
                            <span className="block text-green-700">
                                of Your Goal
                            </span>
                        </h1>

                        <p className="section-subtitle">
                            Estimate how inflation may affect the
                            future cost of a goal and explore
                            illustrative SIP or one-time investment
                            requirements based on the assumptions
                            entered.
                        </p>
                    </div>

                    {/* ==================================================
              GOAL SELECTION
          ================================================== */}
                    <GoalSelector
                        selectedGoal={goal}
                        onSelect={setGoal}
                    />

                    {/* ==================================================
              INPUTS
          ================================================== */}
                    <div className="mt-10">
                        <GoalInputs
                            targetAmount={
                                targetAmount
                            }
                            setTargetAmount={
                                setTargetAmount
                            }
                            years={years}
                            setYears={setYears}
                            expectedReturn={
                                expectedReturn
                            }
                            setExpectedReturn={
                                setExpectedReturn
                            }
                            inflation={inflation}
                            setInflation={
                                setInflation
                            }
                        />
                    </div>

                    {/* ==================================================
              RESULTS
          ================================================== */}
                    <GoalResults
                        targetAmount={
                            targetAmount
                        }
                        inflationAdjustedAmount={
                            result.futureValue
                        }
                        monthlySIP={
                            result.monthlySIP
                        }
                        lumpsumRequired={
                            result.lumpsumRequired
                        }
                    />

                    {/* ==================================================
              CHART
          ================================================== */}
                    <GoalProjectionChart
                        currentGoal={
                            targetAmount
                        }
                        futureGoal={
                            result.futureValue
                        }
                        monthlySIP={
                            result.monthlySIP
                        }
                        lumpsum={
                            result.lumpsumRequired
                        }
                    />

                    {/* ==================================================
              REPORT ACTIONS
          ================================================== */}
                    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">

                        <DownloadReport
                            calculatorType="goal-planner"
                            investment={
                                targetAmount
                            }
                            annualReturn={
                                expectedReturn
                            }
                            years={years}
                            investedAmount={
                                result.monthlySIP
                            }
                            estimatedReturns={
                                illustrativeGain
                            }
                            maturityValue={
                                result.futureValue
                            }
                            goalData={{
                                goal,
                                targetAmount,
                                years,
                                expectedReturn,
                                inflation,
                                futureValue:
                                    result.futureValue,
                                monthlySIP:
                                    result.monthlySIP,
                                lumpsumRequired:
                                    result.lumpsumRequired,
                            }}
                            reportTitle="Goal Planning Illustration"
                            fileName="Luxmi-InvestCare-Goal-Planning-Illustration.pdf"
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
                        calculatorType="goal-planner"
                        reportTitle="Goal Planning Illustration"
                        investment={
                            targetAmount
                        }
                        years={years}
                        annualReturn={
                            expectedReturn
                        }
                        estimatedReturns={
                            illustrativeGain
                        }
                        maturityValue={
                            result.futureValue
                        }
                    />

                    {/* ==================================================
              CONNECT WITH LUXMI
          ================================================== */}
                    <ConnectWithLuxmi
                        calculatorType="goal-planner"
                        reportTitle="Goal Planning Illustration"
                        investment={
                            targetAmount
                        }
                        years={years}
                        annualReturn={
                            expectedReturn
                        }
                        estimatedReturns={
                            illustrativeGain
                        }
                        maturityValue={
                            result.futureValue
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
                            Inflation can increase the future cost
                            of a goal. This calculator illustrates
                            how the selected inflation assumption
                            changes the estimated future amount and
                            the illustrative investment requirement.
                        </p>

                        <p className="mt-3 text-xs leading-5 text-slate-600">
                            The figures shown are educational
                            illustrations based on the assumptions
                            entered. Actual costs, market returns and
                            investment requirements may differ.
                            Mutual fund investments are subject to
                            market risks. Please read all scheme-related
                            documents carefully before investing.
                        </p>
                    </div>

                    {/* ==================================================
              FINAL CTA
          ================================================== */}
                    <div className="mt-6 rounded-2xl border border-emerald-900/10 bg-gradient-to-r from-emerald-950 to-emerald-800 p-6 text-white shadow-sm">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <h2 className="text-xl font-bold">
                                    Need help understanding this illustration?
                                </h2>

                                <p className="mt-1 text-sm text-emerald-50/80">
                                    Use the calculator for investor
                                    education and connect with Luxmi
                                    InvestCare for information about
                                    available investment products.
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

                </div>
            </section>
        </main>
    );
}
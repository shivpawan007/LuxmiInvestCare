"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    IndianRupee,
    Percent,
    CalendarDays,
    Wallet,
    TrendingUp,
    Landmark,
    Share2,
} from "lucide-react";

import {
    calculateLumpsum,
} from "@/lib/lumpsum";

import LumpsumChart from "./LumpsumChart";
import CalculatorCTA from "./CalculatorCTA";
import DownloadReport from "./DownloadReport";
import CalculatorResultCard from "./CalculatorResultCard";
import LumpsumGrowthTable from "./LumpsumGrowthTable";
import LumpsumBreakdown from "./LumpsumBreakdown";
import LumpsumInsights from "./LumpsumInsights";
import CalculatorHistory from "./CalculatorHistory";
import CalculatorInput from "./CalculatorInput";

import ReportShareDialog from "./sharing/ReportShareDialog";
import ConnectWithLuxmi from "./sharing/ConnectWithLuxmi";

export default function LumpsumCalculator() {
    const [
        investment,
        setInvestment,
    ] = useState(500000);

    const [
        annualReturn,
        setAnnualReturn,
    ] = useState(12);

    const [
        years,
        setYears,
    ] = useState(20);

    const [
        shareOpen,
        setShareOpen,
    ] = useState(false);

    const result = useMemo(
        () =>
            calculateLumpsum(
                investment,
                annualReturn,
                years,
            ),
        [
            investment,
            annualReturn,
            years,
        ],
    );

    function formatCurrency(
        value: number,
    ): string {
        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            },
        ).format(value);
    }

    function formatINRNumber(
        value: number,
    ): string {
        return Math.round(value).toLocaleString(
            "en-IN",
        );
    }

    return (
        <section className="section bg-white">
            <div className="container-custom">

                {/* ==================================================
                    HERO
                ================================================== */}
                <div className="mx-auto mb-16 max-w-3xl text-center">

                    <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
                        LUMPSUM CALCULATOR
                    </span>

                    <h1 className="section-title mt-6">
                        Plan Your Wealth With
                        <span className="block text-green-700">
                            One-Time Investment
                        </span>
                    </h1>

                    <p className="section-subtitle">
                        Estimate the future value of a one-time
                        investment using compound growth
                        assumptions.
                    </p>

                </div>

                {/* ==================================================
                    MAIN
                ================================================== */}
                <div className="grid gap-12 lg:grid-cols-2">

                    {/* ==================================================
                        LEFT — INPUTS
                    ================================================== */}
                    <div className="card p-8">

                        <h2 className="mb-8 text-2xl font-bold">
                            Investment Details
                        </h2>

                        {/* INVESTMENT AMOUNT */}
                        <div className="mb-8">

                            <div className="mb-3 flex items-center gap-2">
                                <IndianRupee className="h-5 w-5 text-green-700" />

                                <span className="font-semibold">
                                    Investment Amount
                                </span>
                            </div>

                            <CalculatorInput
                                label="Investment Amount"
                                value={investment}
                                min={10000}
                                max={10000000}
                                step={100000}
                                maxCap={100000000}
                                expansionStep={5000000}
                                allowDynamicRange
                                onChange={setInvestment}
                                prefix="₹"
                                formatValue={formatINRNumber}
                                hideLabel
                            />

                        </div>

                        {/* EXPECTED RETURN */}
                        <div className="mb-8">

                            <div className="mb-3 flex items-center gap-2">
                                <Percent className="h-5 w-5 text-green-700" />

                                <span className="font-semibold">
                                    Expected Annual Return
                                </span>
                            </div>

                            <CalculatorInput
                                label="Expected Annual Return"
                                value={annualReturn}
                                min={1}
                                max={20}
                                step={0.5}
                                maxCap={30}
                                expansionStep={2.5}
                                allowDynamicRange
                                onChange={setAnnualReturn}
                                suffix="%"
                                formatValue={(value) =>
                                    String(value)
                                }
                                hideLabel
                            />

                        </div>

                        {/* INVESTMENT PERIOD */}
                        <div>

                            <div className="mb-3 flex items-center gap-2">
                                <CalendarDays className="h-5 w-5 text-green-700" />

                                <span className="font-semibold">
                                    Investment Period
                                </span>
                            </div>

                            <CalculatorInput
                                label="Investment Period"
                                value={years}
                                min={1}
                                max={40}
                                step={1}
                                maxCap={60}
                                expansionStep={10}
                                allowDynamicRange
                                onChange={setYears}
                                suffix={
                                    years === 1
                                        ? " Year"
                                        : " Years"
                                }
                                formatValue={(value) =>
                                    String(value)
                                }
                                hideLabel
                            />

                        </div>

                    </div>

                    {/* ==================================================
                        RIGHT — RESULTS
                    ================================================== */}
                    <div className="space-y-6">

                        <CalculatorResultCard
                            title="Investment Amount"
                            value={formatCurrency(
                                result.investment,
                            )}
                            icon={
                                <Wallet size={22} />
                            }
                        />

                        <CalculatorResultCard
                            title="Estimated Returns"
                            value={formatCurrency(
                                result.estimatedReturns,
                            )}
                            valueColor="text-green-700"
                            icon={
                                <TrendingUp size={22} />
                            }
                        />

                        <CalculatorResultCard
                            title="Maturity Value"
                            value={formatCurrency(
                                result.maturityValue,
                            )}
                            valueColor="text-emerald-700"
                            icon={
                                <Landmark size={22} />
                            }
                        />

                    </div>

                </div>

                {/* ==================================================
                    CHART
                ================================================== */}
                <LumpsumChart
                    data={result.yearlyGrowth}
                />

                {/* ==================================================
                    BREAKDOWN
                ================================================== */}
                <LumpsumBreakdown
                    investment={result.investment}
                    returns={result.estimatedReturns}
                    maturity={result.maturityValue}
                />

                {/* ==================================================
                    INSIGHTS
                ================================================== */}
                <LumpsumInsights
                    investment={result.investment}
                    returns={result.estimatedReturns}
                    maturity={result.maturityValue}
                    annualReturn={annualReturn}
                    years={years}
                />

                {/* ==================================================
                    YEAR-WISE TABLE
                ================================================== */}
                <LumpsumGrowthTable
                    investment={investment}
                    annualReturn={annualReturn}
                    years={years}
                />

                {/* ==================================================
                    REPORT
                ================================================== */}
                <div className="mt-10 flex flex-wrap justify-center gap-4">

                    <DownloadReport
                        calculatorType="lumpsum"
                        investment={result.investment}
                        annualReturn={annualReturn}
                        years={years}
                        investedAmount={result.investment}
                        estimatedReturns={result.estimatedReturns}
                        maturityValue={result.maturityValue}
                        yearlyGrowth={result.yearlyGrowth}
                        reportTitle="Lumpsum Projection Report"
                        fileName="Luxmi-InvestCare-Lumpsum-Projection-Report.pdf"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShareOpen(true)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-green-700 bg-white px-5 py-3 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50"
                    >
                        <Share2 className="h-4 w-4" />
                        Share Report
                    </button>

                </div>

                {/* ==================================================
                    CONNECT WITH LUXMI
                ================================================== */}
                <ConnectWithLuxmi
                    calculatorType="lumpsum"
                    reportTitle="Lumpsum Projection Report"
                    investment={result.investment}
                    years={years}
                    annualReturn={annualReturn}
                    estimatedReturns={
                        result.estimatedReturns
                    }
                    maturityValue={
                        result.maturityValue
                    }
                />

                {/* ==================================================
                    SHARE DIALOG
                ================================================== */}
                <ReportShareDialog
                    open={shareOpen}
                    onClose={() =>
                        setShareOpen(false)
                    }
                    calculatorType="lumpsum"
                    reportTitle="Lumpsum Projection Report"
                    investment={result.investment}
                    years={years}
                    annualReturn={annualReturn}
                    estimatedReturns={
                        result.estimatedReturns
                    }
                    maturityValue={
                        result.maturityValue
                    }
                />

                {/* ==================================================
                    HISTORY
                ================================================== */}
                <div className="mt-10 flex justify-center">
                    <CalculatorHistory
                        title="Lumpsum Projection"
                        result={formatCurrency(
                            result.maturityValue,
                        )}
                    />
                </div>

                {/* ==================================================
                    CTA
                ================================================== */}
                <CalculatorCTA />

            </div>
        </section>
    );
}
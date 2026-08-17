"use client";

import { useMemo, useState } from "react";
import {
    Wallet,
    TrendingUp,
    Landmark,
    Share2,
} from "lucide-react";

import { calculateSIP } from "@/lib/sip";

import SIPPieChart from "./SIPPieChart";
import SIPSummaryCard from "./SIPSummaryCard";
import SIPInputCard from "./SIPInputCard";
import SIPChart from "./SIPChart";
import SIPGrowthTable from "./SIPGrowthTable";
import SIPBreakdown from "./SIPBreakdown";
import CalculatorCTA from "./CalculatorCTA";
import DownloadReport from "./DownloadReport";
import ReportShareDialog from "./sharing/ReportShareDialog";
import ConnectWithLuxmi from "./sharing/ConnectWithLuxmi";

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
}

export default function SIPCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [annualReturn, setAnnualReturn] = useState(12);
    const [years, setYears] = useState(20);

    const [shareOpen, setShareOpen] = useState(false);

    const result = useMemo(
        () =>
            calculateSIP(
                monthlyInvestment,
                annualReturn,
                years
            ),
        [monthlyInvestment, annualReturn, years]
    );

    return (
        <section className="section bg-white">
            <div className="container-custom">

                {/* Hero */}

                <div className="mx-auto mb-16 max-w-3xl text-center">

                    <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
                        SIP CALCULATOR
                    </span>

                    <h1 className="section-title mt-6">
                        Plan Your Future With

                        <span className="block text-green-700">
                            Disciplined Investing
                        </span>
                    </h1>

                    <p className="section-subtitle">
                        Estimate the potential value of your Systematic
                        Investment Plan (SIP) based on your monthly
                        investment, expected annual return and
                        investment period.
                    </p>

                </div>

                {/* Calculator */}

                <div className="grid gap-12 lg:grid-cols-2">

                    {/* LEFT PANEL */}

                    <div className="card p-8">

                        <h2 className="mb-8 text-2xl font-bold">
                            Investment Details
                        </h2>

                        <SIPInputCard
                            title="Monthly SIP"
                            value={monthlyInvestment}
                            prefix="₹ "
                            min={500}
                            max={100000}
                            step={500}
                            onChange={setMonthlyInvestment}
                        />

                        <SIPInputCard
                            title="Expected Annual Return"
                            value={annualReturn}
                            suffix="%"
                            min={1}
                            max={20}
                            step={0.5}
                            onChange={setAnnualReturn}
                        />

                        <SIPInputCard
                            title="Investment Period"
                            value={years}
                            suffix=" Years"
                            min={1}
                            max={40}
                            step={1}
                            onChange={setYears}
                        />

                    </div>

                    {/* RIGHT PANEL */}

                    <div className="space-y-6">

                        <SIPSummaryCard
                            title="Total Investment"
                            value={result.investedAmount}
                            subtitle="Total amount invested through your monthly SIP contributions."
                            icon={<Wallet size={22} />}
                        />

                        <SIPSummaryCard
                            title="Estimated Returns"
                            value={formatCurrency(result.estimatedReturns)}
                            subtitle="Illustrative wealth generated based on expected annual returns."
                            icon={<TrendingUp size={22} />}
                            valueColor="text-green-700"
                        />

                        <SIPSummaryCard
                            title="Estimated Maturity Value"
                            value={formatCurrency(result.maturityValue)}
                            subtitle="Projected corpus at the end of your selected investment period."
                            icon={<Landmark size={22} />}
                            valueColor="text-emerald-700"
                        />

                    </div>

                </div>

                {/* Investment Growth Chart */}

                <SIPChart data={result.yearlyGrowth} />

                {/* Investment Allocation */}

                <SIPPieChart
                    invested={result.investedAmount}
                    returns={result.estimatedReturns}
                />

                {/* Year-wise Growth Table */}

                <SIPGrowthTable
                    monthlyInvestment={monthlyInvestment}
                    annualReturn={annualReturn}
                    years={years}
                />

                {/* Investment Breakdown */}

                <SIPBreakdown
                    monthlyInvestment={monthlyInvestment}
                    annualReturn={annualReturn}
                    years={years}
                    investedAmount={result.investedAmount}
                    estimatedReturns={result.estimatedReturns}
                    maturityValue={result.maturityValue}
                />

                {/* Download Report */}

                {/* Report Actions */}

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">

                    <DownloadReport
                        calculatorType="sip"
                        investment={monthlyInvestment}
                        annualReturn={annualReturn}
                        years={years}
                        investedAmount={result.investedAmount}
                        estimatedReturns={result.estimatedReturns}
                        maturityValue={result.maturityValue}
                        yearlyGrowth={result.yearlyGrowth}
                        reportTitle="SIP Projection Report"
                        fileName="Luxmi-InvestCare-SIP-Projection-Report.pdf"
                    />

                    <ReportShareDialog
                        open={shareOpen}
                        onClose={() => setShareOpen(false)}
                        calculatorType="sip"
                        reportTitle="SIP Projection Report"
                        investment={monthlyInvestment}
                        years={years}
                        annualReturn={annualReturn}
                        estimatedReturns={result.estimatedReturns}
                        maturityValue={result.maturityValue}
                    />

                    <button
                        type="button"
                        onClick={() => setShareOpen(true)}
                        className="flex items-center gap-2 rounded-lg border border-green-700 bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50"
                    >
                        <Share2 className="h-5 w-5" />
                        Share Report
                    </button>

                    <ConnectWithLuxmi
                        calculatorType="sip"
                        reportTitle="SIP Projection Report"
                        investment={monthlyInvestment}
                        years={years}
                        annualReturn={annualReturn}
                        estimatedReturns={result.estimatedReturns}
                        maturityValue={result.maturityValue}
                    />

                </div>
                {/* Disclaimer */}

                <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">

                    <h3 className="mb-3 text-lg font-bold text-slate-900">
                        Investor Education Disclaimer
                    </h3>

                    <p className="text-sm leading-7 text-slate-600">
                        The SIP Calculator provides an illustrative estimate
                        based on the values entered by the user and assumed
                        rates of return. Actual investment outcomes may differ
                        depending on market performance. Mutual Fund investments
                        are subject to market risks. Please read all
                        scheme-related documents carefully before investing.
                    </p>

                </div>

                {/* CTA */}

                <CalculatorCTA />

            </div>
        </section>
    );
}
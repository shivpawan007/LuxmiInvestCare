"use client";

import { useMemo, useState } from "react";

import { calculateLumpsum } from "@/lib/lumpsum";

import SIPChart from "./SIPChart";
import SIPPieChart from "./SIPPieChart";
import SIPGrowthTable from "./SIPGrowthTable";
import SIPBreakdown from "./SIPBreakdown";
import CalculatorCTA from "./CalculatorCTA";
import DownloadReport from "./DownloadReport";
import CalculatorResultCard from "./CalculatorResultCard";
import LumpsumGrowthTable from "./LumpsumGrowthTable";
import LumpsumBreakdown from "./LumpsumBreakdown";
import LumpsumInsights from "./LumpsumInsights";
import CalculatorShare from "./CalculatorShare";
import CalculatorHistory from "./CalculatorHistory";


import {
    IndianRupee,
    Percent,
    CalendarDays,
    Wallet,
    TrendingUp,
    Landmark,
} from "lucide-react";

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
}

export default function LumpsumCalculator() {
    const [investment, setInvestment] = useState(500000);
    const [annualReturn, setAnnualReturn] = useState(12);
    const [years, setYears] = useState(20);

    const result = useMemo(
        () =>
            calculateLumpsum(
                investment,
                annualReturn,
                years
            ),
        [investment, annualReturn, years]
    );

    return (
        <section className="section bg-white">

            <div className="container-custom">

                {/* Hero */}

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

                        Estimate the future value of a one-time investment
                        using compound annual growth assumptions.

                    </p>

                </div>

                {/* Main */}

                <div className="grid gap-12 lg:grid-cols-2">

                    {/* Left */}

                    <div className="card p-8">

                        <h2 className="mb-8 text-2xl font-bold">

                            Investment Details

                        </h2>

                        {/* Investment */}

                        <div className="mb-8">

                            <label className="mb-3 flex items-center gap-2 font-semibold">

                                <IndianRupee className="h-5 w-5 text-green-700" />

                                Investment Amount

                            </label>

                            <input
                                type="range"
                                min={10000}
                                max={10000000}
                                step={10000}
                                value={investment}
                                onChange={(e) => setInvestment(Number(e.target.value))}
                                className="w-full"
                            />

                            <div className="mt-3 text-xl font-bold text-green-700">

                                {formatCurrency(investment)}

                            </div>

                        </div>

                        {/* Return */}

                        <div className="mb-8">

                            <label className="mb-3 flex items-center gap-2 font-semibold">

                                <Percent className="h-5 w-5 text-green-700" />

                                Expected Annual Return

                            </label>

                            <input
                                type="range"
                                min={1}
                                max={20}
                                step={0.5}
                                value={annualReturn}
                                onChange={(e) => setAnnualReturn(Number(e.target.value))}
                                className="w-full"
                            />

                            <div className="mt-3 text-xl font-bold text-green-700">

                                {annualReturn}%

                            </div>

                        </div>

                        {/* Years */}

                        <div>

                            <label className="mb-3 flex items-center gap-2 font-semibold">

                                <CalendarDays className="h-5 w-5 text-green-700" />

                                Investment Period

                            </label>

                            <input
                                type="range"
                                min={1}
                                max={40}
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="w-full"
                            />

                            <div className="mt-3 text-xl font-bold text-green-700">

                                {years} Years

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="space-y-6">

                        <CalculatorResultCard
                            title="Investment Amount"
                            value={result.investment}
                            icon={<Wallet size={22} />}
                        />

                        <CalculatorResultCard
                            title="Estimated Returns"
                            value={result.estimatedReturns}
                            valueColor="text-green-700"
                            icon={<TrendingUp size={22} />}
                        />

                        <CalculatorResultCard
                            title="Maturity Value"
                            value={result.maturityValue}
                            valueColor="text-emerald-700"
                            icon={<Landmark size={22} />}
                        />

                    </div>

                </div>

                {/* Charts */}

                <SIPChart
                    investment={result.investment}
                    maturity={result.maturityValue}
                    years={years}
                />

                <SIPPieChart
                    invested={result.investment}
                    returns={result.estimatedReturns}
                />
                <LumpsumBreakdown
                    investment={result.investment}
                    returns={result.estimatedReturns}
                    maturity={result.maturityValue}
                />

                <LumpsumInsights
                    investment={result.investment}
                    returns={result.estimatedReturns}
                    maturity={result.maturityValue}
                    annualReturn={annualReturn}
                    years={years}
                />

                <LumpsumGrowthTable
                    investment={investment}
                    annualReturn={annualReturn}
                    years={years}
                />

                <SIPBreakdown
                    monthlyInvestment={0}
                    annualReturn={annualReturn}
                    years={years}
                    investedAmount={result.investment}
                    estimatedReturns={result.estimatedReturns}
                    maturityValue={result.maturityValue}
                />

                <div className="mt-10 flex justify-center">

                    <DownloadReport
                        monthlyInvestment={result.investment}
                        annualReturn={annualReturn}
                        years={years}
                        investedAmount={result.investment}
                        estimatedReturns={result.estimatedReturns}
                        maturityValue={result.maturityValue}
                    />

                    <CalculatorShare
                        title="Lumpsum Projection"
                        summary={`Investment: ₹${investment.toLocaleString("en-IN")}
                    Expected Return: ${annualReturn}%
                    Duration: ${years} Years
                    Estimated Corpus: ₹${Math.round(result.maturityValue).toLocaleString("en-IN")}`}
                    />

                    <CalculatorHistory
                        title="Lumpsum Projection"
                        result={formatCurrency(result.maturityValue)}
                    />

                </div>

                <CalculatorCTA />

            </div>

        </section>
    );
}
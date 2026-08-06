"use client";

import {
    Calendar,
    IndianRupee,
    Percent,
    Wallet,
    BarChart3,
    Landmark,
} from "lucide-react";

interface SIPBreakdownProps {
    monthlyInvestment: number;
    annualReturn: number;
    years: number;
    investedAmount: number;
    estimatedReturns: number;
    maturityValue: number;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
}

export default function SIPBreakdown({
    monthlyInvestment,
    annualReturn,
    years,
    investedAmount,
    estimatedReturns,
    maturityValue,
}: SIPBreakdownProps) {

    const totalInstallments = years * 12;

    const averageAnnualInvestment = monthlyInvestment * 12;

    const returnPercentage =
        investedAmount === 0
            ? 0
            : (estimatedReturns / investedAmount) * 100;

    const cards = [
        {
            icon: <IndianRupee className="h-6 w-6 text-green-700" />,
            title: "Monthly SIP",
            value: formatCurrency(monthlyInvestment),
        },
        {
            icon: <Calendar className="h-6 w-6 text-green-700" />,
            title: "Investment Period",
            value: `${years} Years`,
        },
        {
            icon: <Percent className="h-6 w-6 text-green-700" />,
            title: "Expected Return",
            value: `${annualReturn}%`,
        },
        {
            icon: <Wallet className="h-6 w-6 text-green-700" />,
            title: "Total Investment",
            value: formatCurrency(investedAmount),
        },
        {
            icon: <BarChart3 className="h-6 w-6 text-green-700" />,
            title: "Estimated Returns",
            value: formatCurrency(estimatedReturns),
        },
        {
            icon: <Landmark className="h-6 w-6 text-green-700" />,
            title: "Maturity Value",
            value: formatCurrency(maturityValue),
        },
    ];

    return (
        <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

            <div className="mb-10">

                <h2 className="text-3xl font-bold text-slate-900">
                    Investment Breakdown
                </h2>

                <p className="mt-2 text-slate-600">
                    A quick overview of your SIP assumptions and estimated outcomes.
                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {cards.map((item) => (

                    <div
                        key={item.title}
                        className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition hover:shadow-lg"
                    >

                        <div className="mb-4 flex items-center gap-3">

                            {item.icon}

                            <h3 className="font-semibold">
                                {item.title}
                            </h3>

                        </div>

                        <p className="text-2xl font-bold text-slate-900">

                            {item.value}

                        </p>

                    </div>

                ))}

            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">

                <div className="rounded-2xl bg-green-50 p-6">

                    <p className="text-sm text-slate-500">
                        SIP Installments
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-green-700">
                        {totalInstallments}
                    </h3>

                </div>

                <div className="rounded-2xl bg-green-50 p-6">

                    <p className="text-sm text-slate-500">
                        Average Annual Investment
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-green-700">
                        {formatCurrency(averageAnnualInvestment)}
                    </h3>

                </div>

                <div className="rounded-2xl bg-green-50 p-6">

                    <p className="text-sm text-slate-500">
                        Estimated Return %
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-green-700">
                        {returnPercentage.toFixed(1)}%
                    </h3>

                </div>

            </div>

        </section>
    );
}
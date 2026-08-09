"use client";

import {
    calculateSIPYearlyGrowth,
} from "@/lib/sip";

interface SIPGrowthTableProps {
    monthlyInvestment: number;
    annualReturn: number;
    years: number;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
}

export default function SIPGrowthTable({
    monthlyInvestment,
    annualReturn,
    years,
}: SIPGrowthTableProps) {

    const rows = calculateSIPYearlyGrowth(
        monthlyInvestment,
        annualReturn,
        years
    );

    return (
        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

            <div className="mb-8">

                <h2 className="text-3xl font-bold text-slate-900">
                    Year-wise Growth Projection
                </h2>

                <p className="mt-2 text-slate-600">
                    Illustrative year-wise growth based on the selected SIP
                    amount, assumed annual return and investment period.
                </p>

            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full border-collapse">

                    <thead>

                        <tr className="bg-green-700 text-white">

                            <th className="px-6 py-4 text-left">
                                Year
                            </th>

                            <th className="px-6 py-4 text-right">
                                Total Investment
                            </th>

                            <th className="px-6 py-4 text-right">
                                Estimated Value
                            </th>

                            <th className="px-6 py-4 text-right">
                                Estimated Gain
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {rows.map((row, index) => (

                            <tr
                                key={row.year}
                                className={
                                    index % 2 === 0
                                        ? "bg-slate-50"
                                        : "bg-white"
                                }
                            >

                                <td className="border-b px-6 py-4 font-semibold">
                                    {row.year}
                                </td>

                                <td className="border-b px-6 py-4 text-right">
                                    {formatCurrency(row.invested)}
                                </td>

                                <td className="border-b px-6 py-4 text-right font-semibold text-green-700">
                                    {formatCurrency(row.value)}
                                </td>

                                <td className="border-b px-6 py-4 text-right font-semibold text-emerald-700">
                                    {formatCurrency(row.estimatedReturns)}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

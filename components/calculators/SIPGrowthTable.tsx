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
    }).format(Math.round(value));
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
        <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

            {/* Header */}
            <div className="mb-6 sm:mb-8">

                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Year-wise Growth Projection
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                    Illustrative year-wise growth based on the selected SIP
                    amount, assumed annual return and investment period.
                </p>

            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 md:block">

                <table className="w-full border-collapse">

                    <thead>
                        <tr className="bg-green-700 text-white">

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Year
                            </th>

                            <th className="px-5 py-4 text-right text-sm font-semibold">
                                Total Investment
                            </th>

                            <th className="px-5 py-4 text-right text-sm font-semibold">
                                Estimated Value
                            </th>

                            <th className="px-5 py-4 text-right text-sm font-semibold">
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

                                <td className="border-b border-slate-200 px-5 py-4 font-semibold text-slate-900">
                                    Year {row.year}
                                </td>

                                <td className="border-b border-slate-200 px-5 py-4 text-right text-slate-700">
                                    {formatCurrency(row.invested)}
                                </td>

                                <td className="border-b border-slate-200 px-5 py-4 text-right font-semibold text-green-700">
                                    {formatCurrency(row.value)}
                                </td>

                                <td className="border-b border-slate-200 px-5 py-4 text-right font-semibold text-emerald-700">
                                    {formatCurrency(row.estimatedReturns)}
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 md:hidden">

                {rows.map((row) => (
                    <div
                        key={row.year}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >

                        {/* Year */}
                        <div className="mb-4 flex items-center justify-between">

                            <span className="text-sm font-bold text-slate-900">
                                Year {row.year}
                            </span>

                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                SIP Projection
                            </span>

                        </div>

                        {/* Values */}
                        <div className="grid grid-cols-2 gap-3">

                            <div className="rounded-xl bg-white p-3">
                                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                                    Investment
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {formatCurrency(row.invested)}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-3">
                                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                                    Estimated Value
                                </p>

                                <p className="mt-1 text-sm font-bold text-green-700">
                                    {formatCurrency(row.value)}
                                </p>
                            </div>

                            <div className="col-span-2 rounded-xl bg-green-50 p-3">
                                <p className="text-[11px] font-medium uppercase tracking-wide text-green-700">
                                    Estimated Gain
                                </p>

                                <p className="mt-1 text-base font-bold text-emerald-700">
                                    {formatCurrency(row.estimatedReturns)}
                                </p>
                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </section>
    );
}
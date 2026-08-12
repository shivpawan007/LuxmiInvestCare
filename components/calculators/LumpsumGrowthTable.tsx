"use client";

interface LumpsumGrowthTableProps {
    investment: number;
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

export default function LumpsumGrowthTable({
    investment,
    annualReturn,
    years,
}: LumpsumGrowthTableProps) {
    const data = [];

    for (let year = 1; year <= years; year++) {
        const value =
            investment * Math.pow(1 + annualReturn / 100, year);

        data.push({
            year,
            investment,
            value,
            gain: value - investment,
        });
    }

    return (
        <div className="mt-16 rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">

            <div className="border-b border-slate-200 px-8 py-6">
                <h2 className="text-2xl font-bold text-slate-900">
                    Year-wise Wealth Projection
                </h2>

                <p className="mt-2 text-slate-600">
                    Illustrative annual growth of your one-time investment.
                </p>
            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-green-700 text-white">

                        <tr>
                            <th className="px-6 py-4 text-left">Year</th>
                            <th className="px-6 py-4 text-right">Investment</th>
                            <th className="px-6 py-4 text-right">Wealth Created</th>
                            <th className="px-6 py-4 text-right">Portfolio Value</th>
                        </tr>

                    </thead>

                    <tbody>

                        {data.map((row) => (
                            <tr
                                key={row.year}
                                className="border-b last:border-none hover:bg-slate-50"
                            >
                                <td className="px-6 py-4 font-semibold">
                                    {row.year}
                                </td>

                                <td className="px-6 py-4 text-right">
                                    {formatCurrency(row.investment)}
                                </td>

                                <td className="px-6 py-4 text-right text-green-700 font-semibold">
                                    {formatCurrency(row.gain)}
                                </td>

                                <td className="px-6 py-4 text-right font-bold">
                                    {formatCurrency(row.value)}
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}
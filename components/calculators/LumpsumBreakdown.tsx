"use client";

import {
    Wallet,
    TrendingUp,
    Landmark,
    BarChart3,
} from "lucide-react";

interface LumpsumBreakdownProps {
    investment: number;
    returns: number;
    maturity: number;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
}

export default function LumpsumBreakdown({
    investment,
    returns,
    maturity,
}: LumpsumBreakdownProps) {
    const multiple = (maturity / investment).toFixed(2);

    const cards = [
        {
            title: "Initial Investment",
            value: formatCurrency(investment),
            icon: <Wallet className="h-7 w-7 text-green-700" />,
        },
        {
            title: "Wealth Created",
            value: formatCurrency(returns),
            icon: <TrendingUp className="h-7 w-7 text-green-700" />,
        },
        {
            title: "Final Corpus",
            value: formatCurrency(maturity),
            icon: <Landmark className="h-7 w-7 text-green-700" />,
        },
        {
            title: "Growth Multiple",
            value: `${multiple}×`,
            icon: <BarChart3 className="h-7 w-7 text-green-700" />,
        },
    ];

    return (
        <section className="mt-16">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">
                    Investment Breakdown
                </h2>

                <p className="mt-2 text-slate-600">
                    Quick summary of your projected one-time investment performance.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                            {card.icon}
                        </div>

                        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                            {card.title}
                        </h3>

                        <p className="mt-4 text-3xl font-bold text-slate-900">
                            {card.value}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
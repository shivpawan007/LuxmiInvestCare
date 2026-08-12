"use client";

import {
  Wallet,
  TrendingUp,
  Target,
  PiggyBank,
} from "lucide-react";

interface GoalResultsProps {
  targetAmount: number;
  inflationAdjustedAmount: number;
  monthlySIP: number;
  lumpsumRequired: number;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function GoalResults({
  targetAmount,
  inflationAdjustedAmount,
  monthlySIP,
  lumpsumRequired,
}: GoalResultsProps) {
  const cards = [
    {
      title: "Today's Goal Value",
      value: formatCurrency(targetAmount),
      icon: <Target className="h-7 w-7" />,
    },
    {
      title: "Future Goal Value",
      value: formatCurrency(inflationAdjustedAmount),
      icon: <TrendingUp className="h-7 w-7" />,
    },
    {
      title: "Required Monthly SIP",
      value: formatCurrency(monthlySIP),
      icon: <PiggyBank className="h-7 w-7" />,
    },
    {
      title: "Required Lumpsum",
      value: formatCurrency(lumpsumRequired),
      icon: <Wallet className="h-7 w-7" />,
    },
  ];

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-slate-900">
        Goal Planning Summary
      </h2>

      <p className="mt-2 text-slate-600">
        Illustration based on your selected assumptions.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              {card.icon}
            </div>

            <p className="text-sm uppercase tracking-wide text-slate-500">
              {card.title}
            </p>

            <h3 className="mt-4 text-3xl font-bold text-slate-900">
              {card.value}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

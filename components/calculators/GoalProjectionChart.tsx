"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

interface GoalProjectionChartProps {
  currentGoal: number;
  futureGoal: number;
  monthlySIP: number;
  lumpsum: number;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)} Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)} L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}K`;
  }

  return `₹${Math.round(value)}`;
}

export default function GoalProjectionChart({
  currentGoal,
  futureGoal,
  monthlySIP,
  lumpsum,
}: GoalProjectionChartProps) {
  const data = [
    {
      name: "Today's Goal",
      value: currentGoal,
      color: "#047857",
    },
    {
      name: "Future Goal",
      value: futureGoal,
      color: "#D4AF37",
    },
  ];

  return (
    <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-8">
        <span className="text-sm font-semibold uppercase tracking-widest text-green-700">
          Goal Projection
        </span>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          How Inflation May Change Your Goal
        </h2>

        <p className="mt-2 max-w-3xl text-slate-600">
          See how the estimated future cost of your goal compares with its
          value today, based on the inflation assumption entered above.
        </p>
      </div>

      {/* Goal Growth Chart */}
      <div className="rounded-2xl bg-slate-50 p-5">

        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="name"
              tick={{ fill: "#475569", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={formatCompactCurrency}
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={75}
            />

            <Tooltip
              formatter={(value) => [
                formatCurrency(Number(value)),
                "Goal Value",
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
              maxBarSize={100}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Investment Requirements */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Required Monthly SIP
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            {formatCurrency(monthlySIP)}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Illustrative monthly investment required to work toward the
            projected goal.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Required Lumpsum
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            {formatCurrency(lumpsum)}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Illustrative one-time investment required under the selected
            assumptions.
          </p>
        </div>

      </div>

      {/* Educational Note */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm leading-6 text-slate-600">
          <span className="font-semibold text-slate-900">
            Educational illustration:
          </span>{" "}
          The figures are estimates based on the assumptions entered in this
          calculator. Actual investment outcomes may differ because mutual
          fund investments are subject to market risks.
        </p>
      </div>

    </div>
  );
}

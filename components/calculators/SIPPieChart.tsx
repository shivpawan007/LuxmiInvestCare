"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Text,
} from "recharts";

interface Props {
  invested: number;
  returns: number;
}

const COLORS = [
  "#16a34a",
  "#0f766e",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatShortCurrency(value: number) {
  const amount = Math.abs(Number(value));

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  }

  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }

  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function SIPPieChart({
  invested,
  returns,
}: Props) {
  const safeInvested = Math.max(0, Number(invested) || 0);
  const safeReturns = Math.max(0, Number(returns) || 0);

  const total = safeInvested + safeReturns;

  const data = [
    {
      name: "Investment",
      value: safeInvested,
    },
    {
      name: "Returns",
      value: safeReturns,
    },
  ];

  const renderLegend = (
    value: string,
    entry: {
      payload?: {
        value?: number;
      };
    }
  ) => {
    const amount = Number(entry?.payload?.value ?? 0);

    return (
      <span className="text-sm font-medium text-slate-700">
        {value}: {formatCurrency(amount)}
      </span>
    );
  };

  return (
    <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      <h2 className="text-2xl font-bold text-slate-900">
        Projected Corpus Composition
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Illustrative composition of your projected SIP corpus
        between your invested amount and estimated returns.
      </p>

      <div className="mt-6 h-[340px] w-full sm:h-[420px]">

        {total > 0 ? (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius="30%"
                outerRadius="55%"
                paddingAngle={3}
                stroke="#ffffff"
                strokeWidth={3}
                label={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={
                      COLORS[
                      index % COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>

              {/* Centre Total */}
              <Text
                x="50%"
                y="41%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-500 text-[11px] font-medium"
              >
                Projected Corpus
              </Text>

              <Text
                x="50%"
                y="48%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-900 text-[16px] font-bold"
              >
                {formatShortCurrency(total)}
              </Text>

              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(Number(value)),
                  name === "Investment"
                    ? "Investment"
                    : "Estimated Returns",
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  boxShadow:
                    "0 10px 25px rgba(15, 23, 42, 0.10)",
                }}
                labelStyle={{
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{
                  paddingTop: "18px",
                }}
                formatter={renderLegend}
              />

            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl bg-slate-50">
            <p className="text-sm text-slate-500">
              Enter investment values to view the corpus
              composition.
            </p>
          </div>
        )}

      </div>

    </section>
  );
}
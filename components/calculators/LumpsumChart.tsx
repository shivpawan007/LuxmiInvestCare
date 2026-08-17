"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import type { LumpsumProjection } from "@/lib/lumpsum";

interface Props {
    data: LumpsumProjection[];
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
}

function formatAxisValue(value: number) {
    const amount = Number(value);

    if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(1)}Cr`;
    }

    if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)}L`;
    }

    if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(0)}K`;
    }

    return `₹${amount.toLocaleString("en-IN")}`;
}

export default function LumpsumChart({ data }: Props) {
    return (
        <section className="mt-12 w-full">
            <div className="card w-full overflow-hidden p-5 sm:p-6 lg:p-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        Investment Growth
                    </h2>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                        Illustrative year-wise projection of your one-time
                        investment and estimated portfolio value.
                    </p>
                </div>

                <div className="w-full overflow-hidden">
                    <ResponsiveContainer
                        width="100%"
                        height={360}
                        minWidth={0}
                    >
                        <LineChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#cbd5e1"
                            />

                            <XAxis
                                dataKey="year"
                                tickFormatter={(value) =>
                                    `Year ${value}`
                                }
                                tick={{
                                    fontSize: 12,
                                    fill: "#475569",
                                }}
                                tickLine={false}
                                axisLine={{
                                    stroke: "#94a3b8",
                                }}
                                minTickGap={18}
                            />

                            <YAxis
                                tickFormatter={(value) =>
                                    formatAxisValue(Number(value))
                                }
                                tick={{
                                    fontSize: 11,
                                    fill: "#475569",
                                }}
                                tickLine={false}
                                axisLine={{
                                    stroke: "#94a3b8",
                                }}
                                width={58}
                            />

                            <Tooltip
                                formatter={(
                                    value,
                                    name
                                ) => [
                                        formatCurrency(Number(value)),
                                        name === "Amount Invested"
                                            ? "Invested Amount"
                                            : "Estimated Portfolio Value",
                                    ]}
                                labelFormatter={(label) =>
                                    `Year ${label}`
                                }
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid #d1d5db",
                                    backgroundColor: "#ffffff",
                                    boxShadow:
                                        "0 4px 12px rgba(0,0,0,0.08)",
                                }}
                                labelStyle={{
                                    fontWeight: 600,
                                    color: "#0f172a",
                                    marginBottom: "4px",
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="invested"
                                stroke="#94a3b8"
                                strokeWidth={3}
                                dot={false}
                                name="Amount Invested"
                                activeDot={{
                                    r: 5,
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#15803d"
                                strokeWidth={4}
                                dot={false}
                                name="Estimated Portfolio Value"
                                activeDot={{
                                    r: 6,
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}
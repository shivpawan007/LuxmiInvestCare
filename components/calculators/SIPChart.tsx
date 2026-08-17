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

import type { SIPProjection } from "@/lib/sip";

interface Props {
    data: SIPProjection[];
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
}

function formatAxisCurrency(value: number) {
    const amount = Number(value);

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

export default function SIPChart({ data }: Props) {
    const maxValue = Math.max(
        ...data.map((item) => Math.max(item.invested, item.value)),
        0
    );

    /*
     * Add approximately 15% headroom above the highest value
     * so that the final portfolio value does not touch the
     * top edge of the chart.
     */
    const chartMax =
        maxValue > 0
            ? Math.ceil((maxValue * 1.15) / 100000) * 100000
            : 100000;

    return (
        <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-2xl font-bold text-slate-900">
                Investment Growth
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
                Illustrative year-wise projection of your investment and
                estimated portfolio value.
            </p>

            <div className="mt-6 h-[360px] w-full sm:h-[420px]">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart
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
                            stroke="#cbd5e1"
                            vertical
                        />

                        <XAxis
                            dataKey="year"
                            tickFormatter={(value) => `Year ${value}`}
                            tick={{
                                fontSize: 12,
                                fill: "#475569",
                            }}
                            tickLine={false}
                            axisLine={{
                                stroke: "#94a3b8",
                            }}
                        />

                        <YAxis
                            domain={[0, chartMax]}
                            tickFormatter={formatAxisCurrency}
                            tick={{
                                fontSize: 12,
                                fill: "#475569",
                            }}
                            tickLine={false}
                            axisLine={{
                                stroke: "#94a3b8",
                            }}
                            width={75}
                        />

                        <Tooltip
                            formatter={(value, name) => [
                                formatCurrency(Number(value)),
                                name === "Amount Invested"
                                    ? "Invested Amount"
                                    : "Estimated Portfolio Value",
                            ]}
                            labelFormatter={(label) => `Year ${label}`}
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
                                marginBottom: "6px",
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

        </section>
    );
}
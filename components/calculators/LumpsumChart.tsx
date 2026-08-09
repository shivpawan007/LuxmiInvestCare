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

export default function LumpsumChart({ data }: Props) {
    return (
        <div className="card mt-10 p-8">

            <h2 className="mb-2 text-2xl font-bold text-slate-900">
                Investment Growth
            </h2>

            <p className="mb-8 text-slate-600">
                Illustrative year-wise projection of your one-time investment
                and estimated portfolio value.
            </p>

            <div className="h-[380px]">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 10,
                            bottom: 10,
                        }}
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="year"
                            tickFormatter={(value) => `Year ${value}`}
                        />

                        <YAxis
                            tickFormatter={(value) =>
                                `₹${Number(value).toLocaleString("en-IN")}`
                            }
                        />

                        <Tooltip
                            formatter={(value, name) => [
                                formatCurrency(Number(value)),
                                name === "invested"
                                    ? "Amount Invested"
                                    : "Estimated Value",
                            ]}
                            labelFormatter={(label) => `Year ${label}`}
                        />

                        <Line
                            type="monotone"
                            dataKey="invested"
                            stroke="#94a3b8"
                            strokeWidth={3}
                            dot={false}
                            name="Amount Invested"
                        />

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#15803d"
                            strokeWidth={4}
                            dot={false}
                            name="Estimated Value"
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>
        </div>
    );
}

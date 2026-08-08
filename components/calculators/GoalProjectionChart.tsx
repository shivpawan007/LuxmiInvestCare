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

export default function GoalProjectionChart({
    currentGoal,
    futureGoal,
    monthlySIP,
    lumpsum,
}: GoalProjectionChartProps) {

    const data = [
        {
            name: "Current Goal",
            value: currentGoal,
            color: "#16a34a",
        },
        {
            name: "Future Goal",
            value: futureGoal,
            color: "#059669",
        },
        {
            name: "Monthly SIP",
            value: monthlySIP,
            color: "#2563eb",
        },
        {
            name: "Lumpsum",
            value: lumpsum,
            color: "#f59e0b",
        },
    ];

    return (
        <div className="mt-16 rounded-3xl border bg-white p-8 shadow-sm">

            <h2 className="mb-2 text-2xl font-bold">
                Goal Projection
            </h2>

            <p className="mb-8 text-slate-600">
                Visual comparison of your financial goal and investment requirements.
            </p>

            <ResponsiveContainer width="100%" height={420}>

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip
                        formatter={(value) => [
                            `₹${Number(value).toLocaleString("en-IN")}`,
                            "Value",
                        ]}
                    />

                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={entry.color}
                            />

                        ))}

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}
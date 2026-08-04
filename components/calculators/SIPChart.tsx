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

interface Props {
    investment: number;
    maturity: number;
    years: number;
}

export default function SIPChart({
    investment,
    maturity,
    years,
}: Props) {

    const data = [];

    for (let i = 1; i <= years; i++) {

        const invested = (investment / years) * i;

        const value = (maturity / years) * i;

        data.push({
            year: i,
            invested,
            value,
        });

    }

    return (

        <div className="card mt-10 p-8">

            <h2 className="mb-8 text-2xl font-bold">
                Investment Growth
            </h2>

            <div className="h-[380px]">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="year" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="invested"
                            stroke="#94a3b8"
                            strokeWidth={3}
                            name="Investment"
                        />

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#15803d"
                            strokeWidth={4}
                            name="Estimated Value"
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );
}
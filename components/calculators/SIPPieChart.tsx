"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface Props {
    invested: number;
    returns: number;
}

const COLORS = [
    "#16a34a",
    "#0f766e",
];

export default function SIPPieChart({
    invested,
    returns,
}: Props) {
    const data = [
        {
            name: "Investment",
            value: invested,
        },
        {
            name: "Returns",
            value: returns,
        },
    ];

    return (
        <div className="card mt-10 p-8">

            <h2 className="mb-8 text-2xl font-bold">
                Projected Corpus Composition
            </h2>

            <div className="h-[380px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={70}
                            outerRadius={120}
                            paddingAngle={5}
                        >

                            {data.map((entry, index) => (

                                <Cell
                                    key={entry.name}
                                    fill={COLORS[index]}
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}
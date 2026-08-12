"use client";

import {
  PieChart,
  Pie,
  Cell,
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

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

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
              label={({ name, value }) =>
                `${name}: ${formatCurrency(Number(value))}`
              }
              labelLine={false}
            >

              {data.map((entry, index) => (

                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>



            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

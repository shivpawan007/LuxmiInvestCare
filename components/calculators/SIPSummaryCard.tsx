"use client";

import { ReactNode } from "react";
import { TrendingUp } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
interface SIPSummaryCardProps {
    title: string;
    value: number | string;
    subtitle: string;
    icon?: ReactNode;
    valueColor?: string;
}

export default function SIPSummaryCard({
    title,
    value,
    subtitle,
    icon,
    valueColor = "text-slate-900",
}: SIPSummaryCardProps) {
    return (
        <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl">

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        {title}
                    </p>

                </div>

                <div className="rounded-2xl bg-green-100 p-3 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">

                    {icon ?? <TrendingUp size={22} />}

                </div>

            </div>

            {/* Value */}

            <h3 className={`text-4xl font-extrabold ${valueColor}`}>
                {typeof value === "number" ? (
                    <AnimatedCounter
                        value={value}
                        formatter={(v) =>
                            new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                                maximumFractionDigits: 0,
                            }).format(v)
                        }
                    />
                ) : (
                    value
                )}
            </h3>

            {/* Subtitle */}

            <p className="mt-4 leading-7 text-slate-500">
                {subtitle}
            </p>

        </div>
    );
}
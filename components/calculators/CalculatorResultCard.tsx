"use client";
"use client";

import { ReactNode } from "react";

interface CalculatorResultCardProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    valueColor?: string;
    value: string | number;

}

export default function CalculatorResultCard({
    title,
    value,
    subtitle,
    icon,
    valueColor = "text-slate-900",
}: CalculatorResultCardProps) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        {title}
                    </p>

                    <h3 className={`mt-3 text-4xl font-bold ${valueColor}`}>
                        {value}
                    </h3>

                    {subtitle && (
                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            {subtitle}
                        </p>
                    )}
                </div>

                {icon && (
                    <div className="rounded-2xl bg-green-100 p-4 text-green-700">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}
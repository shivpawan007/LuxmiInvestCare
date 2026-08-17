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
    subtitle,
    icon,
    valueColor = "text-slate-900",
    value,
}: CalculatorResultCardProps) {
    return (
        <div
            className="
        w-full min-w-0
        rounded-3xl
        border border-slate-200
        bg-white
        p-6 sm:p-8
        shadow-md
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
        >
            <div className="flex w-full min-w-0 items-start justify-between gap-4">
                {/* Text content */}
                <div className="min-w-0 flex-1">
                    <p
                        className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-slate-500
            "
                    >
                        {title}
                    </p>

                    <h3
                        className={`
              mt-3
              break-words
              text-3xl
              font-bold
              leading-tight
              sm:text-4xl
              ${valueColor}
            `}
                    >
                        {value}
                    </h3>

                    {subtitle && (
                        <p
                            className="
                mt-3
                text-sm
                leading-6
                text-slate-500
              "
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Icon */}
                {icon && (
                    <div
                        className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-emerald-100
              text-emerald-700
            "
                    >
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}
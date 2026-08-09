"use client";

import RangeControl from "./RangeControl";

interface SIPInputCardProps {
    title: string;
    value: number;
    prefix?: string;
    suffix?: string;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
    formatValue?: (value: number) => string;
}

export default function SIPInputCard({
    title,
    value,
    prefix = "",
    suffix = "",
    min,
    max,
    step,
    onChange,
    formatValue,
}: SIPInputCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">
                {title}
            </h3>

            <RangeControl
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={onChange}
                prefix={prefix}
                suffix={suffix}
                formatValue={formatValue}
            />
        </div>
    );
}

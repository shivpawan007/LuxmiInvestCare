"use client";

import { Minus, Plus } from "lucide-react";

interface SIPInputCardProps {
    title: string;
    value: number;
    prefix?: string;
    suffix?: string;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
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
}: SIPInputCardProps) {
    const decrease = () => {
        if (value > min) onChange(value - step);
    };

    const increase = () => {
        if (value < max) onChange(value + step);
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">

            <div className="mb-4 flex items-center justify-between">

                <h3 className="text-lg font-semibold text-slate-800">
                    {title}
                </h3>

                <div className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                    {prefix}
                    {value.toLocaleString("en-IN")}
                    {suffix}
                </div>

            </div>

            <div className="flex items-center gap-4">

                <button
                    type="button"
                    onClick={decrease}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition hover:bg-green-600 hover:text-white"
                >
                    <Minus size={18} />
                </button>

                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer accent-green-700"
                />

                <button
                    type="button"
                    onClick={increase}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white transition hover:bg-green-800"
                >
                    <Plus size={18} />
                </button>

            </div>

        </div>
    );
}
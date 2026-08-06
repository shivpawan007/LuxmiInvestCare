"use client";

import { IndianRupee, CalendarDays, Percent } from "lucide-react";

interface GoalInputsProps {
    targetAmount: number;
    setTargetAmount: (value: number) => void;
    years: number;
    setYears: (value: number) => void;
    expectedReturn: number;
    setExpectedReturn: (value: number) => void;
    inflation: number;
    setInflation: (value: number) => void;
}

export default function GoalInputs({
    targetAmount,
    setTargetAmount,
    years,
    setYears,
    expectedReturn,
    setExpectedReturn,
    inflation,
    setInflation,
}: GoalInputsProps) {
    return (
        <section className="mt-16">

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

                <h2 className="mb-8 text-2xl font-bold">
                    Goal Details
                </h2>

                <div className="grid gap-8 md:grid-cols-2">

                    {/* Target Amount */}

                    <div>

                        <label className="mb-3 flex items-center gap-2 font-semibold">

                            <IndianRupee className="h-5 w-5 text-green-700" />

                            Target Amount

                        </label>

                        <input
                            type="range"
                            min={100000}
                            max={50000000}
                            step={100000}
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(Number(e.target.value))}
                            className="w-full"
                        />

                        <p className="mt-2 text-xl font-bold text-green-700">
                            ₹{targetAmount.toLocaleString("en-IN")}
                        </p>

                    </div>

                    {/* Years */}

                    <div>

                        <label className="mb-3 flex items-center gap-2 font-semibold">

                            <CalendarDays className="h-5 w-5 text-green-700" />

                            Years to Goal

                        </label>

                        <input
                            type="range"
                            min={1}
                            max={40}
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full"
                        />

                        <p className="mt-2 text-xl font-bold text-green-700">
                            {years} Years
                        </p>

                    </div>

                    {/* Expected Return */}

                    <div>

                        <label className="mb-3 flex items-center gap-2 font-semibold">

                            <Percent className="h-5 w-5 text-green-700" />

                            Expected Return

                        </label>

                        <input
                            type="range"
                            min={5}
                            max={20}
                            step={0.5}
                            value={expectedReturn}
                            onChange={(e) => setExpectedReturn(Number(e.target.value))}
                            className="w-full"
                        />

                        <p className="mt-2 text-xl font-bold text-green-700">
                            {expectedReturn}%
                        </p>

                    </div>

                    {/* Inflation */}

                    <div>

                        <label className="mb-3 flex items-center gap-2 font-semibold">

                            <Percent className="h-5 w-5 text-green-700" />

                            Inflation Rate

                        </label>

                        <input
                            type="range"
                            min={2}
                            max={10}
                            step={0.5}
                            value={inflation}
                            onChange={(e) => setInflation(Number(e.target.value))}
                            className="w-full"
                        />

                        <p className="mt-2 text-xl font-bold text-green-700">
                            {inflation}%
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}
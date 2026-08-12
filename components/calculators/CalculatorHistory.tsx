"use client";

import { useEffect, useState } from "react";

interface HistoryItem {
    date: string;
    title: string;
    result: string;
}

interface CalculatorHistoryProps {
    title: string;
    result: string;
}

export default function CalculatorHistory({
    title,
    result,
}: CalculatorHistoryProps) {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("calculator-history");

        if (stored) {
            setHistory(JSON.parse(stored));
        }
    }, []);

    const saveCalculation = () => {
        const item = {
            date: new Date().toLocaleString(),
            title,
            result,
        };

        const updated = [item, ...history].slice(0, 10);

        setHistory(updated);

        localStorage.setItem(
            "calculator-history",
            JSON.stringify(updated)
        );
    };

    return (
        <section className="mt-16">

            <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold">
                    Recent Calculations
                </h2>

                <button
                    onClick={saveCalculation}
                    className="rounded-xl bg-green-700 px-5 py-3 text-white hover:bg-green-800"
                >
                    Save Calculation
                </button>

            </div>

            <div className="mt-8 space-y-4">

                {history.length === 0 && (
                    <p className="text-slate-500">
                        No saved calculations yet.
                    </p>
                )}

                {history.map((item, index) => (

                    <div
                        key={index}
                        className="rounded-2xl border bg-white p-5 shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <h3 className="font-semibold">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-slate-500">
                                    {item.date}
                                </p>

                            </div>

                            <div className="font-bold text-green-700">
                                {item.result}
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}
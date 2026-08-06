"use client";

interface CalculatorCompareProps {
    firstTitle: string;
    firstValue: number;
    secondTitle: string;
    secondValue: number;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
}

export default function CalculatorCompare({
    firstTitle,
    firstValue,
    secondTitle,
    secondValue,
}: CalculatorCompareProps) {
    const difference = Math.abs(firstValue - secondValue);

    return (
        <section className="mt-16">

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

                <h2 className="text-2xl font-bold text-slate-900">
                    Comparison Snapshot
                </h2>

                <p className="mt-2 text-slate-600">
                    Compare two investment outcomes for educational purposes.
                </p>

                <div className="mt-8 grid gap-6 md:grid-cols-2">

                    <div className="rounded-2xl border p-6">
                        <p className="text-sm uppercase text-slate-500">{firstTitle}</p>

                        <h3 className="mt-3 text-3xl font-bold text-green-700">
                            {formatCurrency(firstValue)}
                        </h3>
                    </div>

                    <div className="rounded-2xl border p-6">
                        <p className="text-sm uppercase text-slate-500">{secondTitle}</p>

                        <h3 className="mt-3 text-3xl font-bold text-blue-700">
                            {formatCurrency(secondValue)}
                        </h3>
                    </div>

                </div>

                <div className="mt-8 rounded-2xl bg-slate-50 p-6">

                    <h3 className="font-semibold text-slate-700">
                        Difference
                    </h3>

                    <p className="mt-2 text-3xl font-bold text-emerald-700">
                        {formatCurrency(difference)}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                        This comparison is illustrative only and should not be considered investment advice.
                    </p>

                </div>

            </div>

        </section>
    );
}
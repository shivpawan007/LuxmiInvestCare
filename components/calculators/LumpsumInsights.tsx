"use client";

interface LumpsumInsightsProps {
    investment: number;
    returns: number;
    maturity: number;
    annualReturn: number;
    years: number;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
}

export default function LumpsumInsights({
    investment,
    returns,
    maturity,
    annualReturn,
    years,
}: LumpsumInsightsProps) {
    const wealthPercent = ((returns / investment) * 100).toFixed(0);

    return (
        <section className="mt-16">

            <div className="rounded-3xl bg-gradient-to-br from-green-50 to-white border border-green-100 p-10">

                <h2 className="text-3xl font-bold text-slate-900">
                    Investment Insights
                </h2>

                <p className="mt-3 text-slate-600 leading-8">
                    Based on your selected investment amount and expected annual return,
                    here is an illustration of your potential wealth creation.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-2">

                    <div className="rounded-2xl bg-white p-6 shadow-sm border">
                        <h3 className="font-semibold text-green-700">
                            Initial Investment
                        </h3>

                        <p className="mt-3 text-3xl font-bold">
                            {formatCurrency(investment)}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm border">
                        <h3 className="font-semibold text-green-700">
                            Estimated Corpus
                        </h3>

                        <p className="mt-3 text-3xl font-bold">
                            {formatCurrency(maturity)}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm border">
                        <h3 className="font-semibold text-green-700">
                            Wealth Created
                        </h3>

                        <p className="mt-3 text-3xl font-bold text-green-700">
                            {formatCurrency(returns)}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm border">
                        <h3 className="font-semibold text-green-700">
                            Overall Growth
                        </h3>

                        <p className="mt-3 text-3xl font-bold text-green-700">
                            {wealthPercent}%
                        </p>
                    </div>

                </div>

                <div className="mt-10 rounded-2xl bg-green-700 p-8 text-white">

                    <h3 className="text-xl font-bold">
                        Key Takeaway
                    </h3>

                    <p className="mt-4 leading-8 text-green-50">
                        A one-time investment of{" "}
                        <strong>{formatCurrency(investment)}</strong>{" "}
                        growing at an assumed annual return of{" "}
                        <strong>{annualReturn}%</strong>{" "}
                        for{" "}
                        <strong>{years} years</strong>{" "}
                        may grow to approximately{" "}
                        <strong>{formatCurrency(maturity)}</strong>.
                        This illustration is for educational purposes only and actual
                        returns may vary depending on market performance.
                    </p>

                </div>

            </div>

        </section>
    );
}
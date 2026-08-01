import { BadgeCheck, Target, TrendingUp } from "lucide-react";

export default function About() {
    return (
        <section className="bg-white py-24">

            <div className="mx-auto max-w-7xl px-6">

                <h2 className="text-center text-4xl font-bold">
                    Why Choose Luxmi InvestCare
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-center text-slate-600">
                    We help investors pursue long-term financial goals through
                    disciplined investing, investor education and informed
                    decision-making.
                </p>

                <div className="mt-16 grid gap-8 md:grid-cols-3">

                    <div className="rounded-2xl border p-8 shadow-sm">
                        <BadgeCheck className="mb-5 h-10 w-10 text-green-700" />

                        <h3 className="text-xl font-bold">
                            Investor Education
                        </h3>

                        <p className="mt-3 text-slate-600">
                            We focus on investor awareness and financial literacy to help
                            investors make informed decisions.
                        </p>
                    </div>

                    <div className="rounded-2xl border p-8 shadow-sm">
                        <Target className="mb-5 h-10 w-10 text-green-700" />

                        <h3 className="text-xl font-bold">
                            Goal-Based Planning
                        </h3>

                        <p className="mt-3 text-slate-600">
                            Investments aligned with your long-term financial goals and
                            investment horizon.
                        </p>
                    </div>

                    <div className="rounded-2xl border p-8 shadow-sm">
                        <TrendingUp className="mb-5 h-10 w-10 text-green-700" />

                        <h3 className="text-xl font-bold">
                            Disciplined Investing
                        </h3>

                        <p className="mt-3 text-slate-600">
                            Encouraging consistent investing and long-term wealth creation
                            through investor education.
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
}
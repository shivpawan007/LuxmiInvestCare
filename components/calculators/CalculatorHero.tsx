"use client";

import { Calculator, ShieldCheck, TrendingUp } from "lucide-react";

export default function CalculatorHero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-emerald-900 py-24 text-white">

            {/* Background Effects */}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)]" />

            <div className="container-custom relative z-10">

                <div className="mx-auto max-w-4xl text-center">

                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur">

                        <Calculator className="h-5 w-5" />

                        Financial Planning Tools

                    </div>

                    <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-6xl">

                        Financial Calculators

                    </h1>

                    <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-green-100">

                        Explore our collection of educational financial calculators
                        designed to help you understand investment concepts, estimate
                        future values, and plan for long-term financial goals.

                    </p>

                    <div className="mt-12 flex flex-wrap justify-center gap-8">

                        <div className="flex items-center gap-3">

                            <ShieldCheck className="h-6 w-6 text-green-300" />

                            <span>Investor Education</span>

                        </div>

                        <div className="flex items-center gap-3">

                            <TrendingUp className="h-6 w-6 text-green-300" />

                            <span>Goal Planning</span>

                        </div>

                        <div className="flex items-center gap-3">

                            <Calculator className="h-6 w-6 text-green-300" />

                            <span>Interactive Calculators</span>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}
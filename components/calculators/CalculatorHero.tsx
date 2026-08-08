"use client";

import { Calculator, ShieldCheck, TrendingUp } from "lucide-react";

export default function CalculatorHero() {
    return (
        <section className="relative overflow-hidden bg-green-900 py-24 text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)]" />
            <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-green-700/30 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

            <div className="container-custom relative z-10">
                <div className="mx-auto max-w-4xl text-center">

                    <div className="inline-flex items-center gap-2 rounded-full border border-green-300/30 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur">
                        <Calculator className="h-5 w-5 text-green-300" />
                        Financial Planning Tools
                    </div>

                    <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-6xl">
                        Financial Calculators
                    </h1>

                    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-green-100 lg:text-xl">
                        Explore educational financial calculators designed to help
                        you understand investment concepts, estimate future values,
                        and plan for long-term financial goals.
                    </p>

                    <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm sm:text-base">

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
                            <span>Interactive Tools</span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

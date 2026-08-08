"use client";

import {
    Calculator,
    PiggyBank,
    Wallet,
    Target,
    GraduationCap,
    TrendingUp,
} from "lucide-react";

import CalculatorHero from "@/components/calculators/CalculatorHero";
import CalculatorCard from "@/components/calculators/CalculatorCard";

export default function CalculatorsPage() {
    return (
        <>
            <CalculatorHero />

            <section className="section bg-slate-50">
                <div className="container-custom">

                    {/* Section Heading */}
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
                            INVESTOR EDUCATION
                        </span>

                        <h2 className="section-title mt-6">
                            Plan Better.
                            <span className="block text-green-700">
                                Invest With Clarity.
                            </span>
                        </h2>

                        <p className="section-subtitle">
                            Use these educational calculators to explore how your
                            investment amount, time horizon and assumptions may
                            influence your financial planning.
                        </p>
                    </div>

                    {/* Calculator Grid */}
                    <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">

                        <CalculatorCard
                            title="SIP Calculator"
                            description="Estimate the potential future value of regular monthly SIP investments over your chosen investment period."
                            href="/calculators/sip"
                            icon={<Calculator className="h-8 w-8" />}
                            available={true}
                        />

                        <CalculatorCard
                            title="Lumpsum Calculator"
                            description="Explore the potential future value of a one-time investment based on your selected return assumption and time period."
                            href="/calculators/lumpsum"
                            icon={<PiggyBank className="h-8 w-8" />}
                            available={true}
                        />

                        <CalculatorCard
                            title="SWP Calculator"
                            description="Explore an illustrative systematic withdrawal scenario and see how withdrawals may affect the projected corpus."
                            href="/calculators/swp"
                            icon={<Wallet className="h-8 w-8" />}
                            available={true}
                        />

                        <CalculatorCard
                            title="Step-Up SIP"
                            description="Understand how increasing your SIP contribution periodically may influence your long-term investment projection."
                            href="/calculators/step-up-sip"
                            icon={<TrendingUp className="h-8 w-8" />}
                            available={true}
                        />

                        <CalculatorCard
                            title="Goal Planner"
                            description="Estimate the future cost of a financial goal and explore the illustrative investment requirement to work toward it."
                            href="/calculators/goal-planner"
                            icon={<Target className="h-8 w-8" />}
                            available={true}
                        />

                        <CalculatorCard
                            title="Child Education Planner"
                            description="Estimate a potential future education corpus and explore investment planning requirements."
                            href="/calculators/education"
                            icon={<GraduationCap className="h-8 w-8" />}
                            available={false}
                        />

                    </div>

                    {/* Educational Note */}
                    <div className="mt-20 rounded-3xl border border-green-200 bg-green-50 p-8 lg:p-10">

                        <div className="max-w-4xl">
                            <h2 className="text-2xl font-bold text-green-800">
                                Educational Disclaimer
                            </h2>

                            <p className="mt-4 leading-8 text-slate-700">
                                These calculators are provided for investor education
                                and illustration purposes only. Results are based on
                                the assumptions entered by the user and do not
                                guarantee future returns. Actual investment outcomes
                                may differ depending on market conditions and other
                                factors. Mutual Fund investments are subject to
                                market risks. Please read all scheme-related
                                documents carefully before investing.
                            </p>
                        </div>

                    </div>

                </div>
            </section>
        </>
    );
}

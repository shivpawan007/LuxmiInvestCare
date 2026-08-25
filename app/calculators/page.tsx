"use client";

import {
    Calculator,
    PiggyBank,
    Wallet,
    Target,
    GraduationCap,
    TrendingUp,
    BookOpen,
    ShieldCheck,
} from "lucide-react";

import CalculatorHero from "@/components/calculators/CalculatorHero";
import CalculatorCard from "@/components/calculators/CalculatorCard";

export default function CalculatorsPage() {
    return (
        <>
            <CalculatorHero />

            <section className="section bg-slate-50">
                <div className="container-custom">

                    {/* ==================================================
              SECTION HEADING
          ================================================== */}
                    <div className="mx-auto max-w-3xl text-center">

                        <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
                            INVESTOR EDUCATION
                        </span>

                        <h2 className="section-title mt-6">
                            Explore.
                            <span className="block text-green-700">
                                Learn. Calculate.
                            </span>
                        </h2>

                        <p className="section-subtitle">
                            Use these educational calculators to explore
                            illustrative investment values, inflation effects,
                            withdrawal scenarios and long-term planning
                            assumptions.
                        </p>

                    </div>

                    {/* ==================================================
              CALCULATOR GRID
          ================================================== */}
                    <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">

                        <CalculatorCard
                            title="SIP Calculator"
                            description="Estimate the illustrative future value of regular monthly SIP investments based on the assumptions you enter."
                            href="/calculators/sip"
                            icon={
                                <Calculator className="h-8 w-8" />
                            }
                            available={true}
                        />

                        <CalculatorCard
                            title="Lumpsum Calculator"
                            description="Explore the illustrative future value of a one-time investment using your selected return assumption and investment period."
                            href="/calculators/lumpsum"
                            icon={
                                <PiggyBank className="h-8 w-8" />
                            }
                            available={true}
                        />

                        <CalculatorCard
                            title="SWP Calculator"
                            description="Explore an illustrative systematic withdrawal scenario and understand how withdrawals may affect the projected corpus."
                            href="/calculators/swp"
                            icon={
                                <Wallet className="h-8 w-8" />
                            }
                            available={true}
                        />

                        <CalculatorCard
                            title="Step-Up SIP"
                            description="Explore how periodically increasing a SIP contribution may affect an illustrative long-term investment projection."
                            href="/calculators/step-up-sip"
                            icon={
                                <TrendingUp className="h-8 w-8" />
                            }
                            available={true}
                        />

                        <CalculatorCard
                            title="Goal Planner"
                            description="Estimate the future cost of a selected financial goal and explore illustrative SIP or one-time investment requirements."
                            href="/calculators/goal-planner"
                            icon={
                                <Target className="h-8 w-8" />
                            }
                            available={true}
                        />

                        <CalculatorCard
                            title="Child Education Planner"
                            description="Estimate the illustrative future cost of education and explore monthly SIP or one-time investment requirements."
                            href="/calculators/education"
                            icon={
                                <GraduationCap className="h-8 w-8" />
                            }
                            available={true}
                        />

                    </div>

                    {/* ==================================================
              EDUCATIONAL NOTE
          ================================================== */}
                    <div className="mt-14 grid gap-6 lg:grid-cols-2">

                        <div className="rounded-3xl border border-green-200 bg-green-50 p-8 lg:p-10">

                            <div className="flex items-start gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                    <BookOpen className="h-6 w-6" />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-green-800">
                                        Learn something new every day
                                    </h2>

                                    <p className="mt-4 leading-8 text-slate-700">
                                        These calculators are designed to help
                                        investors understand the effect of
                                        investment amount, time, inflation,
                                        withdrawals and assumed returns through
                                        simple illustrations.
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">

                            <div className="flex items-start gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        Educational Disclaimer
                                    </h2>

                                    <p className="mt-4 leading-8 text-slate-700">
                                        These calculators are provided for investor
                                        education and illustration purposes only.
                                        Results are based on the assumptions entered
                                        by the user and do not guarantee future
                                        returns. Actual outcomes may differ.
                                        Mutual Fund investments are subject to
                                        market risks. Please read all scheme-related
                                        documents carefully before investing.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>
        </>
    );
}
"use client";

import {
    Calculator,
    Landmark,
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

                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                        <CalculatorCard
                            title="SIP Calculator"
                            description="Estimate the future value of your monthly SIP investments."
                            href="/calculators/sip"
                            icon={<Calculator className="h-8 w-8" />}
                        />

                        <CalculatorCard
                            title="Lumpsum Calculator"
                            description="Estimate future value of one-time investments."
                            href="/calculators/lumpsum"
                            icon={<PiggyBank className="h-8 w-8" />}
                            available={false}
                        />

                        <CalculatorCard
                            title="SWP Calculator"
                            description="Estimate systematic withdrawal plans."
                            href="/calculators/swp"
                            icon={<Wallet className="h-8 w-8" />}
                            available={false}
                        />

                        <CalculatorCard
                            title="Step-Up SIP"
                            description="Increase your SIP every year to build more wealth."
                            href="/calculators/step-up-sip"
                            icon={<TrendingUp className="h-8 w-8" />}
                            available={false}
                        />

                        <CalculatorCard
                            title="Goal Planner"
                            description="Plan investments for your financial goals."
                            href="/calculators/goal-planner"
                            icon={<Target className="h-8 w-8" />}
                            available={false}
                        />

                        <CalculatorCard
                            title="Child Education Planner"
                            description="Estimate future education corpus."
                            href="/calculators/education"
                            icon={<GraduationCap className="h-8 w-8" />}
                            available={false}
                        />

                    </div>

                    <div className="mt-20 rounded-3xl border border-green-200 bg-green-50 p-8">

                        <h2 className="text-2xl font-bold text-green-800">

                            Educational Disclaimer

                        </h2>

                        <p className="mt-4 leading-8 text-slate-700">

                            These calculators are provided for investor education and
                            illustration purposes only. Results are based on the
                            assumptions entered by the user and do not guarantee future
                            returns. Mutual Fund investments are subject to market risks.
                            Please read all scheme-related documents carefully before
                            investing.

                        </p>

                    </div>

                </div>

            </section>
        </>
    );
}
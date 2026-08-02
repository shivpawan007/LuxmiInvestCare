"use client";

import { motion } from "framer-motion";
import {
    BookOpen,
    PiggyBank,
    TrendingUp,
    Target,
    ShieldCheck,
    Landmark,
} from "lucide-react";

const items = [
    {
        title: "Start SIP Early",
        description:
            "Small monthly investments started early can help create wealth through disciplined investing.",
        icon: PiggyBank,
    },
    {
        title: "Power of Compounding",
        description:
            "Time and discipline are two important factors that may benefit long-term investors.",
        icon: TrendingUp,
    },
    {
        title: "Goal Based Investing",
        description:
            "Invest with clear financial goals like retirement, education and wealth creation.",
        icon: Target,
    },
    {
        title: "Understand Risk",
        description:
            "Every investment carries market risk. Select investments according to your financial profile.",
        icon: ShieldCheck,
    },
    {
        title: "Asset Allocation",
        description:
            "Diversification across different asset classes may help manage portfolio risk.",
        icon: Landmark,
    },
    {
        title: "Investor Awareness",
        description:
            "Knowledge helps investors make informed financial decisions with confidence.",
        icon: BookOpen,
    },
];

export default function InvestorEducation() {
    return (
        <section
            id="investor-education"
            className="bg-white py-24"
        >
            <div className="mx-auto max-w-7xl px-6">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .6 }}
                    className="mx-auto max-w-3xl text-center"
                >

                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        Investor Education
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900">
                        Learn Before You Invest
                    </h2>

                    <p className="mt-5 text-lg text-slate-600">
                        Investor education enables individuals to understand financial
                        products, investment risks and disciplined investing.
                    </p>

                </motion.div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {items.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: .5,
                                    delay: index * .08,
                                }}
                                className="rounded-3xl border bg-white p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
                            >

                                <div className="mb-5 inline-flex rounded-2xl bg-green-100 p-4">
                                    <Icon className="h-8 w-8 text-green-700" />
                                </div>

                                <h3 className="text-xl font-bold">
                                    {item.title}
                                </h3>

                                <p className="mt-4 text-slate-600 leading-7">
                                    {item.description}
                                </p>

                            </motion.div>

                        );

                    })}

                </div>

                <div className="mt-16 rounded-3xl bg-green-700 p-10 text-center">

                    <h3 className="text-3xl font-bold text-white">
                        Mutual Fund Investor Awareness
                    </h3>

                    <p className="mx-auto mt-4 max-w-4xl text-lg text-green-100">
                        Mutual Fund investments are subject to market risks.
                        Read all scheme related documents carefully before investing.
                        Investment decisions should be based on your financial goals,
                        investment horizon and risk appetite.
                    </p>

                </div>

            </div>
        </section>
    );
}
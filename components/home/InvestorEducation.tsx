"use client";

import { motion } from "framer-motion";
import {
    BookOpen,
    TrendingUp,
    PiggyBank,
    PieChart,
    ShieldCheck,
    Target,
} from "lucide-react";

const educationTopics = [
    {
        icon: BookOpen,
        title: "Start Early",
        description:
            "Beginning your investment journey early allows more time for disciplined investing and long-term financial growth.",
    },
    {
        icon: TrendingUp,
        title: "Stay Invested",
        description:
            "Long-term investing can help investors navigate market fluctuations more effectively than reacting to short-term movements.",
    },
    {
        icon: PiggyBank,
        title: "SIP Discipline",
        description:
            "Systematic Investment Plans encourage regular investing and help build disciplined financial habits over time.",
    },
    {
        icon: PieChart,
        title: "Diversification",
        description:
            "Diversifying investments across suitable asset classes may help manage overall portfolio risk.",
    },
    {
        icon: ShieldCheck,
        title: "Understand Risk",
        description:
            "Every investment carries risk. Understanding your financial goals and risk profile is an important step before investing.",
    },
    {
        icon: Target,
        title: "Goal-Based Investing",
        description:
            "Align investments with specific life goals such as retirement, education or wealth creation through a disciplined approach.",
    },
];

export default function InvestorEducation() {
    return (
        <section
            id="investor-education"
            className="section bg-soft"
        >
            <div className="container-custom">

                {/* Section Heading */}

                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-20 max-w-3xl text-center"
                >

                    <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-semibold text-green-700 shadow-sm">
                        INVESTOR EDUCATION
                    </span>

                    <h2 className="section-title mt-8">
                        Invest First In
                        <span className="block text-green-700">
                            Financial Knowledge
                        </span>
                    </h2>

                    <p className="section-subtitle mx-auto">
                        Financial awareness helps investors make informed decisions.
                        Understanding investing principles is an important step toward
                        pursuing long-term financial goals.
                    </p>

                </motion.div>

                {/* Education Cards */}

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {educationTopics.map((topic, index) => {
                        const Icon = topic.icon;

                        return (
                            <motion.div
                                key={topic.title}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                                className="card flex h-full flex-col p-8"
                            >
                                {/* Icon */}

                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">

                                    <Icon className="h-8 w-8 text-green-700" />

                                </div>

                                {/* Title */}

                                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                                    {topic.title}
                                </h3>

                                {/* Description */}

                                <p className="flex-1 leading-7 text-slate-600">
                                    {topic.description}
                                </p>

                            </motion.div>
                        );
                    })}

                </div>

                {/* Investor Awareness Banner */}

                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-24"
                >

                    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-12 text-white shadow-xl">

                        <div className="grid items-center gap-10 lg:grid-cols-2">

                            {/* Left */}

                            <div>

                                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                                    INVESTOR AWARENESS
                                </span>

                                <h3 className="mt-6 text-4xl font-bold leading-tight">
                                    Knowledge Today.
                                    <span className="block">
                                        Confidence Tomorrow.
                                    </span>
                                </h3>

                                <p className="mt-6 text-lg leading-8 text-green-50">
                                    Successful investing is driven by informed decisions,
                                    financial discipline and patience—not by reacting to
                                    short-term market movements.
                                </p>

                            </div>

                            {/* Right */}

                            <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">

                                <h4 className="mb-5 text-2xl font-bold">
                                    Investor Reminder
                                </h4>

                                <ul className="space-y-4 text-green-50">

                                    <li>• Define your financial goals before investing.</li>

                                    <li>• Review your investments periodically.</li>

                                    <li>• Stay invested for the long term whenever appropriate.</li>

                                    <li>• Understand the risks before making investment decisions.</li>

                                    <li>• Seek guidance whenever you need clarity.</li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </motion.div>

                {/* Disclaimer */}

                <motion.div
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 rounded-2xl border border-green-200 bg-green-50 p-8"
                >

                    <h4 className="mb-4 text-xl font-bold text-green-800">
                        Investor Education Disclaimer
                    </h4>

                    <p className="leading-8 text-slate-700">
                        This information is provided solely for investor education and
                        awareness purposes. Mutual Fund investments are subject to market
                        risks. Please read all scheme-related documents carefully before
                        investing. Past performance may or may not be sustained in the
                        future and should not be used as the sole basis for investment
                        decisions.
                    </p>

                </motion.div>

            </div>
        </section>
    );
}
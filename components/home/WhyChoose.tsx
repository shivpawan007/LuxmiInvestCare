"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck,
    Target,
    GraduationCap,
    TrendingUp,
    Handshake,
    HeartHandshake,
} from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Trusted Guidance",
        description:
            "Investment guidance focused on transparency, investor awareness and long-term financial discipline.",
    },
    {
        icon: Target,
        title: "Goal-Based Planning",
        description:
            "Investment planning aligned with your financial goals, time horizon and individual priorities.",
    },
    {
        icon: GraduationCap,
        title: "Investor Education",
        description:
            "Educational support that helps investors understand products, risks and long-term investing principles.",
    },
    {
        icon: TrendingUp,
        title: "Disciplined Investing",
        description:
            "Encouraging systematic investing habits that support long-term wealth creation objectives.",
    },
    {
        icon: Handshake,
        title: "Transparent Approach",
        description:
            "Clear communication and an investor-first approach to help you make informed financial decisions.",
    },
    {
        icon: HeartHandshake,
        title: "Personalized Support",
        description:
            "Guidance tailored to your financial goals while respecting your risk profile and investment journey.",
    },
];

export default function WhyChoose() {
    return (
        <section
            id="why-choose"
            className="section bg-soft"
        >
            <div className="container-custom">

                {/* Heading */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-20 max-w-3xl text-center"
                >

                    <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-semibold text-green-700 shadow-sm">
                        WHY CHOOSE LUXMI INVESTCARE
                    </span>

                    <h2 className="section-title mt-8">
                        Helping You Invest With
                        <span className="block text-green-700">
                            Confidence & Discipline
                        </span>
                    </h2>

                    <p className="section-subtitle mx-auto">
                        Our focus is to simplify investing through education,
                        transparency and disciplined financial planning,
                        empowering investors to pursue their long-term goals.
                    </p>

                </motion.div>

                {/* Feature Cards */}

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                                className="card p-8"
                            >
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">

                                    <Icon className="h-8 w-8 text-green-700" />

                                </div>

                                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                                    {feature.title}
                                </h3>

                                <p className="leading-7 text-slate-600">
                                    {feature.description}
                                </p>

                            </motion.div>
                        );
                    })}
                </div>

                {/* Our Commitment */}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-24"
                >

                    <div className="card bg-gradient-to-r from-green-700 to-emerald-600 p-12 text-white">

                        <div className="grid items-center gap-10 lg:grid-cols-2">

                            <div>

                                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                                    OUR COMMITMENT
                                </span>

                                <h3 className="mt-6 text-4xl font-bold leading-tight">
                                    Building Investor Confidence Through
                                    <span className="block">
                                        Education & Transparency
                                    </span>
                                </h3>

                            </div>

                            <div>

                                <p className="text-lg leading-8 text-green-50">
                                    Every investor's journey is unique. Our commitment is to
                                    encourage informed decision-making through investor
                                    education, disciplined investing, and goal-oriented
                                    financial planning while maintaining transparency at every
                                    step.
                                </p>

                            </div>

                        </div>

                    </div>

                </motion.div>

            </div>
        </section>
    );
}
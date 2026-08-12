"use client";

import { motion } from "framer-motion";
import {
    Landmark,
    PiggyBank,
    Target,
    GraduationCap,
    ClipboardCheck,
    BriefcaseBusiness,
} from "lucide-react";

const services = [
    {
        icon: Landmark,
        title: "Mutual Funds",
        description:
            "Helping investors build diversified portfolios aligned with their long-term financial goals and risk profile.",
    },
    {
        icon: PiggyBank,
        title: "SIP Planning",
        description:
            "Encouraging disciplined investing through Systematic Investment Plans for long-term wealth creation.",
    },
    {
        icon: Target,
        title: "Goal-Based Planning",
        description:
            "Investment guidance for retirement, children's education, wealth creation and other financial milestones.",
    },
    {
        icon: GraduationCap,
        title: "Investor Education",
        description:
            "Educational support to help investors understand mutual funds, investment risks and financial planning concepts.",
    },
    {
        icon: ClipboardCheck,
        title: "Portfolio Review",
        description:
            "Periodic portfolio reviews to ensure investments remain aligned with evolving financial objectives.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Financial Guidance",
        description:
            "Transparent financial guidance focused on disciplined investing and informed decision-making.",
    },
];

export default function Services() {
    return (
        <section
            id="services"
            className="section bg-white"
        >
            <div className="container-custom">

                {/* Section Heading */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-20 max-w-3xl text-center"
                >

                    <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-semibold text-green-700 shadow-sm">
                        OUR SERVICES
                    </span>

                    <h2 className="section-title mt-8">
                        Helping You Build Wealth
                        <span className="block text-green-700">
                            Through Financial Discipline
                        </span>
                    </h2>

                    <p className="section-subtitle mx-auto">
                        Our services are designed to support investors through education,
                        disciplined investing and goal-oriented financial planning while
                        encouraging informed investment decisions.
                    </p>

                </motion.div>

                {/* Service Cards */}

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 40 }}
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
                                    {service.title}
                                </h3>

                                {/* Description */}

                                <p className="flex-1 leading-7 text-slate-600">
                                    {service.description}
                                </p>

                                {/* Learn More */}

                                <button
                                    className="mt-8 inline-flex items-center font-semibold text-green-700 transition hover:text-green-800"
                                >
                                    Learn More →

                                </button>

                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-24"
                >

                    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-12 text-white shadow-xl">

                        <div className="grid items-center gap-10 lg:grid-cols-2">

                            <div>

                                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                                    START YOUR INVESTMENT JOURNEY
                                </span>

                                <h3 className="mt-6 text-4xl font-bold leading-tight">
                                    Build Financial Confidence
                                    <span className="block">
                                        Through Disciplined Investing
                                    </span>
                                </h3>

                                <p className="mt-6 text-lg leading-8 text-green-50">
                                    We believe every investment journey begins with education,
                                    planning and disciplined decision-making. Explore investment
                                    solutions that align with your financial goals and risk profile.
                                </p>

                            </div>

                            <div className="flex flex-col items-start gap-5 lg:items-end">

                                <a
                                    href="https://wa.me/919650060044"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-xl bg-white px-8 py-4 font-semibold text-green-700 transition hover:bg-green-50"
                                >
                                    Get Started on WhatsApp
                                </a>

                                <p className="max-w-sm text-right text-sm text-green-100 lg:text-base">
                                    Mutual Fund investments are subject to market risks.
                                    Please read all scheme-related documents carefully before
                                    investing.
                                </p>

                            </div>

                        </div>

                    </div>

                </motion.div>

            </div>
        </section>
    );
}
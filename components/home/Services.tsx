"use client";

import { motion } from "framer-motion";
import {
    Landmark,
    PiggyBank,
    ShieldCheck,
    HeartPulse,
    GraduationCap,
    Target,
    LineChart,
    ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

const services = [
    {
        title: "Mutual Funds",
        description:
            "Diversified mutual fund solutions including SIP, Lumpsum and ELSS investments.",
        icon: Landmark,
    },
    {
        title: "SIP Planning",
        description:
            "Build long-term wealth through disciplined monthly investments aligned with your financial goals.",
        icon: PiggyBank,
    },
    {
        title: "Life Insurance",
        description:
            "Financial protection for your family with comprehensive life insurance solutions.",
        icon: ShieldCheck,
    },
    {
        title: "Health Insurance",
        description:
            "Protect yourself and your family against rising medical expenses.",
        icon: HeartPulse,
    },
    {
        title: "Child Education Planning",
        description:
            "Create a secure financial future for your child's education and aspirations.",
        icon: GraduationCap,
    },
    {
        title: "Retirement Planning",
        description:
            "Plan today for a financially independent and comfortable retirement.",
        icon: Target,
    },
    {
        title: "Portfolio Review",
        description:
            "Professional review of your existing investments to optimize performance.",
        icon: LineChart,
    },
    {
        title: "Goal-Based Investing",
        description:
            "Customized investment strategies for every important financial milestone.",
        icon: ArrowRight,
    },
];

export default function Services() {
    return (
        <section
            id="services"
            className="bg-slate-50 py-24"
        >
            <div className="mx-auto max-w-7xl px-6">
                {/* Heading */}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <span className="rounded-full bg-green-100 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-green-700">
                        Our Services
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
                        Investment Solutions
                        <span className="block text-green-700">
                            For Every Financial Goal
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        Luxmi InvestCare offers personalized financial solutions designed
                        to help investors build wealth, protect their families and achieve
                        long-term financial goals.
                    </p>
                </motion.div>

                {/* Cards */}

                <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.08,
                                }}
                                whileHover={{ y: -8 }}
                                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-green-600 hover:shadow-2xl"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 transition-colors duration-300 group-hover:bg-green-700">
                                    <Icon className="h-8 w-8 text-green-700 transition-colors duration-300 group-hover:text-white" />
                                </div>

                                <h3 className="mt-8 text-xl font-bold text-slate-900">
                                    {service.title}
                                </h3>

                                <p className="mt-4 text-slate-600 leading-7">
                                    {service.description}
                                </p>

                                <Button
                                    variant="outline"
                                    className="mt-8 w-full rounded-xl border-green-600 text-green-700 hover:bg-green-700 hover:text-white"
                                >
                                    Learn More
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-12 text-center text-white shadow-xl"
                >
                    <h3 className="text-3xl font-bold">
                        Start Your Wealth Creation Journey Today
                    </h3>

                    <p className="mx-auto mt-4 max-w-2xl text-green-50">
                        Whether you are planning for retirement, your child's education,
                        wealth creation or financial protection, Luxmi InvestCare is here
                        to guide you every step of the way.
                    </p>

                    <Button
                        className="mt-8 rounded-xl bg-white px-8 py-6 text-green-700 hover:bg-slate-100"
                    >
                        Schedule a Free Consultation
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
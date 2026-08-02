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
            "Invest in diversified mutual fund schemes through SIPs or lump sum investments to build long-term wealth.",
        icon: Landmark,
    },
    {
        title: "SIP Planning",
        description:
            "Create wealth systematically through disciplined monthly investments aligned with your financial goals.",
        icon: PiggyBank,
    },
    {
        title: "Life Insurance",
        description:
            "Protect your family's financial future with comprehensive life insurance solutions.",
        icon: ShieldCheck,
    },
    {
        title: "Health Insurance",
        description:
            "Safeguard your loved ones against rising medical expenses with quality health insurance plans.",
        icon: HeartPulse,
    },
    {
        title: "Child Education Planning",
        description:
            "Plan today for your child's higher education and future aspirations through smart investments.",
        icon: GraduationCap,
    },
    {
        title: "Retirement Planning",
        description:
            "Build a financially independent retirement with long-term investment planning.",
        icon: Target,
    },
    {
        title: "Portfolio Review",
        description:
            "Get professional insights on your existing investment portfolio and optimize performance.",
        icon: LineChart,
    },
    {
        title: "Goal-Based Investing",
        description:
            "Personalized investment strategies for buying a home, wealth creation, retirement and more.",
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
                    initial={{ opacity: 0, y: 30 }}
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
                        Luxmi InvestCare offers comprehensive financial solutions
                        designed to help individuals and families build wealth,
                        protect their future and achieve every important financial
                        milestone.
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
                                    delay: index * 0.08,
                                    duration: 0.5,
                                }}
                                whileHover={{
                                    y: -8,
                                }}
                                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-green-600 hover:shadow-2xl"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 transition group-hover:bg-green-700">
                                    <Icon className="h-8 w-8 text-green-700 transition group-hover:text-white" />
                                </div>

                                <h3 className="mt-8 text-xl font-bold text-slate-900">
                                    {service.title}
                                </h3>

                                <p className="mt-4 leading-7 text-slate-600">
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
            </div>
        </section>
    );
}
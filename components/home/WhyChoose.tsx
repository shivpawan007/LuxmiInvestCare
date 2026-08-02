"use client";

import { motion } from "framer-motion";
import {
    BadgeCheck,
    Target,
    GraduationCap,
    Handshake,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

import SectionHeading from "@/components/common/SectionHeading";
import FeatureCard from "@/components/common/FeatureCard";

const features = [
    {
        icon: BadgeCheck,
        title: "AMFI Registered",
        description:
            "Guidance offered through an AMFI Registered Mutual Fund Distributor with a focus on investor awareness and disciplined investing.",
    },
    {
        icon: Target,
        title: "Goal-Based Investing",
        description:
            "Investment planning aligned with life goals such as retirement, child education, wealth creation and financial independence.",
    },
    {
        icon: GraduationCap,
        title: "Investor Education",
        description:
            "We believe informed investors make better decisions. Educational guidance remains central to every recommendation.",
    },
    {
        icon: Handshake,
        title: "Personalized Guidance",
        description:
            "Every investor has different financial objectives. Solutions are discussed based on individual needs and long-term goals.",
    },
    {
        icon: ShieldCheck,
        title: "Transparent Process",
        description:
            "Clear communication, ethical practices and long-term relationships built on trust and transparency.",
    },
    {
        icon: TrendingUp,
        title: "Long-Term Wealth Creation",
        description:
            "Focus on disciplined investing and periodic portfolio review to support long-term financial well-being.",
    },
];

export default function WhyChoose() {
    return (
        <section
            id="why-choose"
            className="bg-white py-24"
        >
            <div className="mx-auto max-w-7xl px-6">

                <SectionHeading
                    badge="Why Choose Us"
                    title="Why Investors Choose"
                    highlight="Luxmi InvestCare"
                    description="Helping investors pursue long-term financial goals through disciplined investing, investor education and a transparent advisory approach."
                />

                <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.08,
                            }}
                        >
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        </motion.div>
                    ))}

                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 p-10 lg:p-14"
            >
                <div className="grid items-center gap-10 lg:grid-cols-2">

                    <div>
                        <h3 className="text-3xl font-bold text-white lg:text-4xl">
                            Your Financial Goals Deserve
                            <span className="block text-yellow-300">
                                A Disciplined Investment Approach
                            </span>
                        </h3>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-green-50">
                            We believe successful investing starts with clear goals,
                            disciplined investing and continuous investor education.
                            Our focus is to help investors make informed financial
                            decisions aligned with their long-term objectives.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">

                            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white">
                                ✓ AMFI Registered
                            </span>

                            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white">
                                ✓ Goal Based Planning
                            </span>

                            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white">
                                ✓ Investor Education
                            </span>

                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-xl">

                        <h4 className="text-2xl font-bold text-slate-900">
                            Why Choose Luxmi InvestCare?
                        </h4>

                        <div className="mt-6 space-y-4">

                            <div className="flex items-start gap-3">
                                <BadgeCheck className="mt-1 h-5 w-5 text-green-700" />
                                <p className="text-slate-600">
                                    Educational approach towards financial planning.
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <BadgeCheck className="mt-1 h-5 w-5 text-green-700" />
                                <p className="text-slate-600">
                                    Disciplined SIP and long-term investing guidance.
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <BadgeCheck className="mt-1 h-5 w-5 text-green-700" />
                                <p className="text-slate-600">
                                    Personalized discussions based on your financial goals.
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <BadgeCheck className="mt-1 h-5 w-5 text-green-700" />
                                <p className="text-slate-600">
                                    Commitment to transparency and investor awareness.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}
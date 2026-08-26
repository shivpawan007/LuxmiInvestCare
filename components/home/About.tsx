"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    CheckCircle2,
    Target,
    Eye,
    TrendingUp,
    ShieldCheck,
    GraduationCap,
} from "lucide-react";

const features = [
    "Investor Education & Awareness",
    "Systematic Investment Plan (SIP) Education",
    "Investment Product Information",
    "Disciplined Investing Approach",
];

export default function About() {
    return (
        <section
            id="about"
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
                        ABOUT LUXMI INVESTCARE
                    </span>

                    <h2 className="section-title mt-8">
                        Helping Investors Understand
                        <span className="block text-green-700">
                            Investing With Clarity
                        </span>
                    </h2>

                    <p className="section-subtitle mx-auto">
                        Luxmi InvestCare focuses on investor education,
                        investment product information and disciplined
                        investing to help individuals and families make
                        informed decisions.
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Left Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <div className="image-card">

                            <Image
                                src="/images/about.jpg"
                                alt="About Luxmi InvestCare"
                                width={700}
                                height={650}
                                className="w-full object-cover"
                                priority
                            />

                        </div>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="mb-6 text-3xl font-bold text-slate-900">
                            Building Investor Awareness Through
                            <span className="block text-green-700">
                                Education & Transparency
                            </span>
                        </h3>

                        <p className="mb-8 text-lg leading-8 text-slate-600">
                            At <strong>Luxmi InvestCare</strong>, we believe
                            informed investing begins with understanding.
                            Our approach focuses on investor education,
                            product information, disciplined investing and
                            awareness of investment risks.
                        </p>

                        {/* Feature List */}
                        <div className="space-y-5">
                            {features.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-4"
                                >
                                    <CheckCircle2 className="h-6 w-6 text-green-600" />

                                    <span className="text-lg font-medium text-slate-700">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>

                {/* Statistics Section */}
                <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="card p-8 text-center"
                    >
                        <TrendingUp className="mx-auto mb-5 h-12 w-12 text-green-600" />

                        <h4 className="text-xl font-bold text-slate-900">
                            Investment
                        </h4>

                        <p className="mt-2 text-slate-600">
                            Information
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="card p-8 text-center"
                    >
                        <GraduationCap className="mx-auto mb-5 h-12 w-12 text-green-600" />

                        <h4 className="text-xl font-bold text-slate-900">
                            Investor
                        </h4>

                        <p className="mt-2 text-slate-600">
                            Education
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="card p-8 text-center"
                    >
                        <ShieldCheck className="mx-auto mb-5 h-12 w-12 text-green-600" />

                        <h4 className="text-xl font-bold text-slate-900">
                            Disciplined
                        </h4>

                        <p className="mt-2 text-slate-600">
                            Investing
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="card p-8 text-center"
                    >
                        <Target className="mx-auto mb-5 h-12 w-12 text-green-600" />

                        <h4 className="text-xl font-bold text-slate-900">
                            Long-Term
                        </h4>

                        <p className="mt-2 text-slate-600">
                            Investing
                        </p>
                    </motion.div>

                </div>

                {/* Vision & Mission */}
                <div className="mt-24 grid gap-10 lg:grid-cols-2">

                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="card p-10"
                    >
                        <Eye className="mb-5 h-12 w-12 text-green-600" />

                        <h3 className="mb-4 text-2xl font-bold text-slate-900">
                            Our Vision
                        </h3>

                        <p className="leading-8 text-slate-600">
                            To empower individuals and families with financial
                            knowledge and disciplined investing practices that
                            help them understand investment products and pursue
                            long-term financial well-being.
                        </p>
                    </motion.div>

                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="card p-10"
                    >
                        <Target className="mb-5 h-12 w-12 text-green-600" />

                        <h3 className="mb-4 text-2xl font-bold text-slate-900">
                            Our Mission
                        </h3>

                        <p className="leading-8 text-slate-600">
                            To simplify investing through investor education,
                            transparency, product information and awareness
                            of investment risks while encouraging disciplined
                            financial habits.
                        </p>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
"use client";

import { motion } from "framer-motion";
import {
    BookOpen,
    ShieldCheck,
    FileText,
    MessageCircle,
} from "lucide-react";

const educationPoints = [
    {
        icon: BookOpen,
        title: "Investor Education",
        description:
            "Learn about mutual funds, SIPs, investment terminology, market risks and long-term investing concepts.",
    },
    {
        icon: FileText,
        title: "Product Information",
        description:
            "Understand product features, assumptions, documents and information that investors should review before investing.",
    },
    {
        icon: ShieldCheck,
        title: "Risk Awareness",
        description:
            "Every investment carries risk. We encourage investors to understand product and market risks before investing.",
    },
    {
        icon: MessageCircle,
        title: "Investor Support",
        description:
            "Receive general information and support for understanding investment illustrations and investor documentation.",
    },
];

export default function InvestorEducationApproach() {
    return (
        <section id="investor-education-approach" className="section bg-white">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-16 max-w-3xl text-center"
                >
                    <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-semibold text-green-700">
                        INVESTOR EDUCATION APPROACH
                    </span>

                    <h2 className="section-title mt-8">
                        Clear Information.
                        <span className="block text-green-700">
                            Transparent Communication.
                        </span>
                    </h2>

                    <p className="section-subtitle mx-auto">
                        Our public resources focus on investor education,
                        mutual fund product information, risk awareness and
                        general investor support.
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {educationPoints.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.08,
                                }}
                                viewport={{ once: true }}
                                className="card h-full p-8"
                            >
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                    <Icon className="h-7 w-7" />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900">
                                    {item.title}
                                </h3>

                                <p className="mt-4 leading-7 text-slate-600">
                                    {item.description}
                                </p>
                            </motion.article>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-10 text-white shadow-xl lg:p-12">
                        <div className="grid items-center gap-8 lg:grid-cols-2">
                            <div>
                                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                                    INVESTOR FIRST
                                </span>

                                <h3 className="mt-6 text-3xl font-bold leading-tight lg:text-4xl">
                                    Understand Before You Invest
                                </h3>

                                <p className="mt-5 text-lg leading-8 text-green-50">
                                    Explore educational resources and product
                                    information, understand assumptions and
                                    review relevant risks before making an
                                    investment decision.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 p-7 backdrop-blur-sm">
                                <h4 className="text-xl font-bold">
                                    Our Public Information Focus
                                </h4>

                                <ul className="mt-5 space-y-3 text-green-50">
                                    <li>✓ Mutual Fund Investor Education</li>
                                    <li>✓ Product Information</li>
                                    <li>✓ Risk Awareness</li>
                                    <li>✓ Transparent Communication</li>
                                    <li>✓ Investor Support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-7">
                    <h4 className="text-lg font-bold text-amber-800">
                        Investor Education Disclaimer
                    </h4>
                    <p className="mt-3 leading-7 text-slate-700">
                        This section contains general investor education and
                        information. It does not make performance promises or
                        guarantees about future outcomes.
                    </p>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import {
    Landmark,
    PiggyBank,
    ShieldCheck,
    GraduationCap,
    HeartPulse,
    Users,
} from "lucide-react";

const services = [
    {
        icon: Landmark,
        title: "Mutual Funds",
        description:
            "Information and investor education about mutual fund products, investment concepts, market risks and factors investors may consider before investing.",
    },
    {
        icon: PiggyBank,
        title: "SIP Investments",
        description:
            "Educational support to help investors understand Systematic Investment Plans, regular investing and the effect of contribution amount and investment period.",
    },
    {
        icon: ShieldCheck,
        title: "Life Insurance",
        description:
            "Information about life insurance products and the role of insurance in protecting family financial needs.",
    },
    {
        icon: HeartPulse,
        title: "Health Insurance",
        description:
            "Information about health insurance products, coverage considerations and the importance of understanding policy terms and conditions.",
    },
    {
        icon: GraduationCap,
        title: "Investor Education",
        description:
            "Educational resources covering mutual funds, SIPs, inflation, market risks, investment terminology and basic investing concepts.",
    },
    {
        icon: Users,
        title: "Investor Support",
        description:
            "General support for understanding product information, illustrations, application processes and investor-related documentation.",
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
                        Information. Education.
                        <span className="block text-green-700">
                            Investor Support.
                        </span>
                    </h2>

                    <p className="section-subtitle mx-auto">
                        Explore mutual funds, SIP investments, insurance
                        information and investor education resources designed
                        to help investors understand products, risks and
                        investing concepts.
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
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
                                    <Icon className="h-8 w-8 text-green-700" />
                                </div>

                                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                                    {service.title}
                                </h3>

                                <p className="flex-1 leading-7 text-slate-600">
                                    {service.description}
                                </p>

                                <a
                                    href="/contact"
                                    className="mt-8 inline-flex items-center font-semibold text-green-700 transition hover:text-green-800"
                                >
                                    Learn More →
                                </a>
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
                                    INVESTOR EDUCATION & SUPPORT
                                </span>

                                <h3 className="mt-6 text-4xl font-bold leading-tight">
                                    Understand Before You Invest
                                    <span className="block">
                                        Through Education & Information
                                    </span>
                                </h3>

                                <p className="mt-6 text-lg leading-8 text-green-50">
                                    We believe informed investing begins with
                                    understanding. Explore product information,
                                    investor education resources and interactive
                                    illustrations to build greater awareness of
                                    investing concepts and risks.
                                </p>

                            </div>

                            <div className="flex flex-col items-start gap-5 lg:items-end">

                                <a
                                    href="/contact"
                                    className="rounded-xl bg-white px-8 py-4 font-semibold text-green-700 transition hover:bg-green-50"
                                >
                                    Contact Us
                                </a>

                                <a
                                    href="https://wa.me/919650060044"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/15"
                                >
                                    Get Information on WhatsApp
                                </a>

                                <p className="max-w-sm text-right text-sm text-green-100 lg:text-base">
                                    Mutual Fund investments are subject to
                                    market risks. Please read all
                                    scheme-related documents carefully before
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
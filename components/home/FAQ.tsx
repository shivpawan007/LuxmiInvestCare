"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What is a Mutual Fund?",
        answer:
            "A Mutual Fund pools money from multiple investors and invests it in a portfolio of securities managed according to the scheme objectives. Investors should understand the scheme objective, risks and investment strategy before investing.",
    },
    {
        question: "Why do investors use SIPs?",
        answer:
            "A Systematic Investment Plan (SIP) encourages regular investing. It can help investors build disciplined investing habits and participate in the market over time.",
    },
    {
        question: "Can I stop or pause my SIP?",
        answer:
            "Most SIPs may be paused or discontinued subject to the terms and processes of the respective mutual fund scheme. Investors should understand the implications before making changes.",
    },
    {
        question: "Are Mutual Funds risky?",
        answer:
            "Every investment carries risk. The level and type of risk can vary depending on the mutual fund scheme and its underlying investments. Investors should understand the relevant risks before investing.",
    },
    {
        question: "What should I consider before investing in a Mutual Fund?",
        answer:
            "Investors may consider the scheme objective, investment horizon, risk factors, costs, portfolio characteristics and other relevant scheme information before making an investment decision.",
    },
    {
        question: "Why is investing according to an objective useful?",
        answer:
            "Defining a clear financial objective can help investors understand the amount of time available, the importance of regular investing and the risks associated with different investment choices.",
    },
];

export default function FAQ() {
    const [
        openIndex,
        setOpenIndex,
    ] = useState<number | null>(0);

    return (
        <section
            id="faq"
            className="section bg-white"
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
                        FREQUENTLY ASKED QUESTIONS
                    </span>

                    <h2 className="section-title mt-8">
                        Answers To Common
                        <span className="block text-green-700">
                            Investor Questions
                        </span>
                    </h2>

                    <p className="section-subtitle mx-auto">
                        Investing becomes easier when you understand the
                        fundamentals. Here are answers to commonly asked
                        investor questions.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="mx-auto max-w-4xl space-y-5">

                    {faqs.map((faq, index) => {
                        const isOpen =
                            openIndex === index;

                        return (
                            <motion.div
                                key={faq.question}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.08,
                                }}
                                viewport={{ once: true }}
                                className="card overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenIndex(
                                            isOpen
                                                ? null
                                                : index,
                                        )
                                    }
                                    className="flex w-full items-center justify-between p-6 text-left"
                                >
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {faq.question}
                                    </h3>

                                    <ChevronDown
                                        className={`h-6 w-6 text-green-700 transition-transform duration-300 ${isOpen
                                            ? "rotate-180"
                                            : ""
                                            }`}
                                    />
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                            }}
                                        >
                                            <div className="border-t border-slate-200 px-6 py-6">
                                                <p className="leading-8 text-slate-600">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </motion.div>
                        );
                    })}

                </div>

                {/* Contact CTA */}
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
                                    STILL HAVE QUESTIONS?
                                </span>

                                <h3 className="mt-6 text-4xl font-bold leading-tight">
                                    We're Here To Help
                                </h3>

                                <p className="mt-6 text-lg leading-8 text-green-50">
                                    Need clarification about mutual funds,
                                    SIPs, investment products or investor
                                    education? Connect with Luxmi InvestCare.
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
                                    Chat on WhatsApp
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
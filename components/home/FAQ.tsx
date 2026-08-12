"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What is a Mutual Fund?",
        answer:
            "A Mutual Fund pools money from multiple investors and invests it in a diversified portfolio of securities managed by professional fund managers. Investors should understand the scheme objectives, risks and investment strategy before investing.",
    },
    {
        question: "Why should I start a SIP?",
        answer:
            "A Systematic Investment Plan (SIP) encourages disciplined investing through regular investments. It can help investors participate in the market over time while aligning investments with long-term financial goals.",
    },
    {
        question: "Can I stop or pause my SIP?",
        answer:
            "Yes. Most SIPs can be paused or discontinued subject to the terms of the respective mutual fund scheme. Investors should review the implications before making changes.",
    },
    {
        question: "Are Mutual Funds risky?",
        answer:
            "Every investment carries risk. The level of risk varies depending on the type of mutual fund and the underlying investments. Investors should understand their risk profile before investing.",
    },
    {
        question: "How do I choose a suitable Mutual Fund?",
        answer:
            "Selecting a suitable scheme depends on your financial goals, investment horizon, risk tolerance and other personal financial considerations. Investor education plays an important role in this process.",
    },
    {
        question: "Why is goal-based investing important?",
        answer:
            "Goal-based investing helps align investments with specific financial objectives such as retirement, children's education or wealth creation while encouraging long-term discipline.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                        Investing becomes easier when you understand the fundamentals.
                        Here are answers to some commonly asked questions from investors.
                    </p>

                </motion.div>

                {/* FAQ Accordion */}

                <div className="mx-auto max-w-4xl space-y-5">

                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

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
                                    onClick={() =>
                                        setOpenIndex(isOpen ? null : index)
                                    }
                                    className="flex w-full items-center justify-between p-6 text-left"
                                >
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {faq.question}
                                    </h3>

                                    <ChevronDown
                                        className={`h-6 w-6 text-green-700 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
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
                                    Every investor has unique financial goals. If you need
                                    clarification about mutual funds, SIPs, financial planning
                                    or investor education, feel free to connect with us.
                                </p>

                            </div>

                            <div className="flex flex-col items-start gap-5 lg:items-end">

                                <a
                                    href="https://wa.me/919650060044"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-xl bg-white px-8 py-4 font-semibold text-green-700 transition hover:bg-green-50"
                                >
                                    Chat on WhatsApp
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
"use client";

import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What is a Mutual Fund?",
        answer:
            "A Mutual Fund pools money from multiple investors and invests it in diversified assets such as equities, debt securities and other instruments, managed by professional fund managers.",
    },
    {
        question: "Why should I start a SIP?",
        answer:
            "A Systematic Investment Plan (SIP) helps build long-term wealth through disciplined investing while reducing the impact of market volatility over time.",
    },
    {
        question: "Is Mutual Fund investment safe?",
        answer:
            "Mutual Funds are market-linked investments and are subject to market risks. Choosing suitable schemes aligned with your financial goals and risk profile is important.",
    },
    {
        question: "Can I redeem my investment anytime?",
        answer:
            "Most open-ended mutual fund schemes allow redemption on any business day, subject to applicable exit load and taxation rules.",
    },
];

export default function FAQ() {
    return (
        <section
            id="faq"
            className="bg-white py-24"
        >
            <div className="mx-auto max-w-5xl px-6">

                <div className="mb-16 text-center">

                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        Frequently Asked Questions
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900">
                        Your Investment Questions Answered
                    </h2>

                    <p className="mt-4 text-lg text-slate-600">
                        Some of the most common questions investors ask before starting
                        their investment journey.
                    </p>

                </div>

                <div className="space-y-5">

                    {faqs.map((faq) => (

                        <details
                            key={faq.question}
                            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                        >

                            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">

                                {faq.question}

                                <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />

                            </summary>

                            <p className="mt-5 leading-7 text-slate-600">
                                {faq.answer}
                            </p>

                        </details>

                    ))}

                </div>

            </div>
        </section>
    );
}
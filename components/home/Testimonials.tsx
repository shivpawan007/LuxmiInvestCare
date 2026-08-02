"use client";

import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Rajesh Kumar",
        city: "Faridabad",
        text: "Luxmi InvestCare helped me start my SIP journey with confidence. Their guidance is simple, transparent and professional.",
    },
    {
        name: "Priya Sharma",
        city: "Delhi NCR",
        text: "Goal-based investment planning made it easy for my family to prepare for future financial needs.",
    },
    {
        name: "Amit Verma",
        city: "Gurugram",
        text: "I appreciate the educational approach instead of sales pressure. Highly recommended for long-term investors.",
    },
];

export default function Testimonials() {
    return (
        <section
            id="testimonials"
            className="bg-slate-50 py-24"
        >
            <div className="mx-auto max-w-7xl px-6">

                <div className="mx-auto mb-16 max-w-3xl text-center">

                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        Client Testimonials
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900">
                        Trusted by Investors
                    </h2>

                    <p className="mt-4 text-lg text-slate-600">
                        Our focus is on educating investors and helping them stay
                        disciplined toward long-term financial goals.
                    </p>

                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {testimonials.map((item) => (

                        <div
                            key={item.name}
                            className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >

                            <div className="mb-4 flex">

                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400"
                                    />
                                ))}

                            </div>

                            <p className="leading-7 text-slate-600">
                                "{item.text}"
                            </p>

                            <div className="mt-8">

                                <h4 className="font-bold text-slate-900">
                                    {item.name}
                                </h4>

                                <p className="text-sm text-slate-500">
                                    {item.city}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
}
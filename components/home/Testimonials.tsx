"use client";

import { motion } from "framer-motion";
import { Quote, Star, Users } from "lucide-react";

const testimonials = [
    {
        name: "Investor Education Focus",
        role: "Individual Investor",
        quote:
            "The investment concepts were explained clearly, helping me understand the information and the factors I should consider before investing.",
    },
    {
        name: "Transparent Communication",
        role: "Long-Term Investor",
        quote:
            "I appreciated the clear communication and educational approach towards understanding investment products and long-term investing concepts.",
    },
    {
        name: "Investment Awareness",
        role: "Family Investor",
        quote:
            "The discussions focused on understanding investment objectives and staying aware of risks rather than reacting to short-term market movements.",
    },
];

export default function Testimonials() {
    return (
        <section
            id="testimonials"
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
                    <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-semibold text-green-700">
                        CLIENT EXPERIENCES
                    </span>

                    <h2 className="section-title mt-8">
                        Building Trust Through
                        <span className="block text-green-700">
                            Education & Transparency
                        </span>
                    </h2>

                    <p className="section-subtitle mx-auto">
                        We believe trust is built through transparency,
                        investor education and clear communication. The
                        experiences below reflect the value of understanding
                        investment information and long-term investing concepts.
                    </p>
                </motion.div>

                {/* Testimonial Cards */}
                <div className="grid gap-8 lg:grid-cols-3">

                    {testimonials.map(
                        (testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                }}
                                viewport={{ once: true }}
                                className="card flex h-full flex-col p-8"
                            >
                                <div className="mb-6 flex items-center justify-between">

                                    <Quote className="h-12 w-12 text-green-600 opacity-80" />

                                    <div className="flex gap-1">
                                        {[...Array(5)].map(
                                            (_, star) => (
                                                <Star
                                                    key={star}
                                                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                                                />
                                            ),
                                        )}
                                    </div>

                                </div>

                                <p className="flex-1 text-lg leading-8 italic text-slate-600">
                                    "{testimonial.quote}"
                                </p>

                                <div className="mt-8 border-t border-slate-200 pt-6">

                                    <h3 className="text-lg font-bold text-slate-900">
                                        {testimonial.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {testimonial.role}
                                    </p>

                                </div>
                            </motion.div>
                        ),
                    )}

                </div>

                {/* Investor First Banner */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    viewport={{ once: true }}
                    className="mt-24"
                >
                    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-12 text-white shadow-xl">

                        <div className="grid items-center gap-10 lg:grid-cols-2">

                            <div>

                                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                                    INVESTOR FIRST
                                </span>

                                <h3 className="mt-6 text-4xl font-bold leading-tight">
                                    Trust Built Through
                                    <span className="block">
                                        Education & Transparency
                                    </span>
                                </h3>

                                <p className="mt-6 text-lg leading-8 text-green-50">
                                    Every investor deserves clear communication,
                                    investor education and easy-to-understand
                                    information. We believe long-term relationships
                                    are built on trust, transparency and informed
                                    decision-making.
                                </p>

                            </div>

                            <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">

                                <div className="mb-6 flex items-center gap-4">

                                    <Users className="h-10 w-10 text-white" />

                                    <h4 className="text-2xl font-bold">
                                        Our Commitment
                                    </h4>

                                </div>

                                <ul className="space-y-4 text-green-50">
                                    <li>✓ Investor Education</li>
                                    <li>✓ Transparent Communication</li>
                                    <li>✓ Investment Information</li>
                                    <li>✓ Long-Term Investing Discipline</li>
                                    <li>✓ Investor Support</li>
                                </ul>

                            </div>

                        </div>
                    </div>
                </motion.div>

                {/* Educational Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 rounded-2xl border border-amber-200 bg-amber-50 p-8"
                >
                    <h4 className="mb-4 text-xl font-bold text-amber-800">
                        Important Note
                    </h4>

                    <p className="leading-8 text-slate-700">
                        Testimonials presented on this website are intended
                        to reflect general experiences related to investor
                        education, communication and understanding of
                        investment information. They should not be interpreted
                        as assurance of investment performance, returns or
                        future outcomes.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
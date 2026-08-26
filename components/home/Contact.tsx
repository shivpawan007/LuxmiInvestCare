"use client";

import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    MessageCircle,
} from "lucide-react";

export default function Contact() {
    return (
        <section
            id="contact"
            className="section bg-soft"
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
                        CONTACT US
                    </span>

                    <h2 className="section-title mt-8">
                        Let's Continue Your
                        <span className="block text-green-700">
                            Investor Education Journey
                        </span>
                    </h2>

                    <p className="section-subtitle mx-auto">
                        Whether you are exploring your first investment
                        or learning about long-term investing, connect
                        with us for investor education, transparency and
                        product information.
                    </p>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-2">

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="card p-8"
                    >
                        <h3 className="mb-8 text-3xl font-bold text-slate-900">
                            Send Us a Message
                        </h3>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                window.location.href =
                                    "/contact";
                            }}
                            className="space-y-6"
                        >
                            <div>
                                <label className="mb-2 block font-medium text-slate-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium text-slate-700">
                                    Mobile Number
                                </label>

                                <input
                                    type="tel"
                                    placeholder="Enter your mobile number"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium text-slate-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium text-slate-700">
                                    Message
                                </label>

                                <textarea
                                    rows={5}
                                    placeholder="Tell us what information you are looking for..."
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full"
                            >
                                Continue to Contact Page
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >

                        {/* Office Card */}
                        <div className="card p-8">

                            <h3 className="mb-8 text-3xl font-bold text-slate-900">
                                Office Information
                            </h3>

                            <div className="space-y-6">

                                <a
                                    href="tel:+919650060044"
                                    className="flex items-start gap-4"
                                >
                                    <Phone className="mt-1 h-6 w-6 text-green-700" />

                                    <div>
                                        <h4 className="font-semibold text-slate-900">
                                            Phone
                                        </h4>

                                        <p className="text-slate-600">
                                            +91 9650060044
                                        </p>
                                    </div>
                                </a>

                                <a
                                    href="mailto:info@luxmiinvestcare.com"
                                    className="flex items-start gap-4"
                                >
                                    <Mail className="mt-1 h-6 w-6 text-green-700" />

                                    <div>
                                        <h4 className="font-semibold text-slate-900">
                                            Email
                                        </h4>

                                        <p className="text-slate-600">
                                            info@luxmiinvestcare.com
                                        </p>
                                    </div>
                                </a>

                                <div className="flex items-start gap-4">
                                    <MapPin className="mt-1 h-6 w-6 text-green-700" />

                                    <div>
                                        <h4 className="font-semibold text-slate-900">
                                            Office Address
                                        </h4>

                                        <p className="text-slate-600">
                                            1063, D-Block,
                                            <br />
                                            Street-6,
                                            <br />
                                            Sanjay Enclave,
                                            <br />
                                            Faridabad – 121005
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Clock className="mt-1 h-6 w-6 text-green-700" />

                                    <div>
                                        <h4 className="font-semibold text-slate-900">
                                            Business Hours
                                        </h4>

                                        <p className="text-slate-600">
                                            Monday – Saturday
                                            <br />
                                            9:30 AM – 6:30 PM
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* WhatsApp CTA */}
                        <div className="card bg-gradient-to-r from-green-700 to-emerald-600 p-8 text-white">

                            <div className="flex items-center gap-4">

                                <MessageCircle className="h-10 w-10" />

                                <div>
                                    <h3 className="text-2xl font-bold">
                                        Chat on WhatsApp
                                    </h3>

                                    <p className="mt-2 text-green-50">
                                        Connect with us for investor education,
                                        product information and general
                                        investment-related enquiries.
                                    </p>
                                </div>

                            </div>

                            <a
                                href="https://wa.me/919650060044"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-green-700 transition hover:bg-green-50"
                            >
                                Start WhatsApp Chat
                            </a>

                        </div>

                        {/* Google Map Placeholder */}
                        <div className="card overflow-hidden">
                            <div className="flex h-72 items-center justify-center bg-slate-100">
                                <div className="text-center">

                                    <MapPin className="mx-auto mb-4 h-12 w-12 text-green-700" />

                                    <h3 className="text-xl font-bold text-slate-900">
                                        Google Map
                                    </h3>

                                    <p className="mt-2 text-slate-600">
                                        Interactive map will be integrated
                                        during deployment.
                                    </p>

                                </div>
                            </div>
                        </div>

                    </motion.div>

                </div>

            </div>
        </section>
    );
}
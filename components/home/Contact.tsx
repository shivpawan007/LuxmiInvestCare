"use client";

import {
    MapPin,
    Phone,
    Mail,
    MessageCircle,
} from "lucide-react";

export default function Contact() {
    return (
        <section
            id="contact"
            className="bg-slate-50 py-24"
        >
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-16 text-center">

                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        Contact Us
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900">
                        Let's Build Your Financial Future
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                        Reach out for investor education and guidance on mutual fund
                        investments aligned with your financial goals.
                    </p>

                </div>

                <div className="grid gap-12 lg:grid-cols-2">

                    {/* Left */}

                    <div className="space-y-6">

                        <div className="rounded-3xl bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-4">

                                <MapPin className="h-8 w-8 text-green-700" />

                                <div>

                                    <h3 className="font-bold text-slate-900">
                                        Office Address
                                    </h3>

                                    <p className="text-slate-600">
                                        Sanjay Enclave,
                                        Faridabad,
                                        Haryana
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-4">

                                <Phone className="h-8 w-8 text-green-700" />

                                <div>

                                    <h3 className="font-bold">
                                        Phone
                                    </h3>

                                    <p className="text-slate-600">
                                        +91 96500 60044
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-4">

                                <Mail className="h-8 w-8 text-green-700" />

                                <div>

                                    <h3 className="font-bold">
                                        Email
                                    </h3>

                                    <p className="text-slate-600">
                                        info@luxmiinvestcare.com
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-3xl bg-green-700 p-6 text-white">

                            <div className="flex items-center gap-4">

                                <MessageCircle className="h-8 w-8" />

                                <div>

                                    <h3 className="font-bold">
                                        WhatsApp Support
                                    </h3>

                                    <p>
                                        Quick responses for investor queries.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="rounded-3xl bg-white p-8 shadow-sm">

                        <h3 className="mb-6 text-2xl font-bold">
                            Send us a Message
                        </h3>

                        <form className="space-y-5">

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full rounded-xl border p-4"
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full rounded-xl border p-4"
                            />

                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                className="w-full rounded-xl border p-4"
                            />

                            <textarea
                                rows={5}
                                placeholder="Message"
                                className="w-full rounded-xl border p-4"
                            />

                            <button
                                type="submit"
                                className="rounded-xl bg-green-700 px-8 py-4 font-semibold text-white transition hover:bg-green-800"
                            >
                                Send Message
                            </button>

                        </form>

                        <p className="mt-6 text-sm text-slate-500">
                            Mutual Fund investments are subject to market risks.
                            Please read all scheme-related documents carefully before investing.
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
}
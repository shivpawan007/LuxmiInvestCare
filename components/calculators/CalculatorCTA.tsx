"use client";

import Link from "next/link";
import {
    Phone,
    MessageCircle,
    ArrowRight,
    ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function CalculatorCTA() {
    return (
        <section className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-800 to-emerald-900 text-white shadow-2xl">
            <div className="grid items-center gap-12 p-10 lg:grid-cols-2 lg:p-14">

                {/* Left */}
                <div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
                        <ShieldCheck className="h-4 w-4" />
                        Investor Education Support
                    </span>

                    <h2 className="mt-6 text-4xl font-extrabold leading-tight">
                        Need Help Understanding
                        <br />
                        Your Investment Illustration?
                    </h2>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-green-100">
                        Explore investment information, understand the
                        assumptions used in your calculator illustration and
                        build your investor knowledge through educational
                        resources.
                    </p>

                    <div className="mt-8 space-y-3 text-green-100">
                        <div>✔ Investment Objective Education</div>
                        <div>✔ SIP Education & Investor Awareness</div>
                        <div>✔ Investor Support</div>
                        <div>✔ Long-Term Investing Education</div>
                        <div>✔ Investor Education Resources</div>
                    </div>

                </div>

                {/* Right */}
                <div className="rounded-3xl bg-white p-8 text-slate-900 shadow-xl">

                    <h3 className="text-2xl font-bold">
                        Connect With Luxmi InvestCare
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                        Have questions about SIPs, mutual funds or the
                        assumptions used in an illustration? Connect with
                        Luxmi InvestCare for investor education and
                        information.
                    </p>

                    <div className="mt-8 space-y-4">

                        <Button
                            type="button"
                            onClick={() => {
                                window.location.href =
                                    "tel:+919650060044";
                            }}
                            className="flex w-full items-center justify-center gap-2 bg-green-700 hover:bg-green-800"
                        >
                            <Phone className="h-5 w-5" />
                            Call +91 9650060044
                        </Button>

                        <Link
                            href="https://wa.me/919650060044"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                className="flex w-full items-center justify-center gap-2"
                            >
                                <MessageCircle className="h-5 w-5" />
                                WhatsApp Now
                            </Button>
                        </Link>

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                window.location.href =
                                    "/contact";
                            }}
                            className="flex w-full items-center justify-center gap-2"
                        >
                            Send Enquiry
                        </Button>

                    </div>

                    <div className="mt-8 rounded-2xl bg-slate-100 p-5">
                        <h4 className="font-bold">
                            Luxmi InvestCare
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            AMFI Registered Mutual Fund Distributor
                            <br />
                            ARN-365140
                        </p>
                    </div>

                </div>
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-white/10 py-5 text-sm text-green-100">
                Investor Education • Long-Term Investing • Financial Awareness
                <ArrowRight className="h-4 w-4" />
            </div>
        </section>
    );
}
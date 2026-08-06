"use client";

import Link from "next/link";
import {
    Phone,
    MessageCircle,
    CalendarDays,
    ShieldCheck,
    ArrowRight,
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

                        Need Help Planning
                        <br />
                        Your Investments?

                    </h2>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-green-100">

                        Our role is to help investors understand investment options,
                        define financial goals and make informed decisions through
                        disciplined investing and investor education.

                    </p>

                    <div className="mt-8 space-y-3 text-green-100">

                        <div>✔ Goal-Based Investment Planning</div>

                        <div>✔ SIP Guidance & Financial Awareness</div>

                        <div>✔ Portfolio Review</div>

                        <div>✔ Retirement Planning</div>

                        <div>✔ Investor Education</div>

                    </div>

                </div>

                {/* Right */}

                <div className="rounded-3xl bg-white p-8 text-slate-900 shadow-xl">

                    <h3 className="text-2xl font-bold">

                        Talk to an Advisor

                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">

                        Have questions about SIPs or goal-based investing?
                        Connect with Luxmi InvestCare for educational guidance.

                    </p>

                    <div className="mt-8 space-y-4">

                        <Button className="flex w-full items-center justify-center gap-2 bg-green-700 hover:bg-green-800">

                            <Phone className="h-5 w-5" />

                            Call +91 9650060044

                        </Button>

                        <Link
                            href="https://wa.me/919650060044"
                            target="_blank"
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
                            variant="secondary"
                            className="flex w-full items-center justify-center gap-2"
                        >

                            <CalendarDays className="h-5 w-5" />

                            Request Consultation

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

                Investor Education • Long-Term Wealth Creation • Financial Awareness

                <ArrowRight className="h-4 w-4" />

            </div>

        </section>
    );
}
"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <div className="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:justify-between">

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .7 }}
                    className="max-w-3xl"
                >
                    <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                        AMFI Registered Mutual Fund Distributor | ARN-365140
                    </span>

                    <h1 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900 lg:text-7xl">
                        Helping Investors
                        <span className="block text-green-700">
                            Pursue Long-Term
                        </span>
                        Financial Goals
                    </h1>

                    <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
                        Luxmi InvestCare helps investors pursue long-term financial
                        goals through disciplined investing and investor education.
                    </p>

                    <div className="mt-10 flex gap-4">

                        <Button
                            size="lg"
                            className="rounded-xl bg-green-700 hover:bg-green-800"
                        >
                            Start Investing
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-xl"
                        >
                            Learn More
                        </Button>

                    </div>

                    <div className="mt-12 flex items-center gap-3 text-green-700">
                        <ShieldCheck size={20} />
                        <span>
                            Investor Education • Goal Planning • SIP Guidance
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .2 }}
                    className="mt-20 lg:mt-0"
                >

                    <div className="rounded-3xl border bg-white p-10 shadow-2xl">

                        <h3 className="text-xl font-bold">
                            Luxmi InvestCare
                        </h3>

                        <div className="mt-8 space-y-4">

                            <div>
                                <p className="text-sm text-slate-500">ARN Number</p>
                                <h4 className="font-semibold">365140</h4>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">Phone</p>
                                <h4>+91 9650060044</h4>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">Email</p>
                                <h4>info@luxmiinvestcare.com</h4>
                            </div>

                        </div>

                    </div>

                </motion.div>

            </div>
        </section>
    );
}
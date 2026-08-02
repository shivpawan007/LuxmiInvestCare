"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <div className="mx-auto max-w-screen-xl px-6 py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: .7 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            AMFI Registered Mutual Fund Distributor | ARN-365140
                        </span>

                        <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-slate-900 max-w-3xl">
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

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Button
                                size="lg"
                                className="h-12 px-8 rounded-xl bg-green-700 hover:bg-green-800"
                            >
                                Start Investing
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 px-8 rounded-xl"
                            >
                                Learn More
                            </Button>
                        </div>

                        <div className="mt-10 flex items-center gap-2 text-green-700 font-medium">
                            <ShieldCheck size={20} />
                            <span>Investor Education • Goal Planning • SIP Guidance</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: .8 }}
                        className="flex justify-center"
                    >
                        <Image
                            src="/images/office.jpg"
                            alt="Luxmi InvestCare office"
                            width={750}
                            height={520}
                            className="w-full max-w-xl rounded-3xl shadow-2xl border border-green-100 object-cover"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
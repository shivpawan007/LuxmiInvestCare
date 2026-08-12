"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Hero() {
    return (
        <section
            id="home"
            className="section bg-soft overflow-hidden"
        >
            <div className="container-custom">

                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Left Content */}

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-2xl"
                    >

                        {/* Badge */}

                        <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-semibold text-green-700 shadow-sm">
                            AMFI Registered Mutual Fund Distributor | ARN-365140
                        </span>

                        {/* Heading */}

                        <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-7xl">

                            Helping Investors

                            <br />

                            <span className="text-green-700">
                                Pursue Long-Term
                            </span>

                            <br />

                            Financial Goals

                        </h1>

                        {/* Description */}

                        <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
                            Luxmi InvestCare helps investors pursue long-term financial
                            goals through disciplined investing, investor education and
                            goal-based financial planning.
                        </p>

                        {/* Buttons */}

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Button
                                size="lg"
                                className="btn-primary"
                            >
                                Start Investing

                                <ArrowRight className="ml-2 h-5 w-5" />

                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="btn-secondary"
                            >
                                Learn More
                            </Button>

                        </div>

                        {/* Trust Line */}

                        <div className="mt-12 flex items-center gap-3 text-green-700">

                            <ShieldCheck className="h-5 w-5" />

                            <span className="font-medium">
                                Investor Education • Goal Planning • SIP Guidance
                            </span>

                        </div>

                    </motion.div>

                    {/* Hero Image */}

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center"
                    >

                        <div className="image-card w-full max-w-xl">

                            <Image
                                src="/images/office.jpg"
                                alt="Luxmi InvestCare"
                                width={750}
                                height={520}
                                priority
                                className="w-full object-cover"
                            />

                        </div>

                    </motion.div>

                </div>

            </div>
        </section>
    );
}
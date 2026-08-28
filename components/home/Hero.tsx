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

                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-2xl"
                    >
                        {/* Badge */}
                        <span className="inline-flex max-w-full items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-center text-xs font-semibold leading-5 text-green-700 shadow-sm sm:px-5 sm:text-sm">
                            AMFI Registered Mutual Fund Distributor | ARN-365140
                        </span>

                        {/* Heading */}
                        <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:mt-8 lg:text-7xl">
                            Helping Investors

                            <br />

                            <span className="text-green-700">
                                Understand Investing
                            </span>

                            <br />

                            With Clarity
                        </h1>

                        {/* Description */}
                        <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8">
                            Luxmi InvestCare provides investor education,
                            investment product information and tools that
                            help investors understand mutual funds, SIPs,
                            insurance and long-term investing concepts.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">

                            <Button
                                size="lg"
                                className="btn-primary"
                                onClick={() => {
                                    window.location.href = "/contact";
                                }}
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="btn-secondary"
                                onClick={() => {
                                    window.location.href = "/investor-education";
                                }}
                            >
                                Learn More
                            </Button>

                        </div>

                        {/* Trust Line */}
                        <div className="mt-8 flex items-start gap-3 text-green-700 sm:mt-12">

                            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />

                            <span className="text-sm font-medium leading-6 sm:text-base">
                                Investor Education • SIP Education • Interactive Tools
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
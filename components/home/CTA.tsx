"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function CTA() {
    return (
        <section className="bg-green-700 py-24 text-white">
            <div className="mx-auto max-w-5xl px-6 text-center">

                <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold lg:text-5xl"
                >
                    Start Your Investment Journey Today
                </motion.h2>

                <p className="mx-auto mt-6 max-w-3xl text-lg text-green-100">
                    We help investors pursue long-term financial goals through
                    disciplined investing and investor education.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">

                    <Button
                        size="lg"
                        className="bg-white text-green-700 hover:bg-green-100"
                    >
                        Contact Us
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-green-700"
                    >
                        Investor Education
                    </Button>

                </div>

            </div>
        </section>
    );
}
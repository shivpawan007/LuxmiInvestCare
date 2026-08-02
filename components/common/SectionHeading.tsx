"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
    badge?: string;
    title: string;
    highlight?: string;
    description?: string;
    center?: boolean;
}

export default function SectionHeading({
    badge,
    title,
    highlight,
    description,
    center = true,
}: SectionHeadingProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
        >
            {badge && (
                <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-green-700">
                    {badge}
                </span>
            )}

            <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
                {title}

                {highlight && (
                    <span className="block text-green-700">{highlight}</span>
                )}
            </h2>

            {description && (
                <p className="mt-6 text-lg leading-8 text-slate-600">
                    {description}
                </p>
            )}
        </motion.div>
    );
}
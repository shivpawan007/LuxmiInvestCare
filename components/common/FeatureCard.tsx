"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function FeatureCard({
    icon: Icon,
    title,
    description,
}: FeatureCardProps) {
    return (
        <motion.div
            whileHover={{
                y: -8,
            }}
            className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-green-600 hover:shadow-2xl"
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 transition-colors duration-300 group-hover:bg-green-700">
                <Icon className="h-8 w-8 text-green-700 transition-colors duration-300 group-hover:text-white" />
            </div>

            <h3 className="mt-8 text-xl font-bold text-slate-900">
                {title}
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
                {description}
            </p>
        </motion.div>
    );
}
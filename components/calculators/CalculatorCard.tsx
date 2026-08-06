"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CalculatorCardProps {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    available?: boolean;
}

export default function CalculatorCard({
    title,
    description,
    href,
    icon,
    available = true,
}: CalculatorCardProps) {
    return (
        <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-2xl">

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                {icon}
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
                {title}
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
                {description}
            </p>

            <div className="mt-8">

                {available ? (
                    <Link href={href}>
                        <Button className="bg-green-700 hover:bg-green-800">
                            Open Calculator
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                ) : (
                    <Button disabled>
                        Coming Soon
                    </Button>
                )}

            </div>

        </div>
    );
}
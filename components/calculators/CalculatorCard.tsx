"use client";

import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
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
        <article
            className={`group flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 ${
                available
                    ? "border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
                    : "border-slate-200 bg-slate-50"
            }`}
        >
            <div className="flex items-start justify-between">
                <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                        available
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-200 text-slate-500"
                    }`}
                >
                    {icon}
                </div>

                {available ? (
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        Available
                    </span>
                ) : (
                    <span className="flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                        <LockKeyhole className="h-3.5 w-3.5" />
                        Coming Soon
                    </span>
                )}
            </div>

            <h3 className="mt-7 text-2xl font-bold text-slate-900">
                {title}
            </h3>

            <p className="mt-4 flex-1 leading-7 text-slate-600">
                {description}
            </p>

            <div className="mt-8">
                {available ? (
                    <Link href={href}>
                        <Button className="bg-green-700 hover:bg-green-800">
                            Open Calculator
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                ) : (
                    <Button disabled>
                        Coming Soon
                    </Button>
                )}
            </div>
        </article>
    );
}

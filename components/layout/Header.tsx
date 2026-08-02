"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                <div>
                    <Link href="/">
                        <h2 className="text-3xl font-extrabold text-green-700">
                            Luxmi InvestCare
                        </h2>

                        <p className="text-sm text-slate-500">
                            AMFI Registered Mutual Fund Distributor
                        </p>
                    </Link>
                </div>

                <nav className="hidden gap-8 font-medium text-slate-700 lg:flex">

                    <Link href="/">Home</Link>

                    <Link href="/about">About</Link>

                    <Link href="/services">Services</Link>

                    <Link href="/investor-education">
                        Investor Education
                    </Link>

                    <Link href="/contact">Contact</Link>

                </nav>

                <div className="hidden lg:block">
                    <Button className="bg-green-700 hover:bg-green-800">
                        Get Started
                    </Button>
                </div>

                <button className="lg:hidden">
                    <Menu />
                </button>

            </div>
        </header>
    );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    href="#home"
                    className="flex items-center gap-3"
                >
                    <Image
                        src="/images/Logo.png"
                        alt="Luxmi InvestCare"
                        width={70}
                        height={70}
                        priority
                        className="object-contain"
                    />

                    <div className="hidden sm:block">
                        <h2 className="text-xl font-bold text-green-700">
                            Luxmi InvestCare
                        </h2>

                        <p className="text-xs text-slate-500">
                            AMFI Registered Mutual Fund Distributor
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 font-medium text-slate-700 lg:flex">

                    <Link href="#home" className="transition hover:text-green-700">
                        Home
                    </Link>

                    <Link href="#about" className="transition hover:text-green-700">
                        About
                    </Link>

                    <Link href="#services" className="transition hover:text-green-700">
                        Services
                    </Link>

                    <Link
                        href="#investor-education"
                        className="transition hover:text-green-700"
                    >
                        Investor Education
                    </Link>

                    <Link href="#contact" className="transition hover:text-green-700">
                        Contact
                    </Link>

                </nav>

                {/* Desktop CTA */}
                <div className="hidden lg:block">
                    <Button className="bg-green-700 hover:bg-green-800">
                        Get Started
                    </Button>
                </div>

                {/* Mobile Menu */}
                <MobileMenu />

            </div>
        </header>
    );
}
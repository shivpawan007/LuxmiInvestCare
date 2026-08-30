"use client";

import Image from "next/image";
import Link from "next/link";

import MobileMenu from "./MobileMenu";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex min-w-0 items-center gap-3"
                >
                    <Image
                        src="/images/Logo.png"
                        alt="Luxmi InvestCare"
                        width={70}
                        height={70}
                        priority
                        className="h-14 w-14 object-contain sm:h-[70px] sm:w-[70px]"
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

                {/* Public desktop navigation */}
                <nav className="hidden items-center gap-7 font-medium text-slate-700 lg:flex">
                    <Link
                        href="/"
                        className="transition hover:text-green-700"
                    >
                        Home
                    </Link>

                    <Link
                        href="/about"
                        className="transition hover:text-green-700"
                    >
                        About
                    </Link>

                    <Link
                        href="/services"
                        className="transition hover:text-green-700"
                    >
                        Services
                    </Link>

                    <Link
                        href="/calculators"
                        className="transition hover:text-green-700"
                    >
                        Investment Calculators
                    </Link>

                    <Link
                        href="/investor-education"
                        className="transition hover:text-green-700"
                    >
                        Investor Education
                    </Link>

                    <Link
                        href="/contact"
                        className="transition hover:text-green-700"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Public CTA */}
                <div className="hidden lg:block">
                    <Link
                        href="/contact"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-green-700 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-800"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Public mobile menu */}
                <MobileMenu />
            </div>
        </header>
    );
}

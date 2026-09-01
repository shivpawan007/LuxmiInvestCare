"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
            <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">

                {/* Logo + Brand */}
                <Link
                    href="/"
                    className="flex min-w-0 items-center gap-3"
                >
                    <img
                        src="/images/logo.png"
                        alt="Luxmi InvestCare"
                        width={70}
                        height={70}
                        className="h-[70px] w-[70px] object-contain"
                    />

                    <div className="min-w-0">
                        <p className="truncate text-lg font-bold text-green-700">
                            Luxmi InvestCare
                        </p>

                        <p className="truncate text-xs text-slate-500">
                            AMFI Registered Mutual Fund Distributor
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">

                    <Link
                        href="/"
                        className="hover:text-green-700"
                    >
                        Home
                    </Link>

                    <Link
                        href="/about"
                        className="hover:text-green-700"
                    >
                        About
                    </Link>

                    <Link
                        href="/services"
                        className="hover:text-green-700"
                    >
                        Services
                    </Link>

                    <Link
                        href="/calculators"
                        className="hover:text-green-700"
                    >
                        Investment Calculators
                    </Link>

                    <Link
                        href="/education"
                        className="hover:text-green-700"
                    >
                        Investor Education
                    </Link>

                    <Link
                        href="/contact"
                        className="hover:text-green-700"
                    >
                        Contact
                    </Link>

                    <Link
                        href="/contact"
                        className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800"
                    >
                        Get Started
                    </Link>

                </nav>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="rounded-md border border-slate-300 px-3 py-2 text-xl md:hidden"
                    aria-label="Open navigation menu"
                >
                    ☰
                </button>

            </div>
        </header>
    );
}
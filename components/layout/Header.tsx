"use client";

import { useState } from "react";
import Link from "next/link";

const navigation = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/calculators", label: "Investment Calculators" },
    { href: "/education", label: "Investor Education" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
            <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
                <Link href="/" className="flex min-w-0 items-center gap-3" onClick={closeMenu}>
                    <img
                        src="/images/luxmi-logo.png"
                        alt="Luxmi InvestCare"
                        width={70}
                        height={70}
                        className="h-[70px] w-[70px] object-contain"
                    />
                    <div className="min-w-0">
                        <p className="truncate text-lg font-bold text-green-700">Luxmi InvestCare</p>
                        <p className="truncate text-xs text-slate-500">AMFI Registered Mutual Fund Distributor</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
                    {navigation.map((item) => (
                        <Link key={item.href} href={item.href} className="hover:text-green-700">
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800"
                    >
                        Get Started
                    </Link>
                </nav>

                <button
                    type="button"
                    className="rounded-md border border-slate-300 px-3 py-2 text-xl leading-none md:hidden"
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {menuOpen && (
                <div id="mobile-navigation" className="border-t border-slate-200 bg-white shadow-lg md:hidden">
                    <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                                className="border-b border-slate-100 px-2 py-3 text-sm font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-700"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={closeMenu}
                            className="mt-3 rounded-lg bg-green-700 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                        >
                            Get Started
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}

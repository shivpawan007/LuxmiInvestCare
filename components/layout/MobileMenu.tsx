"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const menuItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Investor Education", href: "#investor-education" },
    { label: "Contact", href: "#contact" },
];

export default function MobileMenu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="lg:hidden"
                aria-label="Open menu"
            >
                <Menu className="h-7 w-7" />
            </button>

            {open && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/40"
                        onClick={() => setOpen(false)}
                    />

                    <aside className="fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-2xl">

                        <div className="flex items-center justify-between border-b p-6">

                            <h2 className="text-xl font-bold text-green-700">
                                Luxmi InvestCare
                            </h2>

                            <button
                                onClick={() => setOpen(false)}
                            >
                                <X />
                            </button>

                        </div>

                        <nav className="flex flex-col p-6">

                            {menuItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg px-4 py-3 text-lg transition hover:bg-green-50 hover:text-green-700"
                                >
                                    {item.label}
                                </Link>
                            ))}

                        </nav>

                        <div className="p-6">

                            <a
                                href="https://wa.me/919650060044"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-xl bg-green-700 py-3 text-center font-semibold text-white transition hover:bg-green-800"
                            >
                                Get Started
                            </a>

                        </div>

                    </aside>
                </>
            )}
        </>
    );
}
"use client";

import Link from "next/link";
import Image from "next/image";

import AdminUserMenu from "@/components/layout/AdminUserMenu";

export default function AdminHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
            <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
                <Link
                    href="/admin/dashboard"
                    className="flex min-w-0 items-center gap-3"
                >
                    <Image
                        src="/images/logo.png"
                        alt="Luxmi InvestCare"
                        width={55}
                        height={55}
                        priority
                        unoptimized
                        className="object-contain"
                    />

                    <div className="min-w-0">
                        <p className="truncate text-lg font-bold text-green-700">
                            Luxmi InvestCare
                        </p>

                        <p className="truncate text-xs text-slate-500">
                            Administration Portal
                        </p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 md:flex">
                    <Link
                        href="/admin/dashboard"
                        className="hover:text-green-700"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/admin/leads"
                        className="hover:text-green-700"
                    >
                        Leads
                    </Link>

                    <Link
                        href="/admin/users"
                        className="hover:text-green-700"
                    >
                        Users
                    </Link>
                </nav>

                <AdminUserMenu />
            </div>
        </header>
    );
}
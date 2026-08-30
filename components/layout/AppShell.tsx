"use client";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isAdminRoute =
        pathname?.startsWith("/admin") ?? false;

    const isAdminLogin =
        pathname === "/admin/login";

    if (isAdminLogin) {
        return (
            <main className="min-h-screen">
                {children}
            </main>
        );
    }

    if (isAdminRoute) {
        return (
            <>
                <AdminHeader />

                <main className="min-h-screen bg-slate-50">
                    {children}
                </main>
            </>
        );
    }

    return (
        <>
            <Header />

            <main className="min-h-screen">
                {children}
            </main>

            <Footer />
        </>
    );
}
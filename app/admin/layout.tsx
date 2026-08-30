"use client";

import { usePathname } from "next/navigation";

import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isLoginPage =
        pathname === "/admin/login";

    /*
     * Login page is intentionally standalone.
     * It must not show the authenticated AdminHeader.
     */
    if (isLoginPage) {
        return (
            <main className="min-h-screen">
                {children}
            </main>
        );
    }

    /*
     * All other Admin routes use exactly one
     * authenticated AdminHeader.
     */
    return (
        <>
            <AdminHeader />

            <main className="min-h-screen bg-slate-50">
                {children}
            </main>
        </>
    );
}

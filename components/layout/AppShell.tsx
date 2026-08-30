"use client";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isAdminRoute =
        pathname?.startsWith("/admin") ?? false;

    /*
     * The /admin route tree owns its own layout.
     * AppShell must not render an AdminHeader here,
     * otherwise the header would be duplicated.
     */
    if (isAdminRoute) {
        return <>{children}</>;
    }

    /*
     * Public website shell.
     */
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

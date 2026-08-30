import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import AppShell from "@/components/layout/AppShell";

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    // KEEP YOUR EXISTING METADATA EXACTLY AS IT IS
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en-IN">
            <body className={geist.variable}>
                <AppShell>
                    {children}
                </AppShell>
            </body>
        </html>
    );
}
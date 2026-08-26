import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://www.luxmiinvestcare.com",
  ),

  title: {
    default:
      "Luxmi InvestCare | AMFI Registered Mutual Fund Distributor",
    template:
      "%s | Luxmi InvestCare",
  },

  description:
    "Investor education, mutual fund and SIP information, insurance information and interactive investment calculators from Luxmi InvestCare.",

  applicationName:
    "Luxmi InvestCare",

  keywords: [
    "Luxmi InvestCare",
    "Mutual Funds",
    "SIP",
    "Investor Education",
    "Investment Calculators",
    "Life Insurance",
    "Health Insurance",
    "AMFI Registered Mutual Fund Distributor",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.luxmiinvestcare.com",
    siteName: "Luxmi InvestCare",
    title:
      "Luxmi InvestCare | AMFI Registered Mutual Fund Distributor",
    description:
      "Investor education, product information and interactive investment calculators from Luxmi InvestCare.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luxmi InvestCare",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Luxmi InvestCare | AMFI Registered Mutual Fund Distributor",
    description:
      "Investor education, product information and interactive investment calculators from Luxmi InvestCare.",
    images: ["/images/og-image.jpg"],
  },

  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body className={geist.variable}>
        <Header />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
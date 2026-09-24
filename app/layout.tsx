import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import AppShell from "@/components/layout/AppShell";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const siteUrl = "https://luxmiinvestcare.com";
const officialYouTube = "https://www.youtube.com/@luxmiinvestcare";
const officialFacebook = "https://www.facebook.com/luxmiinvestcare";
const officialInstagram = "https://www.instagram.com/luxmiinvestcare";
const officialLinkedIn = "https://www.linkedin.com/in/luxmiinvestcare";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Luxmi InvestCare | AMFI-Registered Mutual Fund Distributor",
    template: "%s | Luxmi InvestCare",
  },
  description:
    "Luxmi InvestCare is an AMFI-Registered Mutual Fund Distributor (ARN: 365140) providing mutual fund distribution, investor education and investment information.",
  applicationName: "Luxmi InvestCare",
  authors: [{ name: "Luxmi InvestCare" }],
  creator: "Luxmi InvestCare",
  publisher: "Luxmi InvestCare",
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Luxmi InvestCare",
    title: "Luxmi InvestCare | AMFI-Registered Mutual Fund Distributor",
    description:
<<<<<<< HEAD
        "Luxmi InvestCare provides investor education, mutual fund and SIP information, insurance information, and financial awareness resources in Faridabad, Haryana.",
    applicationName: "Luxmi InvestCare",
    authors: [{ name: "Luxmi InvestCare" }],
    creator: "Luxmi InvestCare",
    publisher: "Luxmi InvestCare",
    alternates: {
        canonical: siteUrl,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: siteUrl,
        siteName: "Luxmi InvestCare",
        title: "Luxmi InvestCare | Investor Education & Financial Awareness",
        description:
            "Investor education, mutual fund and SIP information, insurance information, and financial awareness resources from Luxmi InvestCare.",
        images: [
            {
                url: "/images/luxmi-logo.png",
                alt: "Luxmi InvestCare",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Luxmi InvestCare | Investor Education & Financial Awareness",
        description:
            "Investor education and financial awareness resources from Luxmi InvestCare.",
        images: ["/images/luxmi-logo.png"],
    },
    icons: {
        icon: "/images/luxmi-logo.png",
    },
};

const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Luxmi InvestCare",
    url: siteUrl,
    logo: `${siteUrl}/images/luxmi-logo.png`,
    image: `${siteUrl}/images/luxmi-logo.png`,
    description:
        "Luxmi InvestCare provides investor education, mutual fund and SIP information, insurance information, and financial awareness resources.",
    telephone: "+919650060044",
    email: "info@luxmiinvestcare.com",
    address: {
        "@type": "PostalAddress",
        streetAddress: "1063, D-Block, Street-6, Sanjay Enclave",
        addressLocality: "Faridabad",
        addressRegion: "Haryana",
        postalCode: "121005",
        addressCountry: "IN",
    },
    areaServed: [
        {
            "@type": "City",
            name: "Faridabad",
        },
        {
            "@type": "State",
            name: "Haryana",
        },
        {
            "@type": "Country",
            name: "India",
        },
    ],
    sameAs: [
        officialYouTube,
        officialFacebook,
        officialInstagram,
        officialLinkedIn,
    ],
=======
      "Mutual fund distribution and investor education from Luxmi InvestCare. AMFI-Registered Mutual Fund Distributor, ARN 365140.",
    images: [{ url: "/images/luxmi-logo.png", alt: "Luxmi InvestCare" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxmi InvestCare | AMFI-Registered Mutual Fund Distributor",
    description:
      "Mutual fund distribution and investor education from Luxmi InvestCare.",
    images: ["/images/luxmi-logo.png"],
  },
  icons: { icon: "/images/luxmi-logo.png" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": `${siteUrl}/#organization`,
  name: "Luxmi InvestCare",
  url: siteUrl,
  logo: `${siteUrl}/images/luxmi-logo.png`,
  description:
    "AMFI-Registered Mutual Fund Distributor (ARN: 365140) providing mutual fund distribution and investor education.",
  telephone: "+919650060044",
  email: "info@luxmiinvestcare.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1063, D-Block, Street-6, Sanjay Enclave",
    addressLocality: "Faridabad",
    addressRegion: "Haryana",
    postalCode: "121005",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: "Faridabad" },
    { "@type": "State", name: "Haryana" },
    { "@type": "Country", name: "India" },
  ],
  sameAs: [officialYouTube, officialFacebook, officialInstagram, officialLinkedIn],
>>>>>>> 3009785d61e560b0d68acdde5db65bd016e215b4
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Luxmi InvestCare",
  description: "Official website of Luxmi InvestCare.",
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-IN",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className={geist.variable}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

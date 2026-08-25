"use client";

import {
    Globe,
    Mail,
    Phone,
    MessageCircle,
} from "lucide-react";

import {
    recordReportShare,
    type CalculatorType,
} from "./reportShare";

interface ConnectWithLuxmiProps {
    calculatorType: CalculatorType;
    reportTitle: string;

    investment: number;
    years: number;
    annualReturn: number;

    estimatedReturns: number;
    maturityValue: number;
}

const CONTACT = {
    whatsapp: "919650060044",
    whatsappDisplay: "9650060044",
    phone: "tel:+919650060044",
    email: "mailto:info@luxmiinvestcare.com",
    website: "https://www.luxmiInvestCare.com",
};

function formatINR(value: number): string {
    return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export default function ConnectWithLuxmi({
    calculatorType,
    reportTitle,
    investment,
    years,
    annualReturn,
    estimatedReturns,
    maturityValue,
}: ConnectWithLuxmiProps) {
    function record(
        action:
            | "whatsapp"
            | "call"
            | "email"
            | "website",
    ) {
        recordReportShare({
            calculatorType,
            reportTitle,
            investment,
            years,
            annualReturn,
            estimatedReturns,
            maturityValue,
            action,
        });
    }

    function openWhatsApp() {
        record("whatsapp");

        const message = encodeURIComponent(
            `Hello Luxmi InvestCare,

I would like information related to this investor education illustration.

Report: ${reportTitle}

Investment: ${formatINR(investment)}
Investment Period: ${years} Years
Expected Return Assumption: ${annualReturn}%
Illustrative Returns: ${formatINR(estimatedReturns)}
Illustrative Projected Value: ${formatINR(maturityValue)}

Please share investor education and information related to this illustration.`,
        );

        window.open(
            `https://wa.me/${CONTACT.whatsapp}?text=${message}`,
            "_blank",
            "noopener,noreferrer",
        );
    }

    function openCall() {
        record("call");

        window.location.href =
            CONTACT.phone;
    }

    function openEmail() {
        record("email");

        window.location.href =
            `${CONTACT.email}?subject=${encodeURIComponent(
                `${reportTitle} - Investor Education Enquiry`,
            )}&body=${encodeURIComponent(
                `Hello Luxmi InvestCare,

I would like information related to this investor education illustration.

Report: ${reportTitle}
Investment: ${formatINR(investment)}
Investment Period: ${years} Years
Expected Return Assumption: ${annualReturn}%
Illustrative Returns: ${formatINR(estimatedReturns)}
Illustrative Projected Value: ${formatINR(maturityValue)}

Please share investor education and information related to this illustration.`,
            )}`;
    }

    function openWebsite() {
        record("website");

        window.open(
            CONTACT.website,
            "_blank",
            "noopener,noreferrer",
        );
    }

    return (
        <section className="mt-10 rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm">

            <div className="text-center">

                <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                    Need Help Understanding This Illustration?
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                    Connect With Luxmi InvestCare
                </h3>

                <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Get investor education and information about
                    investment products related to this illustration.
                </p>

            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {/* WhatsApp */}
                <button
                    type="button"
                    onClick={openWhatsApp}
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                </button>

                {/* Call */}
                <button
                    type="button"
                    onClick={openCall}
                    className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-50"
                >
                    <Phone className="h-5 w-5" />
                    Call Us
                </button>

                {/* Email */}
                <button
                    type="button"
                    onClick={openEmail}
                    className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-50"
                >
                    <Mail className="h-5 w-5" />
                    Email
                </button>

                {/* Website */}
                <button
                    type="button"
                    onClick={openWebsite}
                    className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-50"
                >
                    <Globe className="h-5 w-5" />
                    Website
                </button>

            </div>

            <p className="mt-5 text-center text-xs text-slate-500">
                WhatsApp: {CONTACT.whatsappDisplay} ·{" "}
                info@luxmiinvestcare.com · www.luxmiInvestCare.com
            </p>

        </section>
    );
}
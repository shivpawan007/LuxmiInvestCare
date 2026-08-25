"use client";

import {
    Mail,
    MapPin,
    Phone,
    Clock,
    MessageCircle,
    Send,
    ShieldCheck,
    Globe,
} from "lucide-react";

import { useState } from "react";

const CONTACT = {
    phoneDisplay: "+91 9650060044",
    phone: "tel:+919650060044",
    whatsapp: "https://wa.me/919650060044",
    email: "info@luxmiinvestcare.com",
    emailLink: "mailto:info@luxmiinvestcare.com",
    website: "https://www.luxmiInvestCare.com",
    address: [
        "1063, D-Block,",
        "Street-6,",
        "Sanjay Enclave,",
        "Faridabad – 121005",
    ],
    hours: [
        "Monday – Saturday",
        "9:30 AM – 6:30 PM",
    ],
    arn: "ARN-365140",
};

export default function ContactPage() {
    const [
        name,
        setName,
    ] = useState("");

    const [
        mobile,
        setMobile,
    ] = useState("");

    const [
        email,
        setEmail,
    ] = useState("");

    const [
        message,
        setMessage,
    ] = useState("");

    const [
        error,
        setError,
    ] = useState("");

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const cleanMobile =
            mobile.replace(/\D/g, "");

        if (!name.trim()) {
            setError(
                "Please enter your name.",
            );
            return;
        }

        if (
            cleanMobile.length !== 10
        ) {
            setError(
                "Please enter a valid 10-digit mobile number.",
            );
            return;
        }

        if (
            email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email,
            )
        ) {
            setError(
                "Please enter a valid email address.",
            );
            return;
        }

        if (!message.trim()) {
            setError(
                "Please enter your enquiry.",
            );
            return;
        }

        setError("");

        const enquiry = `
Hello Luxmi InvestCare,

I would like investor education and information related to my enquiry.

Name: ${name.trim()}
Mobile: ${cleanMobile}
Email: ${email.trim() || "Not provided"}

Enquiry:
${message.trim()}
`;

        window.open(
            `${CONTACT.whatsapp}?text=${encodeURIComponent(
                enquiry,
            )}`,
            "_blank",
            "noopener,noreferrer",
        );
    }

    return (
        <main className="bg-white">

            {/* =========================================================
          HERO
      ========================================================== */}
            <section className="relative overflow-hidden bg-green-950 py-24 text-white">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_45%)]" />

                <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-green-700/30 blur-3xl" />

                <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

                <div className="container-custom relative z-10">

                    <div className="mx-auto max-w-4xl text-center">

                        <span className="inline-flex items-center gap-2 rounded-full border border-green-300/30 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur">
                            <ShieldCheck className="h-5 w-5 text-green-300" />
                            Investor Education & Information
                        </span>

                        <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-6xl">
                            Connect With
                            <span className="block text-green-300">
                                Luxmi InvestCare
                            </span>
                        </h1>

                        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-green-100 lg:text-xl">
                            Share your enquiry with us and receive investor
                            education and information related to your
                            investment illustration or financial requirement.
                        </p>

                        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm sm:text-base">

                            <div className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-green-300" />
                                <span>{CONTACT.phoneDisplay}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-green-300" />
                                <span>{CONTACT.email}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Globe className="h-5 w-5 text-green-300" />
                                <span>www.luxmiInvestCare.com</span>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
          MAIN CONTACT AREA
      ========================================================== */}
            <section className="section bg-slate-50">

                <div className="container-custom">

                    <div className="grid gap-10 lg:grid-cols-2">

                        {/* =====================================================
                ENQUIRY FORM
            ====================================================== */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">

                            <div className="mb-8">

                                <span className="text-sm font-semibold uppercase tracking-wide text-green-700">
                                    SEND AN ENQUIRY
                                </span>

                                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                                    Tell Us How We Can Help
                                </h2>

                                <p className="mt-3 leading-7 text-slate-600">
                                    Share your details and enquiry. The form
                                    will prepare a WhatsApp message so you can
                                    connect with Luxmi InvestCare directly.
                                </p>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(event) =>
                                            setName(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Enter your full name"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                        autoComplete="name"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        Mobile Number
                                        <span className="text-red-600">
                                            {" "}*
                                        </span>
                                    </label>

                                    <input
                                        type="tel"
                                        value={mobile}
                                        onChange={(event) =>
                                            setMobile(
                                                event.target.value
                                                    .replace(
                                                        /\D/g,
                                                        "",
                                                    )
                                                    .slice(
                                                        0,
                                                        10,
                                                    ),
                                            )
                                        }
                                        placeholder="10-digit mobile number"
                                        inputMode="numeric"
                                        autoComplete="tel"
                                        maxLength={10}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        Your Enquiry
                                    </label>

                                    <textarea
                                        rows={6}
                                        value={message}
                                        onChange={(event) =>
                                            setMessage(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Tell us what information you are looking for..."
                                        className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    />
                                </div>

                                {error && (
                                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                                >
                                    <Send className="h-4 w-4" />
                                    Continue on WhatsApp
                                </button>

                                <p className="text-xs leading-5 text-slate-500">
                                    Your details are used to respond to your
                                    investor education and information enquiry.
                                </p>

                            </form>

                        </div>

                        {/* =====================================================
                CONTACT INFORMATION
            ====================================================== */}
                        <div className="space-y-6">

                            {/* Contact cards */}
                            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">

                                <span className="text-sm font-semibold uppercase tracking-wide text-green-700">
                                    CONTACT INFORMATION
                                </span>

                                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                                    Reach Luxmi InvestCare
                                </h2>

                                <div className="mt-8 space-y-6">

                                    <a
                                        href={CONTACT.phone}
                                        className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-green-200 hover:bg-green-50"
                                    >
                                        <Phone className="mt-1 h-6 w-6 text-green-700" />

                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                Phone
                                            </p>

                                            <p className="mt-1 text-slate-600">
                                                {CONTACT.phoneDisplay}
                                            </p>
                                        </div>
                                    </a>

                                    <a
                                        href={CONTACT.emailLink}
                                        className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-green-200 hover:bg-green-50"
                                    >
                                        <Mail className="mt-1 h-6 w-6 text-green-700" />

                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                Email
                                            </p>

                                            <p className="mt-1 text-slate-600">
                                                {CONTACT.email}
                                            </p>
                                        </div>
                                    </a>

                                    <div className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4">
                                        <MapPin className="mt-1 h-6 w-6 text-green-700" />

                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                Office Address
                                            </p>

                                            <p className="mt-1 leading-7 text-slate-600">
                                                {CONTACT.address.map(
                                                    (line) => (
                                                        <span
                                                            key={line}
                                                            className="block"
                                                        >
                                                            {line}
                                                        </span>
                                                    ),
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4">
                                        <Clock className="mt-1 h-6 w-6 text-green-700" />

                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                Business Hours
                                            </p>

                                            <p className="mt-1 leading-7 text-slate-600">
                                                {CONTACT.hours.map(
                                                    (line) => (
                                                        <span
                                                            key={line}
                                                            className="block"
                                                        >
                                                            {line}
                                                        </span>
                                                    ),
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* WhatsApp */}
                            <div className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-8 text-white shadow-sm">

                                <div className="flex items-start gap-4">

                                    <MessageCircle className="mt-1 h-10 w-10 shrink-0" />

                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-wide text-green-100">
                                            QUICK CONNECT
                                        </p>

                                        <h2 className="mt-2 text-2xl font-bold">
                                            Chat on WhatsApp
                                        </h2>

                                        <p className="mt-2 leading-7 text-green-50">
                                            Connect with Luxmi InvestCare for
                                            investor education and information
                                            related to your enquiry.
                                        </p>
                                    </div>

                                </div>

                                <a
                                    href={CONTACT.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
                                >
                                    <MessageCircle className="h-5 w-5" />
                                    Start WhatsApp Chat
                                </a>

                            </div>

                            {/* Website / ARN */}
                            <div className="rounded-3xl border border-green-200 bg-green-50 p-8">

                                <div className="flex items-start gap-4">

                                    <ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-green-700" />

                                    <div>

                                        <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                                            LUXMI INVESTCARE
                                        </p>

                                        <h2 className="mt-2 text-xl font-bold text-slate-900">
                                            AMFI Registered Mutual Fund Distributor
                                        </h2>

                                        <p className="mt-2 text-sm text-slate-600">
                                            {CONTACT.arn}
                                        </p>

                                        <a
                                            href={CONTACT.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 inline-block font-semibold text-green-700 hover:text-green-800"
                                        >
                                            www.luxmiInvestCare.com
                                        </a>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* =======================================================
              DISCLAIMER
          ======================================================== */}
                    <div className="mt-14 rounded-3xl border border-amber-200 bg-amber-50 p-8 lg:p-10">

                        <h2 className="text-xl font-bold text-slate-900">
                            Investor Education Disclaimer
                        </h2>

                        <p className="mt-4 max-w-5xl leading-8 text-slate-700">
                            The information and calculator illustrations provided
                            by Luxmi InvestCare are intended for investor education
                            and general information purposes only. Illustrations are
                            based on assumptions entered by the user and actual
                            outcomes may differ. Mutual Fund investments are subject
                            to market risks. Please read all scheme-related
                            documents carefully before investing.
                        </p>

                    </div>

                </div>

            </section>
        </main>
    );
}
"use client";

import {
    Landmark,
    PiggyBank,
    ShieldCheck,
    GraduationCap,
    HeartPulse,
    Users,
    MessageCircle,
    ArrowRight,
} from "lucide-react";

const services = [
    {
        icon: Landmark,
        title: "Mutual Funds",
        description:
            "Information and investor education about mutual fund products, investment concepts, market risks and the factors investors may consider before investing.",
    },
    {
        icon: PiggyBank,
        title: "SIP Investments",
        description:
            "Educational support to help investors understand Systematic Investment Plans, regular investing and the effect of contribution amount and investment period.",
    },
    {
        icon: ShieldCheck,
        title: "Life Insurance",
        description:
            "Information about life insurance products and the role of insurance in protecting family financial needs.",
    },
    {
        icon: HeartPulse,
        title: "Health Insurance",
        description:
            "Information about health insurance products, coverage considerations and the importance of understanding policy terms and conditions.",
    },
    {
        icon: GraduationCap,
        title: "Investor Education",
        description:
            "Educational resources covering mutual funds, SIPs, inflation, market risks, investment terminology and basic investing concepts.",
    },
    {
        icon: Users,
        title: "Investor Support",
        description:
            "General support for understanding product information, illustrations, application processes and investor-related documentation.",
    },
];

export default function ServicesPage() {
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
                            Investor Education & Product Information
                        </span>

                        <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-6xl">
                            Explore Our
                            <span className="block text-green-300">
                                Services
                            </span>
                        </h1>

                        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-green-100 lg:text-xl">
                            Explore mutual funds, SIP investments, insurance and
                            investor education resources designed to help you
                            understand financial products and investing concepts.
                        </p>

                    </div>

                </div>
            </section>

            {/* =========================================================
          SERVICES GRID
      ========================================================== */}
            <section className="section bg-slate-50">

                <div className="container-custom">

                    <div className="mx-auto max-w-3xl text-center">

                        <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
                            WHAT WE OFFER
                        </span>

                        <h2 className="section-title mt-6">
                            Information. Education.
                            <span className="block text-green-700">
                                Investor Support.
                            </span>
                        </h2>

                        <p className="section-subtitle mx-auto">
                            Explore the areas in which Luxmi InvestCare provides
                            product information, investor education and general
                            support.
                        </p>

                    </div>

                    <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">

                        {services.map((service) => {
                            const Icon = service.icon;

                            return (
                                <article
                                    key={service.title}
                                    className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
                                >

                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                        <Icon className="h-8 w-8" />
                                    </div>

                                    <h3 className="mt-7 text-2xl font-bold text-slate-900">
                                        {service.title}
                                    </h3>

                                    <p className="mt-4 flex-1 leading-7 text-slate-600">
                                        {service.description}
                                    </p>

                                    <a
                                        href="/contact"
                                        className="mt-8 inline-flex items-center font-semibold text-green-700 transition hover:text-green-800"
                                    >
                                        Learn More
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </a>

                                </article>
                            );
                        })}

                    </div>

                </div>
            </section>

            {/* =========================================================
          EDUCATIONAL SUPPORT
      ========================================================== */}
            <section className="section bg-white">

                <div className="container-custom">

                    <div className="grid gap-8 lg:grid-cols-2">

                        <div className="rounded-3xl border border-green-200 bg-green-50 p-8 lg:p-10">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                <GraduationCap className="h-6 w-6" />
                            </div>

                            <h2 className="mt-6 text-2xl font-bold text-slate-900">
                                Investor Education
                            </h2>

                            <p className="mt-4 leading-8 text-slate-700">
                                Learn about mutual funds, SIPs, inflation, market
                                risks, investment terminology and other investing
                                concepts through our educational resources and
                                calculators.
                            </p>

                            <a
                                href="/investor-education"
                                className="mt-6 inline-flex items-center font-semibold text-green-700 hover:text-green-800"
                            >
                                Explore Investor Education
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </a>

                        </div>

                        <div className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-8 text-white shadow-xl lg:p-10">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                                <MessageCircle className="h-6 w-6" />
                            </div>

                            <h2 className="mt-6 text-2xl font-bold">
                                Need More Information?
                            </h2>

                            <p className="mt-4 leading-8 text-green-50">
                                Share your enquiry with Luxmi InvestCare for
                                investor education and information related to
                                the products or illustrations you are exploring.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">

                                <a
                                    href="/contact"
                                    className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
                                >
                                    Contact Us
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>

                                <a
                                    href="https://wa.me/919650060044"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
                                >
                                    WhatsApp
                                    <MessageCircle className="ml-2 h-4 w-4" />
                                </a>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
          DISCLAIMER
      ========================================================== */}
            <section className="bg-slate-50 pb-20">

                <div className="container-custom">

                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 lg:p-10">

                        <h2 className="text-xl font-bold text-slate-900">
                            Investor Education Disclaimer
                        </h2>

                        <p className="mt-4 max-w-5xl leading-8 text-slate-700">
                            The information provided on this page is intended for
                            investor education and general information purposes
                            only. Product information and calculator illustrations
                            are based on assumptions and may not reflect actual
                            future outcomes. Mutual Fund investments are subject
                            to market risks. Please read all scheme-related
                            documents carefully before investing.
                        </p>

                    </div>

                </div>
            </section>

        </main>
    );
}
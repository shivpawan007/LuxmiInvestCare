import {
    ShieldCheck,
    GraduationCap,
    Target,
    Eye,
    TrendingUp,
    Users,
    ArrowRight,
} from "lucide-react";

const focusAreas = [
    {
        icon: GraduationCap,
        title: "Investor Education",
        description:
            "Educational information to help investors understand mutual funds, SIPs, investment terminology, market risks and long-term investing concepts.",
    },
    {
        icon: ShieldCheck,
        title: "Transparent Information",
        description:
            "Clear information about investment products, illustrations, assumptions and relevant risks so investors can make informed decisions.",
    },
    {
        icon: Target,
        title: "Investment Awareness",
        description:
            "Educational resources that help investors understand investment objectives, time horizons and factors to consider before investing.",
    },
    {
        icon: TrendingUp,
        title: "Disciplined Investing",
        description:
            "Encouraging regular and disciplined investing habits while keeping attention on the selected investment horizon.",
    },
    {
        icon: Users,
        title: "Investor Support",
        description:
            "General support for understanding product information, illustrations, application processes and investor documentation.",
    },
    {
        icon: Eye,
        title: "Risk Awareness",
        description:
            "Helping investors recognise that investments involve risk and encouraging careful review of relevant product and scheme information.",
    },
];

export default function AboutPage() {
    return (
        <main className="bg-white">

            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="relative overflow-hidden bg-green-950 py-24 text-white">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_45%)]" />

                <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-green-700/30 blur-3xl" />

                <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

                <div className="container-custom relative z-10">

                    <div className="mx-auto max-w-4xl text-center">

                        <span className="inline-flex items-center gap-2 rounded-full border border-green-300/30 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur">
                            <ShieldCheck className="h-5 w-5 text-green-300" />
                            About Luxmi InvestCare
                        </span>

                        <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-6xl">
                            Understanding Investing
                            <span className="block text-green-300">
                                Through Education & Clarity
                            </span>
                        </h1>

                        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-green-100 lg:text-xl">
                            Luxmi InvestCare focuses on investor education,
                            investment product information, transparency and
                            disciplined investing.
                        </p>

                    </div>

                </div>
            </section>

            {/* =====================================================
                ABOUT
            ====================================================== */}
            <section className="section bg-white">

                <div className="container-custom">

                    <div className="grid items-center gap-14 lg:grid-cols-2">

                        <div>

                            <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
                                WHO WE ARE
                            </span>

                            <h2 className="section-title mt-6">
                                Helping Investors
                                <span className="block text-green-700">
                                    Understand Before They Invest
                                </span>
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                Luxmi InvestCare is focused on helping
                                investors understand investment concepts,
                                mutual funds, SIPs, insurance products and
                                the risks associated with investing.
                            </p>

                            <p className="mt-5 leading-8 text-slate-600">
                                Our approach is based on education,
                                transparent information and disciplined
                                investing. We aim to make investment
                                concepts easier to understand so investors
                                can evaluate information carefully before
                                making decisions.
                            </p>

                            <div className="mt-8">
                                <a
                                    href="/investor-education"
                                    className="inline-flex items-center rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                                >
                                    Explore Investor Education
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </div>

                        </div>

                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">

                            <img
                                src="/images/about.jpg"
                                alt="Luxmi InvestCare"
                                className="h-full min-h-[420px] w-full object-cover"
                            />

                        </div>

                    </div>

                </div>
            </section>

            {/* =====================================================
                FOCUS AREAS
            ====================================================== */}
            <section className="section bg-slate-50">

                <div className="container-custom">

                    <div className="mx-auto max-w-3xl text-center">

                        <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
                            OUR FOCUS
                        </span>

                        <h2 className="section-title mt-6">
                            Education. Transparency.
                            <span className="block text-green-700">
                                Investor Support.
                            </span>
                        </h2>

                        <p className="section-subtitle mx-auto">
                            Our public resources and investor support are
                            designed around understanding investment products,
                            assumptions and risks.
                        </p>

                    </div>

                    <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">

                        {focusAreas.map((area) => {
                            const Icon = area.icon;

                            return (
                                <article
                                    key={area.title}
                                    className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
                                >

                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                        <Icon className="h-8 w-8" />
                                    </div>

                                    <h3 className="mt-7 text-2xl font-bold text-slate-900">
                                        {area.title}
                                    </h3>

                                    <p className="mt-4 flex-1 leading-7 text-slate-600">
                                        {area.description}
                                    </p>

                                </article>
                            );
                        })}

                    </div>

                </div>
            </section>

            {/* =====================================================
                VISION + MISSION
            ====================================================== */}
            <section className="section bg-white">

                <div className="container-custom">

                    <div className="grid gap-8 lg:grid-cols-2">

                        <div className="rounded-3xl border border-green-200 bg-green-50 p-8 lg:p-10">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                <Eye className="h-7 w-7" />
                            </div>

                            <h2 className="mt-6 text-3xl font-bold text-slate-900">
                                Our Vision
                            </h2>

                            <p className="mt-5 leading-8 text-slate-700">
                                To encourage greater investor awareness by
                                making investment concepts, product information
                                and risk considerations easier to understand.
                            </p>

                        </div>

                        <div className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-8 text-white shadow-xl lg:p-10">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                                <Target className="h-7 w-7" />
                            </div>

                            <h2 className="mt-6 text-3xl font-bold">
                                Our Mission
                            </h2>

                            <p className="mt-5 leading-8 text-green-50">
                                To provide useful investor education,
                                understandable investment information and
                                interactive tools that encourage informed
                                and disciplined investing.
                            </p>

                        </div>

                    </div>

                </div>
            </section>

            {/* =====================================================
                DISTRIBUTOR INFORMATION
            ====================================================== */}
            <section className="section bg-slate-50">

                <div className="container-custom">

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">

                        <div className="grid items-center gap-8 lg:grid-cols-2">

                            <div>

                                <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                                    REGISTRATION INFORMATION
                                </span>

                                <h2 className="mt-5 text-3xl font-bold text-slate-900">
                                    Luxmi InvestCare
                                </h2>

                                <p className="mt-3 text-lg font-semibold text-green-700">
                                    AMFI Registered Mutual Fund Distributor
                                </p>

                                <p className="mt-2 text-slate-600">
                                    ARN-365140
                                </p>

                            </div>

                            <div className="rounded-2xl bg-slate-50 p-6">

                                <p className="leading-8 text-slate-600">
                                    Mutual Fund investments are subject to
                                    market risks. Please read all
                                    scheme-related documents carefully before
                                    investing.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* =====================================================
                CTA
            ====================================================== */}
            <section className="bg-white pb-20">

                <div className="container-custom">

                    <div className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-8 text-center text-white shadow-xl lg:p-12">

                        <h2 className="text-3xl font-bold lg:text-4xl">
                            Continue Your Investor Education Journey
                        </h2>

                        <p className="mx-auto mt-4 max-w-3xl leading-8 text-green-50">
                            Explore educational resources, interactive
                            calculators or contact Luxmi InvestCare for
                            information related to your enquiry.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">

                            <a
                                href="/investor-education"
                                className="inline-flex items-center rounded-xl bg-white px-7 py-3 font-semibold text-green-700 transition hover:bg-green-50"
                            >
                                Investor Education
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </a>

                            <a
                                href="/calculators"
                                className="inline-flex items-center rounded-xl border border-white/30 bg-white/10 px-7 py-3 font-semibold text-white transition hover:bg-white/15"
                            >
                                Explore Calculators
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </a>

                            <a
                                href="/contact"
                                className="inline-flex items-center rounded-xl border border-white/30 bg-white/10 px-7 py-3 font-semibold text-white transition hover:bg-white/15"
                            >
                                Contact Us
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </a>

                        </div>

                    </div>

                </div>
            </section>

            {/* =====================================================
                DISCLAIMER
            ====================================================== */}
            <section className="bg-slate-50 pb-20">

                <div className="container-custom">

                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8">

                        <h2 className="text-xl font-bold text-slate-900">
                            Investor Education Disclaimer
                        </h2>

                        <p className="mt-4 leading-8 text-slate-700">
                            The information on this page is provided for
                            investor education and general information
                            purposes only. Investment products involve
                            risks and actual outcomes may differ from
                            illustrations or assumptions. Please read
                            all relevant scheme and product documents
                            carefully before investing.
                        </p>

                    </div>

                </div>
            </section>

        </main>
    );
}
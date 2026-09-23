import Link from "next/link";
import MutualFundRiskWarning from "@/components/compliance/MutualFundRiskWarning";
import MfdDisclosure from "@/components/compliance/MfdDisclosure";

export const metadata = {
    title: "Privacy Policy | Luxmi InvestCare",
    description:
        "Privacy notice describing how Luxmi InvestCare handles information submitted through its website.",
};

const NOTICE_VERSION = "Privacy Notice v1.0 | 23 September 2026";

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-white">
            <section className="bg-green-950 py-20 text-white">
                <div className="container-custom">
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="inline-flex rounded-full border border-green-300/30 bg-white/10 px-5 py-2 text-sm font-semibold">
                            PRIVACY
                        </span>
                        <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">
                            Privacy Policy
                        </h1>
                        <p className="mx-auto mt-5 max-w-3xl text-green-100">
                            This notice explains what information Luxmi InvestCare
                            collects through this website, why it is used, and
                            how you can contact us about your information.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-custom">
                    <div className="mx-auto max-w-4xl space-y-10">
                        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                            <p className="text-sm font-semibold text-green-800">
                                {NOTICE_VERSION}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                                This website is operated by Luxmi InvestCare,
                                an AMFI-registered Mutual Fund Distributor
                                (ARN: 365140).
                            </p>
                        </div>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">
                                1. Information we collect
                            </h2>
                            <p className="mt-3 leading-7 text-slate-600">
                                When you submit an enquiry or use a report-sharing
                                form, we may collect the information you choose
                                to provide, including your name, mobile number,
                                email address and enquiry/message.
                            </p>
                            <p className="mt-3 leading-7 text-slate-600">
                                Calculator inputs are primarily used in your
                                browser to generate illustrations. Report-sharing
                                activity may use browser local storage for
                                non-identifying activity history.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">
                                2. Why we use the information
                            </h2>
                            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-slate-600">
                                <li>To receive and respond to your enquiry.</li>
                                <li>
                                    To provide investor education and general
                                    product information requested by you.
                                </li>
                                <li>
                                    To enable the report-sharing options you
                                    select.
                                </li>
                                <li>
                                    To maintain website, security and service
                                    records where reasonably necessary.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">
                                3. WhatsApp, email and external services
                            </h2>
                            <p className="mt-3 leading-7 text-slate-600">
                                When you choose WhatsApp, email, Google Maps or
                                another external service, your interaction is
                                handled by that external service under its own
                                terms and privacy practices. Contact enquiries
                                submitted through this website are first sent to
                                our website backend and may then open WhatsApp
                                with the enquiry details so that you can continue
                                the conversation there.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">
                                4. Storage and retention
                            </h2>
                            <p className="mt-3 leading-7 text-slate-600">
                                Website enquiries are stored in our lead-management
                                database so that we can respond and maintain
                                appropriate business and compliance records. We
                                retain information only for as long as reasonably
                                necessary for the stated purposes, applicable
                                legal or regulatory requirements, dispute
                                handling and legitimate record-keeping needs.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">
                                5. Your choices and requests
                            </h2>
                            <p className="mt-3 leading-7 text-slate-600">
                                You may contact us to ask about the personal
                                information associated with your enquiry, request
                                correction of inaccurate information, ask about
                                deletion where applicable, or withdraw consent
                                where processing is based on consent. We will
                                handle requests subject to applicable legal,
                                regulatory and record-retention requirements.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">
                                6. Contact for privacy requests
                            </h2>
                            <p className="mt-3 leading-7 text-slate-600">
                                Email:{" "}
                                <a
                                    href="mailto:info@luxmiinvestcare.com"
                                    className="font-semibold text-green-700 underline"
                                >
                                    info@luxmiinvestcare.com
                                </a>
                                <br />
                                Phone: +91 9650060044
                                <br />
                                Address: 1063, D-Block, Street-6, Sanjay
                                Enclave, Faridabad – 121005, Haryana, India
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">
                                7. Changes to this notice
                            </h2>
                            <p className="mt-3 leading-7 text-slate-600">
                                We may update this notice when our website,
                                processing practices, legal requirements or
                                regulatory obligations change. The version date
                                shown at the top identifies the current notice.
                            </p>
                        </section>

                        <MfdDisclosure />

                        <div className="border-t border-slate-200 pt-8">
                            <MutualFundRiskWarning />
                            <p className="mt-4 text-center text-xs text-slate-500">
                                <Link
                                    href="/regulatory-disclosures"
                                    className="underline"
                                >
                                    Regulatory Disclosures
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

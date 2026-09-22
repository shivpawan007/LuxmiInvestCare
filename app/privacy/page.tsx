import Link from "next/link";
import MutualFundRiskWarning from "@/components/compliance/MutualFundRiskWarning";

export const metadata = {
    title: "Privacy Policy | Luxmi InvestCare",
    description:
        "Privacy information for Luxmi InvestCare website visitors and enquiry/report-sharing users.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-white">
            <section className="bg-green-950 py-16 text-white">
                <div className="container-custom">
                    <p className="text-sm font-semibold uppercase tracking-wide text-green-300">
                        Privacy & Data
                    </p>
                    <h1 className="mt-3 text-4xl font-bold">Privacy Policy</h1>
                    <p className="mt-4 max-w-3xl leading-7 text-green-100">
                        This notice explains how Luxmi InvestCare handles information
                        submitted through this website.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container-custom max-w-4xl">
                    <div className="space-y-10 text-slate-700">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">1. Who we are</h2>
                            <p className="mt-3 leading-7">
                                Luxmi InvestCare is an AMFI-registered Mutual Fund Distributor
                                (ARN: 365140). This website is intended for investor education
                                and general investment information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">2. Information we collect</h2>
                            <p className="mt-3 leading-7">
                                When you submit an enquiry, we may collect your name, mobile
                                number, email address and enquiry message. The website may also
                                record the page from which an enquiry was submitted so that the
                                enquiry can be handled correctly.
                            </p>
                            <p className="mt-3 leading-7">
                                When you use the calculator report-sharing feature, the details
                                you enter are used in the current browser session to enable the
                                selected sharing action. The website's report-share history is
                                stored in browser local storage on your device.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">3. Why we use the information</h2>
                            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
                                <li>To respond to your enquiry or request for investor information.</li>
                                <li>To facilitate the report-sharing option you select.</li>
                                <li>To maintain website enquiry and operational records.</li>
                                <li>To improve website functionality and investor education resources.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">4. WhatsApp, email and external services</h2>
                            <p className="mt-3 leading-7">
                                If you choose to continue an enquiry or share a report through
                                WhatsApp or email, the website opens the relevant external
                                service with the information needed for that action. Those
                                services are governed by their own terms and privacy policies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">5. Consent and withdrawal</h2>
                            <p className="mt-3 leading-7">
                                Where this website asks for consent to process personal data,
                                consent is requested through a clear affirmative action. You may
                                contact us at info@luxmiinvestcare.com to ask about your submitted
                                information or to withdraw consent for processing that depends
                                on consent, subject to applicable legal and record-keeping
                                requirements.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">6. Data security and retention</h2>
                            <p className="mt-3 leading-7">
                                We use reasonable technical and organisational measures for the
                                website information handled by us. Enquiry information is retained
                                only for as long as reasonably required for the stated purposes,
                                operational records, dispute handling, regulatory requirements or
                                other lawful purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">7. Your questions and complaints</h2>
                            <p className="mt-3 leading-7">
                                For privacy questions or requests concerning information submitted
                                through this website, contact:
                            </p>
                            <p className="mt-3 leading-7">
                                <strong>Luxmi InvestCare</strong><br />
                                Email: info@luxmiinvestcare.com<br />
                                Phone: +91 9650060044
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">8. Investor information</h2>
                            <p className="mt-3 leading-7">
                                Calculator outputs and website information are educational and
                                illustrative. They are not a guarantee of future performance or
                                personalised investment advice.
                            </p>
                            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <MutualFundRiskWarning />
                            </div>
                        </section>

                        <div className="border-t border-slate-200 pt-6 text-sm text-slate-500">
                            <Link href="/contact" className="font-semibold text-green-700 hover:underline">
                                Contact Luxmi InvestCare
                            </Link>
                            <span className="mx-2">·</span>
                            <Link href="/disclosures" className="font-semibold text-green-700 hover:underline">
                                Regulatory & Distribution Disclosures
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

import Link from "next/link";
import MutualFundRiskWarning from "@/components/compliance/MutualFundRiskWarning";

export const metadata = {
    title: "Regulatory & Distribution Disclosures | Luxmi InvestCare",
    description:
        "Regulatory, distribution and investor-education disclosures for Luxmi InvestCare.",
};

export default function DisclosuresPage() {
    return (
        <main className="bg-white">
            <section className="bg-green-950 py-16 text-white">
                <div className="container-custom">
                    <p className="text-sm font-semibold uppercase tracking-wide text-green-300">
                        Investor Disclosure
                    </p>
                    <h1 className="mt-3 text-4xl font-bold">
                        Regulatory & Distribution Disclosures
                    </h1>
                    <p className="mt-4 max-w-3xl leading-7 text-green-100">
                        Important information about Luxmi InvestCare's role,
                        website content, mutual fund distribution activity and
                        investor grievance process.
                    </p>
                    <p className="mt-3 text-sm text-green-200">
                        Last updated: 26 September 2026
                    </p>
                    <p className="mt-3 text-sm text-green-200">Last updated: 26 September 2026</p>
                </div>
            </section>

            <section className="section">
                <div className="container-custom max-w-4xl">
                    <div className="space-y-10 text-slate-700">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">MFD identity</h2>
                            <p className="mt-3 leading-7">
                                <strong>Luxmi InvestCare — AMFI-registered Mutual Fund Distributor | ARN: 365140.</strong>
                            </p>
                            <p className="mt-3 leading-7">
                                AMFI registration as a Mutual Fund Distributor does not by itself
                                constitute registration as a SEBI Investment Adviser. The website
                                is therefore positioned for investor education, general information
                                and mutual fund distribution-related information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">Investment advice and planning terminology</h2>
                            <p className="mt-3 leading-7">
                                The calculators and educational material are illustrative and
                                informational. They are not intended to provide personalised investment
                                advice, portfolio management, suitability assessment or a promise
                                of returns.
                            </p>
                            <p className="mt-3 leading-7">
                                The website does not hold Luxmi InvestCare out as a SEBI-registered Investment Adviser
                                or as a provider of personalised investment advice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">Distribution disclosure</h2>
                            <p className="mt-3 leading-7">
                                As a mutual fund distributor, Luxmi InvestCare may receive
                                distribution-related remuneration in connection with mutual fund
                                distribution business, where applicable under the relevant
                                arrangements. Investors should review the relevant scheme documents
                                and disclosures before investing.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">Calculator and illustration disclosure</h2>
                            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
                                <li>Calculator results are based on the assumptions entered by the user.</li>
                                <li>Assumed returns are illustrative and are not forecasts or guarantees.</li>
                                <li>Actual returns, costs, taxes, scheme performance and investment outcomes may differ.</li>
                                <li>Illustrative amounts are not personalised investment instructions and should not be treated as a direction to buy, sell or switch a security.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">Insurance information</h2>
                            <p className="mt-3 leading-7">
                                References to insurance on this website are presented as information
                                unless a separately disclosed and appropriately authorised service
                                is identified. The appearance of insurance information on this website does not constitute a direction to purchase any insurance product.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">Investor grievance redressal</h2>
                            <p className="mt-3 leading-7">
                                For a complaint relating to Luxmi InvestCare's mutual fund
                                distribution activity, investors should first contact Luxmi
                                InvestCare using the contact details on this website. If the
                                grievance is not resolved through the concerned entity,
                                investors may use SEBI's SCORES platform where the matter is
                                within SCORES' scope.
                            </p>
                            <p className="mt-3 leading-7">
                                <a
                                    href="https://scores.sebi.gov.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-green-700 underline"
                                >
                                    SEBI SCORES — Investor Complaint Redressal
                                </a>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">Investor grievance redressal</h2>
                            <p className="mt-3 leading-7">
                                For a complaint relating to Luxmi InvestCare's mutual fund
                                distribution activity, investors should first contact Luxmi
                                InvestCare using the contact details on this website. If the
                                grievance is not resolved through the concerned entity,
                                investors may use SEBI's SCORES platform where the matter is
                                within SCORES' scope.
                            </p>
                            <p className="mt-3 leading-7">
                                SEBI SCORES: scores.sebi.gov.in
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">Standard mutual fund risk warning</h2>
                            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
                                <MutualFundRiskWarning />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900">Regulatory references</h2>
                            <p className="mt-3 leading-7">
                                The website's compliance wording is designed with reference to
                                applicable SEBI mutual fund advertising requirements and AMFI
                                guidance for Mutual Fund Distributors. Regulatory requirements can
                                change, so this page does not constitute legal advice or regulatory
                                certification.
                            </p>
                        </section>

                        <div className="border-t border-slate-200 pt-6 text-sm text-slate-500">
                            <Link href="/privacy" className="font-semibold text-green-700 hover:underline">
                                Privacy Policy
                            </Link>
                            <span className="mx-2">·</span>
                            <Link href="/contact" className="font-semibold text-green-700 hover:underline">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

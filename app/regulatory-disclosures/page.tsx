import Link from "next/link";
import MfdDisclosure from "@/components/compliance/MfdDisclosure";
import MutualFundRiskWarning from "@/components/compliance/MutualFundRiskWarning";

export const metadata = {
    title: "Regulatory Disclosures | Luxmi InvestCare",
    description:
        "Regulatory and investor-education disclosures for Luxmi InvestCare.",
};

export default function RegulatoryDisclosuresPage() {
    return (
        <main className="bg-white">
            <section className="bg-green-950 py-20 text-white">
                <div className="container-custom">
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="inline-flex rounded-full border border-green-300/30 bg-white/10 px-5 py-2 text-sm font-semibold">
                            DISCLOSURES
                        </span>
                        <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">
                            Regulatory Disclosures
                        </h1>
                        <p className="mx-auto mt-5 max-w-3xl text-green-100">
                            Important information about Luxmi InvestCare's
                            role, website content and mutual-fund risk disclosures.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-custom">
                    <div className="mx-auto max-w-4xl space-y-8">
                        <MfdDisclosure />

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Investor education and general information
                            </h2>
                            <p className="mt-3 leading-7 text-slate-600">
                                Website content, calculators, illustrations and
                                educational resources are intended to help users
                                understand investment concepts and available
                                product information. They are not a guarantee of
                                future returns and should not by themselves be
                                treated as personalised investment advice.
                            </p>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Calculator illustrations
                            </h2>
                            <p className="mt-3 leading-7 text-slate-600">
                                Calculator results depend on the assumptions
                                entered by the user. Assumed rates, inflation,
                                time periods and other inputs are illustrative.
                                Actual investment outcomes may differ because of
                                market conditions, scheme performance, costs,
                                taxes and other factors.
                            </p>
                            <p className="mt-3 leading-7 text-slate-600">
                                A calculator output does not select a mutual-fund
                                scheme, guarantee a return or establish that a
                                particular product is suitable for an investor.
                            </p>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900">
                                No scheme ranking or performance endorsement
                            </h2>
                            <p className="mt-3 leading-7 text-slate-600">
                                Luxmi InvestCare does not use customer testimonials,
                                scheme rankings or guaranteed-return claims on
                                this website. Any future scheme-specific
                                communication should be separately reviewed before
                                publication.
                            </p>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Distribution disclosure
                            </h2>
                            <p className="mt-3 leading-7 text-slate-600">
                                Luxmi InvestCare is a mutual fund distributor.
                                Where applicable, it may receive distribution-related
                                remuneration from asset management companies for
                                mutual fund distribution services. Investors should
                                consider the relevant scheme documents and
                                disclosures before investing.
                            </p>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Information boundaries
                            </h2>
                            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-slate-600">
                                <li>
                                    Website calculators are educational
                                    illustrations, not personalised investment
                                    advice.
                                </li>
                                <li>
                                    No return is guaranteed or promised by the
                                    calculator assumptions.
                                </li>
                                <li>
                                    Insurance content is presented as general
                                    information unless a separate authorised
                                    distribution process is clearly identified.
                                </li>
                                <li>
                                    Third-party websites and services linked from
                                    this website are governed by their own terms
                                    and policies.
                                </li>
                            </ul>
                        </section>

                        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                            <MutualFundRiskWarning />
                        </div>

                        <div className="text-center text-sm text-slate-500">
                            <Link
                                href="/privacy-policy"
                                className="font-semibold text-green-700 underline"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

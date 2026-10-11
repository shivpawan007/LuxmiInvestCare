import Link from "next/link";

interface MfdDisclosureProps {
    compact?: boolean;
}

export default function MfdDisclosure({
    compact = false,
}: MfdDisclosureProps) {
    return (
        <div
            className={
                compact
                    ? "text-center text-xs leading-5 text-slate-500"
                    : "rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600"
            }
        >
            <p className="font-semibold text-green-700">
                AMFI-registered Mutual Fund Distributor | ARN: 365140
            </p>

            {!compact && (
                <>
                    <p className="mt-2">
                        Luxmi InvestCare provides investor education and
                        information as a mutual fund distributor. This website
                        does not provide personalised investment advice or
                        guarantee returns.
                    </p>

                    <p className="mt-2">
                        As a mutual fund distributor, Luxmi InvestCare may
                        receive distribution-related remuneration from asset
                        management companies for mutual fund distribution
                        services, as applicable.
                    </p>

                    <p className="mt-2">
                        Information on this website is educational and general
                        in nature. Investors should review the relevant scheme
                        documents and make their own investment decisions.
                    </p>

                    <p className="mt-2">
                        See our{" "}
                        <Link
                            href="/regulatory-disclosures"
                            className="font-semibold text-green-700 underline"
                        >
                            Regulatory Disclosures
                        </Link>{" "}
                        for additional information.
                    </p>
                </>
            )}
        </div>
    );
}

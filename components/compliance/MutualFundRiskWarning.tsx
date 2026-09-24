export const MUTUAL_FUND_STANDARD_WARNING =
    "Mutual Fund investments are subject to market risks, read all scheme related documents carefully.";

interface MutualFundRiskWarningProps {
    className?: string;
}

export default function MutualFundRiskWarning({
    className = "",
}: MutualFundRiskWarningProps) {
    return (
        <p
            className={`text-center text-sm leading-6 text-slate-500 ${className}`}
        >
            {MUTUAL_FUND_STANDARD_WARNING}
        </p>
    );
}

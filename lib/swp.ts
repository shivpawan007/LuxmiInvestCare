export interface SWPProjection {
    year: number;
    openingCorpus: number;
    annualWithdrawal: number;
    withdrawal: number;
    growth: number;
    closingCorpus: number;
    estimatedValue: number;
}

export interface SWPResult {
    initialInvestment: number;
    monthlyWithdrawal: number;
    annualReturn: number;
    years: number;

    totalWithdrawn: number;
    estimatedValue: number;
    wealthGain: number;
    sustainable: boolean;

    remainingCorpus: number;
    estimatedGrowth: number;
    projections: SWPProjection[];
}

/**
 * Systematic Withdrawal Plan (SWP) calculation.
 *
 * Illustrative projection using a constant assumed annual return
 * and a constant monthly withdrawal.
 */
export function calculateSWP(
    initialInvestment: number,
    monthlyWithdrawal: number,
    annualReturn: number,
    years: number
): SWPResult {
    const months = Math.max(0, Math.floor(years * 12));
    const monthlyRate = annualReturn / 100 / 12;

    let corpus = Math.max(0, initialInvestment);
    let totalWithdrawn = 0;

    const projections: SWPProjection[] = [];

    for (let year = 1; year <= Math.ceil(years); year++) {
        const openingCorpus = corpus;

        let annualWithdrawal = 0;
        let yearlyGrowth = 0;

        const monthsInYear = Math.min(
            12,
            months - (year - 1) * 12
        );

        if (monthsInYear <= 0) {
            break;
        }

        for (let month = 0; month < monthsInYear; month++) {
            if (corpus <= 0) {
                corpus = 0;
                break;
            }

            const growth = corpus * monthlyRate;

            corpus += growth;
            yearlyGrowth += growth;

            const withdrawal = Math.min(
                Math.max(0, monthlyWithdrawal),
                corpus
            );

            corpus -= withdrawal;

            annualWithdrawal += withdrawal;
            totalWithdrawn += withdrawal;
        }

        projections.push({
            year,
            openingCorpus,
            annualWithdrawal,
            withdrawal: annualWithdrawal,
            growth: yearlyGrowth,
            closingCorpus: Math.max(0, corpus),
            estimatedValue: Math.max(0, corpus),
        });

        if (corpus <= 0) {
            corpus = 0;
            break;
        }
    }

    const remainingCorpus = Math.max(0, corpus);

    // Compatibility fields used by the existing SWP UI.
    const estimatedValue = remainingCorpus;

    const wealthGain =
        totalWithdrawn +
        estimatedValue -
        Math.max(0, initialInvestment);

    const sustainable =
        projections.length === 0 ||
        remainingCorpus > 0;

    return {
        initialInvestment,
        monthlyWithdrawal,
        annualReturn,
        years,

        totalWithdrawn,
        estimatedValue,
        wealthGain,
        sustainable,

        remainingCorpus,
        estimatedGrowth: wealthGain,
        projections,
    };
}

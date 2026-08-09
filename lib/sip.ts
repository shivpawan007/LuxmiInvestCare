export interface SIPProjection {
    year: number;
    invested: number;
    value: number;
    estimatedReturns: number;
}

export interface SIPResult {
    monthlyInvestment: number;
    annualReturn: number;
    years: number;
    investedAmount: number;
    estimatedReturns: number;
    maturityValue: number;
    yearlyGrowth: SIPProjection[];
}

export function calculateSIPValue(
    monthlyInvestment: number,
    annualReturn: number,
    months: number
): number {
    const monthlyRate = annualReturn / 12 / 100;

    if (monthlyRate === 0) {
        return monthlyInvestment * months;
    }

    return (
        monthlyInvestment *
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
            (1 + monthlyRate))
    );
}

export function calculateSIPYearlyGrowth(
    monthlyInvestment: number,
    annualReturn: number,
    years: number
): SIPProjection[] {
    const projections: SIPProjection[] = [];

    for (let year = 1; year <= years; year++) {
        const months = year * 12;
        const invested = monthlyInvestment * months;
        const value = calculateSIPValue(
            monthlyInvestment,
            annualReturn,
            months
        );

        projections.push({
            year,
            invested,
            value,
            estimatedReturns: value - invested,
        });
    }

    return projections;
}

export function calculateSIP(
    monthlyInvestment: number,
    annualReturn: number,
    years: number
): SIPResult {
    const months = years * 12;

    const investedAmount = monthlyInvestment * months;

    const maturityValue = calculateSIPValue(
        monthlyInvestment,
        annualReturn,
        months
    );

    const estimatedReturns = maturityValue - investedAmount;

    const yearlyGrowth = calculateSIPYearlyGrowth(
        monthlyInvestment,
        annualReturn,
        years
    );

    return {
        monthlyInvestment,
        annualReturn,
        years,
        investedAmount,
        estimatedReturns,
        maturityValue,
        yearlyGrowth,
    };
}

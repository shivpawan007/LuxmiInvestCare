export interface SIPResult {
    monthlyInvestment: number;
    annualReturn: number;
    years: number;
    investedAmount: number;
    estimatedReturns: number;
    maturityValue: number;
}

export function calculateSIP(
    monthlyInvestment: number,
    annualReturn: number,
    years: number
): SIPResult {
    const monthlyRate = annualReturn / 12 / 100;
    const months = years * 12;

    let maturityValue = 0;

    if (monthlyRate === 0) {
        maturityValue = monthlyInvestment * months;
    } else {
        maturityValue =
            monthlyInvestment *
            (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
                (1 + monthlyRate));
    }

    const investedAmount = monthlyInvestment * months;

    const estimatedReturns = maturityValue - investedAmount;

    return {
        monthlyInvestment,
        annualReturn,
        years,
        investedAmount,
        estimatedReturns,
        maturityValue,
    };
}
export interface LumpsumResult {
    investment: number;
    estimatedReturns: number;
    maturityValue: number;
}

export function calculateLumpsum(
    investment: number,
    annualReturn: number,
    years: number
): LumpsumResult {
    const maturityValue =
        investment * Math.pow(1 + annualReturn / 100, years);

    const estimatedReturns =
        maturityValue - investment;

    return {
        investment,
        estimatedReturns,
        maturityValue,
    };
}
export interface LumpsumProjection {
    year: number;
    invested: number;
    value: number;
    estimatedReturns: number;
}

export interface LumpsumResult {
    investment: number;
    estimatedReturns: number;
    maturityValue: number;
    yearlyGrowth: LumpsumProjection[];
}

export function calculateLumpsumValue(
    investment: number,
    annualReturn: number,
    years: number
): number {
    return investment * Math.pow(1 + annualReturn / 100, years);
}

export function calculateLumpsumYearlyGrowth(
    investment: number,
    annualReturn: number,
    years: number
): LumpsumProjection[] {
    const projections: LumpsumProjection[] = [];

    for (let year = 1; year <= years; year++) {
        const value = calculateLumpsumValue(
            investment,
            annualReturn,
            year
        );

        projections.push({
            year,
            invested: investment,
            value,
            estimatedReturns: value - investment,
        });
    }

    return projections;
}

export function calculateLumpsum(
    investment: number,
    annualReturn: number,
    years: number
): LumpsumResult {
    const maturityValue = calculateLumpsumValue(
        investment,
        annualReturn,
        years
    );

    const estimatedReturns = maturityValue - investment;

    const yearlyGrowth = calculateLumpsumYearlyGrowth(
        investment,
        annualReturn,
        years
    );

    return {
        investment,
        estimatedReturns,
        maturityValue,
        yearlyGrowth,
    };
}

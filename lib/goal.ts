export interface GoalCalculationResult {
    futureValue: number;
    monthlySIP: number;
    lumpsumRequired: number;
}

export function calculateGoal(
    targetAmount: number,
    years: number,
    expectedReturn: number,
    inflation: number
): GoalCalculationResult {

    const futureValue =
        targetAmount * Math.pow(1 + inflation / 100, years);

    const monthlyRate = expectedReturn / 12 / 100;
    const months = years * 12;

    const monthlySIP =
        monthlyRate === 0
            ? futureValue / months
            : (futureValue * monthlyRate) /
            (Math.pow(1 + monthlyRate, months) - 1);

    const lumpsumRequired =
        futureValue /
        Math.pow(1 + expectedReturn / 100, years);

    return {
        futureValue,
        monthlySIP,
        lumpsumRequired,
    };
}
import { calculateGoal } from "@/lib/goal";

export interface EducationCalculationResult {
  yearsToGoal: number;
  futureEducationCost: number;
  monthlySIP: number;
  lumpsumRequired: number;
}
export function calculateEducationPlan(
  currentAge: number,
  educationStartAge: number,
  currentEducationCost: number,
  expectedReturn: number,
  educationInflation: number
): EducationCalculationResult {
  const yearsToGoal = Math.max(
    1,
    educationStartAge - currentAge
  );

  const result = calculateGoal(
    currentEducationCost,
    yearsToGoal,
    expectedReturn,
    educationInflation
  );

  return {
    yearsToGoal,
    futureEducationCost: result.futureValue,
    monthlySIP: result.monthlySIP,
    lumpsumRequired: result.lumpsumRequired,
  };
}

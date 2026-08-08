export interface SWPProjection {
  year: number;
  openingCorpus: number;
  annualWithdrawal: number;
  totalWithdrawn: number;
  estimatedValue: number;
}

export interface SWPResult {
  initialCorpus: number;
  monthlyWithdrawal: number;
  annualReturn: number;
  years: number;
  totalWithdrawn: number;
  estimatedValue: number;
  wealthGain: number;
  sustainable: boolean;
  projections: SWPProjection[];
}

/**
 * Systematic Withdrawal Plan (SWP) calculation.
 *
 * Assumptions:
 * - Returns are compounded monthly.
 * - Annual return is divided by 12.
 * - Withdrawal happens at the end of each month.
 * - Withdrawal stops when the corpus reaches zero.
 */
export function calculateSWP(
  initialCorpus: number,
  monthlyWithdrawal: number,
  annualReturn: number,
  years: number
): SWPResult {
  const monthlyRate = annualReturn / 12 / 100;

  let corpus = Math.max(initialCorpus, 0);
  let totalWithdrawn = 0;

  const projections: SWPProjection[] = [];

  for (let year = 1; year <= years; year++) {
    const openingCorpus = corpus;
    let annualWithdrawal = 0;

    for (let month = 1; month <= 12; month++) {
      if (corpus <= 0) {
        break;
      }

      corpus = corpus * (1 + monthlyRate);

      const withdrawal = Math.min(monthlyWithdrawal, corpus);

      corpus -= withdrawal;
      annualWithdrawal += withdrawal;
      totalWithdrawn += withdrawal;
    }

    projections.push({
      year,
      openingCorpus,
      annualWithdrawal,
      totalWithdrawn,
      estimatedValue: corpus,
    });
  }

  const estimatedValue = Math.max(corpus, 0);

  return {
    initialCorpus,
    monthlyWithdrawal,
    annualReturn,
    years,
    totalWithdrawn,
    estimatedValue,
    wealthGain: Math.max(
      totalWithdrawn + estimatedValue - initialCorpus,
      0
    ),
    sustainable: estimatedValue > 0,
    projections,
  };
}

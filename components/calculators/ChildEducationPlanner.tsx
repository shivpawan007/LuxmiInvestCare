"use client";

import { useMemo, useState } from "react";

import ChildEducationInputs from "./ChildEducationInputs";
import ChildEducationResults from "./ChildEducationResults";
import { calculateEducationPlan } from "@/lib/education";

export default function ChildEducationPlanner() {
  const [currentAge, setCurrentAge] = useState(5);
  const [educationStartAge, setEducationStartAge] = useState(18);
  const [currentEducationCost, setCurrentEducationCost] =
    useState(2000000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [educationInflation, setEducationInflation] = useState(6);

  const result = useMemo(
    () =>
      calculateEducationPlan(
        currentAge,
        educationStartAge,
        currentEducationCost,
        expectedReturn,
        educationInflation
      ),
    [
      currentAge,
      educationStartAge,
      currentEducationCost,
      expectedReturn,
      educationInflation,
    ]
  );

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
            CHILD EDUCATION PLANNER
          </span>

          <h1 className="section-title mt-6">
            Plan Your Child's Education
            <span className="block text-green-700">
              With Confidence
            </span>
          </h1>

          <p className="section-subtitle">
            Estimate the future cost of education and understand the
            illustrative monthly SIP required to work towards that goal.
          </p>
        </div>

        <ChildEducationInputs
          currentAge={currentAge}
          setCurrentAge={setCurrentAge}
          educationStartAge={educationStartAge}
          setEducationStartAge={setEducationStartAge}
          currentEducationCost={currentEducationCost}
          setCurrentEducationCost={setCurrentEducationCost}
          expectedReturn={expectedReturn}
          setExpectedReturn={setExpectedReturn}
          educationInflation={educationInflation}
          setEducationInflation={setEducationInflation}
        />

        <ChildEducationResults
          currentEducationCost={currentEducationCost}
          yearsToGoal={result.yearsToGoal}
          futureEducationCost={result.futureEducationCost}
          monthlySIP={result.monthlySIP}
          lumpsumRequired={result.lumpsumRequired}
        />

        <div className="mt-12 rounded-3xl border border-green-200 bg-green-50 p-8">
          <h2 className="text-xl font-bold text-green-800">
            Planning Note
          </h2>

          <p className="mt-3 leading-7 text-slate-700">
            The figures shown are illustrations based on the assumptions
            entered. Actual education costs, investment returns and future
            financial requirements may differ.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  CalendarDays,
  GraduationCap,
  IndianRupee,
  Percent,
} from "lucide-react";

import CalculatorInput from "./CalculatorInput";

interface Props {
  currentAge: number;
  setCurrentAge: (value: number) => void;

  educationStartAge: number;
  setEducationStartAge: (value: number) => void;

  currentEducationCost: number;
  setCurrentEducationCost: (value: number) => void;

  expectedReturn: number;
  setExpectedReturn: (value: number) => void;

  educationInflation: number;
  setEducationInflation: (value: number) => void;
}

function formatINR(value: number): string {
  return Math.round(value).toLocaleString("en-IN");
}

export default function ChildEducationInputs({
  currentAge,
  setCurrentAge,
  educationStartAge,
  setEducationStartAge,
  currentEducationCost,
  setCurrentEducationCost,
  expectedReturn,
  setExpectedReturn,
  educationInflation,
  setEducationInflation,
}: Props) {
  const minimumEducationStartAge =
    Math.max(
      1,
      currentAge + 1,
    );

  const yearsToGoal =
    Math.max(
      1,
      educationStartAge -
      currentAge,
    );

  function handleCurrentAgeChange(
    nextAge: number,
  ) {
    const safeAge = Math.min(
      17,
      Math.max(0, nextAge),
    );

    setCurrentAge(
      safeAge,
    );

    /*
     * Education start age must always be
     * at least one year above the child's
     * current age.
     */
    if (
      educationStartAge <=
      safeAge
    ) {
      setEducationStartAge(
        Math.min(
          30,
          safeAge + 1,
        ),
      );
    }
  }

  function handleEducationStartAgeChange(
    nextAge: number,
  ) {
    const safeAge = Math.min(
      30,
      Math.max(
        minimumEducationStartAge,
        nextAge,
      ),
    );

    setEducationStartAge(
      safeAge,
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

      <h2 className="mb-8 text-2xl font-bold text-slate-900">
        Education Goal Details
      </h2>

      <div className="grid gap-8 md:grid-cols-2">

        {/* ==================================================
            CURRENT AGE
        ================================================== */}
        <div>
          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <CalendarDays className="h-5 w-5 text-green-700" />
            <span>
              Child's Current Age
            </span>
          </div>

          <CalculatorInput
            label="Child's Current Age"
            value={currentAge}
            min={0}
            max={17}
            step={1}
            maxCap={17}
            allowDynamicRange={false}
            suffix={
              currentAge === 1
                ? " Year"
                : " Years"
            }
            onChange={
              handleCurrentAgeChange
            }
            formatValue={(value) =>
              String(
                value,
              )
            }
            hideLabel
          />
        </div>

        {/* ==================================================
            EDUCATION START AGE
        ================================================== */}
        <div>
          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <GraduationCap className="h-5 w-5 text-green-700" />
            <span>
              Education Start Age
            </span>
          </div>

          <CalculatorInput
            label="Education Start Age"
            value={
              educationStartAge
            }
            min={
              minimumEducationStartAge
            }
            max={30}
            step={1}
            maxCap={30}
            allowDynamicRange={false}
            suffix=" Years"
            onChange={
              handleEducationStartAgeChange
            }
            formatValue={(value) =>
              String(
                value,
              )
            }
            hideLabel
          />

          <p className="mt-2 text-sm text-slate-500">
            {yearsToGoal}{" "}
            {yearsToGoal === 1
              ? "year"
              : "years"}{" "}
            available for planning
          </p>
        </div>

        {/* ==================================================
            CURRENT EDUCATION COST
        ================================================== */}
        <div>
          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <IndianRupee className="h-5 w-5 text-green-700" />
            <span>
              Current Education Cost
            </span>
          </div>

          <CalculatorInput
            label="Current Education Cost"
            value={
              currentEducationCost
            }
            min={100000}
            max={10000000}
            step={100000}
            maxCap={100000000}
            expansionStep={5000000}
            allowDynamicRange
            prefix="₹"
            onChange={
              setCurrentEducationCost
            }
            formatValue={formatINR}
            hideLabel
          />
        </div>

        {/* ==================================================
            EXPECTED RETURN
        ================================================== */}
        <div>
          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <Percent className="h-5 w-5 text-green-700" />
            <span>
              Expected Investment Return
            </span>
          </div>

          <CalculatorInput
            label="Expected Investment Return"
            value={
              expectedReturn
            }
            min={5}
            max={20}
            step={0.5}
            maxCap={30}
            expansionStep={2.5}
            allowDynamicRange
            suffix="%"
            onChange={
              setExpectedReturn
            }
            formatValue={(value) =>
              String(
                value,
              )
            }
            hideLabel
          />
        </div>

        {/* ==================================================
            EDUCATION INFLATION
        ================================================== */}
        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <Percent className="h-5 w-5 text-green-700" />
            <span>
              Education Inflation
            </span>
          </div>

          <CalculatorInput
            label="Education Inflation"
            value={
              educationInflation
            }
            min={2}
            max={12}
            step={0.5}
            maxCap={15}
            expansionStep={2.5}
            allowDynamicRange
            suffix="%"
            onChange={
              setEducationInflation
            }
            formatValue={(value) =>
              String(
                value,
              )
            }
            hideLabel
          />
        </div>

      </div>
    </div>
  );
}
"use client";

import {
  CalendarDays,
  GraduationCap,
  IndianRupee,
  Percent,
} from "lucide-react";

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
  const yearsToGoal = Math.max(1, educationStartAge - currentAge);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
      <h2 className="mb-8 text-2xl font-bold text-slate-900">
        Education Goal Details
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <CalendarDays className="h-5 w-5 text-green-700" />
            Child's Current Age
          </label>

          <input
            type="range"
            min={0}
            max={17}
            value={currentAge}
            onChange={(e) => {
              const value = Number(e.target.value);
              setCurrentAge(value);

              if (educationStartAge <= value) {
                setEducationStartAge(Math.min(30, value + 1));
              }
            }}
            className="w-full accent-green-700"
          />

          <p className="mt-2 text-xl font-bold text-green-700">
            {currentAge} Years
          </p>
        </div>

        <div>
          <label className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <GraduationCap className="h-5 w-5 text-green-700" />
            Education Start Age
          </label>

          <input
            type="range"
            min={Math.max(1, currentAge + 1)}
            max={30}
            value={educationStartAge}
            onChange={(e) => setEducationStartAge(Number(e.target.value))}
            className="w-full accent-green-700"
          />

          <p className="mt-2 text-xl font-bold text-green-700">
            Age {educationStartAge}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {yearsToGoal} years available for planning
          </p>
        </div>

        <div>
          <label className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <IndianRupee className="h-5 w-5 text-green-700" />
            Current Education Cost
          </label>

          <input
            type="range"
            min={100000}
            max={10000000}
            step={100000}
            value={currentEducationCost}
            onChange={(e) =>
              setCurrentEducationCost(Number(e.target.value))
            }
            className="w-full accent-green-700"
          />

          <p className="mt-2 text-xl font-bold text-green-700">
            ₹{currentEducationCost.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <label className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <Percent className="h-5 w-5 text-green-700" />
            Expected Investment Return
          </label>

          <input
            type="range"
            min={5}
            max={20}
            step={0.5}
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full accent-green-700"
          />

          <p className="mt-2 text-xl font-bold text-green-700">
            {expectedReturn}%
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <Percent className="h-5 w-5 text-green-700" />
            Education Inflation
          </label>

          <input
            type="range"
            min={2}
            max={12}
            step={0.5}
            value={educationInflation}
            onChange={(e) =>
              setEducationInflation(Number(e.target.value))
            }
            className="w-full accent-green-700"
          />

          <p className="mt-2 text-xl font-bold text-green-700">
            {educationInflation}%
          </p>
        </div>
      </div>
    </div>
  );
}

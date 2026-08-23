"use client";

import {
  IndianRupee,
  CalendarDays,
  Percent,
} from "lucide-react";

import CalculatorInput from "./CalculatorInput";

interface GoalInputsProps {
  targetAmount: number;
  setTargetAmount: (value: number) => void;

  years: number;
  setYears: (value: number) => void;

  expectedReturn: number;
  setExpectedReturn: (value: number) => void;

  inflation: number;
  setInflation: (value: number) => void;
}

function formatNumber(
  value: number,
): string {
  return Math.round(value).toLocaleString(
    "en-IN",
  );
}

export default function GoalInputs({
  targetAmount,
  setTargetAmount,
  years,
  setYears,
  expectedReturn,
  setExpectedReturn,
  inflation,
  setInflation,
}: GoalInputsProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
      <h2 className="mb-8 text-2xl font-bold text-slate-900">
        Goal Details
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Target Amount */}
        <div>
          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <IndianRupee className="h-5 w-5 text-green-700" />
            <span>Target Amount</span>
          </div>

          <CalculatorInput
            label="Target Amount"
            value={targetAmount}
            min={100000}
            max={50000000}
            step={100000}
            maxCap={100000000}
            expansionStep={5000000}
            allowDynamicRange
            prefix="₹"
            onChange={setTargetAmount}
            formatValue={formatNumber}
          />
        </div>

        {/* Years */}
        <div>
          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <CalendarDays className="h-5 w-5 text-green-700" />
            <span>Years to Goal</span>
          </div>

          <CalculatorInput
            label="Years to Goal"
            value={years}
            min={1}
            max={40}
            step={1}
            maxCap={60}
            expansionStep={10}
            allowDynamicRange
            suffix={
              years === 1
                ? " Year"
                : " Years"
            }
            onChange={setYears}
            formatValue={(value) =>
              String(value)
            }
          />
        </div>

        {/* Expected Return */}
        <div>
          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <Percent className="h-5 w-5 text-green-700" />
            <span>Expected Return</span>
          </div>

          <CalculatorInput
            label="Expected Return"
            value={expectedReturn}
            min={5}
            max={20}
            step={0.5}
            maxCap={30}
            expansionStep={2.5}
            allowDynamicRange
            suffix="%"
            onChange={setExpectedReturn}
            formatValue={(value) =>
              String(value)
            }
          />
        </div>

        {/* Inflation */}
        <div>
          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <Percent className="h-5 w-5 text-green-700" />
            <span>Inflation Rate</span>
          </div>

          <CalculatorInput
            label="Inflation Rate"
            value={inflation}
            min={2}
            max={10}
            step={0.5}
            maxCap={15}
            expansionStep={2.5}
            allowDynamicRange
            suffix="%"
            onChange={setInflation}
            formatValue={(value) =>
              String(value)
            }
          />
        </div>
      </div>
    </div>
  );
}
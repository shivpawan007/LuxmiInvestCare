"use client";

import React, { useEffect, useState } from "react";

type RangeControlProps = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  formatValue?: (value: number) => string;
};

export default function RangeControl({
  value,
  min,
  max,
  step,
  onChange,
  prefix = "",
  suffix = "",
  formatValue,
}: RangeControlProps) {
  const [dynamicMax, setDynamicMax] = useState(Math.max(max, value));

  useEffect(() => {
    if (value > dynamicMax) {
      setDynamicMax(value);
    }
  }, [value, dynamicMax]);

  const safeStep = step > 0 ? step : 1;

  const increase = () => {
    const nextValue = value + safeStep;

    if (nextValue > dynamicMax) {
      setDynamicMax(nextValue);
    }

    onChange(nextValue);
  };

  const decrease = () => {
    const nextValue = Math.max(min, value - safeStep);
    onChange(nextValue);
  };

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const raw = event.target.value;

    if (raw === "") return;

    const parsed = Number(raw);

    if (!Number.isFinite(parsed)) return;

    const nextValue = Math.max(min, parsed);

    if (nextValue > dynamicMax) {
      setDynamicMax(nextValue);
    }

    onChange(nextValue);
  };

  const displayValue = formatValue
    ? formatValue(value)
    : `${prefix}${value.toLocaleString("en-IN")}${suffix}`;

  return (
    <div className="w-full min-w-0">
      {/* Number control */}
      <div className="flex w-full min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={decrease}
          disabled={value <= min}
          aria-label="Decrease value"
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-lg border border-slate-300
            bg-white text-xl font-bold text-slate-700
            transition
            hover:border-emerald-500
            hover:bg-emerald-50
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          −
        </button>

        <input
          type="number"
          value={value}
          min={min}
          step={safeStep}
          onChange={handleNumberChange}
          aria-label="Enter value"
          className="
            h-10 min-w-0 w-full flex-1
            rounded-lg border border-slate-300
            bg-white px-2 sm:px-3
            text-center text-base sm:text-lg
            font-bold text-slate-900
            outline-none transition
            focus:border-emerald-600
            focus:ring-2 focus:ring-emerald-100
          "
        />

        <button
          type="button"
          onClick={increase}
          aria-label="Increase value"
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-lg border border-emerald-300
            bg-emerald-50
            text-xl font-bold text-emerald-700
            transition
            hover:border-emerald-600
            hover:bg-emerald-100
          "
        >
          +
        </button>
      </div>

      {/* Range slider */}
      <div className="mt-3 w-full min-w-0">
        <input
          type="range"
          min={min}
          max={dynamicMax}
          step={safeStep}
          value={Math.min(value, dynamicMax)}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-label="Adjust value"
          className="
            block
            h-2
            w-full
            min-w-0
            cursor-pointer
            accent-emerald-600
          "
        />
      </div>

      {/* Min / Max labels */}
      <div className="mt-2 flex w-full min-w-0 items-center justify-between gap-3 text-xs text-slate-500">
        <span className="min-w-0 truncate">
          {prefix}
          {min.toLocaleString("en-IN")}
          {suffix}
        </span>

        <span className="min-w-0 truncate text-right">
          {prefix}
          {dynamicMax.toLocaleString("en-IN")}
          {suffix}
        </span>
      </div>

      {/* Current value */}
      <div className="mt-3 text-lg font-bold text-emerald-700">
        {displayValue}
      </div>
    </div>
  );
}
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
    <div className="w-full">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={decrease}
          disabled={value <= min}
          aria-label="Decrease value"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-xl font-bold text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        <input
          type="number"
          value={value}
          min={min}
          step={step}
          onChange={handleNumberChange}
          aria-label="Enter value"
          className="h-10 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-center text-lg font-bold text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />

        <button
          type="button"
          onClick={increase}
          aria-label="Increase value"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-300 bg-emerald-50 text-xl font-bold text-emerald-700 transition hover:border-emerald-600 hover:bg-emerald-100"
        >
          +
        </button>
      </div>

      <input
        type="range"
        min={min}
        max={dynamicMax}
        step={step}
        value={Math.min(value, dynamicMax)}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-emerald-600"
      />

      <div className="mt-1 flex justify-between text-xs text-slate-500">
        <span>
          {prefix}
          {min.toLocaleString("en-IN")}
          {suffix}
        </span>

        <span>
          {prefix}
          {dynamicMax.toLocaleString("en-IN")}
          {suffix}
        </span>
      </div>

      <div className="mt-2 text-xl font-bold text-emerald-700">
        {displayValue}
      </div>
    </div>
  );
}

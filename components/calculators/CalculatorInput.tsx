"use client";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";

interface CalculatorInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  formatValue?: (value: number) => string;
  className?: string;
}

export default function CalculatorInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix = "",
  suffix = "",
  formatValue,
  className = "",
}: CalculatorInputProps) {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const clamp = (nextValue: number) =>
    Math.min(max, Math.max(min, nextValue));

  const updateValue = (nextValue: number) => {
    const safeValue = clamp(nextValue);
    onChange(safeValue);
    setInputValue(String(safeValue));
  };

  const decrease = () => {
    updateValue(value - step);
  };

  const increase = () => {
    updateValue(value + step);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawValue = event.target.value;

    setInputValue(rawValue);

    if (rawValue === "") return;

    const numericValue = Number(rawValue);

    if (!Number.isNaN(numericValue)) {
      onChange(clamp(numericValue));
    }
  };

  const handleBlur = () => {
    const numericValue = Number(inputValue);

    if (inputValue === "" || Number.isNaN(numericValue)) {
      setInputValue(String(value));
      return;
    }

    updateValue(numericValue);
  };

  const displayValue = formatValue
    ? formatValue(value)
    : `${prefix}${value}${suffix}`;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>

        <div className="flex items-center rounded-xl border border-slate-300 bg-white overflow-hidden">
          <button
            type="button"
            onClick={decrease}
            disabled={value <= min}
            aria-label={`Decrease ${label}`}
            className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>

          <div className="relative flex items-center">
            {prefix && (
              <span className="pointer-events-none absolute left-2 text-sm font-semibold text-slate-500">
                {prefix}
              </span>
            )}

            <input
              type="number"
              value={inputValue}
              min={min}
              max={max}
              step={step}
              onChange={handleInputChange}
              onBlur={handleBlur}
              aria-label={label}
              className={`h-10 w-28 border-x border-slate-300 bg-white px-3 text-center text-sm font-semibold text-slate-900 outline-none focus:border-emerald-600 ${
                prefix ? "pl-6" : ""
              } ${suffix ? "pr-8" : ""}`}
            />

            {suffix && (
              <span className="pointer-events-none absolute right-2 text-sm font-semibold text-slate-500">
                {suffix}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={increase}
            disabled={value >= max}
            aria-label={`Increase ${label}`}
            className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => updateValue(Number(event.target.value))}
        aria-label={`${label} slider`}
        className="h-2 w-full cursor-pointer accent-emerald-600"
      />

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          {prefix}
          {formatValue ? formatValue(min) : min.toLocaleString("en-IN")}
          {suffix}
        </span>

        <span className="font-semibold text-emerald-700">
          {displayValue}
        </span>

        <span>
          {prefix}
          {formatValue ? formatValue(max) : max.toLocaleString("en-IN")}
          {suffix}
        </span>
      </div>
    </div>
  );
}

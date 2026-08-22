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

  /**
   * When enabled, the control can expand its slider range
   * when the user presses + or enters a value above the
   * current slider maximum.
   */
  allowDynamicRange?: boolean;

  /**
   * Amount by which the slider maximum expands.
   */
  expansionStep?: number;

  /**
   * Optional absolute safety ceiling.
   * Example:
   * corpus: ₹100 Cr
   * withdrawal: ₹10 Lakh
   */
  maxCap?: number;
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
  allowDynamicRange = false,
  expansionStep = 0,
  maxCap,
}: CalculatorInputProps) {
  const [inputValue, setInputValue] =
    useState(String(value));

  const [dynamicMax, setDynamicMax] =
    useState(max);

  useEffect(() => {
    setInputValue(String(value));

    setDynamicMax((currentMax) => {
      const minimumRequired =
        Math.max(max, value);

      if (!allowDynamicRange) {
        return max;
      }

      return Math.max(
        currentMax,
        minimumRequired,
      );
    });
  }, [value, max, allowDynamicRange]);

  const effectiveExpansionStep =
    expansionStep > 0
      ? expansionStep
      : Math.max(step, max - min);

  const getNextExpandedMax = (
    requiredValue: number,
  ) => {
    let nextMax = dynamicMax;

    if (requiredValue <= nextMax) {
      return nextMax;
    }

    while (nextMax < requiredValue) {
      nextMax += effectiveExpansionStep;

      if (
        typeof maxCap === "number" &&
        nextMax >= maxCap
      ) {
        nextMax = maxCap;
        break;
      }
    }

    return nextMax;
  };

  const ensureRangeForValue = (
    nextValue: number,
  ) => {
    if (
      !allowDynamicRange ||
      nextValue <= dynamicMax
    ) {
      return dynamicMax;
    }

    const nextMax =
      getNextExpandedMax(nextValue);

    setDynamicMax(nextMax);

    return nextMax;
  };

  const clamp = (nextValue: number) => {
    const numericValue =
      Number.isFinite(nextValue)
        ? nextValue
        : value;

    const maximum =
      allowDynamicRange
        ? Math.min(
          dynamicMax,
          maxCap ?? Number.POSITIVE_INFINITY,
        )
        : max;

    return Math.min(
      maximum,
      Math.max(min, numericValue),
    );
  };

  const updateValue = (
    nextValue: number,
  ) => {
    const numericValue =
      Number.isFinite(nextValue)
        ? nextValue
        : value;

    ensureRangeForValue(
      numericValue,
    );

    const safeValue =
      clamp(numericValue);

    onChange(safeValue);
    setInputValue(String(safeValue));
  };

  const decrease = () => {
    updateValue(
      value - step,
    );
  };

  const increase = () => {
    const nextValue =
      value + step;

    if (
      allowDynamicRange &&
      nextValue > dynamicMax
    ) {
      const expandedMax =
        getNextExpandedMax(
          nextValue,
        );

      setDynamicMax(
        expandedMax,
      );
    }

    updateValue(
      nextValue,
    );
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const rawValue =
      event.target.value;

    setInputValue(rawValue);

    if (rawValue === "") {
      return;
    }

    const numericValue =
      Number(rawValue);

    if (
      Number.isNaN(numericValue)
    ) {
      return;
    }

    if (
      allowDynamicRange &&
      numericValue > dynamicMax
    ) {
      ensureRangeForValue(
        numericValue,
      );
    }

    onChange(
      clamp(numericValue),
    );
  };

  const handleBlur = () => {
    const numericValue =
      Number(inputValue);

    if (
      inputValue === "" ||
      Number.isNaN(numericValue)
    ) {
      setInputValue(
        String(value),
      );
      return;
    }

    updateValue(
      numericValue,
    );
  };

  const displayValue =
    formatValue
      ? formatValue(value)
      : `${prefix}${value}${suffix}`;

  const displayMax =
    allowDynamicRange
      ? dynamicMax
      : max;

  const atMinimum =
    value <= min;

  const atMaximum =
    typeof maxCap === "number"
      ? value >= maxCap
      : !allowDynamicRange &&
      value >= max;

  return (
    <div
      className={`space-y-3 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>

        <div className="flex items-center overflow-hidden rounded-xl border border-slate-300 bg-white">
          <button
            type="button"
            onClick={decrease}
            disabled={atMinimum}
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
              max={
                allowDynamicRange
                  ? maxCap ?? undefined
                  : max
              }
              step={step}
              onChange={
                handleInputChange
              }
              onBlur={
                handleBlur
              }
              aria-label={label}
              className={`h-10 w-32 border-x border-slate-300 bg-white px-3 text-center text-sm font-semibold text-slate-900 outline-none focus:border-emerald-600 ${prefix
                ? "pl-7"
                : ""
                } ${suffix
                  ? "pr-8"
                  : ""
                }`}
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
            disabled={atMaximum}
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
        max={displayMax}
        step={step}
        value={Math.min(
          value,
          displayMax,
        )}
        onChange={(event) =>
          updateValue(
            Number(
              event.target.value,
            ),
          )
        }
        aria-label={`${label} slider`}
        className="h-2 w-full cursor-pointer accent-emerald-600"
      />

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          {prefix}
          {formatValue
            ? formatValue(min)
            : min.toLocaleString(
              "en-IN",
            )}
          {suffix}
        </span>

        <span className="font-semibold text-emerald-700">
          {displayValue}
        </span>

        <span>
          {prefix}
          {formatValue
            ? formatValue(
              displayMax,
            )
            : displayMax.toLocaleString(
              "en-IN",
            )}
          {suffix}
        </span>
      </div>
    </div>
  );
}
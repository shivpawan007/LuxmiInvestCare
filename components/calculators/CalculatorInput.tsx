"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
} from "react";
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

  /**
   * Format the numeric value only.
   *
   * Example:
   * formatValue={(value) =>
   *   Math.round(value).toLocaleString("en-IN")
   * }
   *
   * Do NOT add ₹, %, Years, etc. here.
   * Use prefix/suffix for those.
   */
  formatValue?: (value: number) => string;

  className?: string;

  /**
   * Allows + button / numeric input to extend
   * the slider range beyond the initial max.
   */
  allowDynamicRange?: boolean;

  /**
   * Amount by which the range grows when the
   * current maximum is exceeded.
   */
  expansionStep?: number;

  /**
   * Absolute maximum allowed value.
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

    if (!allowDynamicRange) {
      setDynamicMax(max);
      return;
    }

    setDynamicMax((currentMax) =>
      Math.max(
        currentMax,
        max,
        value,
      ),
    );
  }, [
    value,
    max,
    allowDynamicRange,
  ]);

  const numericDisplay = (
    numericValue: number,
  ): string => {
    if (formatValue) {
      return formatValue(numericValue);
    }

    return Math.round(
      numericValue,
    ).toLocaleString("en-IN");
  };

  const growthStep =
    expansionStep > 0
      ? expansionStep
      : Math.max(step, max - min);

  const expandRangeIfNeeded = (
    targetValue: number,
  ) => {
    if (
      !allowDynamicRange ||
      targetValue <= dynamicMax
    ) {
      return;
    }

    let nextMax = dynamicMax;

    while (nextMax < targetValue) {
      nextMax += growthStep;

      if (
        typeof maxCap === "number" &&
        nextMax >= maxCap
      ) {
        nextMax = maxCap;
        break;
      }
    }

    setDynamicMax(nextMax);
  };

  const effectiveMax =
    allowDynamicRange
      ? Math.min(
        dynamicMax,
        maxCap ??
        Number.POSITIVE_INFINITY,
      )
      : max;

  const clampValue = (
    targetValue: number,
  ) => {
    return Math.min(
      effectiveMax,
      Math.max(
        min,
        targetValue,
      ),
    );
  };

  const updateValue = (
    targetValue: number,
  ) => {
    if (
      !Number.isFinite(
        targetValue,
      )
    ) {
      return;
    }

    expandRangeIfNeeded(
      targetValue,
    );

    /*
     * If the target exceeds the current
     * maximum, use the value directly.
     * The range has already been expanded.
     */
    const nextValue =
      allowDynamicRange &&
        targetValue > dynamicMax
        ? Math.min(
          targetValue,
          maxCap ??
          Number.POSITIVE_INFINITY,
        )
        : clampValue(
          targetValue,
        );

    onChange(nextValue);
    setInputValue(
      String(nextValue),
    );
  };

  const decrease = () => {
    updateValue(
      value - step,
    );
  };

  const increase = () => {
    updateValue(
      value + step,
    );
  };

  const handleNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const rawValue =
      event.target.value;

    setInputValue(rawValue);

    if (rawValue === "") {
      return;
    }

    const parsedValue =
      Number(rawValue);

    if (
      !Number.isFinite(
        parsedValue,
      )
    ) {
      return;
    }

    expandRangeIfNeeded(
      parsedValue,
    );

    const safeValue =
      allowDynamicRange
        ? Math.min(
          parsedValue,
          maxCap ??
          Number.POSITIVE_INFINITY,
        )
        : clampValue(
          parsedValue,
        );

    onChange(
      Math.max(
        min,
        safeValue,
      ),
    );
  };

  const handleBlur = () => {
    if (
      inputValue.trim() === ""
    ) {
      setInputValue(
        String(value),
      );
      return;
    }

    const parsedValue =
      Number(inputValue);

    if (
      !Number.isFinite(
        parsedValue,
      )
    ) {
      setInputValue(
        String(value),
      );
      return;
    }

    updateValue(
      parsedValue,
    );
  };

  const handleSliderChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    updateValue(
      Number(event.target.value),
    );
  };

  const minimumReached =
    value <= min;

  const maximumReached =
    typeof maxCap === "number"
      ? value >= maxCap
      : !allowDynamicRange &&
      value >= max;

  return (
    <div
      className={`space-y-3 ${className}`}
    >
      {/* Label + +/- control */}
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>

        <div className="flex items-center overflow-hidden rounded-xl border border-slate-300 bg-white">
          {/* Minus */}
          <button
            type="button"
            onClick={decrease}
            disabled={
              minimumReached
            }
            aria-label={`Decrease ${label}`}
            className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>

          {/* Numeric value */}
          <div className="relative flex h-10 items-center">
            {prefix && (
              <span className="pointer-events-none absolute left-2 text-sm font-semibold text-emerald-700">
                {prefix}
              </span>
            )}

            <input
              type="number"
              value={inputValue}
              min={min}
              max={
                allowDynamicRange
                  ? maxCap ??
                  undefined
                  : max
              }
              step={step}
              onChange={
                handleNumberChange
              }
              onBlur={
                handleBlur
              }
              aria-label={label}
              className={`h-full w-32 border-x border-slate-300 bg-white px-3 text-center text-sm font-semibold text-slate-900 outline-none focus:border-emerald-600 ${prefix
                  ? "pl-7"
                  : ""
                } ${suffix
                  ? "pr-10"
                  : ""
                }`}
            />

            {suffix && (
              <span className="pointer-events-none absolute right-2 text-sm font-semibold text-slate-500">
                {suffix}
              </span>
            )}
          </div>

          {/* Plus */}
          <button
            type="button"
            onClick={increase}
            disabled={
              maximumReached
            }
            aria-label={`Increase ${label}`}
            className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={min}
        max={effectiveMax}
        step={step}
        value={Math.min(
          value,
          effectiveMax,
        )}
        onChange={
          handleSliderChange
        }
        aria-label={`${label} slider`}
        className="h-2 w-full cursor-pointer accent-emerald-600"
      />

      {/* Range labels */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          {prefix}
          {numericDisplay(min)}
          {suffix}
        </span>

        <span className="font-semibold text-emerald-700">
          {prefix}
          {numericDisplay(value)}
          {suffix}
        </span>

        <span>
          {prefix}
          {numericDisplay(
            effectiveMax,
          )}
          {suffix}
        </span>
      </div>
    </div>
  );
}
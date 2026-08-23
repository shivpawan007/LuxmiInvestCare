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
   * Formats the numeric value only.
   *
   * Examples:
   * 48,00,000
   * 12
   * 5.5
   */
  formatValue?: (
    value: number,
  ) => string;

  className?: string;

  /**
   * Hides the visual label inside CalculatorInput
   * while preserving the accessible label.
   *
   * Useful when the parent component already renders
   * an icon + visible label.
   */
  hideLabel?: boolean;

  /**
   * Allows + / numeric input to extend the slider
   * beyond the initial maximum.
   */
  allowDynamicRange?: boolean;

  /**
   * Amount by which the slider maximum expands
   * when the user moves beyond the current maximum.
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
  hideLabel = false,
  allowDynamicRange = false,
  expansionStep = 0,
  maxCap,
}: CalculatorInputProps) {
  const [inputValue, setInputValue] =
    useState(String(value));

  const [isFocused, setIsFocused] =
    useState(false);

  const [dynamicMax, setDynamicMax] =
    useState(max);

  /*
   * ----------------------------------------------------------
   * FORMATTING
   * ----------------------------------------------------------
   */

  const formatNumericValue = (
    numericValue: number,
  ): string => {
    if (formatValue) {
      return formatValue(
        numericValue,
      );
    }

    return Math.round(
      numericValue,
    ).toLocaleString("en-IN");
  };

  /*
   * ----------------------------------------------------------
   * STATE SYNCHRONISATION
   * ----------------------------------------------------------
   */

  useEffect(() => {
    if (!isFocused) {
      setInputValue(
        formatNumericValue(value),
      );
    } else {
      setInputValue(
        String(value),
      );
    }

    if (!allowDynamicRange) {
      setDynamicMax(max);
      return;
    }

    setDynamicMax(
      (currentMax) =>
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
    isFocused,
  ]);

  /*
   * ----------------------------------------------------------
   * RANGE MANAGEMENT
   * ----------------------------------------------------------
   */

  const growthStep =
    expansionStep > 0
      ? expansionStep
      : Math.max(
        step,
        max - min,
      );

  const effectiveMax =
    allowDynamicRange
      ? Math.min(
        dynamicMax,
        maxCap ??
        Number.POSITIVE_INFINITY,
      )
      : max;

  const expandRangeIfNeeded = (
    targetValue: number,
  ) => {
    if (
      !allowDynamicRange ||
      targetValue <= dynamicMax
    ) {
      return;
    }

    let nextMax =
      dynamicMax;

    while (
      nextMax < targetValue
    ) {
      nextMax += growthStep;

      if (
        typeof maxCap ===
        "number" &&
        nextMax >= maxCap
      ) {
        nextMax = maxCap;
        break;
      }
    }

    setDynamicMax(
      Math.min(
        nextMax,
        maxCap ??
        Number.POSITIVE_INFINITY,
      ),
    );
  };

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

  /*
   * ----------------------------------------------------------
   * VALUE UPDATE
   * ----------------------------------------------------------
   */

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

    onChange(
      nextValue,
    );

    /*
     * Display the formatted value while
     * the field is not being actively edited.
     */
    if (!isFocused) {
      setInputValue(
        formatNumericValue(
          nextValue,
        ),
      );
    } else {
      setInputValue(
        String(nextValue),
      );
    }
  };

  /*
   * ----------------------------------------------------------
   * +/- BUTTONS
   * ----------------------------------------------------------
   */

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

  /*
   * ----------------------------------------------------------
   * NUMBER FIELD
   * ----------------------------------------------------------
   */

  const handleNumberFocus = () => {
    setIsFocused(true);

    /*
     * Remove display formatting while editing.
     * Example:
     * 48,00,000 → 4800000
     */
    setInputValue(
      String(value),
    );
  };

  const handleNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const rawValue =
      event.target.value;

    /*
     * Keep only digits and one decimal point.
     */
    const cleanedValue =
      rawValue
        .replace(/,/g, "")
        .replace(
          /[^0-9.]/g,
          "",
        );

    setInputValue(
      cleanedValue,
    );

    if (
      cleanedValue === ""
    ) {
      return;
    }

    const parsedValue =
      Number(
        cleanedValue,
      );

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
    setIsFocused(false);

    const parsedValue =
      Number(
        inputValue
          .replace(/,/g, ""),
      );

    if (
      !Number.isFinite(
        parsedValue,
      )
    ) {
      setInputValue(
        formatNumericValue(
          value,
        ),
      );
      return;
    }

    updateValue(
      parsedValue,
    );

    setInputValue(
      formatNumericValue(
        Math.max(
          min,
          clampValue(
            parsedValue,
          ),
        ),
      ),
    );
  };

  /*
   * ----------------------------------------------------------
   * SLIDER
   * ----------------------------------------------------------
   */

  const handleSliderChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    updateValue(
      Number(
        event.target.value,
      ),
    );
  };

  /*
   * ----------------------------------------------------------
   * BUTTON STATES
   * ----------------------------------------------------------
   */

  const minimumReached =
    value <= min;

  const maximumReached =
    typeof maxCap ===
      "number"
      ? value >= maxCap
      : !allowDynamicRange &&
      value >= max;

  /*
   * ----------------------------------------------------------
   * RENDER
   * ----------------------------------------------------------
   */

  return (
    <div
      className={`space-y-3 ${className}`}
    >
      {/* =====================================================
          LABEL + +/- CONTROL
      ====================================================== */}
      <div className="flex items-center justify-between gap-4">

        <label
          className={
            hideLabel
              ? "sr-only"
              : "text-sm font-semibold text-slate-700"
          }
        >
          {label}
        </label>

        <div
          className={`flex items-center overflow-hidden rounded-xl border border-slate-300 bg-white ${hideLabel
            ? "ml-auto"
            : ""
            }`}
        >

          {/* MINUS */}
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

          {/* VALUE FIELD */}
          <div className="relative flex h-10 items-center">

            {prefix && (
              <span
                className="pointer-events-none absolute left-2 text-sm font-semibold text-emerald-700"
              >
                {prefix}
              </span>
            )}

            <input
              type="text"
              inputMode={
                step % 1 === 0
                  ? "numeric"
                  : "decimal"
              }
              value={
                inputValue
              }
              min={min}
              max={
                allowDynamicRange
                  ? maxCap ??
                  undefined
                  : max
              }
              aria-label={
                label
              }
              onFocus={
                handleNumberFocus
              }
              onChange={
                handleNumberChange
              }
              onBlur={
                handleBlur
              }
              className={`h-full w-32 border-x border-slate-300 bg-white px-3 text-center text-sm font-semibold text-slate-900 outline-none focus:border-emerald-600 ${prefix
                ? "pl-7"
                : ""
                } ${suffix
                  ? "pr-10"
                  : ""
                }`}
            />

            {suffix && (
              <span
                className="pointer-events-none absolute right-2 text-sm font-semibold text-slate-500"
              >
                {suffix}
              </span>
            )}
          </div>

          {/* PLUS */}
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

      {/* =====================================================
          SLIDER
      ====================================================== */}
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

      {/* =====================================================
          RANGE LABELS
      ====================================================== */}
      <div className="flex items-center justify-between text-xs text-slate-400">

        <span>
          {prefix}
          {formatNumericValue(
            min,
          )}
          {suffix}
        </span>

        <span className="font-semibold text-emerald-700">
          {prefix}
          {formatNumericValue(
            value,
          )}
          {suffix}
        </span>

        <span>
          {prefix}
          {formatNumericValue(
            effectiveMax,
          )}
          {suffix}
        </span>
      </div>
    </div>
  );
}
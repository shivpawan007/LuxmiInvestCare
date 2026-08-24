"use client";

import React, {
  useEffect,
  useState,
} from "react";

type RangeControlProps = {
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
   * Example:
   * 500000 -> "5,00,000"
   * 12 -> "12"
   * 5.5 -> "5.5"
   */
  formatValue?: (
    value: number,
  ) => string;

  /**
   * Allows + / numeric input to expand
   * the slider beyond the initial max.
   */
  allowDynamicRange?: boolean;

  /**
   * Expansion amount when the current
   * maximum is exceeded.
   */
  expansionStep?: number;

  /**
   * Absolute maximum allowed value.
   */
  maxCap?: number;
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
  allowDynamicRange = true,
  expansionStep,
  maxCap,
}: RangeControlProps) {
  const safeStep =
    step > 0 ? step : 1;

  const safeExpansionStep =
    expansionStep &&
      expansionStep > 0
      ? expansionStep
      : safeStep;

  const [dynamicMax, setDynamicMax] =
    useState(
      Math.min(
        Math.max(max, value),
        maxCap ??
        Number.POSITIVE_INFINITY,
      ),
    );

  const [inputValue, setInputValue] =
    useState(
      formatValue
        ? formatValue(value)
        : String(value),
    );

  const [isFocused, setIsFocused] =
    useState(false);

  /*
   * ----------------------------------------------------------
   * Keep control synchronized with parent value.
   * ----------------------------------------------------------
   */
  useEffect(() => {
    const cappedValue =
      typeof maxCap === "number"
        ? Math.min(value, maxCap)
        : value;

    setDynamicMax(
      (currentMax) =>
        Math.min(
          Math.max(
            currentMax,
            max,
            cappedValue,
          ),
          maxCap ??
          Number.POSITIVE_INFINITY,
        ),
    );

    if (!isFocused) {
      setInputValue(
        formatValue
          ? formatValue(cappedValue)
          : String(cappedValue),
      );
    }
  }, [
    value,
    max,
    maxCap,
    formatValue,
    isFocused,
  ]);

  /*
   * ----------------------------------------------------------
   * Formatting helpers
   * ----------------------------------------------------------
   */
  const formatDisplayValue = (
    numericValue: number,
  ) => {
    if (formatValue) {
      return formatValue(
        numericValue,
      );
    }

    return Math.round(
      numericValue,
    ).toLocaleString(
      "en-IN",
    );
  };

  const effectiveMax =
    Math.min(
      dynamicMax,
      maxCap ??
      Number.POSITIVE_INFINITY,
    );

  /*
   * ----------------------------------------------------------
   * Expand slider range when necessary.
   * ----------------------------------------------------------
   */
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
      nextMax +=
        safeExpansionStep;
    }

    if (
      typeof maxCap ===
      "number"
    ) {
      nextMax = Math.min(
        nextMax,
        maxCap,
      );
    }

    setDynamicMax(
      Math.max(
        max,
        nextMax,
      ),
    );
  };

  /*
   * ----------------------------------------------------------
   * Update value
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

    const roundedValue =
      Math.round(
        targetValue /
        safeStep,
      ) * safeStep;

    const boundedValue =
      Math.max(
        min,
        Math.min(
          roundedValue,
          maxCap ??
          Number.POSITIVE_INFINITY,
        ),
      );

    expandRangeIfNeeded(
      boundedValue,
    );

    onChange(
      boundedValue,
    );

    if (!isFocused) {
      setInputValue(
        formatDisplayValue(
          boundedValue,
        ),
      );
    } else {
      setInputValue(
        String(
          boundedValue,
        ),
      );
    }
  };

  /*
   * ----------------------------------------------------------
   * Plus / minus
   * ----------------------------------------------------------
   */
  const decrease = () => {
    updateValue(
      value -
      safeStep,
    );
  };

  const increase = () => {
    updateValue(
      value +
      safeStep,
    );
  };

  /*
   * ----------------------------------------------------------
   * Number field
   * ----------------------------------------------------------
   */
  const handleFocus = () => {
    setIsFocused(true);

    setInputValue(
      String(value),
    );
  };

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const raw =
      event.target.value
        .replace(
          /,/g,
          "",
        )
        .replace(
          /[^0-9.-]/g,
          "",
        );

    setInputValue(
      raw,
    );

    if (
      raw === "" ||
      raw === "-" ||
      raw === "."
    ) {
      return;
    }

    const parsed =
      Number(raw);

    if (
      !Number.isFinite(
        parsed,
      )
    ) {
      return;
    }

    updateValue(
      parsed,
    );
  };

  const handleBlur = () => {
    setIsFocused(
      false,
    );

    const parsed =
      Number(
        inputValue.replace(
          /,/g,
          "",
        ),
      );

    if (
      !Number.isFinite(
        parsed,
      )
    ) {
      setInputValue(
        formatDisplayValue(
          value,
        ),
      );
      return;
    }

    updateValue(
      parsed,
    );

    setInputValue(
      formatDisplayValue(
        Math.max(
          min,
          Math.min(
            parsed,
            maxCap ??
            Number.POSITIVE_INFINITY,
          ),
        ),
      ),
    );
  };

  /*
   * ----------------------------------------------------------
   * Slider
   * ----------------------------------------------------------
   */
  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateValue(
      Number(
        event.target.value,
      ),
    );
  };

  const minimumReached =
    value <= min;

  const maximumReached =
    typeof maxCap ===
      "number"
      ? value >= maxCap
      : false;

  return (
    <div className="w-full min-w-0">

      {/* =====================================================
          VALUE CONTROL
      ====================================================== */}
      <div className="flex w-full min-w-0 items-center overflow-hidden rounded-xl border border-slate-300 bg-white">

        {/* MINUS */}
        <button
          type="button"
          onClick={decrease}
          disabled={
            minimumReached
          }
          aria-label="Decrease value"
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            border-r border-slate-300
            text-xl font-bold
            text-slate-600
            transition
            hover:bg-emerald-50
            hover:text-emerald-700
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          −
        </button>

        {/* VALUE FIELD */}
        <div className="relative flex min-w-0 flex-1 items-center">

          {prefix && (
            <span
              className="
                pointer-events-none
                absolute left-3
                text-sm font-semibold
                text-emerald-700
              "
            >
              {prefix}
            </span>
          )}

          <input
            type="text"
            inputMode={
              safeStep % 1 === 0
                ? "numeric"
                : "decimal"
            }
            value={
              inputValue
            }
            onFocus={
              handleFocus
            }
            onChange={
              handleNumberChange
            }
            onBlur={
              handleBlur
            }
            aria-label="Enter value"
            className={`
              h-11 w-full
              min-w-0
              bg-white
              text-center
              text-base
              font-bold
              text-slate-900
              outline-none
              transition
              focus:bg-emerald-50/20
              ${prefix ? "pl-8" : ""}
              ${suffix ? "pr-10" : ""}
            `}
          />

          {suffix && (
            <span
              className="
                pointer-events-none
                absolute right-3
                text-sm font-semibold
                text-slate-500
              "
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
          aria-label="Increase value"
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            border-l border-emerald-200
            bg-emerald-50
            text-xl font-bold
            text-emerald-700
            transition
            hover:bg-emerald-100
            hover:text-emerald-800
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          +
        </button>
      </div>

      {/* =====================================================
          RANGE SLIDER
      ====================================================== */}
      <div className="mt-4 w-full min-w-0">
        <input
          type="range"
          min={min}
          max={effectiveMax}
          step={safeStep}
          value={Math.min(
            value,
            effectiveMax,
          )}
          onChange={
            handleSliderChange
          }
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

      {/* =====================================================
          RANGE LABELS
      ====================================================== */}
      <div className="mt-2 flex w-full items-center justify-between gap-3 text-xs text-slate-500">

        <span className="min-w-0 truncate">
          {prefix}
          {formatDisplayValue(
            min,
          )}
          {suffix}
        </span>

        <span className="min-w-0 truncate text-right">
          {prefix}
          {formatDisplayValue(
            effectiveMax,
          )}
          {suffix}
        </span>
      </div>

      {/* =====================================================
          CURRENT VALUE
      ====================================================== */}
      <div className="mt-3 text-lg font-bold text-emerald-700">
        {prefix}
        {formatDisplayValue(
          value,
        )}
        {suffix}
      </div>
    </div>
  );
}
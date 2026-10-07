"use client";

import { useState, useMemo } from "react";
import type { Tool } from "@/data/types";

interface PercentageCalculatorToolProps {
  tool: Tool;
}

type Mode = "of" | "is-what" | "change";

export function PercentageCalculatorTool({
  tool,
}: PercentageCalculatorToolProps) {
  const [mode, setMode] = useState<Mode>("of");

  // Mode 1: X% of Y
  const [percent, setPercent] = useState("");
  const [ofValue, setOfValue] = useState("");

  // Mode 2: X is what % of Y
  const [isValue, setIsValue] = useState("");
  const [ofValue2, setOfValue2] = useState("");

  // Mode 3: % change
  const [original, setOriginal] = useState("");
  const [newValue, setNewValue] = useState("");

  const result = useMemo(() => {
    if (mode === "of") {
      const p = parseFloat(percent);
      const v = parseFloat(ofValue);
      if (isNaN(p) || isNaN(v)) return null;
      return {
        label: `${p}% of ${v}`,
        value: ((p * v) / 100).toFixed(2).replace(/\.?0+$/, ""),
        isPositive: true,
      };
    }
    if (mode === "is-what") {
      const x = parseFloat(isValue);
      const y = parseFloat(ofValue2);
      if (isNaN(x) || isNaN(y) || y === 0) return null;
      return {
        label: `${x} is what % of ${y}`,
        value: ((x / y) * 100).toFixed(2).replace(/\.?0+$/, "") + "%",
        isPositive: true,
      };
    }
    // mode === "change"
    const o = parseFloat(original);
    const n = parseFloat(newValue);
    if (isNaN(o) || isNaN(n) || o === 0) return null;
    const change = ((n - o) / o) * 100;
    const rounded = change.toFixed(2).replace(/\.?0+$/, "");
    return {
      label: `From ${o} to ${n}`,
      value: (change >= 0 ? "+" : "") + rounded + "%",
      isPositive: change >= 0,
    };
  }, [mode, percent, ofValue, isValue, ofValue2, original, newValue]);

  const reset = () => {
    setPercent("");
    setOfValue("");
    setIsValue("");
    setOfValue2("");
    setOriginal("");
    setNewValue("");
  };

  const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500";

  const modes: { key: Mode; label: string }[] = [
    { key: "of", label: "X% of Y" },
    { key: "is-what", label: "X is what % of Y" },
    { key: "change", label: "% Increase / Decrease" },
  ];

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex flex-wrap gap-2">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => {
              setMode(m.key);
              reset();
            }}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              mode === m.key
                ? "bg-brand-600 text-white"
                : "border border-line bg-surface text-ink-2 hover:border-brand-400"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        {mode === "of" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Percentage (%)
              </label>
              <input
                type="number"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
                placeholder="e.g. 15"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Of Number
              </label>
              <input
                type="number"
                value={ofValue}
                onChange={(e) => setOfValue(e.target.value)}
                placeholder="e.g. 200"
                className={inputClass}
              />
            </div>
          </div>
        )}

        {mode === "is-what" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Number (X)
              </label>
              <input
                type="number"
                value={isValue}
                onChange={(e) => setIsValue(e.target.value)}
                placeholder="e.g. 25"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Total (Y)
              </label>
              <input
                type="number"
                value={ofValue2}
                onChange={(e) => setOfValue2(e.target.value)}
                placeholder="e.g. 200"
                className={inputClass}
              />
            </div>
          </div>
        )}

        {mode === "change" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Original Value
              </label>
              <input
                type="number"
                value={original}
                onChange={(e) => setOriginal(e.target.value)}
                placeholder="e.g. 100"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                New Value
              </label>
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="e.g. 150"
                className={inputClass}
              />
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {result ? (
        <div className="rounded-2xl border border-line bg-surface p-6 text-center">
          <p className="text-sm font-semibold text-ink-3">{result.label}</p>
          <p
            className={`mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl ${
              mode === "change"
                ? result.isPositive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
                : "text-ink"
            }`}
          >
            {result.value}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
          <p className="text-sm text-ink-3">
            Enter values above to see the result
          </p>
        </div>
      )}

      {/* Reset */}
      <div>
        <button
          onClick={reset}
          className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink-2 transition-colors hover:border-brand-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
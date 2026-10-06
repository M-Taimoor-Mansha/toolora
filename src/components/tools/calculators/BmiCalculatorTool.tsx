"use client";

import { useState, useMemo } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface BmiCalculatorToolProps {
  tool: Tool;
}

type Unit = "metric" | "imperial";

interface BmiResult {
  bmi: number;
  category: string;
  categoryColor: string;
  idealMin: number;
  idealMax: number;
}

function calculateBmi(
  weightKg: number,
  heightM: number
): BmiResult | null {
  if (weightKg <= 0 || heightM <= 0) return null;

  const bmi = weightKg / (heightM * heightM);
  const roundedBmi = Math.round(bmi * 10) / 10;

  let category = "";
  let categoryColor = "";

  if (bmi < 18.5) {
    category = "Underweight";
    categoryColor = "text-amber-600 dark:text-amber-400";
  } else if (bmi < 25) {
    category = "Normal weight";
    categoryColor = "text-emerald-600 dark:text-emerald-400";
  } else if (bmi < 30) {
    category = "Overweight";
    categoryColor = "text-orange-600 dark:text-orange-400";
  } else {
    category = "Obese";
    categoryColor = "text-red-600 dark:text-red-400";
  }

  const idealMin = 18.5 * heightM * heightM;
  const idealMax = 24.9 * heightM * heightM;

  return {
    bmi: roundedBmi,
    category,
    categoryColor,
    idealMin: Math.round(idealMin * 10) / 10,
    idealMax: Math.round(idealMax * 10) / 10,
  };
}

export function BmiCalculatorTool({ tool }: BmiCalculatorToolProps) {
  const [unit, setUnit] = useState<Unit>("metric");
  const [heightCm, setHeightCm] = useState<string>("");
  const [heightFt, setHeightFt] = useState<string>("");
  const [heightIn, setHeightIn] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const result = useMemo(() => {
    if (unit === "metric") {
      const h = parseFloat(heightCm);
      const w = parseFloat(weight);
      if (!h || !w) return null;
      return calculateBmi(w, h / 100);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const w = parseFloat(weight);
      const totalInches = ft * 12 + inch;
      if (!totalInches || !w) return null;
      const heightM = totalInches * 0.0254;
      const weightKg = w * 0.453592;
      return calculateBmi(weightKg, heightM);
    }
  }, [unit, heightCm, heightFt, heightIn, weight]);

  const reset = () => {
    setHeightCm("");
    setHeightFt("");
    setHeightIn("");
    setWeight("");
  };

  return (
    <div className="space-y-6">
      {/* Unit Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setUnit("metric")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            unit === "metric"
              ? "bg-brand-600 text-white"
              : "border border-line bg-surface text-ink-2 hover:border-brand-400"
          }`}
        >
          Metric (kg/cm)
        </button>
        <button
          onClick={() => setUnit("imperial")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            unit === "imperial"
              ? "bg-brand-600 text-white"
              : "border border-line bg-surface text-ink-2 hover:border-brand-400"
          }`}
        >
          Imperial (lbs/ft)
        </button>
      </div>

      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        {unit === "metric" ? (
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              Height (cm)
            </label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              placeholder="e.g. 175"
              className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500"
            />
          </div>
        ) : (
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              Height (ft / in)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                placeholder="ft"
                className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500"
              />
              <input
                type="number"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
                placeholder="in"
                className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500"
              />
            </div>
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500"
          />
        </div>
      </div>

      {/* Result */}
      {result ? (
        <div className="rounded-2xl border border-line bg-surface p-6">
          <div className="text-center">
            <p className="text-sm font-semibold text-ink-3">Your BMI</p>
            <p className="mt-2 text-5xl font-extrabold tracking-tight text-ink">
              {result.bmi}
            </p>
            <p className={`mt-2 text-lg font-bold ${result.categoryColor}`}>
              {result.category}
            </p>
          </div>

          <div className="mt-6 border-t border-line pt-4">
            <p className="text-sm text-ink-3">Ideal weight range for your height</p>
            <p className="mt-1 text-base font-semibold text-ink">
              {unit === "metric"
                ? `${result.idealMin} – ${result.idealMax} kg`
                : `${Math.round(result.idealMin * 2.20462 * 10) / 10} – ${Math.round(result.idealMax * 2.20462 * 10) / 10} lbs`}
            </p>
          </div>

          <div className="mt-4 border-t border-line pt-4">
            <p className="text-xs text-ink-3">
              BMI is a screening tool, not a medical diagnosis. Consult a doctor for
              personalized advice.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
          <Icon name="info" className="mx-auto h-8 w-8 text-ink-3" />
          <p className="mt-3 text-sm text-ink-3">
            Enter your height and weight to calculate your BMI
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
"use client";

import { useState, useMemo } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface UnitConverterToolProps {
  tool: Tool;
}

type Category =
  | "length"
  | "weight"
  | "temperature"
  | "volume"
  | "area"
  | "speed"
  | "time";

interface UnitDef {
  key: string;
  label: string;
  factor: number; // multiply by this to get base unit
}

const CATEGORIES: Record<
  Category,
  { label: string; base: string; units: UnitDef[] }
> = {
  length: {
    label: "Length",
    base: "m",
    units: [
      { key: "m", label: "Meter (m)", factor: 1 },
      { key: "km", label: "Kilometer (km)", factor: 1000 },
      { key: "cm", label: "Centimeter (cm)", factor: 0.01 },
      { key: "mm", label: "Millimeter (mm)", factor: 0.001 },
      { key: "mi", label: "Mile (mi)", factor: 1609.344 },
      { key: "yd", label: "Yard (yd)", factor: 0.9144 },
      { key: "ft", label: "Foot (ft)", factor: 0.3048 },
      { key: "in", label: "Inch (in)", factor: 0.0254 },
      { key: "nmi", label: "Nautical Mile (nmi)", factor: 1852 },
    ],
  },
  weight: {
    label: "Weight",
    base: "kg",
    units: [
      { key: "kg", label: "Kilogram (kg)", factor: 1 },
      { key: "g", label: "Gram (g)", factor: 0.001 },
      { key: "mg", label: "Milligram (mg)", factor: 0.000001 },
      { key: "t", label: "Metric Ton (t)", factor: 1000 },
      { key: "lb", label: "Pound (lb)", factor: 0.45359237 },
      { key: "oz", label: "Ounce (oz)", factor: 0.028349523125 },
      { key: "st", label: "Stone (st)", factor: 6.35029318 },
    ],
  },
  temperature: {
    label: "Temperature",
    base: "c",
    units: [
      { key: "c", label: "Celsius (°C)", factor: 1 },
      { key: "f", label: "Fahrenheit (°F)", factor: 1 },
      { key: "k", label: "Kelvin (K)", factor: 1 },
    ],
  },
  volume: {
    label: "Volume",
    base: "l",
    units: [
      { key: "l", label: "Liter (L)", factor: 1 },
      { key: "ml", label: "Milliliter (mL)", factor: 0.001 },
      { key: "m3", label: "Cubic Meter (m³)", factor: 1000 },
      { key: "gal", label: "Gallon US (gal)", factor: 3.785411784 },
      { key: "galuk", label: "Gallon UK (gal)", factor: 4.54609 },
      { key: "qt", label: "Quart US (qt)", factor: 0.946352946 },
      { key: "pt", label: "Pint US (pt)", factor: 0.473176473 },
      { key: "cup", label: "Cup US (cup)", factor: 0.2365882365 },
      { key: "floz", label: "Fluid Ounce US (fl oz)", factor: 0.0295735295625 },
    ],
  },
  area: {
    label: "Area",
    base: "m2",
    units: [
      { key: "m2", label: "Square Meter (m²)", factor: 1 },
      { key: "km2", label: "Square Kilometer (km²)", factor: 1000000 },
      { key: "cm2", label: "Square Centimeter (cm²)", factor: 0.0001 },
      { key: "ha", label: "Hectare (ha)", factor: 10000 },
      { key: "acre", label: "Acre (acre)", factor: 4046.8564224 },
      { key: "ft2", label: "Square Foot (ft²)", factor: 0.09290304 },
      { key: "in2", label: "Square Inch (in²)", factor: 0.00064516 },
      { key: "yd2", label: "Square Yard (yd²)", factor: 0.83612736 },
    ],
  },
  speed: {
    label: "Speed",
    base: "ms",
    units: [
      { key: "ms", label: "Meter/second (m/s)", factor: 1 },
      { key: "kmh", label: "Kilometer/hour (km/h)", factor: 0.277777778 },
      { key: "mph", label: "Mile/hour (mph)", factor: 0.44704 },
      { key: "knot", label: "Knot (kn)", factor: 0.514444444 },
      { key: "fts", label: "Foot/second (ft/s)", factor: 0.3048 },
    ],
  },
  time: {
    label: "Time",
    base: "s",
    units: [
      { key: "s", label: "Second (s)", factor: 1 },
      { key: "ms", label: "Millisecond (ms)", factor: 0.001 },
      { key: "min", label: "Minute (min)", factor: 60 },
      { key: "h", label: "Hour (h)", factor: 3600 },
      { key: "d", label: "Day (d)", factor: 86400 },
      { key: "wk", label: "Week (wk)", factor: 604800 },
    ],
  },
};

const CATEGORY_KEYS: Category[] = [
  "length",
  "weight",
  "temperature",
  "volume",
  "area",
  "speed",
  "time",
];

function convert(
  category: Category,
  fromKey: string,
  toKey: string,
  value: number
): number {
  // Temperature uses special formulas (not just multiplication)
  if (category === "temperature") {
    // First convert to Celsius
    let celsius: number;
    if (fromKey === "c") celsius = value;
    else if (fromKey === "f") celsius = ((value - 32) * 5) / 9;
    else celsius = value - 273.15; // K

    // Then from Celsius to target
    if (toKey === "c") return celsius;
    if (toKey === "f") return (celsius * 9) / 5 + 32;
    return celsius + 273.15; // K
  }

  // Standard factor-based conversion
  const units = CATEGORIES[category].units;
  const fromUnit = units.find((u) => u.key === fromKey);
  const toUnit = units.find((u) => u.key === toKey);
  if (!fromUnit || !toUnit) return 0;

  const baseValue = value * fromUnit.factor;
  return baseValue / toUnit.factor;
}

function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  if (Math.abs(n) >= 1e9 || (Math.abs(n) < 1e-4 && n !== 0)) {
    return n.toExponential(6);
  }
  return parseFloat(n.toPrecision(10)).toString();
}

export function UnitConverterTool({ tool }: UnitConverterToolProps) {
  const [category, setCategory] = useState<Category>("length");
  const [fromKey, setFromKey] = useState("m");
  const [toKey, setToKey] = useState("ft");
  const [inputValue, setInputValue] = useState("1");

  // When category changes, reset units to sensible defaults
  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    const units = CATEGORIES[cat].units;
    setFromKey(units[0].key);
    setToKey(units[1]?.key || units[0].key);
    setInputValue("1");
  };

  const result = useMemo(() => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) return null;
    return convert(category, fromKey, toKey, num);
  }, [category, fromKey, toKey, inputValue]);

  const swap = () => {
    setFromKey(toKey);
    setToKey(fromKey);
    if (result !== null) {
      setInputValue(formatNumber(result));
    }
  };

  const reset = () => {
    setInputValue("1");
  };

  const copyResult = async () => {
    if (result === null) return;
    try {
      await navigator.clipboard.writeText(formatNumber(result));
    } catch {
      /* ignore */
    }
  };

  const currentUnits = CATEGORIES[category].units;

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORY_KEYS.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              category === cat
                ? "bg-brand-600 text-white"
                : "border border-line bg-surface text-ink-2 hover:border-brand-400"
            }`}
          >
            {CATEGORIES[cat].label}
          </button>
        ))}
      </div>

      {/* Converter Card */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
          {/* From */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              From
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full rounded-xl border border-line bg-canvas px-4 py-3 font-mono text-lg text-ink outline-none transition-colors focus:border-brand-500"
              placeholder="0"
            />
            <select
              value={fromKey}
              onChange={(e) => setFromKey(e.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm font-semibold text-ink outline-none transition-colors focus:border-brand-500"
            >
              {currentUnits.map((u) => (
                <option key={u.key} value={u.key}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex items-end justify-center pb-12 sm:pb-16">
            <button
              onClick={swap}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition-colors hover:border-brand-400 hover:text-brand-600"
              aria-label="Swap units"
            >
              <Icon name="chevronRight" className="h-5 w-5 rotate-90 sm:rotate-0" />
            </button>
          </div>

          {/* To */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              To
            </label>
            <input
              type="text"
              value={result !== null ? formatNumber(result) : ""}
              readOnly
              className="w-full rounded-xl border border-line bg-canvas px-4 py-3 font-mono text-lg text-ink outline-none"
              placeholder="—"
            />
            <select
              value={toKey}
              onChange={(e) => setToKey(e.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm font-semibold text-ink outline-none transition-colors focus:border-brand-500"
            >
              {currentUnits.map((u) => (
                <option key={u.key} value={u.key}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Conversion Rate */}
        {result !== null && (
          <div className="mt-5 border-t border-line pt-4 text-sm text-ink-3">
            <span className="font-mono">
              1 {currentUnits.find((u) => u.key === fromKey)?.label} ={" "}
              {formatNumber(convert(category, fromKey, toKey, 1))}{" "}
              {currentUnits.find((u) => u.key === toKey)?.label}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={copyResult}
            disabled={result === null}
            className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
          >
            Copy Result
          </button>
          <button
            onClick={reset}
            className="rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-bold text-ink-2 transition-colors hover:border-brand-400"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
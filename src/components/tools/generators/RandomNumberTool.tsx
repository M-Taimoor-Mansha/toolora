"use client";

import { useState, useCallback } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface RandomNumberToolProps {
  tool: Tool;
}

type SortMode = "none" | "asc" | "desc";

function getRandomInt(max: number): number {
  if (max <= 0) return 0;
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function generateRandomNumbers(
  min: number,
  max: number,
  count: number,
  allowDuplicates: boolean,
  decimals: boolean
): number[] | { error: string } {
  if (min > max) {
    return { error: "Minimum must be less than maximum." };
  }

  if (!allowDuplicates) {
    const rangeSize = max - min + 1;
    if (count > rangeSize) {
      return {
        error: `Cannot generate ${count} unique numbers from a range of ${rangeSize}.`,
      };
    }
  }

  const results: number[] = [];

  if (decimals) {
    for (let i = 0; i < count; i++) {
      const rand = getRandomInt(1000000) / 1000000;
      const value = min + rand * (max - min);
      results.push(Math.round(value * 100) / 100);
    }
    return results;
  }

  if (allowDuplicates) {
    for (let i = 0; i < count; i++) {
      const value = min + getRandomInt(max - min + 1);
      results.push(value);
    }
    return results;
  }

  // No duplicates — Fisher-Yates on range
  const rangeSize = max - min + 1;
  const pool = new Array(rangeSize);
  for (let i = 0; i < rangeSize; i++) pool[i] = min + i;

  for (let i = 0; i < count; i++) {
    const j = i + getRandomInt(rangeSize - i);
    [pool[i], pool[j]] = [pool[j], pool[i]];
    results.push(pool[i]);
  }
  return results;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <button
      onClick={copy}
      disabled={!text}
      className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink-3 transition-colors hover:border-brand-400 hover:text-ink-2 disabled:opacity-40"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function RandomNumberTool({ tool }: RandomNumberToolProps) {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("5");
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [decimals, setDecimals] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("none");
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(() => {
    setError(null);

    const minN = parseFloat(min);
    const maxN = parseFloat(max);
    const countN = parseInt(count, 10);

    if (isNaN(minN) || isNaN(maxN)) {
      setError("Please enter valid minimum and maximum values.");
      return;
    }
    if (isNaN(countN) || countN < 1 || countN > 100) {
      setError("Count must be between 1 and 100.");
      return;
    }

    const result = generateRandomNumbers(
      minN,
      maxN,
      countN,
      allowDuplicates,
      decimals
    );

    if (typeof result === "object" && "error" in result) {
      setError(result.error);
      setResults([]);
      return;
    }

    let numbers = result as number[];
    if (sortMode === "asc") numbers = [...numbers].sort((a, b) => a - b);
    if (sortMode === "desc") numbers = [...numbers].sort((a, b) => b - a);

    setResults(numbers);
  }, [min, max, count, allowDuplicates, decimals, sortMode]);

  const reset = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  const resultsText = results.join(", ");

  return (
    <div className="space-y-6">
      {/* Settings */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              Minimum
            </label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full rounded-xl border border-line bg-canvas px-4 py-3 font-mono text-sm text-ink outline-none transition-colors focus:border-brand-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              Maximum
            </label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full rounded-xl border border-line bg-canvas px-4 py-3 font-mono text-sm text-ink outline-none transition-colors focus:border-brand-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              How Many (1-100)
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full rounded-xl border border-line bg-canvas px-4 py-3 font-mono text-sm text-ink outline-none transition-colors focus:border-brand-500"
            />
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-canvas p-3">
            <input
              type="checkbox"
              checked={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.checked)}
              className="h-4 w-4 accent-brand-600"
            />
            <span className="text-sm font-medium text-ink-2">
              Allow duplicates
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-canvas p-3">
            <input
              type="checkbox"
              checked={decimals}
              onChange={(e) => setDecimals(e.target.checked)}
              className="h-4 w-4 accent-brand-600"
            />
            <span className="text-sm font-medium text-ink-2">
              Allow decimals
            </span>
          </label>
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-semibold text-ink">
            Sort
          </label>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm font-semibold text-ink outline-none transition-colors focus:border-brand-500 sm:w-auto"
          >
            <option value="none">No sorting</option>
            <option value="asc">Ascending (low → high)</option>
            <option value="desc">Descending (high → low)</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          <div className="flex items-start gap-2">
            <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-ink">Results</h3>
              <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                {results.length} number{results.length > 1 ? "s" : ""}
              </span>
            </div>
            <CopyButton text={resultsText} />
          </div>
          <div className="flex flex-wrap gap-2">
            {results.map((num, i) => (
              <span
                key={i}
                className="rounded-lg border border-line bg-canvas px-3 py-2 font-mono text-sm font-bold text-ink"
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={generate}
          className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700"
        >
          Generate
        </button>
        {results.length > 0 && (
          <button
            onClick={reset}
            className="rounded-xl border border-line bg-surface px-6 py-3 text-sm font-bold text-ink-2 transition-colors hover:border-brand-400"
          >
            Clear
          </button>
        )}
      </div>

      {/* Empty state */}
      {results.length === 0 && !error && (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
          <Icon name="info" className="mx-auto h-8 w-8 text-ink-3" />
          <p className="mt-3 text-sm text-ink-3">
            Set your range and click Generate to produce random numbers.
          </p>
        </div>
      )}
    </div>
  );
}
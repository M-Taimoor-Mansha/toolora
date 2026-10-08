"use client";

import { useState, useMemo, useCallback } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface JsonToCsvToolProps {
  tool: Tool;
}

type Delimiter = "," | ";" | "\t";

interface ParseResult {
  success: true;
  rows: Record<string, unknown>[];
  headers: string[];
}

interface ParseError {
  success: false;
  error: string;
}

function parseJson(input: string): ParseResult | ParseError {
  if (!input.trim()) {
    return { success: false, error: "Please paste some JSON first." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error
          ? `Invalid JSON: ${err.message}`
          : "Invalid JSON. Please check your syntax.",
    };
  }

  let rows: Record<string, unknown>[];

  if (Array.isArray(parsed)) {
    if (parsed.length === 0) {
      return { success: false, error: "JSON array is empty." };
    }
    rows = parsed.map((item) => {
      if (typeof item !== "object" || item === null || Array.isArray(item)) {
        return { value: item };
      }
      return item as Record<string, unknown>;
    });
  } else if (typeof parsed === "object" && parsed !== null) {
    rows = [parsed as Record<string, unknown>];
  } else {
    rows = [{ value: parsed }];
  }

  // Collect all unique keys
  const keysSet = new Set<string>();
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      keysSet.add(key);
    }
  }
  const headers = Array.from(keysSet);

  if (headers.length === 0) {
    return { success: false, error: "No columns detected in your JSON." };
  }

  return { success: true, rows, headers };
}

function escapeCsv(
  value: unknown,
  delimiter: string,
  quoteAll: boolean
): string {
  let str: string;

  if (value === null || value === undefined) {
    str = "";
  } else if (typeof value === "object") {
    str = JSON.stringify(value);
  } else {
    str = String(value);
  }

  const needsQuoting =
    quoteAll ||
    str.includes(delimiter) ||
    str.includes('"') ||
    str.includes("\n") ||
    str.includes("\r");

  if (needsQuoting) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toCsv(
  rows: Record<string, unknown>[],
  headers: string[],
  delimiter: string,
  includeHeaders: boolean,
  quoteAll: boolean
): string {
  const lines: string[] = [];

  if (includeHeaders) {
    lines.push(
      headers.map((h) => escapeCsv(h, delimiter, quoteAll)).join(delimiter)
    );
  }

  for (const row of rows) {
    const cells = headers.map((h) => escapeCsv(row[h], delimiter, quoteAll));
    lines.push(cells.join(delimiter));
  }

  return lines.join("\n");
}

const SAMPLE_JSON = `[
  {"name": "John Doe", "age": 30, "city": "New York"},
  {"name": "Jane Smith", "age": 25, "city": "Los Angeles"},
  {"name": "Bob Johnson", "age": 45, "city": "Chicago"}
]`;

export function JsonToCsvTool({ tool }: JsonToCsvToolProps) {
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState<Delimiter>(",");
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [quoteAll, setQuoteAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const parseResult = useMemo(() => parseJson(input), [input]);

  const csvOutput = useMemo(() => {
    if (!parseResult.success) return "";
    return toCsv(
      parseResult.rows,
      parseResult.headers,
      delimiter,
      includeHeaders,
      quoteAll
    );
  }, [parseResult, delimiter, includeHeaders, quoteAll]);

  const copy = useCallback(async () => {
    if (!csvOutput) return;
    try {
      await navigator.clipboard.writeText(csvOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }, [csvOutput]);

  const download = useCallback(() => {
    if (!csvOutput) return;
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `toolora-export-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [csvOutput]);

  const reset = useCallback(() => {
    setInput("");
  }, []);

  const loadSample = useCallback(() => {
    setInput(SAMPLE_JSON);
  }, []);

  const delimiterOptions: { value: Delimiter; label: string }[] = [
    { value: ",", label: "Comma (,)" },
    { value: ";", label: "Semicolon (;)" },
    { value: "\t", label: "Tab (\\t)" },
  ];

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-semibold text-ink">
            JSON Input
          </label>
          <button
            onClick={loadSample}
            className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
          >
            Load sample
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Paste JSON array here, e.g. [{"name": "John", "age": 30}]'
          className="h-48 w-full resize-y rounded-xl border border-line bg-surface p-4 font-mono text-sm text-ink outline-none transition-colors focus:border-brand-500"
          spellCheck={false}
        />
        {input && (
          <button
            onClick={reset}
            className="mt-2 text-xs font-semibold text-ink-3 hover:text-ink-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Options */}
      <div className="rounded-2xl border border-line bg-surface p-5">
        <h3 className="text-sm font-semibold text-ink">Options</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-3">
              Delimiter
            </label>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value as Delimiter)}
              className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-brand-500"
            >
              {delimiterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-canvas p-3">
            <input
              type="checkbox"
              checked={includeHeaders}
              onChange={(e) => setIncludeHeaders(e.target.checked)}
              className="h-4 w-4 accent-brand-600"
            />
            <span className="text-sm font-medium text-ink-2">
              Include headers
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-canvas p-3">
            <input
              type="checkbox"
              checked={quoteAll}
              onChange={(e) => setQuoteAll(e.target.checked)}
              className="h-4 w-4 accent-brand-600"
            />
            <span className="text-sm font-medium text-ink-2">
              Quote all fields
            </span>
          </label>
        </div>
      </div>

      {/* Error */}
      {input.trim() && !parseResult.success && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          <div className="flex items-start gap-2">
            <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{parseResult.error}</span>
          </div>
        </div>
      )}

      {/* Output */}
      {parseResult.success && csvOutput && (
        <>
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-ink">
                  CSV Output
                </h3>
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  {parseResult.rows.length} rows × {parseResult.headers.length}{" "}
                  cols
                </span>
              </div>
              <button
                onClick={copy}
                className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink-3 transition-colors hover:border-brand-400 hover:text-ink-2"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="max-h-80 overflow-auto rounded-xl bg-canvas p-4 font-mono text-xs text-ink-2">
              {csvOutput}
            </pre>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={download}
              className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700"
            >
              Download CSV
            </button>
            <button
              onClick={reset}
              className="rounded-xl border border-line bg-surface px-6 py-3 text-sm font-bold text-ink-2 transition-colors hover:border-brand-400"
            >
              Reset
            </button>
          </div>
        </>
      )}

      {/* Empty state */}
      {!input.trim() && (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
          <Icon name="info" className="mx-auto h-8 w-8 text-ink-3" />
          <p className="mt-3 text-sm text-ink-3">
            Paste a JSON array above to convert it to CSV.
          </p>
        </div>
      )}
    </div>
  );
}
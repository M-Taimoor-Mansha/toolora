"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface TimestampConverterToolProps {
  tool: Tool;
}

type InputMode = "timestamp" | "date";

function formatRelative(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const absDiff = Math.abs(diff);
  const isPast = diff > 0;

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let value: string;
  if (seconds < 5) return "just now";
  if (seconds < 60) value = `${seconds} seconds`;
  else if (minutes < 60) value = `${minutes} minute${minutes > 1 ? "s" : ""}`;
  else if (hours < 24) value = `${hours} hour${hours > 1 ? "s" : ""}`;
  else if (days < 30) value = `${days} day${days > 1 ? "s" : ""}`;
  else if (months < 12) value = `${months} month${months > 1 ? "s" : ""}`;
  else value = `${years} year${years > 1 ? "s" : ""}`;

  return isPast ? `${value} ago` : `in ${value}`;
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
      className="rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-ink-3 transition-colors hover:border-brand-400 hover:text-ink-2 disabled:opacity-40"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function TimestampConverterTool({
  tool,
}: TimestampConverterToolProps) {
  const [now, setNow] = useState(() => Date.now());
  const [mode, setMode] = useState<InputMode>("timestamp");
  const [input, setInput] = useState("");

  // Live current timestamp (updates every second)
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const nowSeconds = Math.floor(now / 1000);

  // Parse input and produce date
  const parsedDate = useMemo<Date | null>(() => {
    if (!input.trim()) return null;

    if (mode === "timestamp") {
      const num = Number(input.trim());
      if (!isFinite(num) || isNaN(num)) return null;

      // Auto-detect: 13-digit = ms, 10-digit = seconds
      let ms: number;
      if (Math.abs(num) > 9999999999) {
        ms = num; // milliseconds
      } else {
        ms = num * 1000; // seconds
      }

      const d = new Date(ms);
      return isNaN(d.getTime()) ? null : d;
    }

    // mode === "date" — parse input as date string
    const d = new Date(input.trim());
    return isNaN(d.getTime()) ? null : d;
  }, [input, mode]);

  const reset = useCallback(() => {
    setInput("");
  }, []);

  const useCurrentTime = useCallback(() => {
    if (mode === "timestamp") {
      setInput(String(nowSeconds));
    } else {
      setInput(new Date().toISOString().slice(0, 19));
    }
  }, [mode, nowSeconds]);

  const formats = parsedDate
    ? [
        {
          label: "Unix Timestamp (seconds)",
          value: String(Math.floor(parsedDate.getTime() / 1000)),
        },
        {
          label: "Unix Timestamp (milliseconds)",
          value: String(parsedDate.getTime()),
        },
        {
          label: "ISO 8601",
          value: parsedDate.toISOString(),
        },
        {
          label: "UTC",
          value: parsedDate.toUTCString(),
        },
        {
          label: "Local Time",
          value: parsedDate.toLocaleString(),
        },
        {
          label: "Relative",
          value: formatRelative(parsedDate),
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Live Current Timestamp */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink-3">
            Current Unix Timestamp
          </p>
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        </div>
        <p className="mt-2 font-mono text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {nowSeconds}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-xs text-ink-3">
            {new Date(now).toISOString()}
          </p>
          <CopyButton text={String(nowSeconds)} />
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setMode("timestamp");
            setInput("");
          }}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            mode === "timestamp"
              ? "bg-brand-600 text-white"
              : "border border-line bg-surface text-ink-2 hover:border-brand-400"
          }`}
        >
          Timestamp → Date
        </button>
        <button
          onClick={() => {
            setMode("date");
            setInput("");
          }}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            mode === "date"
              ? "bg-brand-600 text-white"
              : "border border-line bg-surface text-ink-2 hover:border-brand-400"
          }`}
        >
          Date → Timestamp
        </button>
      </div>

      {/* Input */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-ink">
            {mode === "timestamp"
              ? "Unix Timestamp (seconds or milliseconds)"
              : "Date (any format)"}
          </label>
          <button
            onClick={useCurrentTime}
            className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
          >
            Use current
          </button>
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "timestamp"
              ? "e.g. 1700000000 or 1700000000000"
              : "e.g. 2026-10-08T12:34:56"
          }
          className="mt-3 w-full rounded-xl border border-line bg-canvas px-4 py-3 font-mono text-sm text-ink outline-none transition-colors focus:border-brand-500"
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

      {/* Results */}
      {parsedDate ? (
        <div className="space-y-3">
          {formats.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border border-line bg-surface p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wide text-ink-3">
                  {f.label}
                </span>
                <CopyButton text={f.value} />
              </div>
              <p className="break-all font-mono text-sm text-ink">
                {f.value}
              </p>
            </div>
          ))}
        </div>
      ) : input.trim() ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          <div className="flex items-start gap-2">
            <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Invalid {mode === "timestamp" ? "timestamp" : "date"}. Please
              check your input.
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
          <Icon name="info" className="mx-auto h-8 w-8 text-ink-3" />
          <p className="mt-3 text-sm text-ink-3">
            {mode === "timestamp"
              ? "Enter a Unix timestamp above to convert it to a date."
              : "Enter a date above to convert it to a Unix timestamp."}
          </p>
        </div>
      )}
    </div>
  );
}
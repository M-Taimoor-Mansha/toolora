"use client";

import { useState, useMemo, useEffect } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface TimezoneConverterToolProps {
  tool: Tool;
}

interface Timezone {
  label: string;
  value: string;
}

const TIMEZONES: Timezone[] = [
  { label: "UTC (Coordinated Universal Time)", value: "UTC" },
  { label: "New York (US Eastern)", value: "America/New_York" },
  { label: "Chicago (US Central)", value: "America/Chicago" },
  { label: "Denver (US Mountain)", value: "America/Denver" },
  { label: "Los Angeles (US Pacific)", value: "America/Los_Angeles" },
  { label: "London (UK)", value: "Europe/London" },
  { label: "Paris (Central European)", value: "Europe/Paris" },
  { label: "Berlin (Central European)", value: "Europe/Berlin" },
  { label: "Moscow (Russia)", value: "Europe/Moscow" },
  { label: "Dubai (UAE)", value: "Asia/Dubai" },
  { label: "Karachi (Pakistan)", value: "Asia/Karachi" },
  { label: "Lahore (Pakistan)", value: "Asia/Karachi" },
  { label: "Delhi (India)", value: "Asia/Kolkata" },
  { label: "Bangkok (Thailand)", value: "Asia/Bangkok" },
  { label: "Singapore", value: "Asia/Singapore" },
  { label: "Hong Kong", value: "Asia/Hong_Kong" },
  { label: "Shanghai (China)", value: "Asia/Shanghai" },
  { label: "Tokyo (Japan)", value: "Asia/Tokyo" },
  { label: "Seoul (Korea)", value: "Asia/Seoul" },
  { label: "Sydney (Australia)", value: "Australia/Sydney" },
  { label: "Auckland (New Zealand)", value: "Pacific/Auckland" },
  { label: "São Paulo (Brazil)", value: "America/Sao_Paulo" },
  { label: "Cairo (Egypt)", value: "Africa/Cairo" },
  { label: "Johannesburg (South Africa)", value: "Africa/Johannesburg" },
];

const QUICK_PRESETS: { label: string; tz: string }[] = [
  { label: "UTC", tz: "UTC" },
  { label: "New York", tz: "America/New_York" },
  { label: "London", tz: "Europe/London" },
  { label: "Dubai", tz: "Asia/Dubai" },
  { label: "Karachi", tz: "Asia/Karachi" },
  { label: "Tokyo", tz: "Asia/Tokyo" },
  { label: "Sydney", tz: "Australia/Sydney" },
];

function formatInTimezone(date: Date, tz: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      weekday: "short",
      hour12: true,
    }).format(date);
  } catch {
    return "Invalid timezone";
  }
}

function formatTimeOnly(date: Date, tz: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    return "—";
  }
}

function getOffsetMinutes(date: Date, tz: string): number {
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone: tz }));
  return Math.round((tzDate.getTime() - utcDate.getTime()) / 60000);
}

function formatOffsetDiff(diffMinutes: number): string {
  if (diffMinutes === 0) return "Same time";
  const sign = diffMinutes > 0 ? "ahead" : "behind";
  const abs = Math.abs(diffMinutes);
  const hours = Math.floor(abs / 60);
  const mins = abs % 60;
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0) parts.push(`${mins}m`);
  return `${parts.join(" ")} ${sign}`;
}

function getLocalTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

function toDatetimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function TimezoneConverterTool({ tool }: TimezoneConverterToolProps) {
  const [fromTz, setFromTz] = useState("UTC");
  const [toTz, setToTz] = useState("Asia/Karachi");
  const [datetimeStr, setDatetimeStr] = useState("");
  const [detectedTz, setDetectedTz] = useState<string>("");

  // Detect user's timezone and set defaults on mount
  useEffect(() => {
    const detected = getLocalTimezone();
    setDetectedTz(detected);
    setFromTz(detected);
    setToTz("UTC");
    setDatetimeStr(toDatetimeLocalValue(new Date()));
  }, []);

  // Parse input as a Date (in the FROM timezone, not browser local)
  const inputDate = useMemo<Date | null>(() => {
    if (!datetimeStr) return null;
    try {
      // The datetime-local value has no timezone info. Treat as if it's in `fromTz`.
      // Trick: append an offset to convert correctly.
      const naive = new Date(datetimeStr);
      if (isNaN(naive.getTime())) return null;

      // Compute the offset of fromTz at this naive time
      const fromOffset = getOffsetMinutes(naive, fromTz);
      // Shift: treat naive as UTC, then subtract fromOffset
      return new Date(naive.getTime() - fromOffset * 60000);
    } catch {
      return null;
    }
  }, [datetimeStr, fromTz]);

  const swap = () => {
    setFromTz(toTz);
    setToTz(fromTz);
  };

  const useNow = () => {
    setDatetimeStr(toDatetimeLocalValue(new Date()));
  };

  const diffMinutes = inputDate
    ? getOffsetMinutes(inputDate, toTz) - getOffsetMinutes(inputDate, fromTz)
    : 0;

  const displayFromTz = TIMEZONES.find((t) => t.value === fromTz)?.label.split(" (")[0] || fromTz;
  const displayToTz = TIMEZONES.find((t) => t.value === toTz)?.label.split(" (")[0] || toTz;

  return (
    <div className="space-y-6">
      {/* Datetime Input */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-ink">
            Date &amp; Time
          </label>
          <button
            onClick={useNow}
            className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
          >
            Use current time
          </button>
        </div>
        <input
          type="datetime-local"
          value={datetimeStr}
          onChange={(e) => setDatetimeStr(e.target.value)}
          className="mt-3 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500"
        />
        {detectedTz && (
          <p className="mt-2 text-xs text-ink-3">
            Your timezone: <span className="font-mono font-semibold">{detectedTz}</span>
          </p>
        )}
      </div>

      {/* Timezone Selectors */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              From Timezone
            </label>
            <select
              value={fromTz}
              onChange={(e) => setFromTz(e.target.value)}
              className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm font-semibold text-ink outline-none transition-colors focus:border-brand-500"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value + tz.label} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end justify-center pb-1">
            <button
              onClick={swap}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition-colors hover:border-brand-400 hover:text-brand-600"
              aria-label="Swap timezones"
            >
              <Icon name="chevronRight" className="h-5 w-5 rotate-90 sm:rotate-0" />
            </button>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              To Timezone
            </label>
            <select
              value={toTz}
              onChange={(e) => setToTz(e.target.value)}
              className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm font-semibold text-ink outline-none transition-colors focus:border-brand-500"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value + tz.label} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-ink-3">
            Quick set target:
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setToTz(p.tz)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  toTz === p.tz
                    ? "bg-brand-600 text-white"
                    : "border border-line bg-canvas text-ink-2 hover:border-brand-400"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      {inputDate ? (
        <>
          <div className="rounded-2xl border border-line bg-surface p-6 text-center">
            <p className="text-sm font-semibold text-ink-3">
              {displayToTz}
            </p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {formatTimeOnly(inputDate, toTz)}
            </p>
            <p className="mt-2 text-sm text-ink-2">
              {formatInTimezone(inputDate, toTz)}
            </p>
            <div className="mt-4 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
              {formatOffsetDiff(diffMinutes)}
            </div>
          </div>

          {/* Both Zones Detail */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-ink-3">
                From — {displayFromTz}
              </p>
              <p className="mt-2 text-sm font-semibold text-ink">
                {formatInTimezone(inputDate, fromTz)}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-ink-3">
                To — {displayToTz}
              </p>
              <p className="mt-2 text-sm font-semibold text-ink">
                {formatInTimezone(inputDate, toTz)}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
          <Icon name="clock" className="mx-auto h-8 w-8 text-ink-3" />
          <p className="mt-3 text-sm text-ink-3">
            Pick a date and time to see the conversion.
          </p>
        </div>
      )}
    </div>
  );
}
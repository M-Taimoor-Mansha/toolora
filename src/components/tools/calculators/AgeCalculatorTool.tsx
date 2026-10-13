"use client";

import { useState, useMemo } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface AgeCalculatorToolProps {
  tool: Tool;
}

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthdayDays: number;
  bornOn: string;
}

function calculateAge(birthDate: Date, targetDate: Date): AgeResult | null {
  if (birthDate > targetDate) return null;

  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = targetDate.getTime() - birthDate.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);

  // Next birthday
  const today = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  let nextBirthday = new Date(
    targetDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  if (nextBirthday < today) {
    nextBirthday = new Date(
      targetDate.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  }
  const nextBirthdayDays = Math.ceil(
    (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const bornOn = DAYS[birthDate.getDay()];

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalHours,
    totalMinutes,
    totalSeconds,
    nextBirthdayDays,
    bornOn,
  };
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
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

export function AgeCalculatorTool({ tool }: AgeCalculatorToolProps) {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  const result = useMemo<AgeResult | null>(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate + "T00:00:00");
    const target = new Date(targetDate + "T00:00:00");
    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return null;
    return calculateAge(birth, target);
  }, [birthDate, targetDate]);

  const reset = () => {
    setBirthDate("");
    const today = new Date();
    setTargetDate(today.toISOString().slice(0, 10));
  };

  const mainAgeText = result
    ? `${result.years} year${result.years !== 1 ? "s" : ""}, ${result.months} month${result.months !== 1 ? "s" : ""}, ${result.days} day${result.days !== 1 ? "s" : ""}`
    : "";

  const inputClass =
    "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500";

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={targetDate}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              Age at Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        {birthDate && (
          <button
            onClick={reset}
            className="mt-4 text-xs font-semibold text-ink-3 hover:text-ink-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Result */}
      {result ? (
        <>
          {/* Main Age */}
          <div className="rounded-2xl border border-line bg-surface p-6 text-center">
            <p className="text-sm font-semibold text-ink-3">Your Age</p>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {result.years}{" "}
              <span className="text-lg font-semibold text-ink-3">
                year{result.years !== 1 ? "s" : ""}
              </span>{" "}
              {result.months}{" "}
              <span className="text-lg font-semibold text-ink-3">
                month{result.months !== 1 ? "s" : ""}
              </span>{" "}
              {result.days}{" "}
              <span className="text-lg font-semibold text-ink-3">
                day{result.days !== 1 ? "s" : ""}
              </span>
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
                Born on {result.bornOn}
              </span>
              <CopyButton text={mainAgeText} />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Total Days", value: formatNumber(result.totalDays) },
              { label: "Total Weeks", value: formatNumber(result.totalWeeks) },
              { label: "Total Hours", value: formatNumber(result.totalHours) },
              { label: "Total Minutes", value: formatNumber(result.totalMinutes) },
              { label: "Total Seconds", value: formatNumber(result.totalSeconds) },
              {
                label: "Next Birthday",
                value:
                  result.nextBirthdayDays === 0
                    ? "Today! 🎂"
                    : `in ${result.nextBirthdayDays} day${result.nextBirthdayDays !== 1 ? "s" : ""}`,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-line bg-surface p-4"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-ink-3">
                  {stat.label}
                </p>
                <p className="mt-2 font-mono text-lg font-bold text-ink">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : birthDate ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          <div className="flex items-start gap-2">
            <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Birth date must be before the target date. Please check your
              inputs.
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
          <Icon name="cake" className="mx-auto h-8 w-8 text-ink-3" />
          <p className="mt-3 text-sm text-ink-3">
            Enter your date of birth to calculate your age.
          </p>
        </div>
      )}
    </div>
  );
}
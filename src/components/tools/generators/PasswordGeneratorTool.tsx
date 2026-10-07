"use client";

import { useState, useCallback, useEffect } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface PasswordGeneratorToolProps {
  tool: Tool;
}

interface Options {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeSimilar: boolean;
}

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const SIMILAR = "il1Lo0O";

function getRandomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function generatePassword(options: Options): string {
  let chars = "";
  if (options.uppercase) chars += UPPERCASE;
  if (options.lowercase) chars += LOWERCASE;
  if (options.numbers) chars += NUMBERS;
  if (options.symbols) chars += SYMBOLS;

  if (options.excludeSimilar) {
    chars = chars
      .split("")
      .filter((c) => !SIMILAR.includes(c))
      .join("");
  }

  if (!chars) return "";

  let password = "";
  for (let i = 0; i < options.length; i++) {
    password += chars[getRandomInt(chars.length)];
  }
  return password;
}

function getStrength(password: string): {
  label: string;
  color: string;
  percent: number;
} {
  if (!password) return { label: "—", color: "bg-line", percent: 0 };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2)
    return { label: "Weak", color: "bg-red-500", percent: 25 };
  if (score <= 4)
    return { label: "Medium", color: "bg-amber-500", percent: 50 };
  if (score <= 5)
    return { label: "Strong", color: "bg-emerald-500", percent: 75 };
  return { label: "Very Strong", color: "bg-emerald-600", percent: 100 };
}

export function PasswordGeneratorTool({ tool }: PasswordGeneratorToolProps) {
  const [options, setOptions] = useState<Options>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
  });
  const [password, setPassword] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    setPassword(generatePassword(options));
    setCopied(false);
  }, [options]);

  useEffect(() => {
    generate();
  }, [generate]);

  const copy = useCallback(async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [password]);

  const strength = getStrength(password);

  const toggleOption = (key: keyof Options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Password Display */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="flex items-center gap-3">
          <code className="min-w-0 flex-1 break-all font-mono text-lg font-semibold text-ink sm:text-xl">
            {password || "Click Generate"}
          </code>
          <button
            onClick={copy}
            disabled={!password}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
            aria-label="Copy password"
          >
            <Icon name={copied ? "check" : "fileText"} className="h-5 w-5" />
          </button>
        </div>

        {/* Strength Meter */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink-3">Strength</span>
            <span className="font-semibold text-ink-2">{strength.label}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
            <div
              className={`h-full transition-all ${strength.color}`}
              style={{ width: `${strength.percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Length Slider */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-ink">
            Password Length
          </label>
          <span className="rounded-lg bg-surface-2 px-3 py-1 font-mono text-sm font-bold text-ink">
            {options.length}
          </span>
        </div>
        <input
          type="range"
          min={8}
          max={128}
          value={options.length}
          onChange={(e) =>
            setOptions((prev) => ({
              ...prev,
              length: parseInt(e.target.value, 10),
            }))
          }
          className="mt-4 w-full accent-brand-600"
        />
        <div className="mt-1 flex justify-between text-xs text-ink-3">
          <span>8</span>
          <span>128</span>
        </div>
      </div>

      {/* Character Options */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <h3 className="text-sm font-semibold text-ink">Include Characters</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { key: "uppercase" as const, label: "Uppercase (A-Z)" },
            { key: "lowercase" as const, label: "Lowercase (a-z)" },
            { key: "numbers" as const, label: "Numbers (0-9)" },
            { key: "symbols" as const, label: "Symbols (!@#$)" },
          ].map(({ key, label }) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-canvas p-3 transition-colors hover:border-brand-400"
            >
              <input
                type="checkbox"
                checked={options[key]}
                onChange={() => toggleOption(key)}
                className="h-4 w-4 accent-brand-600"
              />
              <span className="text-sm font-medium text-ink-2">{label}</span>
            </label>
          ))}
        </div>

        <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-canvas p-3 transition-colors hover:border-brand-400">
          <input
            type="checkbox"
            checked={options.excludeSimilar}
            onChange={() => toggleOption("excludeSimilar")}
            className="h-4 w-4 accent-brand-600"
          />
          <span className="text-sm font-medium text-ink-2">
            Exclude similar characters (l, 1, O, 0)
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={generate}
          className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700"
        >
          Generate New Password
        </button>
        <button
          onClick={copy}
          disabled={!password}
          className="rounded-xl border border-line bg-surface px-6 py-3 text-sm font-bold text-ink-2 transition-colors hover:border-brand-400 disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
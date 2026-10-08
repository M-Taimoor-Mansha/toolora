"use client";

import { useState, useMemo } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface NumberToWordsToolProps {
  tool: Tool;
}

type Currency = "none" | "usd" | "pkr" | "eur" | "gbp";

interface CurrencyConfig {
  label: string;
  major: string;
  minor: string;
}

const CURRENCIES: Record<Exclude<Currency, "none">, CurrencyConfig> = {
  usd: { label: "USD (Dollars)", major: "dollars", minor: "cents" },
  pkr: { label: "PKR (Rupees)", major: "rupees", minor: "paisa" },
  eur: { label: "EUR (Euros)", major: "euros", minor: "cents" },
  gbp: { label: "GBP (Pounds)", major: "pounds", minor: "pence" },
};

const ONES = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const TENS = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

const SCALES = [
  { value: 1_000_000_000_000, name: "trillion" },
  { value: 1_000_000_000, name: "billion" },
  { value: 1_000_000, name: "million" },
  { value: 1_000, name: "thousand" },
  { value: 100, name: "hundred" },
];

function under1000(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ONES[n];
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    return TENS[tens] + (ones ? "-" + ONES[ones] : "");
  }
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  return ONES[hundreds] + " hundred" + (rest ? " " + under1000(rest) : "");
}

function integerToWords(n: number): string {
  if (n === 0) return "zero";
  if (n < 0) return "negative " + integerToWords(-n);

  let result = "";
  let remaining = n;

  for (const scale of SCALES) {
    if (remaining >= scale.value) {
      const count = Math.floor(remaining / scale.value);
      remaining = remaining % scale.value;
      result +=
        (result ? " " : "") +
        integerToWords(count) +
        " " +
        scale.name;
    }
  }

  if (remaining > 0) {
    result += (result ? " " : "") + under1000(remaining);
  }

  return result;
}

function numberToWords(n: number, currency: Currency): string {
  if (!isFinite(n)) return "—";

  const isNegative = n < 0;
  const absN = Math.abs(n);

  const integerPart = Math.floor(absN);
  const decimalPart = absN - integerPart;
  const cents = Math.round(decimalPart * 100);

  const integerWords = integerToWords(integerPart);

  let result: string;

  if (currency === "none") {
    result = integerWords;
    if (cents > 0) {
      result += ` and ${cents}/100`;
    }
  } else {
    const config = CURRENCIES[currency];
    result = `${integerWords} ${config.major}`;
    if (cents > 0) {
      result += ` and ${integerToWords(cents)} ${config.minor}`;
    }
  }

  if (isNegative) {
    result = "negative " + result;
  }

  return result;
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

export function NumberToWordsTool({ tool }: NumberToWordsToolProps) {
  const [input, setInput] = useState("");
  const [currency, setCurrency] = useState<Currency>("none");

  const result = useMemo(() => {
    if (!input.trim()) return "";
    const num = Number(input.replace(/,/g, "").trim());
    if (isNaN(num)) return "";
    return numberToWords(num, currency);
  }, [input, currency]);

  const error =
    input.trim() && !result ? "Please enter a valid number." : null;

  const currencyOptions: { value: Currency; label: string }[] = [
    { value: "none", label: "No currency (plain number)" },
    { value: "usd", label: "USD — Dollars / Cents" },
    { value: "pkr", label: "PKR — Rupees / Paisa" },
    { value: "eur", label: "EUR — Euros / Cents" },
    { value: "gbp", label: "GBP — Pounds / Pence" },
  ];

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-ink">
          Number
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 1234.56 or 1,000,000"
          className="w-full rounded-xl border border-line bg-surface px-4 py-4 font-mono text-lg text-ink outline-none transition-colors focus:border-brand-500"
          spellCheck={false}
        />
      </div>

      {/* Currency */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-ink">
          Currency Format
        </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink outline-none transition-colors focus:border-brand-500"
        >
          {currencyOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
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

      {/* Result */}
      {result ? (
        <div className="rounded-2xl border border-line bg-surface p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wide text-ink-3">
              In Words
            </span>
            <CopyButton text={result} />
          </div>
          <p className="text-lg font-semibold leading-relaxed text-ink sm:text-xl">
            {result}
          </p>
        </div>
      ) : (
        !error && (
          <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
            <Icon name="info" className="mx-auto h-8 w-8 text-ink-3" />
            <p className="mt-3 text-sm text-ink-3">
              Enter a number above to see it written in words.
            </p>
          </div>
        )
      )}

      {/* Examples */}
      <div className="rounded-2xl border border-line bg-surface p-5">
        <h3 className="text-sm font-semibold text-ink">Examples</h3>
        <div className="mt-3 space-y-2 text-sm text-ink-2">
          <div className="flex justify-between gap-3">
            <span className="font-mono">1234</span>
            <span className="text-right">
              one thousand two hundred thirty-four
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="font-mono">1,000,000</span>
            <span className="text-right">one million</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="font-mono">1234.56 USD</span>
            <span className="text-right">
              one thousand two hundred thirty-four dollars and fifty-six cents
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
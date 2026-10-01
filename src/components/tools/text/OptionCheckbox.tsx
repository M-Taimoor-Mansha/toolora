"use client";

import { cn } from "@/lib/cn";

interface OptionCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

/** Compact, tool-styled checkbox used for line-processing options. */
export function OptionCheckbox({ label, checked, onChange, className }: OptionCheckboxProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer select-none items-center gap-2 rounded-xl border border-line bg-surface-2/50 px-3 py-1.5 text-xs font-bold text-ink-2 transition-colors hover:border-line-strong focus-within:ring-2 focus-within:ring-brand-500",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-3.5 w-3.5 rounded accent-brand-600"
      />
      <span>{label}</span>
    </label>
  );
}

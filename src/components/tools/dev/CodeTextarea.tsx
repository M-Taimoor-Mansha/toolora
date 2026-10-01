"use client";

import { useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { formatBytes, getByteLength } from "@/lib/dev-tools";

interface CodeTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value"> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Optional right-side slot in the header (e.g. "Load sample" button). */
  headerSlot?: ReactNode;
  invalid?: boolean;
  showStats?: boolean;
  /**
   * Monospace (JetBrains Mono) typography — default true for code tools.
   * Text tools pass false for prose-friendly editing.
   */
  mono?: boolean;
  minHeightClass?: string;
}

export function CodeTextarea({
  label,
  value,
  onChange,
  headerSlot,
  invalid = false,
  showStats = true,
  mono = true,
  minHeightClass = "min-h-[240px] sm:min-h-[280px]",
  className,
  id,
  ...rest
}: CodeTextareaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const charCount = value.length;
  const byteSize = value ? formatBytes(getByteLength(value)) : "0 B";

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-2/50 px-4 py-2.5">
        <label
          htmlFor={inputId}
          className="text-xs font-extrabold uppercase tracking-[0.1em] text-ink-2"
        >
          {label}
        </label>
        <div className="flex flex-wrap items-center gap-2.5">
          {showStats ? (
            <span className="font-mono text-[11px] font-medium text-ink-3">
              {charCount.toLocaleString()} chars · {byteSize}
            </span>
          ) : null}
          {headerSlot}
        </div>
      </div>

      <textarea
        id={inputId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        className={cn(
          "block w-full resize-y bg-surface p-4 leading-relaxed text-ink placeholder:text-ink-3 focus:outline-none focus:ring-2 focus:ring-inset",
          mono
            ? "font-mono text-[13px] placeholder:font-sans placeholder:text-sm sm:text-sm"
            : "text-[15px]",
          invalid
            ? "focus:ring-red-500/40"
            : "focus:ring-brand-500/35",
          minHeightClass,
          className,
        )}
        {...rest}
      />
    </div>
  );
}

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Marks the field as invalid (visual only). */
  invalid?: boolean;
}

export function Input({ className, invalid, ...rest }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border bg-surface px-4 text-[15px] text-ink shadow-sm transition-all duration-150 placeholder:text-ink-3 focus:outline-none focus:ring-2",
        invalid
          ? "border-red-400 focus:border-red-500 focus:ring-red-500/25 dark:border-red-800"
          : "border-line hover:border-line-strong focus:border-brand-500 focus:ring-brand-500/25",
        className,
      )}
      {...rest}
    />
  );
}

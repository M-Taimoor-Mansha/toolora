import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

export type ValidationVariant = "error" | "success" | "info";

interface ValidationMessageProps {
  variant: ValidationVariant;
  title: string;
  description?: string;
  /** Optional metadata pill (e.g. "Line 4 · Column 12"). */
  badge?: string;
  children?: ReactNode;
  className?: string;
}

const styles: Record<
  ValidationVariant,
  { container: string; iconWrap: string; icon: IconName; title: string; badge: string }
> = {
  error: {
    container:
      "border-red-500/30 bg-red-500/[0.06] dark:border-red-500/35 dark:bg-red-500/[0.08]",
    iconWrap: "bg-red-500/15 text-red-600 dark:text-red-400",
    icon: "alert",
    title: "text-red-800 dark:text-red-200",
    badge:
      "bg-red-500/15 text-red-700 ring-1 ring-red-500/30 dark:text-red-300",
  },
  success: {
    container:
      "border-emerald-500/30 bg-emerald-500/[0.06] dark:border-emerald-500/35 dark:bg-emerald-500/[0.08]",
    iconWrap: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    icon: "check",
    title: "text-emerald-800 dark:text-emerald-200",
    badge:
      "bg-emerald-500/15 text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-300",
  },
  info: {
    container: "border-line bg-surface-2/60",
    iconWrap: "bg-brand-500/15 text-brand-700 dark:text-brand-300",
    icon: "info",
    title: "text-ink",
    badge: "bg-surface text-ink-2 ring-1 ring-line",
  },
};

export function ValidationMessage({
  variant,
  title,
  description,
  badge,
  children,
  className,
}: ValidationMessageProps) {
  const s = styles[variant];
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      aria-live="polite"
      className={cn(
        "flex items-start gap-3.5 rounded-2xl border p-4 animate-fade-in",
        s.container,
        className,
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          s.iconWrap,
        )}
      >
        <Icon name={s.icon} className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className={cn("text-sm font-extrabold tracking-tight", s.title)}>{title}</p>
          {badge ? (
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold",
                s.badge,
              )}
            >
              {badge}
            </span>
          ) : null}
        </div>
        {description ? (
          <p className="mt-1 text-sm leading-relaxed text-ink-2">{description}</p>
        ) : null}
        {children ? <div className="mt-3">{children}</div> : null}
      </div>
    </div>
  );
}

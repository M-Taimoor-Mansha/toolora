import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ToolActionsProps {
  children: ReactNode;
  /** Optional right-aligned controls (e.g. indentation selector or Reset button). */
  trailing?: ReactNode;
  className?: string;
}

/**
 * Consistent action bar placed between input and output panels.
 */
export function ToolActions({ children, trailing, className }: ToolActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-3 shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">{children}</div>
      {trailing ? <div className="flex flex-wrap items-center gap-2">{trailing}</div> : null}
    </div>
  );
}

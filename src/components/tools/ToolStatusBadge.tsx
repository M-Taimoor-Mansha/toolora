import type { ToolStatus } from "@/data/types";
import { cn } from "@/lib/cn";

/**
 * Honest status indicator: only shows "Available" once a tool is actually
 * implemented. Registered placeholders always read "Coming soon".
 */
export function ToolStatusBadge({ status, className }: { status: ToolStatus; className?: string }) {
  const live = status === "live";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1",
        live
          ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/25 dark:text-emerald-300"
          : "bg-amber-500/10 text-amber-700 ring-amber-500/25 dark:text-amber-300",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {live ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        ) : null}
        <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", live ? "bg-emerald-500" : "bg-amber-500")} />
      </span>
      {live ? "Available" : "Coming soon"}
    </span>
  );
}

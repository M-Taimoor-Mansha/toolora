import { cn } from "@/lib/cn";

export interface TextStatItem {
  label: string;
  value: string;
  hint?: string;
  /** Highlights this stat with the brand accent. */
  primary?: boolean;
}

interface TextStatsPanelProps {
  stats: TextStatItem[];
  /** Grid columns on large screens. */
  columns?: 4 | 6 | 8;
  note?: string;
}

const columnClasses: Record<4 | 6 | 8, string> = {
  4: "grid-cols-2 sm:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  8: "grid-cols-2 sm:grid-cols-4",
};

/**
 * Reusable grid of small statistic cards for the text counter tools.
 */
export function TextStatsPanel({ stats, columns = 4, note }: TextStatsPanelProps) {
  return (
    <section aria-label="Text statistics">
      <div className={cn("grid gap-2.5", columnClasses[columns])}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "rounded-2xl border bg-surface p-3 shadow-card",
              stat.primary ? "border-brand-500/40" : "border-line",
            )}
          >
            <p
              className={cn(
                "text-[10px] font-extrabold uppercase tracking-[0.08em]",
                stat.primary ? "text-brand-700 dark:text-brand-300" : "text-ink-3",
              )}
            >
              {stat.label}
            </p>
            <p className="mt-1 truncate font-mono text-lg font-extrabold tabular-nums text-ink">
              {stat.value}
            </p>
            {stat.hint ? (
              <p className="mt-0.5 truncate text-[11px] font-medium text-ink-3">{stat.hint}</p>
            ) : null}
          </div>
        ))}
      </div>
      {note ? (
        <p className="mt-3 text-xs leading-relaxed text-ink-3">{note}</p>
      ) : null}
    </section>
  );
}

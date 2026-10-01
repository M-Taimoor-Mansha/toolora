import Link from "next/link";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";
import { getCategoryBySlug, toolPath } from "@/lib/tools";
import { ToolStatusBadge } from "./ToolStatusBadge";

export function ToolCard({ tool }: { tool: Tool }) {
  const category = getCategoryBySlug(tool.category);

  return (
    <Link
      href={toolPath(tool)}
      className="card group flex flex-col p-5 transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-pop focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-700 transition-all duration-200 group-hover:scale-105 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-brand dark:text-brand-300">
          <Icon name={tool.icon} className="h-5 w-5" />
        </span>
        {tool.featured ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-ink-2">
            <Icon name="star" className="h-3 w-3 text-amber-500" />
            Featured
          </span>
        ) : null}
      </div>

      <h3 className="mt-4 text-[15px] font-bold tracking-tight text-ink">{tool.name}</h3>
      <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-2">
        {tool.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-3.5">
        {category ? (
          <span className="flex min-w-0 items-center gap-1.5 truncate text-xs font-semibold text-ink-3">
            <Icon name={category.icon} className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{category.name}</span>
          </span>
        ) : (
          <span />
        )}
        <ToolStatusBadge status={tool.status} />
      </div>
    </Link>
  );
}

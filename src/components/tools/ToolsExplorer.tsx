"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { Category, Tool } from "@/data/types";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Search } from "@/components/ui/Search";
import { ToolCard } from "./ToolCard";

interface ToolsExplorerProps {
  tools: Tool[];
  categories: Category[];
  /** Values coming from the URL (?q=, ?category= & ?show=popular). */
  initialQuery?: string;
  initialCategory?: string;
  initialPopularOnly?: boolean;
}

/**
 * Client-side search + category filter for the /tools page. Filtering runs
 * in memory today; the same logic lives in `lib/tools.ts` so a server-side
 * search can replace it later without UI changes.
 */
export function ToolsExplorer({
  tools,
  categories,
  initialQuery = "",
  initialCategory = "",
  initialPopularOnly = false,
}: ToolsExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [popularOnly, setPopularOnly] = useState(initialPopularOnly);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = !category || tool.category === category;
      const matchesPopular = !popularOnly || tool.popular;
      const matchesQuery =
        !q ||
        [tool.name, tool.description, ...tool.keywords].some((value) =>
          value.toLowerCase().includes(q),
        );
      return matchesCategory && matchesPopular && matchesQuery;
    });
  }, [tools, query, category, popularOnly]);

  const hasFilters = query.trim() !== "" || category !== "" || popularOnly;

  function clearAll() {
    setQuery("");
    setCategory("");
    setPopularOnly(false);
  }

  const countFor = (slug: string) => tools.filter((tool) => tool.category === slug).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-md">
          <Search
            value={query}
            onChange={setQuery}
            placeholder="Search tools… e.g. JSON, QR, counter"
            label="Search tools"
            size="lg"
          />
        </div>
        <p
          className="shrink-0 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] font-bold text-ink-2 shadow-sm"
          aria-live="polite"
        >
          {filtered.length} of {tools.length} tools
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <Chip
          active={!category && !popularOnly}
          onClick={() => {
            setCategory("");
            setPopularOnly(false);
          }}
        >
          All
        </Chip>
        <Chip
          active={popularOnly}
          onClick={() => setPopularOnly((value) => !value)}
          icon="flame"
        >
          Popular
        </Chip>
        <span aria-hidden="true" className="mx-1 hidden w-px self-stretch bg-line sm:block" />
        {categories.map((entry) => (
          <Chip
            key={entry.id}
            active={category === entry.slug}
            onClick={() => setCategory(category === entry.slug ? "" : entry.slug)}
          >
            {entry.name}
            <span className="rounded-full bg-black/5 px-1.5 py-0.5 text-[11px] font-extrabold tabular-nums dark:bg-white/10">
              {countFor(entry.slug)}
            </span>
          </Chip>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid animate-fade-up gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center shadow-card sm:p-12">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-ink-3">
            <Icon name="search" className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink">No tools found</h3>
          <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-ink-2">
            Nothing matches your search. Try a different keyword or clear the filters.
          </p>
          <Button variant="outline" size="sm" className="mt-5" onClick={clearAll}>
            Clear filters
          </Button>
        </div>
      )}

      {hasFilters && filtered.length > 0 ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={clearAll}
            className="text-sm font-bold text-ink-3 underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Chip({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon?: IconName;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 active:scale-[0.97]",
        active
          ? "border-brand-600 bg-brand-600 text-white shadow-brand"
          : "border-line bg-surface text-ink-2 shadow-sm hover:border-line-strong hover:text-ink",
      )}
    >
      {icon ? <Icon name={icon} className="h-3.5 w-3.5" /> : null}
      {children}
    </button>
  );
}

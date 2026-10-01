import Link from "next/link";
import type { ReactNode } from "react";
import type { Tool } from "@/data/types";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Icon } from "@/components/icons";
import { getCategoryBySlug, getRelatedTools, toolPath } from "@/lib/tools";
import { ToolStatusBadge } from "./ToolStatusBadge";

interface ToolLayoutProps {
  tool: Tool;
  /** The tool's interactive UI (or its coming-soon panel). */
  children: ReactNode;
}

/**
 * Standard page chrome for every tool: breadcrumbs, header with honest
 * status, content column, related-tools sidebar and a reserved ad slot.
 */
export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const category = getCategoryBySlug(tool.category);
  const related = getRelatedTools(tool, 5);

  return (
    <div className="container-x py-8 sm:py-12">
      <div className="animate-fade-in">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
            { label: tool.name },
          ]}
        />
      </div>

      <header className="mt-6 flex animate-fade-up flex-col gap-5 sm:flex-row sm:items-start">
        <span className="flex h-15 w-15 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-brand">
          <Icon name={tool.icon} className="h-7 w-7" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              {tool.name}
            </h1>
            <ToolStatusBadge status={tool.status} />
          </div>
          <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-ink-2 sm:text-base">
            {tool.description}
          </p>
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            {category ? (
              <Link
                href={`/categories/${category.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold text-ink-2 shadow-sm transition-all duration-150 hover:border-brand-500/40 hover:text-brand-700 dark:hover:text-brand-300"
              >
                <Icon name={category.icon} className="h-3.5 w-3.5" />
                {category.name}
              </Link>
            ) : null}
            {tool.keywords.slice(0, 3).map((keyword) => (
              <span
                key={keyword}
                className="hidden rounded-full bg-surface-2 px-3 py-1 font-mono text-[11px] font-medium text-ink-3 sm:inline-block"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-8 grid animate-fade-up gap-8 [animation-delay:120ms] lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">{children}</div>

        <aside className="min-w-0 space-y-6" aria-label="Related tools">
          {related.length > 0 ? (
            <div className="card p-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-bold tracking-tight text-ink">Related tools</h2>
                <Link
                  href={category ? `/categories/${category.slug}` : "/tools"}
                  className="text-xs font-bold text-brand-700 transition-colors hover:text-brand-600 dark:text-brand-300"
                >
                  View all
                </Link>
              </div>
              <ul className="mt-2.5 space-y-0.5">
                {related.map((relatedTool) => (
                  <li key={relatedTool.id}>
                    <Link
                      href={toolPath(relatedTool)}
                      className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-surface-2"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-ink-2 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                        <Icon name={relatedTool.icon} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">
                          {relatedTool.name}
                        </span>
                        {relatedTool.status === "coming-soon" ? (
                          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                            Coming soon
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            Available
                          </span>
                        )}
                      </span>
                      <Icon
                        name="chevronRight"
                        className="h-4 w-4 shrink-0 text-line-strong transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <AdPlaceholder format="rectangle" slot="toolora-tool-sidebar" />
        </aside>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { CategoryWithCount } from "@/data/types";
import { Icon } from "@/components/icons";

export function CategoryCard({ category }: { category: CategoryWithCount }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="card group flex items-center gap-4 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-pop focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-700 transition-all duration-200 group-hover:scale-105 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-brand dark:text-brand-300">
        <Icon name={category.icon} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold tracking-tight text-ink">
          {category.name}
        </span>
        <span className="mt-0.5 block text-xs font-medium text-ink-3">
          {category.toolCount} {category.toolCount === 1 ? "tool" : "tools"}
        </span>
      </span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink-3 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-brand-600 group-hover:text-white">
        <Icon name="arrowRight" className="h-4 w-4" />
      </span>
    </Link>
  );
}

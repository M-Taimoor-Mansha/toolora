import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CategoryCard } from "@/components/tools/CategoryCard";
import { ToolCard } from "@/components/tools/ToolCard";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import {
  getCategories,
  getCategoriesWithCounts,
  getToolsByCategory,
} from "@/lib/tools";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategories().find((entry) => entry.slug === slug);
  if (!category) {
    return { title: "Category not found" };
  }
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategories().find((entry) => entry.slug === slug);
  if (!category) {
    notFound();
  }

  const toolsInCategory = getToolsByCategory(slug);
  const otherCategories = getCategoriesWithCounts().filter((entry) => entry.slug !== slug);

  return (
    <main id="main" className="container-x py-8 sm:py-12">
      <div className="animate-fade-in">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} />
      </div>

      <header className="mt-6 flex animate-fade-up items-start gap-4 sm:gap-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-brand sm:h-15 sm:w-15">
          <Icon name={category.icon} className="h-7 w-7" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              {category.name}
            </h1>
            <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-extrabold text-ink-2 shadow-sm">
              {toolsInCategory.length} {toolsInCategory.length === 1 ? "tool" : "tools"}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-2 sm:text-base">
            {category.description}
          </p>
        </div>
      </header>

      {toolsInCategory.length > 0 ? (
        <div className="mt-8 grid animate-fade-up gap-4 [animation-delay:120ms] sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {toolsInCategory.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="mt-8 animate-fade-up rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center shadow-card [animation-delay:120ms] sm:p-12">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-ink-3">
            <Icon name="clock" className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-lg font-extrabold tracking-tight text-ink">
            Nothing here yet
          </h2>
          <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-ink-2">
            We have not published any {category.name.toLowerCase()} tools yet. This shelf
            is reserved for upcoming additions.
          </p>
          <ButtonLink href="/tools" variant="outline" size="sm" className="mt-5">
            Browse all tools
          </ButtonLink>
        </div>
      )}

      <AdPlaceholder format="banner" slot="toolora-category-content" className="mt-8" />

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Keep exploring</p>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight text-ink">
              Explore other categories
            </h2>
          </div>
          <Link
            href="/tools"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-brand-700 transition-colors hover:text-brand-600 sm:inline-flex dark:text-brand-300"
          >
            All tools
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {otherCategories.map((entry) => (
            <CategoryCard key={entry.id} category={entry} />
          ))}
        </div>
      </section>
    </main>
  );
}

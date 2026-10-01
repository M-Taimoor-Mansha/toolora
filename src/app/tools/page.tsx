import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ToolsExplorer } from "@/components/tools/ToolsExplorer";
import { getCategories, getAllTools, getCategoryBySlug } from "@/lib/tools";

interface ToolsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = {
  title: "All tools",
  description:
    "Browse every free online tool on Toolora: developer tools, text tools, calculators, converters, SEO tools and more.",
};

function firstValue(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const params = await searchParams;
  const query = firstValue(params.q);
  const rawCategory = firstValue(params.category);
  const initialCategory = getCategoryBySlug(rawCategory) ? rawCategory : "";
  const popularOnly = firstValue(params.show) === "popular";

  return (
    <main id="main" className="container-x py-8 sm:py-12">
      <div className="animate-fade-in">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />
      </div>
      <div className="mt-5 max-w-2xl animate-fade-up">
        <p className="eyebrow">{popularOnly ? "Most loved" : "Directory"}</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {popularOnly ? "Popular tools" : "All tools"}
        </h1>
        <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2 sm:text-base">
          {popularOnly
            ? "The tools people reach for most. Search or filter further — or clear the Popular filter to see everything."
            : "Every free tool on Toolora in one place. Search or filter by category — new tools are added regularly."}
        </p>
      </div>
      <div className="mt-8 animate-fade-up [animation-delay:120ms]">
        <ToolsExplorer
          key={`${query}|${initialCategory}|${popularOnly}`}
          tools={getAllTools()}
          categories={getCategories()}
          initialQuery={query}
          initialCategory={initialCategory}
          initialPopularOnly={popularOnly}
        />
      </div>
    </main>
  );
}

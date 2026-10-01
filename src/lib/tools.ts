import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import type { Category, CategoryWithCount, Tool } from "@/data/types";

/** URL for a tool page. */
export function toolPath(tool: Tool): string {
  return `/tools/${tool.slug}`;
}

export function getAllTools(): Tool[] {
  return [...tools];
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((tool) => tool.category === categorySlug);
}

export function getCategories(): Category[] {
  return [...categories];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

/** Categories with their current tool counts, for cards and chips. */
export function getCategoriesWithCounts(): CategoryWithCount[] {
  return categories.map((category) => ({
    ...category,
    toolCount: tools.filter((tool) => tool.category === category.slug).length,
  }));
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((tool) => tool.featured);
}

export function getPopularTools(): Tool[] {
  return tools.filter((tool) => tool.popular);
}

/**
 * Case-insensitive search across name, description and keywords.
 * Kept client-compatible so the same logic can power UI filters.
 */
export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return tools;
  return tools.filter((tool) =>
    [tool.name, tool.description, ...tool.keywords].some((value) =>
      value.toLowerCase().includes(q),
    ),
  );
}

/** Same-category first (live tools prioritized), then popular tools — used by ToolLayout sidebar. */
export function getRelatedTools(tool: Tool, limit = 5): Tool[] {
  const sameCategory = tools
    .filter((candidate) => candidate.category === tool.category && candidate.id !== tool.id)
    .sort(
      (a, b) =>
        Number(b.status === "live") - Number(a.status === "live") ||
        Number(b.popular) - Number(a.popular),
    );
  const rest = tools
    .filter((candidate) => candidate.id !== tool.id && candidate.category !== tool.category)
    .sort(
      (a, b) =>
        Number(b.status === "live") - Number(a.status === "live") ||
        Number(b.popular) - Number(a.popular),
    );
  return [...sameCategory, ...rest].slice(0, limit);
}

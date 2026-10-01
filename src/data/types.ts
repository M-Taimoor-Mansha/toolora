import type { IconName } from "@/components/icons";

/** Whether a tool is actually usable or a registered placeholder. */
export type ToolStatus = "live" | "coming-soon";

/**
 * A single entry in the tool registry.
 *
 * The UI derives everything from this shape, so adding a new tool means
 * adding one entry to `src/data/tools.ts` (and optionally a component in
 * `src/components/tools/registry.ts` once it is implemented).
 */
export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** Category slug — see `src/data/categories.ts`. */
  category: string;
  icon: IconName;
  /** Search/SEO keywords. */
  keywords: string[];
  featured: boolean;
  popular: boolean;
  status: ToolStatus;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: IconName;
}

/** Category enriched with how many tools currently belong to it. */
export interface CategoryWithCount extends Category {
  toolCount: number;
}

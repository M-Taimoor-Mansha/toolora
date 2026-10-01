import type { Category } from "./types";

/**
 * Tool categories. Adding a new category here (plus its icon) is all that is
 * required for it to appear in the header, footer, filters and category pages.
 */
export const categories: Category[] = [
  {
    id: "cat-developer",
    name: "Developer Tools",
    slug: "developer-tools",
    description:
      "Formatters, encoders, generators and utilities for engineers working in code.",
    icon: "code",
  },
  {
    id: "cat-text",
    name: "Text Tools",
    slug: "text-tools",
    description:
      "Counters, formatters and analyzers for essays, posts, captions and everything you write.",
    icon: "type",
  },
  {
    id: "cat-image",
    name: "Image Tools",
    slug: "image-tools",
    description:
      "Compress, resize and convert images right in the browser — files never leave your device.",
    icon: "image",
  },
  {
    id: "cat-pdf",
    name: "PDF Tools",
    slug: "pdf-tools",
    description:
      "Merge, split, convert and work with PDF documents without installing software.",
    icon: "file",
  },
  {
    id: "cat-calculators",
    name: "Calculators",
    slug: "calculators",
    description:
      "Everyday math, dates, percentages and finance — clear answers in seconds.",
    icon: "calculator",
  },
  {
    id: "cat-converters",
    name: "Converters",
    slug: "converters",
    description:
      "Units, number formats, encodings and data formats, converted instantly.",
    icon: "swap",
  },
  {
    id: "cat-seo",
    name: "SEO Tools",
    slug: "seo-tools",
    description:
      "Audit, rank and optimize content for search engines and social shares.",
    icon: "seo",
  },
  {
    id: "cat-generators",
    name: "Generators",
    slug: "generators",
    description:
      "QR codes, passwords, slugs and other things that just need to exist.",
    icon: "sparkles",
  },
];

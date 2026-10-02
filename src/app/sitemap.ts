import type { MetadataRoute } from "next";
import { getAllTools } from "@/lib/tools";
import { categories } from "@/data/categories";

const BASE_URL = "https://toolora.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools();

  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/tools`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/about`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/contact`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/privacy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
  }));

  const toolPages = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...categoryPages, ...toolPages];
}
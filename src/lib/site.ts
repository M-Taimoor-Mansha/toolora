/**
 * Central site configuration.
 *
 * This is the single place to rebrand the product: rename, change the
 * tagline, or swap the public origin without hunting through components.
 */
export const SITE = {
  name: "Toolora",
  tagline: "Free Online Tools for Everyone",
  description:
    "A fast, free and private collection of online tools for developers, students, writers, marketers, designers and everyone in between. No sign-up, no installs.",
  /**
   * Public origin used for absolute URLs (sitemap, open graph, canonical).
   * Update once the real domain is live.
   */
  url: "https://toolora.example.com",
  /** localStorage key used to persist the theme preference. */
  themeStorageKey: "toolora-theme",
} as const;

export type SiteConfig = typeof SITE;

import type { ToolContent } from "./types";

export const slugGeneratorContent: ToolContent = {
  intro:
    "The Toolora Slug Generator is a free online tool that converts any text into a clean, URL-friendly slug. It handles spaces, punctuation, accented characters, and repeated separators, producing SEO-optimized slugs perfect for blog posts, product URLs, and page titles. All processing happens locally in your browser.",

  howTo: {
    title: "How to Use the Slug Generator",
    steps: [
      "Paste or type your title or phrase into the text box above.",
      "The slug is generated instantly — lowercase, hyphenated, and URL-safe.",
      "Use Copy to copy the slug, or Reset to start over.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Converts spaces to hyphens",
      "Removes or transliterates punctuation and special characters",
      "Converts accented characters (e.g., é → e)",
      "Removes leading/trailing separators",
      "Collapses repeated separators",
      "100% free — no sign-up",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is a slug?",
        answer:
          "A slug is the URL-friendly version of a title or phrase. For example, 'Best Online Tools For Developers' becomes 'best-online-tools-for-developers'.",
      },
      {
        question: "Does it handle accented characters?",
        answer:
          "Yes. Accented characters are transliterated: 'Café' becomes 'cafe', 'naïve' becomes 'naive'.",
      },
      {
        question: "Why lowercase?",
        answer:
          "Lowercase slugs are the SEO standard and avoid duplicate-content issues from case sensitivity.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Slug Best Practices",
    items: [
      "Keep slugs short — 3-5 words is ideal",
      "Use hyphens, not underscores (Google prefers hyphens)",
      "Avoid stop words like 'a', 'the', 'and'",
      "Include your main keyword",
      "Never change a slug after publishing (it breaks links)",
    ],
  },
};
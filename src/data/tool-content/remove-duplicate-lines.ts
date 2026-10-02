import type { ToolContent } from "./types";

export const removeDuplicateLinesContent: ToolContent = {
  intro:
    "The Toolora Remove Duplicate Lines tool is a free online utility that instantly removes duplicate lines from any text while preserving the original order. Perfect for cleaning up lists, logs, email addresses, or any text with repeated entries. All processing happens locally in your browser, so your data never leaves your device.",

  howTo: {
    title: "How to Use Remove Duplicate Lines",
    steps: [
      "Paste or type your text into the text box above — one entry per line.",
      "Choose case-sensitive or case-insensitive comparison mode.",
      "Click Remove Duplicates to generate the cleaned text.",
      "See original line count, resulting line count, and duplicates removed.",
      "Use Copy to copy the result, or Reset to start over.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Removes exact duplicate lines while preserving first occurrence",
      "Preserves original line order",
      "Optional case-sensitive / case-insensitive mode",
      "Shows original, resulting, and removed line counts",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Does it preserve the order of lines?",
        answer:
          "Yes. The first occurrence of each line is kept, and the original order is preserved exactly.",
      },
      {
        question: "What's the difference between case-sensitive and case-insensitive?",
        answer:
          "Case-sensitive treats 'Apple' and 'apple' as different lines. Case-insensitive treats them as the same and removes one.",
      },
      {
        question: "Does it remove blank lines?",
        answer:
          "Blank lines are treated as regular lines. If you have multiple blank lines, only the first is kept.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Common Use Cases",
    items: [
      "Cleaning up email lists before a newsletter",
      "Removing duplicate URLs from sitemaps",
      "Deduplicating log files",
      "Cleaning up keyword lists for SEO",
      "Removing repeated entries from CSV exports",
    ],
  },
};
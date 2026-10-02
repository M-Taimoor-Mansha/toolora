import type { ToolContent } from "./types";

export const removeExtraSpacesContent: ToolContent = {
  intro:
    "The Toolora Remove Extra Spaces tool is a free online utility that cleans up unnecessary whitespace from your text. It removes repeated spaces, tabs, and trailing/leading whitespace while preserving your paragraph structure. Perfect for cleaning up text copied from PDFs, Word documents, or the web.",

  howTo: {
    title: "How to Use Remove Extra Spaces",
    steps: [
      "Paste or type your text into the text box above.",
      "Click Clean Text to remove extra spaces, tabs, and trailing/leading whitespace.",
      "Review the before/after comparison.",
      "Use Copy to copy the cleaned text, or Reset to start over.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Removes repeated spaces between words",
      "Removes tabs and mixed whitespace",
      "Trims leading/trailing whitespace on each line",
      "Preserves meaningful paragraph structure",
      "Shows before/after character counts",
      "100% free — no sign-up",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Does it remove line breaks?",
        answer:
          "No. Line breaks are preserved. Only unnecessary spaces, tabs, and whitespace within lines are cleaned up.",
      },
      {
        question: "Will it remove paragraph breaks?",
        answer:
          "No. Blank lines between paragraphs are preserved. Only excessive whitespace within lines is removed.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
      {
        question: "Does it store my text?",
        answer:
          "No. All processing happens locally in your browser. Your text never leaves your device.",
      },
    ],
  },

  tips: {
    title: "Common Use Cases",
    items: [
      "Cleaning text copied from PDF documents",
      "Formatting text pasted from Word or Google Docs",
      "Preparing text for word counters or character counters",
      "Cleaning up HTML or code snippets",
      "Formatting content for social media posts",
    ],
  },
};
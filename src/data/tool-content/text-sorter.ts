import type { ToolContent } from "./types";

export const textSorterContent: ToolContent = {
  intro:
    "The Toolora Text Sorter is a free online tool that sorts lines of text alphabetically (A-Z or Z-A) or numerically (ascending or descending). With optional trim and remove duplicates, it's perfect for organizing lists, rankings, or any dataset. All processing happens locally in your browser.",

  howTo: {
    title: "How to Use the Text Sorter",
    steps: [
      "Paste or type your text into the text box above — one entry per line.",
      "Choose a sorting mode: A-Z, Z-A, Numeric Ascending, or Numeric Descending.",
      "Optionally enable 'Trim lines' to remove leading/trailing whitespace.",
      "Optionally enable 'Remove duplicates' to remove repeated entries.",
      "Click Sort to generate the sorted output, then Copy or Reset.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Four sorting modes: A-Z, Z-A, Numeric Asc, Numeric Desc",
      "Optional trim lines",
      "Optional remove duplicates",
      "Preserves original casing",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Does it sort by Unicode or locale?",
        answer:
          "It uses standard JavaScript locale-aware string comparison, which handles accented characters and most languages correctly.",
      },
      {
        question: "What happens to empty lines when sorting?",
        answer:
          "Empty lines are sorted to the beginning of the list (they come first alphabetically). You can use Trim or Remove Duplicates to handle them.",
      },
      {
        question: "Can I sort numbers?",
        answer:
          "Yes. Use Numeric Ascending or Numeric Descending to sort numeric values correctly (e.g., 2 comes before 10).",
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
      "Alphabetizing name lists",
      "Sorting numeric data (prices, scores, IDs)",
      "Organizing keyword lists for SEO",
      "Ranking items by value",
      "Preparing data for CSV or spreadsheet import",
    ],
  },
};
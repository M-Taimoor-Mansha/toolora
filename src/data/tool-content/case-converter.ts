import type { ToolContent } from "./types";

export const caseConverterContent: ToolContent = {
  intro:
    "The Toolora Case Converter is a free online tool that instantly converts text between UPPERCASE, lowercase, Title Case, Sentence case, and inverted case. Perfect for writers, editors, designers, and anyone who needs to quickly fix text capitalization. All processing happens locally in your browser, keeping your text completely private.",

  howTo: {
    title: "How to Use the Case Converter",
    steps: [
      "Paste or type your text into the text box above.",
      "Choose one of the conversion modes: UPPERCASE, lowercase, Title Case, Sentence case, or Inverted.",
      "See the converted text instantly in the output area.",
      "Use Copy to copy the result, or Reset to start over.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Five conversion modes: UPPER, lower, Title, Sentence, Invert",
      "Instant conversion as you type",
      "Works with any language, including accented characters",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
      "Works on mobile, tablet, and desktop",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is Title Case?",
        answer:
          "Title Case capitalizes the first letter of every word (e.g., 'The Quick Brown Fox'). It's commonly used for book titles, headlines, and headings.",
      },
      {
        question: "What is Sentence case?",
        answer:
          "Sentence case capitalizes only the first letter of each sentence and proper nouns (e.g., 'The quick brown fox. It jumps high.'). It's the standard case for normal writing.",
      },
      {
        question: "What is Inverted case?",
        answer:
          "Inverted case swaps the case of every character — uppercase becomes lowercase and vice versa (e.g., 'Hello World' → 'hELLO wORLD').",
      },
      {
        question: "Is the Case Converter free?",
        answer: "Yes, completely free with no sign-up required.",
      },
      {
        question: "Does the tool store my text?",
        answer:
          "No. Everything runs locally in your browser. Your text never leaves your device.",
      },
    ],
  },

  tips: {
    title: "When to Use Each Case",
    items: [
      "UPPERCASE: Acronyms, warnings, or emphasis",
      "lowercase: Casual writing or stylized branding",
      "Title Case: Headlines, book titles, and headings",
      "Sentence case: Standard writing and body text",
      "Inverted: Creative effects or stylistic choices",
    ],
  },
};
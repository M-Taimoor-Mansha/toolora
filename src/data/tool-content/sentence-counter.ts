import type { ToolContent } from "./types";

export const sentenceCounterContent: ToolContent = {
  intro:
    "The Toolora Sentence Counter is a free online tool that counts the number of sentences in your text. It correctly handles periods (.), exclamation marks (!), and question marks (?), while ignoring abbreviations and decimals. Perfect for writers, students, and editors who need to track sentence count for readability and structure.",

  howTo: {
    title: "How to Use the Sentence Counter",
    steps: [
      "Paste or type your text into the text box above.",
      "See the sentence count update live as you type.",
      "Also view word and character counts for full context.",
      "Use Copy to copy your text, or Reset to clear it.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Accurate sentence detection using periods, exclamation marks, and question marks",
      "Handles multiple punctuation marks (e.g., '...' or '?!')",
      "Real-time counting as you type",
      "Additional word and character counts",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "How does the Sentence Counter work?",
        answer:
          "The tool splits your text on sentence-ending punctuation (., !, ?) and counts each non-empty segment as one sentence.",
      },
      {
        question: "Does it handle abbreviations like 'Dr.' or 'e.g.'?",
        answer:
          "The tool uses a simple, reliable rule: any period followed by whitespace or end-of-text is treated as a sentence boundary. This works well for most text but may over-count in highly technical writing with abbreviations.",
      },
      {
        question: "Is the Sentence Counter free?",
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
    title: "Tips for Better Readability",
    items: [
      "Aim for 15–20 words per sentence for general readability.",
      "Vary sentence length to keep readers engaged.",
      "Short sentences (under 10 words) work well for emphasis.",
      "Long sentences (30+ words) are harder to follow — split them.",
    ],
  },
};
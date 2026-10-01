import type { ToolContent } from "./types";

export const paragraphCounterContent: ToolContent = {
  intro:
    "The Toolora Paragraph Counter is a free online tool that counts the number of meaningful paragraphs in your text. Paragraphs are detected by blank lines between blocks of text, ignoring empty lines. Ideal for writers, students, and content creators who need to structure their writing and track paragraph counts.",

  howTo: {
    title: "How to Use the Paragraph Counter",
    steps: [
      "Paste or type your text into the text box above.",
      "The paragraph count updates live as you type.",
      "Also view word and character counts for full context.",
      "Use Copy to copy your text, or Reset to clear it.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Accurate paragraph detection using blank lines",
      "Ignores empty lines and trailing whitespace",
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
        question: "How does the Paragraph Counter detect paragraphs?",
        answer:
          "The tool splits your text on blank lines (two or more consecutive newlines) and counts each non-empty block as one paragraph.",
      },
      {
        question: "Does an empty line count as a paragraph?",
        answer:
          "No. Empty lines are treated as separators, not paragraphs. Only blocks with actual text are counted.",
      },
      {
        question: "Is the Paragraph Counter free?",
        answer: "Yes, completely free with no sign-up required.",
      },
      {
        question: "Does the tool store my text?",
        answer:
          "No. All processing happens locally in your browser. Your text never leaves your device.",
      },
    ],
  },

  tips: {
    title: "Tips for Paragraph Structure",
    items: [
      "Aim for 3–5 sentences per paragraph for readability.",
      "Use short paragraphs for web content (1–3 sentences).",
      "Long paragraphs (7+ sentences) can overwhelm readers.",
      "Start a new paragraph for each new idea.",
    ],
  },
};
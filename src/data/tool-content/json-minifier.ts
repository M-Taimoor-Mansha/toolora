import type { ToolContent } from "./types";

export const jsonMinifierContent: ToolContent = {
  intro:
    "The Toolora JSON Minifier is a free online tool that compresses JSON by removing all unnecessary whitespace, newlines, and indentation. This reduces file size, making it ideal for production APIs, embedded configuration, and network transfer. All processing happens locally in your browser.",

  howTo: {
    title: "How to Use the JSON Minifier",
    steps: [
      "Paste your JSON into the input box above.",
      "Click Minify to compress the JSON.",
      "See the size reduction — original vs minified byte count.",
      "Use Copy to copy the minified JSON, or Reset to start over.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Removes all unnecessary whitespace and newlines",
      "Shows size reduction (original vs minified)",
      "Preserves JSON structure and data integrity",
      "Fast and accurate",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What does minifying do?",
        answer:
          "Minifying removes all unnecessary whitespace — spaces, tabs, and newlines — from JSON. The result is functionally identical but much smaller in size.",
      },
      {
        question: "Will minifying break my JSON?",
        answer:
          "No. Minification only removes insignificant whitespace. The data structure and values remain exactly the same.",
      },
      {
        question: "How much smaller will my JSON be?",
        answer:
          "Typically 30–70% smaller, depending on how much whitespace the original had.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "When to Minify JSON",
    items: [
      "Production API responses (smaller payloads)",
      "Embedded configuration files",
      "Data transfer over slow networks",
      "Storing JSON in databases",
      "Never minify during development — keep it readable",
    ],
  },
};
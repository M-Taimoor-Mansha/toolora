import type { ToolContent } from "./types";

export const jsonFormatterContent: ToolContent = {
  intro:
    "The Toolora JSON Formatter is a free online tool that instantly formats, beautifies, and validates JSON data. Paste messy, minified, or malformed JSON and get clean, properly indented output. Perfect for developers debugging API responses, reviewing configuration files, or preparing JSON for documentation. All processing happens locally in your browser, so your data stays completely private.",

  howTo: {
    title: "How to Use the JSON Formatter",
    steps: [
      "Paste your JSON into the input box above.",
      "Choose your preferred indentation (2 spaces, 4 spaces, or tab).",
      "Click Format to beautify the JSON.",
      "If the JSON is invalid, an error message will show the exact location.",
      "Use Copy to copy the formatted output, or Reset to start over.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Beautifies minified or messy JSON instantly",
      "Validates JSON and shows precise error locations",
      "Custom indentation: 2 spaces, 4 spaces, or tab",
      "Handles large JSON files",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is JSON?",
        answer:
          "JSON (JavaScript Object Notation) is a lightweight data format used for storing and exchanging data. It's human-readable and widely used in APIs and configuration files.",
      },
      {
        question: "Does the formatter validate JSON?",
        answer:
          "Yes. If your JSON is invalid, the tool will show an error message with the exact line and column of the problem.",
      },
      {
        question: "Is my data safe?",
        answer:
          "Yes. All processing happens locally in your browser. Your JSON never leaves your device.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
      {
        question: "Does it work with large files?",
        answer:
          "Yes, but very large files (several MB) may be slow depending on your device's memory.",
      },
    ],
  },

  tips: {
    title: "JSON Best Practices",
    items: [
      "Use 2-space indentation for most projects",
      "Always validate JSON before committing to version control",
      "Keep JSON readable — minify only for production",
      "Use meaningful key names (avoid abbreviations)",
      "Remember: JSON does not allow trailing commas",
    ],
  },
};
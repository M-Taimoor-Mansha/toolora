import type { ToolContent } from "./types";

export const jsonValidatorContent: ToolContent = {
  intro:
    "The Toolora JSON Validator is a free online tool that checks whether your JSON is syntactically valid. It shows the exact line and column of any error, making debugging fast and painless. Perfect for developers working with APIs, config files, or any JSON data. All processing happens locally in your browser.",

  howTo: {
    title: "How to Use the JSON Validator",
    steps: [
      "Paste your JSON into the input box above.",
      "Click Validate to check the JSON.",
      "If valid, you'll see a success message.",
      "If invalid, the error message will show the exact line and column.",
      "Use Copy to copy your JSON, or Reset to start over.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Instantly validates JSON syntax",
      "Shows precise error location (line and column)",
      "Clear, human-readable error messages",
      "Handles large JSON files",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What makes JSON invalid?",
        answer:
          "Common causes: trailing commas, unquoted keys, single quotes instead of double, missing commas, or unescaped special characters.",
      },
      {
        question: "Does it fix invalid JSON?",
        answer:
          "No, this tool only validates. Use the JSON Formatter if you want to beautify valid JSON.",
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
    ],
  },

  tips: {
    title: "Common JSON Errors",
    items: [
      "Trailing commas: {'a': 1,} is invalid — remove the last comma",
      "Single quotes: JSON requires double quotes for strings",
      "Unquoted keys: {'a': 1} is invalid — use {\"a\": 1}",
      "Comments: JSON does not support // or /* */ comments",
      "Special characters: escape quotes and backslashes with \\",
    ],
  },
};
import type { ToolContent } from "./types";

export const jsonToCsvContent: ToolContent = {
  intro:
    "The Toolora JSON to CSV Converter is a free online tool that converts JSON arrays into CSV (Comma-Separated Values) format instantly. Perfect for developers exporting API data, analysts preparing spreadsheets, or anyone moving data between systems. All conversion happens locally in your browser — your data never leaves your device.",

  howTo: {
    title: "How to Convert JSON to CSV",
    steps: [
      "Paste your JSON array into the input box.",
      "The tool auto-detects columns from your object keys.",
      "Choose options: delimiter, headers, and quoting.",
      "Preview the CSV output instantly.",
      "Copy the result or download it as a .csv file.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Convert JSON arrays to CSV instantly",
      "Auto-detect columns from object keys",
      "Custom delimiter (comma, semicolon, tab)",
      "Optional headers row",
      "Optional quoting for all fields",
      "Download CSV file or copy to clipboard",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What JSON format is supported?",
        answer:
          "The tool expects a JSON array of objects, e.g. [{\"name\": \"John\", \"age\": 30}, ...]. Each object becomes a row; object keys become columns.",
      },
      {
        question: "What if my objects have different keys?",
        answer:
          "The tool collects all unique keys from all objects. Objects missing a key will have an empty cell for that column.",
      },
      {
        question: "Does it handle nested objects?",
        answer:
          "Nested objects are stringified as JSON in the CSV cell. For complex data, consider flattening your JSON first.",
      },
      {
        question: "Is my data sent to a server?",
        answer:
          "No. All conversion happens locally in your browser. Your data never leaves your device.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "JSON to CSV Tips",
    items: [
      "Use comma delimiter for Excel and Google Sheets",
      "Use semicolon for European Excel (where comma is decimal separator)",
      "Enable quoting if your data contains commas or special characters",
      "For large datasets (10K+ rows), expect a brief processing delay",
      "Nested objects should be flattened for cleaner CSV output",
    ],
  },
};
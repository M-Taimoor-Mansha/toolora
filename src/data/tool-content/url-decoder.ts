import type { ToolContent } from "./types";

export const urlDecoderContent: ToolContent = {
  intro:
    "The Toolora URL Decoder is a free online tool that converts percent-encoded URLs back to their original, human-readable form. Perfect for debugging API calls, inspecting query strings, or understanding encoded links. All processing happens locally in your browser, so your data stays completely private.",

  howTo: {
    title: "How to Use the URL Decoder",
    steps: [
      "Paste your encoded URL or text into the input box above.",
      "Click Decode to convert it back to readable text.",
      "See the decoded output instantly.",
      "Use Copy to copy the result, or Reset to start over.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Decodes percent-encoded URLs and strings",
      "Handles Unicode, emoji, and non-Latin scripts",
      "Clear error messages for invalid input",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
      "Works on mobile, tablet, and desktop",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What does URL decoding do?",
        answer:
          "It converts percent-encoded characters back to their original form. For example, %20 becomes a space, %26 becomes &.",
      },
      {
        question: "What if my encoded URL has errors?",
        answer:
          "The tool will show an error message if it encounters an invalid percent-encoding sequence (e.g., %ZZ or incomplete %2).",
      },
      {
        question: "Is my data safe?",
        answer:
          "Yes. All processing happens locally in your browser. Your data never leaves your device.",
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
      "Debugging API query parameters",
      "Inspecting tracking URLs and UTM codes",
      "Reading encoded email links",
      "Understanding Google Search Console URLs",
      "Decoding OAuth callback parameters",
    ],
  },
};
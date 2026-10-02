import type { ToolContent } from "./types";

export const base64DecoderContent: ToolContent = {
  intro:
    "The Toolora Base64 Decoder is a free online tool that converts Base64-encoded text back to its original plain-text form. Perfect for decoding API tokens, data URIs, authentication headers, and any Base64-encoded content. All processing happens locally in your browser, keeping your data completely private.",

  howTo: {
    title: "How to Use the Base64 Decoder",
    steps: [
      "Paste your Base64-encoded text into the input box above.",
      "Click Decode to convert it back to plain text.",
      "The decoded output appears instantly.",
      "Use Copy to copy the result, or Reset to start over.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Instantly decodes Base64 to plain text",
      "Handles UTF-8 (accents, emoji, and non-Latin scripts)",
      "Clear error messages for invalid Base64",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
      "Works on mobile, tablet, and desktop",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What if my Base64 is invalid?",
        answer:
          "The tool will show an error message. Common causes: missing padding, invalid characters, or truncated input.",
      },
      {
        question: "Can I decode Base64 URLs?",
        answer:
          "Yes. Base64-URL uses '-' and '_' instead of '+' and '/'. The decoder handles both standard and URL-safe Base64.",
      },
      {
        question: "Does it handle multi-line Base64?",
        answer:
          "Yes. Whitespace and newlines are ignored during decoding.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Where You'll See Base64",
    items: [
      "JWT tokens (header and payload sections)",
      "Data URI images (data:image/png;base64,...)",
      "HTTP Basic Authentication headers",
      "Email attachments (MIME encoded)",
      "Kubernetes secrets and config maps",
    ],
  },
};
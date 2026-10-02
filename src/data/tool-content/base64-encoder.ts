import type { ToolContent } from "./types";

export const base64EncoderContent: ToolContent = {
  intro:
    "The Toolora Base64 Encoder is a free online tool that converts plain text into Base64-encoded format. Base64 is commonly used for embedding binary data in text-based formats (like JSON, XML, and HTML), encoding authentication credentials, and safely transmitting data. All processing happens locally in your browser.",

  howTo: {
    title: "How to Use the Base64 Encoder",
    steps: [
      "Paste or type your text into the input box above.",
      "Click Encode to convert it to Base64.",
      "The Base64 output appears instantly.",
      "Use Copy to copy the result, or Reset to start over.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Instantly converts text to Base64",
      "Handles UTF-8 (accents, emoji, and non-Latin scripts)",
      "Works with any text length",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
      "Works on mobile, tablet, and desktop",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is Base64?",
        answer:
          "Base64 is a binary-to-text encoding scheme that represents binary data using 64 printable ASCII characters. It's used to safely transmit data through text-only channels.",
      },
      {
        question: "Is Base64 encryption?",
        answer:
          "No. Base64 is encoding, not encryption. Anyone can decode it. Do not use it for sensitive data without additional encryption.",
      },
      {
        question: "Does it handle emoji and non-English text?",
        answer:
          "Yes. The tool uses UTF-8 encoding, so emoji and all languages are supported.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Common Uses of Base64",
    items: [
      "Embedding images in HTML/CSS (data URIs)",
      "Encoding API authentication headers",
      "Transmitting binary data in JSON",
      "Storing small binary data in databases",
      "Email attachments (MIME encoding)",
    ],
  },
};
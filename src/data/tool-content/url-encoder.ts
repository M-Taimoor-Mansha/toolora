import type { ToolContent } from "./types";

export const urlEncoderContent: ToolContent = {
  intro:
    "The Toolora URL Encoder is a free online tool that safely encodes special characters in URLs and query strings. It converts characters like spaces, ampersands, and question marks into percent-encoded format, ensuring your URLs work correctly across all browsers and servers. Perfect for developers, marketers, and anyone working with web links. All processing happens locally in your browser.",

  howTo: {
    title: "How to Use the URL Encoder",
    steps: [
      "Paste or type your URL or text into the input box above.",
      "Choose an encoding mode: Component (for query values) or Full URL.",
      "Click Encode to convert it to percent-encoded format.",
      "Use Copy to copy the result, or Reset to start over.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Encodes all reserved URL characters safely",
      "Two modes: Component (encodeURIComponent) and Full URL (encodeURI)",
      "Handles Unicode, emoji, and non-Latin scripts",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
      "Works on mobile, tablet, and desktop",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is URL encoding?",
        answer:
          "URL encoding (percent-encoding) converts special characters into a format that's safe to include in URLs. For example, a space becomes %20.",
      },
      {
        question: "What's the difference between Component and Full URL modes?",
        answer:
          "Component mode (encodeURIComponent) encodes all reserved characters — use it for query parameter values. Full URL mode (encodeURI) preserves URL structure characters like ://?&= — use it for complete URLs.",
      },
      {
        question: "Does it handle emoji?",
        answer:
          "Yes. All non-ASCII characters, including emoji, are correctly encoded.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "When to Use URL Encoding",
    items: [
      "Encoding search queries for API calls",
      "Building URLs with dynamic query parameters",
      "Sending form data via GET requests",
      "Embedding user-generated content in URLs",
      "Internationalizing URLs with non-Latin characters",
    ],
  },
};
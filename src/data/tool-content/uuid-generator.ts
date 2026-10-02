import type { ToolContent } from "./types";

export const uuidGeneratorContent: ToolContent = {
  intro:
    "The Toolora UUID Generator is a free online tool that creates random, RFC 4122-compliant Universally Unique Identifiers (UUIDs). Perfect for developers who need unique IDs for databases, APIs, session tokens, or distributed systems. Generate v4 (random) UUIDs instantly — all processing happens locally in your browser.",

  howTo: {
    title: "How to Use the UUID Generator",
    steps: [
      "Choose how many UUIDs you want (1, 5, 10, 25, 50, or 100).",
      "Choose case: lowercase or uppercase.",
      "Click Generate to create new UUIDs.",
      "Use Copy to copy all UUIDs, or Copy next to each one individually.",
      "Click Generate again to create a fresh batch.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Generates RFC 4122 version 4 (random) UUIDs",
      "Batch generation: 1 to 100 UUIDs at once",
      "Lowercase or uppercase output",
      "Uses cryptographically secure randomness",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is a UUID?",
        answer:
          "A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems. Format: 8-4-4-4-12 hex digits (e.g., 550e8400-e29b-41d4-a716-446655440000).",
      },
      {
        question: "Are UUIDs really unique?",
        answer:
          "Yes. The probability of generating two identical v4 UUIDs is astronomically low — you'd need to generate billions per second for decades to have a realistic chance of a collision.",
      },
      {
        question: "Are these UUIDs cryptographically secure?",
        answer:
          "Yes. The tool uses crypto.getRandomValues() when available, which is cryptographically secure. Fallback uses Math.random() for older browsers.",
      },
      {
        question: "Can I use these UUIDs in production?",
        answer:
          "Yes. RFC 4122 v4 UUIDs are widely used in production systems, databases, and APIs.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "UUID Best Practices",
    items: [
      "Use UUIDs for distributed systems — no central coordination needed",
      "v4 (random) is best for privacy (v1 leaks MAC address)",
      "Store UUIDs as BINARY(16) in MySQL for efficiency",
      "Use UUIDs as primary keys in databases that support them",
      "Never expose sequential IDs in public APIs — use UUIDs instead",
    ],
  },
};
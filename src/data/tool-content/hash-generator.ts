import type { ToolContent } from "./types";

export const hashGeneratorContent: ToolContent = {
  intro:
    "The Toolora Hash Generator is a free online tool that computes cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) of any text instantly. Perfect for developers verifying data integrity, generating checksums, storing password hashes, or debugging authentication flows. All hashing happens locally in your browser using the Web Crypto API — your input never leaves your device.",

  howTo: {
    title: "How to Generate a Hash",
    steps: [
      "Type or paste your text into the input box.",
      "All four hashes (MD5, SHA-1, SHA-256, SHA-512) are computed automatically.",
      "Compare hashes or verify against an expected value.",
      "Use Copy to copy any hash to your clipboard.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes",
      "Real-time computation as you type",
      "Standard hexadecimal output",
      "Works with any text including Unicode and emoji",
      "100% local — input never leaves your browser",
      "Free, no sign-up, no limits",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is a hash function?",
        answer:
          "A hash function converts input data into a fixed-size string of characters. It's a one-way function — you can't reverse a hash to get the original data. Hashes are used for data integrity, password storage, and digital signatures.",
      },
      {
        question: "Which hash should I use?",
        answer:
          "For security, use SHA-256 or SHA-512. MD5 and SHA-1 are considered broken for cryptographic use — only use them for non-security purposes like checksums. For passwords, use bcrypt, scrypt, or Argon2 instead of raw hashes.",
      },
      {
        question: "Is my text sent to a server?",
        answer:
          "No. All hashing happens locally in your browser using the Web Crypto API. Your input never leaves your device.",
      },
      {
        question: "Can I reverse a hash?",
        answer:
          "No. Hash functions are one-way. You can't recover the original input from a hash. Attackers sometimes use 'rainbow tables' to look up common hashes, but strong hashes with salt are not reversible.",
      },
      {
        question: "Is this tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Hash Use Cases",
    items: [
      "Verify file integrity after download (SHA-256 checksum)",
      "Generate unique IDs from content",
      "Store password hashes (use bcrypt/argon2, not raw SHA)",
      "Create cache keys for API responses",
      "Verify data hasn't been tampered with",
    ],
  },
};
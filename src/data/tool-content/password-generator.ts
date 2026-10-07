import type { ToolContent } from "./types";

export const passwordGeneratorContent: ToolContent = {
  intro:
    "The Toolora Password Generator is a free online tool that creates strong, random, and secure passwords instantly. Choose your length, character types, and complexity to generate passwords that protect your accounts. All generation happens locally in your browser — your passwords are never sent to any server, logged, or stored.",

  howTo: {
    title: "How to Generate a Strong Password",
    steps: [
      "Choose your desired password length (8 to 128 characters).",
      "Select character types: uppercase, lowercase, numbers, symbols.",
      "Optionally exclude similar characters (like l, 1, O, 0).",
      "Click Generate to create a new password.",
      "Use Copy to copy it, or Generate again for a new one.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Cryptographically secure randomness (Web Crypto API)",
      "Adjustable length: 8 to 128 characters",
      "Custom character sets (uppercase, lowercase, numbers, symbols)",
      "Exclude similar or ambiguous characters",
      "Bulk generation: create up to 50 passwords at once",
      "100% free, no sign-up, privacy-first",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Are these passwords truly random?",
        answer:
          "Yes. The generator uses the Web Crypto API (crypto.getRandomValues), which is cryptographically secure and suitable for passwords.",
      },
      {
        question: "Are my passwords stored or sent anywhere?",
        answer:
          "No. Everything happens locally in your browser. Your passwords never leave your device, and we have no way to see them.",
      },
      {
        question: "What makes a strong password?",
        answer:
          "A strong password is at least 12–16 characters long, includes a mix of uppercase, lowercase, numbers, and symbols, and is not based on a dictionary word or personal info.",
      },
      {
        question: "How often should I change my password?",
        answer:
          "Change passwords immediately if a service reports a breach. Otherwise, using unique strong passwords per account is more important than frequent rotation.",
      },
      {
        question: "Is this tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Password Security Tips",
    items: [
      "Use a unique password for every account",
      "Aim for at least 16 characters for sensitive accounts",
      "Use a password manager to store passwords securely",
      "Enable two-factor authentication (2FA) where possible",
      "Never share passwords over email or chat",
    ],
  },
};
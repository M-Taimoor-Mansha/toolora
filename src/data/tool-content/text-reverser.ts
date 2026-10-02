import type { ToolContent } from "./types";

export const textReverserContent: ToolContent = {
  intro:
    "The Toolora Text Reverser is a free online tool that reverses text in three ways: reverse the entire text, reverse each line, or reverse the word order. Perfect for puzzles, creative writing, testing palindromes, or just having fun with text. All processing happens locally in your browser.",

  howTo: {
    title: "How to Use the Text Reverser",
    steps: [
      "Paste or type your text into the text box above.",
      "Choose a mode: Reverse entire text, Reverse each line, or Reverse word order.",
      "See the reversed output instantly.",
      "Use Copy to copy the result, or Reset to start over.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Three reversal modes: entire text, each line, word order",
      "Handles Unicode characters correctly (emoji, accents, etc.)",
      "Preserves line breaks in 'each line' mode",
      "Real-time output",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What's the difference between the three modes?",
        answer:
          "'Entire text' reverses every character in the whole text. 'Each line' reverses characters within each line but keeps line order. 'Word order' keeps words intact but reverses their sequence.",
      },
      {
        question: "Does it handle emoji correctly?",
        answer:
          "Yes. The tool uses Unicode-aware reversal, so emojis and accented characters are preserved correctly.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
      {
        question: "Can I use it for palindrome testing?",
        answer:
          "Yes! Reverse your text and compare — if it matches the original, it's a palindrome.",
      },
    ],
  },

  tips: {
    title: "Common Use Cases",
    items: [
      "Testing palindromes",
      "Creating word puzzles and games",
      "Creative writing and poetry",
      "Reversing text for stylized social media posts",
      "Debugging string manipulation code",
    ],
  },
};
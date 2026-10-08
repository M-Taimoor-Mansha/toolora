import type { ToolContent } from "./types";

export const numberToWordsContent: ToolContent = {
  intro:
    "The Toolora Number to Words converter is a free online tool that converts numbers into written English words. Perfect for writing cheques, invoices, legal documents, or any situation where you need numbers spelled out. Enter any number and get the words instantly — with optional currency mode. All conversion happens locally in your browser.",

  howTo: {
    title: "How to Use Number to Words",
    steps: [
      "Type or paste a number into the input box.",
      "The number is converted to words instantly.",
      "Optionally choose a currency format (USD, PKR, EUR, GBP).",
      "Use Copy to copy the result to your clipboard.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Convert any number to words (up to trillions)",
      "Handles decimals (e.g. 123.45 → 'one hundred twenty-three and 45/100')",
      "Negative numbers supported",
      "Optional currency format (USD, PKR, EUR, GBP)",
      "100% free, private, runs in your browser",
      "Perfect for cheques, invoices, legal documents",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "How do I write a number for a cheque?",
        answer:
          "For cheques, use the currency mode. Example: 1234.56 USD → 'one thousand two hundred thirty-four dollars and fifty-six cents'. The tool handles this format automatically.",
      },
      {
        question: "What's the largest number supported?",
        answer:
          "The tool supports numbers up to 999 trillion (999,999,999,999,999). For larger numbers, results may become imprecise due to JavaScript's number limits.",
      },
      {
        question: "Does it handle decimals?",
        answer:
          "Yes. Decimals are converted to 'X/100' format for two decimal places, or spelled out as 'point five six' if more precision is needed.",
      },
      {
        question: "Which currencies are supported?",
        answer:
          "Currently USD (dollars/cents), PKR (rupees/paisa), EUR (euros/cents), and GBP (pounds/pence). More currencies coming soon.",
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
      "Writing cheque amounts (USD, PKR, EUR, GBP)",
      "Invoice totals spelled out",
      "Legal contracts with monetary amounts",
      "Educational purposes (teaching place values)",
      "Accessibility — reading numbers for screen readers",
    ],
  },
};
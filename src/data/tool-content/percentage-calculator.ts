import type { ToolContent } from "./types";

export const percentageCalculatorContent: ToolContent = {
  intro:
    "The Toolora Percentage Calculator is a free online tool that solves all your percentage problems instantly. Calculate what X% of Y is, what percentage X is of Y, percentage increase or decrease, and more. Perfect for students, shoppers, finance professionals, and anyone working with numbers. All calculations run locally in your browser — nothing is stored or shared.",

  howTo: {
    title: "How to Use the Percentage Calculator",
    steps: [
      "Choose the calculation type: 'X% of Y', 'X is what % of Y', or '% increase/decrease'.",
      "Enter your numbers into the input fields.",
      "See the result instantly as you type.",
      "Use the reset button to clear and start over.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Multiple calculation modes in one tool",
      "Instant results as you type",
      "Percentage of a number (X% of Y)",
      "What percent (X is what % of Y)",
      "Percentage increase/decrease calculator",
      "100% free, no sign-up, privacy-first",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "How do I calculate X% of Y?",
        answer:
          "Multiply Y by X and divide by 100. For example, 15% of 200 = (15 × 200) ÷ 100 = 30.",
      },
      {
        question: "How do I find what percentage X is of Y?",
        answer:
          "Divide X by Y and multiply by 100. For example, 25 is what percent of 200? (25 ÷ 200) × 100 = 12.5%.",
      },
      {
        question: "How do I calculate percentage increase?",
        answer:
          "Subtract the original from the new value, divide by the original, and multiply by 100. For example, from 100 to 150: ((150 − 100) ÷ 100) × 100 = 50% increase.",
      },
      {
        question: "Is this tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
      {
        question: "Does it store my numbers?",
        answer:
          "No. All calculations happen locally in your browser. Nothing is sent to any server.",
      },
    ],
  },

  tips: {
    title: "Common Percentage Uses",
    items: [
      "Calculate discounts while shopping",
      "Compute tips at restaurants",
      "Figure out tax amounts",
      "Track investment gains or losses",
      "Calculate grade percentages in school",
    ],
  },
};
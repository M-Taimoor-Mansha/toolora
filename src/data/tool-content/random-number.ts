import type { ToolContent } from "./types";

export const randomNumberContent: ToolContent = {
  intro:
    "The Toolora Random Number Generator is a free online tool that generates truly random numbers within any range you specify. Perfect for lottery picks, dice rolls, statistical sampling, gaming, and testing. Generate single or multiple numbers, with or without duplicates, and sort them however you like. All generation happens locally in your browser using cryptographically secure randomness.",

  howTo: {
    title: "How to Generate Random Numbers",
    steps: [
      "Enter the minimum and maximum values of your range.",
      "Choose how many numbers to generate (1-100).",
      "Toggle 'Allow duplicates' on or off.",
      "Choose sorting: ascending, descending, or none.",
      "Click Generate — the numbers appear instantly.",
      "Use Copy to copy the results.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Generate 1-100 random numbers at once",
      "Custom min/max range",
      "Cryptographically secure randomness (Web Crypto API)",
      "Optional decimal support",
      "Allow or disallow duplicates",
      "Sort results ascending, descending, or leave unsorted",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Are the numbers truly random?",
        answer:
          "Yes. The generator uses the Web Crypto API (crypto.getRandomValues), which is cryptographically secure. This is the same randomness used for encryption and is far better than Math.random().",
      },
      {
        question: "What does 'no duplicates' mean?",
        answer:
          "When duplicates are not allowed, each number is unique — like drawing lottery balls without replacement. The count cannot exceed the range size (e.g., you can't pick 10 unique numbers from 1-5).",
      },
      {
        question: "Can I generate decimal numbers?",
        answer:
          "Yes. Enable 'Decimals' and the generator will produce numbers with two decimal places within your range.",
      },
      {
        question: "Is my data sent to a server?",
        answer:
          "No. All generation happens locally in your browser. Nothing is uploaded or stored.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Common Uses",
    items: [
      "Lottery numbers and raffle draws",
      "Dice rolls for board games",
      "Random sampling for statistical analysis",
      "Test data generation for software",
      "Classroom activities and random grouping",
    ],
  },
};
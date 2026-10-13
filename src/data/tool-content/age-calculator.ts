import type { ToolContent } from "./types";

export const ageCalculatorContent: ToolContent = {
  intro:
    "The Toolora Age Calculator is a free online tool that calculates your exact age in years, months, and days — plus total weeks, hours, minutes, and seconds you've lived. Find out the day of the week you were born, your next birthday countdown, and more. All calculations run locally in your browser — no data is stored or shared.",

  howTo: {
    title: "How to Use the Age Calculator",
    steps: [
      "Enter your date of birth.",
      "Optionally change the 'Age at date' to calculate age at a specific past or future date.",
      "See your exact age in years, months, and days instantly.",
      "Scroll down for total days, weeks, hours, minutes, and seconds lived.",
      "See your next birthday countdown and the day of the week you were born.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Exact age in years, months, and days",
      "Total days, weeks, hours, minutes, and seconds lived",
      "Next birthday countdown",
      "Day of week you were born",
      "Optional 'age at date' for historical or future calculations",
      "100% free, private, runs in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "How is age calculated?",
        answer:
          "Age is calculated by comparing your birth date with the target date (today by default). The tool accounts for leap years and varying month lengths for accuracy.",
      },
      {
        question: "What is 'Age at date'?",
        answer:
          "It lets you calculate your age at a specific point in time — useful for historical documents, retroactive records, or projecting future ages.",
      },
      {
        question: "How is the day of the week calculated?",
        answer:
          "The tool uses JavaScript's Date object, which correctly handles the Gregorian calendar and can determine the day of week for any date.",
      },
      {
        question: "Does it handle leap years?",
        answer:
          "Yes. Leap years are automatically accounted for in all calculations.",
      },
      {
        question: "Is my data stored?",
        answer:
          "No. All calculations happen locally in your browser. Your birth date is never sent to any server.",
      },
    ],
  },

  tips: {
    title: "Common Uses",
    items: [
      "Find out your exact age for forms and applications",
      "Calculate age for visa or passport documents",
      "Track baby's age in weeks and months",
      "Compute age differences between siblings",
      "Plan birthday parties with countdown",
    ],
  },
};
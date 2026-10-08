import type { ToolContent } from "./types";

export const unitConverterContent: ToolContent = {
  intro:
    "The Toolora Unit Converter is a free online tool that converts between hundreds of units across length, weight, temperature, volume, area, speed, and time. Whether you're cooking, studying, engineering, or travelling, this converter gives you accurate results instantly. All conversions run locally in your browser — no data is sent anywhere.",

  howTo: {
    title: "How to Use the Unit Converter",
    steps: [
      "Choose a category (Length, Weight, Temperature, etc.).",
      "Enter your value in the 'From' field.",
      "Select the source unit and target unit.",
      "See the converted value instantly.",
      "Use the swap button to reverse the conversion, or Copy to copy the result.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "7 categories: length, weight, temperature, volume, area, speed, time",
      "100+ units supported",
      "Instant real-time conversion",
      "Accurate conversion factors",
      "Swap button for quick reverse",
      "100% free, private, runs in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "How accurate are the conversions?",
        answer:
          "The tool uses standard, internationally recognized conversion factors. Results are accurate to the precision of JavaScript's number type (typically 15-16 significant digits).",
      },
      {
        question: "Does it handle temperature conversion?",
        answer:
          "Yes. Temperature is different from other units (it uses offsets, not just multipliers). The tool correctly handles Celsius, Fahrenheit, and Kelvin.",
      },
      {
        question: "Can I convert between different categories?",
        answer:
          "No. You can only convert within the same category (e.g., meters to feet). Cross-category conversion (e.g., meters to kilograms) is not physically meaningful.",
      },
      {
        question: "Is my data sent to a server?",
        answer:
          "No. All conversions happen locally in your browser using standard JavaScript. Nothing is uploaded or stored.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Common Conversions",
    items: [
      "1 inch = 2.54 cm exactly",
      "1 mile = 1.609344 km",
      "1 kg = 2.20462 lbs",
      "0°C = 32°F = 273.15 K",
      "1 gallon (US) = 3.78541 liters",
    ],
  },
};
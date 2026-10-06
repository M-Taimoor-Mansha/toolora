import type { ToolContent } from "./types";

export const bmiCalculatorContent: ToolContent = {
  intro:
    "The Toolora BMI Calculator is a free online tool that calculates your Body Mass Index (BMI) instantly. Enter your height and weight to find out if you're underweight, normal weight, overweight, or obese. BMI is a widely used screening tool to assess body weight relative to height. All calculations run locally in your browser — no data is stored or shared.",

  howTo: {
    title: "How to Use the BMI Calculator",
    steps: [
      "Enter your height in centimeters or feet/inches.",
      "Enter your weight in kilograms or pounds.",
      "Your BMI is calculated instantly as you type.",
      "See your BMI category and ideal weight range.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Instant BMI calculation",
      "Metric and imperial units (kg/cm and lbs/ft)",
      "WHO-standard BMI categories",
      "Ideal weight range for your height",
      "100% free — no sign-up",
      "Privacy-first: all processing in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is BMI?",
        answer:
          "BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated as weight (kg) divided by height (m) squared.",
      },
      {
        question: "What are the BMI categories?",
        answer:
          "Underweight: below 18.5. Normal weight: 18.5–24.9. Overweight: 25–29.9. Obese: 30 or above. These are WHO standards for adults.",
      },
      {
        question: "Is BMI accurate for everyone?",
        answer:
          "BMI is a screening tool, not a diagnostic. It may not be accurate for athletes, pregnant women, children, or the elderly. Consult a doctor for personalized advice.",
      },
      {
        question: "Does it work for children?",
        answer:
          "BMI for children uses different charts (percentiles). This calculator is designed for adults 20+.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "BMI Tips",
    items: [
      "BMI is a starting point, not a diagnosis",
      "Athletes may have high BMI due to muscle mass",
      "Combine BMI with other health metrics",
      "Consult a doctor for personalized advice",
      "Track BMI over time, not just once",
    ],
  },
};
import type { ToolContent } from "./types";

export const colorConverterContent: ToolContent = {
  intro:
    "The Toolora Color Converter is a free online tool that converts colors between HEX, RGB, HSL, and HSV formats instantly. Perfect for designers, developers, and anyone working with web colors. Pick a color or paste a value to see it in all formats, with live preview and copy buttons. All processing happens locally in your browser.",

  howTo: {
    title: "How to Use the Color Converter",
    steps: [
      "Pick a color using the color picker, or paste a HEX value.",
      "See the color converted to HEX, RGB, HSL, and HSV formats instantly.",
      "Preview the color in the large swatch.",
      "Click Copy next to any format to copy it to your clipboard.",
      "Use the Random button to generate a random color.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Convert between HEX, RGB, HSL, and HSV",
      "Live color preview",
      "Native color picker",
      "Copy buttons for each format",
      "Random color generator",
      "100% free, private, runs in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What's the difference between HEX, RGB, HSL, and HSV?",
        answer:
          "HEX is hexadecimal (16-bit) — common in CSS. RGB is red/green/blue values (0-255). HSL is hue/saturation/lightness — easier for humans to reason about. HSV is hue/saturation/value — used in color pickers.",
      },
      {
        question: "Which format should I use in CSS?",
        answer:
          "All four are valid in modern CSS. HEX and RGB are the most common. HSL is increasingly popular because it's easier to adjust (e.g., lighten a color by changing just L).",
      },
      {
        question: "Does it handle alpha/transparency?",
        answer:
          "Currently the tool focuses on opaque colors. For transparency, use 8-digit HEX (#RRGGBBAA) or rgba()/hsla() in your CSS.",
      },
      {
        question: "Is the color conversion accurate?",
        answer:
          "Yes. The conversions use standard color space math and are accurate to integer precision (with 1-2% rounding for HSL/HSV).",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Color Tips for Designers",
    items: [
      "HSL is easiest for building color palettes (vary L for shades)",
      "Use HEX for compact CSS, RGB for dynamic values",
      "60-30-10 rule: 60% dominant, 30% secondary, 10% accent",
      "Ensure 4.5:1 contrast ratio for WCAG AA text",
      "Use tools like Coolors.co for palette inspiration",
    ],
  },
};
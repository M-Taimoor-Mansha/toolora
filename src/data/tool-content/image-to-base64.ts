import type { ToolContent } from "./types";

export const imageToBase64Content: ToolContent = {
  intro:
    "The Toolora Image to Base64 Converter is a free online tool that converts images into Base64-encoded strings. Perfect for embedding small images directly in HTML, CSS, or JSON to eliminate extra HTTP requests. All conversion happens locally in your browser using the FileReader API — your images never leave your device.",

  howTo: {
    title: "How to Convert Image to Base64",
    steps: [
      "Drag and drop your image or click to upload.",
      "The Base64 string is generated instantly.",
      "Choose output format: raw, Data URI, CSS, or HTML.",
      "Copy the result or download it as a .txt file.",
      "See the size comparison between original and Base64.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Convert any image to Base64 string",
      "Multiple output formats (raw, Data URI, CSS, HTML)",
      "See exact size comparison",
      "Copy or download the result",
      "100% local — images never leave your browser",
      "Works with JPEG, PNG, GIF, WebP, SVG",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is Base64?",
        answer:
          "Base64 is a way to encode binary data (like images) as text. This lets you embed images directly in HTML, CSS, or JSON without needing a separate file.",
      },
      {
        question: "When should I use Base64 images?",
        answer:
          "For small icons, logos, or decorative images (under ~10KB). For larger images, it's better to use regular image files because Base64 increases size by ~33%.",
      },
      {
        question: "Does Base64 increase file size?",
        answer:
          "Yes, by about 33%. A 10KB image becomes ~13KB as Base64. That's the cost of encoding binary as text.",
      },
      {
        question: "Are my images uploaded to a server?",
        answer:
          "No. All conversion happens locally in your browser using the FileReader API. Your images never leave your device.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Base64 Image Tips",
    items: [
      "Use Base64 for icons and small graphics (under 10KB)",
      "Avoid Base64 for photos — use regular files instead",
      "Data URIs work in both HTML src and CSS url()",
      "Base64 images can't be cached separately by browsers",
      "For SVG, use inline <svg> instead of Base64 for better compression",
    ],
  },
};
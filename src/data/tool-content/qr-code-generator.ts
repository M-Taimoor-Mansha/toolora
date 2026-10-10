import type { ToolContent } from "./types";

export const qrCodeGeneratorContent: ToolContent = {
  intro:
    "The Toolora QR Code Generator is a free online tool that creates QR codes for URLs, text, Wi-Fi credentials, emails, phone numbers, and more. Customize size, colors, and error correction — then download your QR code as a PNG. All generation happens locally in your browser, so your data never leaves your device.",

  howTo: {
    title: "How to Generate a QR Code",
    steps: [
      "Enter the text, URL, or data you want to encode.",
      "Customize size, colors, and error correction level.",
      "Preview the QR code in real-time.",
      "Click Download to save it as a PNG image.",
      "Or use Copy to copy the QR code image to your clipboard.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Generate QR codes for any text or URL",
      "Adjustable size (128–512 px)",
      "Custom foreground and background colors",
      "Error correction levels: L, M, Q, H",
      "Download as PNG or copy to clipboard",
      "100% free, private, runs in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is a QR code?",
        answer:
          "A QR (Quick Response) code is a 2D barcode that stores data — URLs, text, contact info, etc. Smartphone cameras scan it instantly without needing a special app.",
      },
      {
        question: "How much data can a QR code hold?",
        answer:
          "Up to ~4,296 alphanumeric characters or ~2,953 bytes. Practical QR codes usually store 100–500 characters for fast scanning.",
      },
      {
        question: "What's the best error correction level?",
        answer:
          "Level L (7%) — smallest QR, good for clean displays. Level M (15%) — recommended default. Level Q (25%) — for printing on paper. Level H (30%) — for harsh environments or logos in center.",
      },
      {
        question: "Are my QR codes stored on a server?",
        answer:
          "No. All generation happens locally in your browser. Your data never leaves your device.",
      },
      {
        question: "Do QR codes ever expire?",
        answer:
          "QR codes themselves never expire — they're just data. But if the QR code points to a URL, the URL could stop working. Use permanent URLs to avoid this.",
      },
    ],
  },

  tips: {
    title: "QR Code Tips",
    items: [
      "Use high contrast colors (dark on light) for best scanning",
      "Test your QR code with multiple phones before printing",
      "For print, use at least 2cm × 2cm size",
      "Use 'H' error correction if you put a logo in the center",
      "Shorten long URLs with a URL shortener before encoding",
    ],
  },
};
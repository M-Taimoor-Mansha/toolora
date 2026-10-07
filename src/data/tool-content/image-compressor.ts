import type { ToolContent } from "./types";

export const imageCompressorContent: ToolContent = {
  intro:
    "The Toolora Image Compressor is a free online tool that reduces the file size of JPEG, PNG, and WebP images without uploading them anywhere. Compression happens entirely in your browser using the Canvas API — your images never leave your device. Perfect for web developers, bloggers, and anyone who needs smaller images for faster loading.",

  howTo: {
    title: "How to Compress Images",
    steps: [
      "Drag and drop your image or click to upload.",
      "Choose your compression quality (10% – 100%).",
      "Optionally select output format (JPEG, PNG, or WebP).",
      "Preview the compressed image and see the size reduction.",
      "Click Download to save the compressed image.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Compress JPEG, PNG, and WebP images",
      "Adjustable quality (10% – 100%)",
      "Choose output format",
      "Optional max-width / max-height resize",
      "See exact size reduction (before vs after)",
      "100% free, private, runs in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Are my images uploaded to a server?",
        answer:
          "No. All compression happens locally in your browser using the Canvas API. Your images never leave your device.",
      },
      {
        question: "What's the best quality setting?",
        answer:
          "For web use, 70–80% quality usually gives the best balance between file size and visual quality. For maximum compression, use 50–60%.",
      },
      {
        question: "Which format should I choose?",
        answer:
          "JPEG is best for photos (smaller file size). PNG is best for images with transparency or text. WebP is best overall for modern browsers.",
      },
      {
        question: "Does it support PNG transparency?",
        answer:
          "Yes. If you keep the output as PNG, transparency is preserved. Converting to JPEG will remove transparency (background becomes white).",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "No hard limit, but very large images (50+ MB) may be slow depending on your device's memory.",
      },
    ],
  },

  tips: {
    title: "Image Optimization Tips",
    items: [
      "Use JPEG for photos, PNG for transparency, WebP for modern browsers",
      "70–80% quality is usually indistinguishable from 100%",
      "Resize large images to max 1920px wide for web use",
      "Compress before uploading to WordPress or any CMS",
      "Smaller images = faster websites = better SEO",
    ],
  },
};
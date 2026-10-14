import type { ToolContent } from "./types";

export const imageResizerContent: ToolContent = {
  intro:
    "The Toolora Image Resizer is a free online tool that resizes JPEG, PNG, and WebP images to any dimensions you need. Perfect for social media, websites, email attachments, or print. Resize by exact dimensions, percentage, or use presets for popular platforms. All resizing happens locally in your browser — your images never leave your device.",

  howTo: {
    title: "How to Resize an Image",
    steps: [
      "Drag and drop your image or click to upload.",
      "Choose a resize method: exact dimensions, percentage, or preset.",
      "Optionally lock the aspect ratio to avoid distortion.",
      "Preview the resized image and new dimensions.",
      "Click Download to save the resized image.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Resize JPEG, PNG, and WebP images",
      "Exact dimensions (width × height)",
      "Percentage scaling (25%, 50%, 200%, etc.)",
      "Presets for Instagram, Facebook, Twitter, YouTube",
      "Lock aspect ratio to avoid distortion",
      "100% free, private, runs in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Does resizing reduce image quality?",
        answer:
          "Upscaling (making larger) always reduces quality. Downscaling (making smaller) preserves quality well when done with proper interpolation. Our tool uses high-quality canvas smoothing.",
      },
      {
        question: "Does it support PNG transparency?",
        answer:
          "Yes. If your input is PNG and you keep the output as PNG, transparency is preserved. Converting to JPEG will remove transparency (background becomes white).",
      },
      {
        question: "What are the best dimensions for social media?",
        answer:
          "Instagram post: 1080×1080. Instagram story: 1080×1920. Facebook post: 1200×630. Twitter post: 1600×900. YouTube thumbnail: 1280×720. These presets are built into the tool.",
      },
      {
        question: "Can I resize multiple images at once?",
        answer:
          "Currently the tool resizes one image at a time. Batch resizing may be added in a future update.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Image Resizing Tips",
    items: [
      "Always resize down, not up — upscaling reduces quality",
      "Lock the aspect ratio to avoid distortion",
      "For web, use 1920px max width for hero images",
      "For thumbnails, 300-500px wide is usually enough",
      "Use WebP format for smallest file sizes on modern browsers",
    ],
  },
};
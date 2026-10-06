import type { ToolContent } from "./types";

export const pdfToWordContent: ToolContent = {
  intro:
    "The Toolora PDF to Word Converter is a free online tool that converts PDF documents into editable Word (.docx) files directly in your browser. Unlike other converters, your PDF never leaves your device — all processing happens locally, ensuring complete privacy. Perfect for editing contracts, reports, resumes, and any PDF document.",

  howTo: {
    title: "How to Convert PDF to Word",
    steps: [
      "Click the upload area or drag and drop your PDF file.",
      "Wait for the file to process (usually 5-15 seconds).",
      "The converted Word document will be ready to download.",
      "Click Download to save the .docx file to your device.",
      "Your file is never uploaded to any server — everything happens locally.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "100% free — no sign-up, no limits",
      "Privacy-first: files never leave your device",
      "Fast conversion — 5-15 seconds per document",
      "Preserves text formatting and structure",
      "Works on mobile, tablet, and desktop",
      "No file size limits (browser-dependent)",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Is this PDF to Word converter free?",
        answer:
          "Yes, completely free with no sign-up, no limits, and no premium tiers.",
      },
      {
        question: "Are my PDF files safe?",
        answer:
          "Yes. All processing happens in your browser. Your PDF is never uploaded to our servers, stored, or shared.",
      },
      {
        question: "What PDF files can I convert?",
        answer:
          "Most PDFs work — including text-based PDFs, scanned documents (with OCR), and mixed content. Complex layouts may vary.",
      },
      {
        question: "Does it work with scanned PDFs?",
        answer:
          "Text-based PDFs convert perfectly. Scanned PDFs (images) require OCR, which is not currently supported.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "No artificial limit. However, very large files (100+ MB) may be slow depending on your device's memory.",
      },
    ],
  },

  tips: {
    title: "PDF to Word Tips",
    items: [
      "Best results with text-based PDFs, not scanned images",
      "For complex layouts, you may need to adjust formatting after conversion",
      "Keep the original PDF as backup",
      "For scanned documents, use OCR software first",
      "Test with a small file before converting large documents",
    ],
  },
};
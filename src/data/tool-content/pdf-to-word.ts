import type { ToolContent } from "./types";

export const pdfToWordContent: ToolContent = {
  intro:
    "The Toolora PDF to Word Converter is a free online tool that converts PDF documents into editable Word (.docx) files directly in your browser. Unlike other converters that upload your files to a server, Toolora processes everything locally — your PDF never leaves your device, ensuring complete privacy. Perfect for editing contracts, reports, resumes, presentations, and any PDF document. No sign-up, no email, no file size limits. Just upload, convert, and download.",

  howTo: {
    title: "How to Convert PDF to Word",
    steps: [
      "Click the upload area or drag and drop your PDF file.",
      "Wait for the file to process (usually 5-15 seconds, depending on size).",
      "The converted Word document will be ready to download.",
      "Click Download to save the .docx file to your device.",
      "Open the .docx file in Microsoft Word, Google Docs, or any word processor.",
      "Your file is never uploaded to any server — everything happens locally.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "100% free — no sign-up, no limits, no hidden fees",
      "Privacy-first: files never leave your device",
      "Fast conversion — 5-15 seconds per document",
      "Preserves text formatting and structure",
      "Works on mobile, tablet, and desktop",
      "No file size limits (browser-dependent)",
      "Supports text-based PDFs, reports, contracts, and resumes",
      "No upload — your data stays on your device",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Is this PDF to Word converter free?",
        answer:
          "Yes, completely free with no sign-up, no limits, and no premium tiers. You can convert as many PDFs as you want.",
      },
      {
        question: "Are my PDF files safe?",
        answer:
          "Yes. All processing happens in your browser. Your PDF is never uploaded to our servers, stored, or shared. We can't see your files even if we wanted to.",
      },
      {
        question: "What PDF files can I convert?",
        answer:
          "Most text-based PDFs work — including reports, contracts, resumes, and articles. Scanned PDFs (images) require OCR, which is not currently supported.",
      },
      {
        question: "Does it work with scanned PDFs?",
        answer:
          "Text-based PDFs convert perfectly. Scanned PDFs (images) need OCR software first. The tool will show an error if no text is found.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Free tier supports files up to 5 MB. For larger files (up to 100 MB) and batch conversion, upgrade to Pro.",
      },
      {
        question: "What format does the output use?",
        answer:
          "The output is a .docx file — compatible with Microsoft Word, Google Docs, LibreOffice, and Pages.",
      },
      {
        question: "Can I convert password-protected PDFs?",
        answer:
          "No. The tool requires access to the PDF content. Password-protected PDFs must be unlocked first.",
      },
      {
        question: "Does it preserve formatting?",
        answer:
          "Text formatting (bold, italic, headings) is preserved. Complex layouts (tables, images) may need manual adjustment after conversion.",
      },
      {
        question: "How long does conversion take?",
        answer:
          "Usually 5-15 seconds depending on file size and your device's speed. Large files may take longer.",
      },
      {
        question: "Can I use this tool on mobile?",
        answer:
          "Yes, the tool is fully responsive and works on smartphones, tablets, and desktops.",
      },
    ],
  },

  tips: {
    title: "PDF to Word Tips",
    items: [
      "Best results with text-based PDFs, not scanned images.",
      "For complex layouts, you may need to adjust formatting after conversion.",
      "Keep the original PDF as backup.",
      "For scanned documents, use OCR software first.",
      "Test with a small file before converting large documents.",
      "If the PDF has multiple columns, conversion may reorder text.",
      "Always check the converted file for accuracy.",
      "For images inside PDFs, you may need to extract them separately.",
    ],
  },
};
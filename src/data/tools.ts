import type { Tool } from "./types";

/**
 * The tool registry.
 *
 * Every tool on the site is declared here. Live tools have a matching
 * interactive component registered in `src/components/tools/registry.ts`
 * and `status: "live"`. Unimplemented tools remain `status: "coming-soon"`.
 */
export const tools: Tool[] = [
  // --- Developer Tools (Batch 1 — Live) ---
  {
    id: "tool-json-formatter",
    name: "JSON Formatter",
    slug: "json-formatter",
    description:
      "Format, beautify and validate JSON with customizable indentation. Paste raw JSON and get clean, readable output in one click.",
    category: "developer-tools",
    icon: "braces",
    keywords: [
      "json formatter",
      "json beautifier",
      "json pretty print",
      "format json online",
      "indent json",
    ],
    featured: true,
    popular: true,
    status: "live",
  },
  {
    id: "tool-json-validator",
    name: "JSON Validator",
    slug: "json-validator",
    description:
      "Check JSON syntax against RFC 8259 with clear line and column error reporting, root type inspection and structure stats.",
    category: "developer-tools",
    icon: "shieldCheck",
    keywords: [
      "json validator",
      "validate json",
      "json syntax checker",
      "json linter",
      "check json online",
    ],
    featured: true,
    popular: true,
    status: "live",
  },
  {
    id: "tool-json-minifier",
    name: "JSON Minifier",
    slug: "json-minifier",
    description:
      "Compress JSON payloads by stripping whitespace and line breaks while validating syntax and measuring exact bytes saved.",
    category: "developer-tools",
    icon: "minimize",
    keywords: [
      "json minifier",
      "minify json",
      "compact json",
      "compress json",
      "one line json",
    ],
    featured: false,
    popular: false,
    status: "live",
  },
  {
    id: "tool-base64-encoder",
    name: "Base64 Encoder",
    slug: "base64-encoder",
    description:
      "Encode plain text and UTF-8 strings (including Unicode and emojis) into standard Base64 right in your browser.",
    category: "developer-tools",
    icon: "binary",
    keywords: [
      "base64 encoder",
      "encode base64",
      "text to base64",
      "utf8 base64 encode",
      "btoa unicode",
    ],
    featured: true,
    popular: true,
    status: "live",
  },
  {
    id: "tool-base64-decoder",
    name: "Base64 Decoder",
    slug: "base64-decoder",
    description:
      "Decode standard or URL-safe Base64 strings back into readable UTF-8 text with automatic format and padding validation.",
    category: "developer-tools",
    icon: "binary",
    keywords: [
      "base64 decoder",
      "decode base64",
      "base64 to text",
      "utf8 base64 decode",
      "atob online",
    ],
    featured: false,
    popular: true,
    status: "live",
  },
  {
    id: "tool-url-encoder",
    name: "URL Encoder",
    slug: "url-encoder",
    description:
      "Percent-encode query parameters, text fragments or full URLs safely using component or full-URI encoding modes.",
    category: "developer-tools",
    icon: "link",
    keywords: [
      "url encoder",
      "percent encode",
      "encodeuricomponent online",
      "urlencode text",
      "query string encoder",
    ],
    featured: false,
    popular: false,
    status: "live",
  },
  {
    id: "tool-url-decoder",
    name: "URL Decoder",
    slug: "url-decoder",
    description:
      "Decode percent-encoded URLs and query strings back into readable UTF-8 text with graceful malformed-sequence detection.",
    category: "developer-tools",
    icon: "link",
    keywords: [
      "url decoder",
      "percent decode",
      "decodeuricomponent online",
      "urldecode text",
      "decode query string",
    ],
    featured: false,
    popular: false,
    status: "live",
  },
  {
    id: "tool-uuid-generator",
    name: "UUID Generator",
    slug: "uuid-generator",
    description:
      "Generate standards-compliant RFC 4122 version 4 UUIDs individually or in bulk using browser Web Crypto randomness.",
    category: "developer-tools",
    icon: "fingerprint",
    keywords: [
      "uuid generator",
      "uuid v4",
      "guid generator",
      "random uuid",
      "bulk uuid generator",
    ],
    featured: true,
    popular: true,
    status: "live",
  },

  // --- Text Tools (Batch 1 — Live) ---
  {
    id: "tool-word-counter",
    name: "Word Counter",
    slug: "word-counter",
    description:
      "Count words, characters, sentences, paragraphs and lines instantly as you type — plus reading and speaking time estimates.",
    category: "text-tools",
    icon: "fileText",
    keywords: [
      "word counter",
      "character count",
      "text statistics",
      "reading time calculator",
      "essay word count",
    ],
    featured: true,
    popular: true,
    status: "live",
  },
  {
    id: "tool-character-counter",
    name: "Character Counter",
    slug: "character-counter",
    description:
      "Measure total characters, characters without spaces, characters without line breaks, words and lines while you type.",
    category: "text-tools",
    icon: "hash",
    keywords: [
      "character counter",
      "character count online",
      "text length checker",
      "twitter character count",
      "meta description length",
    ],
    featured: false,
    popular: true,
    status: "live",
  },
  {
    id: "tool-sentence-counter",
    name: "Sentence Counter",
    slug: "sentence-counter",
    description:
      "Count sentences, words and characters in any text with a smart heuristic that handles periods, exclamation marks, question marks and abbreviations.",
    category: "text-tools",
    icon: "quote",
    keywords: [
      "sentence counter",
      "count sentences",
      "sentence length",
      "text analysis",
      "average sentence length",
    ],
    featured: false,
    popular: false,
    status: "live",
  },
  {
    id: "tool-paragraph-counter",
    name: "Paragraph Counter",
    slug: "paragraph-counter",
    description:
      "Count meaningful paragraphs separated by blank lines, along with total words, characters and lines.",
    category: "text-tools",
    icon: "pilcrow",
    keywords: [
      "paragraph counter",
      "count paragraphs",
      "essay structure",
      "text block counter",
    ],
    featured: false,
    popular: false,
    status: "live",
  },
  {
    id: "tool-case-converter",
    name: "Case Converter",
    slug: "case-converter",
    description:
      "Convert text to UPPERCASE, lowercase, Title Case, Sentence case or inverse tOGGLE cASE with instant live preview.",
    category: "text-tools",
    icon: "type",
    keywords: [
      "case converter",
      "uppercase to lowercase",
      "title case converter",
      "sentence case",
      "text case changer",
    ],
    featured: false,
    popular: true,
    status: "live",
  },
  {
    id: "tool-remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    slug: "remove-duplicate-lines",
    description:
      "Remove duplicate lines while preserving the first occurrence and original order — with optional case-insensitive matching.",
    category: "text-tools",
    icon: "eraser",
    keywords: [
      "remove duplicate lines",
      "dedupe text",
      "unique lines",
      "delete repeated lines",
    ],
    featured: false,
    popular: false,
    status: "live",
  },
  {
    id: "tool-remove-extra-spaces",
    name: "Remove Extra Spaces",
    slug: "remove-extra-spaces",
    description:
      "Clean messy text by collapsing repeated spaces, removing whitespace around line breaks, and trimming stray spaces — while preserving paragraphs.",
    category: "text-tools",
    icon: "alignLeft",
    keywords: [
      "remove extra spaces",
      "trim whitespace",
      "clean text online",
      "double spaces remover",
    ],
    featured: false,
    popular: false,
    status: "live",
  },
  {
    id: "tool-text-sorter",
    name: "Text Sorter",
    slug: "text-sorter",
    description:
      "Sort lines alphabetically or numerically in ascending or descending order, with trimming, deduplication and case options.",
    category: "text-tools",
    icon: "arrowDownAZ",
    keywords: [
      "text sorter",
      "sort lines alphabetically",
      "sort list online",
      "a to z sorter",
    ],
    featured: false,
    popular: false,
    status: "live",
  },
  {
    id: "tool-text-reverser",
    name: "Text Reverser",
    slug: "text-reverser",
    description:
      "Reverse entire text, reverse each line, or flip word order — character by character, fully Unicode safe.",
    category: "text-tools",
    icon: "flipHorizontal",
    keywords: [
      "text reverser",
      "reverse string",
      "backwards text generator",
      "flip text",
    ],
    featured: false,
    popular: false,
    status: "live",
  },
  {
    id: "tool-slug-generator",
    name: "Slug Generator",
    slug: "slug-generator",
    description:
      "Convert any title into a clean, URL-friendly slug: lowercase, hyphenated, punctuation-free and ASCII safe.",
    category: "text-tools",
    icon: "link",
    keywords: [
      "slug generator",
      "url slug maker",
      "seo friendly url",
      "permalink generator",
    ],
    featured: false,
    popular: true,
    status: "live",
  },

  // --- PDF Tools (Batch 2 — Live) ---
  {
    id: "tool-pdf-to-word",
    name: "PDF to Word",
    slug: "pdf-to-word",
    description:
      "Convert PDF documents to editable Word (.docx) files. 100% free, private, and runs entirely in your browser.",
    category: "pdf-tools",
    icon: "fileText",
    keywords: [
      "pdf to word",
      "pdf to docx",
      "convert pdf to word",
      "pdf converter",
      "free pdf to word",
    ],
    featured: true,
    popular: true,
    status: "live",
  },

  // --- Calculators (Coming Soon) ---
  {
    id: "tool-age-calculator",
    name: "Age Calculator",
    slug: "age-calculator",
    description:
      "Find out your exact age in years, months and days — plus how many weeks, hours and seconds you have lived so far.",
    category: "calculators",
    icon: "cake",
    keywords: [
      "age calculator",
      "how old am i",
      "birthday calculator",
      "date difference",
    ],
    featured: false,
    popular: false,
    status: "coming-soon",
  },

  // --- Image Tools (Coming Soon) ---
  {
    id: "tool-image-compressor",
    name: "Image Compressor",
    slug: "image-compressor",
    description:
      "Shrink JPEG, PNG and WebP images right in your browser. Files are processed locally and never leave your device.",
    category: "image-tools",
    icon: "compress",
    keywords: [
      "compress image",
      "reduce image size",
      "image optimizer",
      "shrink png",
    ],
    featured: true,
    popular: true,
    status: "coming-soon",
  },

  // --- Generators (Coming Soon) ---
  {
    id: "tool-qr-code-generator",
    name: "QR Code Generator",
    slug: "qr-code-generator",
    description:
      "Generate QR codes for links, Wi-Fi credentials, text and more — with custom colors and a downloadable PNG.",
    category: "generators",
    icon: "qr",
    keywords: ["qr code generator", "make qr code", "free qr code", "qr for wifi"],
    featured: true,
    popular: false,
    status: "coming-soon",
  },
];
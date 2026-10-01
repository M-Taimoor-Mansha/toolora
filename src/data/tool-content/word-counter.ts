import type { ToolContent } from "./types";

export const wordCounterContent: ToolContent = {
  intro:
    "The Toolora Word Counter is a free online tool that instantly counts words, characters, sentences, paragraphs, and lines in any text. Whether you're a writer checking an article length, a student working on an essay, or a developer validating content, this tool gives you real-time statistics as you type. Unlike other word counters, Toolora processes everything locally in your browser — your text never leaves your device, ensuring complete privacy.",

  howTo: {
    title: "How to Use the Word Counter",
    steps: [
      "Paste or type your text into the large text box above.",
      "Watch the live statistics update instantly — words, characters, sentences, paragraphs, and lines.",
      "Use the Copy button to copy your text, or Reset to clear the box.",
      "Toggle between light and dark mode for comfortable viewing.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Real-time counting as you type — no button clicks needed",
      "Counts words, characters (with and without spaces), sentences, paragraphs, and lines",
      "100% free — no sign-up, no limits, no paywalls",
      "Privacy-first: all processing happens in your browser",
      "Works on mobile, tablet, and desktop",
      "Light and dark mode support",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Is the Toolora Word Counter free?",
        answer:
          "Yes, the Word Counter is completely free with no sign-up, no limits, and no premium tiers. You can use it as many times as you want.",
      },
      {
        question: "Does the Word Counter store my text?",
        answer:
          "No. All text processing happens entirely in your browser. Your text is never sent to our servers, stored, or shared with anyone.",
      },
      {
        question: "How does the Word Counter count words?",
        answer:
          "The tool splits your text by whitespace (spaces, tabs, newlines) and counts each non-empty group as one word. This is the standard method used by most word processors.",
      },
      {
        question: "Can I use the Word Counter offline?",
        answer:
          "Once the page is loaded, the tool works entirely offline because all processing is done locally in your browser.",
      },
      {
        question: "Does the Word Counter work on mobile?",
        answer:
          "Yes, the Word Counter is fully responsive and works perfectly on smartphones, tablets, and desktops.",
      },
    ],
  },

  tips: {
    title: "Tips for Writers",
    items: [
      "Most blog posts are between 1,000 and 2,000 words for optimal SEO.",
      "Twitter/X posts have a 280-character limit.",
      "Meta descriptions should be under 160 characters.",
      "Academic essays often have specific word count requirements — always check your guidelines.",
    ],
  },
};
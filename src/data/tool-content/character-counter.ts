import type { ToolContent } from "./types";

export const characterCounterContent: ToolContent = {
  intro:
    "The Toolora Character Counter is a free online tool that instantly counts every character in your text — with and without spaces, and with and without newlines. Perfect for writers working within character limits, social media managers crafting posts, and developers validating input fields. All processing happens locally in your browser, so your text stays completely private.",

  howTo: {
    title: "How to Use the Character Counter",
    steps: [
      "Paste or type your text into the text box above.",
      "See live character counts update instantly — total characters, without spaces, and without newlines.",
      "Also view word and line counts for full context.",
      "Use Copy to copy your text, or Reset to clear it.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Real-time character counting as you type",
      "Total characters, characters without spaces, characters without newlines",
      "Additional word and line counts",
      "100% free — no sign-up, no limits",
      "Privacy-first: all processing in your browser",
      "Works on mobile, tablet, and desktop",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Is the Character Counter free?",
        answer:
          "Yes, the Character Counter is completely free with no sign-up, no limits, and no premium tiers.",
      },
      {
        question: "What's the difference between 'with spaces' and 'without spaces'?",
        answer:
          "'With spaces' counts every character including spaces, tabs, and punctuation. 'Without spaces' counts only non-space characters — useful for character limits that exclude spaces.",
      },
      {
        question: "Does the Character Counter store my text?",
        answer:
          "No. All processing happens entirely in your browser. Your text is never sent to our servers, stored, or shared.",
      },
      {
        question: "Can I use the Character Counter offline?",
        answer:
          "Yes, once the page is loaded, the tool works entirely offline because all processing is local.",
      },
    ],
  },

  tips: {
    title: "Common Character Limits",
    items: [
      "Twitter/X posts: 280 characters",
      "Meta descriptions: 160 characters",
      "SEO title tags: 60 characters",
      "Instagram captions: 2,200 characters",
      "SMS messages: 160 characters per segment",
    ],
  },
};
import type { ToolContent } from "./types";

export const loremIpsumContent: ToolContent = {
  intro:
    "The Toolora Lorem Ipsum Generator is a free online tool that creates placeholder text for your designs, mockups, and layouts. Choose how many paragraphs, sentences, and words you need, and get classic Lorem Ipsum text instantly. Perfect for designers, developers, and content creators. All generation happens locally in your browser.",

  howTo: {
    title: "How to Generate Lorem Ipsum",
    steps: [
      "Choose how many paragraphs you need (1-20).",
      "Optionally set sentences per paragraph and words per sentence.",
      "Toggle 'Start with Lorem ipsum...' to begin with the classic phrase.",
      "Click Generate to create new placeholder text.",
      "Use Copy to copy the result, or Regenerate for new text.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Generate 1-20 paragraphs instantly",
      "Customize sentences per paragraph",
      "Customize words per sentence",
      "Classic 'Lorem ipsum' opening option",
      "Copy to clipboard in one click",
      "100% free, private, runs in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is Lorem Ipsum?",
        answer:
          "Lorem Ipsum is dummy text derived from a Latin passage by Cicero (45 BC). It's been the standard placeholder text in publishing and design since the 1500s.",
      },
      {
        question: "Why do designers use Lorem Ipsum?",
        answer:
          "It has a normal distribution of letters, so it looks like real text without being readable. This helps viewers focus on the layout and design rather than the content.",
      },
      {
        question: "Is the generated text random?",
        answer:
          "Yes. Each time you click Generate, you get a new random selection of words from the classic Lorem Ipsum vocabulary.",
      },
      {
        question: "Can I use it for commercial projects?",
        answer:
          "Yes. Lorem Ipsum is public domain and can be used in any project, commercial or personal.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Lorem Ipsum Tips",
    items: [
      "Use it for wireframes, mockups, and design drafts",
      "Match the word count to your actual content length",
      "For short UI elements, use single sentences",
      "For blog post previews, use 3-5 paragraphs",
      "Replace with real content before going live",
    ],
  },
};
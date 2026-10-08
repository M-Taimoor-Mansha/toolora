import type { ToolContent } from "./types";

export const timestampConverterContent: ToolContent = {
  intro:
    "The Toolora Timestamp Converter is a free online tool that converts Unix timestamps to human-readable dates and vice versa. Perfect for developers debugging API responses, working with database records, or analyzing logs. See the current Unix time in real-time, convert any timestamp to ISO 8601, UTC, local time, and relative time — all locally in your browser.",

  howTo: {
    title: "How to Use the Timestamp Converter",
    steps: [
      "View the current Unix timestamp updating live at the top.",
      "Enter any Unix timestamp (seconds or milliseconds) to convert it to a date.",
      "Or enter a date to convert it to a Unix timestamp.",
      "See multiple formats: ISO 8601, UTC, local time, and relative time.",
      "Use Copy to copy any value to your clipboard.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Live current Unix timestamp (updates every second)",
      "Unix timestamp → human date conversion",
      "Human date → Unix timestamp conversion",
      "Supports both seconds and milliseconds",
      "Multiple output formats (ISO 8601, UTC, local, relative)",
      "100% free, no sign-up, runs in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is a Unix timestamp?",
        answer:
          "A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (UTC). It's a universal way to represent time that's independent of time zones.",
      },
      {
        question: "What's the difference between seconds and milliseconds?",
        answer:
          "Unix timestamps in seconds are 10 digits (e.g., 1700000000). In milliseconds, they're 13 digits (e.g., 1700000000000). JavaScript uses milliseconds; most Unix systems use seconds.",
      },
      {
        question: "Does it handle timezones?",
        answer:
          "Yes. The tool shows UTC, ISO 8601, and your local time. The Unix timestamp itself is timezone-independent.",
      },
      {
        question: "Does it work with future dates?",
        answer:
          "Yes. You can convert timestamps far into the future or past. The tool supports the full range of JavaScript's Date object.",
      },
      {
        question: "Is this tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Timestamp Tips",
    items: [
      "Unix time is always in UTC — timezone conversion happens at display",
      "JavaScript's Date.now() returns milliseconds, not seconds",
      "Most APIs (Stripe, Twitter, etc.) use seconds",
      "Year 2038 problem: 32-bit systems will overflow on Jan 19, 2038",
      "Use ISO 8601 for human-readable timestamps in logs",
    ],
  },
};
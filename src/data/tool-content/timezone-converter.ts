import type { ToolContent } from "./types";

export const timezoneConverterContent: ToolContent = {
  intro:
    "The Toolora Time Zone Converter is a free online tool that converts date and time between any two time zones in the world. Perfect for scheduling international meetings, coordinating with remote teams, or planning travel. See the time difference at a glance, along with full date and time in both zones. All calculations happen locally in your browser.",

  howTo: {
    title: "How to Convert Time Zones",
    steps: [
      "Select a date and time (default is now).",
      "Choose the source time zone (auto-detected from your browser).",
      "Choose the target time zone.",
      "See the converted time and the difference instantly.",
      "Use quick presets for common cities (New York, London, Dubai, Tokyo).",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Convert between any two IANA time zones",
      "Auto-detect your local time zone",
      "Shows time difference (e.g., '3 hours ahead')",
      "Full date and time in both zones",
      "Quick presets for popular cities",
      "100% free, private, runs in your browser",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Does it handle daylight saving time?",
        answer:
          "Yes. The tool uses your browser's IANA timezone database, which automatically accounts for DST changes in each zone.",
      },
      {
        question: "What is an IANA time zone?",
        answer:
          "IANA time zones are the standard identifiers like 'America/New_York' or 'Asia/Karachi'. They're more accurate than abbreviations (like EST or PKT) because they handle DST correctly.",
      },
      {
        question: "Can I convert to multiple time zones at once?",
        answer:
          "Currently you convert between two zones at a time. To compare more, run the tool again with a different target zone.",
      },
      {
        question: "Are the conversions accurate?",
        answer:
          "Yes. The tool uses the Intl API in your browser, which relies on up-to-date timezone data maintained by the browser vendor.",
      },
      {
        question: "Is the tool free?",
        answer: "Yes, completely free with no sign-up required.",
      },
    ],
  },

  tips: {
    title: "Time Zone Tips",
    items: [
      "Use 'UTC' as a neutral reference for international scheduling",
      "Popular business hubs: New York, London, Dubai, Singapore, Tokyo",
      "Pakistan (Asia/Karachi) is UTC+5 (no DST)",
      "US Eastern Time is UTC-5 (EST) or UTC-4 (EDT in summer)",
      "Always double-check DST transitions when scheduling meetings",
    ],
  },
};
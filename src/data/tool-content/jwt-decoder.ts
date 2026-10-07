import type { ToolContent } from "./types";

export const jwtDecoderContent: ToolContent = {
  intro:
    "The Toolora JWT Decoder is a free online tool that decodes JSON Web Tokens (JWTs) instantly. Paste any JWT to see its header, payload, and signature — including standard claims like issuer, subject, and expiration. All decoding happens locally in your browser, so your tokens are never sent to any server. Ideal for developers debugging authentication flows.",

  howTo: {
    title: "How to Decode a JWT",
    steps: [
      "Paste your JWT into the input box above.",
      "The header, payload, and signature are decoded automatically.",
      "View standard claims (iss, sub, exp, iat) and custom claims.",
      "Check if the token is expired or still valid.",
      "Use Copy to copy any section.",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Decode JWT header, payload, and signature instantly",
      "Human-readable claims (iss, sub, exp, iat, etc.)",
      "Expiration status check (expired / valid)",
      "Pretty-printed JSON output",
      "100% local — tokens never leave your browser",
      "Works with HS256, RS256, and other algorithms",
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is a JWT?",
        answer:
          "A JSON Web Token (JWT) is a compact, URL-safe token used for authentication and information exchange. It has three parts: header, payload, and signature, separated by dots.",
      },
      {
        question: "Is it safe to paste my JWT here?",
        answer:
          "Yes. All decoding happens locally in your browser. Your token is never uploaded to a server, logged, or stored. However, treat production tokens as secrets and avoid sharing them.",
      },
      {
        question: "Can this tool verify the signature?",
        answer:
          "No. Verification requires the secret or public key, which we deliberately do not ask for. This tool only decodes the token, not verifies it.",
      },
      {
        question: "What does 'exp' mean?",
        answer:
          "'exp' is the expiration time (Unix timestamp). If the current time is past 'exp', the token is expired and should be rejected by the server.",
      },
      {
        question: "Does it work with expired tokens?",
        answer:
          "Yes. You can still decode expired tokens to inspect their contents.",
      },
    ],
  },

  tips: {
    title: "JWT Best Practices",
    items: [
      "Never store JWTs in localStorage for sensitive apps — use httpOnly cookies",
      "Always verify tokens on the server, never trust the client",
      "Use short expiration times (15 min – 1 hour) for access tokens",
      "Use refresh tokens for long-lived sessions",
      "Never put sensitive data (passwords, PII) in the payload — it's base64, not encrypted",
    ],
  },
};
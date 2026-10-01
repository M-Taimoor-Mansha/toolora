import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Toolora. Send us your feedback, tool suggestions, bug reports, or partnership inquiries.",
  keywords: ["contact toolora", "toolora support", "feedback"],
};

export default function ContactPage() {
  return (
    <main className="container-x py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-3 text-ink-2">
          Have feedback, a tool suggestion, or a bug report? We&apos;d love to
          hear from you.
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-lg font-bold text-ink">📧 Email</h2>
            <p className="mt-2 text-ink-2">
              The fastest way to reach us is by email:
            </p>
            <a
              href="mailto:taimoorc067@gmail.com"
              className="mt-3 inline-block text-lg font-semibold text-brand-600 hover:underline"
            >
              taimoorc067@gmail.com
            </a>
            <p className="mt-2 text-sm text-ink-3">
              We typically respond within 24–48 hours.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-lg font-bold text-ink">💡 Tool Suggestions</h2>
            <p className="mt-2 text-ink-2">
              Want a new tool added to Toolora? Send us your idea and we&apos;ll
              consider it for our next release.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-lg font-bold text-ink">🐛 Bug Reports</h2>
            <p className="mt-2 text-ink-2">Found a bug? Please include:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-ink-2">
              <li>The tool name</li>
              <li>What you did</li>
              <li>What you expected</li>
              <li>What actually happened</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-lg font-bold text-ink">🤝 Partnerships</h2>
            <p className="mt-2 text-ink-2">
              For business or partnership inquiries, email us with the subject
              line &quot;Partnership&quot;.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <Link href="/" className="text-sm text-brand-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
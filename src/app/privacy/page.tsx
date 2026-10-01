import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Toolora's privacy policy explains how we handle your data. All tools run locally in your browser — we never store, collect, or share your text, files, or personal information.",
  keywords: ["privacy policy", "toolora privacy", "data protection", "GDPR"],
};

export default function PrivacyPage() {
  const lastUpdated = "October 1, 2026";

  return (
    <main className="container-x py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-ink-3">Last updated: {lastUpdated}</p>

        <div className="prose prose-sm mt-8 max-w-none text-ink-2 sm:prose-base">
          <p>
            At <strong>Toolora</strong> (&quot;we&quot;, &quot;our&quot;,
            &quot;us&quot;), your privacy is our top priority. This Privacy
            Policy explains how we handle your information when you use our
            website and tools.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">
            1. Our Core Principle: Privacy by Design
          </h2>
          <p>
            <strong>All Toolora tools run entirely in your browser.</strong> The
            text, files, and data you enter into any of our tools are processed
            locally on your device and are <strong>never</strong> sent to our
            servers, stored, or shared with anyone.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>We do not store your text, files, or inputs.</li>
            <li>We do not use cookies to track your tool usage.</li>
            <li>We do not require an account or sign-up.</li>
            <li>We do not sell or share your data.</li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-ink">
            2. Information We Do Not Collect
          </h2>
          <p>
            Toolora does not collect, store, or process any of the following:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>The content you paste or type into our tools</li>
            <li>Files you upload to our tools</li>
            <li>Your name, email, or personal identifiers</li>
            <li>Your IP address or location</li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-ink">
            3. Information We Do Collect (Minimal)
          </h2>
          <p>
            We collect only the bare minimum required to operate the website:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              <strong>Theme Preference:</strong> Your light/dark mode choice is
              stored locally in your browser&apos;s <code>localStorage</code>.
              This never leaves your device.
            </li>
            <li>
              <strong>Anonymous Analytics (if enabled):</strong> We may use
              privacy-respecting analytics to understand which tools are
              popular. This data is aggregated and anonymous.
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-ink">
            4. Third-Party Services
          </h2>
          <p>We use the following third-party services:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              <strong>Google Fonts:</strong> For typography. Google may log
              requests as per their privacy policy.
            </li>
            <li>
              <strong>Google AdSense:</strong> To display advertisements. Google
              may use cookies to serve relevant ads. You can opt out via{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 underline"
              >
                Google Ads Settings
              </a>
              .
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-ink">5. Cookies</h2>
          <p>
            Toolora itself does not set tracking cookies. However, third-party
            services (such as Google AdSense) may set cookies. You can control
            cookies through your browser settings.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">6. Your Rights</h2>
          <p>
            Since we do not collect or store your personal data, there is no
            data to access, modify, or delete. However, if you have concerns,
            contact us at{" "}
            <a
              href="mailto:taimoorc067@gmail.com"
              className="text-brand-600 underline"
            >
              taimoorc067@gmail.com
            </a>
            .
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">
            7. Children&apos;s Privacy
          </h2>
          <p>
            Toolora is not directed at children under 13. We do not knowingly
            collect data from children.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. The
            &quot;Last updated&quot; date at the top will reflect any changes.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">9. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at{" "}
            <a
              href="mailto:taimoorc067@gmail.com"
              className="text-brand-600 underline"
            >
              taimoorc067@gmail.com
            </a>
            .
          </p>
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
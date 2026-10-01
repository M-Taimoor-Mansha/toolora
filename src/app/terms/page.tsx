import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Toolora's terms of service outline the rules for using our free online tools. By using Toolora, you agree to these terms.",
  keywords: ["terms of service", "toolora terms", "user agreement"],
};

export default function TermsPage() {
  const lastUpdated = "October 1, 2026";

  return (
    <main className="container-x py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-ink-3">Last updated: {lastUpdated}</p>

        <div className="prose prose-sm mt-8 max-w-none text-ink-2 sm:prose-base">
          <p>
            Welcome to <strong>Toolora</strong>. By accessing or using our
            website and tools, you agree to be bound by these Terms of Service.
            If you do not agree, please do not use the website.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">
            1. Description of Service
          </h2>
          <p>
            Toolora provides free, browser-based online tools for text,
            developer, image, and PDF tasks. All tools run locally in your
            browser and require no account or payment.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">2. Acceptable Use</h2>
          <p>You agree NOT to:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Use Toolora for any illegal or unauthorized purpose.</li>
            <li>Attempt to disrupt, hack, or overload our servers.</li>
            <li>Copy, resell, or redistribute our tools without permission.</li>
            <li>Use automated bots to scrape or abuse the service.</li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-ink">3. No Warranty</h2>
          <p>
            Toolora is provided &quot;as is&quot; and &quot;as available&quot;
            without any warranty of any kind, express or implied. We do not
            guarantee that:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>The service will be uninterrupted or error-free.</li>
            <li>Results from our tools will be 100% accurate.</li>
            <li>The website will be free of viruses or harmful components.</li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-ink">
            4. Limitation of Liability
          </h2>
          <p>
            Toolora and its owners shall not be liable for any direct, indirect,
            incidental, or consequential damages arising from your use of the
            website or tools. You use the tools at your own risk.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">
            5. Intellectual Property
          </h2>
          <p>
            All content, branding, and code on Toolora are the property of
            Toolora unless otherwise stated. You may not copy or reproduce them
            without permission.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">6. Advertisements</h2>
          <p>
            Toolora may display advertisements (e.g., Google AdSense) to keep
            the service free. We are not responsible for the content of these
            ads.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">
            7. Third-Party Links
          </h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for their content or practices.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">
            8. Changes to Terms
          </h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            website after changes constitutes acceptance of the new Terms.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">9. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Pakistan. Any disputes shall
            be subject to the exclusive jurisdiction of the courts of Pakistan.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">10. Contact</h2>
          <p>
            For questions about these Terms, contact us at{" "}
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
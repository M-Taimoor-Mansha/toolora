import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Toolora is a free, privacy-first collection of online tools for developers, writers, students, and creators. No sign-up, no tracking, no paywalls.",
  keywords: ["about toolora", "free online tools", "privacy-first tools"],
};

export default function AboutPage() {
  return (
    <main className="container-x py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          About Toolora
        </h1>

        <div className="prose prose-sm mt-8 max-w-none text-ink-2 sm:prose-base">
          <p className="text-lg">
            <strong>Toolora</strong> is a free, privacy-first collection of
            online tools built for developers, writers, students, marketers, and
            creators.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">Our Mission</h2>
          <p>We believe that essential tools should be:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              <strong>Free forever</strong> — no paywalls, no premium tiers.
            </li>
            <li>
              <strong>Private by design</strong> — all processing happens in
              your browser.
            </li>
            <li>
              <strong>No sign-up</strong> — no accounts, no emails, no friction.
            </li>
            <li>
              <strong>Fast and reliable</strong> — tools that just work.
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-ink">What We Offer</h2>
          <p>Toolora currently offers tools in the following categories:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              <strong>Text Tools</strong> — Word counter, case converter, slug
              generator, and more.
            </li>
            <li>
              <strong>Developer Tools</strong> — JSON formatter, Base64 encoder,
              UUID generator, and more.
            </li>
            <li>
              <strong>Image Tools</strong> — Coming soon.
            </li>
            <li>
              <strong>PDF Tools</strong> — Coming soon.
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-ink">
            Privacy First, Always
          </h2>
          <p>
            Unlike most tool websites, Toolora <strong>never</strong> sends your
            data to a server. Everything you type or upload is processed locally
            in your browser. We cannot see, store, or share your data — even if
            we wanted to.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">Built By</h2>
          <p>
            Toolora is independently built and maintained by{" "}
            <strong>M. Taimoor Mansha</strong>. It started as a personal project
            to create the kind of tool website we always wanted — fast, clean,
            and privacy-respecting.
          </p>

          <h2 className="mt-8 text-xl font-bold text-ink">Get in Touch</h2>
          <p>
            Have feedback, a tool suggestion, or a bug report? We&apos;d love to
            hear from you at{" "}
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
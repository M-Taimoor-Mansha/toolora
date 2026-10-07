import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  verification: {
    google: "rE_0grMEyQFfORhUFb1mpRuFE9u1jWkC6NhMte0U8kk",
  },
  other: {
    "google-adsense-account": "ca-pub-5812302044853935",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0d" },
  ],
};

/**
 * Applies the stored theme (or the OS preference) before first paint to
 * prevent a flash of the wrong theme. Kept dependency-free and defensive.
 *
 * - Runs before React hydration (inline script)
 * - Uses suppressHydrationWarning on the tag to avoid mismatch warnings
 */
const themeBootstrapScript = `(function(){try{var t=localStorage.getItem("${SITE.themeStorageKey}");var d=t==="dark"||((t===null||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme bootstrap — must run before paint to avoid FOUC */}
        <script
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
          suppressHydrationWarning
        />

        {/* Google Fonts — preconnect + stylesheet */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Google AdSense — must be a plain <script> tag, not next/script */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5812302044853935"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="flex min-h-screen flex-col bg-canvas font-sans text-ink-2 antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ToastProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
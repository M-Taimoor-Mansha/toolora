import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents browsers from MIME-sniffing a response away from the declared content-type
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Prevents the page from being embedded in iframes (clickjacking protection)
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Controls how much referrer info is sent with requests
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Restricts browser features (camera, mic, geolocation, etc.)
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Forces HTTPS for 2 years (only effective over HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy — allows AdSense, GA4, and fonts
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: Next.js, AdSense, GA4, inline scripts (theme + GA init)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://adservice.google.com https://securepubads.g.doubleclick.net",
      // Styles: Next.js inline + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com data:",
      // Images: AdSense + data URIs (QR codes, base64)
      "img-src 'self' data: blob: https://pagead2.googlesyndication.com https://www.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net",
      // Connections: GA4, AdSense
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net",
      // Frames: AdSense
      "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://securepubads.g.doubleclick.net",
      // Media
      "media-src 'self'",
      // Object
      "object-src 'none'",
      // Base URI
      "base-uri 'self'",
      // Form actions
      "form-action 'self'",
      // Frame ancestors
      "frame-ancestors 'self'",
      // Upgrade insecure requests
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Hide X-Powered-By header (don't reveal Next.js)
  poweredByHeader: false,

  // Turbopack config (replaces webpack for canvas fix)
  turbopack: {
    resolveAlias: {
      canvas: "./empty-module.ts",
    },
  },

  // Security headers for all routes
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
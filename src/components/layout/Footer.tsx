import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { SITE } from "@/lib/site";
import { getCategories, getPopularTools, toolPath } from "@/lib/tools";
import { Logo } from "./Logo";

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <nav aria-label={`Footer — ${title}`}>
      <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-3">
        {title}
      </h3>
      <div className="mt-4 space-y-0.5">{children}</div>
    </nav>
  );
}

const footerLinkClasses =
  "block rounded-lg px-2 py-1.5 text-sm font-medium text-ink-2 transition-all duration-150 hover:translate-x-0.5 hover:text-ink -ml-2";

const platformHighlights = [
  "100% free, no paywalls",
  "No sign-up required",
  "Runs privately in your browser",
  "New tools added regularly",
];

export function Footer() {
  const categories = getCategories();
  const popularTools = getPopularTools().slice(0, 5);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:py-16">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-2">
            {SITE.tagline}. Fast, private and free — your data stays in your browser.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Free forever", "Private", "No sign-up"].map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2/60 px-3 py-1 text-xs font-bold text-ink-2"
              >
                <Icon name="check" className="h-3 w-3 text-brand-600 dark:text-brand-400" />
                {pill}
              </span>
            ))}
          </div>
        </div>

        <FooterColumn title="Categories">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className={footerLinkClasses}>
              {category.name}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Popular tools">
          {popularTools.map((tool) => (
            <Link key={tool.id} href={toolPath(tool)} className={footerLinkClasses}>
              {tool.name}
            </Link>
          ))}
          <Link
            href="/tools"
            className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-bold text-brand-700 transition-colors hover:text-brand-600 -ml-2 dark:text-brand-300 dark:hover:text-brand-200"
          >
            View all tools
            <Icon name="arrowRight" className="h-3.5 w-3.5" />
          </Link>
        </FooterColumn>

        <FooterColumn title="Why Toolora">
          <ul className="space-y-2.5 pt-1">
            {platformHighlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-ink-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/12">
                  <Icon name="check" className="h-3 w-3 text-brand-700 dark:text-brand-300" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </FooterColumn>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-[13px] text-ink-3 sm:flex-row">
          <p className="font-medium">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="font-medium">Free online tools — no sign-up, no installs.</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { CategoryCard } from "@/components/tools/CategoryCard";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolStatusBadge } from "@/components/tools/ToolStatusBadge";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { Search } from "@/components/ui/Search";
import {
  getCategoryBySlug,
  getCategoriesWithCounts,
  getAllTools,
  getFeaturedTools,
  getPopularTools,
  toolPath,
} from "@/lib/tools";

const heroTrustItems = [
  { icon: "check" as const, label: "Free forever" },
  { icon: "lock" as const, label: "Private by design" },
  { icon: "zap" as const, label: "No sign-up" },
];

function SectionHeader({
  eyebrow,
  title,
  description,
  link,
}: {
  eyebrow: string;
  title: string;
  description: string;
  link?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="max-w-xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{description}</p>
      </div>
      {link ? <div className="hidden shrink-0 sm:block">{link}</div> : null}
    </div>
  );
}

function SectionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-lg text-sm font-bold text-brand-700 transition-all duration-150 hover:gap-2.5 hover:text-brand-600 dark:text-brand-300 dark:hover:text-brand-200"
    >
      {children}
      <Icon name="arrowRight" className="h-4 w-4" />
    </Link>
  );
}

export default function HomePage() {
  const allTools = getAllTools();
  const categories = getCategoriesWithCounts();
  const featured = getFeaturedTools();
  const popular = getPopularTools();
  const heroTools = allTools.slice(0, 4);

  return (
    <main id="main">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 text-ink [mask-image:radial-gradient(ellipse_75%_70%_at_50%_0%,black,transparent)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-500/[0.07] to-transparent dark:from-brand-400/[0.06]"
        />
        <div className="container-x relative grid gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:gap-14 lg:py-20">
          <div className="min-w-0">
            <div className="flex animate-fade-up flex-wrap items-center gap-2">
              {heroTrustItems.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold text-ink-2 shadow-sm"
                >
                  <Icon name={item.icon} className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                  {item.label}
                </span>
              ))}
            </div>

            <h1
              className="mt-5 max-w-2xl animate-fade-up text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.02em] text-ink [animation-delay:80ms] sm:text-6xl"
            >
              Every tool you need,{" "}
              <span className="text-brand-600 dark:text-brand-400">free for everyone.</span>
            </h1>
            <p className="mt-5 max-w-xl animate-fade-up text-[17px] leading-relaxed text-ink-2 [animation-delay:160ms]">
              Toolora brings fast, private online tools together in one place — for
              developers, students, writers, marketers, designers and creators. No
              installs, no accounts, no paywalls.
            </p>

            <div className="mt-7 max-w-xl animate-fade-up [animation-delay:240ms]">
              <Search
                action="/tools"
                inputName="q"
                placeholder="Search for a tool… e.g. JSON, QR code, word count"
                label="Search tools"
                size="lg"
              />
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-3">
                  <Icon name="flame" className="h-4 w-4" />
                  Popular:
                </span>
                {popular.slice(0, 3).map((tool) => (
                  <Link
                    key={tool.id}
                    href={toolPath(tool)}
                    className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-bold text-ink-2 shadow-sm transition-all duration-150 hover:-translate-y-px hover:border-brand-500/50 hover:text-brand-700 hover:shadow-card dark:hover:text-brand-300"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Directory preview */}
          <div className="min-w-0 animate-fade-up rounded-2xl border border-line bg-surface p-5 shadow-pop [animation-delay:200ms]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex min-w-0 items-center gap-2 text-sm font-bold tracking-tight text-ink">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                </span>
                <span className="truncate">Fresh from the toolbox</span>
              </h2>
              <span className="shrink-0 rounded-full bg-brand-500/10 px-2.5 py-1 text-[11px] font-extrabold text-brand-700 dark:text-brand-300">
                {allTools.length} tools
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {heroTools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={toolPath(tool)}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-canvas/50 p-2.5 transition-all duration-150 hover:border-brand-500/40 hover:bg-brand-500/[0.06] hover:shadow-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-ink-2 shadow-sm transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <Icon name={tool.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-ink">
                        {tool.name}
                      </span>
                      <span className="block truncate text-xs font-medium text-ink-3">
                        {getCategoryBySlug(tool.category)?.name}
                      </span>
                    </span>
                    <ToolStatusBadge status={tool.status} />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/tools"
              className="mt-3.5 flex items-center justify-center gap-1.5 rounded-xl border border-line py-2.5 text-sm font-bold text-ink-2 transition-all duration-150 hover:border-brand-500/50 hover:text-brand-700 dark:hover:text-brand-300"
            >
              View all tools
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="container-x scroll-mt-24 py-14 sm:py-16">
        <SectionHeader
          eyebrow="Categories"
          title="Browse by category"
          description="Eight shelves, one toolbox — organized around the way you work."
          link={<SectionLink href="/tools">All tools</SectionLink>}
        />
        <div className="mt-7 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <div className="container-x">
        <AdPlaceholder format="banner" slot="toolora-home-mid" />
      </div>

      {/* Featured */}
      <section className="container-x py-14 sm:py-16">
        <SectionHeader
          eyebrow="Hand-picked"
          title="Featured tools"
          description="Worth bookmarking — the tools people reach for first."
        />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {featured.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Full directory */}
      <section className="border-y border-line bg-surface">
        <div className="container-x py-14 sm:py-16">
          <SectionHeader
            eyebrow="Directory"
            title="The full directory"
            description="Everything on Toolora today — with more on the way."
            link={<SectionLink href="/tools">All tools</SectionLink>}
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {allTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Growth banner */}
      <section className="container-x py-14 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-8 shadow-pop sm:p-10">
          <div
            aria-hidden="true"
            className="bg-grid absolute inset-0 text-white opacity-100 [mask-image:radial-gradient(ellipse_60%_80%_at_85%_20%,black,transparent)]"
          />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-brand">
                <Icon name="zap" className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h2 className="text-xl font-extrabold tracking-tight text-white">
                  A growing toolbox, always free
                </h2>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/70">
                  Toolora adds new tools regularly. Everything runs in your browser,
                  nothing is uploaded, and nothing ever costs a cent.
                </p>
              </div>
            </div>
            <ButtonLink href="/tools" variant="primary" size="lg" className="shrink-0">
              Explore tools
              <Icon name="arrowRight" className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Search } from "@/components/ui/Search";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { getCategoriesWithCounts } from "@/lib/tools";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

function navLinkClasses(active: boolean): string {
  return cn(
    "inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
    active
      ? "bg-surface-2 text-ink"
      : "text-ink-2 hover:bg-surface-2 hover:text-ink",
  );
}

const iconButtonClasses =
  "inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink-3 transition-all duration-150 hover:bg-surface-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 active:scale-95";

function CategoriesDropdown({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const categories = getCategoriesWithCounts();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open ]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        className={navLinkClasses(active || open)}
      >
        Categories
        <Icon
          name="chevronDown"
          className={cn("h-4 w-4 text-ink-3 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open ? (
        <div className="absolute left-0 top-11 w-72 animate-scale-in rounded-2xl border border-line bg-surface p-2 shadow-pop">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-surface-2"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-ink-2 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <Icon name={category.icon} className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink">
                  {category.name}
                </span>
                <span className="block text-xs text-ink-3">
                  {category.toolCount} {category.toolCount === 1 ? "tool" : "tools"}
                </span>
              </span>
            </Link>
          ))}
          <div className="mt-1 border-t border-line p-1.5">
            <Link
              href="/tools"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-[13px] font-bold text-brand-700 transition-colors hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-950/40"
            >
              View all tools
              <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const categories = getCategoriesWithCounts();

  const toolsActive = pathname === "/tools" || pathname.startsWith("/tools/");
  const categoriesActive = pathname.startsWith("/categories");

  // Close the mobile menu on Escape and prevent background scroll while open.
  // (Menu links also close it via onClick, so no pathname effect is needed.)
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 shadow-[0_1px_0_rgb(19_19_22/0.02)] backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:font-bold focus:shadow-pop"
      >
        Skip to content
      </a>
      <div className="container-x flex h-16 items-center gap-2">
        <Logo />

        <nav className="ml-4 hidden items-center gap-0.5 lg:flex" aria-label="Main">
          <Link href="/tools" className={navLinkClasses(toolsActive)} aria-current={toolsActive ? "page" : undefined}>
            Tools
          </Link>
          <CategoriesDropdown active={categoriesActive} />
          <Link href="/tools?show=popular" className={navLinkClasses(false)}>
            Popular
          </Link>
          <span
            className="inline-flex h-9 cursor-not-allowed items-center gap-2 rounded-xl px-3 text-sm font-semibold text-ink-3/70"
            title="Blog — coming soon"
            aria-disabled="true"
          >
            Blog
            <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-ink-3">
              Soon
            </span>
          </span>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <Link
            href="/tools"
            aria-label="Search tools"
            className={cn(iconButtonClasses, "lg:hidden")}
          >
            <Icon name="search" className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href="/tools"
            className="mr-1 hidden h-9 items-center gap-2.5 rounded-xl border border-line bg-surface-2/60 py-0 pl-3 pr-2 text-sm text-ink-3 transition-all duration-150 hover:border-line-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:inline-flex"
          >
            <span className="flex items-center gap-2">
              <Icon name="search" className="h-4 w-4" />
              <span className="font-medium">Search tools…</span>
            </span>
            <kbd className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[11px] font-medium text-ink-3">
              /
            </kbd>
          </Link>
          <ThemeToggle />
          <ButtonLink href="/tools" variant="primary" size="sm" className="ml-1 hidden h-9 px-4 xl:inline-flex">
            Browse tools
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={cn(iconButtonClasses, "lg:hidden")}
          >
            <Icon name={mobileOpen ? "x" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-surface animate-fade-in lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
            <Search
              action="/tools"
              inputName="q"
              placeholder="Search tools…"
              label="Search tools"
              size="md"
            />

            <div className="mt-3 grid grid-cols-2 gap-1.5">
              <Link
                href="/tools"
                onClick={closeMobileMenu}
                className="flex items-center gap-2.5 rounded-xl border border-line px-3.5 py-3 text-sm font-bold text-ink transition-colors hover:border-line-strong hover:bg-surface-2"
              >
                <Icon name="layoutGrid" className="h-4.5 w-4.5 text-brand-600 dark:text-brand-400" />
                Tools
              </Link>
              <Link
                href="/tools?show=popular"
                onClick={closeMobileMenu}
                className="flex items-center gap-2.5 rounded-xl border border-line px-3.5 py-3 text-sm font-bold text-ink transition-colors hover:border-line-strong hover:bg-surface-2"
              >
                <Icon name="flame" className="h-4.5 w-4.5 text-brand-600 dark:text-brand-400" />
                Popular
              </Link>
            </div>

            <p className="mb-1 mt-5 px-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-3">
              Categories
            </p>
            <div className="grid gap-1 sm:grid-cols-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-surface-2"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-ink-2">
                    <Icon name={category.icon} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">
                    {category.name}
                  </span>
                  <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-bold text-ink-3">
                    {category.toolCount}
                  </span>
                </Link>
              ))}
            </div>

            <ButtonLink href="/tools" variant="primary" className="mt-4 w-full" onClick={closeMobileMenu}>
              Browse all tools
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

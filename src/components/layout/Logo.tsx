import Link from "next/link";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

/** Brand mark + wordmark. Name comes from SITE, so rebranding is one edit. */
export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        className,
      )}
      aria-label={`${SITE.name} — home`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-brand-600 text-white shadow-brand transition-all duration-200 group-hover:scale-[1.06] group-hover:bg-brand-500">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
          <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" />
          <circle cx="19" cy="5" r="1.8" opacity="0.75" />
        </svg>
      </span>
      {showWordmark ? (
        <span className="text-[17px] font-extrabold tracking-tight text-ink">
          {SITE.name.slice(0, 5)}
          <span className="text-brand-600 dark:text-brand-400">{SITE.name.slice(5)}</span>
        </span>
      ) : null}
    </Link>
  );
}

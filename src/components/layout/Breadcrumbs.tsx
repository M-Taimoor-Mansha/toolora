import Link from "next/link";
import { Fragment } from "react";
import { Icon } from "@/components/icons";

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page (last item). */
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] font-medium text-ink-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 ? (
                <Icon
                  name="chevronRight"
                  className="h-3.5 w-3.5 shrink-0 text-line-strong"
                />
              ) : null}
              <li className="flex min-w-0 items-center">
                {index === 0 && item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 rounded-md transition-colors hover:text-ink"
                  >
                    <Icon name="home" className="h-3.5 w-3.5" />
                    {item.label}
                  </Link>
                ) : item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="rounded-md transition-colors hover:text-ink hover:underline hover:underline-offset-4"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className="truncate font-semibold text-ink">
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

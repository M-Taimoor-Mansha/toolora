import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" className="container-x flex flex-col items-center py-20 text-center sm:py-28">
      <span className="flex h-14 w-14 animate-fade-in items-center justify-center rounded-2xl bg-surface-2 text-ink-3 shadow-sm">
        <Icon name="search" className="h-7 w-7" />
      </span>
      <p className="mt-6 animate-fade-up rounded-full bg-brand-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-brand-700 dark:text-brand-300">
        404
      </p>
      <h1 className="mt-3 animate-fade-up text-3xl font-extrabold tracking-tight text-ink [animation-delay:80ms] sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md animate-fade-up text-[15px] leading-relaxed text-ink-2 [animation-delay:160ms]">
        The page you are looking for does not exist or has moved. Head back to the
        toolbox and try again.
      </p>
      <div className="mt-8 flex animate-fade-up flex-wrap justify-center gap-3 [animation-delay:240ms]">
        <ButtonLink href="/" variant="primary">
          Go home
        </ButtonLink>
        <ButtonLink href="/tools" variant="outline">
          Browse all tools
        </ButtonLink>
      </div>
    </main>
  );
}

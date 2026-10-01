"use client";

import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";
import { nextThemePreference, type ThemePreference } from "@/lib/theme";
import { useTheme } from "./ThemeProvider";

const labels: Record<ThemePreference, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

const icons: Record<ThemePreference, IconName> = {
  light: "sun",
  dark: "moon",
  system: "monitor",
};

/**
 * Cycles light → dark → system. The icon reflects the current preference and
 * the tooltip/aria-label always says what a click will switch to.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { preference, setPreference } = useTheme();
  const next = nextThemePreference(preference);

  return (
    <button
      type="button"
      onClick={() => setPreference(next)}
      title={`Theme: ${labels[preference]} — click for ${labels[next]}`}
      aria-label={`Current theme: ${labels[preference]}. Activate to switch to ${labels[next]}.`}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink-3 transition-all duration-150 hover:bg-surface-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 active:scale-95",
        className,
      )}
    >
      <Icon
        key={preference}
        name={icons[preference]}
        className="h-[18px] w-[18px] animate-fade-in"
      />
    </button>
  );
}

"use client";

import { Icon } from "@/components/icons";

interface UpgradePromptProps {
  title: string;
  message: string;
  feature?: string;
}

export function UpgradePrompt({ title, message }: UpgradePromptProps) {
  return (
    <div className="rounded-2xl border-2 border-brand-500/40 bg-brand-50/50 p-6 dark:bg-brand-950/20">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white">
          <Icon name="arrowUpRight" className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-ink">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{message}</p>
          <button
            disabled
            className="mt-4 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white opacity-60"
          >
            Upgrade to Pro (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
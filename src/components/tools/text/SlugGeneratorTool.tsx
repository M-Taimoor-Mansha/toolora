"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { CodeTextarea } from "../dev/CodeTextarea";
import { CopyButton } from "../dev/CopyButton";
import { ToolActions } from "../dev/ToolActions";
import { ValidationMessage } from "../dev/ValidationMessage";
import { generateSlug, type SlugSeparator } from "@/lib/text-tools";
import { cn } from "@/lib/cn";

const SEPARATORS: { value: SlugSeparator; label: string }[] = [
  { value: "-", label: "dashes" },
  { value: "_", label: "underscores" },
];

const SAMPLE_TITLE = "Best Online Tools & Utilities for Developers (Free, 2026 Edition!)";

export function SlugGeneratorTool() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState<SlugSeparator>("-");
  const [maxLength, setMaxLength] = useState(60);

  const slug = useMemo(
    () => generateSlug(input, { separator, maxLength }),
    [input, separator, maxLength],
  );

  const inputTrimmed = input.trim();
  const nothingUsable = Boolean(inputTrimmed) && !slug;
  const slugPreview = slug || "";

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Title or Text"
        mono={false}
        value={input}
        onChange={setInput}
        minHeightClass="min-h-[110px] sm:min-h-[130px]"
        placeholder="Paste an article title, heading or sentence to convert into a URL slug…"
        headerSlot={
          <button
            type="button"
            onClick={() => setInput(SAMPLE_TITLE)}
            className="text-xs font-bold text-brand-700 transition-colors hover:text-brand-600 dark:text-brand-300 dark:hover:text-brand-200"
          >
            Load sample
          </button>
        }
      />

      <ToolActions
        trailing={
          <>
            <div
              role="group"
              aria-label="Slug separator"
              className="inline-flex items-center rounded-xl border border-line bg-surface-2/60 p-1"
            >
              {SEPARATORS.map((option) => {
                const active = separator === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSeparator(option.value)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-lg px-2.5 py-1 font-mono text-xs font-bold transition-all duration-150",
                      active ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <label className="inline-flex select-none items-center gap-2 rounded-xl border border-line bg-surface-2/50 px-3 py-1.5 text-xs font-bold text-ink-2">
              <span>Max length</span>
              <input
                type="number"
                min={0}
                max={200}
                value={maxLength}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  setMaxLength(Number.isFinite(next) ? Math.max(0, Math.min(200, next)) : 60);
                }}
                className="w-14 rounded-lg border border-line bg-surface px-2 py-0.5 text-center font-mono text-xs text-ink focus:border-brand-500 focus:outline-none"
                aria-label="Maximum slug length in characters (0 for unlimited)"
              />
            </label>
            <Button variant="ghost" size="sm" onClick={() => setInput("")} disabled={!input}>
              <Icon name="rotateCcw" className="h-4 w-4" />
              <span>Reset</span>
            </Button>
          </>
        }
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-3">
          <Icon name="link" className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          Slug updates live as you type
        </span>
      </ToolActions>

      {nothingUsable ? (
        <ValidationMessage
          variant="info"
          title="No usable characters found"
          description="This input contains no A–Z letters or digits after filtering. Slugs keep ASCII letters and numbers — accented letters are transliterated (café → cafe)."
        />
      ) : null}

      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-2/50 px-4 py-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-ink-2">
              Generated slug
            </span>
            {slug ? (
              <span className="rounded-full bg-surface px-2.5 py-0.5 font-mono text-[11px] font-semibold text-ink-3 ring-1 ring-line">
                {slug.length} chars{maxLength > 0 ? ` / max ${maxLength}` : ""}
              </span>
            ) : null}
          </div>
          <CopyButton value={slugPreview} label="Copy slug" toastMessage="Slug copied to clipboard" />
        </div>

        <div className="bg-surface p-4 sm:p-5">
          {slug ? (
            <p
              className="break-all font-mono text-base font-bold leading-relaxed text-brand-700 dark:text-brand-300 sm:text-lg"
              aria-live="polite"
            >
              {slug}
            </p>
          ) : (
            <p className="text-sm text-ink-3">
              Your URL-friendly slug will appear here — lowercase, {separator === "-" ? "hyphenated" : "underscored"},
              punctuation-free and ASCII safe.
            </p>
          )}
        </div>
      </div>

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

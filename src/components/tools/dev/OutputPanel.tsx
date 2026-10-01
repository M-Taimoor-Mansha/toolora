"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { downloadTextFile, formatBytes, getByteLength } from "@/lib/dev-tools";
import { CopyButton } from "./CopyButton";

interface OutputPanelProps {
  label?: string;
  value: string;
  emptyTitle?: string;
  emptyDescription?: string;
  /** Optional filename to enable a Download button (e.g. "formatted.json"). */
  downloadFilename?: string;
  downloadMimeType?: string;
  /** Optional extra metadata badges in the header. */
  badges?: ReactNode;
  /** Monospace typography — default true; text tools pass false for prose. */
  mono?: boolean;
  minHeightClass?: string;
  className?: string;
}

export function OutputPanel({
  label = "Output",
  value,
  emptyTitle = "Output will appear here",
  emptyDescription = "Enter your input above and run the tool to inspect or copy the result.",
  downloadFilename,
  downloadMimeType = "text/plain;charset=utf-8",
  badges,
  mono = true,
  minHeightClass = "min-h-[200px] sm:min-h-[240px]",
  className,
}: OutputPanelProps) {
  const { toast } = useToast();
  const hasValue = value.length > 0;
  const byteSize = hasValue ? formatBytes(getByteLength(value)) : null;

  function handleDownload() {
    if (!hasValue || !downloadFilename) return;
    downloadTextFile(value, downloadFilename, downloadMimeType);
    toast(`Downloaded ${downloadFilename}`, "success");
  }

  return (
    <div className={cn("card overflow-hidden", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-2/50 px-4 py-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-ink-2">
            {label}
          </span>
          {byteSize ? (
            <span className="rounded-full bg-surface px-2.5 py-0.5 font-mono text-[11px] font-semibold text-ink-3 ring-1 ring-line">
              {value.length.toLocaleString()} chars · {byteSize}
            </span>
          ) : null}
          {badges}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {downloadFilename ? (
            <Button
              variant="outline"
              size="sm"
              disabled={!hasValue}
              onClick={handleDownload}
            >
              <Icon name="download" className="h-4 w-4" />
              <span>Download</span>
            </Button>
          ) : null}
          <CopyButton value={value} />
        </div>
      </div>

      {hasValue ? (
        <pre
          tabIndex={0}
          aria-label={label}
          className={cn(
            "w-full overflow-x-auto whitespace-pre-wrap break-words bg-surface p-4 leading-relaxed text-ink focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500/35",
            mono ? "font-mono text-[13px] sm:text-sm" : "text-[15px]",
            minHeightClass,
          )}
        >
          {value}
        </pre>
      ) : (
        <div
          className={cn(
            "flex flex-col items-center justify-center bg-surface/60 px-6 py-10 text-center",
            minHeightClass,
          )}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-2 text-ink-3">
            <Icon name="code" className="h-5 w-5" />
          </span>
          <p className="mt-3 text-sm font-bold text-ink">{emptyTitle}</p>
          <p className="mt-1 max-w-sm text-xs leading-relaxed text-ink-3">
            {emptyDescription}
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { downloadTextFile, formatUuid, generateUuidV4 } from "@/lib/dev-tools";
import { CopyButton } from "./CopyButton";
import { ToolActions } from "./ToolActions";

const COUNT_PRESETS = [1, 5, 10, 25] as const;

export function UuidGeneratorTool() {
  const [count, setCount] = useState<number>(5);
  const [rawUuids, setRawUuids] = useState<string[]>([]);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const { toast } = useToast();

  function generateBatch(batchSize: number = count) {
    const safeCount = Math.max(1, Math.min(100, batchSize));
    const list = Array.from({ length: safeCount }, () => generateUuidV4());
    setCount(safeCount);
    setRawUuids(list);
  }

  function handleReset() {
    setRawUuids([]);
  }

  const formattedUuids = rawUuids.map((id) =>
    formatUuid(id, { uppercase, hyphens }),
  );
  const allJoined = formattedUuids.join("\n");

  function handleDownload() {
    if (formattedUuids.length === 0) return;
    downloadTextFile(allJoined, "uuids.txt");
    toast("Downloaded uuids.txt", "success");
  }

  return (
    <div className="space-y-5">
      {/* Configuration & primary generation bar */}
      <div className="card space-y-4 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-extrabold tracking-tight text-ink">
              UUID v4 Generator (RFC 4122)
            </h2>
            <p className="mt-0.5 text-xs text-ink-3">
              Cryptographically random version 4 UUIDs generated locally via Web Crypto API.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer select-none items-center gap-2 rounded-xl border border-line bg-surface-2/50 px-3 py-1.5 text-xs font-bold text-ink-2">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(event) => setUppercase(event.target.checked)}
                className="h-3.5 w-3.5 rounded accent-brand-600"
              />
              <span>Uppercase</span>
            </label>
            <label className="inline-flex cursor-pointer select-none items-center gap-2 rounded-xl border border-line bg-surface-2/50 px-3 py-1.5 text-xs font-bold text-ink-2">
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(event) => setHyphens(event.target.checked)}
                className="h-3.5 w-3.5 rounded accent-brand-600"
              />
              <span>Hyphens</span>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-ink-3">Batch size:</span>
            <div
              role="group"
              aria-label="Number of UUIDs to generate"
              className="inline-flex items-center rounded-xl border border-line bg-surface-2/60 p-1"
            >
              {COUNT_PRESETS.map((preset) => {
                const active = count === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => generateBatch(preset)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-lg px-3 py-1 text-xs font-bold transition-all duration-150",
                      active
                        ? "bg-surface text-ink shadow-sm"
                        : "text-ink-3 hover:text-ink",
                    )}
                  >
                    {preset === 1 ? "1 UUID" : `${preset} UUIDs`}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary" onClick={() => generateBatch(1)}>
              <Icon name="fingerprint" className="h-4 w-4" />
              <span>Generate 1 UUID</span>
            </Button>
            <Button variant="secondary" onClick={() => generateBatch(count)}>
              <Icon name="refreshCw" className="h-4 w-4" />
              <span>
                {rawUuids.length > 0 ? `Regenerate (${count})` : `Generate ${count} UUIDs`}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk actions bar */}
      <ToolActions
        trailing={
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={formattedUuids.length === 0}
          >
            <Icon name="rotateCcw" className="h-4 w-4" />
            <span>Clear</span>
          </Button>
        }
      >
        <CopyButton
          value={allJoined}
          label={formattedUuids.length > 1 ? `Copy all (${formattedUuids.length})` : "Copy UUID"}
          copiedLabel="Copied all"
          toastMessage={
            formattedUuids.length > 1
              ? `Copied ${formattedUuids.length} UUIDs to clipboard`
              : "Copied UUID to clipboard"
          }
          variant="outline"
          size="sm"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={formattedUuids.length === 0}
        >
          <Icon name="download" className="h-4 w-4" />
          <span>Download .txt</span>
        </Button>
      </ToolActions>

      {/* Output list */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-line bg-surface-2/50 px-4 py-2.5">
          <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-ink-2">
            Generated UUIDs
          </span>
          <span className="rounded-full bg-surface px-2.5 py-0.5 font-mono text-[11px] font-bold text-ink-3 ring-1 ring-line">
            {formattedUuids.length} {formattedUuids.length === 1 ? "item" : "items"}
          </span>
        </div>

        {formattedUuids.length > 0 ? (
          <ul className="divide-y divide-line" aria-label="Generated UUID list">
            {formattedUuids.map((uuid, index) => (
              <li
                key={`${rawUuids[index]}-${index}`}
                className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-surface-2/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-6 shrink-0 font-mono text-xs font-semibold text-ink-3">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <code className="truncate font-mono text-[13px] font-semibold text-ink sm:text-sm">
                    {uuid}
                  </code>
                </div>
                <CopyButton
                  value={uuid}
                  label="Copy"
                  toastMessage={`Copied ${uuid}`}
                  size="sm"
                  variant="ghost"
                  className="shrink-0"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-2 text-ink-3">
              <Icon name="fingerprint" className="h-5 w-5" />
            </span>
            <p className="mt-3 text-sm font-bold text-ink">Ready to generate UUIDs</p>
            <p className="mt-1 max-w-sm text-xs leading-relaxed text-ink-3">
              Click Generate 1 UUID or pick a batch size (1, 5, 10, 25) above to create
              standards-compliant RFC 4122 v4 identifiers right in your browser.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button variant="primary" size="sm" onClick={() => generateBatch(1)}>
                Generate 1 UUID
              </Button>
              <Button variant="outline" size="sm" onClick={() => generateBatch(5)}>
                Generate 5 UUIDs
              </Button>
            </div>
          </div>
        )}
      </div>

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

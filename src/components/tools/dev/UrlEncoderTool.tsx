"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { encodeUrlText, type UrlEncodeMode } from "@/lib/dev-tools";
import { CodeTextarea } from "./CodeTextarea";
import { OutputPanel } from "./OutputPanel";
import { ToolActions } from "./ToolActions";
import { ValidationMessage } from "./ValidationMessage";

const SAMPLE_URL_TEXT =
  "https://toolora.example.com/search?q=json formatter & filter=developer+tools#top";

const MODE_OPTIONS: { value: UrlEncodeMode; label: string; hint: string }[] = [
  {
    value: "component",
    label: "Component",
    hint: "Encodes all special characters (best for query parameter values)",
  },
  {
    value: "uri",
    label: "Full URL",
    hint: "Preserves :, /, ?, & and = so a complete URL stays addressable",
  },
];

export function UrlEncoderTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<UrlEncodeMode>("component");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleEncode(source: string = input, nextMode: UrlEncodeMode = mode) {
    const result = encodeUrlText(source, nextMode);
    if (!result.ok) {
      setError(result.error);
      setOutput("");
      return;
    }
    setError(null);
    setOutput(result.output);
  }

  function handleModeChange(nextMode: UrlEncodeMode) {
    setMode(nextMode);
    if (input) {
      handleEncode(input, nextMode);
    }
  }

  function handleLoadSample() {
    setInput(SAMPLE_URL_TEXT);
    handleEncode(SAMPLE_URL_TEXT, mode);
  }

  function handleReset() {
    setInput("");
    setOutput("");
    setError(null);
  }

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Text or URL Input"
        value={input}
        onChange={(next) => {
          setInput(next);
          if (error) setError(null);
        }}
        invalid={Boolean(error)}
        minHeightClass="min-h-[170px] sm:min-h-[200px]"
        placeholder="Enter a query string, parameter value, or full URL to percent-encode…"
        headerSlot={
          <button
            type="button"
            onClick={handleLoadSample}
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
              aria-label="Encoding mode"
              className="inline-flex items-center rounded-xl border border-line bg-surface-2/60 p-1"
            >
              {MODE_OPTIONS.map((option) => {
                const active = mode === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleModeChange(option.value)}
                    aria-pressed={active}
                    title={option.hint}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-xs font-bold transition-all duration-150",
                      active
                        ? "bg-surface text-ink shadow-sm"
                        : "text-ink-3 hover:text-ink",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              disabled={!input && !output && !error}
            >
              <Icon name="rotateCcw" className="h-4 w-4" />
              <span>Reset</span>
            </Button>
          </>
        }
      >
        <Button variant="primary" onClick={() => handleEncode(input, mode)}>
          <Icon name="link" className="h-4 w-4" />
          <span>Encode URL</span>
        </Button>
      </ToolActions>

      {error ? (
        <ValidationMessage variant="error" title="Could not encode input" description={error} />
      ) : null}

      <OutputPanel
        label="URL-Encoded Output"
        value={output}
        minHeightClass="min-h-[160px] sm:min-h-[190px]"
        emptyTitle="Encoded URL output will appear here"
        emptyDescription="Enter text or a URL above and click Encode URL to convert unsafe characters into %XX format."
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

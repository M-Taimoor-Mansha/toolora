"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  formatJson,
  minifyJson,
  type JsonErrorDetails,
  type JsonIndentOption,
} from "@/lib/dev-tools";
import { CodeTextarea } from "./CodeTextarea";
import { OutputPanel } from "./OutputPanel";
import { ToolActions } from "./ToolActions";
import { ValidationMessage } from "./ValidationMessage";

const SAMPLE_JSON = `{"name":"Toolora","tagline":"Free Online Tools for Everyone","version":1,"privacy":{"localExecution":true,"tracking":false},"categories":["Developer Tools","Text Tools","Image Tools","Calculators"]}`;

const INDENT_OPTIONS: { value: JsonIndentOption; label: string }[] = [
  { value: "2", label: "2 spaces" },
  { value: "4", label: "4 spaces" },
  { value: "tab", label: "Tabs" },
];

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState<JsonIndentOption>("2");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<JsonErrorDetails | null>(null);
  const [modeLabel, setModeLabel] = useState<"Formatted" | "Minified" | null>(null);

  function handleFormat(nextIndent: JsonIndentOption = indent) {
    const result = formatJson(input, nextIndent);
    if (!result.ok) {
      setError(result.error);
      setOutput("");
      setModeLabel(null);
      return;
    }
    setError(null);
    setOutput(result.output);
    setModeLabel("Formatted");
  }

  function handleMinifyShortcut() {
    const result = minifyJson(input);
    if (!result.ok) {
      setError(result.error);
      setOutput("");
      setModeLabel(null);
      return;
    }
    setError(null);
    setOutput(result.output);
    setModeLabel("Minified");
  }

  function handleIndentChange(nextIndent: JsonIndentOption) {
    setIndent(nextIndent);
    if (input.trim()) {
      handleFormat(nextIndent);
    }
  }

  function handleLoadSample() {
    setInput(SAMPLE_JSON);
    const result = formatJson(SAMPLE_JSON, indent);
    if (result.ok) {
      setOutput(result.output);
      setError(null);
      setModeLabel("Formatted");
    }
  }

  function handleReset() {
    setInput("");
    setOutput("");
    setError(null);
    setModeLabel(null);
  }

  const errorBadge =
    error && error.line
      ? `Line ${error.line}${error.column ? ` · Column ${error.column}` : ""}`
      : undefined;

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="JSON Input"
        value={input}
        onChange={(next) => {
          setInput(next);
          if (error) setError(null);
        }}
        invalid={Boolean(error)}
        placeholder='Paste raw or compact JSON here… e.g. {"hello": "world"}'
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
              aria-label="Indentation"
              className="inline-flex items-center rounded-xl border border-line bg-surface-2/60 p-1"
            >
              {INDENT_OPTIONS.map((option) => {
                const active = indent === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleIndentChange(option.value)}
                    aria-pressed={active}
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
        <Button variant="primary" onClick={() => handleFormat(indent)}>
          <Icon name="braces" className="h-4 w-4" />
          <span>Format / Beautify</span>
        </Button>
        <Button variant="outline" onClick={handleMinifyShortcut}>
          <Icon name="minimize" className="h-4 w-4" />
          <span>Minify</span>
        </Button>
      </ToolActions>

      {error ? (
        <ValidationMessage
          variant="error"
          title="Invalid JSON"
          description={error.message}
          badge={errorBadge}
        />
      ) : null}

      <OutputPanel
        label={modeLabel ? `${modeLabel} JSON` : "Formatted JSON"}
        value={output}
        downloadFilename="formatted.json"
        downloadMimeType="application/json;charset=utf-8"
        emptyTitle="Formatted JSON will appear here"
        emptyDescription="Paste your JSON above and click Format / Beautify to validate and pretty-print it."
        badges={
          output ? (
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300">
              Valid JSON
            </span>
          ) : null
        }
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

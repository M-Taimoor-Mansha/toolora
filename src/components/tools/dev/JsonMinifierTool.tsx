"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { formatBytes, minifyJson, type JsonErrorDetails } from "@/lib/dev-tools";
import { CodeTextarea } from "./CodeTextarea";
import { OutputPanel } from "./OutputPanel";
import { ToolActions } from "./ToolActions";
import { ValidationMessage } from "./ValidationMessage";

const PRETTY_SAMPLE = `{
  "app": "Toolora",
  "environment": "production",
  "features": [
    "json-formatter",
    "json-validator",
    "json-minifier"
  ],
  "settings": {
    "compress": true,
    "indent": 0
  }
}`;

interface MinifyStats {
  originalBytes: number;
  minifiedBytes: number;
  savedBytes: number;
  savedPercent: number;
}

export function JsonMinifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState<MinifyStats | null>(null);
  const [error, setError] = useState<JsonErrorDetails | null>(null);

  function runMinify(source: string = input) {
    const result = minifyJson(source);
    if (!result.ok) {
      setError(result.error);
      setOutput("");
      setStats(null);
      return;
    }
    setError(null);
    setOutput(result.output);
    setStats({
      originalBytes: result.originalBytes,
      minifiedBytes: result.minifiedBytes,
      savedBytes: result.savedBytes,
      savedPercent: result.savedPercent,
    });
  }

  function handleLoadSample() {
    setInput(PRETTY_SAMPLE);
    runMinify(PRETTY_SAMPLE);
  }

  function handleReset() {
    setInput("");
    setOutput("");
    setStats(null);
    setError(null);
  }

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
        placeholder="Paste formatted JSON here to remove whitespace and line breaks…"
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
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={!input && !output && !error}
          >
            <Icon name="rotateCcw" className="h-4 w-4" />
            <span>Reset</span>
          </Button>
        }
      >
        <Button variant="primary" onClick={() => runMinify(input)}>
          <Icon name="minimize" className="h-4 w-4" />
          <span>Minify JSON</span>
        </Button>
      </ToolActions>

      {error ? (
        <ValidationMessage
          variant="error"
          title="Cannot minify invalid JSON"
          description={error.message}
          badge={
            error.line
              ? `Line ${error.line}${error.column ? ` · Column ${error.column}` : ""}`
              : undefined
          }
        />
      ) : null}

      {stats ? (
        <dl className="grid grid-cols-3 gap-3">
          <div className="card p-3.5">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-3">
              Original size
            </dt>
            <dd className="mt-1 font-mono text-sm font-extrabold text-ink">
              {formatBytes(stats.originalBytes)}
            </dd>
          </div>
          <div className="card p-3.5">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-3">
              Minified size
            </dt>
            <dd className="mt-1 font-mono text-sm font-extrabold text-ink">
              {formatBytes(stats.minifiedBytes)}
            </dd>
          </div>
          <div className="card p-3.5">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-3">
              Saved
            </dt>
            <dd className="mt-1 font-mono text-sm font-extrabold text-brand-700 dark:text-brand-300">
              {formatBytes(stats.savedBytes)} ({stats.savedPercent}%)
            </dd>
          </div>
        </dl>
      ) : null}

      <OutputPanel
        label="Minified JSON"
        value={output}
        downloadFilename="minified.json"
        downloadMimeType="application/json;charset=utf-8"
        emptyTitle="Minified JSON will appear here"
        emptyDescription="Paste valid JSON above and click Minify JSON to strip all unnecessary whitespace."
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

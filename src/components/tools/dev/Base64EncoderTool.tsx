"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { encodeBase64Utf8 } from "@/lib/dev-tools";
import { CodeTextarea } from "./CodeTextarea";
import { OutputPanel } from "./OutputPanel";
import { ToolActions } from "./ToolActions";
import { ValidationMessage } from "./ValidationMessage";

const SAMPLE_TEXT = "Toolora — Free Online Tools for Everyone ✓ (UTF-8 safe: café, 日本語, 🚀)";

export function Base64EncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleEncode(source: string = input) {
    const result = encodeBase64Utf8(source);
    if (!result.ok) {
      setError(result.error);
      setOutput("");
      return;
    }
    setError(null);
    setOutput(result.output);
  }

  function handleLoadSample() {
    setInput(SAMPLE_TEXT);
    handleEncode(SAMPLE_TEXT);
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError(null);
  }

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Plain Text Input (UTF-8)"
        value={input}
        onChange={(next) => {
          setInput(next);
          if (error) setError(null);
        }}
        invalid={Boolean(error)}
        minHeightClass="min-h-[180px] sm:min-h-[220px]"
        placeholder="Type or paste plain text (including Unicode and emojis) to encode into Base64…"
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
            onClick={handleClear}
            disabled={!input && !output && !error}
          >
            <Icon name="rotateCcw" className="h-4 w-4" />
            <span>Clear</span>
          </Button>
        }
      >
        <Button variant="primary" onClick={() => handleEncode(input)}>
          <Icon name="binary" className="h-4 w-4" />
          <span>Encode to Base64</span>
        </Button>
      </ToolActions>

      {error ? (
        <ValidationMessage variant="error" title="Encoding notice" description={error} />
      ) : null}

      <OutputPanel
        label="Base64 Output"
        value={output}
        minHeightClass="min-h-[160px] sm:min-h-[190px]"
        emptyTitle="Base64 output will appear here"
        emptyDescription="Enter any text above and click Encode to Base64 to get a UTF-8 safe Base64 string."
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

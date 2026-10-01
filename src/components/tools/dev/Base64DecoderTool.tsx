"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { decodeBase64Utf8 } from "@/lib/dev-tools";
import { CodeTextarea } from "./CodeTextarea";
import { OutputPanel } from "./OutputPanel";
import { ToolActions } from "./ToolActions";
import { ValidationMessage } from "./ValidationMessage";

const SAMPLE_BASE64 =
  "VG9vbG9yYSDigJQgRnJlZSBPbmxpbmUgVG9vbHMgZm9yIEV2ZXJ5b25l ✓IChVVEYtOCBzYWZlOiBjYWbDqSwg5pel5pys6KqeLCDwn5qAKQ==".replace(
    " ✓",
    "4pyT",
  );

export function Base64DecoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleDecode(source: string = input) {
    const result = decodeBase64Utf8(source);
    if (!result.ok) {
      setError(result.error);
      setOutput("");
      return;
    }
    setError(null);
    setOutput(result.output);
  }

  function handleLoadSample() {
    setInput(SAMPLE_BASE64);
    handleDecode(SAMPLE_BASE64);
  }

  function handleReset() {
    setInput("");
    setOutput("");
    setError(null);
  }

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Base64 Input"
        value={input}
        onChange={(next) => {
          setInput(next);
          if (error) setError(null);
        }}
        invalid={Boolean(error)}
        minHeightClass="min-h-[180px] sm:min-h-[220px]"
        placeholder="Paste a standard or URL-safe Base64 string here to decode…"
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
        <Button variant="primary" onClick={() => handleDecode(input)}>
          <Icon name="binary" className="h-4 w-4" />
          <span>Decode Base64</span>
        </Button>
      </ToolActions>

      {error ? (
        <ValidationMessage
          variant="error"
          title="Invalid Base64 Input"
          description={error}
        />
      ) : null}

      <OutputPanel
        label="Decoded Text (UTF-8)"
        value={output}
        minHeightClass="min-h-[160px] sm:min-h-[190px]"
        emptyTitle="Decoded text will appear here"
        emptyDescription="Paste a valid Base64 string above and click Decode Base64 to inspect the decoded UTF-8 text."
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

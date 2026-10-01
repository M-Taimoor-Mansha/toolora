"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { decodeUrlText } from "@/lib/dev-tools";
import { CodeTextarea } from "./CodeTextarea";
import { OutputPanel } from "./OutputPanel";
import { ToolActions } from "./ToolActions";
import { ValidationMessage } from "./ValidationMessage";

const SAMPLE_ENCODED =
  "https%3A%2F%2Ftoolora.example.com%2Fsearch%3Fq%3Djson+formatter+%26+filter%3Ddeveloper%2Btools%23top";

export function UrlDecoderTool() {
  const [input, setInput] = useState("");
  const [plusAsSpace, setPlusAsSpace] = useState(true);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleDecode(source: string = input, nextPlus: boolean = plusAsSpace) {
    const result = decodeUrlText(source, nextPlus);
    if (!result.ok) {
      setError(result.error);
      setOutput("");
      return;
    }
    setError(null);
    setOutput(result.output);
  }

  function handleTogglePlus(checked: boolean) {
    setPlusAsSpace(checked);
    if (input) {
      handleDecode(input, checked);
    }
  }

  function handleLoadSample() {
    setInput(SAMPLE_ENCODED);
    handleDecode(SAMPLE_ENCODED, plusAsSpace);
  }

  function handleReset() {
    setInput("");
    setOutput("");
    setError(null);
  }

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Encoded URL or Text Input"
        value={input}
        onChange={(next) => {
          setInput(next);
          if (error) setError(null);
        }}
        invalid={Boolean(error)}
        minHeightClass="min-h-[170px] sm:min-h-[200px]"
        placeholder="Paste a percent-encoded URL or query string (e.g. hello%20world) to decode…"
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
            <label className="inline-flex cursor-pointer select-none items-center gap-2 rounded-xl border border-line bg-surface-2/50 px-3 py-1.5 text-xs font-bold text-ink-2">
              <input
                type="checkbox"
                checked={plusAsSpace}
                onChange={(event) => handleTogglePlus(event.target.checked)}
                className="h-3.5 w-3.5 rounded accent-brand-600"
              />
              <span>Decode &apos;+&apos; as space</span>
            </label>
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
        <Button variant="primary" onClick={() => handleDecode(input, plusAsSpace)}>
          <Icon name="link" className="h-4 w-4" />
          <span>Decode URL</span>
        </Button>
      </ToolActions>

      {error ? (
        <ValidationMessage
          variant="error"
          title="Malformed URL Encoding"
          description={error}
        />
      ) : null}

      <OutputPanel
        label="Decoded Output"
        value={output}
        minHeightClass="min-h-[160px] sm:min-h-[190px]"
        emptyTitle="Decoded URL or text will appear here"
        emptyDescription="Paste percent-encoded text above and click Decode URL to restore readable characters."
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

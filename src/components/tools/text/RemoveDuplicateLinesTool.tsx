"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { CodeTextarea } from "../dev/CodeTextarea";
import { OutputPanel } from "../dev/OutputPanel";
import { ToolActions } from "../dev/ToolActions";
import { OptionCheckbox } from "./OptionCheckbox";
import { TextStatsPanel } from "./TextStatsPanel";
import { dedupeLines } from "@/lib/text-tools";

const SAMPLE_LINES = `json-formatter
word-counter
JSON-FORMATTER
uc-generator
word-counter
age-calculator
json-formatter`;

export function RemoveDuplicateLinesTool() {
  const [input, setInput] = useState("");
  const [trimLines, setTrimLines] = useState(true);
  const [caseInsensitive, setCaseInsensitive] = useState(true);

  const result = useMemo(
    () => (input ? dedupeLines(input, { trimLines, caseInsensitive }) : null),
    [input, trimLines, caseInsensitive],
  );
  const output = result?.output ?? "";

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Input Lines"
        value={input}
        onChange={setInput}
        minHeightClass="min-h-[180px] sm:min-h-[210px]"
        placeholder={"Paste a list with one item per line…\njson-formatter\nword-counter\nJSON-FORMATTER"}
        headerSlot={
          <button
            type="button"
            onClick={() => setInput(SAMPLE_LINES)}
            className="text-xs font-bold text-brand-700 transition-colors hover:text-brand-600 dark:text-brand-300 dark:hover:text-brand-200"
          >
            Load sample
          </button>
        }
      />

      <ToolActions
        trailing={
          <>
            <OptionCheckbox
              label="Trim whitespace around lines"
              checked={trimLines}
              onChange={setTrimLines}
            />
            <OptionCheckbox
              label="Ignore case when comparing"
              checked={caseInsensitive}
              onChange={setCaseInsensitive}
            />
            <Button variant="ghost" size="sm" onClick={() => setInput("")} disabled={!input}>
              <Icon name="rotateCcw" className="h-4 w-4" />
              <span>Reset</span>
            </Button>
          </>
        }
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-3">
          <Icon name="eraser" className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          Result updates live — first occurrence kept, original order preserved
        </span>
      </ToolActions>

      {result ? (
        <TextStatsPanel
          columns={4}
          stats={[
            { label: "Original lines", value: result.originalLines.toLocaleString() },
            { label: "Unique lines", value: result.uniqueLines.toLocaleString(), primary: true },
            {
              label: "Duplicates removed",
              value: result.removed.toLocaleString(),
              hint: caseInsensitive ? "Case-insensitive matching" : "Exact, case-sensitive matching",
            },
            { label: "Mode", value: caseInsensitive ? "a = A" : "a ≠ A" },
          ]}
        />
      ) : null}

      <OutputPanel
        label="Deduplicated Lines"
        value={output}
        minHeightClass="min-h-[170px] sm:min-h-[200px]"
        emptyTitle="Cleaned lines will appear here"
        emptyDescription="Paste one item per line above. Exact duplicates are removed instantly — the first occurrence is kept, in original order."
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

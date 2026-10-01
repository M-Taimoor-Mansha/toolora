"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { CodeTextarea } from "../dev/CodeTextarea";
import { OutputPanel } from "../dev/OutputPanel";
import { ToolActions } from "../dev/ToolActions";
import { SegmentedControl } from "./SegmentedControl";
import { reverseText, type TextReverseMode } from "@/lib/text-tools";

export const REVERSE_MODES: { value: TextReverseMode; label: string; title: string }[] = [
  {
    value: "characters",
    label: "Reverse all text",
    title: "Reverse every character in the document",
  },
  {
    value: "lines",
    label: "Reverse each line",
    title: "Reverse characters within each line, keep line order",
  },
  {
    value: "words",
    label: "Reverse word order",
    title: "Flip the order of words in each line",
  },
];

const SAMPLE_TEXT = "Toolora keeps everything private and fast. Try reversing this line.";

export function TextReverserTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<TextReverseMode>("characters");

  const output = useMemo(() => (input ? reverseText(input, mode) : ""), [input, mode]);

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Input Text"
        mono={false}
        value={input}
        onChange={setInput}
        minHeightClass="min-h-[160px] sm:min-h-[190px]"
        placeholder="Type or paste text to reverse…"
        headerSlot={
          <button
            type="button"
            onClick={() => setInput(SAMPLE_TEXT)}
            className="text-xs font-bold text-brand-700 transition-colors hover:text-brand-600 dark:text-brand-300 dark:hover:text-brand-200"
          >
            Load sample
          </button>
        }
      />

      <ToolActions
        trailing={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setInput(output)}
              disabled={!output}
              title="Move the reversed result back into the input"
            >
              <Icon name="swap" className="h-4 w-4" />
              <span>Use output as input</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setInput("")} disabled={!input}>
              <Icon name="rotateCcw" className="h-4 w-4" />
              <span>Reset</span>
            </Button>
          </>
        }
      >
        <SegmentedControl
          options={REVERSE_MODES}
          value={mode}
          onChange={setMode}
          ariaLabel="Reverse mode"
        />
      </ToolActions>

      <OutputPanel
        label="Reversed Text"
        mono={false}
        value={output}
        minHeightClass="min-h-[150px] sm:min-h-[180px]"
        emptyTitle="Reversed text will appear here"
        emptyDescription="Type or paste text above and pick a reverse mode. Unicode and emoji are reversed safely, character by character."
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

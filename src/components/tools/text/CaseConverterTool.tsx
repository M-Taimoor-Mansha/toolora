"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { CodeTextarea } from "../dev/CodeTextarea";
import { OutputPanel } from "../dev/OutputPanel";
import { ToolActions } from "../dev/ToolActions";
import { SegmentedControl } from "./SegmentedControl";
import { countCharacters, convertCase, type CaseTransformMode } from "@/lib/text-tools";

const CASE_MODES: { value: CaseTransformMode; label: string; title: string }[] = [
  { value: "uppercase", label: "UPPERCASE", title: "Convert every letter to capital letters" },
  { value: "lowercase", label: "lowercase", title: "Convert every letter to small letters" },
  { value: "title", label: "Title Case", title: "Capitalize words like a headline" },
  { value: "sentence", label: "Sentence case", title: "Capitalize the first letter of each sentence" },
  { value: "toggle", label: "tOGGLE cASE", title: "Swap the case of every letter" },
];

const SAMPLE_TEXT = "toolora provides THE best FREE Online Tools for everyday work. paste your text HERE and convert it instantly.";

export function CaseConverterTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<CaseTransformMode>("title");

  const output = useMemo(() => (input ? convertCase(input, mode) : ""), [input, mode]);

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Input Text"
        mono={false}
        value={input}
        onChange={setInput}
        minHeightClass="min-h-[160px] sm:min-h-[190px]"
        placeholder="Type or paste text here — the converted result updates instantly…"
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
              title="Move the converted result back into the input"
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
          options={CASE_MODES}
          value={mode}
          onChange={setMode}
          ariaLabel="Case conversion mode"
        />
      </ToolActions>

      <OutputPanel
        label="Converted Text"
        mono={false}
        value={output}
        minHeightClass="min-h-[150px] sm:min-h-[180px]"
        emptyTitle="Converted text will appear here"
        emptyDescription="Type or paste text above, pick a case mode, and the result updates instantly as you type."
        badges={
          input ? (
            <span className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-bold text-ink-3 ring-1 ring-line">
              {countCharacters(output).toLocaleString()} / {countCharacters(input).toLocaleString()} chars
            </span>
          ) : null
        }
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

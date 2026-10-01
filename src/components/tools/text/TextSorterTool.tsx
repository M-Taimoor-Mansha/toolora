"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { CodeTextarea } from "../dev/CodeTextarea";
import { OutputPanel } from "../dev/OutputPanel";
import { ToolActions } from "../dev/ToolActions";
import { OptionCheckbox } from "./OptionCheckbox";
import { SegmentedControl } from "./SegmentedControl";
import { TextStatsPanel } from "./TextStatsPanel";
import { sortLines, type TextSortMode } from "@/lib/text-tools";

const SORT_MODES: { value: TextSortMode; label: string; title: string }[] = [
  { value: "az", label: "A → Z", title: "Alphabetical, ascending" },
  { value: "za", label: "Z → A", title: "Alphabetical, descending" },
  { value: "numAsc", label: "0 → 9", title: "Numeric, ascending" },
  { value: "numDesc", label: "9 → 0", title: "Numeric, descending" },
];

const SAMPLE_LIST = `banana
42
apple
Dragonfruit
8
cherry
100
anthracite`;

export function TextSorterTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<TextSortMode>("az");
  const [caseInsensitive, setCaseInsensitive] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [dedupe, setDedupe] = useState(false);
  const [keepEmptyLines, setKeepEmptyLines] = useState(false);

  const result = useMemo(
    () =>
      input
        ? sortLines(input, mode, { caseInsensitive, trimLines, dedupe, keepEmptyLines })
        : null,
    [input, mode, caseInsensitive, trimLines, dedupe, keepEmptyLines],
  );
  const output = result?.output ?? "";

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Lines to Sort"
        value={input}
        onChange={setInput}
        minHeightClass="min-h-[180px] sm:min-h-[210px]"
        placeholder={"Paste a list with one item per line…\nbanana\n42\napple\nDragonfruit"}
        headerSlot={
          <button
            type="button"
            onClick={() => setInput(SAMPLE_LIST)}
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
              label="Ignore case"
              checked={caseInsensitive}
              onChange={setCaseInsensitive}
            />
            <OptionCheckbox label="Trim lines" checked={trimLines} onChange={setTrimLines} />
            <OptionCheckbox label="Remove duplicates" checked={dedupe} onChange={setDedupe} />
            <OptionCheckbox
              label="Keep blank lines"
              checked={keepEmptyLines}
              onChange={setKeepEmptyLines}
            />
            <Button variant="ghost" size="sm" onClick={() => setInput("")} disabled={!input}>
              <Icon name="rotateCcw" className="h-4 w-4" />
              <span>Reset</span>
            </Button>
          </>
        }
      >
        <SegmentedControl options={SORT_MODES} value={mode} onChange={setMode} ariaLabel="Sort order" />
      </ToolActions>

      {result ? (
        <TextStatsPanel
          columns={4}
          stats={[
            { label: "Sorted lines", value: result.lineCount.toLocaleString(), primary: true },
            {
              label: "Duplicates removed",
              value: result.duplicatesRemoved.toLocaleString(),
              hint: dedupe ? "enabled" : "enable above to dedupe",
            },
            {
              label: "Sort order",
              value: SORT_MODES.find((m) => m.value === mode)?.label ?? "",
              hint: mode.startsWith("num") ? "first number wins" : "natural alphanumeric",
            },
            { label: "Blank lines", value: keepEmptyLines ? "Kept" : "Moved to end" },
          ]}
        />
      ) : null}

      <OutputPanel
        label="Sorted Lines"
        value={output}
        minHeightClass="min-h-[170px] sm:min-h-[200px]"
        emptyTitle="Sorted lines will appear here"
        emptyDescription="Paste one item per line above and pick a sort order. The sorted list updates instantly."
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

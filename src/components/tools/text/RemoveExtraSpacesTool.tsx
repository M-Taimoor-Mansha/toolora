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
import { cleanExtraSpaces } from "@/lib/text-tools";

const SAMPLE_MESSY = `   This   text   has      far   too   many   spaces.

Line breaks    still   work.   Paragraph structure    is preserved.

Even    lines with     tab-like gaps        get   cleaned up.    `;

export function RemoveExtraSpacesTool() {
  const [input, setInput] = useState("");
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [trimDocument, setTrimDocument] = useState(true);

  const result = useMemo(
    () =>
      input
        ? cleanExtraSpaces(input, { collapseSpaces, trimLines, trimDocument })
        : null,
    [input, collapseSpaces, trimLines, trimDocument],
  );
  const output = result?.output ?? "";

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Messy Text Input"
        mono={false}
        value={input}
        onChange={setInput}
        minHeightClass="min-h-[180px] sm:min-h-[210px]"
        placeholder={"Paste text with extra   spaces,  double  gaps   and trailing   whitespace…"}
        headerSlot={
          <button
            type="button"
            onClick={() => setInput(SAMPLE_MESSY)}
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
              label="Collapse repeated spaces"
              checked={collapseSpaces}
              onChange={setCollapseSpaces}
            />
            <OptionCheckbox label="Trim each line" checked={trimLines} onChange={setTrimLines} />
            <OptionCheckbox
              label="Trim start & end of text"
              checked={trimDocument}
              onChange={setTrimDocument}
            />
            <Button variant="ghost" size="sm" onClick={() => setInput("")} disabled={!input}>
              <Icon name="rotateCcw" className="h-4 w-4" />
              <span>Reset</span>
            </Button>
          </>
        }
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-3">
          <Icon name="alignLeft" className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          Cleaning is live — paragraphs and line breaks are preserved
        </span>
      </ToolActions>

      {result ? (
        <TextStatsPanel
          columns={4}
          stats={[
            { label: "Before", value: result.beforeChars.toLocaleString(), hint: "characters" },
            { label: "After", value: result.afterChars.toLocaleString(), hint: "characters", primary: true },
            {
              label: "Removed",
              value: result.removedChars.toLocaleString(),
              hint: "excess whitespace characters",
            },
            {
              label: "Paragraph breaks",
              value: "Kept",
              hint: "blank lines preserved",
            },
          ]}
        />
      ) : null}

      <OutputPanel
        label="Cleaned Text"
        mono={false}
        value={output}
        minHeightClass="min-h-[170px] sm:min-h-[200px]"
        emptyTitle="Cleaned text will appear here"
        emptyDescription="Paste messy text above. Extra spaces are removed live while paragraphs and line breaks stay intact."
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

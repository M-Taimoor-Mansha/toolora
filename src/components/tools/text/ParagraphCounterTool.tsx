"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { CodeTextarea } from "../dev/CodeTextarea";
import { CopyButton } from "../dev/CopyButton";
import { ToolActions } from "../dev/ToolActions";
import { TextStatsPanel } from "./TextStatsPanel";
import { getTextStats } from "@/lib/text-tools";

const SAMPLE_TEXT = `First paragraph: paste your text here and this tool counts every meaningful paragraph — blocks separated by blank lines.

Second paragraph, after one blank line. Notice that stray spaces on blank lines do not create phantom paragraphs.

Third paragraph. Word and character counts are included as well.`;

export function ParagraphCounterTool() {
  const [input, setInput] = useState("");
  const stats = useMemo(() => getTextStats(input), [input]);

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Your Text"
        mono={false}
        value={input}
        onChange={setInput}
        placeholder="Paste an essay, article or blog post to count its paragraphs…"
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
          <Button variant="ghost" size="sm" onClick={() => setInput("")} disabled={!input}>
            <Icon name="rotateCcw" className="h-4 w-4" />
            <span>Clear</span>
          </Button>
        }
      >
        <CopyButton value={input} label="Copy text" toastMessage="Text copied to clipboard" />
      </ToolActions>

      <TextStatsPanel
        columns={4}
        stats={[
          { label: "Paragraphs", value: stats.paragraphs.toLocaleString(), primary: true },
          { label: "Words", value: stats.words.toLocaleString() },
          { label: "Characters", value: stats.characters.toLocaleString() },
          { label: "Lines", value: stats.lines.toLocaleString() },
        ]}
        note="Paragraphs are counted as text blocks separated by at least one blank line. Lines containing only whitespace are treated as blank line separators."
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

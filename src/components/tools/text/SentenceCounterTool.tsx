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

const SAMPLE_TEXT = `Dr. Smith opened the door. What a surprise for the team! The report, e.g. the summary of findings, was almost done. She smiled... and everyone agreed.`;

export function SentenceCounterTool() {
  const [input, setInput] = useState("");
  const stats = useMemo(() => getTextStats(input), [input]);

  const averageWordsPerSentence =
    stats.sentences > 0 ? (stats.words / stats.sentences).toFixed(1) : "0";

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Your Text"
        mono={false}
        value={input}
        onChange={setInput}
        placeholder="Paste a paragraph or article to count its sentences…"
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
        columns={6}
        stats={[
          { label: "Sentences", value: stats.sentences.toLocaleString(), primary: true },
          { label: "Words", value: stats.words.toLocaleString() },
          { label: "Characters", value: stats.characters.toLocaleString() },
          { label: "Paragraphs", value: stats.paragraphs.toLocaleString() },
          { label: "Avg words/sentence", value: averageWordsPerSentence },
          { label: "Lines", value: stats.lines.toLocaleString() },
        ]}
        note="Sentence detection is a best-effort heuristic: it splits after “.”, “!” and “?” while protecting common abbreviations (e.g., i.e., Dr.) and initials. It is not a full linguistic parser."
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

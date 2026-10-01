"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { CodeTextarea } from "../dev/CodeTextarea";
import { CopyButton } from "../dev/CopyButton";
import { ToolActions } from "../dev/ToolActions";
import { TextStatsPanel } from "./TextStatsPanel";
import {
  estimateReadingTime,
  estimateSpeakingTime,
  getTextStats,
} from "@/lib/text-tools";

const SAMPLE_TEXT = `Toolora is a growing collection of free online tools for developers, writers, students and creators.

Every tool runs privately in your browser — nothing you type is uploaded, stored or tracked. Paste any text here to count words, characters, sentences and paragraphs instantly, along with reading and speaking time estimates.`;

export function WordCounterTool() {
  const [input, setInput] = useState("");
  const stats = useMemo(() => getTextStats(input), [input]);

  const readingTime = estimateReadingTime(stats.words);
  const speakingTime = estimateSpeakingTime(stats.words);

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Your Text"
        mono={false}
        value={input}
        onChange={setInput}
        placeholder="Start typing or paste your essay, article, email or social media post here…"
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInput("")}
            disabled={!input}
          >
            <Icon name="rotateCcw" className="h-4 w-4" />
            <span>Clear</span>
          </Button>
        }
      >
        <CopyButton
          value={input}
          label="Copy text"
          toastMessage="Text copied to clipboard"
        />
        <CopyButton
          value={
            `Words: ${stats.words}\nCharacters: ${stats.characters}\nCharacters (no spaces): ${stats.charactersNoSpaces}\nSentences: ${stats.sentences}\nParagraphs: ${stats.paragraphs}\nLines: ${stats.lines}`
          }
          label="Copy stats"
          toastMessage="Statistics copied to clipboard"
        />
      </ToolActions>

      <TextStatsPanel
        columns={8}
        stats={[
          { label: "Words", value: stats.words.toLocaleString(), primary: true },
          { label: "Characters", value: stats.characters.toLocaleString() },
          { label: "Chars (no spaces)", value: stats.charactersNoSpaces.toLocaleString() },
          { label: "Sentences", value: stats.sentences.toLocaleString() },
          { label: "Paragraphs", value: stats.paragraphs.toLocaleString() },
          { label: "Lines", value: stats.lines.toLocaleString() },
          { label: "Reading time", value: readingTime, hint: "≈ 225 words/min" },
          { label: "Speaking time", value: speakingTime, hint: "≈ 140 words/min" },
        ]}
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

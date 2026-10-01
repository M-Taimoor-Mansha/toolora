"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import { CodeTextarea } from "../dev/CodeTextarea";
import { CopyButton } from "../dev/CopyButton";
import { ToolActions } from "../dev/ToolActions";
import { TextStatsPanel } from "./TextStatsPanel";
import { getByteLength, formatBytes } from "@/lib/dev-tools";
import { getTextStats } from "@/lib/text-tools";

export function CharacterCounterTool() {
  const [input, setInput] = useState("");
  const stats = useMemo(() => getTextStats(input), [input]);
  const byteSize = useMemo(() => formatBytes(getByteLength(input)), [input]);

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="Your Text"
        mono={false}
        value={input}
        onChange={setInput}
        placeholder="Paste a meta description, tweet, SMS or any text to measure its exact length…"
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
          { label: "Total characters", value: stats.characters.toLocaleString(), primary: true },
          { label: "Without spaces", value: stats.charactersNoSpaces.toLocaleString() },
          { label: "Without new lines", value: stats.charactersNoLineBreaks.toLocaleString() },
          { label: "Words", value: stats.words.toLocaleString() },
          { label: "Lines", value: stats.lines.toLocaleString() },
          { label: "UTF-8 size", value: byteSize, hint: "Unicode characters counted" },
        ]}
        note="Emoji and other Unicode symbols count as single characters. Useful for social media limits, meta descriptions and SMS segments."
      />

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface LoremIpsumToolProps {
  tool: Tool;
}

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur",
  "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui",
  "officia", "deserunt", "mollit", "anim", "id", "est", "laborum", "curabitur",
  "pretium", "tincidunt", "lacus", "nulla", "gravida", "orci", "a", "odio",
  "nullam", "varius", "turpis", "commodo", "condimentum", "lobortis", "feugiat",
  "vivamus", "elementum", "semper", "nisi", "aenean", "vulputate", "eleifend",
  "tellus", "leo", "porttitor", "eget", "dolor", "morbi", "non", "quam", "nec",
  "dui", "luctus", "rutrum", "at", "tempor", "tellus", "suspendisse", "potenti",
  "nullam", "ac", "turpis", "egestas", "integer", "eget", "aliquet", "nibh",
  "praesent", "tristique", "magna", "sit", "amet", "purus", "gravida", "quis",
  "blandit", "turpis", "cursus", "in", "hac", "habitasse", "platea", "dictumst",
  "quisque", "sagittis", "purus", "sit", "amet", "volutpat", "consequat",
  "mauris", "nunc", "congue", "nisi", "vitae", "suscipit", "tellus", "orci",
  "ac", "auctor", "augue", "mauris", "augue", "neque", "gravida", "in",
  "fermentum", "et", "sollicitudin", "ac", "orci", "pharetra", "convallis",
  "posuere", "morbi", "leo", "urna", "molestie", "at", "elementum", "eu",
  "facilisis", "leo", "vel", "fringilla", "est", "ullamcorper", "eget", "nulla",
  "facilisi", "cras", "fermentum", "odio", "eu", "feugiat", "pretium", "nibh",
  "ipsum", "consequat", "nisl", "vel", "pretium", "lectus", "quam", "id", "leo",
  "in", "vitae", "turpis", "massa", "sed", "elementum", "tempus", "egestas",
  "sed", "sed", "risus", "pretium", "quam", "vulputate", "dignissim", "suspendisse",
  "in", "eu", "massa", "ultricies", "mi", "quis", "hendrerit", "dolor", "magna",
  "eget", "est", "lorem", "ipsum", "dolor", "sit", "amet", "consectetur",
  "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut",
  "labore", "et", "dolore", "magna", "aliqua",
];

const CLASSIC_OPENING = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function generateSentence(wordCount: number): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(WORDS[randomInt(WORDS.length)]);
  }
  let sentence = words.join(" ");
  sentence = capitalize(sentence);
  // Occasionally add a comma
  if (wordCount > 8 && Math.random() > 0.5) {
    const commaPos = Math.floor(wordCount / 2);
    const parts = sentence.split(" ");
    parts[commaPos] = parts[commaPos] + ",";
    sentence = parts.join(" ");
  }
  return sentence + ".";
}

function generateParagraph(
  sentences: number,
  wordsPerSentence: number
): string {
  const parts: string[] = [];
  for (let i = 0; i < sentences; i++) {
    const variance = randomInt(5) - 2; // -2 to +2
    const count = Math.max(4, wordsPerSentence + variance);
    parts.push(generateSentence(count));
  }
  return parts.join(" ");
}

function generateText(
  paragraphs: number,
  sentencesPerParagraph: number,
  wordsPerSentence: number,
  startWithClassic: boolean
): string {
  const result: string[] = [];

  for (let i = 0; i < paragraphs; i++) {
    let paragraph = generateParagraph(
      sentencesPerParagraph,
      wordsPerSentence
    );

    if (i === 0 && startWithClassic) {
      paragraph = CLASSIC_OPENING + " " + paragraph;
    }

    result.push(paragraph);
  }

  return result.join("\n\n");
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <button
      onClick={copy}
      disabled={!text}
      className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink-3 transition-colors hover:border-brand-400 hover:text-ink-2 disabled:opacity-40"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function LoremIpsumTool({ tool }: LoremIpsumToolProps) {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentencesPerParagraph, setSentencesPerParagraph] = useState(5);
  const [wordsPerSentence, setWordsPerSentence] = useState(10);
  const [startWithClassic, setStartWithClassic] = useState(true);
  const [output, setOutput] = useState(() =>
    generateText(3, 5, 10, true)
  );

  const generate = useCallback(() => {
    setOutput(
      generateText(
        paragraphs,
        sentencesPerParagraph,
        wordsPerSentence,
        startWithClassic
      )
    );
  }, [paragraphs, sentencesPerParagraph, wordsPerSentence, startWithClassic]);

  const stats = (() => {
    const pCount = output.split(/\n\n+/).filter((p) => p.trim()).length;
    const wCount = output.trim().split(/\s+/).filter(Boolean).length;
    const cCount = output.length;
    return { pCount, wCount, cCount };
  })();

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-ink">
                Paragraphs
              </label>
              <span className="rounded-lg bg-surface-2 px-2.5 py-0.5 font-mono text-xs font-bold text-ink">
                {paragraphs}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={paragraphs}
              onChange={(e) => setParagraphs(parseInt(e.target.value, 10))}
              className="mt-3 w-full accent-brand-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-ink">
                Sentences / Paragraph
              </label>
              <span className="rounded-lg bg-surface-2 px-2.5 py-0.5 font-mono text-xs font-bold text-ink">
                {sentencesPerParagraph}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={sentencesPerParagraph}
              onChange={(e) =>
                setSentencesPerParagraph(parseInt(e.target.value, 10))
              }
              className="mt-3 w-full accent-brand-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-ink">
                Words / Sentence
              </label>
              <span className="rounded-lg bg-surface-2 px-2.5 py-0.5 font-mono text-xs font-bold text-ink">
                {wordsPerSentence}
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={20}
              value={wordsPerSentence}
              onChange={(e) =>
                setWordsPerSentence(parseInt(e.target.value, 10))
              }
              className="mt-3 w-full accent-brand-600"
            />
          </div>
        </div>

        <label className="mt-5 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={startWithClassic}
            onChange={(e) => setStartWithClassic(e.target.checked)}
            className="h-4 w-4 accent-brand-600"
          />
          <span className="text-sm font-medium text-ink-2">
            Start with &quot;Lorem ipsum dolor sit amet...&quot;
          </span>
        </label>
      </div>

      {/* Output */}
      <div className="rounded-2xl border border-line bg-surface p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-ink">Generated Text</h3>
            <span className="rounded-md bg-surface-2 px-2 py-0.5 text-xs font-semibold text-ink-3">
              {stats.pCount} paragraphs · {stats.wCount} words · {stats.cCount} chars
            </span>
          </div>
          <CopyButton text={output} />
        </div>
        <div className="max-h-96 overflow-auto whitespace-pre-wrap rounded-xl bg-canvas p-4 text-sm leading-relaxed text-ink-2">
          {output}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={generate}
          className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700"
        >
          Generate New Text
        </button>
        <button
          onClick={() => {
            try {
              navigator.clipboard.writeText(output);
            } catch {
              /* ignore */
            }
          }}
          className="rounded-xl border border-line bg-surface px-6 py-3 text-sm font-bold text-ink-2 transition-colors hover:border-brand-400"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
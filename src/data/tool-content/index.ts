import type { ToolContent, ToolContentMap } from "./types";
import { wordCounterContent } from "./word-counter";
import { characterCounterContent } from "./character-counter";
import { sentenceCounterContent } from "./sentence-counter";
import { paragraphCounterContent } from "./paragraph-counter";
import { caseConverterContent } from "./case-converter";

const toolContentMap: ToolContentMap = {
  "word-counter": wordCounterContent,
  "character-counter": characterCounterContent,
  "sentence-counter": sentenceCounterContent,
  "paragraph-counter": paragraphCounterContent,
  "case-converter": caseConverterContent,
};

export function getToolContent(slug: string): ToolContent | undefined {
  return toolContentMap[slug];
}

export function hasToolContent(slug: string): boolean {
  return slug in toolContentMap;
}

export type { ToolContent, ToolContentMap };
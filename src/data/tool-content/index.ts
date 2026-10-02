import type { ToolContent, ToolContentMap } from "./types";
import { wordCounterContent } from "./word-counter";
import { characterCounterContent } from "./character-counter";
import { sentenceCounterContent } from "./sentence-counter";
import { paragraphCounterContent } from "./paragraph-counter";
import { caseConverterContent } from "./case-converter";
import { removeDuplicateLinesContent } from "./remove-duplicate-lines";
import { removeExtraSpacesContent } from "./remove-extra-spaces";
import { textSorterContent } from "./text-sorter";
import { textReverserContent } from "./text-reverser";
import { slugGeneratorContent } from "./slug-generator";

const toolContentMap: ToolContentMap = {
  "word-counter": wordCounterContent,
  "character-counter": characterCounterContent,
  "sentence-counter": sentenceCounterContent,
  "paragraph-counter": paragraphCounterContent,
  "case-converter": caseConverterContent,
  "remove-duplicate-lines": removeDuplicateLinesContent,
  "remove-extra-spaces": removeExtraSpacesContent,
  "text-sorter": textSorterContent,
  "text-reverser": textReverserContent,
  "slug-generator": slugGeneratorContent,
};

export function getToolContent(slug: string): ToolContent | undefined {
  return toolContentMap[slug];
}

export function hasToolContent(slug: string): boolean {
  return slug in toolContentMap;
}

export type { ToolContent, ToolContentMap };
import type { ToolContent, ToolContentMap } from "./types";
import { wordCounterContent } from "./word-counter";

const toolContentMap: ToolContentMap = {
  "word-counter": wordCounterContent,
};

export function getToolContent(slug: string): ToolContent | undefined {
  return toolContentMap[slug];
}

export function hasToolContent(slug: string): boolean {
  return slug in toolContentMap;
}

export type { ToolContent, ToolContentMap };
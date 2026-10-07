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
import { jsonFormatterContent } from "./json-formatter";
import { jsonValidatorContent } from "./json-validator";
import { jsonMinifierContent } from "./json-minifier";
import { base64EncoderContent } from "./base64-encoder";
import { base64DecoderContent } from "./base64-decoder";
import { urlEncoderContent } from "./url-encoder";
import { urlDecoderContent } from "./url-decoder";
import { uuidGeneratorContent } from "./uuid-generator";
import { pdfToWordContent } from "./pdf-to-word";
import { bmiCalculatorContent } from "./bmi-calculator";
import { passwordGeneratorContent } from "./password-generator";
import { percentageCalculatorContent } from "./percentage-calculator";
import { imageCompressorContent } from "./image-compressor";
import { jwtDecoderContent } from "./jwt-decoder";

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
  "json-formatter": jsonFormatterContent,
  "json-validator": jsonValidatorContent,
  "json-minifier": jsonMinifierContent,
  "base64-encoder": base64EncoderContent,
  "base64-decoder": base64DecoderContent,
  "url-encoder": urlEncoderContent,
  "url-decoder": urlDecoderContent,
  "uuid-generator": uuidGeneratorContent,
  "pdf-to-word": pdfToWordContent,
  "bmi-calculator": bmiCalculatorContent,
  "password-generator": passwordGeneratorContent,
  "percentage-calculator": percentageCalculatorContent,
  "image-compressor": imageCompressorContent,
  "jwt-decoder": jwtDecoderContent,
};

export function getToolContent(slug: string): ToolContent | undefined {
  return toolContentMap[slug];
}

export function hasToolContent(slug: string): boolean {
  return slug in toolContentMap;
}

export type { ToolContent, ToolContentMap };
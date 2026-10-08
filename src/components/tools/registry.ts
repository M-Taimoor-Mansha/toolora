import type { ComponentType } from "react";
import type { Tool } from "@/data/types";
import { Base64DecoderTool } from "./dev/Base64DecoderTool";
import { Base64EncoderTool } from "./dev/Base64EncoderTool";
import { JsonFormatterTool } from "./dev/JsonFormatterTool";
import { JsonMinifierTool } from "./dev/JsonMinifierTool";
import { JsonValidatorTool } from "./dev/JsonValidatorTool";
import { UrlDecoderTool } from "./dev/UrlDecoderTool";
import { UrlEncoderTool } from "./dev/UrlEncoderTool";
import { UuidGeneratorTool } from "./dev/UuidGeneratorTool";
import { CaseConverterTool } from "./text/CaseConverterTool";
import { CharacterCounterTool } from "./text/CharacterCounterTool";
import { ParagraphCounterTool } from "./text/ParagraphCounterTool";
import { RemoveDuplicateLinesTool } from "./text/RemoveDuplicateLinesTool";
import { RemoveExtraSpacesTool } from "./text/RemoveExtraSpacesTool";
import { SentenceCounterTool } from "./text/SentenceCounterTool";
import { SlugGeneratorTool } from "./text/SlugGeneratorTool";
import { TextReverserTool } from "./text/TextReverserTool";
import { TextSorterTool } from "./text/TextSorterTool";
import { WordCounterTool } from "./text/WordCounterTool";
import { PdfToWordTool } from "./pdf/PdfToWordTool";
import { BmiCalculatorTool } from "./calculators/BmiCalculatorTool";
import { PasswordGeneratorTool } from "./generators/PasswordGeneratorTool";
import { PercentageCalculatorTool } from "./calculators/PercentageCalculatorTool";
import { ImageCompressorTool } from "./image/ImageCompressorTool";
import { JwtDecoderTool } from "./dev/JwtDecoderTool";
import { HashGeneratorTool } from "./dev/HashGeneratorTool";
import { TimestampConverterTool } from "./dev/TimestampConverterTool";
import { UnitConverterTool } from "./calculators/UnitConverterTool";
import { JsonToCsvTool } from "./dev/JsonToCsvTool";
import { ColorConverterTool } from "./dev/ColorConverterTool";
import { NumberToWordsTool } from "./dev/NumberToWordsTool";

export interface LiveToolProps {
  tool: Tool;
}

/**
 * Registry that maps live tools to their UI components.
 *
 * When a tool is implemented:
 *   1. Create the component in `src/components/tools/`.
 *   2. Add it here under its slug.
 *   3. Set its `status` to `"live"` in `src/data/tools.ts`.
 */
export const liveToolComponents: Record<string, ComponentType<LiveToolProps>> = {
  // Developer tools
  "json-formatter": JsonFormatterTool,
  "json-validator": JsonValidatorTool,
  "json-minifier": JsonMinifierTool,
  "base64-encoder": Base64EncoderTool,
  "base64-decoder": Base64DecoderTool,
  "url-encoder": UrlEncoderTool,
  "url-decoder": UrlDecoderTool,
  "uuid-generator": UuidGeneratorTool,
  // Text tools
  "word-counter": WordCounterTool,
  "character-counter": CharacterCounterTool,
  "sentence-counter": SentenceCounterTool,
  "paragraph-counter": ParagraphCounterTool,
  "case-converter": CaseConverterTool,
  "remove-duplicate-lines": RemoveDuplicateLinesTool,
  "remove-extra-spaces": RemoveExtraSpacesTool,
  "text-sorter": TextSorterTool,
  "text-reverser": TextReverserTool,
  "slug-generator": SlugGeneratorTool,
  "pdf-to-word": PdfToWordTool,
  "bmi-calculator": BmiCalculatorTool,
  "password-generator": PasswordGeneratorTool,
  "percentage-calculator": PercentageCalculatorTool,
  "image-compressor": ImageCompressorTool,
  "jwt-decoder": JwtDecoderTool,
  "hash-generator": HashGeneratorTool,
  "timestamp-converter": TimestampConverterTool,
  "unit-converter": UnitConverterTool,
  "json-to-csv": JsonToCsvTool,
  "color-converter": ColorConverterTool,
  "number-to-words": NumberToWordsTool,
};

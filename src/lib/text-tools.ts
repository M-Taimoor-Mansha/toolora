/**
 * Pure browser-local utilities for Text Tools (Batch 1).
 *
 * All functions are defensive: any input (empty, Unicode, control characters)
 * returns a safe, predictable result instead of throwing.
 */

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  charactersNoLineBreaks: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  nonEmptyLines: number;
}

const LINE_SPLIT = /\r\n|\r|\n/;

export function splitLines(text: string): string[] {
  if (!text) return [];
  return text.split(LINE_SPLIT);
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

/** Characters counted as Unicode code points (emoji count as 1). */
export function countCharacters(text: string): number {
  return Array.from(text).length;
}

export function countCharactersNoSpaces(text: string): number {
  return Array.from(text.replace(/\s/g, "")).length;
}

export function countCharactersNoLineBreaks(text: string): number {
  return Array.from(text.replace(/[\r\n]/g, "")).length;
}

/** Paragraphs = blocks separated by one or more blank lines. */
export function countParagraphs(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\r?\n(?:[ \t]*\r?\n)+/).filter((block) => /\S/.test(block)).length;
}

/**
 * Best-effort sentence counter for typical English text.
 *
 * Splits after ".", "!", "?", "…" followed by whitespace, while protecting
 * common abbreviations ("e.g.", "Dr.", "U.S.") and single-letter initials
 * ("John D. Rockefeller"). It is a heuristic, not a linguistic parser.
 */
const COMMON_ABBREVIATIONS = [
  "e\\.g",
  "i\\.e",
  "etc",
  "vs",
  "viz",
  "no",
  "nos",
  "mr",
  "mrs",
  "ms",
  "dr",
  "st",
  "jr",
  "sr",
  "prof",
  "inc",
  "ltd",
  "llc",
  "co",
  "corp",
  "approx",
  "dept",
  "est",
  "gen",
  "gov",
  "hon",
  "rev",
  "sgt",
  "capt",
  "lt",
  "col",
  "adm",
  "sen",
  "rep",
  "fig",
  "eq",
  "cf",
  "jan",
  "feb",
  "mar",
  "apr",
  "jun",
  "jul",
  "aug",
  "sep",
  "sept",
  "oct",
  "nov",
  "dec",
];
const ABBREVIATION_REGEX = new RegExp(`\\b(?:${COMMON_ABBREVIATIONS.join("|")})\\.`, "gi");
const PROTECT_CHAR = "\uE000"; // private-use char: never produced by normal text

export function countSentences(text: string): number {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return 0;

  const guarded = normalized
    .replace(ABBREVIATION_REGEX, (match) => match.slice(0, -1) + PROTECT_CHAR)
    .replace(/\b([A-Za-z])\./g, `$1${PROTECT_CHAR}`);

  return guarded
    .split(/(?<=[.!?…]+)\s+/)
    .map((segment) => segment.trim())
    .filter((segment) => /\S/.test(segment)).length;
}

export function getTextStats(text: string): TextStats {
  const lines = splitLines(text);
  return {
    words: countWords(text),
    characters: countCharacters(text),
    charactersNoSpaces: countCharactersNoSpaces(text),
    charactersNoLineBreaks: countCharactersNoLineBreaks(text),
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    lines: text ? lines.length : 0,
    nonEmptyLines: lines.filter((line) => /\S/.test(line)).length,
  };
}

/** Rough reading time at 225 wpm, as a friendly string. */
export function estimateReadingTime(words: number): string {
  if (words <= 0) return "0 min";
  const seconds = (words / 225) * 60;
  if (seconds < 60) return `${Math.max(1, Math.round(seconds))} sec`;
  return `${Math.max(1, Math.round(seconds / 60))} min`;
}

/** Rough speaking time at 140 wpm, as a friendly string. */
export function estimateSpeakingTime(words: number): string {
  if (words <= 0) return "0 min";
  const seconds = (words / 140) * 60;
  if (seconds < 60) return `${Math.max(1, Math.round(seconds))} sec`;
  return `${Math.max(1, Math.round(seconds / 60))} min`;
}

// ---------------------------------------------------------------------------
// Case conversion
// ---------------------------------------------------------------------------

export type CaseTransformMode = "uppercase" | "lowercase" | "title" | "sentence" | "toggle";

const TITLE_SMALL_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "en", "for", "if", "in", "nor",
  "of", "on", "or", "per", "the", "to", "up", "via", "vs",
]);

function capitalizeCoreWord(word: string): string {
  // Capitalize the first letter and letters after hyphens (jean-luc → Jean-Luc).
  return word.replace(/(^|-)([\p{L}])/gu, (_match, separator: string, letter: string) => {
    return separator + letter.toUpperCase();
  });
}

export function toTitleCase(text: string): string {
  if (!text) return "";
  const tokens = text.toLowerCase().split(/(\s+)/);
  const wordIndexes = tokens
    .map((token, index) => (/\S/.test(token) ? index : -1))
    .filter((index) => index >= 0);
  const firstWordIndex = wordIndexes[0];
  const lastWordIndex = wordIndexes[wordIndexes.length - 1];

  return tokens
    .map((token, index) => {
      if (!/\S/.test(token)) return token;
      return token.replace(/([\p{L}\p{N}][\p{L}\p{N}'’/-]*)/gu, (core) => {
        const plain = core.replace(/[^\p{L}\p{N}]/gu, "");
        const shouldCapitalize =
          index === firstWordIndex || index === lastWordIndex || !TITLE_SMALL_WORDS.has(plain);
        if (!shouldCapitalize) return core;
        return capitalizeCoreWord(core);
      });
    })
    .join("");
}

export function toSentenceCase(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/(^|[.!?…]["'”’)\]]*\s+|(?:\r?\n)+)(\s*[\p{L}])/gu, (_match, boundary: string, letter: string) => {
      return boundary + letter.toUpperCase();
    });
}

export function toggleCase(text: string): string {
  if (!text) return "";
  return text.replace(/[\p{L}]/gu, (letter) =>
    letter === letter.toUpperCase() ? letter.toLowerCase() : letter.toUpperCase(),
  );
}

export function convertCase(text: string, mode: CaseTransformMode): string {
  switch (mode) {
    case "uppercase":
      return text.toUpperCase();
    case "lowercase":
      return text.toLowerCase();
    case "title":
      return toTitleCase(text);
    case "sentence":
      return toSentenceCase(text);
    case "toggle":
      return toggleCase(text);
  }
}

// ---------------------------------------------------------------------------
// Line operations
// ---------------------------------------------------------------------------

export interface DedupeLinesOptions {
  /** Trim leading/trailing whitespace before comparing and in the output. */
  trimLines: boolean;
  /** Compare case-insensitively ("Apple" == "apple"). */
  caseInsensitive: boolean;
}

export interface DedupeLinesResult {
  output: string;
  originalLines: number;
  uniqueLines: number;
  removed: number;
}

/** Remove duplicate lines, preserving first occurrences and original order. */
export function dedupeLines(text: string, options: DedupeLinesOptions): DedupeLinesResult {
  const lines = splitLines(text);
  const seen = new Set<string>();
  const kept: string[] = [];

  for (const raw of lines) {
    const line = options.trimLines ? raw.trim() : raw;
    const key = options.caseInsensitive ? line.toLowerCase() : line;
    if (seen.has(key)) continue;
    seen.add(key);
    kept.push(line);
  }

  return {
    output: kept.join("\n"),
    originalLines: lines.length,
    uniqueLines: kept.length,
    removed: lines.length - kept.length,
  };
}

export interface CleanSpacesOptions {
  /** Collapse runs of spaces/tabs into a single space. */
  collapseSpaces: boolean;
  /** Remove leading/trailing whitespace on every line. */
  trimLines: boolean;
  /** Trim whitespace at the very start and end of the document. */
  trimDocument: boolean;
}

export interface CleanSpacesResult {
  output: string;
  beforeChars: number;
  afterChars: number;
  removedChars: number;
}

/**
 * Clean messy whitespace while preserving meaningful structure:
 * paragraph breaks and line counts are never removed.
 */
export function cleanExtraSpaces(text: string, options: CleanSpacesOptions): CleanSpacesResult {
  let working = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const lines = working.split("\n").map((line) => {
    let out = line;
    // Always strip trailing whitespace before a line break.
    out = out.replace(/[ \t]+$/g, "");
    if (options.collapseSpaces) {
      out = out.replace(/[ \t]{2,}/g, " ");
    }
    if (options.trimLines) {
      out = out.replace(/^[ \t]+/g, "");
    }
    return out;
  });

  let output = lines.join("\n");
  if (options.trimDocument) {
    output = output.trim();
  }

  const beforeChars = text.length;
  const afterChars = output.length;
  return {
    output,
    beforeChars,
    afterChars,
    removedChars: Math.max(0, beforeChars - afterChars),
  };
}

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

export type TextSortMode = "az" | "za" | "numAsc" | "numDesc";

export interface SortLinesOptions {
  /** Compare alphabetically without considering case. */
  caseInsensitive: boolean;
  /** Trim whitespace around each line before sorting. */
  trimLines: boolean;
  /** Drop duplicate lines after trimming. */
  dedupe: boolean;
  /** Keep blank lines in the output (they are placed at the end). */
  keepEmptyLines: boolean;
}

export interface SortLinesResult {
  output: string;
  lineCount: number;
  duplicatesRemoved: number;
}

function extractNumber(line: string): number | null {
  const match = line.match(/-?\d+(?:[.,]\d+)?/);
  if (!match) return null;
  const value = Number.parseFloat(match[0].replace(",", "."));
  return Number.isNaN(value) ? null : value;
}

export function sortLines(text: string, mode: TextSortMode, options: SortLinesOptions): SortLinesResult {
  let working = splitLines(text).map((raw) => (options.trimLines ? raw.trim() : raw));

  let duplicatesRemoved = 0;
  if (options.dedupe) {
    const seen = new Set<string>();
    working = working.filter((line) => {
      const key = options.caseInsensitive ? line.toLowerCase() : line;
      if (seen.has(key)) {
        duplicatesRemoved += 1;
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // Index records keep the comparator deterministic and ties stable.
  const entries = working.map((line, index) => ({
    line,
    index,
    number: extractNumber(line),
  }));

  entries.sort((a, b) => {
    const numeric = mode === "numAsc" || mode === "numDesc";
    if (numeric) {
      if (a.number !== null && b.number !== null && a.number !== b.number) {
        return mode === "numAsc" ? a.number - b.number : b.number - a.number;
      }
      if (a.number !== null && b.number === null) return -1;
      if (a.number === null && b.number !== null) return 1;
      return a.index - b.index;
    }

    const left = options.caseInsensitive ? a.line.toLowerCase() : a.line;
    const right = options.caseInsensitive ? b.line.toLowerCase() : b.line;
    const comparison = left.localeCompare(right, "en", { numeric: true });
    if (comparison !== 0) {
      return mode === "az" ? comparison : -comparison;
    }
    return a.index - b.index;
  });

  if (!options.keepEmptyLines) {
    // Move blank lines to the end, preserving their relative order.
    entries.sort((a, b) => {
      const aEmpty = a.line.trim() === "" ? 1 : 0;
      const bEmpty = b.line.trim() === "" ? 1 : 0;
      return aEmpty - bEmpty;
    });
  }

  const outputLines = entries.map((entry) => entry.line);
  return {
    output: outputLines.join("\n"),
    lineCount: outputLines.filter((line) => /\S/.test(line)).length,
    duplicatesRemoved,
  };
}

// ---------------------------------------------------------------------------
// Reversing
// ---------------------------------------------------------------------------

export type TextReverseMode = "characters" | "lines" | "words";

export function reverseText(text: string, mode: TextReverseMode): string {
  if (!text) return "";
  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  if (mode === "characters") {
    return Array.from(normalized).reverse().join("");
  }

  const lines = normalized.split("\n");
  if (mode === "lines") {
    return lines.map((line) => Array.from(line).reverse().join("")).join("\n");
  }

  // mode === "words": reverse word order inside each line
  return lines
    .map((line) => {
      const words = line.split(/\s+/).filter(Boolean);
      if (words.length === 0) return line;
      return words.reverse().join(" ");
    })
    .join("\n");
}

// ---------------------------------------------------------------------------
// Slug generation
// ---------------------------------------------------------------------------

export type SlugSeparator = "-" | "_";

export interface SlugOptions {
  separator: SlugSeparator;
  /** 0 = unlimited. */
  maxLength: number;
}

/* Letters that do not decompose under NFKD and need explicit transliteration. */
const SLUG_CHAR_MAP: Record<string, string> = {
  "ß": "ss",
  "ẞ": "ss",
  "æ": "ae",
  "Æ": "ae",
  "œ": "oe",
  "Œ": "oe",
  "ø": "o",
  "Ø": "o",
  "đ": "d",
  "Đ": "d",
  "ð": "d",
  "Ð": "d",
  "ł": "l",
  "Ł": "l",
  "þ": "th",
  "Þ": "th",
  "ı": "i",
  "ŋ": "n",
  "Ŋ": "n",
  "ĳ": "ij",
  "Ĳ": "ij",
};

/**
 * Convert arbitrary text into a URL-friendly slug.
 * "Best Online Tools For Developers!" → "best-online-tools-for-developers"
 */
export function generateSlug(text: string, options: SlugOptions): string {
  if (!text || !text.trim()) return "";
  const { separator, maxLength } = options;

  let slug = text.normalize("NFKD");

  // Transliterate characters that NFKD cannot decompose.
  slug = slug.replace(/[^\u0000-\u007F]/g, (char) => SLUG_CHAR_MAP[char] ?? char);

  // Strip combining diacritical marks produced by NFKD (é → e).
  slug = slug.replace(/[\u0300-\u036F]/g, "");

  slug = slug.toLowerCase();

  // Friendly handling of common symbols before the general cleanup.
  slug = slug.replace(/&/g, " and ");
  slug = slug.replace(/['’]/g, "");

  // Any run of non-alphanumeric characters becomes a single separator.
  const separatorRun = /[^a-z0-9]+/g;
  slug = slug.replace(separatorRun, separator);
  slug = slug.replace(new RegExp(`\\${separator}{2,}`, "g"), separator);
  slug = slug.replace(new RegExp(`^\\${separator}+|\\${separator}+$`, "g"), "");

  if (maxLength > 0 && slug.length > maxLength) {
    slug = slug.slice(0, maxLength).replace(new RegExp(`\\${separator}+$`, "g"), "");
  }

  return slug;
}

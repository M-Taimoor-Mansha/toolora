/**
 * Pure browser-local utilities for Developer Tools (Batch 1).
 *
 * Every function catches parsing/encoding errors and returns structured,
 * human-readable results — raw JavaScript exceptions or stack traces are
 * never exposed to the user.
 */

export type JsonIndentOption = "2" | "4" | "tab";

export interface JsonErrorDetails {
  message: string;
  line?: number;
  column?: number;
}

export interface JsonMetadata {
  rootType: "object" | "array" | "string" | "number" | "boolean" | "null";
  topLevelCount: number | null;
  maxDepth: number;
  byteSize: number;
  lineCount: number;
}

export type JsonParseResult =
  | {
      ok: true;
      value: unknown;
      metadata: JsonMetadata;
    }
  | {
      ok: false;
      error: JsonErrorDetails;
    };

/** Returns UTF-8 byte length of a string. */
export function getByteLength(text: string): number {
  return new TextEncoder().encode(text).byteLength;
}

/** Human-readable byte size (e.g. "248 B", "4.2 KB"). */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb < 10 ? 2 : 1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

function computeLineAndColumn(input: string, position: number): { line: number; column: number } {
  const safePos = Math.max(0, Math.min(position, input.length));
  let line = 1;
  let lastNewline = -1;
  for (let i = 0; i < safePos; i += 1) {
    if (input.charCodeAt(i) === 10) {
      line += 1;
      lastNewline = i;
    }
  }
  return { line, column: safePos - lastNewline };
}

/**
 * Converts a native JSON.parse SyntaxError into a friendly, non-technical
 * explanation with line & column when available.
 */
function friendlyJsonError(input: string, rawError: unknown): JsonErrorDetails {
  const rawMessage =
    rawError instanceof Error && typeof rawError.message === "string"
      ? rawError.message
      : "Invalid JSON syntax.";

  let line: number | undefined;
  let column: number | undefined;

  const lineColMatch = rawMessage.match(/line\s+(\d+)\s+column\s+(\d+)/i);
  const posMatch = rawMessage.match(/position\s+(\d+)/i);

  if (lineColMatch) {
    line = Number(lineColMatch[1]);
    column = Number(lineColMatch[2]);
  } else if (posMatch) {
    const pos = Number(posMatch[1]);
    if (!Number.isNaN(pos)) {
      const coords = computeLineAndColumn(input, pos);
      line = coords.line;
      column = coords.column;
    }
  }

  // Translate common V8 / SpiderMonkey / WebKit JSON error messages into clear guidance.
  let cleanMessage = "The input is not valid JSON. Check for missing quotes, commas, or brackets.";

  if (/unexpected end of json input|end of data/i.test(rawMessage)) {
    cleanMessage =
      "Unexpected end of JSON input — a closing bracket `}` or `]` or quote `\"` appears to be missing.";
  } else if (/unexpected token/i.test(rawMessage)) {
    const tokenMatch = rawMessage.match(/unexpected token\s+(.+?)(?:\s+in\s+json|\s+at\s+position|$)/i);
    const token = tokenMatch?.[1]?.trim();
    cleanMessage = token
      ? `Unexpected token ${token}. Check for trailing commas, unquoted keys, or single quotes.`
      : "Unexpected character encountered. Check for trailing commas, unquoted keys, or single quotes.";
  } else if (/property name|double-quoted/i.test(rawMessage)) {
    cleanMessage =
      "JSON property names must be wrapped in double quotes (for example: {\"name\": \"value\"}).";
  } else if (/bad control character|unterminated string/i.test(rawMessage)) {
    cleanMessage =
      "Unterminated string or unescaped control character inside a string value. Escape newlines as \\n.";
  } else if (/after json|unexpected non-whitespace/i.test(rawMessage)) {
    cleanMessage =
      "Extra characters found after the root JSON value. A JSON document can only have one root value.";
  }

  return { message: cleanMessage, line, column };
}

function measureDepth(value: unknown, current = 0): number {
  if (value === null || typeof value !== "object") return current;
  if (Array.isArray(value)) {
    if (value.length === 0) return current + 1;
    let max = current + 1;
    for (const item of value.slice(0, 200)) {
      const d = measureDepth(item, current + 1);
      if (d > max) max = d;
    }
    return max;
  }
  const entries = Object.values(value as Record<string, unknown>);
  if (entries.length === 0) return current + 1;
  let max = current + 1;
  for (const item of entries.slice(0, 200)) {
    const d = measureDepth(item, current + 1);
    if (d > max) max = d;
  }
  return max;
}

export function parseJsonSafely(input: string): JsonParseResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      ok: false,
      error: {
        message: "Please enter or paste JSON data first.",
      },
    };
  }

  try {
    const parsed: unknown = JSON.parse(input);
    let rootType: JsonMetadata["rootType"] = "null";
    let topLevelCount: number | null = null;

    if (parsed === null) {
      rootType = "null";
    } else if (Array.isArray(parsed)) {
      rootType = "array";
      topLevelCount = parsed.length;
    } else if (typeof parsed === "object") {
      rootType = "object";
      topLevelCount = Object.keys(parsed as Record<string, unknown>).length;
    } else if (typeof parsed === "string") {
      rootType = "string";
    } else if (typeof parsed === "number") {
      rootType = "number";
    } else if (typeof parsed === "boolean") {
      rootType = "boolean";
    }

    return {
      ok: true,
      value: parsed,
      metadata: {
        rootType,
        topLevelCount,
        maxDepth: measureDepth(parsed),
        byteSize: getByteLength(input),
        lineCount: input.split(/\r\n|\r|\n/).length,
      },
    };
  } catch (err) {
    return {
      ok: false,
      error: friendlyJsonError(input, err),
    };
  }
}

export function formatJson(
  input: string,
  indent: JsonIndentOption = "2",
):
  | { ok: true; output: string; metadata: JsonMetadata; outputBytes: number }
  | { ok: false; error: JsonErrorDetails } {
  const parsed = parseJsonSafely(input);
  if (!parsed.ok) return parsed;

  const space = indent === "tab" ? "\t" : Number(indent);
  const output = JSON.stringify(parsed.value, null, space);
  return {
    ok: true,
    output,
    metadata: parsed.metadata,
    outputBytes: getByteLength(output),
  };
}

export function minifyJson(input: string):
  | {
      ok: true;
      output: string;
      originalBytes: number;
      minifiedBytes: number;
      savedBytes: number;
      savedPercent: number;
    }
  | { ok: false; error: JsonErrorDetails } {
  const parsed = parseJsonSafely(input);
  if (!parsed.ok) return parsed;

  const output = JSON.stringify(parsed.value);
  const originalBytes = parsed.metadata.byteSize;
  const minifiedBytes = getByteLength(output);
  const savedBytes = Math.max(0, originalBytes - minifiedBytes);
  const savedPercent =
    originalBytes > 0 ? Math.round((savedBytes / originalBytes) * 1000) / 10 : 0;

  return {
    ok: true,
    output,
    originalBytes,
    minifiedBytes,
    savedBytes,
    savedPercent,
  };
}

/**
 * Encodes any UTF-8 string (including Unicode/emojis) to standard Base64.
 */
export function encodeBase64Utf8(
  input: string,
): { ok: true; output: string; inputBytes: number; outputBytes: number } | { ok: false; error: string } {
  if (!input) {
    return { ok: false, error: "Please enter text to encode into Base64." };
  }
  try {
    const bytes = new TextEncoder().encode(input);
    const chunkSize = 0x8000;
    let binary = "";
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const sub = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode(...sub);
    }
    const output = btoa(binary);
    return {
      ok: true,
      output,
      inputBytes: bytes.byteLength,
      outputBytes: output.length,
    };
  } catch {
    return {
      ok: false,
      error: "Could not encode the provided text into Base64.",
    };
  }
}

/**
 * Decodes standard or URL-safe Base64 into a UTF-8 string.
 * Validates character set, padding, and UTF-8 byte sequence integrity.
 */
export function decodeBase64Utf8(
  input: string,
): { ok: true; output: string; outputBytes: number } | { ok: false; error: string } {
  const stripped = input.replace(/\s+/g, "");
  if (!stripped) {
    return { ok: false, error: "Please enter a Base64 string to decode." };
  }

  // Normalize URL-safe Base64 (- and _) to standard (+ and /)
  const normalized = stripped.replace(/-/g, "+").replace(/_/g, "/");

  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized)) {
    return {
      ok: false,
      error:
        "Invalid Base64 input. Base64 strings may only contain A–Z, a–z, 0–9, +, / (or URL-safe - and _), and up to two '=' padding characters at the end.",
    };
  }

  if (normalized.length % 4 === 1) {
    return {
      ok: false,
      error:
        "Invalid Base64 length. The string appears to be truncated or missing characters.",
    };
  }

  const padded =
    normalized.length % 4 === 0
      ? normalized
      : normalized + "=".repeat(4 - (normalized.length % 4));

  try {
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder("utf-8", { fatal: true });
    const output = decoder.decode(bytes);
    return {
      ok: true,
      output,
      outputBytes: bytes.byteLength,
    };
  } catch {
    return {
      ok: false,
      error:
        "The Base64 input could not be decoded into valid UTF-8 text. Verify that the string is complete and encodes text rather than binary file data.",
    };
  }
}

export type UrlEncodeMode = "component" | "uri";

export function encodeUrlText(
  input: string,
  mode: UrlEncodeMode = "component",
): { ok: true; output: string } | { ok: false; error: string } {
  if (!input) {
    return { ok: false, error: "Please enter text or a URL to encode." };
  }
  try {
    const output = mode === "component" ? encodeURIComponent(input) : encodeURI(input);
    return { ok: true, output };
  } catch {
    return {
      ok: false,
      error:
        "The input contains an unpaired Unicode surrogate character and could not be URL-encoded.",
    };
  }
}

export function decodeUrlText(
  input: string,
  plusAsSpace = true,
): { ok: true; output: string } | { ok: false; error: string } {
  if (!input) {
    return { ok: false, error: "Please enter an encoded URL or text string to decode." };
  }
  try {
    const prepared = plusAsSpace ? input.replace(/\+/g, "%20") : input;
    const output = decodeURIComponent(prepared);
    return { ok: true, output };
  } catch {
    return {
      ok: false,
      error:
        "Malformed URL encoding detected. Make sure every '%' symbol is followed by two valid hexadecimal digits (for example, %20) and forms a complete UTF-8 sequence.",
    };
  }
}

/**
 * Generates a standards-compliant RFC 4122 version 4 UUID using browser
 * Web Crypto APIs (`crypto.randomUUID()` with `crypto.getRandomValues` fallback).
 */
export function generateUuidV4(): string {
  if (typeof globalThis.crypto !== "undefined") {
    if (typeof globalThis.crypto.randomUUID === "function") {
      return globalThis.crypto.randomUUID();
    }
    if (typeof globalThis.crypto.getRandomValues === "function") {
      const bytes = new Uint8Array(16);
      globalThis.crypto.getRandomValues(bytes);
      // Per RFC 4122 section 4.4: set version to 4 and variant to RFC 4122
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
      return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
    }
  }
  // Fallback only if Web Crypto is unavailable in an exotic environment
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (ch) => {
    const r = (Math.random() * 16) | 0;
    const v = ch === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface UuidFormatOptions {
  uppercase?: boolean;
  hyphens?: boolean;
}

export function formatUuid(uuid: string, options: UuidFormatOptions = {}): string {
  const { uppercase = false, hyphens = true } = options;
  const cleaned = hyphens ? uuid : uuid.replace(/-/g, "");
  return uppercase ? cleaned.toUpperCase() : cleaned.toLowerCase();
}

/** Triggers a browser download of a text/JSON blob without any server interaction. */
export function downloadTextFile(content: string, filename: string, mimeType = "text/plain;charset=utf-8"): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

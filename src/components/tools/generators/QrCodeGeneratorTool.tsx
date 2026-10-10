"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import QRCode from "qrcode";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface QrCodeGeneratorToolProps {
  tool: Tool;
}

type ErrorLevel = "L" | "M" | "Q" | "H";

const ERROR_LEVELS: { value: ErrorLevel; label: string }[] = [
  { value: "L", label: "L — Low (7%)" },
  { value: "M", label: "M — Medium (15%)" },
  { value: "Q", label: "Q — Quartile (25%)" },
  { value: "H", label: "H — High (30%)" },
];

const SAMPLE_TEXT = "https://toolora-green.vercel.app";

export function QrCodeGeneratorTool({ tool }: QrCodeGeneratorToolProps) {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>("M");
  const [fgColor, setFgColor] = useState("#0a0a0d");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [margin, setMargin] = useState(2);
  const [dataUrl, setDataUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR code whenever settings change
  useEffect(() => {
    const generate = async () => {
      if (!text.trim()) {
        setDataUrl("");
        setError(null);
        return;
      }

      try {
        const url = await QRCode.toDataURL(text, {
          width: size,
          margin,
          errorCorrectionLevel: errorLevel,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        });
        setDataUrl(url);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to generate QR code"
        );
        setDataUrl("");
      }
    };

    generate();
  }, [text, size, errorLevel, fgColor, bgColor, margin]);

  const download = useCallback(() => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [dataUrl]);

  const copyImage = useCallback(async () => {
    if (!dataUrl) return;
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: copy URL text
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        /* ignore */
      }
    }
  }, [dataUrl, text]);

  const reset = useCallback(() => {
    setText("");
    setSize(256);
    setErrorLevel("M");
    setFgColor("#0a0a0d");
    setBgColor("#ffffff");
    setMargin(2);
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-semibold text-ink">
            Text or URL to Encode
          </label>
          <button
            onClick={() => setText(SAMPLE_TEXT)}
            className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
          >
            Load sample
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com or any text"
          className="h-24 w-full resize-y rounded-xl border border-line bg-surface p-4 font-mono text-sm text-ink outline-none transition-colors focus:border-brand-500"
          spellCheck={false}
        />
        {text && (
          <button
            onClick={() => setText("")}
            className="mt-2 text-xs font-semibold text-ink-3 hover:text-ink-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          <div className="flex items-start gap-2">
            <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Options + Preview */}
      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        {/* Options */}
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-5">
          {/* Size */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-ink">
                Size (px)
              </label>
              <span className="rounded-lg bg-surface-2 px-2.5 py-0.5 font-mono text-xs font-bold text-ink">
                {size}
              </span>
            </div>
            <input
              type="range"
              min={128}
              max={512}
              step={32}
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value, 10))}
              className="mt-3 w-full accent-brand-600"
            />
          </div>

          {/* Error Correction */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              Error Correction
            </label>
            <select
              value={errorLevel}
              onChange={(e) => setErrorLevel(e.target.value as ErrorLevel)}
              className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm font-semibold text-ink outline-none transition-colors focus:border-brand-500"
            >
              {ERROR_LEVELS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Foreground
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded-lg border border-line"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-full rounded-lg border border-line bg-canvas px-3 py-2 font-mono text-xs text-ink outline-none focus:border-brand-500"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Background
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded-lg border border-line"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full rounded-lg border border-line bg-canvas px-3 py-2 font-mono text-xs text-ink outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Margin */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-ink">Margin</label>
              <span className="rounded-lg bg-surface-2 px-2.5 py-0.5 font-mono text-xs font-bold text-ink">
                {margin}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={8}
              value={margin}
              onChange={(e) => setMargin(parseInt(e.target.value, 10))}
              className="mt-3 w-full accent-brand-600"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-2xl border border-line bg-surface p-6 lg:w-72">
          <p className="mb-3 text-sm font-semibold text-ink">Preview</p>
          {dataUrl ? (
            <div className="flex flex-col items-center gap-4">
              <img
                src={dataUrl}
                alt="QR Code"
                className="h-56 w-56 rounded-xl border border-line"
              />
              <p className="break-all text-center text-xs text-ink-3">
                {text.length > 60 ? text.slice(0, 60) + "..." : text}
              </p>
            </div>
          ) : (
            <div className="flex h-56 w-56 items-center justify-center rounded-xl border border-dashed border-line bg-canvas text-center">
              <p className="px-4 text-xs text-ink-3">
                Enter text or a URL to generate a QR code
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={download}
          disabled={!dataUrl}
          className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
        >
          Download PNG
        </button>
        <button
          onClick={copyImage}
          disabled={!dataUrl}
          className="rounded-xl border border-line bg-surface px-6 py-3 text-sm font-bold text-ink-2 transition-colors hover:border-brand-400 disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy Image"}
        </button>
        <button
          onClick={reset}
          className="rounded-xl border border-line bg-surface px-6 py-3 text-sm font-bold text-ink-2 transition-colors hover:border-brand-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
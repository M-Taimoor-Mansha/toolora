"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface ImageCompressorToolProps {
  tool: Tool;
}

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

interface CompressedResult {
  url: string;
  size: number;
  width: number;
  height: number;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function ImageCompressorTool({ tool }: ImageCompressorToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(75);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [maxWidth, setMaxWidth] = useState<string>("");
  const [maxHeight, setMaxHeight] = useState<string>("");
  const [result, setResult] = useState<CompressedResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    if (selectedFile.size > 50 * 1024 * 1024) {
      alert("File is too large. Maximum size is 50 MB.");
      return;
    }
    setFile(selectedFile);
    setResult(null);
    const url = URL.createObjectURL(selectedFile);
    setOriginalUrl(url);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  const compress = useCallback(async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      let targetW = img.naturalWidth;
      let targetH = img.naturalHeight;

      const mw = parseInt(maxWidth, 10);
      const mh = parseInt(maxHeight, 10);

      if (mw && targetW > mw) {
        targetH = Math.round((targetH * mw) / targetW);
        targetW = mw;
      }
      if (mh && targetH > mh) {
        targetW = Math.round((targetW * mh) / targetH);
        targetH = mh;
      }

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      if (format === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, targetW, targetH);
      }
      ctx.drawImage(img, 0, 0, targetW, targetH);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, format, quality / 100)
      );

      if (!blob) throw new Error("Compression failed");

      if (result?.url) URL.revokeObjectURL(result.url);
      const url = URL.createObjectURL(blob);
      setResult({
        url,
        size: blob.size,
        width: targetW,
        height: targetH,
      });
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Compression failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  }, [file, format, quality, maxWidth, maxHeight, result]);

  const download = useCallback(() => {
    if (!result || !file) return;
    const ext = format.split("/")[1].replace("jpeg", "jpg");
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${baseName}-compressed.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [result, file, format]);

  const reset = useCallback(() => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setOriginalUrl(null);
    setResult(null);
    setMaxWidth("");
    setMaxHeight("");
    if (inputRef.current) inputRef.current.value = "";
  }, [originalUrl, result]);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (result?.url) URL.revokeObjectURL(result.url);
    };
  }, [originalUrl, result]);

  return (
    <div className="space-y-6">
      {/* Upload */}
      {!file ? (
        <div
          onDrop={onDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
            isDragging
              ? "border-brand-500 bg-brand-50 dark:bg-brand-950/20"
              : "border-line bg-surface hover:border-brand-400"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white">
            <Icon name="arrowUpRight" className="h-7 w-7" />
          </span>
          <p className="mt-4 text-base font-semibold text-ink">
            Drop your image here or click to upload
          </p>
          <p className="mt-1 text-sm text-ink-3">
            JPEG, PNG, or WebP · Maximum 50 MB
          </p>
        </div>
      ) : (
        <>
          {/* Preview */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-3">
                Original
              </p>
              {originalUrl && (
                <img
                  src={originalUrl}
                  alt="Original"
                  className="max-h-48 w-full rounded-lg object-contain"
                />
              )}
              <p className="mt-3 text-sm font-semibold text-ink">
                {formatBytes(file.size)}
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-3">
                Compressed
              </p>
              {result ? (
                <>
                  <img
                    src={result.url}
                    alt="Compressed"
                    className="max-h-48 w-full rounded-lg object-contain"
                  />
                  <p className="mt-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatBytes(result.size)}
                    <span className="ml-2 text-xs font-normal text-ink-3">
                      (
                      {Math.round(
                        (1 - result.size / file.size) * 100
                      )}
                      % smaller)
                    </span>
                  </p>
                </>
              ) : (
                <div className="flex h-48 items-center justify-center text-sm text-ink-3">
                  Click Compress to preview
                </div>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="rounded-2xl border border-line bg-surface p-6 space-y-5">
            {/* Quality */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-ink">
                  Quality
                </label>
                <span className="rounded-lg bg-surface-2 px-3 py-1 font-mono text-sm font-bold text-ink">
                  {quality}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value, 10))}
                className="mt-3 w-full accent-brand-600"
              />
            </div>

            {/* Format */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">
                Output Format
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "image/jpeg" as const, label: "JPEG" },
                  { value: "image/png" as const, label: "PNG" },
                  { value: "image/webp" as const, label: "WebP" },
                ].map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFormat(f.value)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      format === f.value
                        ? "bg-brand-600 text-white"
                        : "border border-line bg-canvas text-ink-2 hover:border-brand-400"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Resize */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  Max Width (px) — optional
                </label>
                <input
                  type="number"
                  value={maxWidth}
                  onChange={(e) => setMaxWidth(e.target.value)}
                  placeholder="e.g. 1920"
                  className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  Max Height (px) — optional
                </label>
                <input
                  type="number"
                  value={maxHeight}
                  onChange={(e) => setMaxHeight(e.target.value)}
                  placeholder="e.g. 1080"
                  className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={compress}
              disabled={isProcessing}
              className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
            >
              {isProcessing ? "Compressing..." : "Compress Image"}
            </button>
            {result && (
              <button
                onClick={download}
                className="rounded-xl border border-line bg-surface px-6 py-3 text-sm font-bold text-ink-2 transition-colors hover:border-brand-400"
              >
                Download
              </button>
            )}
            <button
              onClick={reset}
              className="rounded-xl border border-line bg-surface px-6 py-3 text-sm font-bold text-ink-2 transition-colors hover:border-brand-400"
            >
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
}
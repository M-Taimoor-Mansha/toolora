"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface ImageResizerToolProps {
  tool: Tool;
}

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";
type ResizeMode = "dimensions" | "percentage" | "preset";

interface Preset {
  label: string;
  width: number;
  height: number;
}

const PRESETS: Preset[] = [
  { label: "Instagram Post", width: 1080, height: 1080 },
  { label: "Instagram Story", width: 1080, height: 1920 },
  { label: "Facebook Post", width: 1200, height: 630 },
  { label: "Twitter Post", width: 1600, height: 900 },
  { label: "YouTube Thumbnail", width: 1280, height: 720 },
  { label: "LinkedIn Post", width: 1200, height: 627 },
];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function ImageResizerTool({ tool }: ImageResizerToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalDims, setOriginalDims] = useState<{ w: number; h: number } | null>(null);

  const [mode, setMode] = useState<ResizeMode>("dimensions");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [lockAspect, setLockAspect] = useState(true);
  const [percentage, setPercentage] = useState(50);
  const [presetIdx, setPresetIdx] = useState(0);

  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(85);

  const [result, setResult] = useState<{ url: string; size: number; w: number; h: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setOriginalUrl(null);
    setOriginalDims(null);
    setResult(null);
    setWidth("");
    setHeight("");
    if (inputRef.current) inputRef.current.value = "";
  }, [originalUrl, result]);

  const handleFile = useCallback(
    (selectedFile: File) => {
      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      if (selectedFile.size > 50 * 1024 * 1024) {
        alert("File is too large. Maximum size is 50 MB.");
        return;
      }

      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (result?.url) URL.revokeObjectURL(result.url);

      setFile(selectedFile);
      setResult(null);

      const url = URL.createObjectURL(selectedFile);
      setOriginalUrl(url);

      const img = new Image();
      img.onload = () => {
        setOriginalDims({ w: img.naturalWidth, h: img.naturalHeight });
        setWidth(String(img.naturalWidth));
        setHeight(String(img.naturalHeight));
      };
      img.src = url;
    },
    [originalUrl, result]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  // Sync width/height when lock aspect is on
  const handleWidthChange = (v: string) => {
    setWidth(v);
    if (lockAspect && originalDims) {
      const w = parseFloat(v);
      if (!isNaN(w) && w > 0) {
        const newH = Math.round((w * originalDims.h) / originalDims.w);
        setHeight(String(newH));
      }
    }
  };

  const handleHeightChange = (v: string) => {
    setHeight(v);
    if (lockAspect && originalDims) {
      const h = parseFloat(v);
      if (!isNaN(h) && h > 0) {
        const newW = Math.round((h * originalDims.w) / originalDims.h);
        setWidth(String(newW));
      }
    }
  };

  // Compute final target dimensions
  const targetDims = (() => {
    if (!originalDims) return null;
    if (mode === "dimensions") {
      const w = parseInt(width, 10);
      const h = parseInt(height, 10);
      if (isNaN(w) || isNaN(h) || w < 1 || h < 1) return null;
      return { w, h };
    }
    if (mode === "percentage") {
      const scale = percentage / 100;
      return {
        w: Math.round(originalDims.w * scale),
        h: Math.round(originalDims.h * scale),
      };
    }
    // preset
    const preset = PRESETS[presetIdx];
    return { w: preset.width, h: preset.height };
  })();

  const resize = useCallback(async () => {
    if (!file || !targetDims) return;
    setIsProcessing(true);

    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = targetDims.w;
      canvas.height = targetDims.h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      if (format === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, targetDims.w, targetDims.h);
      }
      ctx.drawImage(img, 0, 0, targetDims.w, targetDims.h);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, format, quality / 100)
      );
      if (!blob) throw new Error("Resize failed");

      if (result?.url) URL.revokeObjectURL(result.url);
      const url = URL.createObjectURL(blob);
      setResult({
        url,
        size: blob.size,
        w: targetDims.w,
        h: targetDims.h,
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Resize failed.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, targetDims, format, quality, result]);

  const download = useCallback(() => {
    if (!result || !file) return;
    const ext = format.split("/")[1].replace("jpeg", "jpg");
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${baseName}-${result.w}x${result.h}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [result, file, format]);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (result?.url) URL.revokeObjectURL(result.url);
    };
  }, [originalUrl, result]);

  const inputClass =
    "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500";

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
                {originalDims?.w} × {originalDims?.h} px
              </p>
              <p className="text-xs text-ink-3">{formatBytes(file.size)}</p>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-3">
                Resized
              </p>
              {result ? (
                <>
                  <img
                    src={result.url}
                    alt="Resized"
                    className="max-h-48 w-full rounded-lg object-contain"
                  />
                  <p className="mt-3 text-sm font-semibold text-ink">
                    {result.w} × {result.h} px
                  </p>
                  <p className="text-xs text-ink-3">
                    {formatBytes(result.size)}
                  </p>
                </>
              ) : (
                <div className="flex h-48 items-center justify-center text-sm text-ink-3">
                  Click Resize to preview
                </div>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="rounded-2xl border border-line bg-surface p-6 space-y-5">
            {/* Mode */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">
                Resize Method
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "dimensions" as const, label: "Exact Dimensions" },
                  { value: "percentage" as const, label: "Percentage" },
                  { value: "preset" as const, label: "Platform Preset" },
                ].map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMode(m.value)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      mode === m.value
                        ? "bg-brand-600 text-white"
                        : "border border-line bg-canvas text-ink-2 hover:border-brand-400"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            {mode === "dimensions" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <label className="flex cursor-pointer items-center gap-3 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={lockAspect}
                    onChange={(e) => setLockAspect(e.target.checked)}
                    className="h-4 w-4 accent-brand-600"
                  />
                  <span className="text-sm font-medium text-ink-2">
                    Lock aspect ratio
                  </span>
                </label>
              </div>
            )}

            {/* Percentage */}
            {mode === "percentage" && (
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-ink">Scale</label>
                  <span className="rounded-lg bg-surface-2 px-2.5 py-0.5 font-mono text-xs font-bold text-ink">
                    {percentage}%
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={percentage}
                  onChange={(e) => setPercentage(parseInt(e.target.value, 10))}
                  className="mt-3 w-full accent-brand-600"
                />
                <div className="mt-1 flex justify-between text-xs text-ink-3">
                  <span>5%</span>
                  <span>200%</span>
                </div>
              </div>
            )}

            {/* Preset */}
            {mode === "preset" && (
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  Platform
                </label>
                <select
                  value={presetIdx}
                  onChange={(e) => setPresetIdx(parseInt(e.target.value, 10))}
                  className={inputClass}
                >
                  {PRESETS.map((p, i) => (
                    <option key={p.label} value={i}>
                      {p.label} — {p.width}×{p.height}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Output Format */}
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

            {/* Quality (not for PNG) */}
            {format !== "image/png" && (
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-ink">Quality</label>
                  <span className="rounded-lg bg-surface-2 px-2.5 py-0.5 font-mono text-xs font-bold text-ink">
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
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={resize}
              disabled={!targetDims || isProcessing}
              className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
            >
              {isProcessing ? "Resizing..." : "Resize Image"}
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
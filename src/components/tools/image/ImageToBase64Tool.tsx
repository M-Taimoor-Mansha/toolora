"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface ImageToBase64ToolProps {
  tool: Tool;
}

type OutputFormat = "raw" | "datauri" | "css" | "html";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <button
      onClick={copy}
      disabled={!text}
      className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink-3 transition-colors hover:border-brand-400 hover:text-ink-2 disabled:opacity-40"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function ImageToBase64Tool({ tool }: ImageToBase64ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64, setBase64] = useState<string>("");
  const [dataUri, setDataUri] = useState<string>("");
  const [format, setFormat] = useState<OutputFormat>("datauri");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setBase64("");
    setDataUri("");
    if (inputRef.current) inputRef.current.value = "";
  }, [previewUrl]);

  const handleFile = useCallback(
    (selectedFile: File) => {
      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File is too large. Maximum size is 10 MB.");
        return;
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setIsProcessing(true);
      setBase64("");
      setDataUri("");

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setDataUri(result);
        const commaIdx = result.indexOf(",");
        setBase64(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
        setIsProcessing(false);
      };
      reader.onerror = () => {
        alert("Failed to read file.");
        setIsProcessing(false);
      };
      reader.readAsDataURL(selectedFile);
    },
    [previewUrl]
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

  const outputText = useMemo(() => {
    if (!base64 || !dataUri) return "";
    switch (format) {
      case "raw":
        return base64;
      case "datauri":
        return dataUri;
      case "css":
        return `background-image: url('${dataUri}');`;
      case "html":
        return `<img src="${dataUri}" alt="image" />`;
      default:
        return base64;
    }
  }, [base64, dataUri, format]);

  const copyOutput = useCallback(async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }, [outputText]);

  const download = useCallback(() => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `base64-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [outputText]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const formats: { value: OutputFormat; label: string }[] = [
    { value: "datauri", label: "Data URI" },
    { value: "raw", label: "Raw Base64" },
    { value: "css", label: "CSS" },
    { value: "html", label: "HTML" },
  ];

  // Size stats
  const originalSize = file?.size ?? 0;
  const base64Size = base64.length;
  const sizeIncrease = originalSize
    ? Math.round(((base64Size - originalSize) / originalSize) * 100)
    : 0;

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
            JPEG, PNG, GIF, WebP, SVG · Maximum 10 MB
          </p>
        </div>
      ) : (
        <>
          {/* Preview + Stats */}
          <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
            <div className="rounded-2xl border border-line bg-surface p-4">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-32 w-full rounded-lg object-contain sm:max-h-40 sm:w-auto"
                />
              )}
            </div>
            <div className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-ink-3">
                File Info
              </p>
              <p className="mt-2 break-all text-sm font-semibold text-ink">
                {file.name}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-ink-3">Original Size</p>
                  <p className="font-mono font-semibold text-ink">
                    {formatBytes(originalSize)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-ink-3">Base64 Size</p>
                  <p className="font-mono font-semibold text-ink">
                    {isProcessing ? "..." : formatBytes(base64Size)}
                  </p>
                </div>
              </div>
              {!isProcessing && sizeIncrease > 0 && (
                <p className="mt-3 text-xs text-ink-3">
                  Base64 is{" "}
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    +{sizeIncrease}%
                  </span>{" "}
                  larger than the original
                </p>
              )}
            </div>
          </div>

          {/* Format Selector */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">
              Output Format
            </label>
            <div className="flex flex-wrap gap-2">
              {formats.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFormat(f.value)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    format === f.value
                      ? "bg-brand-600 text-white"
                      : "border border-line bg-surface text-ink-2 hover:border-brand-400"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Output */}
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-ink">Output</h3>
              <CopyButton text={outputText} />
            </div>
            <textarea
              readOnly
              value={isProcessing ? "Processing..." : outputText}
              className="h-48 w-full resize-y rounded-xl border border-line bg-canvas p-4 font-mono text-xs text-ink-2 outline-none"
              spellCheck={false}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={copyOutput}
              disabled={!outputText || isProcessing}
              className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
            >
              {copied ? "Copied!" : "Copy Base64"}
            </button>
            <button
              onClick={download}
              disabled={!outputText || isProcessing}
              className="rounded-xl border border-line bg-surface px-6 py-3 text-sm font-bold text-ink-2 transition-colors hover:border-brand-400 disabled:opacity-50"
            >
              Download .txt
            </button>
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
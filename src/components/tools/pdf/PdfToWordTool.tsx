"use client";

import { useState, useRef, useCallback } from "react";
import type { Tool } from "@/data/types";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons";

interface PdfToWordToolProps {
  tool: Tool;
}

type Status = "idle" | "processing" | "done" | "error";

export function PdfToWordTool({ tool }: PdfToWordToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setFile(null);
    setStatus("idle");
    setMessage("");
    setDownloadUrl(null);
    setDownloadName("");
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const handleFile = useCallback((selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      setStatus("error");
      setMessage("Please select a valid PDF file.");
      return;
    }
    if (selectedFile.size > 50 * 1024 * 1024) {
      setStatus("error");
      setMessage("File is too large. Maximum size is 50 MB.");
      return;
    }
    setFile(selectedFile);
    setStatus("idle");
    setMessage("");
    setDownloadUrl(null);
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

  const convert = useCallback(async () => {
    if (!file) return;
    setStatus("processing");
    setMessage("Converting your PDF... This may take a few seconds.");

    try {
      const arrayBuffer = await file.arrayBuffer();

      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

      const pdf = await pdfjs.getDocument({
        data: new Uint8Array(arrayBuffer),
        useSystemFonts: true,
      }).promise;

      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: unknown) => {
            const textItem = item as { str?: string };
            return textItem.str ?? "";
          })
          .join(" ");
        fullText += pageText + "\n\n";
      }

      if (!fullText.trim()) {
        throw new Error(
          "No text found in this PDF. It may be a scanned image. Please use OCR software first."
        );
      }

      const paragraphs = fullText
        .split("\n\n")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      const htmlBody = paragraphs.map((p) => `<p>${p}</p>`).join("");

      const fullHtml = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${file.name}</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
</w:WordDocument>
</xml>
<![endif]-->
<style>
body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.5; }
p { margin: 0 0 10pt 0; }
</style>
</head>
<body>${htmlBody}</body>
</html>`;

      const blob = new Blob([fullHtml], { type: "application/msword" });
      const url = URL.createObjectURL(blob);
      const name = file.name.replace(/\.pdf$/i, ".doc");

      setDownloadUrl(url);
      setDownloadName(name);
      setStatus("done");
      setMessage("Conversion complete! Click Download to save your Word file.");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Conversion failed. The PDF may be corrupted or password-protected.";
      setStatus("error");
      setMessage(errorMessage);
    }
  }, [file]);

  const download = useCallback(() => {
    if (!downloadUrl || !downloadName) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [downloadUrl, downloadName]);

  return (
    <div className="space-y-6">
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
          accept="application/pdf"
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
          {file ? file.name : "Drop your PDF here or click to upload"}
        </p>
        <p className="mt-1 text-sm text-ink-3">
          {file
            ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
            : "Maximum 50 MB · PDF files only"}
        </p>
      </div>

      {message ? (
        <div
          className={`rounded-xl border p-4 text-sm ${
            status === "error"
              ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
              : status === "done"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
                : "border-line bg-surface text-ink-2"
          }`}
        >
          {message}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={convert}
          disabled={!file || status === "processing"}
          variant="primary"
        >
          {status === "processing" ? "Converting..." : "Convert to Word"}
        </Button>
        {downloadUrl ? (
          <Button onClick={download} variant="secondary">
            Download Word File
          </Button>
        ) : null}
        <Button onClick={reset} variant="ghost">
          Reset
        </Button>
      </div>
    </div>
  );
}
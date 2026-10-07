"use client";

import { useState, useEffect } from "react";
import SparkMD5 from "spark-md5";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface HashGeneratorToolProps {
  tool: Tool;
}

interface HashResult {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha(algorithm: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  return bufferToHex(hashBuffer);
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

export function HashGeneratorTool({ tool }: HashGeneratorToolProps) {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<HashResult>({
    md5: "",
    sha1: "",
    sha256: "",
    sha512: "",
  });
  const [isComputing, setIsComputing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const compute = async () => {
      if (!input) {
        setHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
        setError(null);
        setIsComputing(false);
        return;
      }

      setIsComputing(true);
      setError(null);

      // MD5 — spark-md5 (battle-tested library, no bugs)
      let md5Hash = "";
      try {
        md5Hash = SparkMD5.hash(input);
      } catch (err) {
        console.error("MD5 error:", err);
        md5Hash = "(MD5 failed)";
      }

      // SHA hashes — Web Crypto API
      try {
        const [sha1, sha256, sha512] = await Promise.all([
          sha("SHA-1", input),
          sha("SHA-256", input),
          sha("SHA-512", input),
        ]);

        if (cancelled) return;

        setHashes({
          md5: md5Hash,
          sha1,
          sha256,
          sha512,
        });
      } catch (err) {
        console.error("SHA error:", err);
        if (cancelled) return;
        setError(
          err instanceof Error
            ? err.message
            : "Failed to compute SHA hashes."
        );
        setHashes({
          md5: md5Hash,
          sha1: "(unavailable)",
          sha256: "(unavailable)",
          sha512: "(unavailable)",
        });
      } finally {
        if (!cancelled) setIsComputing(false);
      }
    };

    compute();
    return () => {
      cancelled = true;
    };
  }, [input]);

  const algorithms: {
    key: keyof HashResult;
    label: string;
    description: string;
    color: string;
  }[] = [
    {
      key: "md5",
      label: "MD5",
      description: "128-bit (legacy, not secure)",
      color: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300",
    },
    {
      key: "sha1",
      label: "SHA-1",
      description: "160-bit (deprecated for security)",
      color:
        "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    },
    {
      key: "sha256",
      label: "SHA-256",
      description: "256-bit (recommended)",
      color:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    },
    {
      key: "sha512",
      label: "SHA-512",
      description: "512-bit (strongest)",
      color:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-ink">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text to hash..."
          className="h-32 w-full resize-y rounded-xl border border-line bg-surface p-4 font-mono text-sm text-ink outline-none transition-colors focus:border-brand-500"
          spellCheck={false}
        />
        {input && (
          <button
            onClick={() => setInput("")}
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

      {/* Hash Results */}
      {input ? (
        <div className="space-y-4">
          {algorithms.map((algo) => (
            <div
              key={algo.key}
              className="rounded-2xl border border-line bg-surface p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-bold ${algo.color}`}
                  >
                    {algo.label}
                  </span>
                  <span className="text-xs text-ink-3">
                    {algo.description}
                  </span>
                </div>
                <CopyButton text={hashes[algo.key]} />
              </div>
              <pre className="overflow-x-auto break-all rounded-xl bg-canvas p-4 font-mono text-xs text-ink-2">
                {isComputing
                  ? "Computing..."
                  : hashes[algo.key] || "(not available)"}
              </pre>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
          <Icon name="info" className="mx-auto h-8 w-8 text-ink-3" />
          <p className="mt-3 text-sm text-ink-3">
            Type something above to see MD5, SHA-1, SHA-256, and SHA-512 hashes.
          </p>
        </div>
      )}
    </div>
  );
}
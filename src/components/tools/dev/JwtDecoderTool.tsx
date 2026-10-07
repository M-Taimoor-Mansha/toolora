"use client";

import { useState, useMemo } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface JwtDecoderToolProps {
  tool: Tool;
}

interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  raw: { header: string; payload: string };
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  try {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    throw new Error("Invalid Base64-URL encoding");
  }
}

function decodeJwt(token: string): DecodedJwt {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    throw new Error(
      "Invalid JWT format. A JWT must have exactly 3 parts separated by dots."
    );
  }

  const [headerB64, payloadB64, signature] = parts;

  let header: Record<string, unknown>;
  let payload: Record<string, unknown>;
  let rawHeader: string;
  let rawPayload: string;

  try {
    rawHeader = base64UrlDecode(headerB64);
    header = JSON.parse(rawHeader);
  } catch {
    throw new Error("Failed to decode JWT header.");
  }

  try {
    rawPayload = base64UrlDecode(payloadB64);
    payload = JSON.parse(rawPayload);
  } catch {
    throw new Error("Failed to decode JWT payload.");
  }

  return {
    header,
    payload,
    signature,
    raw: { header: rawHeader, payload: rawPayload },
  };
}

function formatTimestamp(ts: unknown): string {
  if (typeof ts !== "number") return "";
  const date = new Date(ts * 1000);
  return date.toLocaleString();
}

function getExpiryStatus(payload: Record<string, unknown>): {
  status: "valid" | "expired" | "none";
  message: string;
} {
  const exp = payload.exp;
  if (typeof exp !== "number") {
    return { status: "none", message: "No expiration set" };
  }
  const now = Math.floor(Date.now() / 1000);
  if (now > exp) {
    const expiredAgo = now - exp;
    const days = Math.floor(expiredAgo / 86400);
    const hours = Math.floor((expiredAgo % 86400) / 3600);
    return {
      status: "expired",
      message: `Expired ${days > 0 ? `${days}d ` : ""}${hours}h ago`,
    };
  }
  const expiresIn = exp - now;
  const days = Math.floor(expiresIn / 86400);
  const hours = Math.floor((expiresIn % 86400) / 3600);
  const minutes = Math.floor((expiresIn % 3600) / 60);
  const timeStr =
    days > 0
      ? `${days}d ${hours}h`
      : hours > 0
        ? `${hours}h ${minutes}m`
        : `${minutes}m`;
  return { status: "valid", message: `Expires in ${timeStr}` };
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
      className="rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-ink-3 transition-colors hover:border-brand-400 hover:text-ink-2"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export function JwtDecoderTool({ tool }: JwtDecoderToolProps) {
  const [token, setToken] = useState("");

  const result = useMemo(() => {
    if (!token.trim()) return null;
    try {
      const decoded = decodeJwt(token);
      return { success: true as const, data: decoded };
    } catch (err) {
      return {
        success: false as const,
        error: err instanceof Error ? err.message : "Failed to decode JWT",
      };
    }
  }, [token]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-semibold text-ink">JWT Token</label>
          <button
            onClick={() => setToken(SAMPLE_JWT)}
            className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
          >
            Load sample
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT here (e.g. eyJhbGciOi...)"
          className="h-32 w-full resize-y rounded-xl border border-line bg-surface p-4 font-mono text-sm text-ink outline-none transition-colors focus:border-brand-500"
          spellCheck={false}
        />
        {token && (
          <button
            onClick={() => setToken("")}
            className="mt-2 text-xs font-semibold text-ink-3 hover:text-ink-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Error */}
      {result && !result.success && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          <div className="flex items-start gap-2">
            <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{result.error}</span>
          </div>
        </div>
      )}

      {/* Decoded */}
      {result && result.success && (
        <>
          {/* Expiry Badge */}
          {(() => {
            const expiry = getExpiryStatus(result.data.payload);
            if (expiry.status === "none") return null;
            return (
              <div
                className={`rounded-xl border p-4 text-sm font-semibold ${
                  expiry.status === "valid"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    name={expiry.status === "valid" ? "check" : "alert"}
                    className="h-4 w-4"
                  />
                  <span>
                    {expiry.status === "valid" ? "Valid token" : "Expired token"}
                    {" — "}
                    {expiry.message}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Header */}
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                <span className="rounded-md bg-brand-100 px-2 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
                  HEADER
                </span>
                <span className="text-ink-3">Algorithm & Token Type</span>
              </h3>
              <CopyButton text={JSON.stringify(result.data.header, null, 2)} />
            </div>
            <pre className="overflow-x-auto rounded-xl bg-canvas p-4 font-mono text-xs text-ink-2">
              {JSON.stringify(result.data.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  PAYLOAD
                </span>
                <span className="text-ink-3">Claims & Data</span>
              </h3>
              <CopyButton text={JSON.stringify(result.data.payload, null, 2)} />
            </div>
            <pre className="overflow-x-auto rounded-xl bg-canvas p-4 font-mono text-xs text-ink-2">
              {JSON.stringify(result.data.payload, null, 2)}
            </pre>

            {/* Human-readable timestamps */}
            {(typeof result.data.payload.exp === "number" ||
              typeof result.data.payload.iat === "number" ||
              typeof result.data.payload.nbf === "number") && (
              <div className="mt-4 space-y-1 border-t border-line pt-4 text-xs text-ink-3">
                {typeof result.data.payload.iat === "number" && (
                  <p>
                    <span className="font-semibold">Issued At (iat):</span>{" "}
                    {formatTimestamp(result.data.payload.iat)}
                  </p>
                )}
                {typeof result.data.payload.nbf === "number" && (
                  <p>
                    <span className="font-semibold">Not Before (nbf):</span>{" "}
                    {formatTimestamp(result.data.payload.nbf)}
                  </p>
                )}
                {typeof result.data.payload.exp === "number" && (
                  <p>
                    <span className="font-semibold">Expires At (exp):</span>{" "}
                    {formatTimestamp(result.data.payload.exp)}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Signature */}
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                  SIGNATURE
                </span>
                <span className="text-ink-3">Raw signature (not verified)</span>
              </h3>
              <CopyButton text={result.data.signature} />
            </div>
            <pre className="overflow-x-auto break-all rounded-xl bg-canvas p-4 font-mono text-xs text-ink-2">
              {result.data.signature}
            </pre>
            <p className="mt-3 text-xs text-ink-3">
              Signature is not verified — this tool only decodes. Verification
              requires the secret or public key.
            </p>
          </div>
        </>
      )}

      {/* Empty state */}
      {!token.trim() && (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
          <Icon name="info" className="mx-auto h-8 w-8 text-ink-3" />
          <p className="mt-3 text-sm text-ink-3">
            Paste a JWT above to decode its header, payload, and signature.
          </p>
        </div>
      )}
    </div>
  );
}
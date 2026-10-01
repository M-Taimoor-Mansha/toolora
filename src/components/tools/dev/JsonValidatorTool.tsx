"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button } from "@/components/ui/Button";
import {
  formatBytes,
  parseJsonSafely,
  type JsonErrorDetails,
  type JsonMetadata,
} from "@/lib/dev-tools";
import { CodeTextarea } from "./CodeTextarea";
import { CopyButton } from "./CopyButton";
import { ToolActions } from "./ToolActions";
import { ValidationMessage } from "./ValidationMessage";

const VALID_SAMPLE = `{
  "service": "Toolora",
  "status": "operational",
  "tools": ["json-formatter", "json-validator", "json-minifier"],
  "clientSideOnly": true
}`;

const INVALID_SAMPLE = `{
  "service": "Toolora",
  "status": "operational",
  "trailingComma": true,
}`;

type ValidationState =
  | { status: "idle" }
  | { status: "valid"; metadata: JsonMetadata; formattedPreview: string }
  | { status: "invalid"; error: JsonErrorDetails };

export function JsonValidatorTool() {
  const [input, setInput] = useState("");
  const [state, setState] = useState<ValidationState>({ status: "idle" });

  function runValidation(source: string = input) {
    const result = parseJsonSafely(source);
    if (!result.ok) {
      setState({ status: "invalid", error: result.error });
      return;
    }
    setState({
      status: "valid",
      metadata: result.metadata,
      formattedPreview: JSON.stringify(result.value, null, 2),
    });
  }

  function handleLoadSample(sample: string) {
    setInput(sample);
    runValidation(sample);
  }

  function handleReset() {
    setInput("");
    setState({ status: "idle" });
  }

  const statusSummaryText =
    state.status === "valid"
      ? `Valid JSON (${state.metadata.rootType}, ${formatBytes(state.metadata.byteSize)}, depth ${state.metadata.maxDepth})`
      : state.status === "invalid"
        ? `Invalid JSON: ${state.error.message}${
            state.error.line
              ? ` (Line ${state.error.line}${state.error.column ? `, Column ${state.error.column}` : ""})`
              : ""
          }`
        : "";

  return (
    <div className="space-y-5">
      <CodeTextarea
        label="JSON to Validate"
        value={input}
        onChange={(next) => {
          setInput(next);
          if (state.status !== "idle") {
            setState({ status: "idle" });
          }
        }}
        invalid={state.status === "invalid"}
        placeholder="Paste JSON here to check syntax and structure…"
        headerSlot={
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleLoadSample(VALID_SAMPLE)}
              className="text-xs font-bold text-brand-700 transition-colors hover:text-brand-600 dark:text-brand-300 dark:hover:text-brand-200"
            >
              Valid sample
            </button>
            <button
              type="button"
              onClick={() => handleLoadSample(INVALID_SAMPLE)}
              className="text-xs font-bold text-ink-3 transition-colors hover:text-ink"
            >
              Invalid sample
            </button>
          </div>
        }
      />

      <ToolActions
        trailing={
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={!input && state.status === "idle"}
          >
            <Icon name="rotateCcw" className="h-4 w-4" />
            <span>Reset</span>
          </Button>
        }
      >
        <Button variant="primary" onClick={() => runValidation(input)}>
          <Icon name="shieldCheck" className="h-4 w-4" />
          <span>Validate JSON</span>
        </Button>
        {statusSummaryText ? (
          <CopyButton
            value={statusSummaryText}
            label="Copy status"
            toastMessage="Validation status copied"
          />
        ) : null}
      </ToolActions>

      {state.status === "valid" ? (
        <ValidationMessage
          variant="success"
          title="Valid JSON"
          description="Your JSON syntax is completely valid and conforms to RFC 8259."
          badge={`Root: ${state.metadata.rootType}`}
        >
          <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <div className="rounded-xl border border-line bg-surface p-3">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-3">
                Root type
              </dt>
              <dd className="mt-1 font-mono text-sm font-bold capitalize text-ink">
                {state.metadata.rootType}
              </dd>
            </div>
            <div className="rounded-xl border border-line bg-surface p-3">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-3">
                {state.metadata.rootType === "array" ? "Items" : "Top-level keys"}
              </dt>
              <dd className="mt-1 font-mono text-sm font-bold text-ink">
                {state.metadata.topLevelCount !== null
                  ? state.metadata.topLevelCount.toLocaleString()
                  : "—"}
              </dd>
            </div>
            <div className="rounded-xl border border-line bg-surface p-3">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-3">
                Max depth
              </dt>
              <dd className="mt-1 font-mono text-sm font-bold text-ink">
                {state.metadata.maxDepth}
              </dd>
            </div>
            <div className="rounded-xl border border-line bg-surface p-3">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-3">
                Size
              </dt>
              <dd className="mt-1 font-mono text-sm font-bold text-ink">
                {formatBytes(state.metadata.byteSize)}
              </dd>
            </div>
          </dl>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <CopyButton
              value={state.formattedPreview}
              label="Copy normalized JSON"
              toastMessage="Normalized JSON copied"
            />
          </div>
        </ValidationMessage>
      ) : null}

      {state.status === "invalid" ? (
        <ValidationMessage
          variant="error"
          title="Invalid JSON"
          description={state.error.message}
          badge={
            state.error.line
              ? `Line ${state.error.line}${
                  state.error.column ? ` · Column ${state.error.column}` : ""
                }`
              : undefined
          }
        />
      ) : null}

      {state.status === "idle" ? (
        <div className="card flex flex-col items-center justify-center px-6 py-10 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-2 text-ink-3">
            <Icon name="shieldCheck" className="h-5 w-5" />
          </span>
          <p className="mt-3 text-sm font-bold text-ink">Ready to validate</p>
          <p className="mt-1 max-w-sm text-xs leading-relaxed text-ink-3">
            Paste your JSON payload above and click Validate JSON to check for syntax errors,
            missing quotes, or trailing commas.
          </p>
        </div>
      ) : null}

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

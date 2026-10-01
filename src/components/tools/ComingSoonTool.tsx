"use client";

import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";

const buildSteps = [
  { label: "Registered", state: "done" as const },
  { label: "In development", state: "active" as const },
  { label: "Launch", state: "pending" as const },
];

/**
 * Shown for registered-but-unimplemented tools. Deliberately honest: it does
 * not simulate a tool, it says the tool is on its way and offers real actions.
 */
export function ComingSoonTool({ tool }: { tool: Tool }) {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="card relative overflow-hidden p-8 text-center sm:p-10">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 text-ink opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
        />
        <div className="relative">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/12 text-amber-600 dark:text-amber-400">
            <Icon name="clock" className="h-7 w-7" />
          </span>
          <p className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.1em] text-amber-700 ring-1 ring-amber-500/25 dark:text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            In development
          </p>
          <h2 className="mx-auto mt-3 max-w-md text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
            {tool.name} is still being built
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-2">
            This page is live in the directory, but the interactive tool is not ready yet.
            We only publish tools that actually work — no fake demos, no placeholders
            pretending to be real.
          </p>

          <ol className="mx-auto mt-7 flex max-w-sm items-center" aria-label="Development progress">
            {buildSteps.map((step, index) => (
              <li key={step.label} className={cn("flex items-center", index < buildSteps.length - 1 && "flex-1")}>
                <span className="flex flex-col items-center gap-1.5">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold ring-1",
                      step.state === "done" &&
                        "bg-brand-600 text-white ring-brand-600",
                      step.state === "active" &&
                        "bg-amber-500/15 text-amber-700 ring-amber-500/40 dark:text-amber-300",
                      step.state === "pending" && "bg-surface-2 text-ink-3 ring-line",
                    )}
                    aria-current={step.state === "active" ? "step" : undefined}
                  >
                    {step.state === "done" ? <Icon name="check" className="h-3.5 w-3.5" /> : index + 1}
                  </span>
                  <span
                    className={cn(
                      "whitespace-nowrap text-[11px] font-bold",
                      step.state === "pending" ? "text-ink-3/70" : "text-ink-2",
                    )}
                  >
                    {step.label}
                  </span>
                </span>
                {index < buildSteps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mx-2 mb-5 h-0.5 flex-1 rounded-full",
                      index === 0 ? "bg-brand-500/50" : "bg-line",
                    )}
                  />
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/tools" variant="primary">
              Browse all tools
            </ButtonLink>
            <Button
              variant="outline"
              onClick={() =>
                toast(`We will let you know as soon as ${tool.name} is ready.`, "success")
              }
            >
              <Icon name="bell" className="h-4 w-4" />
              Notify me
            </Button>
          </div>
        </div>
      </div>

      <AdPlaceholder format="inline" slot="toolora-tool-content" />
    </div>
  );
}

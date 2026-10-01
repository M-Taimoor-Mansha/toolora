import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import type { Tool } from "@/data/types";
import { ComingSoonTool } from "@/components/tools/ComingSoonTool";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { liveToolComponents } from "@/components/tools/registry";
import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { getAllTools, getToolBySlug } from "@/lib/tools";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) {
    return { title: "Tool not found" };
  }
  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,
  };
}

/**
 * Defensive fallback: a tool marked "live" whose component has not been
 * registered yet. Should not happen in practice — if it does, we say so
 * instead of rendering a dead UI.
 */
function MissingImplementation({ tool }: { tool: Tool }) {
  return (
    <div className="rounded-xl border border-red-200 bg-white p-8 text-center dark:border-red-900 dark:bg-zinc-900/60">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
        <Icon name="alert" className="h-7 w-7" />
      </span>
      <h2 className="mt-5 text-xl font-bold text-zinc-950 dark:text-white">
        Implementation missing
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {tool.name} is marked as live, but its component has not been registered yet. Please
        check back shortly.
      </p>
      <div className="mt-6">
        <ButtonLink href="/tools" variant="primary">
          Browse all tools
        </ButtonLink>
      </div>
    </div>
  );
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) {
    notFound();
  }

  let content: ReactNode;
  if (tool.status === "live") {
    const LiveComponent = liveToolComponents[tool.slug];
    content = LiveComponent ? <LiveComponent tool={tool} /> : <MissingImplementation tool={tool} />;
  } else {
    content = <ComingSoonTool tool={tool} />;
  }

  return <ToolLayout tool={tool}>{content}</ToolLayout>;
}

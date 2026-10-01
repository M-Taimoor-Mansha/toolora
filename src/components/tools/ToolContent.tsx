import type { ToolContent as ToolContentType } from "@/data/tool-content/types";

interface ToolContentProps {
  content: ToolContentType;
}

export function ToolContent({ content }: ToolContentProps) {
  return (
    <div className="mt-12 space-y-10">
      <section className="prose prose-sm max-w-none text-ink-2 sm:prose-base">
        <p className="text-[15px] leading-relaxed sm:text-base">{content.intro}</p>
      </section>

      <section>
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {content.howTo.title || "How to Use"}
        </h2>
        <ol className="mt-4 space-y-2.5">
          {content.howTo.steps.map((step, index) => (
            <li key={index} className="flex gap-3 text-ink-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {index + 1}
              </span>
              <span className="text-[15px] leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {content.features ? (
        <section>
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {content.features.title || "Key Features"}
          </h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {content.features.items.map((item, index) => (
              <li
                key={index}
                className="flex gap-2.5 rounded-xl border border-line bg-surface p-3 text-[15px] leading-relaxed text-ink-2"
              >
                <span className="text-brand-600">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {content.faq.title || "Frequently Asked Questions"}
        </h2>
        <div className="mt-4 space-y-3">
          {content.faq.items.map((item, index) => (
            <details
              key={index}
              className="group rounded-xl border border-line bg-surface p-4 open:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-[15px] font-semibold text-ink">
                <span>{item.question}</span>
                <span className="shrink-0 text-ink-3 transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {content.tips ? (
        <section>
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {content.tips.title || "Tips"}
          </h2>
          <ul className="mt-4 space-y-2">
            {content.tips.items.map((item, index) => (
              <li
                key={index}
                className="flex gap-2.5 text-[15px] leading-relaxed text-ink-2"
              >
                <span className="text-brand-600">💡</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
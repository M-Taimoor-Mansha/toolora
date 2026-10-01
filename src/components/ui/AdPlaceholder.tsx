import { cn } from "@/lib/cn";

export type AdFormat = "banner" | "rectangle" | "inline";

interface AdPlaceholderProps {
  /** Slot format, used to reserve realistic space. */
  format?: AdFormat;
  /** Stable slot id — becomes the AdSense `data-ad-slot` later. */
  slot?: string;
  className?: string;
}

const formatSizes: Record<AdFormat, string> = {
  banner: "min-h-[96px]",
  rectangle: "min-h-[260px]",
  inline: "min-h-[128px]",
};

/**
 * Reserved ad slot. When AdSense is integrated later, replace the inner
 * content with the ad unit while keeping the same wrapper, slot id and
 * dimensions so layouts do not shift.
 */
export function AdPlaceholder({
  format = "banner",
  slot,
  className,
}: AdPlaceholderProps) {
  return (
    <div
      data-ad-format={format}
      data-ad-slot={slot}
      role="complementary"
      aria-label="Advertisement placeholder"
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line-strong bg-surface px-4 py-4 text-center",
        formatSizes[format],
        className,
      )}
    >
      <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-3">
        Advertisement
      </span>
      <span className="text-xs font-medium text-ink-3/70">
        {format} · 100% free tools, supported by ads soon
      </span>
      {slot ? (
        <span className="font-mono text-[10px] text-ink-3/50">slot: {slot}</span>
      ) : null}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface CopyButtonProps {
  /** Text to copy to the clipboard. */
  value: string;
  label?: string;
  copiedLabel?: string;
  toastMessage?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  toastMessage = "Copied to clipboard",
  variant = "outline",
  size = "sm",
  disabled = false,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    if (!value || disabled) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast(toastMessage, "success");
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      toast("Could not access clipboard in this browser context.", "error");
    }
  }, [value, disabled, toast, toastMessage]);

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled || !value}
      onClick={handleCopy}
      className={className}
      aria-label={copied ? copiedLabel : label}
    >
      <Icon
        name={copied ? "check" : "copy"}
        className={copied ? "h-4 w-4 text-emerald-600 dark:text-emerald-400" : "h-4 w-4"}
      />
      <span>{copied ? copiedLabel : label}</span>
    </Button>
  );
}

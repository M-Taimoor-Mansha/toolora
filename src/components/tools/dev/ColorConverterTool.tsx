"use client";

import { useState, useCallback, useMemo } from "react";
import type { Tool } from "@/data/types";
import { Icon } from "@/components/icons";

interface ColorConverterToolProps {
  tool: Tool;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function hexToRgb(hex: string): RGB | null {
  let clean = hex.trim().replace(/^#/, "");
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb({ h, s, l }: HSL): RGB {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h < 180) [rp, gp, bp] = [0, c, x];
  else if (h < 240) [rp, gp, bp] = [0, x, c];
  else if (h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

function rgbToHsv({ r, g, b }: RGB): HSV {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : delta / max;
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(max * 100),
  };
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

export function ColorConverterTool({ tool }: ColorConverterToolProps) {
  const [hex, setHex] = useState("#FF5733");
  const [input, setInput] = useState("#FF5733");
  const [error, setError] = useState<string | null>(null);

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => (rgb ? rgbToHsl(rgb) : null), [rgb]);
  const hsv = useMemo(() => (rgb ? rgbToHsv(rgb) : null), [rgb]);

  const applyHex = useCallback((value: string) => {
    const parsed = hexToRgb(value);
    if (parsed) {
      setHex(rgbToHex(parsed));
      setError(null);
    } else {
      setError("Invalid HEX color. Use format #RRGGBB or #RGB.");
    }
  }, []);

  const handlePickerChange = useCallback((value: string) => {
    setHex(value.toUpperCase());
    setInput(value.toUpperCase());
    setError(null);
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      const parsed = hexToRgb(value);
      if (parsed) {
        setHex(rgbToHex(parsed));
        setError(null);
      } else if (value.trim()) {
        setError("Invalid HEX color.");
      } else {
        setError(null);
      }
    },
    []
  );

  const randomColor = useCallback(() => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const newHex = rgbToHex({ r, g, b });
    setHex(newHex);
    setInput(newHex);
    setError(null);
  }, []);

  const formats = rgb && hsl && hsv
    ? [
        { label: "HEX", value: hex },
        { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
        { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
        { label: "HSV", value: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Preview + Picker */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Color Preview */}
          <div
            className="h-32 w-full shrink-0 rounded-2xl border border-line shadow-sm sm:h-32 sm:w-32"
            style={{ backgroundColor: hex }}
            aria-label={`Color preview: ${hex}`}
          />

          {/* Color Picker + Input */}
          <div className="min-w-0 flex-1 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Color Picker
              </label>
              <input
                type="color"
                value={hex}
                onChange={(e) => handlePickerChange(e.target.value)}
                className="h-12 w-full cursor-pointer rounded-xl border border-line bg-canvas"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                HEX Value
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                onBlur={() => applyHex(input)}
                placeholder="#FF5733"
                className="w-full rounded-xl border border-line bg-canvas px-4 py-3 font-mono text-sm text-ink outline-none transition-colors focus:border-brand-500"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            <div className="flex items-start gap-2">
              <Icon name="alert" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={randomColor}
            className="rounded-lg border border-line bg-canvas px-4 py-2 text-xs font-semibold text-ink-2 transition-colors hover:border-brand-400"
          >
            🎲 Random Color
          </button>
        </div>
      </div>

      {/* Format Cards */}
      {formats.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {formats.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border border-line bg-surface p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wide text-ink-3">
                  {f.label}
                </span>
                <CopyButton text={f.value} />
              </div>
              <p className="break-all font-mono text-sm font-semibold text-ink">
                {f.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
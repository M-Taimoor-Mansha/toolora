"use client";

import { useState, useEffect, useCallback } from "react";

interface ToolLimit {
  maxFreeSize: number; // in bytes
  maxFreeBatch: number;
  toolSlug: string;
}

interface LimitResult {
  canProcess: boolean;
  reason?: string;
  remaining: number;
}

const STORAGE_KEY = "toolora-usage";

interface UsageData {
  [toolSlug: string]: {
    date: string;
    count: number;
  };
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadUsage(): UsageData {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUsage(data: UsageData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function useToolLimiter(limit: ToolLimit) {
  const [usage, setUsage] = useState<number>(0);

  useEffect(() => {
    const data = loadUsage();
    const today = getToday();
    const entry = data[limit.toolSlug];
    setUsage(entry && entry.date === today ? entry.count : 0);
  }, [limit.toolSlug]);

  const check = useCallback(
    (fileSize: number, batchCount: number): LimitResult => {
      // File size check
      if (fileSize > limit.maxFreeSize) {
        return {
          canProcess: false,
          reason: `File is too large (${(fileSize / 1024 / 1024).toFixed(1)} MB). Free limit is ${(limit.maxFreeSize / 1024 / 1024).toFixed(0)} MB. Upgrade to Pro for larger files.`,
          remaining: 0,
        };
      }

      // Batch check
      if (batchCount > limit.maxFreeBatch) {
        return {
          canProcess: false,
          reason: `Batch processing limited to ${limit.maxFreeBatch} file(s) on free. Upgrade to Pro for batch processing.`,
          remaining: 0,
        };
      }

      return { canProcess: true, remaining: limit.maxFreeBatch - batchCount };
    },
    [limit]
  );

  const record = useCallback(
    (count: number) => {
      const data = loadUsage();
      const today = getToday();
      const entry = data[limit.toolSlug];
      const newCount = entry && entry.date === today ? entry.count + count : count;
      data[limit.toolSlug] = { date: today, count: newCount };
      saveUsage(data);
      setUsage(newCount);
    },
    [limit.toolSlug]
  );

  return { usage, check, record };
}
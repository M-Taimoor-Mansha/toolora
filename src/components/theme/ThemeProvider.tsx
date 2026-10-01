"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { SITE } from "@/lib/site";
import {
  isThemePreference,
  resolveTheme,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme";

interface ThemeContextValue {
  /** The user's explicit preference. */
  preference: ThemePreference;
  /** The theme actually applied to the document. */
  resolvedTheme: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const DARK_QUERY = "(prefers-color-scheme: dark)";

type Listener = () => void;

// ---------------------------------------------------------------------------
// External store: the persisted theme preference.
// `useSyncExternalStore` keeps React state in sync with localStorage without
// any setState-in-effect, and survives tab-to-tab "storage" events.
// ---------------------------------------------------------------------------

const preferenceListeners = new Set<Listener>();
let cachedPreference: ThemePreference | null = null;

function readStoredPreference(): ThemePreference {
  const stored = window.localStorage.getItem(SITE.themeStorageKey);
  return isThemePreference(stored) ? stored : "system";
}

function getPreferenceSnapshot(): ThemePreference {
  if (cachedPreference === null) {
    cachedPreference = readStoredPreference();
  }
  return cachedPreference;
}

function getServerPreference(): ThemePreference {
  return "system";
}

function subscribeToPreference(listener: Listener): () => void {
  preferenceListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === SITE.themeStorageKey) {
      cachedPreference = null;
      preferenceListeners.forEach((item) => item());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    preferenceListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function setPreference(preference: ThemePreference): void {
  if (cachedPreference === preference) return;
  cachedPreference = preference;
  window.localStorage.setItem(SITE.themeStorageKey, preference);
  preferenceListeners.forEach((listener) => listener());
}

// ---------------------------------------------------------------------------
// External store: the OS dark-mode setting, so "system" mode tracks the OS.
// ---------------------------------------------------------------------------

function getSystemDarkSnapshot(): boolean {
  return window.matchMedia(DARK_QUERY).matches;
}

function getServerSystemDark(): boolean {
  return false;
}

function subscribeToSystemDark(listener: Listener): () => void {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

/**
 * Applies light/dark by toggling the `dark` class on <html> and persists the
 * preference to localStorage. An inline script in the root layout applies the
 * stored preference before first paint, so there is no flash of wrong theme.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const preference = useSyncExternalStore(
    subscribeToPreference,
    getPreferenceSnapshot,
    getServerPreference,
  );
  const systemDark = useSyncExternalStore(
    subscribeToSystemDark,
    getSystemDarkSnapshot,
    getServerSystemDark,
  );
  const resolvedTheme = resolveTheme(preference, systemDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({ preference, resolvedTheme, setPreference }),
    [preference, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
}

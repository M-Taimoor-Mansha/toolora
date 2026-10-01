"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

interface SearchBaseProps {
  placeholder?: string;
  label?: string;
  size?: "md" | "lg";
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  method?: undefined;
  inputName?: undefined;
}

/** JS-driven form: navigates/submits through the provided callback. */
interface SubmitSearchProps extends SearchBaseProps {
  onSubmit: (value: string) => void;
  action?: undefined;
}

/**
 * Native form: renders a plain GET/POST form, so it works from Server
 * Components (no function props cross the server/client boundary) and keeps
 * search working with JavaScript disabled.
 */
interface NativeFormSearchProps extends Omit<SearchBaseProps, "method" | "inputName"> {
  action: string;
  method?: "GET" | "POST";
  /** Name of the query parameter sent with the form. */
  inputName?: string;
  onSubmit?: undefined;
}

/** Controlled live input for in-page filtering. */
interface LiveSearchProps extends SearchBaseProps {
  onSubmit?: undefined;
  action?: undefined;
}

export type SearchProps = LiveSearchProps | SubmitSearchProps | NativeFormSearchProps;

const submitButtonClasses =
  "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-5 text-sm font-bold text-white shadow-brand transition-all duration-150 hover:bg-brand-500 active:scale-[0.97]";

/**
 * Search field with three modes:
 * - native form (`action`) for server-rendered pages,
 * - JS form (`onSubmit`) for client navigation,
 * - controlled input (`value` + `onChange`) for live filtering.
 */
export function Search({
  placeholder = "Search tools…",
  label = "Search",
  size = "md",
  className,
  value,
  onChange,
  onSubmit,
  action,
  method = "GET",
  inputName = "q",
}: SearchProps) {
  const [localValue, setLocalValue] = useState("");
  const currentValue = value ?? localValue;
  const isNativeForm = typeof action === "string";
  const isJsForm = typeof onSubmit === "function";
  const large = size === "lg";

  const frameClasses = cn(
    "flex w-full items-center gap-2.5 border border-line bg-surface pl-4 shadow-card transition-all duration-200 hover:border-line-strong focus-within:border-brand-500 focus-within:shadow-pop focus-within:ring-2 focus-within:ring-brand-500/20",
    large ? "h-15 rounded-2xl" : "h-11 rounded-xl",
    className,
  );
  const inputClasses = cn(
    "w-full min-w-0 bg-transparent font-medium text-ink placeholder:font-normal placeholder:text-ink-3 focus:outline-none",
    large ? "text-[15px]" : "text-sm",
  );

  function emit(next: string) {
    setLocalValue(next);
    onChange?.(next);
  }

  function handleJsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(currentValue);
  }

  const searchIcon = <Icon name="search" className="h-5 w-5 shrink-0 text-ink-3" />;

  if (isNativeForm) {
    return (
      <form role="search" action={action} method={method} className={frameClasses}>
        {searchIcon}
        <input
          type="search"
          name={inputName}
          defaultValue={value}
          placeholder={placeholder}
          aria-label={label}
          autoComplete="off"
          spellCheck={false}
          className={inputClasses}
        />
        <button type="submit" className={cn(submitButtonClasses, large ? "m-2" : "m-1.5 h-8 px-3.5 text-[13px]")}>
          <span className={large ? "" : "hidden"}>Search</span>
          <Icon name="search" className={large ? "hidden h-4 w-4" : "h-4 w-4"} />
        </button>
      </form>
    );
  }

  if (isJsForm) {
    return (
      <form role="search" onSubmit={handleJsSubmit} className={frameClasses}>
        {searchIcon}
        <input
          type="search"
          value={currentValue}
          onChange={(event) => emit(event.target.value)}
          placeholder={placeholder}
          aria-label={label}
          autoComplete="off"
          spellCheck={false}
          className={inputClasses}
        />
        {currentValue ? (
          <ClearButton onClear={() => emit("")} />
        ) : null}
        <button type="submit" className={cn(submitButtonClasses, large ? "m-2" : "m-1.5 h-8 px-3.5 text-[13px]")}>
          <span className={large ? "" : "hidden"}>Search</span>
          <Icon name="search" className={large ? "hidden h-4 w-4" : "h-4 w-4"} />
        </button>
      </form>
    );
  }

  return (
    <div className={frameClasses}>
      {searchIcon}
      <input
        type="search"
        value={currentValue}
        onChange={(event) => emit(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
        autoComplete="off"
        spellCheck={false}
        className={inputClasses}
      />
      {currentValue ? (
        <ClearButton onClear={() => emit("")} />
      ) : (
        <kbd className="hidden shrink-0 items-center rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] font-medium text-ink-3 sm:inline-flex">
          /
        </kbd>
      )}
      <span className="w-1 shrink-0" aria-hidden="true" />
    </div>
  );
}

function ClearButton({ onClear }: { onClear: () => void }) {
  return (
    <button
      type="button"
      onClick={onClear}
      aria-label="Clear search"
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink"
    >
      <Icon name="x" className="h-4 w-4" />
    </button>
  );
}

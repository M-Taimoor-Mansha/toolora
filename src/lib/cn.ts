export type ClassValue = string | number | null | false | undefined;

/**
 * Minimal className combiner — joins truthy class values with spaces.
 * Keeps us free of extra dependencies for a trivial concern.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

/**
 * Safe numeric parsing helpers used across calculators
 */

export function parseNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  const next =
    typeof value === "number"
      ? value
      : value.trim() === ""
        ? NaN
        : Number.parseFloat(value);

  if (!Number.isFinite(next)) return null;
  return next;
}

export function isPositive(value: number | null): value is number {
  return value !== null && Number.isFinite(value) && value > 0;
}

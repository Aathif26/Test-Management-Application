import type { TestType } from "@/types"

/** Maps backend type slugs → UI tab labels */
export const TYPE_REVERSE_MAP: Record<string, TestType> = {
  chapterwise: "Chapter Wise",
  pyq: "PYQ",
  mock: "Mock Test",
}

/** Maps UI tab labels → backend type slugs */
export const TEST_TYPE_MAP: Record<string, string> = {
  "Chapter Wise": "chapterwise",
  PYQ: "pyq",
  "Mock Test": "mock",
}

type Option = { value: string; label: string }

/**
 * Resolves a raw API value (name or ID) against a loaded options list.
 * Checks ID match first, then case-insensitive label match.
 */
export function resolveToId(raw: string, options: Option[]): string {
  if (!raw || !options.length) return ""
  return (
    options.find((opt) => opt.value === raw)?.value ??
    options.find((opt) => opt.label.toLowerCase() === raw.toLowerCase())?.value ??
    ""
  )
}

/** Resolves an array of raw API values to their matching IDs. */
export function resolveToIds(raws: string[], options: Option[]): string[] {
  if (!raws.length || !options.length) return []
  return raws.map((raw) => resolveToId(raw, options)).filter(Boolean)
}

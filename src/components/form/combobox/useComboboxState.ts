import { useState, useRef, useEffect } from "react"

/**
 * Encapsulates all shared state and side-effects for both combobox variants:
 * - open/search state
 * - containerRef / inputRef for DOM access
 * - click-outside handler
 * - Escape-key handler
 */
export function useComboboxState(disabled: boolean, loading: boolean) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isDisabled = disabled || loading

  // Close when clicking outside the container
  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  function toggle() {
    if (isDisabled) return
    setOpen((prev) => !prev)
    setSearch("")
    setTimeout(() => inputRef.current?.focus(), 10)
  }

  return { open, setOpen, search, setSearch, containerRef, inputRef, isDisabled, toggle }
}

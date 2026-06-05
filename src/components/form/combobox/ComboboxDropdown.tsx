import { Command } from "cmdk"
import { cn } from "@/lib/utils"

interface ComboboxDropdownProps {
  open: boolean
  search: string
  onSearchChange: (val: string) => void
  searchPlaceholder: string
  inputRef: React.RefObject<HTMLInputElement | null>
  loading: boolean
  emptyMessage: string
  children: React.ReactNode
}

/** Skeleton rows shown while options are loading */
function LoadingSkeleton() {
  return (
    <div className="space-y-1 p-1">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-2 px-2 py-2 animate-pulse">
          <div className="h-4 w-4 rounded bg-slate-100" />
          <div className="h-4 flex-1 rounded bg-slate-100" style={{ width: `${60 + i * 10}%` }} />
        </div>
      ))}
    </div>
  )
}

/**
 * Animated dropdown shell shared by both combobox variants.
 * Renders the search input and wraps the options list.
 */
export function ComboboxDropdown({
  open,
  search,
  onSearchChange,
  searchPlaceholder,
  inputRef,
  loading,
  emptyMessage,
  children,
}: ComboboxDropdownProps) {
  return (
    <div
      className={cn(
        "absolute z-60 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg shadow-slate-200/50 overflow-hidden transition-all duration-200 origin-top",
        open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
      )}
    >
      <Command shouldFilter={true}>
        {/* Search row */}
        <div className="flex items-center gap-2 border-b border-slate-100 px-3">
          <svg className="h-4 w-4 shrink-0 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <Command.Input ref={inputRef} value={search} onValueChange={onSearchChange} placeholder={searchPlaceholder} className="flex h-9 w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
        </div>

        <Command.List className="max-h-52 overflow-y-auto p-1">
          {loading && <LoadingSkeleton />}
          {!loading && <Command.Empty className="py-6 text-center text-sm text-muted-foreground">{emptyMessage}</Command.Empty>}
          {!loading && children}
        </Command.List>
      </Command>
    </div>
  )
}

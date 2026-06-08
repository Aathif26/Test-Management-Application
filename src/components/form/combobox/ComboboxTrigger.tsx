import { FaChevronDown } from "react-icons/fa"
import { cn } from "@/lib/utils"

interface ComboboxTriggerProps {
  open: boolean
  isDisabled: boolean
  loading: boolean
  onClick: () => void
  children: React.ReactNode // the selected-value display
}

/** Spinning loader shown inside the trigger while options are fetching */
function SpinnerIcon() {
  return (
    <svg className="animate-spin h-4 w-4 text-primary/60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

/**
 * The trigger button shell shared by both combobox variants.
 * Renders the loading state or the `children` slot, plus the chevron icon.
 */
export function ComboboxTrigger({ open, isDisabled, loading, onClick, children }: ComboboxTriggerProps) {
  return (
    <button
      type="button"
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        "flex w-full min-h-10 items-center justify-between gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm transition-all duration-200",
        "hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
        open && "ring-2 ring-primary/20 border-primary/50",
        isDisabled && "opacity-50 cursor-not-allowed hover:border-slate-200"
      )}
    >
      {loading ? (
        <span className="flex items-center gap-2 text-muted-foreground py-0.5">
          <SpinnerIcon />
          Loading…
        </span>
      ) : (
        children
      )}
      <FaChevronDown className={cn("h-3 w-3 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
    </button>
  )
}

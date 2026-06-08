import { Command } from "cmdk"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { FaCheck, FaTimes } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { useComboboxState } from "./combobox/useComboboxState"
import { ComboboxTrigger } from "./combobox/ComboboxTrigger"
import { ComboboxDropdown } from "./combobox/ComboboxDropdown"

interface ComboboxOption {
  value: string
  label: string
}

interface FormMultiSelectComboboxProps<T extends FieldValues> {
  label: string
  name: Path<T>
  control: Control<T>
  placeholder?: string
  searchPlaceholder?: string
  options: ComboboxOption[]
  error?: string
  disabled?: boolean
  loading?: boolean
  emptyMessage?: string
  className?: string
  FieldClassName?: string
  onValueChange?: (value: string[]) => void
}

export function FormMultiSelectCombobox<T extends FieldValues>({
  label, name, control,
  placeholder = "Select options…",
  searchPlaceholder = "Search…",
  options, error,
  disabled = false, loading = false,
  emptyMessage = "No results found.",
  className, FieldClassName, onValueChange,
}: FormMultiSelectComboboxProps<T>) {
  const { open, search, setSearch, containerRef, inputRef, isDisabled, toggle } =
    useComboboxState(disabled, loading)

  return (
    <Field>
      <FieldLabel htmlFor={name} className={FieldClassName}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedValues: string[] = Array.isArray(field.value) ? field.value : []
          const selectedOptions = options.filter((o) => selectedValues.includes(o.value))

          const handleSelect = (val: string) => {
            const next = selectedValues.includes(val)
              ? selectedValues.filter((v) => v !== val)
              : [...selectedValues, val]
            field.onChange(next)
            onValueChange?.(next)
          }

          const handleRemove = (e: React.MouseEvent, val: string) => {
            e.stopPropagation(); e.preventDefault()
            const next = selectedValues.filter((v) => v !== val)
            field.onChange(next); onValueChange?.(next)
          }

          return (
            <div ref={containerRef} className={cn("relative", className)}>
              <ComboboxTrigger open={open} isDisabled={isDisabled} loading={loading} onClick={toggle}>
                <div className="flex flex-wrap gap-1 flex-1 overflow-hidden items-center">
                  {selectedOptions.length > 0 ? selectedOptions.map((opt) => (
                    <span key={opt.value} className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700" onClick={(e) => e.stopPropagation()}>
                      {opt.label}
                      <div role="button" tabIndex={0} className="cursor-pointer text-slate-400 hover:text-slate-600 focus:outline-none ml-1"
                        onClick={(e) => handleRemove(e, opt.value)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleRemove(e as any, opt.value) }}>
                        <FaTimes className="h-2.5 w-2.5" />
                      </div>
                    </span>
                  )) : <span className="truncate py-0.5 text-muted-foreground">{placeholder}</span>}
                </div>
              </ComboboxTrigger>

              <ComboboxDropdown open={open} search={search} onSearchChange={setSearch}
                searchPlaceholder={searchPlaceholder} inputRef={inputRef}
                loading={loading} emptyMessage={emptyMessage}>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value)
                  return (
                    <Command.Item key={option.value} value={option.label} onSelect={() => handleSelect(option.value)}
                      className={cn("flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer transition-colors duration-100",
                        "data-[selected=true]:bg-slate-50 hover:bg-slate-50", isSelected && "text-primary font-medium")}>
                      <div className={cn("flex h-4 w-4 items-center justify-center rounded-sm border transition-colors duration-150",
                        isSelected ? "border-primary bg-primary text-white" : "border-slate-200 bg-white")}>
                        {isSelected && <FaCheck className="h-2.5 w-2.5" />}
                      </div>
                      <span>{option.label}</span>
                    </Command.Item>
                  )
                })}
              </ComboboxDropdown>
            </div>
          )
        }}
      />
      {error && <FieldError id={`${name}-error`}>{error}</FieldError>}
    </Field>
  )
}

import { Command } from "cmdk"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { FaCheck } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { useComboboxState } from "./combobox/useComboboxState"
import { ComboboxTrigger } from "./combobox/ComboboxTrigger"
import { ComboboxDropdown } from "./combobox/ComboboxDropdown"

interface ComboboxOption {
  value: string
  label: string
}

interface FormComboboxProps<T extends FieldValues> {
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
  onValueChange?: (value: string) => void
}

export function FormCombobox<T extends FieldValues>({
  label, name, control,
  placeholder = "Select an option…",
  searchPlaceholder = "Search…",
  options, error,
  disabled = false, loading = false,
  emptyMessage = "No results found.",
  className, FieldClassName, onValueChange,
}: FormComboboxProps<T>) {
  const { open, setOpen, search, setSearch, containerRef, inputRef, isDisabled, toggle } =
    useComboboxState(disabled, loading)

  return (
    <Field>
      <FieldLabel htmlFor={name} className={FieldClassName}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selected = options.find((o) => o.value === field.value)
          return (
            <div ref={containerRef} className={cn("relative", className)}>
              <ComboboxTrigger open={open} isDisabled={isDisabled} loading={loading} onClick={toggle}>
                <span className={cn("truncate", !selected && "text-muted-foreground")}>
                  {selected ? selected.label : placeholder}
                </span>
              </ComboboxTrigger>

              <ComboboxDropdown open={open} search={search} onSearchChange={setSearch}
                searchPlaceholder={searchPlaceholder} inputRef={inputRef}
                loading={loading} emptyMessage={emptyMessage}>
                {options.map((option) => {
                  const isSelected = field.value === option.value
                  return (
                    <Command.Item key={option.value} value={option.label}
                      onSelect={() => { field.onChange(option.value); onValueChange?.(option.value); setOpen(false); setSearch("") }}
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

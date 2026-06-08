import {
  Field,
  FieldLabel,
  FieldError
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { cn } from "@/lib/utils"

interface SelectOption {
  value: string
  label: string
}

interface FormSelectFieldProps<T extends FieldValues> {
  label: string
  name: Path<T>
  control: Control<T>
  placeholder: string
  options: SelectOption[]
  error?: string
  className?: string
  triggerClassName?: string
  FieldClassName?: string
  disabled?: boolean
  loading?: boolean
  onValueChange?: (value: string) => void
}

export function FormSelectField<T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  options,
  error,
  className,
  triggerClassName,
  FieldClassName,
  disabled = false,
  loading = false,
  onValueChange,

}: FormSelectFieldProps<T>) {
  const isDisabled = disabled || loading

  return (
    <Field>
      <FieldLabel htmlFor={name} className={FieldClassName}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(val) => {
              field.onChange(val)
              onValueChange?.(val)
            }}
            disabled={isDisabled}
          >
            <SelectTrigger
              className={cn(
                triggerClassName ?? "w-full",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {loading ? (
                <span className="flex items-center gap-2 text-muted-foreground text-sm">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading…
                </span>
              ) : (
                <SelectValue placeholder={placeholder} />
              )}
            </SelectTrigger>
            <SelectContent className={className}>
              {options.length === 0 ? (
                <div className="py-3 px-2 text-sm text-muted-foreground text-center">
                  No options available
                </div>
              ) : (
                options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        )}
      />
      {error && (
        <FieldError id={`${name}-error`}>{error}</FieldError>
      )}
    </Field>
  )
}

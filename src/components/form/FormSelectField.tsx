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
  FieldClassName

}: FormSelectFieldProps<T>) {
  return (
    <Field>
      <FieldLabel htmlFor={name} className={FieldClassName}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className={triggerClassName ?? "w-full"}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className={className}>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
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

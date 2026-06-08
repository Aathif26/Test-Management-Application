import {
  Field,
  FieldLabel,
  FieldError
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"

interface RadioOption {
  value: string
  label: string
}

interface FormRadioFieldProps<T extends FieldValues> {
  label: string
  name: Path<T>
  control: Control<T>
  options: RadioOption[]
  error?: string
  className?: string
  orientation?: "horizontal" | "vertical"
  FieldClassName?: string
}

export function FormRadioField<T extends FieldValues>({
  label,
  name,
  control,
  options,
  error,
  className,
  orientation = "horizontal",
  FieldClassName
}: FormRadioFieldProps<T>) {
  return (
    <Field>
      <FieldLabel className={FieldClassName}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className={`flex ${orientation === "horizontal" ? "flex-row flex-wrap items-center gap-4 sm:gap-6" : "flex-col gap-3"} ${className ?? ""}`}
          >
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2.5 cursor-pointer text-[15px] font-medium text-[#374151]"
              >
                <RadioGroupItem value={option.value} />
                {option.label}
              </label>
            ))}
          </RadioGroup>
        )}
      />
      {error && (
        <FieldError id={`${name}-error`}>{error}</FieldError>
      )}
    </Field>
  )
}

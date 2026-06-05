import {
  Field,
  FieldLabel,
  FieldError
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { UseFormRegisterReturn } from "react-hook-form";

export function FormInputField({
    label,
    type,
    placeholder,
    error,
    className,
    registration,
    FieldClassName,
}: {
    label: string;
    type: string;
    placeholder: string;
    error?: string;
    className?: string;
    registration: UseFormRegisterReturn;
    FieldClassName?: string
}) {
  return (
    <Field>
      <FieldLabel htmlFor={registration.name} className={FieldClassName}>{label}</FieldLabel>
      <Input
        id={registration.name}
        type={type}
        placeholder={placeholder}
        {...registration}
        aria-invalid={!!error}
        aria-errormessage={!!error ? `${registration.name}-error` : undefined}
        className={className}
      />
      {error && (
        <FieldError id={`${registration.name}-error`}>{error}</FieldError>
      )}
    </Field>
  )
}

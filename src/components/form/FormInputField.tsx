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
}: {
    label: string;
    type: string;
    placeholder: string;
    error?: string;
    className?: string;
    registration: UseFormRegisterReturn;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={registration.name}>{label}</FieldLabel>
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

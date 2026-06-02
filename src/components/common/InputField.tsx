import {
  Field,
  FieldLabel,
  FieldError
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputField({
    name,
    label,
    type,
    placeholder,
    value,
    onChange,
    error,
    className,
}: {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
    className?: string;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-errormessage={!!error ? `${name}-error` : undefined}
        className={className}
      />
      {error && (
        <FieldError id={`${name}-error`}>{error}</FieldError>
      )}
    </Field>
  )
}

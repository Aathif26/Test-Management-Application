import { FormInputField } from "@/components/form/FormInputField"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { TestFormData } from "../types"

interface MarkingSchemeFieldsProps {
  register: UseFormRegister<TestFormData>
  errors: FieldErrors<TestFormData>
}

const inputClass =
  "h-10 text-sm font-medium bg-white border-slate-200 hover:border-slate-300 transition-colors rounded-md px-4"

export function MarkingSchemeFields({ register, errors }: MarkingSchemeFieldsProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <label className="text-sm font-medium text-[#374151]">
        Marking Scheme:
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <FormInputField
          label="Wrong Answer"
          type="number"
          placeholder="-1"
          registration={register("wrongAnswerMark", { valueAsNumber: true })}
          error={errors.wrongAnswerMark?.message}
          className={inputClass}
          FieldClassName="text-[#374151]"
        />
        <FormInputField
          label="Unattempted"
          type="number"
          placeholder="+0"
          registration={register("unattemptedMark", { valueAsNumber: true })}
          error={errors.unattemptedMark?.message}
          className={inputClass}
          FieldClassName="text-[#374151]"
        />
        <FormInputField
          label="Correct Answer"
          type="number"
          placeholder="+5"
          registration={register("correctAnswerMark", { valueAsNumber: true })}
          error={errors.correctAnswerMark?.message}
          className={inputClass}
          FieldClassName="text-[#374151]"
        />
        <FormInputField
            label="No of Questions"
            type="text"
            placeholder="Ex:250 Marks"
            registration={register("numberOfQuestions")}
            error={errors.numberOfQuestions?.message}
            className={`${inputClass} font-medium`}
            FieldClassName="text-[#374151]"
          />
          <FormInputField
            label="Total Marks"
            type="text"
            placeholder="Ex:250 Marks"
            registration={register("totalMarks")}
            error={errors.totalMarks?.message}
            className={`${inputClass} font-medium`}
            FieldClassName="text-[#374151]"
          />
      </div>
    </div>
  )
}

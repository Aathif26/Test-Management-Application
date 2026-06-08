import { FormInputField } from "@/components/form/FormInputField"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { TestFormSchema } from "@/types"

interface MarkingSchemeFieldsProps {
  register: UseFormRegister<TestFormSchema>
  errors: FieldErrors<TestFormSchema>
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
          registration={register("wrong_marks", { valueAsNumber: true })}
          error={errors.wrong_marks?.message}
          className={inputClass}
          FieldClassName="text-[#374151]"
        />
        <FormInputField
          label="Unattempted"
          type="number"
          placeholder="+0"
          registration={register("unattempt_marks", { valueAsNumber: true })}
          error={errors.unattempt_marks?.message}
          className={inputClass}
          FieldClassName="text-[#374151]"
        />
        <FormInputField
          label="Correct Answer"
          type="number"
          placeholder="+5"
          registration={register("correct_marks", { valueAsNumber: true })}
          error={errors.correct_marks?.message}
          className={inputClass}
          FieldClassName="text-[#374151]"
        />
        <FormInputField
            label="No of Questions"
            type="number"
            placeholder="Ex: 250"
            registration={register("total_questions", { valueAsNumber: true })}
            error={errors.total_questions?.message}
            className={`${inputClass} font-medium`}
            FieldClassName="text-[#374151]"
          />
          <FormInputField
            label="Total Marks"
            type="number"
            placeholder="Ex: 250"
            registration={register("total_marks", { valueAsNumber: true })}
            error={errors.total_marks?.message}
            className={`${inputClass} font-medium`}
            FieldClassName="text-[#374151]"
          />
      </div>
    </div>
  )
}

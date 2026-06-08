import type { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { FormInputField } from "@/components/form/FormInputField"
import { FormRadioField } from "@/components/form/FormRadioField"
import { MarkingSchemeFields } from "./MarkingSchemeFields"
import { CurriculumFields } from "./CurriculumFields"
import type { TestFormSchema } from "@/types"

interface SelectOption {
  value: string
  label: string
}

interface TestDetailsFormProps {
  control: Control<TestFormSchema>
  register: UseFormRegister<TestFormSchema>
  errors: FieldErrors<TestFormSchema>
  subjectOptions: SelectOption[]
  topicOptions: SelectOption[]
  subTopicOptions: SelectOption[]
  subjectsLoading: boolean
  topicsLoading: boolean
  subTopicsLoading: boolean
  hasSubject: boolean
  hasTopic: boolean
  onSubjectChange: (value: string) => void
  onTopicChange: (value: string[]) => void
}

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Difficult" },
]

const inputClass =
  "h-10 text-sm bg-white border-slate-200 hover:border-slate-300 transition-colors rounded-md px-4 placeholder:text-slate-400"

export function TestDetailsForm({ control, register, errors, ...rest }: TestDetailsFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-2">
        <CurriculumFields control={control} {...rest} />

        <FormInputField
          label="Name of Test"
          type="text"
          placeholder="Enter name of Test"
          registration={register("name")}
          error={errors.name?.message}
          className={inputClass}
          FieldClassName="text-[#374151]"
        />

        <FormInputField
          label="Duration (Minutes)"
          type="number"
          placeholder="Enter the time"
          registration={register("total_time", { valueAsNumber: true })}
          error={errors.total_time?.message}
          className={inputClass}
          FieldClassName="text-[#374151]"
        />

        <FormRadioField
          label="Test Difficulty Level"
          name="difficulty"
          control={control}
          options={DIFFICULTY_OPTIONS}
          error={errors.difficulty?.message}
          orientation="horizontal"
          FieldClassName="text-[#374151]"
        />
      </div>

      <MarkingSchemeFields register={register} errors={errors} />
    </>
  )
}

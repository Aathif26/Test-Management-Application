import type { Control, FieldErrors } from "react-hook-form"
import { FormInputField } from "@/components/form/FormInputField"
import { FormSelectField } from "@/components/form/FormSelectField"
import { FormRadioField } from "@/components/form/FormRadioField"
import { MarkingSchemeFields } from "./MarkingSchemeFields"
import type { TestFormData } from "../types"
import type { UseFormRegister } from "react-hook-form"

const SUBJECT_OPTIONS = [
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "maths", label: "Mathematics" },
  { value: "biology", label: "Biology" },
]

const TOPIC_OPTIONS = [
  { value: "kinematics", label: "Kinematics" },
  { value: "thermodynamics", label: "Thermodynamics" },
]

const SUB_TOPIC_OPTIONS = [
  { value: "motion-1d", label: "Motion in 1D" },
  { value: "motion-2d", label: "Motion in 2D" },
]

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "difficult", label: "Difficult" },
]

interface TestDetailsFormProps {
  control: Control<TestFormData>
  register: UseFormRegister<TestFormData>
  errors: FieldErrors<TestFormData>
}

const triggerClass =
  "w-full h-10 text-sm bg-white border-slate-200 hover:border-slate-300 transition-colors rounded-md px-4"
const inputClass =
  "h-10 text-sm bg-white border-slate-200 hover:border-slate-300 transition-colors rounded-md px-4 placeholder:text-slate-400"

export function TestDetailsForm({ control, register, errors }: TestDetailsFormProps) {
  return (
    <>
      {/* Main Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-2">
        {/* Subject */}
        <FormSelectField
          label="Subject"
          name="subject"
          control={control}
          placeholder="Choose from Drop-down"
          options={SUBJECT_OPTIONS}
          error={errors.subject?.message}
          triggerClassName={triggerClass}
          className="bg-white"
          FieldClassName="text-[#374151]"
        />

        {/* Name of Test */}
        <FormInputField
          label="Name of Test"
          type="text"
          placeholder="Enter name of Test"
          registration={register("testName")}
          error={errors.testName?.message}
          className={inputClass}
          FieldClassName="text-[#374151]"
        />

        {/* Topic */}
        <FormSelectField
          label="Topic"
          name="topic"
          control={control}
          placeholder="Choose from Drop-down"
          options={TOPIC_OPTIONS}
          error={errors.topic?.message}
          triggerClassName={triggerClass}
          FieldClassName="text-[#374151]"
        />

        {/* Sub Topic */}
        <FormSelectField
          label="Sub Topic"
          name="subTopic"
          control={control}
          placeholder="Choose from Drop-down"
          options={SUB_TOPIC_OPTIONS}
          error={errors.subTopic?.message}
          triggerClassName={triggerClass}
          FieldClassName="text-[#374151]"
        />

        {/* Duration */}
        <FormInputField
          label="Duration (Minutes)"
          type="number"
          placeholder="Enter the time"
          registration={register("duration")}
          error={errors.duration?.message}
          className={inputClass}
          FieldClassName="text-[#374151]"
        />

        {/* Difficulty */}
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

      {/* Marking Scheme */}
      <MarkingSchemeFields register={register} errors={errors} />
    </>
  )
}

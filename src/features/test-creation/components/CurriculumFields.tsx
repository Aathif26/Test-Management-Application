import type { Control } from "react-hook-form"
import { FormCombobox } from "@/components/form/FormCombobox"
import { FormMultiSelectCombobox } from "@/components/form/FormMultiSelectCombobox"
import type { TestFormSchema } from "@/types"

interface SelectOption {
  value: string
  label: string
}

interface CurriculumFieldsProps {
  control: Control<TestFormSchema>
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
  FieldClassName?: string
}

/** Subject → Topic → Sub-topic cascade comboboxes */
export function CurriculumFields({
  control,
  subjectOptions, topicOptions, subTopicOptions,
  subjectsLoading, topicsLoading, subTopicsLoading,
  hasSubject, hasTopic,
  onSubjectChange, onTopicChange,
  FieldClassName = "text-[#374151]",
}: CurriculumFieldsProps) {
  return (
    <>
      <FormCombobox
        label="Subject"
        name="subject"
        control={control}
        placeholder="Search & select subject…"
        searchPlaceholder="Type to search subjects…"
        options={subjectOptions}
        loading={subjectsLoading}
        FieldClassName={FieldClassName}
        onValueChange={onSubjectChange}
      />

      <div className="relative z-20">
        <FormMultiSelectCombobox
          label="Topic"
          name="topics"
          control={control}
          placeholder="Search & select topic…"
          searchPlaceholder="Type to search topics…"
          options={topicOptions}
          loading={topicsLoading}
          disabled={!hasSubject}
          FieldClassName={FieldClassName}
          onValueChange={onTopicChange}
          emptyMessage="No topics found for this subject."
        />
      </div>

      <div className="relative z-10">
        <FormMultiSelectCombobox
          label="Sub Topic"
          name="sub_topics"
          control={control}
          placeholder="Search & select sub-topic…"
          searchPlaceholder="Type to search sub-topics…"
          options={subTopicOptions}
          loading={subTopicsLoading}
          disabled={!hasTopic}
          FieldClassName={`${FieldClassName} bg-white`}
          emptyMessage="No sub-topics found for this topic."
        />
      </div>
    </>
  )
}

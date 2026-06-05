import { useTestForm } from "@/features/test-creation/hooks/useTestForm"
import { TestCreationBreadcrumb } from "@/features/test-creation/components/TestCreationBreadcrumb"
import { TestTypeTabs } from "@/features/test-creation/components/TestTypeTabs"
import { TestDetailsForm } from "@/features/test-creation/components/TestDetailsForm"
import { FormActions } from "@/features/test-creation/components/FormActions"
import { PageLoadingState } from "@/features/test-creation/components/PageLoadingState"
import { PageErrorState } from "@/features/test-creation/components/PageErrorState"
import { useNavigate } from "react-router"
import type { TestType } from "@/types"

export default function CreateEditPage() {
  const navigate = useNavigate()
  const {
    isEditing, isSubmitting, isPageLoading, testError,
    control, register, errors, handleSubmit, onSubmit,
    watchedType, watchedSubject, watchedTopics, setValue,
    subjectOptions, topicOptions, subTopicOptions,
    subjectsLoading, topicsLoading, subTopicsLoading,
    handleSubjectChange, handleTopicChange,
  } = useTestForm()

  if (testError) return <PageErrorState />
  if (isPageLoading) return <PageLoadingState message="Loading test details…" />

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden bg-white overflow-y-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto w-full flex flex-col gap-8 bg-white border border-slate-200/60 p-3 sm:p-5 lg:p-8"
      >
        <TestCreationBreadcrumb
          currentStep={watchedType}
          actionLabel={isEditing ? "Edit Test" : "Create Test"}
        />

        <TestTypeTabs
          value={watchedType}
          onChange={(type: TestType) => setValue("type", type)}
        />

        <TestDetailsForm
          control={control}
          register={register}
          errors={errors}
          subjectOptions={subjectOptions}
          topicOptions={topicOptions}
          subTopicOptions={subTopicOptions}
          subjectsLoading={subjectsLoading}
          topicsLoading={topicsLoading}
          subTopicsLoading={subTopicsLoading}
          hasSubject={!!watchedSubject}
          hasTopic={watchedTopics.length > 0}
          onSubjectChange={handleSubjectChange}
          onTopicChange={handleTopicChange}
        />

        <FormActions onCancel={() => navigate("/")} isLoading={isSubmitting} />
      </form>
    </div>
  )
}

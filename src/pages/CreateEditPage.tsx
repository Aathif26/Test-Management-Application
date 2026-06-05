import { useParams, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { TestCreationBreadcrumb } from "@/features/test-creation/components/TestCreationBreadcrumb"
import { TestTypeTabs } from "@/features/test-creation/components/TestTypeTabs"
import { TestDetailsForm } from "@/features/test-creation/components/TestDetailsForm"
import { FormActions } from "@/features/test-creation/components/FormActions"
import { DEFAULT_FORM_DATA, type TestFormData, type TestType } from "@/features/test-creation/types"

export default function CreateEditPage() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const { control, register, handleSubmit, watch, setValue, formState: { errors } } = useForm<TestFormData>({
    defaultValues: DEFAULT_FORM_DATA,
  })

  const testType = watch("testType")

  const handleCancel = () => navigate("/")

  const onSubmit = (data: TestFormData) => {
    // TODO: validate & proceed to next step
    console.log("Form data:", data)
  }

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden bg-white overflow-y-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto w-full flex flex-col gap-8 bg-white border border-slate-200/60 p-3 sm:p-5 lg:p-8"
      >
        <TestCreationBreadcrumb
          currentStep={testType}
          actionLabel={isEditing ? "Edit Test" : "Create Test"}
        />

        <TestTypeTabs
          value={testType}
          onChange={(type: TestType) => setValue("testType", type)}
        />

        <TestDetailsForm
          control={control}
          register={register}
          errors={errors}
        />

        <FormActions onCancel={handleCancel} />
      </form>
    </div>
  )
}

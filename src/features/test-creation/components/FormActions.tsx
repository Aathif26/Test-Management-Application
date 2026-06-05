import { Button } from "@/components/ui/button"

interface FormActionsProps {
  onCancel: () => void
  cancelLabel?: string
  nextLabel?: string
}

export function FormActions({
  onCancel,
  cancelLabel = "Cancel",
  nextLabel = "Next",
}: FormActionsProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
      <Button
        type="button"
        variant="ghost"
        onClick={onCancel}
        className="w-full sm:w-auto px-10 h-10 text-sm font-medium text-[#6366f1] hover:text-[#4f46e5] bg-slate-50 hover:bg-slate-100 rounded-md transition-colors hover:cursor-pointer"
      >
        {cancelLabel}
      </Button>
      <Button
        type="submit"
        className="w-full sm:w-auto px-12 h-10 text-sm font-medium bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-md shadow-sm transition-all hover:cursor-pointer"
      >
        {nextLabel}
      </Button>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

interface FormActionsProps {
  onCancel: () => void
  cancelLabel?: string
  nextLabel?: string
  isLoading?: boolean
}

export function FormActions({
  onCancel,
  cancelLabel = "Cancel",
  nextLabel = "Next",
  isLoading = false,
}: FormActionsProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
      <Button
        type="button"
        variant="ghost"
        onClick={onCancel}
        disabled={isLoading}
        className="w-full sm:w-auto px-10 h-10 text-sm font-medium text-[#6366f1] hover:text-[#4f46e5] bg-slate-50 hover:bg-slate-100 rounded-md transition-colors hover:cursor-pointer"
      >
        {cancelLabel}
      </Button>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto px-12 h-10 text-sm font-medium bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-md shadow-sm transition-all hover:cursor-pointer disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
            Saving…
          </>
        ) : (
          nextLabel
        )}
      </Button>
    </div>
  )
}

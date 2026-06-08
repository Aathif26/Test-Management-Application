import { useParams, useLocation } from "react-router"
import type { CreateTestResponse } from "@/types"
import { TestSummaryCard } from "@/features/test-creation/components/TestSummaryCard"

interface LocationState {
  testData?: CreateTestResponse["data"]
}

export default function AddQuestionPage() {
  const { id } = useParams<{ id: string }>()
  const { testData } = (useLocation().state as LocationState) || {}

  return (
    <main
      id="add-question-page"
      className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden bg-white overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-6 p-3 sm:p-5 lg:p-8">
        {testData && <TestSummaryCard testData={testData} />}

        {/* Questions section */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-1">Add Questions</h3>
          <p className="text-sm text-slate-500 mb-6">
            Add questions to your test below. Test ID:{" "}
            <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-600">{id}</code>
          </p>

          <div className="flex items-center justify-center h-48 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/50">
            <p className="text-sm text-slate-400">Question creation form will appear here</p>
          </div>
        </div>
      </div>
    </main>
  )
}

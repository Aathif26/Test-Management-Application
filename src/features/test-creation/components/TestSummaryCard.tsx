import type { CreateTestResponse } from "@/types"

type TestData = CreateTestResponse["data"]

interface StatItemProps {
  label: string
  value: React.ReactNode
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">{label}</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  )
}

interface TestSummaryCardProps {
  testData: TestData
}

/** Summary card showing the test's key details after creation */
export function TestSummaryCard({ testData }: TestSummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-linear-to-br from-[#f8faff] to-white p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{testData.name}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{testData.type} &middot; {testData.subject}</p>
        </div>
        <span className="inline-flex items-center self-start sm:self-auto px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60 capitalize">
          {testData.status || "draft"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
        <StatItem label="Questions" value={testData.total_questions} />
        <StatItem label="Duration" value={`${testData.total_time} min`} />
        <StatItem label="Difficulty" value={<span className="capitalize">{testData.difficulty}</span>} />
        <StatItem label="Correct / Wrong" value={`+${testData.correct_marks} / ${testData.wrong_marks}`} />
        <StatItem label="Topics" value={testData.topics?.join(", ") || "—"} />
      </div>
    </div>
  )
}

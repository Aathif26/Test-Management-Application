import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const statusConfig: Record<string, { label: string; className: string }> = {
  live: { label: "Live", className: "bg-green-50 text-green-700 border-green-200" },
  draft: { label: "Draft", className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  unpublished: { label: "Unpublished", className: "bg-gray-50 text-gray-700 border-gray-200" },
  null: { label: "-", className: "bg-gray-50 text-gray-700 border-gray-200" },
}

const difficultyConfig: Record<string, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  medium: { label: "Medium", className: "bg-amber-50 text-amber-700 border-amber-200" },
  hard: { label: "Hard", className: "bg-red-50 text-red-700 border-red-200" },
}

const fallback = { label: "—", className: "bg-gray-50 text-gray-700 border-gray-200" }

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] ?? { ...fallback, label: status }
  return <Badge variant="outline" className={cn(config.className)}>{config.label}</Badge>
}

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const config = difficultyConfig[difficulty] ?? { ...fallback, label: difficulty }
  return <Badge variant="outline" className={cn(config.className)}>{config.label}</Badge>
}

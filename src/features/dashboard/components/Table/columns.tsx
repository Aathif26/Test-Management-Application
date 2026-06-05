import type { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TestItem } from "@/types"
import { FiEdit } from "react-icons/fi"
import { StatusBadge, DifficultyBadge } from "./TableBadges"

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric", month: "short", day: "numeric",
  })
}

function ActionsCell({ test }: { test: TestItem }) {
  const navigate = useNavigate()
  return (
    <div className="flex justify-end gap-1">
      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-green-600 hover:bg-green-50" title="Edit" onClick={() => navigate(`/tests/${test.id}/edit`)}>
        <FiEdit className="w-4 h-4" />
      </Button>
    </div>
  )
}

export const columns: ColumnDef<TestItem>[] = [
  {
    accessorKey: "name",
    header: "Test Name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-xs bg-[#5988EF] text-white">
        {row.getValue("subject")}
      </Badge>
    ),
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => <DifficultyBadge difficulty={row.getValue("difficulty")} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">{formatDate(row.getValue("created_at"))}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell test={row.original} />,
  },
]

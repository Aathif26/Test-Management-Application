import type { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import type { TestItem } from "../../data/mockData"
import { cn } from "@/lib/utils"
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi"

function ActionsCell({ test }: { test: TestItem }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-end gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50" title="View">
                <FiEye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-green-600 hover:bg-green-50" title="Edit" onClick={() => navigate(`/tests/${test.id}/edit`)}>
                <FiEdit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50" title="Delete">
                <FiTrash2 className="w-4 h-4" />
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
            <Badge variant="secondary" className="text-xs">
                {row.getValue("subject")}
            </Badge>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge
                    variant="outline"
                    className={cn(
                        status === "Active" && "bg-green-50 text-green-700 border-green-200",
                        status === "Draft" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                        status === "Unpublished" && "bg-gray-50 text-gray-700 border-gray-200"
                    )}
                >
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "createdDate",
        header: "Created Date",
        cell: ({ row }) => <div className="text-sm text-muted-foreground">{row.getValue("createdDate")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ActionsCell test={row.original} />,
    },
]

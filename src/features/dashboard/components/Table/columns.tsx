import type { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import type { TestItem } from "@/types"
import { cn } from "@/lib/utils"
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi"

function ActionsCell({ test }: { test: TestItem }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-end gap-1">
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

const statusConfig: Record<string, { label: string; className: string }> = {
    live: {
        label: "Live",
        className: "bg-green-50 text-green-700 border-green-200",
    },
    draft: {
        label: "Draft",
        className: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
    unpublished: {
        label: "Unpublished",
        className: "bg-gray-50 text-gray-700 border-gray-200",
    },
    null: {
        label: "-",
        className: "bg-gray-50 text-gray-700 border-gray-200",
    }
}

const difficultyConfig: Record<string, { label: string; className: string }> = {
    easy: {
        label: "Easy",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    medium: {
        label: "Medium",
        className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    hard: {
        label: "Hard",
        className: "bg-red-50 text-red-700 border-red-200",
    },
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export const columns: ColumnDef<TestItem>[] = [
    {
        accessorKey: "name",
        header: "Test Name",
        cell: ({ row }) => (
            <div>
                <div className="font-medium">{row.getValue("name")}</div>
                <div className="text-xs text-muted-foreground capitalize">{row.original.type}</div>
            </div>
        ),
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
        cell: ({ row }) => {
            const difficulty = row.getValue("difficulty") as string;
            const config = difficultyConfig[difficulty] ?? {
                label: difficulty,
                className: "bg-gray-50 text-gray-700 border-gray-200",
            };
            return (
                <Badge variant="outline" className={cn(config.className)}>
                    {config.label}
                </Badge>
            );
        },
    },
    // {
    //     accessorKey: "total_questions",
    //     header: "Questions",
    //     cell: ({ row }) => (
    //         <div className="text-sm text-center font-medium">{row.getValue("total_questions")}</div>
    //     ),
    // },
    // {
    //     accessorKey: "total_marks",
    //     header: "Marks",
    //     cell: ({ row }) => (
    //         <div className="text-sm text-center font-medium">{row.getValue("total_marks")}</div>
    //     ),
    // },
    // {
    //     accessorKey: "total_time",
    //     header: "Duration",
    //     cell: ({ row }) => (
    //         <div className="text-sm text-muted-foreground">{row.getValue("total_time")} min</div>
    //     ),
    // },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const config = statusConfig[status] ?? {
                label: status,
                className: "bg-gray-50 text-gray-700 border-gray-200",
            };
            return (
                <Badge variant="outline" className={cn(config.className)}>
                    {config.label}
                </Badge>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => (
            <div className="text-sm text-muted-foreground">
                {formatDate(row.getValue("created_at"))}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ActionsCell test={row.original} />,
    },
]

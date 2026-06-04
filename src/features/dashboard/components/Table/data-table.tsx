import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getFacetedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group"
import { IoMdSearch } from "react-icons/io";
import { FiFileText, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router";

import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const navigate = useNavigate();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFacetedRowModel: getFacetedRowModel(),
        state: {
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: 6,
            },
        },
    })

    return (
        <div className="flex flex-col flex-1 min-h-0 gap-4">
            {/* Table Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shrink-0">
                <div className="flex items-center flex-1 w-full max-w-sm">
                    <InputGroup>
                        <InputGroupAddon>
                            <InputGroupText>
                                <IoMdSearch />
                            </InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput
                            placeholder="Search tests..."
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("name")?.setFilterValue(event.target.value)
                            }
                        />
                    </InputGroup>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Select
                        value={(table.getColumn("subject")?.getFilterValue() as string) ?? "all"}
                        onValueChange={(value) => table.getColumn("subject")?.setFilterValue(value === "all" ? "" : value)}
                    >
                        <SelectTrigger className="w-full sm:w-37.5">
                            <SelectValue placeholder="All Subjects" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Subjects</SelectItem>
                            <SelectItem value="Math">Math</SelectItem>
                            <SelectItem value="Physics">Physics</SelectItem>
                            <SelectItem value="Chemistry">Chemistry</SelectItem>
                            <SelectItem value="Biology">Biology</SelectItem>
                            <SelectItem value="History">History</SelectItem>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Geography">Geography</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <Select
                        value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
                        onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)}
                    >
                        <SelectTrigger className="w-full sm:w-37.5">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Unpublished">Unpublished</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 min-h-0 overflow-auto rounded-md border">
                <Table>
                    <TableHeader className="bg-gray-50 sticky top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-gray-50">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="font-semibold text-gray-600">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="hover:bg-blue-50/50 transition-colors group"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-48 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                            <FiFileText className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <p className="font-medium text-gray-900">No tests available</p>
                                        <p className="text-sm mt-1 mb-4">Create your first test to get started.</p>
                                        <Button onClick={() => navigate('/tests/new')} variant="outline" className="h-9">
                                            <FiPlus className="w-4 h-4 mr-2" />
                                            Create Test
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between shrink-0">
                <p className="text-sm text-muted-foreground">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <FaChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <FaChevronRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}

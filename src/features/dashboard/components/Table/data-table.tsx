import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { TableToolbar } from "./TableToolbar"
import { DataTableBody } from "./DataTableBody"
import { TablePagination } from "./TablePagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFacetedRowModel: getFacetedRowModel(),
    state: { columnFilters },
    initialState: { pagination: { pageSize: 6 } },
  })

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-4">
      <TableToolbar table={table} data={data} />
      <DataTableBody table={table} columns={columns} />
      <TablePagination table={table} />
    </div>
  )
}

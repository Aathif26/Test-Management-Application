import { flexRender, type ColumnDef, type Table as TanTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FiFileText, FiPlus } from "react-icons/fi"
import { useNavigate } from "react-router"

interface DataTableBodyProps<TData, TValue> {
  table: TanTable<TData>
  columns: ColumnDef<TData, TValue>[]
}

function EmptyState() {
  const navigate = useNavigate()
  return (
    <TableRow>
      <TableCell colSpan={100} className="h-48 text-center">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <FiFileText className="w-6 h-6 text-gray-400" />
          </div>
          <p className="font-medium text-gray-900">No tests available</p>
          <p className="text-sm mt-1 mb-4">Create your first test to get started.</p>
          <Button onClick={() => navigate("/tests/new")} variant="outline" className="h-9">
            <FiPlus className="w-4 h-4 mr-2" /> Create Test
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export function DataTableBody<TData, TValue>({ table }: DataTableBodyProps<TData, TValue>) {
  return (
    <div className="flex-1 min-h-0 overflow-auto rounded-xl border border-slate-200/60 bg-white/50 backdrop-blur-sm shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200/60">
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="hover:bg-transparent border-b-slate-200/60">
              {hg.headers.map((header) => (
                <TableHead key={header.id} className="font-semibold text-slate-500 uppercase tracking-wider text-xs h-11">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}
                className="hover:bg-blue-50/40 transition-colors duration-200 group border-b-slate-100">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <EmptyState />
          )}
        </TableBody>
      </Table>
    </div>
  )
}

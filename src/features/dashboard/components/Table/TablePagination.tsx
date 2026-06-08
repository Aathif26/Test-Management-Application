import { Button } from "@/components/ui/button"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import type { Table } from "@tanstack/react-table"

interface TablePaginationProps<TData> {
  table: Table<TData>
}

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  const { pageIndex } = table.getState().pagination

  return (
    <div className="flex items-center justify-between shrink-0">
      <p className="text-sm text-muted-foreground">
        Page {pageIndex + 1} of {table.getPageCount()}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline" size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="hover:cursor-pointer"
        >
          <FaChevronLeft />
        </Button>
        <Button
          variant="outline" size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="hover:cursor-pointer"
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  )
}

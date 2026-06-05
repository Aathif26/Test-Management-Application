import { useMemo } from "react"
import { IoMdSearch } from "react-icons/io"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Table } from "@tanstack/react-table"

interface TableToolbarProps<TData> {
  table: Table<TData>
  data: TData[]
}

export function TableToolbar<TData>({ table, data }: TableToolbarProps<TData>) {
  const uniqueSubjects = useMemo(() => {
    const subjects = new Set(data.map((row: any) => row.subject).filter(Boolean))
    return Array.from(subjects).sort() as string[]
  }, [data])

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shrink-0">
      {/* Search */}
      <div className="flex items-center flex-1 w-full max-w-sm">
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText><IoMdSearch /></InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search tests..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Select
          value={(table.getColumn("subject")?.getFilterValue() as string) ?? "all"}
          onValueChange={(v) => table.getColumn("subject")?.setFilterValue(v === "all" ? "" : v)}
        >
          <SelectTrigger className="w-full sm:w-1/2">
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Subject</SelectItem>
            {uniqueSubjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
          onValueChange={(v) => table.getColumn("status")?.setFilterValue(v === "all" ? "" : v)}
        >
          <SelectTrigger className="w-full sm:w-1/2">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="unpublished">Unpublished</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

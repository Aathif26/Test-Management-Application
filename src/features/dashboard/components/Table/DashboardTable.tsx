import { DataTable } from './data-table';
import { columns } from './columns';
import type { TestItem } from '@/types';

interface DashboardTableProps {
  tests: TestItem[];
}

export function DashboardTable({ tests }: DashboardTableProps) {
  return <DataTable columns={columns} data={tests} />;
}

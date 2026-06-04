import { DataTable } from './data-table';
import { columns } from './columns';
import type { TestItem } from '../../data/mockData';

interface DashboardTableProps {
  tests: TestItem[];
}

export function DashboardTable({ tests }: DashboardTableProps) {
  return <DataTable columns={columns} data={tests} />;
}

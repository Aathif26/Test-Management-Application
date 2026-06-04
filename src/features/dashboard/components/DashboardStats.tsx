import { FiFileText, FiCheckCircle, FiEdit3, FiEyeOff, FiUserX } from 'react-icons/fi';
import { StatCard } from './StatCard';
import type { DashboardStatsProps } from '@/types';

export function DashboardStats({ total, live, draft, unpublished, unassigned }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 shrink-0">
      <StatCard
        title="Total Tests"
        value={total}
        icon={<FiFileText className="w-4 h-4 text-blue-600" />}
        iconBgColorClass="bg-blue-50 group-hover:bg-blue-100"
      />
      <StatCard
        title="Live Tests"
        value={live}
        icon={<FiCheckCircle className="w-4 h-4 text-emerald-600" />}
        iconBgColorClass="bg-emerald-50 group-hover:bg-emerald-100"
      />
      <StatCard
        title="Draft Tests"
        value={draft}
        icon={<FiEdit3 className="w-4 h-4 text-amber-600" />}
        iconBgColorClass="bg-amber-50 group-hover:bg-amber-100"
      />
      <StatCard
        title="Unpublished"
        value={unpublished}
        icon={<FiEyeOff className="w-4 h-4 text-slate-600" />}
        iconBgColorClass="bg-slate-100 group-hover:bg-slate-200"
      />
      <StatCard
        title="Unassigned"
        value={unassigned}
        icon={<FiUserX className="w-4 h-4 text-indigo-600" />}
        iconBgColorClass="bg-indigo-50 group-hover:bg-indigo-100"
      />
    </div>
  );
}

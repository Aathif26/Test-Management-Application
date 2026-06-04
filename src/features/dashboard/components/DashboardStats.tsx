import { FiFileText, FiCheckCircle, FiEdit3, FiEyeOff } from 'react-icons/fi';
import { stats } from '../data/mockData';
import { StatCard } from './StatCard';

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
      <StatCard
        title="Total Tests"
        value={stats.total}
        icon={<FiFileText className="w-4 h-4 text-blue-600" />}
        iconBgColorClass="bg-blue-50"
      />
      <StatCard
        title="Active Tests"
        value={stats.active}
        icon={<FiCheckCircle className="w-4 h-4 text-green-600" />}
        iconBgColorClass="bg-green-50"
      />
      <StatCard
        title="Draft Tests"
        value={stats.draft}
        icon={<FiEdit3 className="w-4 h-4 text-yellow-600" />}
        iconBgColorClass="bg-yellow-50"
      />
      <StatCard
        title="Unpublished Tests"
        value={stats.unpublished}
        icon={<FiEyeOff className="w-4 h-4 text-gray-600" />}
        iconBgColorClass="bg-gray-100"
      />
    </div>
  );
}

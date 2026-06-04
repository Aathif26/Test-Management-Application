import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { DashboardStats } from '@/features/dashboard/components/DashboardStats';
import { DashboardTable } from '@/features/dashboard/components/Table/DashboardTable';
import { mockTests } from '@/features/dashboard/data/mockData';

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full gap-4">
        <DashboardHeader />
        
        <DashboardStats />
        
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl border shadow-sm p-4 sm:p-6 overflow-hidden transition-all duration-300 hover:shadow-md">
          <DashboardTable tests={mockTests} />
        </div>
      </div>
    </div>
  );
}

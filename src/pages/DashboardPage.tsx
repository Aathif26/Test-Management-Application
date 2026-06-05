import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { DashboardStats } from '@/features/dashboard/components/DashboardStats';
import { DashboardTable } from '@/features/dashboard/components/Table/DashboardTable';
import { useTests, useTestStats } from '@/features/dashboard/hooks/useTests';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { data: tests, isLoading, isError, error, refetch } = useTests();
  const stats = useTestStats(tests);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto w-full flex flex-col h-full gap-6">
          <DashboardHeader />
          {/* Stats skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 shrink-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-26 rounded-xl border border-slate-200/60 bg-white/50 backdrop-blur-sm animate-pulse"
              >
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-20 bg-slate-200 rounded-md" />
                    <div className="h-8 w-8 bg-slate-200 rounded-full" />
                  </div>
                  <div className="h-7 w-12 bg-slate-200 rounded-md" />
                </div>
              </div>
            ))}
          </div>
          {/* Table skeleton */}
          <div className="flex-1 flex flex-col bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm p-4 sm:p-6 overflow-hidden">
            <div className="space-y-4 animate-pulse">
              <div className="flex gap-4">
                <div className="h-10 w-64 bg-slate-200 rounded-md" />
                <div className="h-10 w-36 bg-slate-200 rounded-md" />
                <div className="h-10 w-36 bg-slate-200 rounded-md" />
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8 bg-white">
        <div className="max-w-7xl mx-auto w-full flex flex-col h-full gap-6">
          <DashboardHeader />
          <div className="flex-1 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm">
            <div className="text-center space-y-4 max-w-md p-8">
              <div className="h-16 w-16 rounded-full bg-red-100/50 flex items-center justify-center mx-auto ring-8 ring-red-50">
                <FiAlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">Failed to load tests</h2>
              <p className="text-slate-500 text-sm">
                {error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'}
              </p>
              <Button onClick={() => refetch()} variant="outline" className="gap-2 mt-4 hover:bg-slate-50">
                <FiRefreshCw className="w-4 h-4" />
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full gap-6">
        <DashboardHeader />

        <DashboardStats
          total={stats.total}
          live={stats.live}
          draft={stats.draft}
          unpublished={stats.unpublished}
          unassigned={stats.unassigned}
        />

        <div className="flex-1 flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm p-4 sm:p-6 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-slate-300/60">
          <DashboardTable tests={tests ?? []} />
        </div>
      </div>
    </div>
  );
}

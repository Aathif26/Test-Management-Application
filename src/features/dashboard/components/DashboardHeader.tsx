import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

export function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Test Analytics</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage, monitor, and organize your tests</p>
      </div>
      <Button 
        onClick={() => navigate('/tests/new')} 
        className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 hover:cursor-pointer group font-medium"
      >
        <FiPlus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
        Create New Test
      </Button>
    </div>
  );
}

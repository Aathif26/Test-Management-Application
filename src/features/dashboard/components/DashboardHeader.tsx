import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

export function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Test Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage, monitor, and organize your tests</p>
      </div>
      <Button onClick={() => navigate('/tests/new')} className="flex items-center gap-2 shadow-sm transition-transform hover:scale-105 active:scale-95 bg-[#5988EF] text-white px-4 py-2 rounded-lg hover:bg-[#384EC7] hover:cursor-pointer">
        <FiPlus className="w-4 h-4" />
        Create New Test
      </Button>
    </div>
  );
}

import { FiSearch } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DashboardControlsProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  subjectFilter: string;
  setSubjectFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  subjects: string[];
}

export function DashboardControls({
  searchTerm,
  setSearchTerm,
  subjectFilter,
  setSubjectFilter,
  statusFilter,
  setStatusFilter,
  subjects,
}: DashboardControlsProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 shrink-0">
      <div className="relative w-full lg:max-w-md group">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
        <Input 
          placeholder="Search tests..." 
          className="pl-9 w-full bg-gray-50/50 border-gray-200 focus-visible:ring-blue-500 transition-shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-full sm:w-45 bg-gray-50/50">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-45 bg-gray-50/50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="unpublished">Unpublished</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

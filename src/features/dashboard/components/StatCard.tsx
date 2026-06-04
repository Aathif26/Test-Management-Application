import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColorClass?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  iconBgColorClass = 'bg-gray-100',
  className,
}: StatCardProps) {
  return (
    <Card className={cn('hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className={cn('p-2 rounded-full', iconBgColorClass)}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  );
}

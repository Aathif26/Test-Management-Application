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
  iconBgColorClass = 'bg-slate-100',
  className,
}: StatCardProps) {
  return (
    <Card className={cn(
      'group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-slate-200/60 overflow-hidden relative',
      className
    )}>
      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-slate-500 tracking-wide">{title}</CardTitle>
        <div className={cn('p-2.5 rounded-xl transition-colors duration-300', iconBgColorClass)}>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-bold text-slate-900 tracking-tight">{value}</div>
      </CardContent>
    </Card>
  );
}

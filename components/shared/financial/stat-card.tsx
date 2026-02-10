'use client';

import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FinancialStatCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    trend?: string;
    trendType?: 'positive' | 'negative' | 'neutral';
    color?: string;
}

export function FinancialStatCard({
    label,
    value,
    icon: Icon,
    trend,
    trendType = 'neutral',
    color,
}: FinancialStatCardProps) {
    return (
        <Card className="border-2 bg-card p-6 rounded-2xl shadow-sm border-gold/10 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                <Icon className="h-12 w-12 text-gold" />
            </div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
                <p className={cn(
                    "text-2xl font-black",
                    color === 'green' ? "text-green-600" : color === 'red' ? "text-red-500" : color === 'gold' ? "text-gold" : "text-foreground"
                )}>
                    {value}
                </p>
                {trend && (
                    <span className={cn(
                        "text-[9px] font-black uppercase",
                        trendType === 'positive' ? "text-green-600" : trendType === 'negative' ? "text-red-500" : "text-muted-foreground"
                    )}>
                        {trend}
                    </span>
                )}
            </div>
        </Card>
    );
}

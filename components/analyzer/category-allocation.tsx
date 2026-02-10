'use client';

import { PieChart as PieChartIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CategoryData {
    cat: string;
    val: number;
    color: string;
}

interface CategoryAllocationProps {
    data: CategoryData[];
}

export function CategoryAllocation({ data }: CategoryAllocationProps) {
    return (
        <Card className="border-2 bg-white rounded-[32px] overflow-hidden shadow-sm border-gold/10">
            <CardHeader className="border-b border-gold/5">
                <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                    <PieChartIcon className="h-4 w-4 text-gold" /> Category Allocation
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
                <div className="flex flex-col gap-6">
                    {data.map((item, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-tight">
                                <span>{item.cat}</span>
                                <span style={{ color: item.color }}>{item.val}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{ width: `${item.val}%`, backgroundColor: item.color }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

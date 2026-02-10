'use client';

import { LineChart as LineChartIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ExpenditureTrendProps {
    data: { month: string; income: number; expenses: number }[];
}

export function ExpenditureTrend({ data }: ExpenditureTrendProps) {
    return (
        <Card className="lg:col-span-2 border-2 bg-white rounded-[32px] overflow-hidden shadow-sm border-gold/10">
            <CardHeader className="border-b border-gold/5">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                        <LineChartIcon className="h-4 w-4 text-gold" /> 6-Month Expenditure Trend
                    </CardTitle>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-gold" />
                            <span className="text-[9px] font-bold">Income</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-black" />
                            <span className="text-[9px] font-bold">Expenses</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-8 h-64 flex items-end justify-between gap-4">
                {data.map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="w-full flex items-end gap-1 h-full">
                            <div
                                className="flex-1 bg-gold/10 rounded-t-lg transition-all group-hover:bg-gold/30"
                                style={{ height: `${item.income}%` }}
                            />
                            <div
                                className="flex-1 bg-black/5 rounded-t-lg transition-all group-hover:bg-black/20"
                                style={{ height: `${item.expenses}%` }}
                            />
                        </div>
                        <span className="text-[10px] font-black text-gray-400 uppercase">{item.month}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

'use client';

import { LineChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HistoricalTrendProps {
    title: string;
    data: number[];
    baseRate: number;
}

export function HistoricalTrend({ title, data, baseRate }: HistoricalTrendProps) {
    return (
        <Card className="border-2 bg-white rounded-[32px] overflow-hidden shadow-sm border-gold/10">
            <CardHeader className="border-b border-gold/5">
                <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-gold" /> {title}
                    </div>
                    <div className="flex gap-2">
                        {['7D', '30D', '6M', '1Y'].map(t => (
                            <Button key={t} variant="ghost" className={cn("h-7 px-3 text-[9px] font-black rounded-lg", t === '30D' ? "bg-black text-white" : "text-gray-400")}>{t}</Button>
                        ))}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-10">
                <div className="h-48 flex items-end justify-between gap-1 relative">
                    {data.map((h, i) => (
                        <div key={i} className="flex-1 bg-gold/10 rounded-full transition-all hover:bg-gold cursor-help group relative" style={{ height: `${h}%` }}>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-[8px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                Rs. {baseRate + (h / 2)}
                            </div>
                        </div>
                    ))}
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-100" />
                </div>
            </CardContent>
        </Card>
    );
}

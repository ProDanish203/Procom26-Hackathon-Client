'use client';

import { LineChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CurrencyStats } from '@/API/currency.api';

interface HistoricalTrendProps {
    title: string;
    data: number[];
    stats?: CurrencyStats;
}

export function HistoricalTrend({ title, data, stats }: HistoricalTrendProps) {
    if (!data.length || !stats) return null;

    const min = stats.min;
    const max = stats.max;
    const range = max - min;

    return (
        <Card className="border-2 bg-card rounded-[32px] overflow-hidden shadow-sm border-gold/10">
            <CardHeader className="border-b border-gold/5">
                <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-gold" /> {title}
                    </div>
                    <div className="flex gap-2">
                        {['7D', '30D', '6M', '1Y'].map(t => (
                            <Button key={t} variant="ghost" className={cn("h-7 px-3 text-[9px] font-black rounded-lg", t === '30D' ? "bg-gold text-black" : "text-muted-foreground hover:text-foreground")}>{t}</Button>
                        ))}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-10">
                <div className="space-y-4">
                    {/* Stats Summary */}
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                            <p className="text-[10px] font-black uppercase text-muted-foreground">Current</p>
                            <p className="text-sm font-black text-foreground">{stats.current.toFixed(4)}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-muted-foreground">Average</p>
                            <p className="text-sm font-black text-foreground">{stats.avg30.toFixed(4)}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-green-600">Low</p>
                            <p className="text-sm font-black text-green-600">{min.toFixed(4)}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-red-500">High</p>
                            <p className="text-sm font-black text-red-500">{max.toFixed(4)}</p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-48 flex items-end justify-between gap-1 relative">
                        {data.map((rate, i) => {
                            const heightPercent = range > 0 ? ((rate - min) / range) * 100 : 50;
                            const safeHeight = Math.max(2, Math.min(100, heightPercent));
                            
                            return (
                                <div 
                                    key={i} 
                                    className="flex-1 bg-gold/10 rounded-t transition-all hover:bg-gold cursor-help group relative" 
                                    style={{ height: `${safeHeight}%` }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gold text-black px-2 py-1 rounded text-[8px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 font-bold shadow-lg">
                                        {rate.toFixed(4)}
                                    </div>
                                </div>
                            );
                        })}
                        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-border" />
                    </div>

                    {/* Volatility Indicator */}
                    <div className="flex items-center justify-between text-xs">
                        <span className="font-black uppercase text-muted-foreground">Volatility</span>
                        <span className={cn(
                            "font-black",
                            stats.volatility < 0.01 ? "text-green-600" : stats.volatility < 0.03 ? "text-yellow-600" : "text-red-500"
                        )}>
                            {(stats.volatility * 100).toFixed(2)}%
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

'use client';

import { Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface UpcomingItem {
    date: string;
    name: string;
    amount: string;
}

interface UpcomingCalendarProps {
    items: UpcomingItem[];
    highlightDays: number[];
}

export function UpcomingCalendar({ items, highlightDays }: UpcomingCalendarProps) {
    return (
        <Card className="border-2 bg-card rounded-[32px] overflow-hidden shadow-sm border-gold/10">
            <CardHeader className="border-b border-gold/5">
                <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-between">
                    <span>Upcoming Payments</span>
                    <Calendar className="h-4 w-4 text-gold" />
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-7 gap-1 text-center mb-4">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                        <span key={d} className="text-[9px] font-black text-muted-foreground/50">{d}</span>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "aspect-square flex items-center justify-center text-[10px] font-black rounded-lg transition-all",
                                highlightDays.includes(i + 1) ? "bg-gold/10 text-gold border border-gold/20 cursor-pointer hover:bg-gold hover:text-black" : "text-muted-foreground"
                            )}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
                <div className="mt-6 space-y-4">
                    {items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase gap-2">
                            <span className="text-muted-foreground shrink-0">{item.date}</span>
                            <span className="text-foreground flex-1 truncate">{item.name}</span>
                            <span className="text-gold shrink-0">{item.amount}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

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
        <Card className="border-2 bg-white rounded-[32px] overflow-hidden shadow-sm border-gold/10">
            <CardHeader className="border-b border-gold/5">
                <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center justify-between">
                    <span>Upcoming Payments</span>
                    <Calendar className="h-4 w-4 text-gold" />
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-7 gap-1 text-center mb-4">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                        <span key={d} className="text-[9px] font-black text-gray-300">{d}</span>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "aspect-square flex items-center justify-center text-[10px] font-black rounded-lg transition-all",
                                highlightDays.includes(i + 1) ? "bg-gold/10 text-gold border border-gold/20 cursor-pointer hover:bg-gold hover:text-black" : "text-gray-400"
                            )}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
                <div className="mt-6 space-y-4">
                    {items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase">
                            <span className="text-gray-400">{item.date}</span>
                            <span className="text-black ml-2 flex-1">{item.name}</span>
                            <span className="text-gold">{item.amount}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CurrencyRate {
    code: string;
    name: string;
    rate: number;
    change: string;
    trend: 'up' | 'down' | 'neutral';
}

interface LiveRatesGridProps {
    currencies: CurrencyRate[];
}

export function LiveRatesGrid({ currencies }: LiveRatesGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {currencies.map(curr => (
                <Card key={curr.code} className="border-2 bg-card p-4 md:p-6 rounded-2xl shadow-sm border-gold/10 hover:shadow-md transition-all group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center border border-border group-hover:bg-gold group-hover:text-black transition-colors">
                            <span className="font-black text-xs">{curr.code[0]}{curr.code[1]}</span>
                        </div>
                        <span className={cn(
                            "text-[10px] font-black flex items-center gap-1",
                            curr.trend === 'up' ? "text-green-600" : curr.trend === 'down' ? "text-red-500" : "text-muted-foreground"
                        )}>
                            {curr.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : curr.trend === 'down' ? <TrendingDown className="h-3 w-3" /> : null}
                            {curr.change}
                        </span>
                    </div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">{curr.name}</p>
                    <p className="text-xl font-black text-foreground">Rs. {curr.rate}</p>
                </Card>
            ))}
        </div>
    );
}

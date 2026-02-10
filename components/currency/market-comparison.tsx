'use client';

import { Scale, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ComparisonItem {
    name: string;
    rate: string;
    fee: string;
    type: string;
}

interface MarketComparisonProps {
    items: ComparisonItem[];
    onRefresh: () => void;
}

export function MarketComparison({ items, onRefresh }: MarketComparisonProps) {
    return (
        <Card className="border-2 bg-white rounded-[32px] overflow-hidden shadow-sm border-gold/10">
            <CardHeader className="border-b border-gold/5">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                    <Scale className="h-4 w-4 text-gold" /> Market Comparison
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-gray-50">
                    {items.map((comp, i) => (
                        <div key={i} className={cn("px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-all", comp.type === 'best' && "bg-gold/5")}>
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-black uppercase text-black">{comp.name}</p>
                                <p className="text-[9px] font-bold text-gray-400">{comp.fee} Markup</p>
                            </div>
                            <div className="text-right">
                                <p className={cn("font-black text-sm", comp.type === 'best' ? "text-gold" : "text-black")}>Rs. {comp.rate}</p>
                                {comp.type === 'best' && <Badge className="bg-gold text-white text-[7px] font-black h-4 px-2 tracking-widest uppercase">Best Value</Badge>}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4">
                    <Button
                        onClick={onRefresh}
                        variant="ghost"
                        className="w-full font-black uppercase text-[9px] text-gold hover:bg-gold/5 rounded-lg flex items-center justify-center gap-2"
                    >
                        Refresh Live Sources <ChevronRight className="h-3 w-3" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

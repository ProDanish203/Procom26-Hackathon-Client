'use client';

import { LucideIcon, Sparkles, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Insight {
    title: string;
    text: string;
    icon: LucideIcon;
    color?: string;
}

interface AIInsightsCardProps {
    insights: Insight[];
    title?: string;
    className?: string;
}

export function AIInsightsCard({
    insights,
    title = "AI Intelligence Insights",
    className,
}: AIInsightsCardProps) {
    return (
        <Card className={cn("border-2 bg-black text-white rounded-[32px] overflow-hidden shadow-2xl relative border-gold", className)}>
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="h-20 w-20 text-gold" />
            </div>
            <CardHeader className="border-b border-gold/20">
                <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-gold flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-gold" /> {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                {insights.map((insight, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                        <div className="p-3 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-black transition-all h-fit shrink-0">
                            <insight.icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-black text-gold uppercase text-[11px] tracking-widest">{insight.title}</p>
                            <p className="text-xs text-gray-400 leading-relaxed font-bold">{insight.text}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

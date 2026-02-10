'use client';

import { Zap, Clock, Calendar, Pause, Play, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Bill {
    name: string;
    amount: string;
    freq: string;
    nextDue: string;
    status: string;
}

interface ActiveBillsListProps {
    bills: Bill[];
}

export function ActiveBillsList({ bills }: ActiveBillsListProps) {
    return (
        <div className="space-y-4">
            {bills.map((bill, i) => (
                <Card key={i} className="border-2 bg-card rounded-3xl overflow-hidden hover:shadow-md transition-all border-gold/10">
                    <div className="flex flex-col md:flex-row items-center p-6 gap-6">
                        <div className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0",
                            bill.status === 'Active' ? "bg-gold/10 border-2 border-gold/20" : "bg-muted border-2 border-border"
                        )}>
                            <Zap className={cn("h-6 w-6", bill.status === 'Active' ? "text-gold" : "text-muted-foreground")} />
                        </div>
                        <div className="flex-1 text-center md:text-left min-w-0">
                            <h3 className="text-lg font-black text-foreground uppercase tracking-tight truncate">{bill.name}</h3>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-1">
                                <p className="text-[10px] font-black text-muted-foreground uppercase flex items-center gap-1.5">
                                    <Clock className="h-3 w-3" /> {bill.freq}
                                </p>
                                <p className="text-[10px] font-black text-gold uppercase flex items-center gap-1.5">
                                    <Calendar className="h-3 w-3" /> Due {bill.nextDue}
                                </p>
                            </div>
                        </div>
                        <div className="text-center md:text-right shrink-0">
                            <p className="text-2xl font-black text-foreground">{bill.amount}</p>
                            <Badge variant="outline" className={cn(
                                "font-black uppercase text-[8px] tracking-[0.2em] border-2 h-6 mt-1",
                                bill.status === 'Active' ? "border-green-500/20 text-green-500 bg-green-500/10" : "border-muted-foreground/20 text-muted-foreground bg-muted"
                            )}>
                                {bill.status}
                            </Badge>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-gold hover:bg-gold/5 rounded-full">
                                {bill.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full">
                                <XCircle className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

'use client';

import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DetectedBill {
    name: string;
    amount: string;
    lastPaid: string;
    frequency: string;
}

interface DetectedBillsListProps {
    bills: DetectedBill[];
}

export function DetectedBillsList({ bills }: DetectedBillsListProps) {
    return (
        <div className="space-y-4">
            <Card className="border-4 border-dashed bg-gold/5 border-gold/20 rounded-3xl p-6 text-center">
                <p className="text-[10px] font-black uppercase text-gold tracking-widest mb-1">AI Detection Engine Online</p>
                <p className="text-xs font-bold text-muted-foreground">Our AI has detected recurring payment patterns from your transactions. Would you like to set up auto-pay for these?</p>
            </Card>
            {bills.map((bill, i) => (
                <Card key={i} className="border-2 bg-card rounded-3xl overflow-hidden border-gold/10">
                    <div className="flex flex-col md:flex-row items-start md:items-center p-6 gap-4 md:gap-6">
                        <div className="w-12 h-12 rounded-xl bg-gold/5 flex items-center justify-center border-2 border-gold/10 text-gold shrink-0">
                            <Search className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-black text-foreground uppercase text-sm truncate">{bill.name}</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{bill.frequency}</p>
                        </div>
                        <div className="text-left md:text-right md:px-6 w-full md:w-auto">
                            <p className="font-black text-foreground">{bill.amount}</p>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase">Last: {bill.lastPaid}</p>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <Button size="sm" className="flex-1 md:flex-none h-10 px-4 rounded-xl font-black uppercase text-[10px] text-black shadow-lg bg-gold hover:bg-gold/90">
                                Add
                            </Button>
                            <Button size="sm" variant="ghost" className="flex-1 md:flex-none h-10 px-4 rounded-xl font-black uppercase text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted">
                                Ignore
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

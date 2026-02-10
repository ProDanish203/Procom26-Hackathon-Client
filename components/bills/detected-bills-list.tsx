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
                <p className="text-xs font-bold text-gray-600">Our AI has detected recurring payment patterns from your transactions. Would you like to set up auto-pay for these?</p>
            </Card>
            {bills.map((bill, i) => (
                <Card key={i} className="border-2 bg-white rounded-3xl overflow-hidden border-gold/10">
                    <div className="flex items-center p-6 gap-6">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border-2 border-gold/10 text-gold">
                            <Search className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-black text-black uppercase text-sm">{bill.name}</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">{bill.frequency}</p>
                        </div>
                        <div className="text-right px-6">
                            <p className="font-black text-black">{bill.amount}</p>
                            <p className="text-[9px] font-bold text-gray-400 uppercase">Last: {bill.lastPaid}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" className="h-10 px-4 rounded-xl font-black uppercase text-[10px] text-white shadow-lg bg-gold">
                                Add
                            </Button>
                            <Button size="sm" variant="ghost" className="h-10 px-4 rounded-xl font-black uppercase text-[10px] text-gray-400">
                                Ignore
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BalanceDetailsCardProps {
    balance: string;
    status: string;
    type: string;
    minPayment?: string;
    dueDate?: string;
    onSettle?: () => void;
}

export function BalanceDetailsCard({
    balance,
    status,
    type,
    minPayment,
    dueDate,
    onSettle,
}: BalanceDetailsCardProps) {
    const isCredit = type.toLowerCase() === 'credit';

    return (
        <Card className="border-2 shadow-2xl overflow-hidden bg-white border-gold/10">
            <div className="h-2 w-full bg-black" />
            <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                        <div className="h-6 w-1 bg-gold rounded-full" />
                        Balance Details
                    </CardTitle>
                    <Badge className="font-bold border-2 border-gold/33 text-gold bg-gold/5">
                        {status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Available Funds</p>
                        <p className="text-3xl font-black text-black">{balance}</p>
                    </div>
                    {isCredit && minPayment && (
                        <div className="p-4 rounded-xl bg-red-50/50 border border-red-100">
                            <p className="text-[10px] font-black uppercase text-red-400 tracking-widest mb-1">Minimum Payment</p>
                            <p className="text-3xl font-black text-red-600">{minPayment}</p>
                        </div>
                    )}
                </div>

                {isCredit && dueDate && (
                    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-black text-white">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white/10">
                                <Calendar className="h-5 w-5 text-gold" />
                            </div>
                            <div className="text-left">
                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Due Date</p>
                                <p className="text-sm font-black">{dueDate}</p>
                            </div>
                        </div>
                        <Button
                            onClick={onSettle}
                            className="w-full md:w-auto font-black uppercase text-xs h-11 px-8 rounded-lg shadow-xl bg-gold text-black hover:opacity-90"
                        >
                            Settle Now
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

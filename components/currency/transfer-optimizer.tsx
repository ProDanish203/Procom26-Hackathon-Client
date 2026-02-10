'use client';

import {
    Calculator,
    ArrowDownUp,
    ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TransferOptimizerProps {
    amount: string;
    onAmountChange: (val: string) => void;
    fromCurrency: string;
    toCurrency: string;
    convertedAmount: string;
    onTransfer: () => void;
}

export function TransferOptimizer({
    amount,
    onAmountChange,
    fromCurrency,
    toCurrency,
    convertedAmount,
    onTransfer,
}: TransferOptimizerProps) {
    return (
        <Card className="border-2 shadow-xl rounded-[32px] overflow-hidden bg-white border-gold/20">
            <div className="p-8 border-b-2 border-gold/10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gold/10">
                        <Calculator className="h-5 w-5 text-gold" />
                    </div>
                    <CardTitle className="text-2xl font-black uppercase tracking-tighter text-black">Transfer Optimizer</CardTitle>
                </div>
                <CardDescription className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Calculate real-time conversion rates with zero hidden fees.</CardDescription>
            </div>
            <CardContent className="p-8 space-y-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full space-y-3">
                        <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">You Send</Label>
                        <div className="relative group">
                            <Input
                                value={amount}
                                onChange={(e) => onAmountChange(e.target.value)}
                                className="h-16 pl-6 pr-24 text-2xl font-black border-2 rounded-2xl focus-visible:ring-gold bg-gray-50/50 group-focus-within:bg-white transition-all shadow-inner border-gold/10"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-l pl-4 font-black text-black">
                                {fromCurrency}
                            </div>
                        </div>
                    </div>

                    <div className="p-3 rounded-full bg-gold/10 text-gold shadow-lg hover:rotate-180 transition-all duration-500 cursor-pointer shrink-0">
                        <ArrowDownUp className="h-6 w-6" />
                    </div>

                    <div className="w-full space-y-3">
                        <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Recipient Receives</Label>
                        <div className="relative group">
                            <Input
                                value={convertedAmount}
                                readOnly
                                className="h-16 pl-6 pr-24 text-2xl font-black border-2 rounded-2xl focus-visible:ring-gold bg-gray-50/30 border-gold/10"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-l pl-4 font-black text-black">
                                {toCurrency}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gold/10 space-y-4">
                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                        <span className="text-gray-400">Mid-Market Rate</span>
                        <span className="text-black">1 {fromCurrency} = 278.45 {toCurrency}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                        <span className="text-gray-400">Transaction Fee</span>
                        <span className="text-green-600">Rs. 0.00 (Standard)</span>
                    </div>
                    <hr className="border-gold/10" />
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-black uppercase">Total Savings vs Banks</span>
                        <span className="font-black text-gold">Rs. 4,520.00</span>
                    </div>
                </div>

                <Button
                    onClick={onTransfer}
                    className="w-full h-16 text-xl font-black uppercase tracking-tighter text-white shadow-xl rounded-2xl transition-all hover:scale-[1.01] bg-gold"
                >
                    Transfer Now <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
            </CardContent>
        </Card>
    );
}

'use client';

import { Users, Receipt, DollarSign, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BillInputProps {
    totalAmount: string;
    onAmountChange: (val: string) => void;
    description: string;
    onDescriptionChange: (val: string) => void;
}

export function BillInput({
    totalAmount,
    onAmountChange,
    description,
    onDescriptionChange,
}: BillInputProps) {
    return (
        <Card className="border-2 shadow-xl rounded-[32px] overflow-hidden bg-white border-gold/20">
            <div className="p-8 border-b-2 border-gold/10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gold/10">
                        <Receipt className="h-5 w-5 text-gold" />
                    </div>
                    <CardTitle className="text-2xl font-black uppercase tracking-tighter text-black">New Split Request</CardTitle>
                </div>
                <CardDescription className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Enter the total amount to divide among your peers.</CardDescription>
            </div>
            <CardContent className="p-8 space-y-8">
                <div className="space-y-3">
                    <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Total Bill Amount</Label>
                    <div className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <DollarSign className="h-8 w-8 text-gold" />
                            <span className="text-2xl font-black text-black">Rs.</span>
                        </div>
                        <Input
                            value={totalAmount}
                            onChange={(e) => onAmountChange(e.target.value)}
                            className="h-24 pl-32 text-5xl font-black border-2 rounded-3xl focus-visible:ring-gold bg-gray-50/30 group-focus-within:bg-white transition-all border-gold/10"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Group Description</Label>
                    <Input
                        value={description}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        className="h-16 px-6 text-xl font-bold border-2 rounded-2xl focus-visible:ring-gold bg-gray-50/50 border-gold/10"
                        placeholder="e.g., Dinner at Kolachi / Trip to Hunza"
                    />
                </div>
            </CardContent>
        </Card>
    );
}

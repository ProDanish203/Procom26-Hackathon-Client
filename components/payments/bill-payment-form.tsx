'use client';

import { Receipt, Zap, Building2, Sparkles, Smartphone, Search, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function BillPaymentForm() {
    return (
        <Card className="border-2 shadow-xl rounded-[32px] overflow-hidden bg-white border-gold/20">
            <div className="p-8 border-b-2 border-gold/10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gold/10">
                        <Receipt className="h-5 w-5 text-gold" />
                    </div>
                    <CardTitle className="text-2xl font-black uppercase tracking-tighter text-black">Utility Bills</CardTitle>
                </div>
                <CardDescription className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Pay your monthly utilities without any hassle.</CardDescription>
            </div>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: 'Electricity', icon: Zap },
                        { name: 'Gas', icon: Building2 },
                        { name: 'Water', icon: Sparkles },
                        { name: 'Internet', icon: Smartphone }
                    ].map(cat => (
                        <Button key={cat.name} variant="outline" className="h-24 flex flex-col gap-3 font-black uppercase text-[10px] border-2 rounded-2xl hover:border-gold hover:text-gold hover:bg-gold/5 transition-all group border-gold/10">
                            <cat.icon className="h-6 w-6 group-hover:scale-110 transition-transform text-gold" />
                            {cat.name}
                        </Button>
                    ))}
                </div>

                <div className="space-y-3">
                    <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Consumer Number / Reference</Label>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input className="h-14 pl-12 border-2 rounded-2xl focus-visible:ring-gold border-gold/10" placeholder="Enter reference number from your bill" />
                    </div>
                </div>

                <Button className="w-full h-16 text-xl font-black uppercase tracking-tighter text-white shadow-xl rounded-2xl bg-gold hover:opacity-90">
                    Fetch Bill Details <ChevronRight className="ml-3 h-6 w-6" />
                </Button>
            </CardContent>
        </Card>
    );
}

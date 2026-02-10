'use client';

import { Receipt, Zap, Building2, Sparkles, Smartphone, Search, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function BillPaymentForm() {
    return (
        <Card className="border-2 shadow-xl rounded-[32px] overflow-hidden bg-card border-gold/20">
            <div className="p-6 md:p-8 border-b-2 border-gold/10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gold/10">
                        <Receipt className="h-5 w-5 text-gold" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground">Utility Bills</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Pay your monthly utilities without any hassle.</CardDescription>
            </div>
            <CardContent className="p-6 md:p-8 space-y-6 md:space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {[
                        { name: 'Electricity', icon: Zap },
                        { name: 'Gas', icon: Building2 },
                        { name: 'Water', icon: Sparkles },
                        { name: 'Internet', icon: Smartphone }
                    ].map(cat => (
                        <Button key={cat.name} variant="outline" className="h-20 md:h-24 flex flex-col gap-2 md:gap-3 font-black uppercase text-[9px] md:text-[10px] border-2 rounded-2xl hover:border-gold hover:text-gold hover:bg-gold/5 transition-all group border-gold/10">
                            <cat.icon className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform text-gold" />
                            {cat.name}
                        </Button>
                    ))}
                </div>

                <div className="space-y-3">
                    <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Consumer Number / Reference</Label>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input className="h-14 pl-12 border-2 rounded-2xl focus-visible:ring-gold border-gold/10 bg-muted" placeholder="Enter reference number from your bill" />
                    </div>
                </div>

                <Button className="w-full h-14 md:h-16 text-lg md:text-xl font-black uppercase tracking-tighter text-black shadow-xl rounded-2xl bg-gold hover:bg-gold/90">
                    Fetch Bill Details <ChevronRight className="ml-3 h-5 md:h-6 w-5 md:w-6" />
                </Button>
            </CardContent>
        </Card>
    );
}

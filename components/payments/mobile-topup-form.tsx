'use client';

import { Smartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function MobileTopupForm() {
    return (
        <Card className="border-4 shadow-2xl rounded-[32px] overflow-hidden bg-card border-gold">
            <div className="bg-black p-6 md:p-8 text-white">
                <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter text-gold">Mobile Top-up</CardTitle>
                <CardDescription className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest mt-1">Recharge your talk time instantly.</CardDescription>
            </div>
            <CardContent className="p-6 md:p-8 space-y-6 md:space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {['Jazz', 'Telenor', 'Zong', 'Ufone'].map(cat => (
                        <Button key={cat} variant="outline" className="h-14 md:h-16 font-black uppercase border-2 text-[10px] md:text-[11px] rounded-xl hover:border-gold hover:bg-gold/5 transition-all border-gold/10">
                            {cat}
                        </Button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-3">
                        <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Mobile Number</Label>
                        <Input className="h-14 border-2 rounded-xl border-gold/10 focus-visible:ring-gold bg-muted" placeholder="03xx - xxxxxxx" />
                    </div>

                    <div className="space-y-3">
                        <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Amount</Label>
                        <div className="relative">
                            <Input className="h-14 pl-12 border-2 rounded-xl font-bold border-gold/10 focus-visible:ring-gold bg-muted" placeholder="100.00" />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold font-black">Rs.</span>
                        </div>
                    </div>
                </div>

                <Button className="w-full h-14 md:h-16 text-lg md:text-xl font-black uppercase tracking-tighter text-black shadow-xl rounded-2xl bg-gold hover:bg-gold/90">
                    Recharge Now
                </Button>
            </CardContent>
        </Card>
    );
}

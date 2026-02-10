'use client';

import { Plus, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Beneficiary {
    name: string;
    bank: string;
    initial: string;
}

interface QuickBeneficiariesProps {
    beneficiaries: Beneficiary[];
}

export function QuickBeneficiaries({ beneficiaries }: QuickBeneficiariesProps) {
    return (
        <Card className="border-2 rounded-2xl shadow-sm bg-card border-gold/10">
            <CardHeader className="pb-4 border-b border-gold/5">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-between text-muted-foreground">
                    Quick Recipients
                    <div className="p-1.5 rounded-full bg-gold/10 text-gold cursor-pointer hover:bg-gold hover:text-black transition-all">
                        <Plus className="h-3.5 w-3.5" />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
                {beneficiaries.map(ben => (
                    <div key={ben.name} className="flex items-center gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
                        <div className="w-12 h-12 rounded-2xl bg-muted text-gold flex items-center justify-center font-black text-xs shadow-sm border-2 border-gold/10 group-hover:bg-gold group-hover:text-black transition-all">
                            {ben.initial}
                        </div>
                        <div>
                            <p className="text-sm font-black text-foreground group-hover:text-gold transition-colors">{ben.name}</p>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">{ben.bank}</p>
                        </div>
                        <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground/30 group-hover:text-gold" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

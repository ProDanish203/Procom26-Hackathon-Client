'use client';

import { CreditCard, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisualCardProps {
    type: string;
    network: string;
    number: string;
    expiry: string;
    cvv: string;
    holder: string;
    showNumbers: boolean;
    onToggleNumbers: () => void;
}

export function VisualCard({
    type,
    network,
    number,
    expiry,
    cvv,
    holder,
    showNumbers,
    onToggleNumbers,
}: VisualCardProps) {
    const isDebit = type.toLowerCase() === 'debit';

    return (
        <div className="relative aspect-[1.58/1] w-full max-w-[480px] mx-auto group">
            <div className={cn(
                "absolute inset-0 rounded-[24px] p-8 text-white shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-500 border-2",
                isDebit ? "bg-black border-gold/30" : "bg-zinc-900 border-gold/40"
            )}>
                {/* Premium Aesthetic Patterns */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-[0.05] rounded-full -mr-20 -mt-20 blur-3xl" />

                <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase font-black tracking-[0.3em] text-gold">JSBL {type} Card</p>
                        <h3 className="text-white font-black italic tracking-tighter text-xl">{network}</h3>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                        <CreditCard className="h-8 w-8 text-gold" />
                    </div>
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-9 bg-gradient-to-br from-gold to-yellow-700 rounded-md border border-white/20 shadow-lg" />
                        <div className="flex-1 flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-md">
                            <span className="text-xl md:text-2xl font-mono tracking-[0.2em] font-bold text-white">
                                {showNumbers ? number : `**** **** **** ${number.slice(-4)}`}
                            </span>
                            <button onClick={onToggleNumbers} className="text-gold hover:text-white transition-colors">
                                {showNumbers ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-[8px] uppercase font-black tracking-widest opacity-40">Card Holder</p>
                            <p className="text-sm font-bold tracking-widest leading-none text-white">{holder}</p>
                        </div>
                        <div className="flex gap-8">
                            <div className="space-y-1 text-center">
                                <p className="text-[8px] uppercase font-black tracking-widest opacity-40">Expiry</p>
                                <p className="text-sm font-mono leading-none text-white font-bold">{expiry}</p>
                            </div>
                            <div className="space-y-1 text-center">
                                <p className="text-[8px] uppercase font-black tracking-widest opacity-40">CVV</p>
                                <p className="text-sm font-mono leading-none text-white font-bold">***</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

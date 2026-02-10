'use client';

import { CheckCircle2, Share2, Send, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Participant {
    id: number;
    name: string;
    share: number;
}

interface SplitBreakdownProps {
    totalAmount: number;
    participants: Participant[];
    onFinalize: () => void;
}

export function SplitBreakdown({
    totalAmount,
    participants,
    onFinalize,
}: SplitBreakdownProps) {
    const sharePrice = totalAmount / participants.length;

    return (
        <Card className="border-2 bg-black text-white rounded-[40px] overflow-hidden shadow-2xl sticky top-6 border-gold">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <CheckCircle2 className="h-32 w-32 text-gold" />
            </div>

            <CardHeader className="p-8 border-b border-white/10 relative z-10">
                <p className="text-gold font-black uppercase text-[10px] tracking-[0.4em] mb-2 leading-none">Live Breakdown</p>
                <CardTitle className="text-3xl font-black uppercase tracking-tighter">Settlement Plan</CardTitle>
            </CardHeader>

            <CardContent className="p-8 space-y-10 relative z-10">
                <div className="space-y-4">
                    {participants.map((p, idx) => (
                        <div key={p.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-gold text-xs border border-white/5">
                                    {idx + 1}
                                </div>
                                <span className="font-black text-sm uppercase tracking-tight text-white/90 group-hover:text-gold transition-colors">{p.name || `Member ${idx + 1}`}</span>
                            </div>
                            <p className="font-black text-lg tracking-tighter text-white">
                                <span className="text-xs text-gold mr-1">Rs.</span>
                                {sharePrice.toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="p-6 bg-gold/10 rounded-3xl border border-gold/20 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gold">Total Pool</span>
                        <span className="text-xl font-black">Rs. {totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gold/10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Shares</span>
                        <span className="text-xl font-black">{participants.length} Ways</span>
                    </div>
                    <div className="pt-2 flex flex-col gap-3">
                        <Button
                            onClick={onFinalize}
                            className="w-full h-14 bg-gold text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-[1.02] transition-all"
                        >
                            <Send className="mr-2 h-4 w-4" /> Finalize & Send Requests
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-14 border-2 border-white/10 bg-white/5 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all">
                                <Share2 className="mr-2 h-4 w-4" /> Link
                            </Button>
                            <Button variant="outline" className="h-14 border-2 border-white/10 bg-white/5 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all">
                                <Zap className="mr-2 h-4 w-4" /> Remind
                            </Button>
                        </div>
                    </div>
                </div>

                <p className="text-[9px] text-gray-400 text-center font-bold uppercase tracking-[0.2em]">All members will receive a notification with a payment link.</p>
            </CardContent>
        </Card>
    );
}

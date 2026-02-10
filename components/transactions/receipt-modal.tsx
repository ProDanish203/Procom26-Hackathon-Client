'use client';

import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import {
    DollarSign,
    Download,
    ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transaction {
    id: number;
    merchant: string;
    category: string;
    amount: number;
    date: string;
    time: string;
    status: string;
    reference: string;
}

interface ReceiptModalProps {
    transaction: Transaction | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ReceiptModal({
    transaction,
    isOpen,
    onClose,
}: ReceiptModalProps) {
    if (!transaction) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-card border-4 p-0 overflow-hidden shadow-2xl rounded-[32px] border-gold">
                <div className="bg-card p-8 text-center space-y-4 relative overflow-hidden border-b-2 border-gold/10">
                    <div className="bg-gold/10 w-20 h-20 rounded-[24px] mx-auto flex items-center justify-center shadow-sm relative z-10">
                        <DollarSign className="h-10 w-10 text-gold" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-foreground text-3xl font-black uppercase tracking-tighter">Receipt</h2>
                        <p className="text-gold font-black text-xs uppercase tracking-[0.3em] mt-1">{transaction.status}</p>
                    </div>
                </div>

                <div className="p-8 space-y-8 bg-card relative">
                    <div className="flex justify-between items-center pb-6 border-b-2 border-dashed border-border">
                        <span className="text-muted-foreground text-xs font-black uppercase tracking-widest">Amount Paid</span>
                        <span className="text-3xl font-black text-foreground">Rs. {Math.abs(transaction.amount).toLocaleString()}</span>
                    </div>

                    <div className="space-y-5">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground font-black uppercase text-[10px] tracking-widest">Merchant</span>
                            <span className="font-black text-foreground uppercase">{transaction.merchant}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground font-black uppercase text-[10px] tracking-widest">Reference</span>
                            <span className="font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded">{transaction.reference}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground font-black uppercase text-[10px] tracking-widest">Date & Time</span>
                            <span className="font-black text-foreground">{transaction.date} @ {transaction.time}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground font-black uppercase text-[10px] tracking-widest">Type</span>
                            <span className="font-black text-gold uppercase">{transaction.amount > 0 ? 'Credit' : 'Debit'}</span>
                        </div>
                    </div>

                    <div className="pt-6 flex flex-col gap-3">
                        <Button className="w-full font-black uppercase h-14 rounded-2xl shadow-xl transition-all hover:scale-[1.02] bg-gold text-black hover:bg-gold/90">
                            <Download className="mr-2 h-5 w-5" /> Download PDF Receipt
                        </Button>
                        <Button variant="outline" className="w-full font-black uppercase h-14 rounded-2xl border-2 transition-all hover:bg-muted border-gold/20 text-gold">
                            Share Detailed Report
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-2 opacity-30 pt-4">
                        <ShieldCheck className="h-4 w-4 text-gold" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground">Verified Secure Transaction</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

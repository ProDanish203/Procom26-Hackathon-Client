'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    ChevronRight,
    ArrowUpRight,
    ArrowDownLeft,
    Calendar
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

interface TransactionsTableProps {
    transactions: Transaction[];
    onTransactionClick: (transaction: Transaction) => void;
}

export function TransactionsTable({
    transactions,
    onTransactionClick,
}: TransactionsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-muted uppercase text-[10px] font-black tracking-widest text-muted-foreground border-b border-gold/10">
                    <tr>
                        <th className="px-4 md:px-8 py-5">Transaction Detail</th>
                        <th className="px-4 md:px-8 py-5 hidden sm:table-cell">Category</th>
                        <th className="px-4 md:px-8 py-5 hidden md:table-cell">Date & Timeline</th>
                        <th className="px-4 md:px-8 py-5 text-right">Settlement</th>
                        <th className="px-4 md:px-8 py-5 text-center hidden lg:table-cell">Receipt</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {transactions.map(tx => (
                        <tr
                            key={tx.id}
                            className="hover:bg-muted/20 transition-all cursor-pointer group"
                            onClick={() => onTransactionClick(tx)}
                        >
                            <td className="px-4 md:px-8 py-6">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className={cn(
                                        "p-2 md:p-3 rounded-xl border-2 shadow-sm transition-transform group-hover:scale-110",
                                        tx.amount > 0
                                            ? "bg-green-50 text-green-600 border-green-100"
                                            : "bg-red-50 text-red-600 border-red-100"
                                    )}>
                                        {tx.amount > 0 ? <ArrowDownLeft className="h-4 w-4 md:h-5 md:w-5" /> : <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />}
                                    </div>
                                    <div>
                                        <p className="font-black text-foreground group-hover:text-gold transition-colors text-sm md:text-lg uppercase tracking-tight">{tx.merchant}</p>
                                        <p className="text-[9px] md:text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">{tx.reference}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 md:px-8 py-6 hidden sm:table-cell">
                                <Badge variant="outline" className="font-black border-2 px-2 md:px-3 py-1 rounded-lg text-[9px] md:text-[10px] uppercase tracking-widest border-gold/20 text-gold bg-gold/5">
                                    {tx.category}
                                </Badge>
                            </td>
                            <td className="px-4 md:px-8 py-6 hidden md:table-cell">
                                <div className="text-xs font-bold text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gold" /> {tx.date}
                                    </div>
                                    <div className="text-muted-foreground/60 mt-1 pl-6">{tx.time}</div>
                                </div>
                            </td>
                            <td className="px-4 md:px-8 py-6 text-right">
                                <p className={cn(
                                    "font-black text-base md:text-xl tracking-tighter",
                                    tx.amount > 0 ? "text-green-600" : "text-foreground"
                                )}>
                                    {tx.amount > 0 ? '+' : '-'} Rs. {Math.abs(tx.amount).toLocaleString()}
                                </p>
                            </td>
                            <td className="px-4 md:px-8 py-6 text-center hidden lg:table-cell">
                                <Button variant="ghost" size="icon" className="text-gold hover:bg-gold/10 rounded-full h-10 w-10">
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

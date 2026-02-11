'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Utensils, Zap, Car, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { getAllAccounts } from '@/API/account.api';
import { getAccountTransactions } from '@/API/transaction.api';
import Link from 'next/link';

const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
        UTILITIES: Zap,
        DINING: Utensils,
        SHOPPING: ShoppingCart,
        TRANSPORTATION: Car,
        GROCERIES: ShoppingCart,
        ENTERTAINMENT: Utensils,
        HEALTHCARE: Zap,
        SALARY: TrendingUp,
        TRANSFER: ArrowUpRight,
        OTHER: ArrowDownRight,
    };
    return icons[category] || ArrowDownRight;
};

export function RecentTransactions() {
    const { data: accountsResponse } = useQuery({
        queryKey: ['accounts'],
        queryFn: () => getAllAccounts(),
    });

    const accounts = accountsResponse?.success ? accountsResponse.response : [];
    const firstAccountId = accounts.length > 0 ? accounts[0].id : null;

    const { data: transactionsResponse, isLoading } = useQuery({
        queryKey: ['dashboard-transactions', firstAccountId],
        queryFn: () => getAccountTransactions(firstAccountId!, { limit: 5 }),
        enabled: !!firstAccountId,
    });

    const transactions = transactionsResponse?.success ? transactionsResponse.response.transactions : [];

    return (
        <Card className="bg-card border-2 border-gold/20">
            <CardHeader className="border-b border-gold/10">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gold">
                    Recent Transactions
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-gold" />
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-sm text-muted-foreground">No transactions yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {transactions.map((tx: any) => {
                            const Icon = getCategoryIcon(tx.category || 'OTHER');
                            const isNegative = tx.amount < 0;
                            const formattedAmount = `${isNegative ? '-' : '+'}Rs. ${Math.abs(tx.amount).toLocaleString()}`;
                            const formattedDate = new Date(tx.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            });

                            return (
                                <div key={tx.id} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-gold/10">
                                            <Icon className="h-5 w-5 text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">
                                                {tx.description || tx.transactionType || 'Transaction'}
                                            </p>
                                            <p className="text-[11px] text-muted-foreground font-medium">{formattedDate}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-bold ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
                                            {formattedAmount}
                                        </p>
                                        <Badge variant="outline" className="text-[10px] font-bold border-gold/20 text-gold bg-gold/5">
                                            {tx.category || 'OTHER'}
                                        </Badge>
                                    </div>
                                </div>
                            );
                        })}
                        <Link href="/transactions">
                            <Button variant="ghost" className="w-full mt-2 font-bold text-xs text-gold hover:bg-gold/5">
                                View Full History
                            </Button>
                        </Link>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

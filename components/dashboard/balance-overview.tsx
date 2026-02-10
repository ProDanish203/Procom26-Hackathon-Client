'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Wallet, Landmark, Loader2 } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '@/API/account.api';
import { AccountSchema } from '@/schema/account.schema';

export function BalanceOverview() {
    const { data: dashboardResponse, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardData,
    });

    const accounts = dashboardResponse?.success ? dashboardResponse.response.accounts : [];

    const getAccountIcon = (type: string) => {
        switch (type) {
            case 'CURRENT':
                return Wallet;
            case 'SAVINGS':
                return Landmark;
            default:
                return CreditCard;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
        );
    }

    if (accounts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No accounts found.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account: AccountSchema) => {
                const Icon = getAccountIcon(account.accountType);
                const balance = parseFloat(typeof account.balance === 'string' ? account.balance : account.balance.toString());
                const creditLimit = account.creditLimit ? parseFloat(typeof account.creditLimit === 'string' ? account.creditLimit : account.creditLimit.toString()) : null;

                return (
                    <Card key={account.id} className="bg-card border-2 hover:shadow-lg transition-all duration-300 border-gold/20">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                                {account.nickname || `${account.accountType} Account`}
                            </CardTitle>
                            <div className="p-2 rounded-lg bg-gold/10 border border-gold/30">
                                <Icon className="h-5 w-5 text-gold" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl md:text-3xl font-bold text-foreground">
                                Rs. {balance.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            {creditLimit && creditLimit > 0 && (
                                <p className="text-xs text-muted-foreground mt-1 font-medium italic">
                                    Credit Limit: Rs. {creditLimit.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            )}
                            <div className="mt-4">
                                <Badge variant="outline" className={`font-bold border px-3 py-1 ${
                                    account.accountStatus === 'ACTIVE' 
                                        ? 'border-green-500 text-green-500 bg-green-500/5' 
                                        : 'border-gray-500 text-gray-500 bg-gray-500/5'
                                }`}>
                                    {account.accountStatus === 'ACTIVE' ? 'Active' : account.accountStatus}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

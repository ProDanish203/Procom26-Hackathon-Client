'use client';

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Wallet, CreditCard, Loader2 } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '@/API/account.api';

export function QuickStats() {
    const { data: dashboardResponse, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardData,
    });

    const summary = dashboardResponse?.success ? dashboardResponse.response.summary : null;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gold" />
            </div>
        );
    }

    if (!summary) {
        return null;
    }

    const stats = [
        { 
            label: "Total Balance", 
            value: `Rs. ${summary.totalBalance.toLocaleString('en-PK')}`, 
            change: `${summary.activeAccounts} Active`, 
            trend: "up", 
            icon: Wallet 
        },
        { 
            label: "Total Accounts", 
            value: summary.totalAccounts.toString(), 
            change: `${summary.activeAccounts} Active`, 
            trend: "neutral", 
            icon: TrendingUp 
        },
        { 
            label: "Credit Limit", 
            value: `Rs. ${summary.totalCreditLimit.toLocaleString('en-PK')}`, 
            change: "Available", 
            trend: "neutral", 
            icon: CreditCard 
        },
    ];

    return (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
                <Card key={stat.label} className="bg-card border border-gold/10">
                    <CardContent className="p-3 flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gold/5 border border-gold/20">
                            <stat.icon className="h-4 w-4 text-gold" />
                        </div>
                        <div>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase">{stat.label}</p>
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                                <span className={`text-[9px] font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-muted-foreground'}`}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Wallet, Landmark } from "lucide-react";

const balances = [
    {
        title: "Current Account",
        amount: "Rs. 125,430.00",
        icon: Wallet,
    },
    {
        title: "Savings Account",
        amount: "Rs. 850,000.00",
        icon: Landmark,
    },
    {
        title: "Credit Card",
        amount: "Rs. 45,200.00",
        icon: CreditCard,
        limit: "Rs. 200,000.00",
    },
];

export function BalanceOverview() {
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {balances.map((balance) => (
                <Card key={balance.title} className="bg-white border-2 hover:shadow-lg transition-all duration-300 border-gold/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                            {balance.title}
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-gold/10 border border-gold/30">
                            <balance.icon className="h-5 w-5 text-gold" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl md:text-3xl font-bold text-black">{balance.amount}</div>
                        {balance.limit && (
                            <p className="text-xs text-gray-500 mt-1 font-medium italic">
                                Credit Limit: {balance.limit}
                            </p>
                        )}
                        <div className="mt-4">
                            <Badge variant="outline" className="font-bold border px-3 py-1 border-gold text-gold bg-gold/5">
                                Active
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Utensils, Zap, Car } from "lucide-react";

const transactions = [
    {
        id: 1,
        merchant: "K-Electric",
        category: "Utilities",
        amount: "-Rs. 5,200.00",
        date: "Today, 10:45 AM",
        icon: Zap,
    },
    {
        id: 2,
        merchant: "Foodpanda",
        category: "Dining",
        amount: "-Rs. 1,450.00",
        date: "Yesterday, 8:30 PM",
        icon: Utensils,
    },
    {
        id: 3,
        merchant: "Daraz Online",
        category: "Shopping",
        amount: "-Rs. 2,800.00",
        date: "10 Feb, 2:15 PM",
        icon: ShoppingCart,
    },
    {
        id: 4,
        merchant: "Careem",
        category: "Transport",
        amount: "-Rs. 650.00",
        date: "09 Feb, 11:00 AM",
        icon: Car,
    },
];

export function RecentTransactions() {
    return (
        <Card className="bg-card border-2 border-gold/20">
            <CardHeader className="border-b border-gold/10">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gold">
                    Recent Transactions
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="space-y-4">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-gold/10">
                                    <tx.icon className="h-5 w-5 text-gold" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">{tx.merchant}</p>
                                    <p className="text-[11px] text-muted-foreground font-medium">{tx.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-red-600">{tx.amount}</p>
                                <Badge variant="outline" className="text-[10px] font-bold border-gold/20 text-gold bg-gold/5">
                                    {tx.category}
                                </Badge>
                            </div>
                        </div>
                    ))}
                    <Button variant="ghost" className="w-full mt-2 font-bold text-xs text-gold hover:bg-gold/5">
                        View Full History
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

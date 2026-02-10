'use client';

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Target } from "lucide-react";

const stats = [
    { label: "Monthly Income", value: "Rs. 250,000", change: "+12.5%", trend: "up", icon: TrendingUp },
    { label: "Daily Spending", value: "Rs. 4,200", change: "-5.2%", trend: "down", icon: TrendingDown },
    { label: "Savings Goal", value: "72%", change: "On Track", trend: "neutral", icon: Target },
];

export function QuickStats() {
    return (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
                <Card key={stat.label} className="bg-white border border-gold/10">
                    <CardContent className="p-3 flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gold/5 border border-gold/20">
                            <stat.icon className="h-4 w-4 text-gold" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase">{stat.label}</p>
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-bold text-black">{stat.value}</p>
                                <span className={`text-[9px] font-bold ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
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

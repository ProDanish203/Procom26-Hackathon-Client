'use client';

import { History } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PaymentActivity {
    id: number;
    type: string;
    amount: string;
    date: string;
}

interface RecentPaymentActivityProps {
    activities: PaymentActivity[];
}

export function RecentPaymentActivity({ activities }: RecentPaymentActivityProps) {
    return (
        <Card className="border-2 rounded-2xl shadow-sm bg-white border-gold/10">
            <CardHeader className="pb-4 border-b border-gold/5">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-gray-500">
                    <History className="h-4 w-4 text-gold" />
                    Recent Activity
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
                {activities.map(activity => (
                    <div key={activity.id} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-gold" />
                            <div>
                                <p className="font-black text-black uppercase text-[10px]">{activity.type}</p>
                                <p className="text-[9px] text-gray-400 font-bold">{activity.date}</p>
                            </div>
                        </div>
                        <span className="font-black text-black tracking-tight">Rs. {activity.amount}</span>
                    </div>
                ))}
                <div className="pt-2">
                    <Button variant="outline" className="w-full text-[10px] font-black uppercase text-gold border-2 rounded-xl h-10 hover:bg-gold hover:text-white transition-all border-gold/20">Full History</Button>
                </div>
            </CardContent>
        </Card>
    );
}

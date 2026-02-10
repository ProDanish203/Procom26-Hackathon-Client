'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock } from "lucide-react";

const bills = [
    { id: 1, merchant: "K-Electric", amount: "Rs. 8,400", dueDate: "Due in 3 days" },
    { id: 2, merchant: "PTCL Broadband", amount: "Rs. 3,500", dueDate: "Due in 7 days" },
];

export function UpcomingBills() {
    return (
        <Card className="bg-card border-2 border-gold/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gold/10">
                <CardTitle className="text-lg font-bold text-gold">Upcoming Bills</CardTitle>
                <CalendarClock className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-4">
                <div className="space-y-3">
                    {bills.map((bill) => (
                        <div key={bill.id} className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border hover:border-gold/30 transition-colors">
                            <div>
                                <p className="text-sm font-bold text-foreground">{bill.merchant}</p>
                                <p className="text-[11px] text-red-500 font-bold">{bill.dueDate}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-black text-foreground">{bill.amount}</p>
                                <Badge variant="outline" className="text-[9px] font-bold mt-1 cursor-pointer hover:bg-gold hover:text-black transition-all border-gold text-gold bg-gold/5">
                                    Pay Now
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

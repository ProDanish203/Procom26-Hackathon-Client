'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const emis = [
    {
        id: 1,
        merchant: "iPhone 15 Pro - EMI",
        total: "Rs. 150,000",
        paid: "Rs. 50,000",
        remaining: "10 installments left",
        progress: 33,
    },
];

export function EMISummary() {
    return (
        <Card className="bg-white border-2 border-gold/20">
            <CardHeader className="border-b border-gold/10">
                <CardTitle className="text-lg font-bold text-gold">Active Credit EMIs</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="space-y-6">
                    {emis.map((emi) => (
                        <div key={emi.id} className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="font-bold text-black">{emi.merchant}</span>
                                <span className="text-gray-500 font-bold">{emi.total}</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000 bg-gold"
                                    style={{ width: `${emi.progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                <span className="text-gray-400">{emi.paid} paid</span>
                                <span className="text-gold">{emi.remaining}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

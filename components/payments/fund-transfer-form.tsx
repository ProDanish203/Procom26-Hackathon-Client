'use client';

import { Send, ArrowRight, ShieldCheck, DollarSign, Landmark } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function FundTransferForm() {
    return (
        <Card className="border-2 shadow-xl rounded-[32px] overflow-hidden bg-white border-gold/20">
            <div className="p-8 border-b-2 border-gold/10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gold/10">
                        <Send className="h-5 w-5 text-gold" />
                    </div>
                    <CardTitle className="text-2xl font-black uppercase tracking-tighter text-black">Fund Transfer</CardTitle>
                </div>
                <CardDescription className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Send money instantly across any bank in Pakistan.</CardDescription>
            </div>
            <CardContent className="p-8 space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-3">
                        <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Recipient Bank</Label>
                        <Select>
                            <SelectTrigger className="h-14 border-2 rounded-2xl bg-gray-50/50 hover:bg-white transition-all border-gold/10 focus-visible:ring-gold">
                                <SelectValue placeholder="Select Destination Bank" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-2 border-gold/20">
                                <SelectItem value="jsbl">JS Bank Limited</SelectItem>
                                <SelectItem value="hbl">HBL Pakistan</SelectItem>
                                <SelectItem value="meezan">Meezan Islamic Bank</SelectItem>
                                <SelectItem value="sc">Standard Chartered</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-3">
                        <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Account / IBAN</Label>
                        <div className="relative">
                            <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input className="h-14 pl-12 border-2 rounded-2xl focus-visible:ring-gold font-mono border-gold/10" placeholder="PK00 XXXX XXXX XXXX XXXX" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Transfer Amount</Label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <DollarSign className="h-6 w-6 text-gold" />
                            <span className="text-xl font-black text-black">Rs.</span>
                        </div>
                        <Input className="h-20 pl-24 text-4xl font-black border-2 rounded-2xl focus-visible:ring-gold bg-gray-50/30 group-focus-within:bg-white transition-all border-gold/10" placeholder="0.00" />
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Purpose of Payment</Label>
                    <Select>
                        <SelectTrigger className="h-14 border-2 rounded-2xl bg-gray-50/50 border-gold/10 focus-visible:ring-gold">
                            <SelectValue placeholder="Select Transfer Purpose" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-2 border-gold/20">
                            <SelectItem value="family">Family Support / Personal</SelectItem>
                            <SelectItem value="education">Educational Fees</SelectItem>
                            <SelectItem value="investment">Wealth Management / Investment</SelectItem>
                            <SelectItem value="others">Utility / Other Payments</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="pt-4">
                    <Button className="w-full h-16 text-xl font-black uppercase tracking-tighter text-white shadow-xl hover:scale-[1.01] transition-all rounded-2xl bg-gold">
                        Confirm & Process Transfer <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                </div>

                <div className="flex items-center justify-center gap-3 pt-4 border-t border-dashed border-gold/20">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-green-700">RAAST Instant Payment Secured</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

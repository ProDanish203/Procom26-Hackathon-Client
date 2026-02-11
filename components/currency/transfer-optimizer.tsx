'use client';

import {
    Calculator,
    ArrowDownUp,
    ArrowRight,
    Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AVAILABLE_CURRENCIES = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs.' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
];

interface TransferOptimizerProps {
    amount: string;
    onAmountChange: (val: string) => void;
    fromCurrency: string;
    toCurrency: string;
    onFromCurrencyChange: (val: string) => void;
    onToCurrencyChange: (val: string) => void;
    onSwapCurrencies: () => void;
    convertedAmount: string;
    currentRate: number;
    loading?: boolean;
    onAnalyze: () => void;
}

export function TransferOptimizer({
    amount,
    onAmountChange,
    fromCurrency,
    toCurrency,
    onFromCurrencyChange,
    onToCurrencyChange,
    onSwapCurrencies,
    convertedAmount,
    currentRate,
    loading = false,
    onAnalyze,
}: TransferOptimizerProps) {
    return (
        <Card className="border-2 shadow-xl rounded-[32px] overflow-hidden bg-card border-gold/20">
            <div className="p-6 md:p-8 border-b-2 border-gold/10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gold/10">
                        <Calculator className="h-5 w-5 text-gold" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground">Transfer Optimizer</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Calculate real-time conversion rates with zero hidden fees.</CardDescription>
            </div>
            <CardContent className="p-6 md:p-8 space-y-8 md:space-y-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full space-y-3">
                        <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">You Send</Label>
                        <div className="space-y-2">
                            <div className="relative group">
                                <Input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => onAmountChange(e.target.value)}
                                    placeholder="0.00"
                                    className="h-16 pl-6 pr-6 text-2xl font-black border-2 rounded-2xl focus-visible:ring-gold bg-muted transition-all shadow-inner border-gold/10"
                                />
                            </div>
                            <Select value={fromCurrency} onValueChange={onFromCurrencyChange}>
                                <SelectTrigger className="h-12 border-2 rounded-xl font-black border-gold/10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {AVAILABLE_CURRENCIES.map((curr) => (
                                        <SelectItem key={curr.code} value={curr.code} className="font-black">
                                            {curr.code} - {curr.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div 
                        onClick={onSwapCurrencies}
                        className="p-3 rounded-full bg-gold/10 text-gold shadow-lg hover:rotate-180 transition-all duration-500 cursor-pointer shrink-0"
                    >
                        <ArrowDownUp className="h-6 w-6" />
                    </div>

                    <div className="w-full space-y-3">
                        <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Recipient Receives</Label>
                        <div className="space-y-2">
                            <div className="relative group">
                                <Input
                                    value={loading ? 'Calculating...' : convertedAmount}
                                    readOnly
                                    className="h-16 pl-6 pr-6 text-2xl font-black border-2 rounded-2xl focus-visible:ring-gold bg-muted/50 border-gold/10"
                                />
                                {loading && (
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2">
                                        <Loader2 className="h-5 w-5 animate-spin text-gold" />
                                    </div>
                                )}
                            </div>
                            <Select value={toCurrency} onValueChange={onToCurrencyChange}>
                                <SelectTrigger className="h-12 border-2 rounded-xl font-black border-gold/10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {AVAILABLE_CURRENCIES.map((curr) => (
                                        <SelectItem key={curr.code} value={curr.code} className="font-black">
                                            {curr.code} - {curr.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="bg-muted p-6 rounded-2xl border-2 border-dashed border-gold/10 space-y-4">
                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                        <span className="text-muted-foreground">Mid-Market Rate</span>
                        <span className="text-foreground">
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                `1 ${fromCurrency} = ${currentRate.toFixed(4)} ${toCurrency}`
                            )}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                        <span className="text-muted-foreground">Transaction Fee</span>
                        <span className="text-green-600">0.00 (Standard)</span>
                    </div>
                    <hr className="border-gold/10" />
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-foreground uppercase">Estimated Amount</span>
                        <span className="font-black text-gold">
                            {loading ? '...' : convertedAmount}
                        </span>
                    </div>
                </div>

                <Button
                    onClick={onAnalyze}
                    disabled={loading || !amount || Number(amount) <= 0}
                    className="w-full h-16 text-lg md:text-xl font-black uppercase tracking-tighter text-black shadow-xl rounded-2xl transition-all hover:scale-[1.01] bg-gold hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            Analyze <ArrowRight className="ml-3 h-5 md:h-6 w-5 md:w-6" />
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}

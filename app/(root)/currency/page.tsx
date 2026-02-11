'use client';

import { useState, useEffect } from 'react';
import {
    Globe,
    Bell,
    Zap,
    Sparkles,
    Loader2
} from 'lucide-react';
import { FinancialPageHeader } from '@/components/shared/financial/financial-page-header';
import { AIInsightsCard } from '@/components/shared/financial/ai-insights-card';
import { LiveRatesGrid } from '@/components/currency/live-rates-grid';
import { TransferOptimizer } from '@/components/currency/transfer-optimizer';
import { HistoricalTrend } from '@/components/currency/historical-trend';
import { getCurrentRate, analyzeTransfer, CurrencyAnalysisResponse } from '@/API/currency.api';
import { toast } from 'sonner';

const POPULAR_CURRENCIES = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'AED', name: 'UAE Dirham' },
    { code: 'SAR', name: 'Saudi Riyal' },
];

export default function CurrencyPage() {
    const [amount, setAmount] = useState('1000');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('PKR');
    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [currencies, setCurrencies] = useState<any[]>([]);
    const [analysis, setAnalysis] = useState<CurrencyAnalysisResponse | null>(null);
    const [historicalData, setHistoricalData] = useState<number[]>([]);

    // Fetch live rates for popular currencies
    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true);
            const ratesData = await Promise.all(
                POPULAR_CURRENCIES.map(async (curr) => {
                    const result = await getCurrentRate(curr.code, 'PKR');
                    if (result.success && typeof result.response !== 'string') {
                        return {
                            code: curr.code,
                            name: curr.name,
                            rate: result.response.rate,
                            change: '+0.00%',
                            trend: 'neutral' as const,
                        };
                    }
                    return null;
                })
            );
            setCurrencies(ratesData.filter(Boolean));
            setLoading(false);
        };
        fetchRates();
    }, []);

    // Handle swap currencies
    const handleSwapCurrencies = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
        // Clear analysis when currencies change
        setAnalysis(null);
        setHistoricalData([]);
    };

    // Handle analyze button click
    const handleAnalyze = async () => {
        if (!amount || Number(amount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }
        
        setAnalyzing(true);
        const result = await analyzeTransfer({
            amount: Number(amount),
            fromCurrency,
            toCurrency,
        });

        if (result.success && typeof result.response !== 'string') {
            setAnalysis(result.response);
            
            // Convert historical rates to actual rate values for accurate display
            const rates = result.response.historicalData.rates;
            const rateValues = Object.values(rates).map((r: any) => r[toCurrency]);
            setHistoricalData(rateValues);
            toast.success('Analysis completed successfully!');
        } else {
            toast.error(typeof result.response === 'string' ? result.response : 'Failed to analyze transfer');
        }
        setAnalyzing(false);
    };

    const aiInsights = analysis ? [
        {
            title: analysis.recommendation.recommendation === 'transfer_now' ? 'Transfer Now' : 'Wait for Better Rate',
            text: analysis.recommendation.reasoning,
            icon: analysis.recommendation.recommendation === 'transfer_now' ? Zap : Sparkles,
        },
        {
            title: 'Suggested Timeframe',
            text: analysis.recommendation.suggestedTimeframe,
            icon: Sparkles,
        },
        {
            title: 'Potential Savings',
            text: `You could save ${toCurrency} ${analysis.recommendation.potentialSavings.toLocaleString()} by following our recommendation. Risk level: ${analysis.recommendation.riskLevel}`,
            icon: Zap,
        }
    ] : [];

    const convertedAmount = analysis ? analysis.estimatedAmount.toLocaleString() : '0';
    const currentRate = analysis?.currentRate || 0;

    return (
        <main className="flex-1 space-y-10 p-2 md:p-6 animate-in fade-in duration-700 bg-background">
            <FinancialPageHeader
                title="Currency Analyzer"
                description="Live foreign exchange insights and optimized transfer intelligence."
                icon={Globe}
                action={{
                    label: "Set Rate Alert",
                    icon: Bell,
                    onClick: () => toast.success('Coming Soon', { description: 'Rate alerts will be available soon!' })
                }}
            />

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-gold" />
                </div>
            ) : (
                <LiveRatesGrid currencies={currencies} />
            )}

            <div className="grid gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-10">
                    <TransferOptimizer
                        amount={amount}
                        onAmountChange={setAmount}
                        fromCurrency={fromCurrency}
                        toCurrency={toCurrency}
                        onFromCurrencyChange={(val) => {
                            setFromCurrency(val);
                            setAnalysis(null);
                            setHistoricalData([]);
                        }}
                        onToCurrencyChange={(val) => {
                            setToCurrency(val);
                            setAnalysis(null);
                            setHistoricalData([]);
                        }}
                        onSwapCurrencies={handleSwapCurrencies}
                        convertedAmount={convertedAmount}
                        currentRate={currentRate}
                        loading={analyzing}
                        onAnalyze={handleAnalyze}
                    />

                    {historicalData.length > 0 && (
                        <HistoricalTrend
                            title={`${fromCurrency} to ${toCurrency} Trend (30 Days)`}
                            data={historicalData}
                            stats={analysis?.historicalData}
                        />
                    )}
                </div>

                <div className="space-y-10">
                    {aiInsights.length > 0 && (
                        <AIInsightsCard
                            insights={aiInsights}
                            title="AI Forecast"
                        />
                    )}
                </div>
            </div>
        </main>
    );
}

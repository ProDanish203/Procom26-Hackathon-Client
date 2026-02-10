'use client';

import { useState } from 'react';
import {
    Globe,
    Bell,
    Zap,
    TrendingUp,
    TrendingDown,
    Search,
    Sparkles
} from 'lucide-react';
import { FinancialPageHeader } from '@/components/shared/financial/financial-page-header';
import { AIInsightsCard } from '@/components/shared/financial/ai-insights-card';
import { LiveRatesGrid } from '@/components/currency/live-rates-grid';
import { TransferOptimizer } from '@/components/currency/transfer-optimizer';
import { HistoricalTrend } from '@/components/currency/historical-trend';
import { MarketComparison } from '@/components/currency/market-comparison';

const currencies = [
    { code: 'USD', name: 'US Dollar', rate: 278.45, change: '+0.12%', trend: 'up' as const },
    { code: 'EUR', name: 'Euro', rate: 302.20, change: '-0.05%', trend: 'down' as const },
    { code: 'GBP', name: 'British Pound', rate: 354.10, change: '+0.45%', trend: 'up' as const },
    { code: 'AED', name: 'UAE Dirham', rate: 75.82, change: '0.00%', trend: 'neutral' as const },
    { code: 'SAR', name: 'Saudi Riyal', rate: 74.25, change: '-0.02%', trend: 'down' as const },
];

const historicalData = [30, 35, 32, 40, 45, 42, 38, 50, 55, 52, 60, 65, 62, 70, 75, 72, 80, 85, 82, 90, 88, 85, 82, 80, 78, 75, 72, 70, 68, 65];

const comparisonItems = [
    { name: "Our App", rate: "278.45", fee: "0.0%", type: "best" },
    { name: "JS Bank", rate: "284.10", fee: "1.5%", type: "bank" },
    { name: "Local Exchange", rate: "286.50", fee: "2.5%", type: "high" },
    { name: "Intl. Wire", rate: "292.00", fee: "4.0%", type: "high" }
];

const aiInsights = [
    { title: "Buy Efficiency", text: "Rate is currently 2.4% below 30-day average. Excellent time for bulk USD purchases.", icon: Zap },
    { title: "Weekly Outlook", text: "Detected upward pressure. Rates likely to hit 282.00 by Friday due to market demand.", icon: Sparkles }
];

export default function CurrencyPage() {
    const [amount, setAmount] = useState('1000');
    const fromCurrency = 'USD';
    const toCurrency = 'PKR';

    return (
        <main className="flex-1 space-y-10 p-2 md:p-6 animate-in fade-in duration-700 bg-gray-50/30">
            <FinancialPageHeader
                title="Currency Analyzer"
                description="Live foreign exchange insights and optimized transfer intelligence."
                icon={Globe}
                action={{
                    label: "Set Rate Alert",
                    icon: Bell,
                    onClick: () => console.log("Set alert")
                }}
            />

            <LiveRatesGrid currencies={currencies} />

            <div className="grid gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-10">
                    <TransferOptimizer
                        amount={amount}
                        onAmountChange={setAmount}
                        fromCurrency={fromCurrency}
                        toCurrency={toCurrency}
                        convertedAmount={(Number(amount) * 278.45).toLocaleString()}
                        onTransfer={() => console.log("Transfer money")}
                    />

                    <HistoricalTrend
                        title="USD to PKR Trend (30 Days)"
                        data={historicalData}
                        baseRate={275}
                    />
                </div>

                <div className="space-y-10">
                    <AIInsightsCard
                        insights={aiInsights}
                        title="AI Forecast"
                    />

                    <MarketComparison
                        items={comparisonItems}
                        onRefresh={() => console.log("Refresh rates")}
                    />
                </div>
            </div>
        </main>
    );
}

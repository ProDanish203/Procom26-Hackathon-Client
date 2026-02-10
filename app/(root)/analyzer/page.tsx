'use client';

import { useState } from 'react';
import {
    BrainCircuit,
    Download,
    TrendingUp,
    TrendingDown,
    Target,
    Zap,
    Search,
    ChevronRight,
    DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FinancialPageHeader } from '@/components/shared/financial/financial-page-header';
import { FinancialStatCard } from '@/components/shared/financial/stat-card';
import { AIInsightsCard } from '@/components/shared/financial/ai-insights-card';
import { UploadSection } from '@/components/analyzer/upload-section';
import { ExpenditureTrend } from '@/components/analyzer/expenditure-trend';
import { CategoryAllocation } from '@/components/analyzer/category-allocation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Mock Data for the Analyzer
const analyzerStats = [
    { label: "Total Income", value: "Rs. 342,000", icon: TrendingUp, color: "green" },
    { label: "Total Expenses", value: "Rs. 128,450", icon: TrendingDown, color: "red" },
    { label: "Savings Rate", value: "62.4%", icon: Target, color: "gold" },
    { label: "Net Cash Flow", value: "Rs. 213,550", icon: DollarSign, color: "black" }
];

const trendData = [
    { month: 'Sep', income: 50, expenses: 40 },
    { month: 'Oct', income: 75, expenses: 65 },
    { month: 'Nov', income: 55, expenses: 45 },
    { month: 'Dec', income: 90, expenses: 80 },
    { month: 'Jan', income: 65, expenses: 55 },
    { month: 'Feb', income: 100, expenses: 90 }
];

const categoryData = [
    { cat: "Housing & Utilities", val: 35, color: "hsl(var(--gold))" },
    { cat: "Food & Dining", val: 20, color: "hsl(var(--foreground))" },
    { cat: "Transport", val: 15, color: "hsl(var(--muted-foreground))" },
    { cat: "Entertainment", val: 12, color: "hsl(var(--muted))" },
    { cat: "Others", val: 18, color: "hsl(var(--border))" }
];

const aiInsights = [
    { title: "Subscription Bloat", text: "You have 3 overlapping streaming services costing Rs. 4,500/month. Cancelling 2 could save you Rs. 32,000 annually.", icon: Zap },
    { title: "Savings Opportunity", text: "Your weekend dining spend is 45% higher than average. Setting a weekly limit of Rs. 10,000 could increase your savings rate to 70%.", icon: TrendingUp },
    { title: "Unusual Pattern", text: "Detected a Recurring bill from 'CLOUD-HOST' which increased by 20% this month. Recommend reviewing invoice.", icon: Search }
];

const topExpenses = [
    { name: "Rent & Mortgage", val: "Rs. 85,000", cat: "Housing", trend: "+5%" },
    { name: "K-Electric", val: "Rs. 24,300", cat: "Utilities", trend: "-12%" },
    { name: "Supermarket Inc", val: "Rs. 18,200", cat: "Groceries", trend: "+2%" },
    { name: "Fuel Station", val: "Rs. 12,400", cat: "Transport", trend: "0%" },
    { name: "Amazon Cloud", val: "Rs. 8,550", cat: "Business", trend: "+20%" }
];

export default function AnalyzerPage() {
    const [isUploaded, setIsUploaded] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            setIsUploaded(true);
        }, 2000);
    };

    return (
        <main className="flex-1 space-y-10 p-2 md:p-6 animate-in fade-in duration-700 bg-background">
            <FinancialPageHeader
                title="Statement Analyzer"
                description="AI-powered insights into your financial behavior."
                icon={BrainCircuit}
                action={isUploaded ? {
                    label: "Export Full Report",
                    icon: Download,
                    onClick: () => console.log("Export report")
                } : undefined}
            />

            {!isUploaded ? (
                <UploadSection onUpload={handleUpload} isUploading={isUploading} />
            ) : (
                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {analyzerStats.map((stat, i) => (
                            <FinancialStatCard key={i} {...stat} />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <ExpenditureTrend data={trendData} />
                        <CategoryAllocation data={categoryData} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AIInsightsCard insights={aiInsights} />

                        <Card className="border-2 bg-card rounded-[32px] overflow-hidden shadow-sm border-gold/10">
                            <CardHeader className="border-b border-gold/5">
                                <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                    <Target className="h-4 w-4 text-gold" /> Top Expenditure Entities
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-border/50">
                                    {topExpenses.map((exp, i) => (
                                        <div key={i} className="px-8 py-5 flex items-center justify-between hover:bg-muted/20 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-black text-xs text-gold border border-gold/10">
                                                    {exp.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-black text-foreground uppercase text-sm tracking-tight">{exp.name}</p>
                                                    <p className="text-[10px] text-muted-foreground font-bold uppercase">{exp.cat}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-foreground">{exp.val}</p>
                                                <span className={cn(
                                                    "text-[9px] font-black uppercase",
                                                    exp.trend.startsWith('+') ? "text-red-500" : exp.trend.startsWith('-') ? "text-green-600" : "text-muted-foreground"
                                                )}>{exp.trend} vs Month</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6">
                                    <Button variant="ghost" className="w-full font-black uppercase text-[10px] text-gold hover:bg-gold/5 rounded-xl">
                                        View All Transactions <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </main>
    );
}

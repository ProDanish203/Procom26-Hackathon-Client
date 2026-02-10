'use client';

import { useState } from 'react';
import {
    CalendarDays,
    Plus,
    Zap,
    Search,
    History as HistoryIcon,
    BellRing
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FinancialPageHeader } from '@/components/shared/financial/financial-page-header';
import { ActiveBillsList } from '@/components/bills/active-bills-list';
import { DetectedBillsList } from '@/components/bills/detected-bills-list';
import { UpcomingCalendar } from '@/components/bills/upcoming-calendar';
import { cn } from '@/lib/utils';

// Mock Data for Bills
const activeBills = [
    { name: "Netflix Premium", amount: "Rs. 1,500", freq: "Monthly", nextDue: "Feb 18, 2026", status: "Active" },
    { name: "Rent - House #24", amount: "Rs. 85,000", freq: "Monthly", nextDue: "Feb 15, 2026", status: "Active" },
    { name: "Spotify Individual", amount: "Rs. 300", freq: "Monthly", nextDue: "Feb 15, 2026", status: "Paused" },
    { name: "Gym Membership", amount: "Rs. 5,000", freq: "Monthly", nextDue: "Mar 01, 2026", status: "Active" },
];

const detectedBills = [
    { name: "Amazon AWS", amount: "Rs. 8,240", lastPaid: "Jan 28", frequency: "Probable Monthly" },
    { name: "Shell Fuel", amount: "Rs. 4,500", lastPaid: "Feb 02", frequency: "Weekly Pattern" },
    { name: "Internet Bill", amount: "Rs. 3,500", lastPaid: "Jan 15", frequency: "Monthly Mandate" },
];

const upcomingPayments = [
    { date: "Feb 12", name: "Electricity", amount: "Rs. 24k" },
    { date: "Feb 15", name: "Spotify", amount: "Rs. 300" }
];

export default function BillsPage() {
    const [activeTab, setActiveTab] = useState<'active' | 'detected' | 'history'>('active');

    return (
        <main className="flex-1 space-y-10 p-2 md:p-6 animate-in fade-in duration-700 bg-gray-50/30">
            <FinancialPageHeader
                title="Recurring Bills"
                description="Automated tracking and management for your mandates."
                icon={CalendarDays}
                action={{
                    label: "Add Manual Bill",
                    icon: Plus,
                    onClick: () => console.log("Add bill")
                }}
            />

            <div className="grid gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex p-1.5 bg-gray-100 rounded-2xl border-2 w-fit border-gold/10">
                        {[
                            { id: 'active', label: 'Active Auto-Pay', icon: Zap },
                            { id: 'detected', label: 'Auto-Detected', icon: Search },
                            { id: 'history', label: 'Payment History', icon: HistoryIcon },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={cn(
                                    "px-6 py-3 rounded-xl transition-all font-black uppercase text-[10px] tracking-widest flex items-center gap-2",
                                    activeTab === tab.id
                                        ? "bg-black text-white shadow-lg scale-[1.02]"
                                        : "text-gray-500 hover:text-black hover:bg-white/50"
                                )}
                            >
                                <tab.icon className={cn("h-3.5 w-3.5", activeTab === tab.id ? "text-gold" : "text-gray-400")} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'active' && <ActiveBillsList bills={activeBills} />}
                    {activeTab === 'detected' && <DetectedBillsList bills={detectedBills} />}
                    {activeTab === 'history' && <BillHistoryList />}
                </div>

                <div className="space-y-10">
                    <Card className="border-2 bg-black text-white p-6 rounded-[32px] overflow-hidden shadow-2xl relative border-gold">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <BellRing className="h-20 w-20 text-gold" />
                        </div>
                        <p className="text-[10px] font-black uppercase text-gold tracking-[0.2em] mb-4">AI Bill Alerts</p>
                        <div className="space-y-4 relative z-10">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Price Change Detected</p>
                                <p className="text-sm font-bold leading-tight">Netflix Premium increased from Rs. 1,100 to Rs. 1,500.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <p className="text-[10px] font-black text-gold uppercase tracking-widest mb-1">Upcoming Due</p>
                                <p className="text-sm font-bold leading-tight">Rent Payment (Rs. 85,000) is due in 3 days. Balance OK.</p>
                            </div>
                        </div>
                    </Card>

                    <UpcomingCalendar items={upcomingPayments} highlightDays={[12, 15, 22, 28]} />
                </div>
            </div>
        </main>
    );
}

function BillHistoryList() {
    return (
        <Card className="border-2 bg-white rounded-3xl overflow-hidden border-gold/10">
            <div className="p-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto">
                    <HistoryIcon className="h-8 w-8 text-gray-300" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-black text-black uppercase">Mandate History</h3>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">Full historical logs of your recurring payments and manual settled bills will appear here.</p>
                </div>
                <Button variant="outline" className="h-11 px-8 rounded-xl font-black uppercase text-[10px] border-2 border-gold/20 text-gold">
                    Generate Annual Bill Report
                </Button>
            </div>
        </Card>
    );
}

// Button sub-component (imported from UI but using local styles for override)
const Button = ({ children, variant, className, style, size, ...props }: any) => {
    if (variant === 'outline') {
        return <button className={cn("inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", className)} style={style} {...props}>{children}</button>;
    }
    return <button className={cn("inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", className)} style={style} {...props}>{children}</button>;
};

'use client';

import { useAuthStore } from '@/store/auth.store';
import { BalanceOverview } from "@/components/dashboard/balance-overview";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { UpcomingBills } from "@/components/dashboard/upcoming-bills";
import { EMISummary } from "@/components/dashboard/emi-summary";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { ChatbotWidget } from "@/components/dashboard/chatbot-widget";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function DashboardPage() {
    const { user } = useAuthStore();

    return (
        <main className="flex-1 space-y-8 p-2 md:p-6 animate-in fade-in duration-700 bg-background">
            <DashboardHeader userName={user?.name || 'Valued Client'} />

            <BalanceOverview />

            <div className="grid gap-8 lg:grid-cols-7">
                <div className="lg:col-span-4 space-y-8">
                    <QuickStats />

                    <RecentTransactions />
                </div>

                <div className="lg:col-span-3 space-y-8">
                    <UpcomingBills />
                    <EMISummary />
                </div>
            </div>

            <ChatbotWidget />
        </main>
    );
}

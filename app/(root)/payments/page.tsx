'use client';

import {
    CreditCard,
    Smartphone,
    ArrowUpRight,
    TrendingUp,
    History
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinancialPageHeader } from '@/components/shared/financial/financial-page-header';
import { FinancialStatCard } from '@/components/shared/financial/stat-card';
import { FundTransferForm } from '@/components/payments/fund-transfer-form';
import { BillPaymentForm } from '@/components/payments/bill-payment-form';
import { MobileTopupForm } from '@/components/payments/mobile-topup-form';
import { QuickBeneficiaries } from '@/components/payments/quick-beneficiaries';
import { RecentPaymentActivity } from '@/components/payments/recent-payment-activity';

const beneficiaries = [
    { name: "Ahmed Khan", bank: "JS Bank - 0082...", initial: "AK" },
    { name: "Fatima Ali", bank: "HBL - 1102...", initial: "FA" },
    { name: "Sajid Mehmood", bank: "Meezan - 9928...", initial: "SM" }
];

const activity = [
    { id: 1, type: "Mobile Top-up", amount: "500", date: "Today, 10:45 AM" },
    { id: 2, type: "Electricity Bill", amount: "12,450", date: "Yesterday" },
    { id: 3, type: "Fund Transfer", amount: "25,000", date: "08 Feb 2026" }
];

export default function PaymentsPage() {
    return (
        <main className="flex-1 space-y-10 p-2 md:p-6 animate-in fade-in duration-700 bg-background">
            <FinancialPageHeader
                title="Payments Hub"
                description="Your central command for all domestic and international settlements."
                icon={CreditCard}
                action={{
                    label: "Transaction History",
                    icon: History,
                    onClick: () => console.log("View history")
                }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FinancialStatCard label="Monthly Limit" value="Rs. 500,000" icon={CreditCard} color="gold" />
                <FinancialStatCard label="Utilized" value="Rs. 128,450" icon={TrendingUp} color="red" />
                <FinancialStatCard label="Remaining" value="Rs. 371,550" icon={Smartphone} color="green" />
                <FinancialStatCard label="RAAST Transfers" value="12" icon={ArrowUpRight} color="gold" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    <Tabs defaultValue="transfer" className="w-full">
                        <TabsList className="bg-muted p-1.5 rounded-2xl border-2 mb-8 border-gold/10 w-full overflow-x-auto h-auto flex flex-wrap sm:flex-nowrap">
                            <TabsTrigger value="transfer" className="flex-1 min-w-[120px] font-black uppercase text-[10px] tracking-widest rounded-xl data-[state=active]:bg-gold data-[state=active]:text-black h-12">Transfer Funds</TabsTrigger>
                            <TabsTrigger value="bills" className="flex-1 min-w-[120px] font-black uppercase text-[10px] tracking-widest rounded-xl data-[state=active]:bg-gold data-[state=active]:text-black h-12">Utility Bills</TabsTrigger>
                            <TabsTrigger value="mobile" className="flex-1 min-w-[120px] font-black uppercase text-[10px] tracking-widest rounded-xl data-[state=active]:bg-gold data-[state=active]:text-black h-12">Mobile Top-up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="transfer" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                            <FundTransferForm />
                        </TabsContent>

                        <TabsContent value="bills" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                            <BillPaymentForm />
                        </TabsContent>

                        <TabsContent value="mobile" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                            <MobileTopupForm />
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="space-y-8">
                    <QuickBeneficiaries beneficiaries={beneficiaries} />
                    <RecentPaymentActivity activities={activity} />
                </div>
            </div>
        </main>
    );
}

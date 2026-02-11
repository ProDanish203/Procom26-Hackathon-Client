'use client';

import {
    CreditCard,
    Smartphone,
    ArrowUpRight,
    TrendingUp,
    History,
    Wallet
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinancialPageHeader } from '@/components/shared/financial/financial-page-header';
import { FinancialStatCard } from '@/components/shared/financial/stat-card';
import { FundTransferForm } from '@/components/payments/fund-transfer-form';
import { BillPaymentForm } from '@/components/payments/bill-payment-form';
import { MobileTopupForm } from '@/components/payments/mobile-topup-form';
import { DepositForm } from '@/components/payments/deposit-form';
import { QuickBeneficiaries } from '@/components/payments/quick-beneficiaries';
import { RecentPaymentActivity } from '@/components/payments/recent-payment-activity';
import { useQuery } from '@tanstack/react-query';
import { getPaymentHistory } from '@/API/payment.api';

export default function PaymentsPage() {
    const { data: paymentsResponse } = useQuery({
        queryKey: ['payments', { limit: 10 }],
        queryFn: () => getPaymentHistory({ limit: 10 }),
    });

    const payments = paymentsResponse?.success ? paymentsResponse.response.payments : [];
    const totalPayments = paymentsResponse?.success ? paymentsResponse.response.pagination.totalCount : 0;

    // Calculate stats from real payment data
    const monthlyLimit = 500000;
    const utilized = payments.reduce((sum: number, payment: any) => sum + payment.totalAmount, 0);
    const remaining = monthlyLimit - utilized;

    // Format recent activity from real payments
    const activity = payments.slice(0, 3).map((payment: any) => ({
        id: payment.id,
        type: payment.paymentType.replace(/_/g, ' '),
        amount: payment.totalAmount.toFixed(2),
        date: new Date(payment.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }),
    }));

    return (
        <main className="flex-1 space-y-10 p-2 md:p-6 animate-in fade-in duration-700 bg-background">
            <FinancialPageHeader
                title="Payments Hub"
                description="Your central command for all domestic and international settlements."
                icon={CreditCard}
                action={{
                    label: "Transaction History",
                    icon: History,
                    onClick: () => window.location.href = '/transactions'
                }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FinancialStatCard 
                    label="Monthly Limit" 
                    value={`Rs. ${monthlyLimit.toLocaleString()}`} 
                    icon={CreditCard} 
                    color="gold" 
                />
                <FinancialStatCard 
                    label="Utilized" 
                    value={`Rs. ${utilized.toLocaleString()}`} 
                    icon={TrendingUp} 
                    color="red" 
                />
                <FinancialStatCard 
                    label="Remaining" 
                    value={`Rs. ${remaining.toLocaleString()}`} 
                    icon={Smartphone} 
                    color="green" 
                />
                <FinancialStatCard 
                    label="Payments" 
                    value={totalPayments.toString()} 
                    icon={ArrowUpRight} 
                    color="gold" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    <Tabs defaultValue="transfer" className="w-full">
                        <TabsList className="bg-muted p-1.5 rounded-2xl border-2 mb-8 border-gold/10 w-full overflow-x-auto h-auto flex flex-wrap sm:flex-nowrap">
                            <TabsTrigger value="transfer" className="flex-1 min-w-[100px] font-black uppercase text-[10px] tracking-widest rounded-xl data-[state=active]:bg-gold data-[state=active]:text-black h-12">Transfer</TabsTrigger>
                            <TabsTrigger value="deposit" className="flex-1 min-w-[100px] font-black uppercase text-[10px] tracking-widest rounded-xl data-[state=active]:bg-gold data-[state=active]:text-black h-12">Deposit</TabsTrigger>
                            <TabsTrigger value="bills" className="flex-1 min-w-[100px] font-black uppercase text-[10px] tracking-widest rounded-xl data-[state=active]:bg-gold data-[state=active]:text-black h-12">Bills</TabsTrigger>
                            <TabsTrigger value="mobile" className="flex-1 min-w-[100px] font-black uppercase text-[10px] tracking-widest rounded-xl data-[state=active]:bg-gold data-[state=active]:text-black h-12">Mobile</TabsTrigger>
                        </TabsList>

                        <TabsContent value="transfer" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                            <FundTransferForm />
                        </TabsContent>

                        <TabsContent value="deposit" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                            <DepositForm />
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
                    <QuickBeneficiaries />
                    <RecentPaymentActivity activities={activity} />
                </div>
            </div>
        </main>
    );
}

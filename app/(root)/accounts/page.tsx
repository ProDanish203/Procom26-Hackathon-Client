'use client';

import { useAuthStore } from '@/store/auth.store';
import { AccountCard } from '@/components/accounts/account-card';
import { Plus, ShieldCheck, Wallet } from 'lucide-react';
import { FinancialPageHeader } from '@/components/shared/financial/financial-page-header';

const accountsData = [
    {
        type: "Current Account",
        accountNumber: "**** 4567",
        iban: "PK70 JSBL 0000 0001 2345 6789",
        balance: "Rs. 125,430.00",
        status: "Active" as const,
    },
    {
        type: "Savings Account",
        accountNumber: "**** 8901",
        iban: "PK24 JSBL 0000 0001 9876 5432",
        balance: "Rs. 850,000.00",
        interestRate: "7.5% p.a.",
        status: "Active" as const,
    },
    {
        type: "Visa Gold Card",
        accountNumber: "**** 2233",
        iban: "N/A",
        balance: "Rs. 45,200.00",
        status: "Active" as const,
    }
];

export default function AccountsPage() {
    const { user } = useAuthStore();

    return (
        <main className="flex-1 space-y-6 p-2 md:p-6 animate-in fade-in duration-700 bg-background">
            <FinancialPageHeader
                title="YOUR ACCOUNTS"
                description="Overview of your domestic and international holdings."
                icon={Wallet}
                subtitle="Secure Asset Management"
                subtitleIcon={ShieldCheck}
                action={{
                    label: "Open New Account",
                    icon: Plus,
                    onClick: () => console.log("Open New Account")
                }}
            />

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {accountsData.map((acc, index) => (
                    <div key={index} className="h-full">
                        <AccountCard {...acc} />
                    </div>
                ))}
            </div>
        </main>
    );
}

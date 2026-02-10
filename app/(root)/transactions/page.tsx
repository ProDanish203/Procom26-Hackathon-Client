'use client';

import { useState } from 'react';
import {
    Download,
    FileText,
    TrendingUp,
    TrendingDown,
    Activity
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FinancialPageHeader } from '@/components/shared/financial/financial-page-header';
import { FinancialStatCard } from '@/components/shared/financial/stat-card';
import { TransactionFilters } from '@/components/transactions/transaction-filters';
import { TransactionsTable } from '@/components/transactions/transactions-table';
import { ReceiptModal } from '@/components/transactions/receipt-modal';

const mockTransactions = [
    { id: 1, merchant: "K-Electric", category: "Utilities", amount: -5200, date: "2026-02-10", time: "10:45 AM", status: "Completed", reference: "TXN102938475" },
    { id: 2, merchant: "Foodpanda", category: "Dining", amount: -1450, date: "2026-02-09", time: "08:30 PM", status: "Completed", reference: "TXN102938476" },
    { id: 3, merchant: "Salary Credit", category: "Income", amount: 250000, date: "2026-02-01", time: "09:00 AM", status: "Completed", reference: "TXN102938477" },
    { id: 4, merchant: "Daraz Online", category: "Shopping", amount: -2800, date: "2026-01-28", time: "02:15 PM", status: "Completed", reference: "TXN102938478" },
    { id: 5, merchant: "Netflix Subscription", category: "Entertainment", amount: -1100, date: "2026-01-15", time: "12:00 AM", status: "Completed", reference: "TXN102938479" },
    { id: 6, merchant: "Standard Chartered Bank", category: "Transfer", amount: -15000, date: "2026-01-10", time: "04:30 PM", status: "Completed", reference: "TXN102938480" },
];

const categories = ['All', 'Utilities', 'Dining', 'Income', 'Shopping', 'Entertainment', 'Transfer'];

export default function TransactionsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

    const filteredTransactions = mockTransactions.filter(tx => {
        const matchesSearch = tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) || tx.reference.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="flex-1 space-y-8 p-2 md:p-6 animate-in fade-in duration-700 bg-background">
            <FinancialPageHeader
                title="TRANSACTION HISTORY"
                description="Monitor your financial footprint with gold-standard precision."
                icon={FileText}
                action={{
                    label: "Export Full Report",
                    icon: Download,
                    onClick: () => console.log("Export report")
                }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FinancialStatCard
                    label="Total Income"
                    value="Rs. 250,000"
                    icon={TrendingUp}
                    color="green"
                />
                <FinancialStatCard
                    label="Total Expenses"
                    value="Rs. 25,550"
                    icon={TrendingDown}
                    color="red"
                />
                <FinancialStatCard
                    label="Net Flow"
                    value="Rs. 224,450"
                    icon={Activity}
                    color="green"
                />
            </div>

            <TransactionFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories}
            />

            <Card className="bg-card border-2 shadow-xl rounded-3xl overflow-hidden border-gold/10">
                <CardContent className="p-0">
                    <TransactionsTable
                        transactions={filteredTransactions}
                        onTransactionClick={setSelectedTransaction}
                    />
                </CardContent>
            </Card>

            <ReceiptModal
                transaction={selectedTransaction}
                isOpen={!!selectedTransaction}
                onClose={() => setSelectedTransaction(null)}
            />
        </main>
    );
}

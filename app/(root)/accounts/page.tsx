'use client';

import { AccountCard } from '@/components/accounts/account-card';
import { Plus, ShieldCheck, Wallet, Loader2, Filter } from 'lucide-react';
import { FinancialPageHeader } from '@/components/shared/financial/financial-page-header';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllAccounts, createAccount } from '@/API/account.api';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { CreateAccountSchema, AccountSchema } from '@/schema/account.schema';

type AccountStatus = 'ACTIVE' | 'INACTIVE' | 'FROZEN' | 'CLOSED';

export default function AccountsPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<AccountStatus | 'ALL'>('ALL');
    const [formData, setFormData] = useState<CreateAccountSchema>({
        accountType: 'CURRENT',
        nickname: '',
        creditLimit: 5000,
    });
    const queryClient = useQueryClient();

    const { data: accountsResponse, isLoading, error } = useQuery({
        queryKey: ['accounts', statusFilter],
        queryFn: () => getAllAccounts(statusFilter === 'ALL' ? undefined : statusFilter),
    });

    const createAccountMutation = useMutation({
        mutationFn: createAccount,
        onSuccess: (result) => {
            if (result.success) {
                toast.success('Account created successfully!');
                queryClient.invalidateQueries({ queryKey: ['accounts'] });
                setIsDialogOpen(false);
                setFormData({ accountType: 'CURRENT', nickname: '', creditLimit: 5000 });
            } else {
                toast.error(typeof result.response === 'string' ? result.response : 'Failed to create account');
            }
        },
        onError: () => {
            toast.error('An error occurred while creating the account');
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createAccountMutation.mutate(formData);
    };

    const accounts = accountsResponse?.success ? accountsResponse.response : [];

    const formatStatus = (status: string): "Active" | "Inactive" | "Frozen" | "Closed" | "Blocked" => {
        switch (status) {
            case 'ACTIVE':
                return 'Active';
            case 'INACTIVE':
                return 'Inactive';
            case 'FROZEN':
                return 'Frozen';
            case 'CLOSED':
                return 'Closed';
            case 'BLOCKED':
                return 'Blocked';
            default:
                return 'Inactive';
        }
    };

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
                    onClick: () => setIsDialogOpen(true)
                }}
            />

            <div className="flex items-center gap-3 mb-4">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as AccountStatus | 'ALL')}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Accounts</SelectItem>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                        <SelectItem value="FROZEN">Frozen</SelectItem>
                        <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-gold" />
                </div>
            ) : error || !accountsResponse?.success ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Failed to load accounts. Please try again.</p>
                </div>
            ) : accounts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No accounts found. Create your first account!</p>
                </div>
            ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {accounts.map((acc: AccountSchema) => (
                        <div key={acc.id} className="h-full">
                            <AccountCard
                                id={acc.id}
                                type={`${acc.accountType.charAt(0) + acc.accountType.slice(1).toLowerCase()} Account`}
                                accountNumber={acc.accountNumber}
                                iban={acc.iban}
                                balance={`Rs. ${parseFloat(typeof acc.balance === 'string' ? acc.balance : acc.balance.toString()).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                status={formatStatus(acc.accountStatus)}
                            />
                        </div>
                    ))}
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Open New Account</DialogTitle>
                        <DialogDescription>
                            Create a new bank account. Fill in the details below.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="accountType">Account Type</Label>
                            <Select
                                value={formData.accountType}
                                onValueChange={(value: 'CURRENT' | 'SAVINGS') =>
                                    setFormData({ ...formData, accountType: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CURRENT">Current Account</SelectItem>
                                    <SelectItem value="SAVINGS">Savings Account</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nickname">Account Nickname</Label>
                            <Input
                                id="nickname"
                                value={formData.nickname}
                                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                                placeholder="e.g., My Savings Account"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="creditLimit">Credit Limit (Rs.)</Label>
                            <Input
                                id="creditLimit"
                                type="number"
                                value={formData.creditLimit}
                                onChange={(e) => setFormData({ ...formData, creditLimit: Number(e.target.value) })}
                                placeholder="5000"
                                min="1"
                                required
                            />
                        </div>
                        <div className="flex gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={createAccountMutation.isPending}
                                className="flex-1 bg-gold text-black hover:bg-gold/90"
                            >
                                {createAccountMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </main>
    );
}

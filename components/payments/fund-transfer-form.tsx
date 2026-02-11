'use client';

import { useState } from 'react';
import { Send, ArrowRight, ShieldCheck, DollarSign, Loader2, Building2, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalTransferForm } from './external-transfer-form';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllAccounts } from '@/API/account.api';
import { createTransfer } from '@/API/transaction.api';
import { AccountSchema } from '@/schema/account.schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function FundTransferForm() {
  return (
    <Tabs defaultValue="internal" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-muted p-1.5 rounded-2xl border-2 border-gold/10 mb-6">
        <TabsTrigger
          value="internal"
          className="font-black uppercase text-[10px] tracking-widest rounded-xl data-[state=active]:bg-gold data-[state=active]:text-black flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          My Accounts
        </TabsTrigger>
        <TabsTrigger
          value="external"
          className="font-black uppercase text-[10px] tracking-widest rounded-xl data-[state=active]:bg-gold data-[state=active]:text-black flex items-center gap-2"
        >
          <Building2 className="h-4 w-4" />
          Other Banks
        </TabsTrigger>
      </TabsList>
      <TabsContent value="internal" className="mt-0">
        <InternalTransferForm />
      </TabsContent>
      <TabsContent value="external" className="mt-0">
        <ExternalTransferForm />
      </TabsContent>
    </Tabs>
  );
}

function InternalTransferForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    fromAccountId: '',
    toAccountId: '',
    amount: '',
    description: '',
  });

  const { data: accountsResponse } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAllAccounts(),
  });

  const accounts = accountsResponse?.success ? accountsResponse.response : [];

  const transferMutation = useMutation({
    mutationFn: createTransfer,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Transfer completed successfully!');
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        setFormData({ fromAccountId: '', toAccountId: '', amount: '', description: '' });
        // Optionally redirect to transactions or show receipt
        setTimeout(() => router.push('/transactions'), 1500);
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to complete transfer');
      }
    },
    onError: () => {
      toast.error('An error occurred while processing the transfer');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.fromAccountId || !formData.toAccountId || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.fromAccountId === formData.toAccountId) {
      toast.error('Cannot transfer to the same account');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    transferMutation.mutate({
      fromAccountId: formData.fromAccountId,
      toAccountId: formData.toAccountId,
      amount,
      description: formData.description || undefined,
    });
  };

  return (
    <Card className="border-2 shadow-xl rounded-[32px] overflow-hidden bg-card border-gold/20">
      <div className="p-6 md:p-8 border-b-2 border-gold/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gold/10">
            <Send className="h-5 w-5 text-gold" />
          </div>
          <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground">
            Fund Transfer
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
          Transfer money between your accounts instantly.
        </CardDescription>
      </div>
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                From Account
              </Label>
              <Select value={formData.fromAccountId} onValueChange={(value) => setFormData({ ...formData, fromAccountId: value })}>
                <SelectTrigger className="h-14 border-2 rounded-2xl bg-muted hover:bg-muted/80 transition-all border-gold/10 focus-visible:ring-gold">
                  <SelectValue placeholder="Select Source Account" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-2 border-gold/20 bg-card">
                  {accounts.map((account: AccountSchema) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.nickname} - {account.accountNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                To Account
              </Label>
              <Select value={formData.toAccountId} onValueChange={(value) => setFormData({ ...formData, toAccountId: value })}>
                <SelectTrigger className="h-14 border-2 rounded-2xl bg-muted hover:bg-muted/80 transition-all border-gold/10 focus-visible:ring-gold">
                  <SelectValue placeholder="Select Destination Account" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-2 border-gold/20 bg-card">
                  {accounts
                    .filter((account: AccountSchema) => account.id !== formData.fromAccountId)
                    .map((account: AccountSchema) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.nickname} - {account.accountNumber}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Transfer Amount
            </Label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-gold" />
                <span className="text-xl font-black text-foreground">Rs.</span>
              </div>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="h-20 pl-24 text-3xl md:text-4xl font-black border-2 rounded-2xl focus-visible:ring-gold bg-muted transition-all border-gold/10"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Description (Optional)
            </Label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="h-14 border-2 rounded-2xl bg-muted border-gold/10 focus-visible:ring-gold"
              placeholder="e.g., Savings deposit"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={transferMutation.isPending}
              className="w-full h-16 text-lg md:text-xl font-black uppercase tracking-tighter text-black shadow-xl hover:scale-[1.01] transition-all rounded-2xl bg-gold hover:bg-gold/90"
            >
              {transferMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Confirm & Process Transfer <ArrowRight className="ml-3 h-5 md:h-6 w-5 md:w-6" />
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-dashed border-gold/20">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/20 rounded-full border border-green-100 dark:border-green-900">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-green-700 dark:text-green-400">
                Instant Transfer Secured
              </span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

'use client';

import { useState } from 'react';
import { Wallet, ArrowRight, ShieldCheck, DollarSign, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllAccounts } from '@/API/account.api';
import { depositCash } from '@/API/transaction.api';
import { AccountSchema } from '@/schema/account.schema';
import { toast } from 'sonner';

export function DepositForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    accountId: '',
    amount: '',
    description: '',
    location: '',
  });

  const { data: accountsResponse } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAllAccounts(),
  });

  const accounts = accountsResponse?.success ? accountsResponse.response : [];

  const depositMutation = useMutation({
    mutationFn: depositCash,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Cash deposited successfully!');
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        setFormData({ accountId: '', amount: '', description: '', location: '' });
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to deposit cash');
      }
    },
    onError: () => {
      toast.error('An error occurred while processing the deposit');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.accountId || !formData.amount || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount < 1) {
      toast.error('Minimum deposit amount is Rs. 1');
      return;
    }

    depositMutation.mutate({
      accountId: formData.accountId,
      amount,
      description: formData.description,
      location: formData.location || undefined,
    });
  };

  return (
    <Card className="border-2 shadow-xl rounded-[32px] overflow-hidden bg-card border-gold/20">
      <div className="p-6 md:p-8 border-b-2 border-gold/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gold/10">
            <Wallet className="h-5 w-5 text-gold" />
          </div>
          <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground">
            Cash Deposit
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
          Deposit cash into your account instantly.
        </CardDescription>
      </div>
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Deposit To Account
            </Label>
            <Select
              value={formData.accountId}
              onValueChange={(value) => setFormData({ ...formData, accountId: value })}
            >
              <SelectTrigger className="h-14 border-2 rounded-2xl bg-muted hover:bg-muted/80 transition-all border-gold/10 focus-visible:ring-gold">
                <SelectValue placeholder="Select Account" />
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
              Deposit Amount
            </Label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-gold" />
                <span className="text-xl font-black text-foreground">Rs.</span>
              </div>
              <Input
                type="number"
                step="0.01"
                min="1"
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
              Description
            </Label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="h-14 border-2 rounded-2xl bg-muted border-gold/10 focus-visible:ring-gold"
              placeholder="e.g., Cash deposit at branch"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Location (Optional)
            </Label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="h-14 border-2 rounded-2xl bg-muted border-gold/10 focus-visible:ring-gold"
              placeholder="e.g., Main Branch Karachi"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={depositMutation.isPending}
              className="w-full h-16 text-lg md:text-xl font-black uppercase tracking-tighter text-black shadow-xl hover:scale-[1.01] transition-all rounded-2xl bg-gold hover:bg-gold/90"
            >
              {depositMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Confirm Deposit <ArrowRight className="ml-3 h-5 md:h-6 w-5 md:w-6" />
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-dashed border-gold/20">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/20 rounded-full border border-green-100 dark:border-green-900">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-green-700 dark:text-green-400">
                Secure Deposit
              </span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

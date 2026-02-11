'use client';

import { useState } from 'react';
import { Receipt, Zap, Building2, Smartphone, DollarSign, Loader2, ArrowRight, ShieldCheck, Droplet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllAccounts } from '@/API/account.api';
import { payBill } from '@/API/payment.api';
import { AccountSchema } from '@/schema/account.schema';
import { toast } from 'sonner';

const BILLERS = [
  { name: 'K-Electric', category: 'Electricity', icon: Zap },
  { name: 'SSGC', category: 'Gas', icon: Building2 },
  { name: 'KWSB', category: 'Water', icon: Droplet },
  { name: 'PTCL', category: 'Internet', icon: Smartphone },
  { name: 'Nayatel', category: 'Internet', icon: Smartphone },
  { name: 'StormFiber', category: 'Internet', icon: Smartphone },
];

export function BillPaymentForm() {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [formData, setFormData] = useState({
    accountId: '',
    billerName: '',
    consumerNumber: '',
    amount: '',
    billMonth: '',
  });

  const { data: accountsResponse } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAllAccounts(),
  });

  const accounts = accountsResponse?.success ? accountsResponse.response : [];

  const billPaymentMutation = useMutation({
    mutationFn: payBill,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Bill payment completed successfully!');
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        queryClient.invalidateQueries({ queryKey: ['payments'] });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        setFormData({ accountId: '', billerName: '', consumerNumber: '', amount: '', billMonth: '' });
        setSelectedCategory('');
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to complete payment');
      }
    },
    onError: () => {
      toast.error('An error occurred while processing the payment');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.accountId || !formData.billerName || !formData.consumerNumber || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    billPaymentMutation.mutate({
      accountId: formData.accountId,
      billerName: formData.billerName,
      consumerNumber: formData.consumerNumber,
      amount,
      billMonth: formData.billMonth || undefined,
    });
  };

  const filteredBillers = selectedCategory
    ? BILLERS.filter((b) => b.category === selectedCategory)
    : BILLERS;

  return (
    <Card className="border-2 shadow-xl rounded-[32px] overflow-hidden bg-card border-gold/20">
      <div className="p-6 md:p-8 border-b-2 border-gold/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gold/10">
            <Receipt className="h-5 w-5 text-gold" />
          </div>
          <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground">
            Utility Bills
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
          Pay your monthly utilities without any hassle.
        </CardDescription>
      </div>
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { name: 'Electricity', icon: Zap },
              { name: 'Gas', icon: Building2 },
              { name: 'Water', icon: Droplet },
              { name: 'Internet', icon: Smartphone },
            ].map((cat) => (
              <Button
                key={cat.name}
                type="button"
                variant="outline"
                onClick={() => setSelectedCategory(cat.name)}
                className={`h-20 md:h-24 flex flex-col gap-2 md:gap-3 font-black uppercase text-[9px] md:text-[10px] border-2 rounded-2xl hover:border-gold hover:text-gold hover:bg-gold/5 transition-all group ${
                  selectedCategory === cat.name ? 'border-gold bg-gold/10 text-gold' : 'border-gold/10'
                }`}
              >
                <cat.icon className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform text-gold" />
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Pay From Account
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
              Biller Name
            </Label>
            <Select
              value={formData.billerName}
              onValueChange={(value) => setFormData({ ...formData, billerName: value })}
            >
              <SelectTrigger className="h-14 border-2 rounded-2xl bg-muted hover:bg-muted/80 transition-all border-gold/10 focus-visible:ring-gold">
                <SelectValue placeholder="Select Biller" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-2 border-gold/20 bg-card">
                {filteredBillers.map((biller) => (
                  <SelectItem key={biller.name} value={biller.name}>
                    {biller.name} ({biller.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Consumer Number
            </Label>
            <Input
              value={formData.consumerNumber}
              onChange={(e) => setFormData({ ...formData, consumerNumber: e.target.value })}
              className="h-14 border-2 rounded-2xl bg-muted border-gold/10 focus-visible:ring-gold"
              placeholder="Enter your consumer number"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Bill Amount
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
              Bill Month (Optional)
            </Label>
            <Input
              value={formData.billMonth}
              onChange={(e) => setFormData({ ...formData, billMonth: e.target.value })}
              className="h-14 border-2 rounded-2xl bg-muted border-gold/10 focus-visible:ring-gold"
              placeholder="e.g., February 2026"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={billPaymentMutation.isPending}
              className="w-full h-16 text-lg md:text-xl font-black uppercase tracking-tighter text-black shadow-xl hover:scale-[1.01] transition-all rounded-2xl bg-gold hover:bg-gold/90"
            >
              {billPaymentMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay Bill <ArrowRight className="ml-3 h-5 md:h-6 w-5 md:w-6" />
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-dashed border-gold/20">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/20 rounded-full border border-green-100 dark:border-green-900">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-green-700 dark:text-green-400">
                Instant Payment • No Fee
              </span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
